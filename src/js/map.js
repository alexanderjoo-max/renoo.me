// The globe. Loaded only when needed, after the text of the page is on screen.
// Uses MapLibre GL (open source, no access token) with country shapes and no map tiles.
// Countries with prices rise off the surface: the taller and pinker, the more expensive.
(function () {
  'use strict';
  var R = window.Renoo, V = '__V__';
  var CLEAR = 'rgba(0,0,0,0)', NONE = ['==', ['get', 'id'], ''];

  function loadScript(src) { return new Promise(function (res, rej) { var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }
  function loadCss(href) { var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href; document.head.appendChild(l); }

  // Points along the shortest path between two places on the globe
  function greatCircle(a, b, n) {
    var k = Math.PI / 180, lat1 = a[1] * k, lon1 = a[0] * k, lat2 = b[1] * k, lon2 = b[0] * k;
    var d = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((lat1 - lat2) / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lon1 - lon2) / 2), 2)));
    if (!d) return [a, b];
    var out = [], prev = null;
    for (var i = 0; i <= n; i++) {
      var f = i / n, A = Math.sin((1 - f) * d) / Math.sin(d), B = Math.sin(f * d) / Math.sin(d);
      var x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
      var y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
      var z = A * Math.sin(lat1) + B * Math.sin(lat2);
      var lat = Math.atan2(z, Math.sqrt(x * x + y * y)) / k, lon = Math.atan2(y, x) / k;
      if (prev !== null) { while (lon - prev > 180) lon -= 360; while (lon - prev < -180) lon += 360; }
      prev = lon; out.push([Math.round(lon * 100) / 100, Math.round(lat * 100) / 100]);
    }
    return out;
  }
  var fc = function (features) { return { type: 'FeatureCollection', features: features }; };
  var line = function (coords) { return { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: coords } }; };
  function graticule() {
    var out = [], lat, lng, pts;
    for (lat = -60; lat <= 60; lat += 20) { pts = []; for (lng = -180; lng <= 180; lng += 6) pts.push([lng, lat]); out.push(line(pts)); }
    for (lng = -180; lng < 180; lng += 20) { pts = []; for (lat = -80; lat <= 80; lat += 5) pts.push([lng, lat]); out.push(line(pts)); }
    return fc(out);
  }

  function create(el, opts) {
    loadCss('/assets/vendor/maplibre-gl.css?v=' + V);
    return Promise.all([
      loadScript('/assets/vendor/maplibre-gl.js?v=' + V),
      fetch('/assets/world.json?v=' + V).then(function (r) { return r.json(); }),
    ]).then(function (res) { return build(el, res[1], opts); });
  }

  function build(el, world, opts) {
    var gl = window.maplibregl, small = window.innerWidth < 900;
    var Z0 = small ? 1.05 : 1.95;
    var map = new gl.Map({
      container: el,
      style: {
        version: 8,
        projection: { type: 'globe' },
        sky: { 'atmosphere-blend': ['interpolate', ['linear'], ['zoom'], 0, 1, 4.5, 1, 6.5, 0] },
        light: { anchor: 'viewport', color: '#ffffff', intensity: 0.32, position: [1.3, 215, 42] },
        sources: {
          world: { type: 'geojson', data: world },
          grid: { type: 'geojson', data: graticule() },
          arcs: { type: 'geojson', data: fc([]), lineMetrics: true },
          cities: { type: 'geojson', data: fc([]) },
        },
        layers: [
          { id: 'ocean', type: 'background', paint: { 'background-color': '#070c1d' } },
          { id: 'grid', type: 'line', source: 'grid', paint: { 'line-color': 'rgba(130,160,255,.075)', 'line-width': 0.7 } },
          { id: 'land', type: 'fill', source: 'world', paint: { 'fill-color': ['case', ['==', ['get', 'd'], 1], '#1a2549', '#10172e'] } },
          { id: 'borders', type: 'line', source: 'world', paint: { 'line-color': ['case', ['==', ['get', 'd'], 1], 'rgba(160,185,255,.34)', 'rgba(150,175,255,.14)'], 'line-width': 0.6 } },
          { id: 'glow-wide', type: 'line', source: 'world', filter: NONE, paint: { 'line-color': CLEAR, 'line-width': 8, 'line-blur': 8, 'line-opacity': 0.5 } },
          { id: 'ext', type: 'fill-extrusion', source: 'world', filter: NONE, paint: { 'fill-extrusion-color': CLEAR, 'fill-extrusion-height': 0, 'fill-extrusion-opacity': 0.9, 'fill-extrusion-opacity-transition': { duration: 400 } } },
          { id: 'ext-selected', type: 'fill-extrusion', source: 'world', filter: NONE, paint: { 'fill-extrusion-color': CLEAR, 'fill-extrusion-height': 0, 'fill-extrusion-opacity': 1 } },
          { id: 'arcs-glow', type: 'line', source: 'arcs', layout: { 'line-cap': 'round' }, paint: { 'line-width': 12, 'line-blur': 11, 'line-opacity': 0.5, 'line-gradient': ['interpolate', ['linear'], ['line-progress'], 0, '#ff5c96', 1, '#2ee6c5'] } },
          { id: 'arcs', type: 'line', source: 'arcs', layout: { 'line-cap': 'round' }, paint: { 'line-width': 2.4, 'line-opacity': 0.95, 'line-gradient': ['interpolate', ['linear'], ['line-progress'], 0, '#ff5c96', 0.5, '#8a86ff', 1, '#2ee6c5'] } },
          { id: 'arcs-comet', type: 'line', source: 'arcs', layout: { 'line-cap': 'round' }, paint: { 'line-width': 4.2, 'line-blur': 1.2, 'line-gradient': ['interpolate', ['linear'], ['line-progress'], 0, CLEAR, 1, CLEAR] } },
          { id: 'cities-halo', type: 'circle', source: 'cities', paint: { 'circle-radius': 9, 'circle-color': ['get', 'c'], 'circle-opacity': 0.3, 'circle-blur': 0.7 } },
          { id: 'cities', type: 'circle', source: 'cities', paint: { 'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 2.2, 5, 4.5], 'circle-color': '#ffffff', 'circle-stroke-color': ['get', 'c'], 'circle-stroke-width': 1.5 } },
        ],
      },
      center: [-32, 38], zoom: Z0, pitch: 22, minZoom: 0.3, maxZoom: 6.5, maxPitch: 60,
      attributionControl: false, dragRotate: false, pitchWithRotate: false, touchPitch: false, fadeDuration: 0,
    });
    map.scrollZoom.disable();
    map.touchZoomRotate.disableRotation();
    map.keyboard.disableRotation();
    map.addControl(new gl.NavigationControl({ showCompass: false }), 'top-right');
    map.getCanvas().setAttribute('aria-label', 'Interactive globe of procedure prices. The panel lists the same information as text.');

    // Zoom with Ctrl or Cmd + scroll (and trackpad pinch), so plain scrolling still moves the page
    el.addEventListener('wheel', function (e) {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault(); stopSpin();
      map.zoomTo(Math.max(0.3, Math.min(6.5, map.getZoom() - e.deltaY * 0.012)), { duration: 0 });
    }, { passive: false });

    var spinning = false, labels = [], rafId = 0, hasArcs = false, hasCities = false, tip = null;
    var heights = null, rise = 1, riseStart = 0, lastFrame = 0;
    function stopSpin() { if (spinning) { spinning = false; map.stop(); } }
    function spinStep() {
      if (!spinning || R.reducedMotion) return;
      var c = map.getCenter();
      map.easeTo({ center: [c.lng + 45, c.lat], duration: 32000, easing: function (t) { return t; } });
    }
    map.on('moveend', function (e) { if (spinning && !e.originalEvent) spinStep(); });
    ['mousedown', 'touchstart', 'dragstart'].forEach(function (ev) { map.on(ev, stopSpin); });

    // Countries stand shorter as you zoom in, so they never tower over the view
    var zoomScale = function () { return Math.max(0.3, Math.min(1.15, 1.75 - map.getZoom() * 0.36)); };
    function applyHeights() {
      if (!heights) return;
      var h = ['*', rise * zoomScale(), heights];
      map.setPaintProperty('ext', 'fill-extrusion-height', h); map.setPaintProperty('ext-selected', 'fill-extrusion-height', h);
    }
    map.on('zoomend', function () { if (rise >= 1) applyHeights(); });

    // One animation loop for the rising countries, the light travelling along arcs and the pulsing points
    function frame(t) {
      rafId = 0;
      if (document.hidden) return;
      var busy = false;
      if (rise < 1) { rise = Math.min(1, (t - riseStart) / 900); rise = 1 - Math.pow(1 - rise, 3); if (rise > 0.995) rise = 1; applyHeights(); busy = true; }
      if (t - lastFrame > 32) {
        lastFrame = t;
        if (hasArcs) {
          var head = ((t / 2600) % 1.35) - 0.1, pts = [[0, CLEAR]];
          var push = function (p, c) { p = Math.max(0, Math.min(1, p)); if (p > pts[pts.length - 1][0] + 0.001) pts.push([p, c]); };
          push(head - 0.24, CLEAR); push(head - 0.02, 'rgba(255,255,255,.5)'); push(head, '#ffffff'); push(head + 0.012, CLEAR); push(1, CLEAR);
          var expr = ['interpolate', ['linear'], ['line-progress']];
          for (var i = 0; i < pts.length; i++) expr.push(pts[i][0], pts[i][1]);
          if (pts.length > 1) map.setPaintProperty('arcs-comet', 'line-gradient', expr);
        }
        if (hasCities) { var ph = (t / 1700) % 1; map.setPaintProperty('cities-halo', 'circle-radius', 6 + ph * 16); map.setPaintProperty('cities-halo', 'circle-opacity', 0.42 * (1 - ph)); }
      }
      if (busy || ((hasArcs || hasCities) && !R.reducedMotion)) rafId = requestAnimationFrame(frame);
    }
    var kick = function () { if (!rafId) rafId = requestAnimationFrame(frame); };
    document.addEventListener('visibilitychange', function () { if (!document.hidden) kick(); });

    function countryAt(point) {
      var f = map.queryRenderedFeatures(point, { layers: ['ext-selected', 'ext', 'land'] })[0];
      return f && f.properties.d ? f.properties.id : null;
    }
    map.on('click', function (e) { var id = countryAt(e.point); if (id && opts.onCountry) opts.onCountry(id); });
    map.on('mousemove', function (e) {
      var id = countryAt(e.point), html = id && opts.tip ? opts.tip(id) : null;
      map.getCanvas().style.cursor = id ? 'pointer' : '';
      if (!html) { if (tip) tip.hidden = true; return; }
      if (!tip) { tip = document.createElement('div'); tip.className = 'map-tip'; el.appendChild(tip); }
      tip.hidden = false; tip.innerHTML = html; tip.style.left = e.point.x + 'px'; tip.style.top = e.point.y + 'px';
    });
    map.on('mouseout', function () { if (tip) tip.hidden = true; });

    var api = {
      map: map, zoom0: Z0,
      // countries: { countryId: { c: cssColor, h: 0..1 } }. selected: countryId or null
      setCountries: function (countries, selected) {
        var ids = Object.keys(countries || {});
        if (!ids.length) {
          heights = null;
          map.setFilter('ext', NONE); map.setFilter('ext-selected', NONE); map.setFilter('glow-wide', NONE);
          return;
        }
        var color = ['match', ['get', 'id']], height = ['match', ['get', 'id']];
        ids.forEach(function (id) { color.push(id, countries[id].c); height.push(id, 22000 + countries[id].h * 400000); });
        color.push(CLEAR); height.push(0);
        heights = height;
        ['ext', 'ext-selected'].forEach(function (l) { map.setPaintProperty(l, 'fill-extrusion-color', color); });
        map.setPaintProperty('glow-wide', 'line-color', color);
        var all = ['in', ['get', 'id'], ['literal', ids]];
        map.setFilter('glow-wide', all);
        map.setFilter('ext', selected ? ['all', all, ['!=', ['get', 'id'], selected]] : all);
        map.setFilter('ext-selected', selected ? ['==', ['get', 'id'], selected] : NONE);
        map.setPaintProperty('ext', 'fill-extrusion-opacity', selected ? 0.42 : 0.9);
        if (R.reducedMotion) { rise = 1; applyHeights(); } else { rise = 0; riseStart = performance.now(); applyHeights(); kick(); }
      },
      // arcs: [{ from: [lng, lat], to: [lng, lat] }], drawn from the expensive end to the cheap end
      setArcs: function (arcs) {
        hasArcs = !!(arcs && arcs.length);
        map.getSource('arcs').setData(fc((arcs || []).map(function (a) { return line(greatCircle(a.from, a.to, 48)); })));
        if (hasArcs && !R.reducedMotion) kick();
      },
      // points: [{ lng, lat, color }]
      setCities: function (points) {
        hasCities = !!(points && points.length);
        map.getSource('cities').setData(fc((points || []).map(function (p) { return { type: 'Feature', properties: { c: p.color || '#8fa6ff' }, geometry: { type: 'Point', coordinates: [p.lng, p.lat] } }; })));
        if (hasCities && !R.reducedMotion) kick();
      },
      // labels: [{ lng, lat, text, color, home }]
      setLabels: function (list) {
        labels.forEach(function (m) { m.remove(); }); labels = [];
        (list || []).forEach(function (l) {
          var d = document.createElement('div');
          d.className = 'map-label' + (l.home ? ' is-home' : '');
          d.style.setProperty('--c', l.color || '#8fa6ff');
          d.innerHTML = '<i></i>' + R.esc(l.text);
          labels.push(new gl.Marker({ element: d, anchor: 'bottom', offset: [0, -10], opacityWhenCovered: '0' }).setLngLat([l.lng, l.lat]).addTo(map));
        });
      },
      // zoom is relative to the starting zoom, so the same call works on phones and desktops
      flyTo: function (lng, lat, dz, pitch) {
        stopSpin();
        var o = { center: [lng, lat], zoom: Z0 + (dz || 0), pitch: pitch == null ? 22 : pitch };
        if (R.reducedMotion) map.jumpTo(o); else map.flyTo(Object.assign(o, { duration: 1600, curve: 1.25, essential: true }));
      },
      // Bring two places into view by centring on the midpoint of the path between them
      showPair: function (a, b) {
        var mid = greatCircle(a, b, 2)[1], span = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
        api.flyTo(((mid[0] + 540) % 360) - 180, Math.max(-45, Math.min(55, mid[1])), span < 60 ? 0.9 : span < 120 ? 0.3 : -0.25, 30);
      },
      overview: function (pitch, lat) { var c = map.getCenter(); api.flyTo(c.lng, lat == null ? 24 : lat, 0, pitch == null ? 22 : pitch); },
      setPadding: function (p) { if (R.reducedMotion) map.setPadding(p); else map.easeTo({ padding: p, duration: 500 }); },
      spin: function (on) { if (on && !R.reducedMotion) { if (!spinning) { spinning = true; spinStep(); } } else stopSpin(); },
      resize: function () { map.resize(); },
    };
    return new Promise(function (resolve) { map.once('load', function () { resolve(api); }); });
  }

  window.RenooMap = { create: create };
})();
