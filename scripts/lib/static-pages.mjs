// Trust pages (methodology, about, medical disclaimer), the travel page, the 404 page,
// and small redirect pages that keep the old query-string URLs working.
import { SITE, STAGE } from '../../content/site.mjs';
import { esc, fmtDate, breadcrumbs, ld, num, plural } from './html.mjs';

const HOME = { name: 'Home', url: '/' };
const simple = (data, { path, name, title, description, html, extra = {} }) => {
  const crumbs = [HOME, { name, url: path }];
  return { path, title, description, jsonld: ld.graph([ld.breadcrumbs(crumbs), ld.webPage({ path, title, description, updated: data.updated })]), body: `<main id="main" class="wrap page prose">${breadcrumbs(crumbs)}${html}</main>`, ...extra };
};

export function methodologyPage(data) {
  const count = (key) => { const m = new Map(); for (const r of data.rows) m.set(r[key], (m.get(r[key]) || 0) + 1); return [...m.entries()].sort((a, b) => b[1] - a[1]); };
  const sources = count('source'), conf = Object.fromEntries(count('confidence'));
  const byDate = count('updated').sort((a, b) => b[0].localeCompare(a[0]));
  const cities = new Set(data.rows.map((r) => `${r.city}|${r.country.slug}`)).size;
  const fxCodes = Object.keys(data.fx.rates).sort();
  return simple(data, {
    path: '/methodology', name: 'Methodology',
    title: 'Methodology: where Renoo prices come from | Renoo',
    description: `How Renoo collects and presents prices: ${num(data.rows.length)} price rows for ${data.procedures.length} procedures in ${data.countries.length} countries, their source types, confidence ratings and update dates.`,
    html: `<header class="hero"><h1>Methodology</h1>
<p class="answer">Renoo holds ${num(data.rows.length)} price rows covering ${data.procedures.length} procedures in ${cities} cities and ${data.countries.length} countries. Each row has a low, high and typical price in US dollars, a source type and a confidence rating. The data was last changed on ${fmtDate(data.updated)}.</p></header>
<section class="section"><h2>What a price row is</h2>
<p>A row is one procedure in one city. It records the lowest and highest price found and a typical price, all in US dollars, with a short note on what the price includes. Prices are for self-paying patients. They are estimates meant for comparing countries. They are not quotes, and a clinic may charge more or less.</p>
<p>Flights, accommodation, follow-up care and complications are not included in any figure.</p></section>
<section class="section"><h2>Where prices come from</h2>
<p>Each row carries a source type. Renoo does not yet store a link or document for individual rows, so pages state the source type only.</p>
<div class="table-wrap"><table class="data"><caption>Price rows by source type</caption><thead><tr><th scope="col">Source type as recorded</th><th scope="col">Rows</th></tr></thead>
<tbody>${sources.map(([s, n]) => `<tr><th scope="row">${esc(s)}</th><td class="n">${num(n)}</td></tr>`).join('')}</tbody></table></div></section>
<section class="section"><h2>Confidence ratings</h2>
<p>Each row is rated High, Medium or Low confidence in the data: ${num(conf.High || 0)} rows are High, ${num(conf.Medium || 0)} Medium and ${num(conf.Low || 0)} Low. The rating is shown next to every price. A procedure-in-country page whose only evidence is a Low-confidence estimate with no clinic listed is kept out of search engines.</p></section>
<section class="section"><h2>Country figures</h2>
<ul><li><strong>Price range</strong> for a country runs from the lowest low to the highest high across the cities tracked there.</li>
<li><strong>Typical price</strong> for a country is the median of the typical prices of its cities.</li>
<li><strong>Savings</strong> compare typical prices: the difference between your home country and the destination, as a share of the home price. The default home country is the United States.</li>
<li><strong>Median difference</strong> on country pages is the middle value of those differences across every procedure tracked in both countries.</li></ul>
<p>${data.issues.reorderedPrices.length} Botox rows list a typical price outside their own low to high range. For those rows the three figures are read as lowest, middle and highest.</p></section>
<section class="section"><h2>How often prices are updated</h2>
<p>There is no fixed schedule yet. Rows are updated when new information is added. The date shown beside each price is the date that row's figures last changed.</p>
<div class="table-wrap"><table class="data"><caption>When the current price rows last changed</caption><thead><tr><th scope="col">Date</th><th scope="col">Rows last changed on that date</th></tr></thead>
<tbody>${byDate.map(([d, n]) => `<tr><th scope="row"><time datetime="${d}">${fmtDate(d)}</time></th><td class="n">${num(n)}</td></tr>`).join('')}</tbody></table></div></section>
<section class="section"><h2>Currency conversion</h2>
<p>Prices are stored in US dollars. When you choose another currency, Renoo converts with the ${esc(data.fx.source)} of ${fmtDate(data.fx.date)}. Converted prices are approximate. Currencies available: ${fxCodes.join(', ')}.</p></section>
<section class="section"><h2>Clinic listings</h2>
<p>Renoo lists ${num(data.clinicsUsed)} clinic entries next to prices. Clinic details, prices and accreditations are shown as recorded in Renoo's clinic list and have not been independently verified. A listing is not a recommendation or an endorsement.</p></section>
<section class="section"><h2>Legal and regulatory status</h2>
<p>Renoo does not hold verified legal-status data for any therapy in any country. Pages in the Men's Health, Peptides and Restricted at Home sections mark legal status as not yet verified and quote only the regulatory notes recorded with the price data.</p></section>
<section class="section"><h2>Procedure descriptions</h2>
<p>Descriptions, safety and recovery information come from Renoo's procedure guide. They are general information, have not been reviewed by a named medical professional, and are not medical advice. See the <a href="/medical-disclaimer">medical disclaimer</a>.</p></section>
<section class="section"><h2>Open data and corrections</h2>
<p>The country-level figures are available as <a href="/api/prices.json">a JSON file</a>. If a price is wrong or out of date, write to <a href="mailto:${SITE.email}">${SITE.email}</a>.</p></section>`,
  });
}

