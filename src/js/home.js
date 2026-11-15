// Home page: the three paths, the section filter, the panel lists, and the link to the globe.
(function () {
  'use strict';
  var R = window.Renoo, esc = R.esc, doc = document;
  var $ = function (id) { return doc.getElementById(id); };
  var sheet = $('sheet'), stage = $('stage'), globeEl = $('globe'), legend = $('legend'), hint = $('mapHint');
  if (!sheet) return;

  var D = null, P = {}, C = {}, CAT = {}, byId = {};
  var map = null, mapPromise = null;
  // path: travel | treatment | gaps | null (nothing chosen yet)
  var S = { path: null, cat: '', country: null, proc: null, sort: 'pct', scope: 'world', gap: null };
  var CHEAP = [25, 245, 193], MID = [58, 160, 255], DEAR = [255, 77, 125];

  // ---------- Small helpers ----------
  var money = function (n) { return R.money(n); };
  var median = function (a) { if (!a.length) return null; var s = a.slice().sort(function (x, y) { return x - y; }), m = s.length >> 1; return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2); };
  var price = function (p, c) { return D.prices[p] && D.prices[p][c]; };
  var procsIn = function (cat) { return D.procedures.filter(function (p) { return !cat || p.c === cat; }); };
  var isDesktop = function () { return window.innerWidth > 900; };
  function heat(t) {
    t = Math.max(0, Math.min(1, t));
    var a = t < 0.5 ? CHEAP : MID, b = t < 0.5 ? MID : DEAR, k = t < 0.5 ? t * 2 : (t - 0.5) * 2;
    return 'rgb(' + Math.round(a[0] + (b[0] - a[0]) * k) + ',' + Math.round(a[1] + (b[1] - a[1]) * k) + ',' + Math.round(a[2] + (b[2] - a[2]) * k) + ')';
  }
  var vsClass = function (p) { return p > 0 ? 'vs-less' : p < 0 ? 'vs-more' : ''; };
  var comboUrl = function (p, c) { var x = price(p, c); return x && !x[6] ? '/' + p + '-in-' + c : '/procedure/' + p; };
  var homeName = function () { return R.home().name; };
  function animate(root) {
    var lis = root.querySelectorAll('.rows > li');
    for (var i = 0; i < lis.length; i++) lis[i].style.setProperty('--i', Math.min(i, 16));
    var nums = root.querySelectorAll('[data-count]');
    for (var j = 0; j < nums.length; j++) (function (el) { var to = Number(el.getAttribute('data-count')); R.countUp(el, Math.abs(to), function (v) { return R.pctShort(to < 0 ? -v : v); }); })(nums[j]);
    var bars = root.querySelectorAll('.row-bar b');
    requestAnimationFrame(function () { for (var k = 0; k < bars.length; k++) bars[k].style.setProperty('--w', bars[k].getAttribute('data-w') + '%'); });
  }
  var homeLink = function () { return '<button type="button" class="home-link" data-home>' + R.flag(R.home().iso2) + ' ' + esc(homeName()) + '</button>'; };

  // ---------- Globe ----------
  function ensureMap() {
    if (mapPromise) return mapPromise;
    var t0 = Date.now();
    mapPromise = new Promise(function (resolve, reject) {
      var s = doc.createElement('script'); s.src = '/assets/map.js?v=' + R.cfg.v; s.onload = resolve; s.onerror = reject; doc.head.appendChild(s);
    }).then(function () {
      return window.RenooMap.create($('globeMap'), { onCountry: onMapCountry, tip: mapTip, onMove: hudMove });
    }).then(function (api) {
      map = api; R.map = api; globeEl.classList.add('is-ready');
      map.setNodes(D.cities.map(function (ct) { return [ct[3], ct[2]]; }));
      padMap(true); paintMap(); focus();
      if (hint && isDesktop()) { hint.hidden = false; hint.textContent = 'DRAG TO ROTATE · CTRL + SCROLL TO ZOOM · CLICK A COUNTRY'; }
      R.track('map_loaded', { ms: Date.now() - t0 });
      return api;
    }).catch(function () { mapPromise = null; });
    return mapPromise;
  }
  function padMap(instant) {
    if (!map) return;
    var p = isDesktop() ? { left: 400, top: 48, right: 0, bottom: 0 }
      : { left: 0, right: 0, top: 48, bottom: Math.round(stage.clientHeight * (sheet.getAttribute('data-snap') === 'peek' ? 0.2 : 0.56)) };
    if (instant) map.map.setPadding(p); else map.setPadding(p);
  }
  // Live readout of where the globe is pointing
  var hudRead = $('hudRead');
  function hudMove(lat, lng, zoom) {
    if (!hudRead) return;
    var f = function (v, pos, neg) { return Math.abs(v).toFixed(2).padStart(6, '0') + '° ' + (v >= 0 ? pos : neg); };
    hudRead.textContent = 'LAT ' + f(lat, 'N', 'S') + '  LNG ' + f(lng, 'E', 'W') + '  ALT ' + zoom.toFixed(2);
  }
  function mapTip(id) {
    var c = byId[id]; if (!c || !D) return null;
    var extra = '';
    if (S.path === 'treatment' && S.proc) { var x = price(S.proc, c.s); extra = x ? money(x[1]) : 'no price'; }
    else extra = Object.keys(D.prices).filter(function (p) { return price(p, c.s); }).length + ' procedures';
    return esc(c.n) + ' <span>' + esc(extra) + '</span>';
  }
  function onMapCountry(id) {
    var c = byId[id]; if (!c) return;
    if (S.path === 'treatment' && S.proc) { if (price(S.proc, c.s)) selectCountry(c.s, 'map'); return; }
    if (S.path !== 'travel') setPath('travel', 'map', true);
    selectCountry(c.s, 'map');
  }

  // What the globe shows for the current state
  function paintMap() {
    if (!map || !D) return;
    var colors = {}, labels = [], arcs = [], cities = [], reticles = [], selected = null, home = R.home().slug, showLegend = false;
    if (S.path === 'treatment' && S.proc) {
      var cells = D.prices[S.proc], slugs = Object.keys(cells), vals = slugs.map(function (s) { return cells[s][1]; });
      var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals), span = Math.log(hi) - Math.log(lo) || 1;
      slugs.forEach(function (s) { var t = (Math.log(cells[s][1]) - Math.log(lo)) / span; colors[C[s].id] = { c: heat(t), h: t }; });
      var ranked = slugs.slice().sort(function (a, b) { return cells[a][1] - cells[b][1]; });
      var want = ranked.slice(0, isDesktop() ? 4 : 2);
      if (cells[home] && want.indexOf(home) < 0) want.push(home);
      if (S.country && want.indexOf(S.country) < 0) want.push(S.country);
      want.forEach(function (s) { labels.push({ lng: C[s].lng, lat: C[s].lat, text: C[s].n + ' ' + money(cells[s][1]), color: colors[C[s].id].c, home: s === home }); });
      selected = S.country ? C[S.country].id : null;
      if (S.country) reticles.push({ lng: C[S.country].lng, lat: C[S.country].lat, color: colors[C[S.country].id].c });
      showLegend = true;
      legend.innerHTML = '<div class="legend-title">' + esc(P[S.proc].n) + ', typical price</div><div class="legend-bar"></div><div class="legend-ends"><span>' + money(lo) + '</span><span>' + money(hi) + '</span></div>';
      if (S.country && cells[home] && S.country !== home) arcs.push({ from: [C[home].lng, C[home].lat], to: [C[S.country].lng, C[S.country].lat] });
    } else if (S.path === 'travel') {
      var list = destinations();
      list.forEach(function (d) { var t = d.med == null ? null : 1 - Math.max(0, Math.min(1, (d.med + 20) / 100)); colors[C[d.s].id] = t == null ? { c: '#1d4a78', h: 0.04 } : { c: heat(t), h: t }; });
      if (S.country) {
        selected = C[S.country].id;
        reticles.push({ lng: C[S.country].lng, lat: C[S.country].lat, color: '#7fe3ff' });
        D.cities.forEach(function (ct) { if (ct[1] === S.country) { cities.push({ lng: ct[3], lat: ct[2], color: '#ffffff' }); labels.push({ lng: ct[3], lat: ct[2], text: ct[0], color: '#ffffff' }); } });
        if (labels.length > 6) labels = labels.slice(0, 6);
        if (S.country !== home && C[home]) arcs.push({ from: [C[home].lng, C[home].lat], to: [C[S.country].lng, C[S.country].lat] });
      } else {
        showLegend = true;
        legend.innerHTML = '<div class="legend-title">Median price vs ' + esc(homeName()) + '</div><div class="legend-bar"></div><div class="legend-ends"><span>Much cheaper</span><span>Pricier</span></div>';
      }
    } else {
      var gaps = gapList();
      var shown = S.gap ? gaps.filter(function (g) { return g.p === S.gap; }) : gaps.slice(0, isDesktop() ? 9 : 6);
      shown.forEach(function (g) {
        arcs.push({ from: [C[g.hi].lng, C[g.hi].lat], to: [C[g.lo].lng, C[g.lo].lat] });
        colors[C[g.hi].id] = { c: heat(1), h: S.path ? 1 : 0.5 }; if (!colors[C[g.lo].id]) colors[C[g.lo].id] = { c: heat(0), h: 0.05 };
        cities.push({ lng: C[g.hi].lng, lat: C[g.hi].lat, color: heat(1) }, { lng: C[g.lo].lng, lat: C[g.lo].lat, color: heat(0) });
      });
      if (S.gap && shown[0]) {
        var g0 = shown[0];
        reticles.push({ lng: C[g0.hi].lng, lat: C[g0.hi].lat, color: heat(1) }, { lng: C[g0.lo].lng, lat: C[g0.lo].lat, color: heat(0) });
        labels.push({ lng: C[g0.hi].lng, lat: C[g0.hi].lat, text: C[g0.hi].n + ' ' + money(g0.hiP), color: heat(1) }, { lng: C[g0.lo].lng, lat: C[g0.lo].lat, text: C[g0.lo].n + ' ' + money(g0.loP), color: heat(0) });
      }
    }
    map.setCountries(colors, selected); map.setArcs(arcs); map.setCities(cities); map.setLabels(labels); map.setReticles(reticles);
    legend.hidden = !showLegend;
    map.spin(!S.country && !S.gap && !(S.path === 'treatment' && S.proc));
  }

  // Where the camera should look for the current state
  function focus() {
    if (!map || !D) return;
    if (S.path === 'treatment' && S.proc) {
      if (S.country) { map.flyTo(C[S.country].lng, C[S.country].lat, 0.9, 44); return; }
      var cells = D.prices[S.proc], best = Object.keys(cells).sort(function (a, b) { return cells[a][1] - cells[b][1]; })[0];
      map.flyTo(C[best].lng, Math.max(-25, Math.min(42, C[best].lat)), -0.05, 38);
    } else if (S.path === 'travel' && S.country) map.flyTo(C[S.country].lng, C[S.country].lat, 1.15, 40);
    else if (S.gap) { var g = gapList().filter(function (x) { return x.p === S.gap; })[0]; if (g) map.showPair([C[g.hi].lng, C[g.hi].lat], [C[g.lo].lng, C[g.lo].lat]); }
    else if (S.path === 'travel' || S.path === 'treatment') map.overview(32, 24);
    else map.overview(22, 38);
  }

  // ---------- Data for each path ----------
  function destinations() {
    var home = R.home().slug, procs = procsIn(S.cat);
    return D.countries.filter(function (c) { return c.s !== home; }).map(function (c) {
      var n = 0, sav = [];
      procs.forEach(function (p) { var x = price(p.s, c.s), h = price(p.s, home); if (x) { n++; if (h) sav.push(R.pct(h[1], x[1])); } });
      return { s: c.s, n: n, med: median(sav) };
    }).filter(function (d) { return d.n > 0; }).sort(function (a, b) { return (b.med == null ? -999 : b.med) - (a.med == null ? -999 : a.med) || b.n - a.n; });
  }
  function gapList() {
    var home = R.home().slug, out = [];
    procsIn(S.cat).forEach(function (p) {
      var cells = D.prices[p.s], slugs = Object.keys(cells);
      if (slugs.length < 2) return;
      var lo = slugs[0], hi = slugs[0];
      slugs.forEach(function (s) { if (cells[s][1] < cells[lo][1]) lo = s; if (cells[s][1] > cells[hi][1]) hi = s; });
      if (S.scope === 'home') { if (!cells[home] || lo === home) return; hi = home; }
      var hiP = cells[hi][1], loP = cells[lo][1];
      out.push({ p: p.s, hi: hi, lo: lo, hiP: hiP, loP: loP, diff: hiP - loP, pct: Math.round((1 - loP / hiP) * 100) });
    });
    out.sort(S.sort === 'diff' ? function (a, b) { return b.diff - a.diff; } : S.sort === 'name' ? function (a, b) { return P[a.p].n.localeCompare(P[b.p].n); } : function (a, b) { return b.pct - a.pct || b.diff - a.diff; });
    return out;
  }

  // ---------- Panels ----------
  function renderTravel() {
    var home = R.home().slug, ctl = $('controls-travel'), out = $('results-travel');
    var opts = D.countries.slice().sort(function (a, b) { return a.n.localeCompare(b.n); }).map(function (c) { return '<option value="' + c.s + '"' + (c.s === S.country ? ' selected' : '') + '>' + esc(c.n) + '</option>'; }).join('');
    ctl.innerHTML = '<p class="sentence">I’m traveling to <select id="selCountry" aria-label="Destination country"><option value="">a destination…</option>' + opts + '</select><br>from ' + homeLink() + '</p>';
    if (!S.country) {
      var list = destinations();
      out.innerHTML = '<p class="results-h">' + (S.cat ? esc(CAT[S.cat].n) + ': destinations' : 'Destinations') + ' ranked by median price against ' + esc(homeName()) + '</p>' +
        (list.length ? '<ol class="rows is-animated">' + list.map(function (d) {
          var c = C[d.s];
          return '<li><button type="button" class="row" data-country="' + d.s + '"><span class="row-flag" aria-hidden="true">' + R.flag(c.i) + '</span><span class="row-main"><span class="row-title">' + esc(c.n) + '</span><span class="row-sub">' + d.n + (d.n === 1 ? ' procedure' : ' procedures') + '</span></span><span class="row-num ' + vsClass(d.med) + '">' + (d.med == null ? '—' : '<span data-count="' + d.med + '">' + R.pctShort(d.med) + '</span>') + '</span></button></li>';
        }).join('') + '</ol>' : '<p class="empty">No destination has prices in this section yet.</p>');
    } else {
      var c = C[S.country], rows = [], sav = [];
      procsIn(S.cat).forEach(function (p) { var x = price(p.s, c.s); if (!x) return; var h = price(p.s, home), pc = h && c.s !== home ? R.pct(h[1], x[1]) : null; if (pc != null) sav.push(pc); rows.push({ p: p, x: x, h: h, pct: pc }); });
      rows.sort(function (a, b) { return (b.pct == null ? -999 : b.pct) - (a.pct == null ? -999 : a.pct); });
      var med = median(sav), firstCity = (D.cities.filter(function (ct) { return ct[1] === c.s; })[0] || [c.n])[0];
      out.innerHTML = '<div class="detail"><div class="detail-top"><h3><span class="flag" aria-hidden="true">' + R.flag(c.i) + '</span> ' + esc(c.n) + '</h3><button type="button" class="x-btn" data-clear aria-label="Back to all destinations">✕</button></div>' +
        '<div class="kpis"><div class="kpi"><b>' + rows.length + '</b>' + (rows.length === 1 ? 'procedure' : 'procedures') + (S.cat ? ' in ' + esc(CAT[S.cat].n) : ' available') + '</div><div class="kpi"><b class="' + vsClass(med) + '">' + (med == null ? '—' : '<span data-count="' + med + '">' + R.pctShort(med) + '</span>') + '</b>median vs ' + esc(homeName()) + '</div></div>' +
        '<div class="detail-actions"><a class="btn" href="/country/' + c.s + '">Open ' + esc(c.n) + ' page</a><a class="btn btn-ghost" href="/travel?city=' + encodeURIComponent(firstCity) + '">Flights and hotels</a></div></div>' +
        '<p class="results-h">What it costs in ' + esc(R.inName({ the: c.t, name: c.n })) + ' against ' + esc(homeName()) + '. Prices are typical prices.</p>' +
        (rows.length ? '<ol class="rows is-animated">' + rows.map(function (r) {
          return '<li><a class="row" href="' + comboUrl(r.p.s, c.s) + '" data-proc-link="' + r.p.s + '" style="--accent:' + CAT[r.p.c].c + '"><span class="row-dot"></span><span class="row-main"><span class="row-title">' + esc(r.p.n) + '</span><span class="row-sub">' + (r.h && c.s !== home ? money(r.h[1]) + ' in ' + esc(homeName()) : 'updated ' + R.date(r.x[5])) + '</span></span><span class="row-num">' + money(r.x[1]) + (r.pct == null ? '' : '<small class="' + vsClass(r.pct) + '" data-count="' + r.pct + '">' + R.pctShort(r.pct) + '</small>') + '</span></a></li>';
        }).join('') + '</ol>' : '<p class="empty">Nothing in this section has a price in ' + esc(c.n) + ' yet. Choose another section.</p>');
    }
    animate(out);
  }

  function renderTreatment() {
    var home = R.home().slug, ctl = $('controls-treatment'), out = $('results-treatment');
    var groups = D.categories.filter(function (c) { return !S.cat || c.s === S.cat; }).map(function (c) {
      return '<optgroup label="' + esc(c.n) + '">' + procsIn(c.s).map(function (p) { return '<option value="' + p.s + '"' + (p.s === S.proc ? ' selected' : '') + '>' + esc(p.n) + '</option>'; }).join('') + '</optgroup>';
    }).join('');
    ctl.innerHTML = '<p class="sentence">I want <select id="selProc" aria-label="Procedure"><option value="">a treatment…</option>' + groups + '</select><br>priced against ' + homeLink() + '</p>';
    if (!S.proc) {
      out.innerHTML = '<p class="results-h">Pick a procedure to turn the globe into a price heatmap</p><ul class="groups">' + D.categories.filter(function (c) { return !S.cat || c.s === S.cat; }).map(function (c) {
        return '<li class="group" style="--accent:' + c.c + '"><span class="group-h"><span class="row-dot"></span>' + esc(c.n) + '</span><ul class="rows is-animated">' + procsIn(c.s).map(function (p) {
          var v = Object.keys(D.prices[p.s]).map(function (s) { return D.prices[p.s][s][1]; }), lo = Math.min.apply(null, v), hi = Math.max.apply(null, v);
          return '<li><button type="button" class="row row-slim" data-proc="' + p.s + '"><span class="row-main"><span class="row-title">' + esc(p.n) + '</span></span><span class="row-num">' + money(lo) + (hi > lo ? '–' + money(hi) : '') + '</span></button></li>';
        }).join('') + '</ul></li>';
      }).join('') + '</ul>';
      animate(out); return;
    }
    var p = P[S.proc], cells = D.prices[p.s], h = cells[home];
    var ranked = Object.keys(cells).sort(function (a, b) { return cells[a][1] - cells[b][1]; });
    var lo = cells[ranked[0]][1], hi = cells[ranked[ranked.length - 1]][1], span = Math.log(hi) - Math.log(lo) || 1;
    var html = '';
    if (S.country && cells[S.country]) {
      var c = C[S.country], x = cells[c.s], pc = h && c.s !== home ? R.pct(h[1], x[1]) : null;
      var pair = D.pairs.indexOf(home + '|' + c.s) > -1 && !x[6];
      html += '<div class="detail" style="--accent:' + CAT[p.c].c + '"><div class="detail-top"><h3>' + esc(p.n) + ' in ' + esc(R.inName({ the: c.t, name: c.n })) + '</h3><button type="button" class="x-btn" data-clear aria-label="Close">✕</button></div>' +
        (pc != null ? '<div class="detail-big ' + vsClass(pc) + '" data-count="' + pc + '">' + R.pctShort(pc) + '</div><p>' + money(x[1]) + ' typical, against ' + money(h[1]) + ' in ' + esc(homeName()) + '.</p>' : '<div class="detail-big" style="color:var(--ink)">' + money(x[1]) + '</div><p>Typical price' + (c.s === home ? ' in your home country.' : '. There is no price for ' + esc(homeName()) + ' to compare with.') + '</p>') +
        '<p class="detail-meta">Range ' + money(x[0]) + '–' + money(x[2]) + ' · ' + x[3] + (x[3] === 1 ? ' city' : ' cities') + ' · ' + ({ H: 'High', M: 'Medium', L: 'Low' }[x[4]]) + ' confidence · updated ' + R.date(x[5]) + (p.b ? ' · ' + esc(p.b) : '') + '</p>' +
        '<div class="detail-actions"><a class="btn" href="' + comboUrl(p.s, c.s) + '">Full details and clinics</a>' + (c.s !== home ? '<a class="btn btn-ghost" href="' + (pair ? '/compare/' + p.s + '/' + home + '-vs-' + c.s : '/compare?a=' + home + '&b=' + c.s) + '">Side by side</a>' : '') + '</div></div>';
    } else {
      html += '<div class="kpis"><div class="kpi"><b>' + money(lo) + '</b>lowest: ' + esc(C[ranked[0]].n) + '</div><div class="kpi"><b>' + (h ? money(h[1]) : '—') + '</b>' + esc(homeName()) + (h ? '' : ': no price') + '</div></div>';
    }
    html += '<p class="results-h">Best value first, typical price' + (p.b ? ' ' + esc(p.b) : '') + '. <a href="/procedure/' + p.s + '">About ' + esc(p.h) + '</a></p><ol class="rows is-animated">' + ranked.map(function (s, i) {
      var c = C[s], x = cells[s], pc = h && s !== home ? R.pct(h[1], x[1]) : null, t = (Math.log(x[1]) - Math.log(lo)) / span;
      return '<li><button type="button" class="row' + (s === S.country ? ' is-on' : '') + '" data-country="' + s + '"><span class="row-rank">' + (i + 1) + '</span><span class="row-flag" aria-hidden="true">' + R.flag(c.i) + '</span><span class="row-main"><span class="row-title">' + esc(c.n) + (s === home ? ' <span class="muted">home</span>' : '') + '</span><span class="row-bar"><b data-w="' + Math.round(8 + (x[1] / hi) * 92) + '" style="--c:' + heat(t) + '"></b></span></span><span class="row-num">' + money(x[1]) + (pc == null ? '' : '<small class="' + vsClass(pc) + '">' + R.pctShort(pc) + '</small>') + '</span></button></li>';
    }).join('') + '</ol>';
    out.innerHTML = html; animate(out);
  }

  function renderGaps() {
    var ctl = $('controls-gaps'), out = $('results-gaps'), list = gapList();
    ctl.innerHTML = '<p class="sentence">The biggest price gaps</p><div class="toolbar"><div class="seg" role="group" aria-label="Compare from"><button type="button" data-scope="world" aria-pressed="' + (S.scope === 'world') + '">Worldwide</button><button type="button" data-scope="home" aria-pressed="' + (S.scope === 'home') + '">From ' + esc(homeName()) + '</button></div>' +
      '<label class="sr-only" for="selSort">Sort by</label><select id="selSort"><option value="pct"' + (S.sort === 'pct' ? ' selected' : '') + '>Largest % gap</option><option value="diff"' + (S.sort === 'diff' ? ' selected' : '') + '>Largest money gap</option><option value="name"' + (S.sort === 'name' ? ' selected' : '') + '>Procedure A–Z</option></select></div>';
    var html = '';
    var g = S.gap && list.filter(function (x) { return x.p === S.gap; })[0];
    if (g) {
      var p = P[g.p], home = R.home().slug, pair = D.pairs.indexOf(g.hi + '|' + g.lo) > -1;
      html += '<div class="detail" style="--accent:' + CAT[p.c].c + '"><div class="detail-top"><h3>' + esc(p.n) + '</h3><button type="button" class="x-btn" data-clear aria-label="Close">✕</button></div>' +
        '<div class="detail-big" data-count="' + g.pct + '">' + R.pctShort(g.pct) + '</div><p>' + R.flag(C[g.hi].i) + ' ' + esc(C[g.hi].n) + ' ' + money(g.hiP) + ' → ' + R.flag(C[g.lo].i) + ' ' + esc(C[g.lo].n) + ' ' + money(g.loP) + '. A gap of ' + money(g.diff) + ' at typical prices' + (p.b ? ', ' + esc(p.b) : '') + '.</p>' +
        '<p class="detail-meta">Updated ' + R.date(D.prices[g.p][g.lo][5]) + ' · ' + Object.keys(D.prices[g.p]).length + ' countries compared</p>' +
        '<div class="detail-actions"><a class="btn" href="' + comboUrl(g.p, g.lo) + '">' + esc(p.h) + ' in ' + esc(C[g.lo].n) + '</a><a class="btn btn-ghost" href="/procedure/' + g.p + '">All countries</a>' + (pair ? '<a class="btn btn-ghost" href="/compare/' + g.p + '/' + g.hi + '-vs-' + g.lo + '">Side by side</a>' : '') + '</div></div>';
      void home;
    }
    html += '<p class="results-h">' + (S.scope === 'home' ? esc(homeName()) + ' against the cheapest country' : 'Most expensive country against the cheapest') + ', at typical prices</p>' +
      (list.length ? '<ol class="rows is-animated">' + list.map(function (x) {
        var p = P[x.p];
        return '<li><button type="button" class="row' + (x.p === S.gap ? ' is-on' : '') + '" data-gap="' + x.p + '" style="--accent:' + CAT[p.c].c + '"><span class="row-dot"></span><span class="row-main"><span class="row-title">' + esc(p.n) + '</span><span class="row-sub">' + esc(C[x.hi].n) + ' ' + money(x.hiP) + ' → ' + esc(C[x.lo].n) + ' ' + money(x.loP) + '</span></span><span class="row-num vs-less">−' + x.pct + '%<small>' + money(x.diff) + '</small></span></button></li>';
      }).join('') + '</ol>' : '<p class="empty">' + (S.scope === 'home' ? 'No procedure in this section has a price in ' + esc(homeName()) + ' that is higher than elsewhere. Try “Worldwide”.' : 'No procedure in this section has prices in two countries yet.') + '</p>');
    out.innerHTML = html; animate(out);
  }

  function render() {
    if (!D) return;
    if (S.path === 'travel') renderTravel(); else if (S.path === 'treatment') renderTreatment(); else if (S.path === 'gaps') renderGaps();
    paintMap(); syncUrl();
  }

  // ---------- State changes ----------
  function setPath(path, source, quiet) {
    if (S.path === path) return;
    var first = !S.path;
    S.path = path; S.country = null; S.gap = null;
    sheet.classList.add('has-path'); sheet.setAttribute('data-path', path);
    var tabs = doc.querySelectorAll('.path');
    for (var i = 0; i < tabs.length; i++) { var on = tabs[i].getAttribute('data-path') === path; tabs[i].classList.toggle('is-on', on); tabs[i].setAttribute('aria-selected', on); }
    var panels = doc.querySelectorAll('.panel');
    for (var j = 0; j < panels.length; j++) panels[j].classList.toggle('is-active', panels[j].id === 'panel-' + path);
    R.track('path_selected', { path: path, source: source || (first ? 'chooser' : 'switcher') });
    $('sheetScroll').scrollTop = 0;
    if (!isDesktop() && sheet.getAttribute('data-snap') === 'peek') snap('half');
    ensureMap();
    if (!quiet) whenData(function () { render(); focus(); });
  }
  function setCat(cat) {
    S.cat = cat;
    var chips = doc.querySelectorAll('#catFilter .chip');
    for (var i = 0; i < chips.length; i++) { var on = chips[i].getAttribute('data-cat') === cat; chips[i].classList.toggle('is-on', on); chips[i].setAttribute('aria-pressed', on); }
    if (S.proc && cat && P[S.proc] && P[S.proc].c !== cat) { S.proc = null; S.country = S.path === 'treatment' ? null : S.country; }
    S.gap = null;
    R.track('category_filter', { category: cat || 'all', path: S.path || 'none' });
    render(); if (!S.country) focus();
  }
  function selectCountry(slug, source) {
    S.country = slug || null;
    if (slug) {
      if (S.path === 'travel') { R.track('country_view', { country: slug, surface: 'map', source: source || 'list' }); R.track('comparison_made', { method: 'travel', home: R.home().slug, destination: slug }); }
      else if (S.path === 'treatment') R.track('comparison_made', { method: 'treatment', procedure: S.proc, home: R.home().slug, destination: slug });
      if (!isDesktop()) snap('half');
    }
    render(); focus(); $('sheetScroll').scrollTop = 0;
  }
  function selectProc(slug) {
    S.proc = slug || null; S.country = null;
    if (slug) R.track('procedure_view', { procedure: slug, category: P[slug].c, surface: 'map', home: R.home().slug });
    render(); focus(); $('sheetScroll').scrollTop = 0;
  }
  function selectGap(slug) {
    S.gap = slug || null;
    if (slug) {
      var g = gapList().filter(function (x) { return x.p === slug; })[0];
      if (g) R.track('comparison_made', { method: 'gaps', procedure: slug, home: g.hi, destination: g.lo, scope: S.scope });
      if (!isDesktop()) snap('half');
    }
    render(); focus(); $('sheetScroll').scrollTop = 0;
  }
  function syncUrl() {
    var q = [];
    if (S.path) q.push('path=' + S.path);
    if (S.cat) q.push('category=' + S.cat);
    if (S.path === 'treatment' && S.proc) q.push('procedure=' + S.proc);
    if (S.path !== 'gaps' && S.country) q.push('country=' + S.country);
    if (S.path === 'gaps' && S.gap) q.push('procedure=' + S.gap);
    try { history.replaceState(null, '', q.length ? '/?' + q.join('&') : '/'); } catch (e) { /* ignore */ }
  }

  // ---------- Bottom sheet (phones) ----------
  function snap(name) { sheet.setAttribute('data-snap', name); sheet.style.height = ''; setTimeout(function () { padMap(); }, 60); }
  (function () {
    var handle = $('sheetHandle'); if (!handle) return;
    handle.hidden = false;
    var startY = 0, startH = 0, moved = false, dragging = false;
    handle.addEventListener('pointerdown', function (e) { dragging = true; moved = false; startY = e.clientY; startH = sheet.getBoundingClientRect().height; sheet.classList.add('is-dragging'); handle.setPointerCapture(e.pointerId); });
    handle.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dy = e.clientY - startY; if (Math.abs(dy) > 5) moved = true;
      sheet.style.height = Math.max(120, Math.min(stage.clientHeight - 68, startH - dy)) + 'px';
    });
    var end = function () {
      if (!dragging) return; dragging = false; sheet.classList.remove('is-dragging');
      var cur = sheet.getAttribute('data-snap');
      if (!moved) { snap(cur === 'peek' ? 'half' : cur === 'half' ? 'full' : 'half'); return; }
      var h = sheet.getBoundingClientRect().height, H = stage.clientHeight;
      var opts = [['peek', 178], ['half', H * 0.58], ['full', H - 68]], best = opts[0];
      opts.forEach(function (o) { if (Math.abs(o[1] - h) < Math.abs(best[1] - h)) best = o; });
      snap(best[0]);
    };
    handle.addEventListener('pointerup', end); handle.addEventListener('pointercancel', end);
  })();

  // ---------- Events ----------
  doc.getElementById('paths').addEventListener('click', function (e) {
    var a = e.target.closest('.path'); if (!a) return;
    e.preventDefault(); setPath(a.getAttribute('data-path'));
  });
  $('catFilter').addEventListener('click', function (e) {
    var chip = e.target.closest('.chip'); if (!chip) return;
    e.preventDefault(); whenData(function () { setCat(chip.getAttribute('data-cat')); });
  });
  sheet.addEventListener('click', function (e) {
    var t = e.target, el;
    if (t.closest('[data-home]')) { if (R.openHome) R.openHome(); return; }
    if (t.closest('[data-clear]')) { if (S.path === 'gaps') selectGap(null); else selectCountry(null); return; }
    if ((el = t.closest('button[data-country]'))) { selectCountry(el.getAttribute('data-country'), 'list'); return; }
    if ((el = t.closest('button[data-proc]'))) { selectProc(el.getAttribute('data-proc')); return; }
    if ((el = t.closest('button[data-gap]'))) { selectGap(el.getAttribute('data-gap') === S.gap ? null : el.getAttribute('data-gap')); return; }
    if ((el = t.closest('button[data-scope]'))) { S.scope = el.getAttribute('data-scope'); S.gap = null; R.track('gap_scope', { scope: S.scope }); render(); return; }
    if ((el = t.closest('a[data-proc-link]'))) R.track('comparison_made', { method: 'travel', procedure: el.getAttribute('data-proc-link'), home: R.home().slug, destination: S.country });
  });
  sheet.addEventListener('change', function (e) {
    if (e.target.id === 'selCountry') selectCountry(e.target.value, 'select');
    else if (e.target.id === 'selProc') selectProc(e.target.value);
    else if (e.target.id === 'selSort') { S.sort = e.target.value; R.track('gap_sort', { sort: S.sort }); render(); }
  });
  doc.addEventListener('renoo:home', function () { render(); });
  window.addEventListener('resize', function () { padMap(true); }, { passive: true });

  // ---------- Start ----------
  var dataReady = null;
  function whenData(fn) {
    if (!dataReady) dataReady = R.data().then(function (d) {
      D = d;
      d.procedures.forEach(function (p) { P[p.s] = p; }); d.countries.forEach(function (c) { C[c.s] = c; byId[c.id] = c; }); d.categories.forEach(function (c) { CAT[c.s] = c; });
    });
    return dataReady.then(fn);
  }
  var chips = doc.querySelectorAll('#catFilter .chip');
  for (var i = 0; i < chips.length; i++) { chips[i].setAttribute('role', 'button'); chips[i].setAttribute('aria-pressed', chips[i].classList.contains('is-on')); }

  var q = new URLSearchParams(location.search), qp = q.get('path');
  if (qp === 'travel' || qp === 'treatment' || qp === 'gaps') {
    whenData(function () {
      if (q.get('category') && CAT[q.get('category')]) { S.cat = q.get('category'); for (var k = 0; k < chips.length; k++) { var on = chips[k].getAttribute('data-cat') === S.cat; chips[k].classList.toggle('is-on', on); chips[k].setAttribute('aria-pressed', on); } }
      setPath(qp, 'link', true);
      var pr = q.get('procedure'), co = q.get('country');
      if (qp === 'treatment' && pr && P[pr]) { S.proc = pr; if (co && price(pr, co)) S.country = co; }
      if (qp === 'travel' && co && C[co]) S.country = co;
      if (qp === 'gaps' && pr && P[pr]) S.gap = pr;
      render();
      ensureMap();
    });
  }
  // Load the globe once the page is idle; sooner if the visitor chooses a path
  var idle = function () { whenData(function () { ensureMap(); }); };
  var start = function () { if ('requestIdleCallback' in window) requestIdleCallback(idle, { timeout: 2500 }); else setTimeout(idle, 600); };
  if (doc.readyState === 'complete') start(); else window.addEventListener('load', start);
})();
