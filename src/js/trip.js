// Trip cost calculator: procedure + round-trip flight + 7-night hotel, as on the old site.
(function () {
  'use strict';
  var R = window.Renoo, esc = R.esc, doc = document;
  var form = doc.querySelector('[data-trip]'), out = doc.querySelector('[data-trip-out]'), src = doc.querySelector('[data-trip-cities]');
  if (!form || !out || !src) return;
  var cities = JSON.parse(src.textContent); // [city, country, typical price]
  var selH = form.querySelector('[data-trip-home]'), selD = form.querySelector('[data-trip-dest]');
  var name = form.getAttribute('data-proc-name'), destCountry = form.getAttribute('data-dest-country'), T = null;
  var key = function (c) { return c[0] + '|' + c[1]; };
  function options(list) {
    var groups = {};
    list.forEach(function (c) { (groups[c[1]] = groups[c[1]] || []).push(c); });
    return Object.keys(groups).sort().map(function (g) { return '<optgroup label="' + esc(g) + '">' + groups[g].sort(function (a, b) { return a[0].localeCompare(b[0]); }).map(function (c) { return '<option value="' + esc(key(c)) + '">' + esc(c[0]) + '</option>'; }).join('') + '</optgroup>'; }).join('');
  }
  selH.insertAdjacentHTML('beforeend', options(cities));
  var dests = destCountry ? cities.filter(function (c) { return c[1] === destCountry; }) : cities;
  selD.insertAdjacentHTML('beforeend', options(dests));
  if (dests.length === 1) selD.value = key(dests[0]);
  var homeCities = cities.filter(function (c) { return c[1] === R.home().name; });
  if (homeCities.length && (!destCountry || destCountry !== R.home().name)) selH.value = key(homeCities[0]);

  function flight(a, b) {
    if (a === b) return 0;
    var r1 = T.cityRegion[a], r2 = T.cityRegion[b];
    if (!r1 || !r2) return T.defaultFlight;
    if (r1 === r2) return T.flight[r1 + '-' + r2] || 200;
    return T.flight[r1 + '-' + r2] || T.flight[r2 + '-' + r1] || T.defaultFlight;
  }
  function calc() {
    var h = cities.filter(function (c) { return key(c) === selH.value; })[0], d = cities.filter(function (c) { return key(c) === selD.value; })[0];
    if (!h || !d || !T) { out.innerHTML = ''; return; }
    var f = flight(h[0], d[0]), hotel = T.hotel[d[0]] || T.defaultHotel, total = f + hotel + d[2], saving = h[2] - total;
    var px = function (n) { return '<span class="px" data-usd="' + Math.round(n) + '"></span>'; };
    out.innerHTML = '<div class="detail trip-result">' +
      (saving > 0 ? '<div class="detail-big vs-less">Save ' + px(saving) + '</div><p>Even with flight + hotel included</p>'
        : saving < 0 ? '<div class="detail-big" style="color:var(--ink)">Only ' + px(-saving) + ' more</div><p>For a medical vacation with flight + hotel included</p>'
        : '<p>Same total cost with flight + hotel included.</p>') +
      '<table class="data"><caption>Trip cost breakdown</caption><tbody>' +
      '<tr><th scope="row">Round-trip flight (' + esc(h[0]) + ' → ' + esc(d[0]) + ')</th><td class="n">' + px(f) + '</td></tr>' +
      '<tr><th scope="row">7-night hotel in ' + esc(d[0]) + '</th><td class="n">' + px(hotel) + '</td></tr>' +
      '<tr><th scope="row">' + esc(name) + ' procedure</th><td class="n">' + px(d[2]) + '</td></tr>' +
      '<tr class="is-current"><th scope="row">Total trip cost</th><td class="n"><strong>' + px(total) + '</strong></td></tr>' +
      '<tr><th scope="row">' + esc(name) + ' in ' + esc(h[0]) + '</th><td class="n">' + px(h[2]) + '</td></tr>' +
      '</tbody></table><div class="detail-actions"><a class="btn" href="/travel?city=' + encodeURIComponent(d[0]) + '">Compare flight + hotel prices</a></div></div>';
    R.applyPrices(out);
    R.track('trip_calculated', { procedure: name, from: h[0], to: d[0] });
  }
  form.addEventListener('change', function () {
    if (T) return calc();
    fetch('/assets/trip.json?v=' + R.cfg.v).then(function (r) { return r.json(); }).then(function (t) { T = t; calc(); });
  });
  if (selH.value && selD.value) form.dispatchEvent(new Event('change'));
})();