export function aboutPage(data) {
  const cities = new Set(data.rows.map((r) => `${r.city}|${r.country.slug}`)).size;
  // Until the content stage is switched on, the About page keeps the wording of the old site.
  if (!STAGE.seo) return simple(data, {
    path: '/about', name: 'About',
    title: 'About Renoo.me — Transparent Healthcare Pricing, Worldwide',
    description: 'Renoo.me is a global medical procedure price comparison platform. We make healthcare pricing transparent and easy to understand.',
    html: `<header class="hero"><h1>Transparent Healthcare Pricing, Worldwide</h1>
<p class="answer">Renoo.me is a global medical procedure price comparison platform. We make healthcare pricing transparent and easy to understand — whether you're considering treatment locally or exploring medical tourism abroad.</p></header>
<section class="section"><h2>What We Do</h2>
<p>Compare typical pricing for medical procedures across hundreds of cities worldwide. Save 50–80% by exploring quality care options in destinations like Bangkok, Istanbul, and Mexico City.</p></section>
<section class="section"><h2>Popular Procedures</h2>
<ul><li><strong>Cosmetic:</strong> Botox, rhinoplasty, liposuction</li><li><strong>Dental:</strong> Implants, veneers</li><li><strong>Fertility:</strong> IVF treatment</li><li><strong>Orthopedic:</strong> Hip and knee replacements</li><li><strong>Eye Surgery:</strong> LASIK</li></ul></section>
<section class="section"><h2>Want to add your clinic?</h2>
<p>Got a bug that's bugging you? Have opinions so hot they could melt titanium? We genuinely want to hear from you — compliments, complaints, or just a vibe check.</p>
<p><a href="mailto:${SITE.email}">${SITE.email}</a></p>
<p class="hero-actions"><a class="btn" href="/">Start Exploring Prices →</a></p></section>`,
  });
  return simple(data, {
    path: '/about', name: 'About',
    title: 'About Renoo: procedure prices compared by country | Renoo',
    description: `Renoo compares what clinics charge for ${data.procedures.length} medical, wellness and aesthetic procedures in ${data.countries.length} countries, so you can see the price before you decide where to be treated.`,
    html: `<header class="hero"><h1>About Renoo</h1>
<p class="answer">Renoo is a price comparison site for medical, wellness and aesthetic procedures. It shows what clinics charge for ${data.procedures.length} procedures in ${cities} cities across ${data.countries.length} countries, whether you are considering treatment at home or abroad.</p></header>
<section class="section"><h2>What Renoo does</h2>
<p>Healthcare prices are hard to find and harder to compare. Renoo puts typical prices and price ranges for the same procedure in different countries side by side, with the type of source behind each figure and the date it was last updated.</p>
<p>You can start from a destination, from a treatment, or from the biggest price gaps on the <a href="/">price map</a>.</p></section>
<section class="section"><h2>What Renoo is not</h2>
<p>Renoo is not a clinic, a booking agent or a medical adviser. It does not recommend clinics or treatments, and the prices are estimates rather than quotes. Read the <a href="/methodology">methodology</a> and the <a href="/medical-disclaimer">medical disclaimer</a>.</p></section>
<section class="section"><h2>How Renoo is funded</h2>
<p>The <a href="/travel">flight and hotel search</a> is provided by a travel partner, and Renoo may earn a commission on bookings made through it. This does not affect the procedure prices shown.</p></section>
<section class="section"><h2>Contact</h2>
<p>Want to add your clinic? Found a price that is wrong or a bug? Write to <a href="mailto:${SITE.email}">${SITE.email}</a>.</p></section>`,
  });
}

