// Home page: the map is the hero, with the three paths in a panel on top of it.
// Everything in the panel and below it is plain HTML, so the page reads without JavaScript.
import { SITE, STAGE } from '../../content/site.mjs';
import { esc, px, usdText, fmtDate, plural, flag, pctShort, icon, ICONS, faqBlock, ld, num } from './html.mjs';

export function homePage(data) {
  const path = '/';
  const cities = new Set(data.rows.map((r) => `${r.city}|${r.country.slug}`)).size;
  const title = 'Renoo: compare procedure prices by country on a live map';
  const description = `Compare what clinics charge for ${data.procedures.length} medical, wellness and aesthetic procedures in ${data.countries.length} countries. Start from a destination, a treatment, or the biggest price gaps.`;
  const top = data.gaps[0];
  const byMedian = data.countries.filter((c) => c !== data.base && !c.noindex && c.medianSavingVsBase !== null).sort((a, b) => b.medianSavingVsBase - a.medianSavingVsBase);

  const paths = [
    { id: 'travel', icon: ICONS.plane, title: 'I’m traveling to…', sub: 'Pick a destination. See what is available there and what it costs against home.' },
    { id: 'treatment', icon: ICONS.target, title: 'I want a treatment…', sub: 'Pick a procedure. The map turns into a price heatmap with the best-value countries ranked.' },
    { id: 'gaps', icon: ICONS.arcs, title: 'Explore price gaps', sub: 'See where the same procedure costs the most and the least, anywhere in the world.' },
  ];

  const gapItem = (g) => `<li><a class="row" href="${g.proc.url}" style="--accent:${g.proc.cat.color}">
<span class="row-main"><span class="row-title">${esc(g.proc.name)}</span><span class="row-sub">${esc(g.high.country.name)} ${usdText(g.high.typical)} → ${esc(g.low.country.name)} ${usdText(g.low.typical)}</span></span>
<span class="row-num vs-less">−${g.pct}%</span></a></li>`;
  const countryItem = (c) => `<li><a class="row" href="${c.url}">
<span class="row-flag" aria-hidden="true">${flag(c.iso2)}</span><span class="row-main"><span class="row-title">${esc(c.name)}</span><span class="row-sub">${plural(c.cells.length, 'procedure')}, ${plural(c.cityList.length, 'city', 'cities')}</span></span>
<span class="row-num vs-less">${pctShort(c.medianSavingVsBase)}</span></a></li>`;
  const procGroups = data.categories.map((cat) => `<li class="group" style="--accent:${cat.color}"><span class="group-h">${icon(cat.icon, 'ico ico-sm ico-accent')}${esc(cat.name)}</span><ul>${cat.procedures.map((p) => `<li><a class="row row-slim" href="${p.url}"><span class="row-main"><span class="row-title">${esc(p.name)}</span></span><span class="row-num">${usdText(p.cheapest.typical)}${p.cells.length > 1 ? `–${usdText(p.priciest.typical)}` : ''}</span></a></li>`).join('')}</ul></li>`).join('');

  const catCards = data.categories.map((c) => `<a class="card cat-card" href="${c.url}" style="--accent:${c.color}">
${icon(c.icon, 'ico ico-lg ico-accent')}
<h3>${esc(c.name)}</h3><p>${esc(c.tagline)}</p>
<span class="muted">${plural(c.procedures.length, 'procedure')}</span></a>`).join('\n');

  const gapRows = data.gaps.slice(0, 15).map((g) => `<tr><th scope="row"><a href="${g.proc.url}">${esc(g.proc.name)}</a></th>
<td>${esc(g.high.country.name)} <span class="n">${px(g.high.typical)}</span></td><td>${esc(g.low.country.name)} <span class="n">${px(g.low.typical)}</span></td>
<td class="n vs-less">−${g.pct}%</td><td><time datetime="${g.proc.updated}">${fmtDate(g.proc.updated)}</time></td></tr>`).join('\n');

  const faq = [
    { q: 'What does Renoo compare?', a: `Typical prices and price ranges for ${data.procedures.length} medical, wellness and aesthetic procedures in ${cities} cities across ${data.countries.length} countries, in ${data.categories.length} sections.` },
    { q: 'Which procedure has the biggest price gap between countries?', a: `${top.proc.Phrase}: the typical price is ${usdText(top.high.typical)} in ${top.high.country.inName} and ${usdText(top.low.typical)} in ${top.low.country.inName}, about ${top.pct}% less.` },
    { q: 'Which country has the lowest prices compared with the United States?', a: `${byMedian[0].name}. Across the procedures tracked in both countries, typical prices there are about ${byMedian[0].medianSavingVsBase}% lower at the median. ${byMedian[1].name} (${byMedian[1].medianSavingVsBase}%) and ${byMedian[2].name} (${byMedian[2].medianSavingVsBase}%) follow.` },
    { q: 'Where do the prices come from?', a: `Each price row records its source type, such as clinic websites, aggregators or market estimates, and a confidence rating. The data was last changed on ${fmtDate(data.updated)}. Prices are estimates for comparison, not quotes.` },
    { q: 'Do the prices include flights and hotels?', a: 'No. Prices cover the procedure only. Travel, accommodation and follow-up care are extra.' },
  ];

  if (!STAGE.seo) faq.length = 0;
  const jsonld = ld.graph([
    { '@type': 'WebSite', '@id': `${SITE.url}/#website`, name: SITE.name, alternateName: 'Renoo.me', url: `${SITE.url}/`, description },
    { '@type': 'Organization', '@id': `${SITE.url}/#org`, name: SITE.name, url: `${SITE.url}/`, logo: `${SITE.url}/logo.svg`, email: SITE.email },
    ld.breadcrumbs([{ name: 'Home', url: '/' }]),
    ld.webPage({ path, title, description, updated: data.updated }),
    ld.faq(faq),
  ]);

  const body = `<main id="main" class="home">
<section class="stage" id="stage" aria-label="Price map">
  <div class="globe" id="globe">
    <div class="globe-fallback" aria-hidden="true"></div>
    <div class="globe-map" id="globeMap"></div>
  </div>
  <div class="map-ui">
    <div class="legend" id="legend" hidden></div>
    <p class="map-hint" id="mapHint" hidden></p>
  </div>
  <div class="sheet" id="sheet" data-snap="half">
    <button class="sheet-handle" type="button" id="sheetHandle" aria-label="Resize the panel" hidden><span></span></button>
    <div class="sheet-scroll" id="sheetScroll">
      <div class="intro">
        <h1>Compare procedure prices <em>by country</em></h1>
        <p class="lede">Price ranges for ${data.procedures.length} procedures in ${data.countries.length} countries, from ${num(data.rows.length)} price rows. How do you want to start?</p>
      </div>
      <nav class="paths" id="paths" aria-label="Choose a starting point">
        ${paths.map((p) => `<a class="path" href="#panel-${p.id}" data-path="${p.id}" id="tab-${p.id}">${icon(p.icon)}<span class="path-text"><span class="path-title">${p.title}</span><span class="path-sub">${p.sub}</span></span></a>`).join('\n        ')}
      </nav>
      <div class="filter" id="catFilter" aria-label="Filter by section">
        <span class="filter-label">Section</span>
        <a class="chip is-on" href="/procedures" data-cat="">All</a>
        ${data.categories.map((c) => `<a class="chip" href="${c.url}" data-cat="${c.slug}" style="--accent:${c.color}"><i></i>${esc(c.name)}</a>`).join('\n        ')}
      </div>
      <section class="panel" id="panel-travel" aria-labelledby="h-travel">
        <h2 id="h-travel" class="panel-h">I’m traveling to…</h2>
        <div class="controls" id="controls-travel"></div>
        <div class="results" id="results-travel">
          <p class="results-h">Destinations with the lowest prices against the United States (median across procedures)</p>
          <ol class="rows">${byMedian.slice(0, 12).map(countryItem).join('')}</ol>
          <p><a href="/countries">All ${data.countries.length} countries</a></p>
        </div>
      </section>
      <section class="panel" id="panel-treatment" aria-labelledby="h-treatment">
        <h2 id="h-treatment" class="panel-h">I want a treatment…</h2>
        <div class="controls" id="controls-treatment"></div>
        <div class="results" id="results-treatment">
          <p class="results-h">Procedures by section, with the lowest and highest typical price</p>
          <ul class="groups">${procGroups}</ul>
        </div>
      </section>
      <section class="panel" id="panel-gaps" aria-labelledby="h-gaps">
        <h2 id="h-gaps" class="panel-h">Explore price gaps</h2>
        <div class="controls" id="controls-gaps"></div>
        <div class="results" id="results-gaps">
          <p class="results-h">Most expensive country against cheapest, at typical prices</p>
          <ol class="rows">${data.gaps.slice(0, 10).map(gapItem).join('')}</ol>
        </div>
      </section>
      <p class="sheet-foot"><a href="#more">About the data and all sections</a></p>
    </div>
  </div>
</section>

<div class="wrap below" id="more">
<section class="section">
  <h2>Sections</h2>
  <div class="grid grid-cats">${catCards}</div>
</section>
<section class="section" id="gaps-table">
  <h2>The biggest price gaps</h2>
  <p>The same procedure, in the most expensive and the cheapest country Renoo tracks, at typical prices.</p>
  <p class="note"><span data-fx-note>Prices are stored in US dollars and shown in US dollars.</span></p>
  <div class="table-wrap"><table class="data">
    <caption>Largest differences in typical price between two countries</caption>
    <thead><tr><th scope="col">Procedure</th><th scope="col">Most expensive</th><th scope="col">Cheapest</th><th scope="col">Gap</th><th scope="col">Last updated</th></tr></thead>
    <tbody>${gapRows}</tbody>
  </table></div>
  <p class="note"><strong>Source:</strong> Renoo price data (clinic websites, aggregators and market estimates). Prices are indicative ranges for comparison only.${STAGE.seo ? ' <a href="/methodology">Methodology</a>.' : ''}</p>
</section>
<section class="section">
  <h2>Where typical prices are lowest</h2>
  <p>Median difference in typical price against the United States, across every procedure tracked in both countries.</p>
  <ol class="rows rows-wide">${byMedian.slice(0, 12).map(countryItem).join('')}</ol>
  <p><a href="/countries">All ${data.countries.length} countries</a></p>
</section>
${!STAGE.seo ? '' : `<section class="section prose">
  <h2>About the numbers</h2>
  <p>Every price on Renoo is a range for one procedure in one city, recorded in US dollars with a source type and a confidence rating. Country figures combine the cities tracked in that country. The data was last changed on <time datetime="${data.updated}">${fmtDate(data.updated)}</time>.</p>
  <p>Renoo is a price comparison, not a clinic and not medical advice. Read the <a href="/methodology">methodology</a>, the <a href="/medical-disclaimer">medical disclaimer</a> and <a href="/about">about Renoo</a>.</p>
</section>`}
${faqBlock(faq)}
</div>
</main>`;
  return {
    path, title, description, jsonld, body, bodyClass: 'is-home',
    scripts: '<script src="/assets/home.js" defer></script>',
  };
}
