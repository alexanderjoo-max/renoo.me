// Runs on every page: home country and currency, price conversion, tracking, analytics loading.
(function () {
  'use strict';
  var cfg = JSON.parse(document.getElementById('site-config').textContent);
  var R = (window.Renoo = { cfg: cfg });
  var doc = document;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
  };
  R.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  R.esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  // ---------- Countries ----------
  var countries = cfg.countries.map(function (c) { return { slug: c[0], name: c[1], iso2: c[2], currency: c[3], the: !!c[4] }; });
  var bySlug = {}, byIso = {};
  countries.forEach(function (c) { bySlug[c.slug] = c; byIso[c.iso2] = c; });
  R.countries = countries; R.country = function (s) { return bySlug[s]; };
  R.flag = function (iso2) { return String.fromCodePoint(0x1f1e6 + iso2.charCodeAt(0) - 65, 0x1f1e6 + iso2.charCodeAt(1) - 65); };
  R.inName = function (c) { return (c.the ? 'the ' : '') + c.name; };

  // ---------- Tracking ----------
  // One function for every event. It sends to Google Analytics 4 through gtag (which queues in
  // window.dataLayer, so Google Tag Manager can read it too). To use another analytics tool,
  // listen for the "renoo:track" event or replace the body of this function.
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  R.debug = /[?&]debug_track\b/.test(location.search);
  R.track = function (event, props) {
    props = props || {};
    try { window.gtag('event', event, props); } catch (e) { /* analytics must never break the page */ }
    try { doc.dispatchEvent(new CustomEvent('renoo:track', { detail: { event: event, props: props } })); } catch (e) { /* old browsers */ }
    if (R.debug && window.console) console.log('[track]', event, JSON.stringify(props));
  };
  window.track = R.track;

  // Analytics scripts load after the page is usable, so they never delay the first screen.
  var analyticsLoaded = false;
  function loadAnalytics() {
    if (analyticsLoaded) return; analyticsLoaded = true;
    window.gtag('js', new Date()); window.gtag('config', cfg.ga4);
    var add = function (src) { var s = doc.createElement('script'); s.async = true; s.src = src; doc.head.appendChild(s); };
    add('https://www.googletagmanager.com/gtag/js?id=' + cfg.ga4);
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    add('https://www.googletagmanager.com/gtm.js?id=' + cfg.gtm);
  }
  if (!/[?&]no_analytics\b/.test(location.search) && !navigator.webdriver) {
    ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (ev) { window.addEventListener(ev, loadAnalytics, { once: true, passive: true }); });
    window.addEventListener('load', function () { setTimeout(loadAnalytics, 3500); });
  }

  // ---------- Home country and currency ----------
  function detect() {
    var saved = store.get('renoo.home');
    if (saved && bySlug[saved]) return { slug: saved, source: 'saved' };
    var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    var firstRegion = null;
    for (var i = 0; i < langs.length; i++) {
      var m = /[-_]([A-Za-z]{2})\b/.exec(langs[i] || '');
      if (!m) continue;
      var iso = m[1].toUpperCase();
      if (!firstRegion) firstRegion = iso;
      if (byIso[iso]) return { slug: byIso[iso].slug, source: 'browser' };
    }
    return { slug: cfg.base, source: 'default', region: firstRegion };
  }
  var det = detect();
  var home = bySlug[det.slug];
  var rates = cfg.fx.rates;
  var currency = store.get('renoo.currency');
  if (!currency || !rates[currency]) currency = rates[home.currency] ? home.currency : 'USD';
  R.homeSource = det.source;

  var fmtCache = {};
  function formatter(cur) {
    if (!fmtCache[cur]) { try { fmtCache[cur] = new Intl.NumberFormat('en', { style: 'currency', currency: cur, maximumFractionDigits: 0 }); } catch (e) { fmtCache[cur] = { format: function (n) { return cur + ' ' + Math.round(n).toLocaleString('en'); } }; } }
    return fmtCache[cur];
  }
  R.money = function (usd) { return formatter(currency).format(usd * rates[currency]); };
  R.home = function () { return home; };
  R.currency = function () { return currency; };
  R.pct = function (homeTyp, destTyp) { return homeTyp ? Math.round(((homeTyp - destTyp) / homeTyp) * 100) : null; };
  R.pctShort = function (p) { return p == null ? '—' : p > 0 ? '−' + p + '%' : p < 0 ? '+' + -p + '%' : '0%'; };
  R.date = function (iso) { var d = new Date(iso + 'T00:00:00Z'); return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }); };

  var dataPromise = null;
  R.data = function () {
    if (!dataPromise) dataPromise = fetch('/assets/app-data.json?v=' + cfg.v).then(function (r) { return r.json(); });
    return dataPromise;
  };

  function applyPrices(rootEl) {
    var els = (rootEl || doc).querySelectorAll('.px');
    for (var i = 0; i < els.length; i++) {
      var usd = Number(els[i].getAttribute('data-usd'));
      if (currency === 'USD') { els[i].textContent = '$' + usd.toLocaleString('en-US'); els[i].removeAttribute('title'); }
      else { els[i].textContent = R.money(usd); els[i].title = 'US$' + usd.toLocaleString('en-US') + ' in the data'; }
    }
    var notes = (rootEl || doc).querySelectorAll('[data-fx-note]');
    for (var j = 0; j < notes.length; j++) {
      notes[j].textContent = currency === 'USD'
        ? 'Prices are stored in US dollars and shown in US dollars.'
        : 'Prices are stored in US dollars and shown here in ' + currency + ', converted at the European Central Bank reference rate of ' + R.date(cfg.fx.date) + '. Converted prices are approximate.';
    }
  }
  R.applyPrices = applyPrices;

  function applyVersus() {
    var cells = doc.querySelectorAll('[data-vs]'), stat = doc.querySelector('[data-home-stat]');
    if (!cells.length && !stat) return;
    var labels = doc.querySelectorAll('[data-vs-label]');
    for (var k = 0; k < labels.length; k++) labels[k].textContent = home.name;
    if (home.slug === cfg.base && !R._vsChanged) return; // the HTML already compares with the base country
    R._vsChanged = true;
    R.data().then(function (d) {
      for (var i = 0; i < cells.length; i++) {
        var el = cells[i], proc = el.getAttribute('data-proc'), c = el.getAttribute('data-country');
        var h = d.prices[proc] && d.prices[proc][home.slug];
        el.classList.remove('vs-less', 'vs-more');
        if (c === home.slug) { el.textContent = 'home'; continue; }
        if (!h) { el.textContent = '—'; el.title = 'No price for this procedure in ' + R.inName(home); continue; }
        var p = R.pct(h[1], Number(el.getAttribute('data-typ')));
        el.textContent = R.pctShort(p); el.removeAttribute('title');
        if (p > 0) el.classList.add('vs-less'); else if (p < 0) el.classList.add('vs-more');
      }
      if (stat) {
        var hp = d.prices[stat.getAttribute('data-proc')][home.slug];
        if (hp) { stat.querySelector('[data-home-stat-label]').textContent = home.name; stat.querySelector('[data-home-stat-value]').innerHTML = '<span class="px" data-usd="' + hp[1] + '"></span>'; applyPrices(stat); }
      }
    });
  }

  function paintPill() {
    var pill = doc.querySelector('[data-home-open]');
    if (!pill) return;
    pill.hidden = false;
    pill.querySelector('[data-home-flag]').textContent = R.flag(home.iso2);
    pill.querySelector('[data-home-label]').textContent = (window.innerWidth < 520 ? '' : home.name + ' · ') + currency;
    pill.setAttribute('aria-label', 'Home country: ' + home.name + '. Currency: ' + currency + '. Change');
  }

  R.setHome = function (slug, cur, source) {
    if (slug && bySlug[slug]) { home = bySlug[slug]; store.set('renoo.home', slug); if (!cur) cur = rates[home.currency] ? home.currency : 'USD'; }
    if (cur && rates[cur]) { currency = cur; store.set('renoo.currency', cur); }
    paintPill(); applyPrices(); R._vsChanged = true; applyVersus();
    R.track('home_country_changed', { home: home.slug, currency: currency, source: source || 'manual' });
    doc.dispatchEvent(new CustomEvent('renoo:home'));
  };

  function setupDialog() {
    var dlg = doc.getElementById('homeDialog'), pill = doc.querySelector('[data-home-open]');
    if (!dlg || !pill || !dlg.showModal) return;
    var selC = dlg.querySelector('[data-home-country]'), selCur = dlg.querySelector('[data-home-currency]'), note = dlg.querySelector('[data-home-note]');
    selC.innerHTML = countries.map(function (c) { return '<option value="' + c.slug + '">' + R.esc(c.name) + '</option>'; }).join('');
    selCur.innerHTML = Object.keys(rates).sort().map(function (c) { return '<option>' + c + '</option>'; }).join('');
    R.openHome = function () {
      selC.value = home.slug; selCur.value = currency;
      note.textContent = det.source === 'browser' ? 'Detected from your browser language. Change it if it is wrong.'
        : det.source === 'default' ? 'Renoo could not match your browser language to a country it has prices for, so it compares with the United States. Pick the closest country.'
        : 'Converted prices use the European Central Bank rate of ' + R.date(cfg.fx.date) + '.';
      dlg.showModal();
    };
    pill.addEventListener('click', R.openHome);
    selC.addEventListener('change', function () { var c = bySlug[selC.value]; selCur.value = rates[c.currency] ? c.currency : 'USD'; });
    dlg.addEventListener('close', function () { if (selC.value !== home.slug || selCur.value !== currency) { det.source = 'saved'; R.setHome(selC.value, selCur.value, 'manual'); } });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  }

  // Count a number up to its value (used for savings figures)
  R.countUp = function (el, to, render) {
    if (R.reducedMotion || !window.requestAnimationFrame) { el.textContent = render(to); return; }
    var t0 = null, dur = 650;
    function step(t) { if (!t0) t0 = t; var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = render(Math.round(to * e)); if (k < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  };

  function init() {
    paintPill(); setupDialog(); applyPrices(); applyVersus();
    window.addEventListener('resize', paintPill, { passive: true });
    // Page-level view events (set by the server on body[data-track])
    var t = doc.body.getAttribute('data-track');
    if (t) { try { var o = JSON.parse(t), ev = o.event; delete o.event; o.surface = 'page'; if (ev !== 'comparison_made') o.home = home.slug; R.track(ev, o); } catch (e) { /* ignore */ } }
    // Clinic website clicks keep the event name the old site used
    doc.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[data-clinic]');
      if (a) window.dataLayer.push({ event: 'clinic_website_click', clinic_name: a.getAttribute('data-clinic') });
      var menu = doc.querySelector('.mobile-menu[open]');
      if (menu && !menu.contains(e.target)) menu.removeAttribute('open');
    });
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init); else init();
})();