export function disclaimerPage(data) {
  return simple(data, {
    path: '/medical-disclaimer', name: 'Medical disclaimer',
    title: 'Medical disclaimer | Renoo',
    description: 'Renoo provides price information only. It is not medical advice, does not recommend treatments or clinics, and does not state the legal status of any therapy.',
    html: `<header class="hero"><h1>Medical disclaimer</h1>
<p class="answer">Renoo provides price information for comparison only. Nothing on this site is medical advice, a diagnosis, or a recommendation of any treatment, clinic or country.</p></header>
<section class="section"><h2>Talk to a qualified doctor</h2>
<p>Always consult a qualified doctor before deciding on any procedure or therapy, and before travelling for treatment. Do not delay seeking medical advice, or disregard it, because of something you read on Renoo. In an emergency, contact your local emergency services.</p></section>
<section class="section"><h2>Prices are estimates</h2>
<p>Prices on Renoo are estimates gathered for comparison. They are not quotes or offers. Actual prices depend on the clinic, the practitioner and your individual case. Travel, accommodation, follow-up care and the cost of complications are not included.</p></section>
<section class="section"><h2>Regulated therapies</h2>
<p>Some therapies on Renoo, including hormone, peptide and regenerative therapies, are regulated differently from country to country. Renoo has not verified the legal status of any therapy in any country. A price or a clinic listing does not mean a therapy is approved, legal for you, or available without a prescription. Renoo gives no dosing guidance and no instructions for use.</p></section>
<section class="section"><h2>Clinics</h2>
<p>Clinic names, prices and accreditations are shown as recorded and have not been independently verified. A listing is not an endorsement. Check a clinic's licence, the practitioner's qualifications and the aftercare plan yourself.</p></section>
<section class="section"><h2>Procedure information</h2>
<p>Descriptions of procedures, risks and recovery are general information. They have not been reviewed by a named medical professional and may not apply to you.</p></section>
<section class="section"><h2>Questions</h2><p>Write to <a href="mailto:${SITE.email}">${SITE.email}</a>.</p></section>`,
  });
}

export function travelPage(data) {
  return simple(data, {
    path: '/travel', name: 'Flights and hotels',
    title: 'Flights and hotels for treatment abroad | Renoo',
    description: 'Search flight and hotel prices for a trip to a treatment destination. The search is provided by a travel partner.',
    html: `<header class="hero"><h1 id="travelTitle">Flights and hotels</h1>
<p class="answer" id="travelSub">Find flights and hotels for your medical tourism trip.</p></header>
<section class="section"><h2>Search</h2>
<div class="travel-widget card"><div id="tpwl-search" data-destination=""></div><div id="tpwl-tickets"></div><div id="tpwl-modals"></div></div>
<noscript><p class="placeholder">The flight and hotel search needs JavaScript.</p></noscript>
${STAGE.seo ? '<p class="note">The search is provided by a travel partner. Renoo may earn a commission on bookings.</p>' : ''}
<p><a href="/countries">Browse destinations</a> · <a href="/">Back to the price map</a></p></section>`,
    extra: { scripts: `<script>(function(){var q=new URLSearchParams(location.search).get('city')||new URLSearchParams(location.hash.slice(1)).get('city');if(q){q=q.replace(/[<>]/g,'');document.getElementById('travelTitle').textContent='Flights and hotels to '+q;document.title='Flights and hotels to '+q+' | Renoo';}var s=document.createElement('script');s.async=1;s.src='https://emrldtp.cc/NDkyMDM5.js?t=492039';document.head.appendChild(s);})();</script>` },
  });
}

