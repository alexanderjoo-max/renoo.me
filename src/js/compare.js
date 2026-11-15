// Compare tool: two countries, every procedure Renoo tracks in both.
(function () {
  'use strict';
  var R = window.Renoo, esc = R.esc, doc = document;
  var form = doc.querySelector('[data-compare-tool]'), out = doc.querySelector('[data-compare-out]');
  if (!form || !out) return;
  var selA = form.querySelector('[data-compare-a]'), selB = form.querySelector('[data-compare-b]');
  var q = new URLSearchParams(location.search), D = null, last = '';

  function render() {
    var a = selA.value, b = selB.value;
    if (!a || !b || a === b) { out.innerHTML = '<p class="placeholder">Choose two different countries.</p>'; return; }
    var A = R.country(a), B = R.country(b), cats = {}, rows = [], onlyA = 0, onlyB = 0;
    D.categories.forEach(function (c) { cats[c.s] = c; });
    D.procedures.forEach(function (p) {
      var x = D.prices[p.s][a], y = D.prices[p.s][b];
      if (x && y) rows.push({ p: p, x: x, y: y, pct: R.pct(x[1], y[1]) }); else if (x) onlyA++; else if (y) onlyB++;
    });
    rows.sort(function (m, n) { return n.pct - m.pct; });
    if (!rows.length) { out.innerHTML = '<p class="placeholder">Renoo has no procedure with prices in both ' + esc(A.name) + ' and ' + esc(B.name) + '.</p>'; return; }
    var sorted = rows.map(function (r) { return r.pct; }).sort(function (m, n) { return m - n; }), med = sorted[sorted.length >> 1];
    var link = function (p, c, x) { return x[6] ? '/procedure/' + p : '/' + p + '-in-' + c; };
    out.innerHTML = '<div class="stats"><div class="stat"><span class="stat-label">Procedures in both</span><strong>' + rows.length + '</strong><span>' + esc(A.name) + ' and ' + esc(B.name) + '</span></div>' +
      '<div class="stat"><span class="stat-label">Median difference</span><strong class="' + (med > 0 ? 'vs-less' : med < 0 ? 'vs-more' : '') + '">' + R.pctShort(med) + '</strong><span>' + esc(B.name) + ' against ' + esc(A.name) + '</span></div></div>' +
      '<div class="table-wrap"><table class="data"><caption>Typical prices in ' + esc(A.name) + ' and ' + esc(B.name) + '</caption><thead><tr><th scope="col">Procedure</th><th scope="col">' + R.flag(A.iso2) + ' ' + esc(A.name) + '</th><th scope="col">' + R.flag(B.iso2) + ' ' + esc(B.name) + '</th><th scope="col">Difference</th><th scope="col">Last updated</th></tr></thead><tbody>' +
      rows.map(function (r) {
        var newest = r.x[5] > r.y[5] ? r.x[5] : r.y[5];
        return '<tr><th scope="row"><a href="/procedure/' + r.p.s + '">' + esc(r.p.n) + '</a></th><td class="n"><a href="' + link(r.p.s, a, r.x) + '"><span class="px" data-usd="' + r.x[1] + '"></span></a></td><td class="n"><a href="' + link(r.p.s, b, r.y) + '"><span class="px" data-usd="' + r.y[1] + '"></span></a></td><td class="vs ' + (r.pct > 0 ? 'vs-less' : r.pct < 0 ? 'vs-more' : '') + '">' + R.pctShort(r.pct) + '</td><td>' + R.date(newest) + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<p class="note">Typical prices. ' + (onlyA ? onlyA + ' more ' + (onlyA === 1 ? 'procedure has' : 'procedures have') + ' a price only in ' + esc(A.name) + '. ' : '') + (onlyB ? onlyB + ' more only in ' + esc(B.name) + '. ' : '') + 'Prices are indicative ranges for comparison only.</p>';
    R.applyPrices(out);
    try { history.replaceState(null, '', '/compare?a=' + a + '&b=' + b); } catch (e) { /* ignore */ }
    if (last !== a + '|' + b) { last = a + '|' + b; R.track('comparison_made', { method: 'tool', home: a, destination: b, procedures: rows.length }); }
  }

  R.data().then(function (d) {
    D = d;
    var opts = d.countries.slice().sort(function (m, n) { return m.n.localeCompare(n.n); }).map(function (c) { return '<option value="' + c.s + '">' + esc(c.n) + '</option>'; }).join('');
    selA.innerHTML = opts; selB.innerHTML = '<option value="">Choose a destination…</option>' + opts;
    selA.value = R.country(q.get('a')) ? q.get('a') : R.home().slug;
    if (R.country(q.get('b'))) selB.value = q.get('b');
    render();
  });
  form.addEventListener('change', render);
  form.querySelector('[data-compare-swap]').addEventListener('click', function () { var t = selA.value; if (!selB.value) return; selA.value = selB.value; selB.value = t; render(); });
  doc.addEventListener('renoo:home', function () { if (D) render(); });
})();