export function notFoundPage(data) {
  const p = simple(data, {
    path: '/404', name: 'Page not found', title: 'Page not found | Renoo',
    description: 'This page does not exist. Browse procedures, countries or the price map.',
    html: `<header class="hero"><h1>Page not found</h1><p class="answer">There is nothing at this address. Try the <a href="/">price map</a>, the list of <a href="/procedures">procedures</a>, or the list of <a href="/countries">countries</a>.</p></header>`,
  });
  return { ...p, noindex: 'error page', file: '404.html' };
}

// Old URLs used query strings (procedure.html?procedure=Botox, city.html?city=Bangkok&procedure=Botox).
// These small pages send each one to its new address, and list plain links if JavaScript is off.
export function legacyRedirectPage(data, kind) {
  const loose = (s) => s.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
  const procs = {};
  for (const p of data.procedures) { if (p.dataName === 'Dental Veneers') continue; procs[p.dataName.toLowerCase()] = p.slug; procs[loose(p.dataName)] = p.slug; }
  procs['dental veneers'] = 'dental-veneers-full-mouth';
  const cities = {};
  for (const r of data.rows) cities[r.city.toLowerCase()] = cities[r.city.toLowerCase()] || r.country.slug;
  for (const [alias, real] of [['bogota', 'bogotá'], ['new york', 'new york city']]) if (cities[real]) cities[alias] = cities[real];
  const countries = {};
  for (const c of data.countries) countries[c.name.toLowerCase()] = c.slug;
  Object.assign(countries, { uk: 'united-kingdom', usa: 'united-states', uae: 'united-arab-emirates', 'czech rep.': 'czech-republic' });
  const combos = data.cells.filter((c) => !c.noindex).map((c) => c.slug);
  const path = kind === 'procedure' ? '/procedure' : '/city';
  const fallback = kind === 'procedure' ? '/procedures' : '/countries';
  const script = `(function(){var P=${JSON.stringify(procs)},C=${JSON.stringify(cities)},K=${JSON.stringify(countries)},X=${JSON.stringify(combos)};
var q=new URLSearchParams(location.search),n=function(s){return (s||'').replace(/\\s*\\([^)]*\\)\\s*/g,' ').replace(/\\s+/g,' ').trim().toLowerCase()};
var p=P[(q.get('procedure')||'').toLowerCase()]||P[n(q.get('procedure'))],city=(q.get('city')||'').toLowerCase(),k=K[(q.get('country')||'').toLowerCase()]||C[city],to='${fallback}';
if(${kind === 'procedure' ? 'p' : 'false'})to='/procedure/'+p;
${kind === 'city' ? `if(k){to='/country/'+k;if(p&&X.indexOf(p+'-in-'+k)>-1)to='/'+p+'-in-'+k+(city?'#city-'+city.normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').replace(/[^a-z0-9]+/g,'-'):'');}else if(p)to='/procedure/'+p;` : ''}
location.replace(to);})();`;
  return {
    path, title: 'This page has moved | Renoo', description: 'This Renoo page has moved to a new address.', noindex: 'redirect page for an old URL',
    jsonld: ld.graph([ld.breadcrumbs([HOME, { name: 'Moved', url: path }])]),
    extraHead: `<script>${script}</script>\n`,
    body: `<main id="main" class="wrap page prose"><header class="hero"><h1>This page has moved</h1><p class="answer">Renoo has new addresses for its pages. Continue to the list of <a href="/procedures">procedures</a>, the list of <a href="/countries">countries</a>, or the <a href="/">price map</a>.</p></header></main>`,
  };
}
