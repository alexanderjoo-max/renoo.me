// Renders every content page (category, procedure, country, procedure-in-country, compare, hubs).
import { SITE, STAGE, REFERENCE_COUNTRIES, COMPARE_PAIRS } from '../../content/site.mjs';
import { esc, px, pxRange, usdText, rangeText, fmtDate, plural, flag, pctWords, pctShort, icon, ICONS, catChip, breadcrumbs, faqBlock, ld, num } from './html.mjs';

const REG_RE = /regulat|legal|prescription|licen[cs]|approved|\bFDA\b|restrict|COFEPRIS|ICMR|\bDHA\b|ministry|oversight/i;
const DOSE_RE = /\bdos(e|es|age|ing)\b|\bdaily\b|\bweekly\b|per (day|week)|\d+\s?(mg|mcg|iu|ml|units)\b|subcutaneous|reconstitut|self-administ|injection technique|\bcycled?\b/i;
const HOME = { name: 'Home', url: '/' };
const base = (data) => data.base;
const safe = (list, on) => (on ? (list || []).filter((s) => !DOSE_RE.test(s)) : list || []);
const ul = (items) => (items.length ? `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : '');
const confTag = (c) => `<span class="tag tag-${c.toLowerCase()}">${c}</span>`;
const gapTag = (text) => `<span class="tag tag-gap">${esc(text)}</span>`;
const vsCell = (cell, data, tag = 'td') => {
  const p = data.savingsVs(cell, base(data));
  return `<${tag} class="vs${p > 0 ? ' vs-less' : p < 0 ? ' vs-more' : ''}" data-vs data-proc="${cell.proc.slug}" data-country="${cell.country.slug}" data-typ="${cell.typical}">${cell.country === base(data) ? 'baseline' : pctShort(p)}</${tag}>`;
};
const vsHead = (data) => `<th scope="col">vs <span data-vs-label>${esc(base(data).name)}</span></th>`;
const countryLink = (c, href) => `<a href="${href || c.url}"><span class="flag" aria-hidden="true">${flag(c.iso2)}</span> ${esc(c.name)}</a>`;
const mapCta = (href, label) => `<a class="btn" href="${href}">${icon(ICONS.globe, 'ico ico-sm')}${esc(label)}</a>`;

function fxNote(data, extra = '') {
  return `<p class="note"><span data-fx-note>Prices are stored in US dollars and shown in US dollars.</span> ${extra}</p>`;
}
const METHOD_LINK = STAGE.seo ? ' <a href="/methodology">How Renoo collects prices</a>.' : '';
function sourceNote(cells, data) {
  const sources = [...new Set(cells.flatMap((c) => c.sources))];
  const updated = cells.map((c) => c.updated).sort().pop();
  return `<p class="note"><strong>Source:</strong> ${esc(sources.slice(0, 6).join('; '))}${sources.length > 6 ? `; and ${sources.length - 6} more source types` : ''}. <strong>Last updated:</strong> <time datetime="${updated}">${fmtDate(updated)}</time>. Prices are indicative ranges for comparison only.${METHOD_LINK}</p>`;
}

// A strip showing every country's typical price for one procedure, from cheapest to most expensive.
// marks: [{ cell, below }] are the countries called out with a label.
function spectrum(proc, marks) {
  if (proc.cells.length < 3) return '';
  const lo = Math.log(proc.cheapest.typical), span = Math.log(proc.priciest.typical) - lo || 1;
  const pos = (c) => Math.round(((Math.log(c.typical) - lo) / span) * 1000) / 10;
  const ticks = proc.cells.map((c) => `<i style="left:${pos(c)}%"></i>`).join('');
  const pins = marks.filter((m) => m.cell).map((m) => { const x = pos(m.cell); return `<span class="spectrum-mark${m.below ? ' is-below' : ''}${x > 78 ? ' is-right' : x < 22 ? ' is-left' : ''}" style="left:${x}%"><b>${esc(m.cell.country.name)}</b> ${px(m.cell.typical)}</span>`; }).join('');
  return `<figure class="spectrum">
  <div class="spectrum-track" role="img" aria-label="Typical price of ${esc(proc.phrase)} in ${proc.cells.length} countries, from ${usdText(proc.cheapest.typical)} in ${esc(proc.cheapest.country.name)} to ${usdText(proc.priciest.typical)} in ${esc(proc.priciest.country.name)}">${ticks}${pins}</div>
  <figcaption><span>Cheapest: ${esc(proc.cheapest.country.name)} ${px(proc.cheapest.typical)}</span><span>${proc.cells.length} countries, one line each</span><span>Most expensive: ${esc(proc.priciest.country.name)} ${px(proc.priciest.typical)}</span></figcaption>
</figure>`;
}

// ---------- Safeguards ----------
function regulatoryNotes(rows) {
  const out = [];
  for (const r of rows) for (const f of [r.notes, r.caveats, r.included]) if (f && REG_RE.test(f)) out.push({ row: r, text: f });
  return out;
}
function safeguard(data, { cat, proc = null, rows = [], place = null }) {
  if (!STAGE.safeguards || !cat.regulated) return '';
  const subject = proc ? esc(proc.phrase) : `treatments in ${esc(cat.name)}`;
  const notes = regulatoryNotes(rows);
  const seen = new Set();
  const noteItems = notes.filter((n) => { const k = `${n.row.proc.slug}|${n.row.country.slug}|${n.text}`; if (seen.has(k)) return false; seen.add(k); return true; })
    .slice(0, 14).map((n) => `<li><strong>${proc ? '' : `${esc(n.row.proc.short)}, `}${esc(n.row.city)}, ${esc(n.row.country.name)}:</strong> “${esc(n.text)}”</li>`).join('');
  return `<aside class="callout" aria-labelledby="reg-h">
  <h2 id="reg-h">${icon(ICONS.info, 'ico ico-sm')}Regulatory status</h2>
  <p><strong>Legal status${place ? ` in ${esc(place)}` : ' by country'}:</strong> ${gapTag('Not yet verified by Renoo')}</p>
  <p>Rules for ${subject} differ from country to country. Renoo has not verified the legal status in any country, so none is stated here. A price or a clinic listing on this page does not mean a treatment is approved, legal for you, or available without a prescription.</p>
  ${noteItems ? `<p>Regulatory notes recorded with our price data:</p><ul>${noteItems}</ul>` : `<p>Our price data holds no regulatory notes for ${place ? esc(place) : 'these entries'}.</p>`}
  <p class="doctor">${icon(ICONS.doctor, 'ico ico-sm')}<span><strong>Consult a qualified doctor</strong> before starting or travelling for this treatment, and check the rules in both the country of treatment and your home country.</span></p>
  <p>This page lists prices only. It gives no dosing or instructions for use.</p>
</aside>`;
}

// ---------- Procedure guide text (from data/procedure-content.js) ----------
function guide(proc) {
  const c = proc.content;
  if (!c) return { html: `<section class="section" id="about"><h2>About ${esc(proc.phrase)}</h2><p class="placeholder">${gapTag('Missing content')} Renoo has no description, safety or recovery information for ${esc(proc.phrase)} yet.</p></section>`, faq: [] };
  const strict = STAGE.safeguards && !!proc.noHowTo;
  const clean = (s) => (s && !(strict && DOSE_RE.test(s)) ? s : '');
  const w = c.whatIsIt || {}, h = c.howItWorks || {}, r = c.results || {}, s = c.safety || {}, who = c.whoIsItFor || {};
  const parts = [];
  const what = [clean(w.definition), clean(w.purpose), strict ? '' : w.howItWorks].filter(Boolean);
  if (what.length) parts.push(`<section class="section" id="about"><h2>What is ${esc(proc.phrase)}?</h2>${what.map((p) => `<p>${esc(p)}</p>`).join('')}</section>`);
  const why = c.whyChoose || {};
  if (!strict && (why.goals?.length || why.useCases?.length)) parts.push(`<section class="section" id="why"><h2>Why people choose ${esc(proc.phrase)}</h2><div class="cols">${why.goals?.length ? `<div><h3>Common goals</h3>${ul(why.goals)}</div>` : ''}${why.useCases?.length ? `<div><h3>Who it is popular with</h3>${ul(why.useCases)}</div>` : ''}</div></section>`);
  if (!strict && (h.steps?.length || h.duration)) {
    const facts = [['Duration', h.duration], ['Setting', h.setting], ['Anesthesia', h.anesthesia]].filter((f) => f[1]);
    parts.push(`<section class="section" id="how"><h2>How it is performed</h2>${facts.length ? `<dl class="facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}${h.steps?.length ? `<ol class="steps">${h.steps.map((st) => `<li><strong>${esc(st.title)}.</strong> ${esc(st.desc)}</li>`).join('')}</ol>` : ''}</section>`);
  }
  const ben = c.benefits || {};
  if (!strict && (ben.physical?.length || ben.mental?.length || ben.longTerm?.length)) parts.push(`<section class="section" id="benefits"><h2>Benefits</h2><div class="cols">${ben.physical?.length ? `<div><h3>Physical</h3>${ul(ben.physical)}</div>` : ''}${ben.mental?.length ? `<div><h3>Mental and emotional</h3>${ul(ben.mental)}</div>` : ''}${ben.longTerm?.length ? `<div><h3>Long term</h3>${ul(ben.longTerm)}</div>` : ''}</div>${ben.evidenceLevel ? `<p><strong>Evidence level:</strong> ${esc(ben.evidenceLevel)}</p>` : ''}</section>`);
  if (!strict) {
    const rec = [['Right after', r.immediate], ['Short term', r.shortTerm], ['Medium term', r.mediumTerm], ['Long term', r.longTerm], ['Typical plan', r.typicalPlan]].filter((f) => f[1]);
    if (rec.length) parts.push(`<section class="section" id="recovery"><h2>Recovery and results</h2><dl class="timeline">${rec.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></section>`);
  }
  const common = safe(s.commonEffects, strict), rare = safe(s.rareRisks, strict), prot = safe(s.protocols, strict);
  if (common.length || rare.length) parts.push(`<section class="section" id="safety"><h2>Safety and risks</h2><div class="cols">${common.length ? `<div><h3>Common side effects</h3>${ul(common)}</div>` : ''}${rare.length ? `<div><h3>Rare risks</h3>${ul(rare)}</div>` : ''}${prot.length ? `<div><h3>What a careful clinic does</h3>${ul(prot)}</div>` : ''}</div></section>`);
  const good = strict ? [] : who.goodCandidates || [], not = safe(who.notSuitableFor, strict), screen = clean(who.screeningRequired);
  if (good.length || not.length) parts.push(`<section class="section" id="who"><h2>Who it is for</h2><div class="cols">${good.length ? `<div><h3>Usually suitable</h3>${ul(good)}</div>` : ''}${not.length ? `<div><h3>May not be suitable</h3>${ul(not)}</div>` : ''}</div>${screen ? `<p><strong>Screening:</strong> ${esc(screen)}</p>` : ''}</section>`);
  const faq = (c.faq || []).filter((f) => !(STAGE.seo && /\$\s?\d/.test(f.a)) && !(strict && (DOSE_RE.test(f.q) || DOSE_RE.test(f.a))));
  return {
    html: parts.join('\n'), faq,
    definition: clean(w.definition),
    howPerformed: strict ? '' : (h.steps || []).map((st) => `${st.title}: ${st.desc}`).join(' '),
    followup: strict ? '' : [r.immediate, r.shortTerm].filter(Boolean).join(' '),
    recovery: strict ? '' : r.shortTerm || r.immediate || '',
    facts: strict ? [] : [['Duration', h.duration], ['Setting', h.setting], ['Anesthesia', h.anesthesia]].filter((f) => f[1]),
    common,
  };
}

// Trip cost calculator carried over from the old site (flight and hotel estimates in data/trip-estimates.json)
function tripCalc(proc, cells, destCountry = null) {
  const cities = cells.flatMap((c) => c.rows.map((r) => [r.city, c.country.name, r.typical]));
  return `<section class="section" id="trip">
  <h2>Trip cost calculator</h2>
  <p>See what ${esc(proc.phrase)} would actually cost you, including flights and hotels.</p>
  <form class="compare-form card" data-trip data-proc-name="${esc(proc.name)}"${destCountry ? ` data-dest-country="${esc(destCountry.name)}"` : ''}>
    <label>Home city<select data-trip-home><option value="">Home city…</option></select></label>
    <label>Destination city<select data-trip-dest><option value="">Destination city…</option></select></label>
  </form>
  <div data-trip-out aria-live="polite"></div>
  <script type="application/json" data-trip-cities>${JSON.stringify(cities).replace(/</g, '\\u003c')}</script>
</section>`;
}
const TRIP_SCRIPT = '<script src="/assets/trip.js" defer></script>';
const CHOOSING = `<section class="section" id="choosing">
  <h2>Choosing a clinic</h2>
  <div class="cols">
    <div><h3>Accreditation to look for</h3><ul>
      <li><strong>JCI (Joint Commission International)</strong> — the gold standard for international hospital accreditation</li>
      <li><strong>Board-certified practitioners</strong> — verify credentials in the country's medical registry</li>
      <li><strong>GCR (Global Clinic Rating)</strong> — independent quality scoring for medical tourism clinics</li></ul></div>
    <div><h3>Red flags checklist</h3><ul>
      <li>Prices that seem too good to be true (well below country average)</li>
      <li>No verifiable practitioner credentials or clinic registration</li>
      <li>No before/after photos or patient reviews available</li>
      <li>Pressure to commit or pay in full before consultation</li>
      <li>Clinic does not provide written aftercare instructions</li></ul></div>
  </div>
</section>
<section class="section" id="cost-factors">
  <h2>Cost factors</h2>
  <dl class="timeline">
    <div><dt>Labor costs</dt><dd>Practitioner salaries are the largest cost driver. A specialist in New York earns 5-10x more than one in Bangkok, directly impacting what you pay.</dd></div>
    <div><dt>Regulation and overhead</dt><dd>Stricter regulatory environments mean higher compliance costs. Clinic rent, insurance, and licensing fees in Western countries add significantly to the final price.</dd></div>
    <div><dt>Currency and purchasing power</dt><dd>Favorable exchange rates make destinations like Turkey, Thailand, and Mexico substantially cheaper for international patients without compromising quality.</dd></div>
  </dl>
</section>`;

const comparePath = (proc, a, b) => `/compare/${proc.slug}/${a.slug}-vs-${b.slug}`;
export function comparePages(data) {
  const bySlug = Object.fromEntries(data.countries.map((c) => [c.slug, c]));
  const out = [];
  if (!STAGE.seo) return out;
  for (const [aS, bS] of COMPARE_PAIRS) {
    const a = bySlug[aS], b = bySlug[bS];
    if (!a || !b) continue;
    for (const proc of data.procedures) {
      const ca = a.procedures[proc.slug], cb = b.procedures[proc.slug];
      if (ca && cb && !ca.noindex && !cb.noindex) out.push({ proc, a, b, ca, cb, path: comparePath(proc, a, b) });
    }
  }
  return out;
}

// ---------- Procedure page ----------
export function procedurePage(data, proc, compares) {
  const cat = proc.cat, us = proc.countries[base(data).slug], n = proc.cells.length;
  const lo = proc.cheapest, hi = proc.priciest;
  const g = guide(proc);
  const path = proc.url;
  const single = n === 1;
  const title = single ? `${proc.name} cost in ${lo.country.name} | Renoo` : `${proc.name} cost in ${n} countries compared | Renoo`;
  const basis = proc.basis ? ` Prices are ${proc.basis}.` : '';
  const answerText = single
    ? `${proc.Phrase} typically costs ${usdText(lo.typical)} in ${lo.country.inName} (range ${rangeText(lo.low, lo.high)}). ${lo.country.name} is the only country where Renoo has price data for this procedure so far.${basis}`
    : `${proc.Phrase} typically costs ${usdText(lo.typical)} in ${lo.country.inName}, the lowest of the ${n} countries Renoo tracks, and ${usdText(hi.typical)} in ${hi.country.inName}, the highest.${us ? ` In the United States the typical price is ${usdText(us.typical)} (range ${rangeText(us.low, us.high)}).` : ''}${basis}`;
  const description = single ? answerText.slice(0, 300) : `${proc.Phrase} costs from ${usdText(lo.typical)} in ${lo.country.inName} to ${usdText(hi.typical)} in ${hi.country.inName} at typical prices. Compare ${n} countries, with sources and dates.`;
  const crumbs = [HOME, { name: cat.name, url: cat.url }, { name: proc.name, url: path }];

  const rows = proc.cells.map((c) => `<tr>
<th scope="row">${countryLink(c.country, c.noindex ? c.country.url : c.url)}</th>
<td class="n">${px(c.typical)}</td><td class="n">${pxRange(c.low, c.high)}</td>${vsCell(c, data)}
<td class="n">${c.rows.length}</td><td>${confTag(c.confidence)}</td><td>${esc(c.sources.join('; '))}</td><td><time datetime="${c.updated}">${fmtDate(c.updated)}</time></td></tr>`).join('\n');

  const faq = [];
  if (STAGE.seo && !single) {
    faq.push({ q: `Which country is cheapest for ${proc.phrase}?`, a: `Of the ${n} countries Renoo tracks, ${lo.country.name} has the lowest typical price for ${proc.phrase} at ${usdText(lo.typical)} (range ${rangeText(lo.low, lo.high)}).` });
    faq.push({ q: `Where is ${proc.phrase} most expensive?`, a: `${hi.country.name} has the highest typical price in Renoo's data at ${usdText(hi.typical)} (range ${rangeText(hi.low, hi.high)}).` });
    if (us && lo !== us) faq.push({ q: `How much can I save on ${proc.phrase} compared with the United States?`, a: `The typical US price is ${usdText(us.typical)}. In ${lo.country.inName} it is ${usdText(lo.typical)}, which is ${pctWords(data.savingsVs(lo, base(data)), 'the US price')}. Travel, accommodation and follow-up care are not included in these figures.` });
  }
  if (STAGE.seo) faq.push({ q: `How current are these ${proc.short} prices?`, a: `The price rows for ${proc.phrase} were last changed on ${fmtDate(proc.updated)}. Each row in the table shows its own date and source type.` });
  faq.push(...g.faq);

  const related = cat.procedures.filter((p) => p !== proc);
  const myCompares = compares.filter((c) => c.proc === proc);
  const offerRows = proc.rows.length;
  const jsonld = ld.graph([
    ld.breadcrumbs(crumbs), ld.webPage({ path, title, description, updated: proc.updated }),
    ld.procedure({ name: proc.name, description: g.definition, howPerformed: g.howPerformed, followup: g.followup, path }),
    ld.offer({ name: `${proc.name} worldwide`, serviceType: proc.name, area: proc.cells.map((c) => c.country.name), low: Math.min(...proc.cells.map((c) => c.low)), high: Math.max(...proc.cells.map((c) => c.high)), count: offerRows, path }),
    ld.faq(faq),
  ]);

  const body = `<main id="main" class="wrap page">
${breadcrumbs(crumbs)}
<header class="hero">
  ${catChip(cat)}
  <h1>${esc(proc.name)} cost by country</h1>
  <p class="answer">${esc(answerText)}</p>
  <div class="stats">
    <div class="stat"><span class="stat-label">Lowest typical price</span><strong>${px(lo.typical)}</strong><span>${esc(lo.country.name)}</span></div>
    ${single ? '' : `<div class="stat"><span class="stat-label">Highest typical price</span><strong>${px(hi.typical)}</strong><span>${esc(hi.country.name)}</span></div>`}
    ${us ? `<div class="stat" data-home-stat data-proc="${proc.slug}"><span class="stat-label" data-home-stat-label>United States</span><strong data-home-stat-value>${px(us.typical)}</strong><span>typical price</span></div>` : ''}
    <div class="stat"><span class="stat-label">Coverage</span><strong>${n}</strong><span>${n === 1 ? 'country' : 'countries'}, ${plural(offerRows, 'city', 'cities')}</span></div>
  </div>
  ${spectrum(proc, [{ cell: us, below: true }])}
  <p class="hero-actions">${mapCta(`/?path=treatment&procedure=${proc.slug}`, 'Open the price heatmap')}</p>
</header>
<section class="section" id="prices">
  <h2>${esc(proc.name)} price by country</h2>
  ${fxNote(data, proc.basis ? `Prices are ${esc(proc.basis)}.` : '')}
  <div class="table-wrap"><table class="data">
    <caption>Typical price and price range for ${esc(proc.phrase)} in each country, lowest first</caption>
    <thead><tr><th scope="col">Country</th><th scope="col">Typical price</th><th scope="col">Price range</th>${vsHead(data)}<th scope="col">Cities</th><th scope="col">Confidence</th><th scope="col">Source</th><th scope="col">Last updated</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
  ${sourceNote(proc.cells, data)}
</section>
${single ? '' : tripCalc(proc, proc.cells)}
${safeguard(data, { cat, proc, rows: proc.rows })}
${g.html}
${CHOOSING}
${faqBlock(faq, `${proc.short} cost: questions and answers`)}
<section class="section" id="related">
  <h2>Related</h2>
  ${myCompares.length ? `<h3>Country comparisons for ${esc(proc.short)}</h3><ul class="links">${myCompares.map((c) => `<li><a href="${c.path}">${esc(c.a.name)} vs ${esc(c.b.name)}</a></li>`).join('')}</ul>` : ''}
  ${related.length ? `<h3>More in ${esc(cat.name)}</h3><ul class="links">${related.map((p) => `<li><a href="${p.url}">${esc(p.name)}</a></li>`).join('')}</ul>` : ''}
  <p><a href="${cat.url}">All ${esc(cat.name)} prices</a> · <a href="/procedures">All procedures</a> · <a href="/countries">All countries</a></p>
</section>
</main>`;
  return { path, title, description, jsonld, body, accent: cat.color, scripts: single ? '' : TRIP_SCRIPT, track: { event: 'procedure_view', procedure: proc.slug, category: cat.slug } };
}

// ---------- Procedure in country ----------
export function comboPage(data, cell, compares) {
  const { proc, country } = cell, cat = proc.cat, us = proc.countries[base(data).slug];
  const path = cell.url, isBase = country === base(data);
  const p = data.savingsVs(cell, base(data));
  const rank = proc.cells.indexOf(cell) + 1, n = proc.cells.length;
  const g = guide(proc);
  const cityNames = cell.rows.map((r) => r.city);
  const range = rangeText(cell.low, cell.high);
  const title = `${proc.name} cost in ${country.name}: ${range} | Renoo`;
  const basis = proc.basis ? ` Prices are ${proc.basis}.` : '';
  const compareSentence = isBase || !us
    ? (n > 1 ? ` That ranks ${rank} of ${n} countries from cheapest to most expensive; the lowest typical price is ${usdText(proc.cheapest.typical)} in ${proc.cheapest.country.inName}.` : '')
    : ` That is ${pctWords(p, 'in the United States')}, where the typical price is ${usdText(us.typical)}.`;
  const answerText = `${proc.Phrase} in ${country.inName} typically costs ${range}, with a typical price of ${usdText(cell.typical)}.${compareSentence} Based on ${plural(cell.rows.length, 'city', 'cities')} tracked by Renoo (${cityNames.slice(0, 4).join(', ')}${cityNames.length > 4 ? ' and others' : ''}), last updated ${fmtDate(cell.updated)}.${basis}`;
  const description = `${proc.Phrase} in ${country.inName} typically costs ${range}${isBase || !us ? '' : `, ${pctWords(p, 'in the US')}`}. Prices by city, ${plural(cell.clinics.length, 'clinic')} listed, what is included, sources and dates.`;
  const crumbs = [HOME, { name: cat.name, url: cat.url }, { name: proc.name, url: proc.url }, { name: country.name, url: path }];

  const cityRows = cell.rows.map((r) => `<tr id="city-${r.citySlug}">
<th scope="row">${esc(r.city)}</th><td class="n">${px(r.typical)}</td><td class="n">${pxRange(r.low, r.high)}</td>
<td>${esc(r.included) || '—'}</td><td>${esc([r.notes, r.caveats].filter(Boolean).join('. ')) || '—'}</td>
<td>${confTag(r.confidence)}</td><td>${esc(r.source)}</td><td><time datetime="${r.updated}">${fmtDate(r.updated)}</time></td></tr>`).join('\n');

  // Comparison set: reference home markets plus the cheapest and most expensive countries
  const refSet = [];
  const add = (c) => { if (c && c !== cell && !refSet.includes(c)) refSet.push(c); };
  for (const s of REFERENCE_COUNTRIES) add(proc.countries[s]);
  add(proc.cheapest); add(proc.priciest);
  const cmpRows = [cell, ...refSet].sort((a, b) => a.typical - b.typical).map((c) => {
    const d = c === cell ? null : Math.round(((c.typical - cell.typical) / cell.typical) * 100);
    return `<tr${c === cell ? ' class="is-current"' : ''}><th scope="row">${c === cell ? `<span class="flag" aria-hidden="true">${flag(c.country.iso2)}</span> ${esc(c.country.name)}` : countryLink(c.country, c.url)}</th><td class="n">${px(c.typical)}</td><td class="n">${pxRange(c.low, c.high)}</td><td class="n">${d === null ? 'this page' : d > 0 ? `${d}% more` : d < 0 ? `${-d}% less` : 'same'}</td></tr>`;
  }).join('\n');

  const clinics = cell.clinics;
  const clinicRows = clinics.map((c) => `<tr><th scope="row">${esc(c.name)}${c.address ? `<span class="sub">${esc(c.address)}</span>` : c.notes ? `<span class="sub">${esc(c.notes)}</span>` : ''}</th><td>${esc(c.city)}</td><td class="n">${c.low && c.high ? pxRange(c.low, c.high) : '—'}</td><td>${esc(c.certifications || '') || '—'}</td><td>${c.website ? `<a href="${esc(c.website)}" rel="nofollow noopener external" target="_blank" data-clinic="${esc(c.name)}">Website<span class="sr-only"> of ${esc(c.name)} (opens in a new tab)</span></a>` : '—'}</td></tr>`).join('\n');

  const faq = [{ q: `How much does ${proc.phrase} cost in ${country.inName}?`, a: `${proc.Phrase} in ${country.inName} typically costs ${range}, with a typical price of ${usdText(cell.typical)}. This is based on ${plural(cell.rows.length, 'city', 'cities')} tracked by Renoo.${basis}` }];
  if (!isBase && us) faq.push({ q: `Is ${proc.phrase} cheaper in ${country.inName} than in the United States?`, a: p > 0 ? `Yes. The typical price in ${country.inName} is ${usdText(cell.typical)} against ${usdText(us.typical)} in the United States, about ${p}% less. Travel and accommodation are not included.` : p < 0 ? `No. The typical price in ${country.inName} is ${usdText(cell.typical)} against ${usdText(us.typical)} in the United States, about ${-p}% more.` : `The typical price is about the same: ${usdText(cell.typical)} in ${country.inName} and ${usdText(us.typical)} in the United States.` });
  if (cell.rows.length > 1) { const c0 = cell.rows[0], c1 = cell.rows[cell.rows.length - 1]; faq.push({ q: `Which city in ${country.inName} is cheapest for ${proc.phrase}?`, a: `${c0.city} has the lowest typical price at ${usdText(c0.typical)}. ${c1.city} has the highest at ${usdText(c1.typical)}.` }); }
  if (cell.included) faq.push({ q: `What is included in the price?`, a: `The price rows for ${country.inName} describe the price as covering: ${cell.included}. Ask the clinic for a written quote, because what is included varies.` });
  if (n > 1) faq.push({ q: `How does ${country.inName} rank for ${proc.phrase} prices?`, a: `${country.name} ranks ${rank} of ${n} countries from cheapest to most expensive by typical price. The cheapest is ${proc.cheapest.country.name} (${usdText(proc.cheapest.typical)}) and the most expensive is ${proc.priciest.country.name} (${usdText(proc.priciest.typical)}).` });
  faq.push({ q: 'Where do these prices come from and how old are they?', a: `Source type: ${cell.sources.join('; ')}. Confidence: ${cell.confidence}. The rows were last changed on ${fmtDate(cell.updated)}. They are estimates for comparison, not quotes.` });
  if (!STAGE.seo) faq.length = 0;

  const others = proc.cells.filter((c) => c !== cell && !c.noindex).slice(0, 8);
  const sameCat = country.cells.filter((c) => c.proc.cat === cat && c !== cell && !c.noindex);
  const myCompares = compares.filter((c) => c.proc === proc && (c.a === country || c.b === country));
  const jsonld = ld.graph([
    ld.breadcrumbs(crumbs), ld.webPage({ path, title, description, updated: cell.updated }),
    ld.procedure({ name: proc.name, description: g.definition, path: proc.url }),
    ld.offer({ name: `${proc.name} in ${country.name}`, serviceType: proc.name, area: [country.name], low: cell.low, high: cell.high, count: cell.rows.length, path }),
    ld.faq(faq),
  ]);

  const aboutBits = [];
  if (g.definition) aboutBits.push(`<p>${esc(g.definition)}</p>`);
  if (g.facts?.length) aboutBits.push(`<dl class="facts">${g.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`);
  if (g.recovery) aboutBits.push(`<p><strong>Recovery:</strong> ${esc(g.recovery)}</p>`);
  if (g.common?.length) aboutBits.push(`<p><strong>Common side effects:</strong> ${esc(g.common.join('; '))}.</p>`);
  if (!proc.content) aboutBits.push(`<p class="placeholder">${gapTag('Missing content')} Renoo has no safety or recovery information for ${esc(proc.phrase)} yet.</p>`);

  const body = `<main id="main" class="wrap page">
${breadcrumbs(crumbs)}
<header class="hero">
  ${catChip(cat)}
  <h1>${esc(proc.name)} cost in ${esc(country.inName)}</h1>
  <p class="answer">${esc(answerText)}</p>
  <div class="stats">
    <div class="stat"><span class="stat-label">Typical price</span><strong>${px(cell.typical)}</strong><span>${esc(country.name)}</span></div>
    <div class="stat"><span class="stat-label">Price range</span><strong class="stat-range">${pxRange(cell.low, cell.high)}</strong><span>${plural(cell.rows.length, 'city', 'cities')}</span></div>
    <div class="stat"><span class="stat-label">vs <span data-vs-label>${esc(base(data).name)}</span></span>${vsCell(cell, data, 'strong')}<span>at typical prices</span></div>
    ${n > 1 ? `<div class="stat"><span class="stat-label">Price rank</span><strong>${rank}<small> of ${n}</small></strong><span>cheapest first</span></div>` : ''}
  </div>
  ${spectrum(proc, [{ cell }, { cell: isBase ? null : us, below: true }])}
  <p class="hero-actions">${mapCta(`/?path=treatment&procedure=${proc.slug}&country=${country.slug}`, 'See it on the map')}<a class="btn btn-ghost" href="/travel?city=${encodeURIComponent(cell.rows[0].city)}">Flights and hotels</a></p>
</header>
<section class="section" id="prices">
  <h2>${esc(proc.name)} prices by city in ${esc(country.inName)}</h2>
  ${fxNote(data, proc.basis ? `Prices are ${esc(proc.basis)}.` : '')}
  <div class="table-wrap"><table class="data">
    <caption>Price of ${esc(proc.phrase)} in each city Renoo tracks in ${esc(country.inName)}</caption>
    <thead><tr><th scope="col">City</th><th scope="col">Typical price</th><th scope="col">Price range</th><th scope="col">What is included</th><th scope="col">Notes</th><th scope="col">Confidence</th><th scope="col">Source</th><th scope="col">Last updated</th></tr></thead>
    <tbody>${cityRows}</tbody>
  </table></div>
  ${sourceNote([cell], data)}
</section>
${safeguard(data, { cat, proc, rows: cell.rows, place: country.inName })}
${n > 1 ? `<section class="section" id="compare">
  <h2>How ${esc(country.inName)} compares</h2>
  <div class="table-wrap"><table class="data">
    <caption>${esc(proc.name)} in ${esc(country.inName)} against other countries</caption>
    <thead><tr><th scope="col">Country</th><th scope="col">Typical price</th><th scope="col">Price range</th><th scope="col">Compared with ${esc(country.inName)}</th></tr></thead>
    <tbody>${cmpRows}</tbody>
  </table></div>
  <p><a href="${proc.url}">See all ${n} countries for ${esc(proc.short)}</a></p>
</section>` : ''}
${n > 1 ? tripCalc(proc, proc.cells, country) : ''}
${clinics.length ? `<section class="section" id="clinics">
  <h2>Clinics listed for ${esc(proc.short)} in ${esc(country.inName)}</h2>
  ${STAGE.safeguards ? `<p class="note">Details are as listed in Renoo's clinic data and have not been independently verified. A listing is not a recommendation.</p>` : ''}
  <div class="table-wrap"><table class="data">
    <caption>${plural(clinics.length, 'clinic')} listed</caption>
    <thead><tr><th scope="col">Clinic</th><th scope="col">City</th><th scope="col">Listed price</th><th scope="col">Accreditation as listed</th><th scope="col">Link</th></tr></thead>
    <tbody>${clinicRows}</tbody>
  </table></div>
</section>` : ''}
<section class="section" id="about">
  <h2>About ${esc(proc.phrase)}</h2>
  ${aboutBits.join('\n')}
  <p><a href="${proc.url}">Full ${esc(proc.short)} guide: safety, recovery and prices in every country</a></p>
</section>
${faqBlock(faq, `${proc.short} in ${country.inName}: questions and answers`)}
<section class="section" id="related">
  <h2>Related</h2>
  ${myCompares.length ? `<h3>Side-by-side comparisons</h3><ul class="links">${myCompares.map((c) => `<li><a href="${c.path}">${esc(proc.short)}: ${esc(c.a.name)} vs ${esc(c.b.name)}</a></li>`).join('')}</ul>` : ''}
  ${others.length ? `<h3>${esc(proc.short)} in other countries</h3><ul class="links">${others.map((c) => `<li><a href="${c.url}">${esc(c.country.name)} <span class="muted">${usdText(c.typical)}</span></a></li>`).join('')}</ul>` : ''}
  ${sameCat.length ? `<h3>More ${esc(cat.name)} in ${esc(country.inName)}</h3><ul class="links">${sameCat.map((c) => `<li><a href="${c.url}">${esc(c.proc.name)} <span class="muted">${usdText(c.typical)}</span></a></li>`).join('')}</ul>` : ''}
  <p><a href="${country.url}">All procedure prices in ${esc(country.inName)}</a> · <a href="${cat.url}">${esc(cat.name)}</a></p>
</section>
</main>`;
  return { path, title, description, jsonld, body, accent: cat.color, noindex: cell.noindex, scripts: n > 1 ? TRIP_SCRIPT : '', track: { event: 'procedure_view', procedure: proc.slug, category: cat.slug, country: country.slug } };
}

// ---------- Country page ----------
export function countryPage(data, country, compares) {
  const path = country.url, b = base(data), isBase = country === b;
  const n = country.cells.length, cities = country.cityList.map((c) => c.name);
  const m = country.medianSavingVsBase;
  const shared = country.cells.filter((c) => b.procedures[c.proc.slug] && c.country !== b).length;
  const best = isBase ? null : country.cells.map((c) => ({ c, p: data.savingsVs(c, b) })).filter((x) => x.p !== null).sort((x, y) => y.p - x.p)[0];
  const cityText = cities.length <= 4 ? cities.join(', ') : `${cities.slice(0, 4).join(', ')} and ${cities.length - 4} more cities`;
  const title = `Procedure prices in ${country.name}: ${n} treatments compared | Renoo`;
  const answerText = `Renoo tracks prices for ${plural(n, 'procedure')} in ${country.inName}, in ${cityText}.${isBase ? ' The United States is the baseline Renoo compares other countries against.' : m !== null ? ` Across the ${shared} procedures tracked in both countries, typical prices in ${country.inName} are ${pctWords(m, 'in the United States')} (median).` : ''}${best && best.p > 0 ? ` The largest gap is for ${best.c.proc.phrase}: ${usdText(best.c.typical)} against ${usdText(b.procedures[best.c.proc.slug].typical)} in the United States.` : ''}`;
  const description = `Prices for ${plural(n, 'procedure')} in ${country.inName} (${cityText})${!isBase && m !== null ? `, ${pctWords(m, 'in the US')} at the median` : ''}. Price ranges, sources, clinics and dates.`;
  const crumbs = [HOME, { name: 'Countries', url: '/countries' }, { name: country.name, url: path }];

  const sorted = [...country.cells].sort((x, y) => data.categories.indexOf(x.proc.cat) - data.categories.indexOf(y.proc.cat) || x.proc.name.localeCompare(y.proc.name));
  const rows = sorted.map((c) => `<tr data-cat="${c.proc.cat.slug}">
<th scope="row"><a href="${c.noindex ? c.proc.url : c.url}">${esc(c.proc.name)}</a></th><td>${catChip(c.proc.cat)}</td>
<td class="n">${px(c.typical)}</td><td class="n">${pxRange(c.low, c.high)}</td>${vsCell(c, data)}
<td>${confTag(c.confidence)}</td><td><time datetime="${c.updated}">${fmtDate(c.updated)}</time></td></tr>`).join('\n');

  const reg = regulatoryNotes(country.rows);
  const regSeen = new Set();
  const regItems = reg.filter((x) => { const k = `${x.row.proc.slug}|${x.text}`; if (regSeen.has(k)) return false; regSeen.add(k); return true; })
    .map((x) => `<li><strong>${esc(x.row.proc.name)} (${esc(x.row.city)}):</strong> “${esc(x.text)}”</li>`).join('');
  const cityItems = country.cityList.map((c) => `<li>${esc(c.name)} <span class="muted">${plural(country.rows.filter((r) => r.city === c.name).length, 'procedure')}</span></li>`).join('');

  const faq = [{ q: `Which procedures does Renoo have prices for in ${country.inName}?`, a: `${plural(n, 'procedure')}: ${sorted.map((c) => c.proc.name).join(', ')}.` }];
  if (!isBase && m !== null) faq.push({ q: `How much cheaper is treatment in ${country.inName} than in the United States?`, a: `Across the ${shared} procedures Renoo tracks in both countries, the median difference at typical prices is ${m > 0 ? `${m}% lower` : m < 0 ? `${-m}% higher` : 'zero'} in ${country.inName}. The difference varies by procedure, and travel costs are not included.` });
  if (best && best.p > 0) faq.push({ q: `Which procedure has the biggest price gap in ${country.inName}?`, a: `${best.c.proc.Phrase}: typical price ${usdText(best.c.typical)} in ${country.inName} against ${usdText(b.procedures[best.c.proc.slug].typical)} in the United States, about ${best.p}% less.` });
  faq.push({ q: `Which cities in ${country.inName} does Renoo cover?`, a: `${cities.join(', ')}.` });
  faq.push({ q: 'How current are these prices?', a: `The price rows for ${country.inName} were last changed on ${fmtDate(country.updated)}. Each row shows its own date.` });
  if (!STAGE.seo) faq.length = 0;

  const myPairs = [...new Map(compares.filter((c) => c.a === country || c.b === country).map((c) => [`${c.a.slug}-${c.b.slug}`, c])).values()];
  const pairLinks = myPairs.map((pr) => { const first = compares.find((c) => c.a === pr.a && c.b === pr.b); return `<li><a href="/compare?a=${pr.a.slug}&amp;b=${pr.b.slug}">${esc(pr.a.name)} vs ${esc(pr.b.name)}</a> <span class="muted">e.g. <a href="${first.path}">${esc(first.proc.short)}</a></span></li>`; }).join('');
  const jsonld = ld.graph([ld.breadcrumbs(crumbs), ld.webPage({ path, title, description, updated: country.updated }), ld.faq(faq)]);

  const body = `<main id="main" class="wrap page">
${breadcrumbs(crumbs)}
<header class="hero">
  <span class="cat-chip"><span class="flag" aria-hidden="true">${flag(country.iso2)}</span><span>Country</span></span>
  <h1>Procedure prices in ${esc(country.inName)}</h1>
  <p class="answer">${esc(answerText)}</p>
  <div class="stats">
    <div class="stat"><span class="stat-label">Procedures tracked</span><strong>${n}</strong><span>${plural(cities.length, 'city', 'cities')}</span></div>
    ${!isBase && m !== null ? `<div class="stat"><span class="stat-label">Median vs United States</span><strong class="${m > 0 ? 'vs-less' : m < 0 ? 'vs-more' : ''}">${pctShort(m)}</strong><span>${shared} shared procedures</span></div>` : ''}
    ${best && best.p > 0 ? `<div class="stat"><span class="stat-label">Largest gap</span><strong class="vs-less">${pctShort(best.p)}</strong><span>${esc(best.c.proc.short)}</span></div>` : ''}
    <div class="stat"><span class="stat-label">Clinics listed</span><strong>${num(country.clinicCount)}</strong><span>across all procedures</span></div>
  </div>
  <p class="hero-actions">${mapCta(`/?path=travel&country=${country.slug}`, `Explore ${country.name} on the map`)}</p>
</header>
<section class="section" id="prices">
  <h2>What is available in ${esc(country.inName)}</h2>
  ${fxNote(data)}
  <div class="table-wrap"><table class="data">
    <caption>Procedures with price data in ${esc(country.inName)}</caption>
    <thead><tr><th scope="col">Procedure</th><th scope="col">Section</th><th scope="col">Typical price</th><th scope="col">Price range</th>${vsHead(data)}<th scope="col">Confidence</th><th scope="col">Last updated</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
  ${sourceNote(country.cells, data)}
</section>
${!STAGE.safeguards ? '' : `<section class="section" id="regulation">
  <h2>Regulatory notes for ${esc(country.inName)}</h2>
  <p><strong>Legal status of each therapy:</strong> ${gapTag('Not yet verified by Renoo')}</p>
  ${regItems ? `<p>These notes were recorded with the price data. They are not a legal assessment.</p><ul>${regItems}</ul>` : `<p>Renoo's price data holds no regulatory notes for ${esc(country.inName)}.</p>`}
  <p>A price or clinic listing does not mean a treatment is approved or legal for you. Consult a qualified doctor and check the rules in ${esc(country.inName)} and in your home country before travelling.</p>
</section>`}
<section class="section" id="cities">
  <h2>Cities covered</h2>
  <ul class="links">${cityItems}</ul>
</section>
${faqBlock(faq, `Treatment prices in ${country.inName}: questions and answers`)}
<section class="section" id="related">
  <h2>Related</h2>
  ${pairLinks ? `<h3>Country comparisons</h3><ul class="links">${pairLinks}</ul>` : ''}
  <h3>Sections</h3><ul class="links">${data.categories.filter((c) => country.cells.some((x) => x.proc.cat === c)).map((c) => `<li><a href="${c.url}">${esc(c.name)}</a></li>`).join('')}</ul>
  <p><a href="/countries">All countries</a> · <a href="/procedures">All procedures</a></p>
</section>
</main>`;
  return { path, title, description, jsonld, body, noindex: country.noindex, track: { event: 'country_view', country: country.slug } };
}

// ---------- Category page ----------
export function categoryPage(data, cat) {
  const path = cat.url, procs = cat.procedures, b = base(data);
  const countrySet = new Set(procs.flatMap((p) => p.cells.map((c) => c.country.slug)));
  const gap = data.gaps.filter((g) => g.proc.cat === cat)[0];
  const title = `${cat.name} prices by country | Renoo`;
  const answerText = `Renoo tracks ${plural(procs.length, `${cat.name} procedure`)} across ${plural(countrySet.size, 'country', 'countries')}.${gap ? ` The widest gap is for ${gap.proc.phrase}: a typical price of ${usdText(gap.high.typical)} in ${gap.high.country.inName} against ${usdText(gap.low.typical)} in ${gap.low.country.inName}.` : ''}`;
  const description = `${cat.tagline} Compare prices for ${procs.map((p) => p.short).slice(0, 5).join(', ')}${procs.length > 5 ? ' and more' : ''} across ${countrySet.size} countries, with sources and dates.`;
  const crumbs = [HOME, { name: cat.name, url: path }];

  const rows = procs.map((p) => { const us = p.countries[b.slug]; return `<tr>
<th scope="row"><a href="${p.url}">${esc(p.name)}</a></th>
<td class="n">${px(p.cheapest.typical)} <span class="muted">${esc(p.cheapest.country.name)}</span></td>
<td class="n">${px(p.priciest.typical)} <span class="muted">${esc(p.priciest.country.name)}</span></td>
<td class="n">${us ? px(us.typical) : '—'}</td><td class="n">${p.cells.length}</td><td><time datetime="${p.updated}">${fmtDate(p.updated)}</time></td></tr>`; }).join('\n');

  const cards = procs.map((p) => { const def = guide(p).definition; return `<article class="card proc-card">
  <h3><a href="${p.url}">${esc(p.name)}</a></h3>
  ${def ? `<p>${esc(def)}</p>` : `<p class="placeholder">${gapTag('Missing content')} No description yet.</p>`}
  <p class="proc-card-price">${pxRange(p.cheapest.typical, p.priciest.typical)} <span class="muted">typical, ${plural(p.cells.length, 'country', 'countries')}</span></p>
</article>`; }).join('\n');

  // Restricted at Home: where clinics list each therapy, with whatever regulatory notes the data holds
  let statusTables = '';
  if (cat.slug === 'restricted-at-home') {
    statusTables = `<section class="section" id="status"><h2>Status by country</h2>
<p>For each therapy, this table shows the countries where Renoo's data has a clinic price, and any regulatory note recorded with that price. Renoo has not verified legal status, so that column is marked as a gap. A country missing from a table means Renoo has no price there; it says nothing about whether the therapy is legal.</p>
${procs.map((p) => `<h3 id="status-${p.slug}">${esc(p.name)}</h3>
<div class="table-wrap"><table class="data">
<caption>${esc(p.name)}: countries with a clinic price in Renoo's data (${p.cells.length} of ${data.countries.length} countries tracked)</caption>
<thead><tr><th scope="col">Country</th><th scope="col">Clinics list a price</th><th scope="col">Regulatory notes in our data</th><th scope="col">Legal status</th></tr></thead>
<tbody>${[...p.cells].sort((x, y) => x.country.name.localeCompare(y.country.name)).map((c) => { const notes = [...new Set(regulatoryNotes(c.rows).map((x) => x.text))]; return `<tr><th scope="row">${countryLink(c.country, c.url)}</th><td>Yes, ${pxRange(c.low, c.high)}</td><td>${notes.length ? notes.map((t) => `“${esc(t)}”`).join('; ') : '<span class="muted">None recorded</span>'}</td><td>${gapTag('Not yet verified')}</td></tr>`; }).join('')}</tbody></table></div>`).join('\n')}
</section>`;
  }

  const faq = [{ q: `Which ${cat.name} procedures does Renoo compare?`, a: `${procs.map((p) => p.name).join(', ')}.` }];
  if (gap) faq.push({ q: `Where is the biggest price gap in ${cat.name}?`, a: `${gap.proc.Phrase}: the typical price is ${usdText(gap.high.typical)} in ${gap.high.country.inName} and ${usdText(gap.low.typical)} in ${gap.low.country.inName}, a difference of about ${gap.pct}%.` });
  for (const p of procs.slice(0, 3)) if (p.cells.length > 1) faq.push({ q: `Which country is cheapest for ${p.phrase}?`, a: `${p.cheapest.country.name}, at a typical price of ${usdText(p.cheapest.typical)}, is the lowest of the ${p.cells.length} countries Renoo tracks.` });
  if (!STAGE.seo) faq.length = 0;
  if (STAGE.safeguards && cat.regulated) faq.push({ q: `Is it legal to get ${cat.name === 'Peptides' ? 'peptide therapy' : 'these treatments'} abroad?`, a: 'Renoo has not verified the legal status of these treatments in any country and does not state it. Rules differ between countries. Consult a qualified doctor and check the rules in both the country of treatment and your home country.' });

  const jsonld = ld.graph([
    ld.breadcrumbs(crumbs), ld.webPage({ path, title, description, updated: procs.map((p) => p.updated).sort().pop() }),
    { '@type': 'ItemList', name: `${cat.name} procedures`, itemListElement: procs.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: `${SITE.url}${p.url}` })) },
    ld.faq(faq),
  ]);
  const body = `<main id="main" class="wrap page">
${breadcrumbs(crumbs)}
<header class="hero">
  ${catChip(cat, false)}
  <h1>${esc(cat.name)} prices by country</h1>
  <p class="answer">${esc(answerText)}</p>
  <p>${esc(cat.intro)}</p>
  <p class="hero-actions">${mapCta(`/?path=gaps&category=${cat.slug}`, `Show ${cat.name} on the map`)}</p>
</header>
${safeguard(data, { cat, rows: procs.flatMap((p) => p.rows) })}
<section class="section" id="prices">
  <h2>${esc(cat.name)} price ranges</h2>
  ${fxNote(data)}
  <div class="table-wrap"><table class="data">
    <caption>Lowest and highest typical price for each ${esc(cat.name)} procedure</caption>
    <thead><tr><th scope="col">Procedure</th><th scope="col">Lowest typical price</th><th scope="col">Highest typical price</th><th scope="col">United States</th><th scope="col">Countries</th><th scope="col">Last updated</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
  ${sourceNote(procs.flatMap((p) => p.cells), data)}
</section>
${statusTables}
<section class="section" id="procedures">
  <h2>Procedures in ${esc(cat.name)}</h2>
  <div class="grid">${cards}</div>
</section>
${faqBlock(faq, `${cat.name}: questions and answers`)}
<section class="section" id="related">
  <h2>Other sections</h2>
  <ul class="links">${data.categories.filter((c) => c !== cat).map((c) => `<li><a href="${c.url}">${esc(c.name)}</a></li>`).join('')}</ul>
</section>
</main>`;
  return { path, title, description, jsonld, body, accent: cat.color, track: { event: 'category_view', category: cat.slug } };
}

// ---------- Compare page ----------
export function comparePage(data, cmp, compares) {
  const { proc, a, b, ca, cb, path } = cmp, cat = proc.cat;
  const cheaper = ca.typical <= cb.typical ? ca : cb, dearer = cheaper === ca ? cb : ca;
  const pct = Math.round((1 - cheaper.typical / dearer.typical) * 100), diff = dearer.typical - cheaper.typical;
  const title = `${proc.name} cost: ${a.name} vs ${b.name} | Renoo`;
  const answerText = `${proc.Phrase} typically costs ${usdText(ca.typical)} in ${a.inName} and ${usdText(cb.typical)} in ${b.inName}. ${pct === 0 ? 'The typical prices are the same.' : `${cheaper.country.name} is about ${pct}% cheaper, a difference of ${usdText(diff)} at typical prices.`}${proc.basis ? ` Prices are ${proc.basis}.` : ''} Travel and accommodation are not included.`;
  const description = `${proc.Phrase}: ${usdText(ca.typical)} in ${a.inName} vs ${usdText(cb.typical)} in ${b.inName} at typical prices. Side-by-side price ranges, cities, clinics, sources and dates.`;
  const crumbs = [HOME, { name: 'Compare', url: '/compare' }, { name: proc.name, url: proc.url }, { name: `${a.name} vs ${b.name}`, url: path }];
  const line = (label, f) => `<tr><th scope="row">${label}</th><td>${f(ca)}</td><td>${f(cb)}</td></tr>`;
  const cityTable = (c) => `<h3>${esc(c.country.name)}: prices by city</h3><div class="table-wrap"><table class="data"><caption>${esc(proc.name)} in ${esc(c.country.inName)}</caption><thead><tr><th scope="col">City</th><th scope="col">Typical price</th><th scope="col">Price range</th><th scope="col">Source</th><th scope="col">Last updated</th></tr></thead><tbody>${c.rows.map((r) => `<tr><th scope="row">${esc(r.city)}</th><td class="n">${px(r.typical)}</td><td class="n">${pxRange(r.low, r.high)}</td><td>${esc(r.source)}</td><td><time datetime="${r.updated}">${fmtDate(r.updated)}</time></td></tr>`).join('')}</tbody></table></div>`;
  const faq = [
    { q: `Is ${proc.phrase} cheaper in ${a.inName} or ${b.inName}?`, a: pct === 0 ? `The typical price is the same in both: ${usdText(ca.typical)}.` : `${cheaper.country.name}. The typical price is ${usdText(cheaper.typical)} there against ${usdText(dearer.typical)} in ${dearer.country.inName}, about ${pct}% less.` },
    { q: `How much is the difference?`, a: `${usdText(diff)} at typical prices. The ranges are ${rangeText(ca.low, ca.high)} in ${a.inName} and ${rangeText(cb.low, cb.high)} in ${b.inName}. Flights, accommodation and follow-up care are not included.` },
    { q: 'How reliable are these figures?', a: `${a.name}: confidence ${ca.confidence}, source type ${ca.sources.join('; ')}, last changed ${fmtDate(ca.updated)}. ${b.name}: confidence ${cb.confidence}, source type ${cb.sources.join('; ')}, last changed ${fmtDate(cb.updated)}. They are estimates for comparison, not quotes.` },
  ];
  const samePair = compares.filter((c) => c.a === a && c.b === b && c.proc !== proc);
  const sameProc = compares.filter((c) => c.proc === proc && c !== cmp);
  const updated = [ca.updated, cb.updated].sort().pop();
  const jsonld = ld.graph([
    ld.breadcrumbs(crumbs), ld.webPage({ path, title, description, updated }),
    ld.offer({ name: `${proc.name} in ${a.name}`, serviceType: proc.name, area: [a.name], low: ca.low, high: ca.high, count: ca.rows.length, path: ca.url }),
    ld.offer({ name: `${proc.name} in ${b.name}`, serviceType: proc.name, area: [b.name], low: cb.low, high: cb.high, count: cb.rows.length, path: cb.url }),
    ld.faq(faq),
  ]);
  const body = `<main id="main" class="wrap page">
${breadcrumbs(crumbs)}
<header class="hero">
  ${catChip(cat)}
  <h1>${esc(proc.name)} cost: ${esc(a.name)} vs ${esc(b.name)}</h1>
  <p class="answer">${esc(answerText)}</p>
  <div class="stats">
    <div class="stat"><span class="stat-label">${flag(a.iso2)} ${esc(a.name)}</span><strong>${px(ca.typical)}</strong><span>typical price</span></div>
    <div class="stat"><span class="stat-label">${flag(b.iso2)} ${esc(b.name)}</span><strong>${px(cb.typical)}</strong><span>typical price</span></div>
    <div class="stat"><span class="stat-label">Difference</span><strong class="vs-less">${pct}%</strong><span>${px(diff)} at typical prices</span></div>
  </div>
</header>
<section class="section" id="prices">
  <h2>Side by side</h2>
  ${fxNote(data, proc.basis ? `Prices are ${esc(proc.basis)}.` : '')}
  <div class="table-wrap"><table class="data compare-table">
    <caption>${esc(proc.name)} in ${esc(a.inName)} and ${esc(b.inName)}</caption>
    <thead><tr><td></td><th scope="col">${countryLink(a, ca.url)}</th><th scope="col">${countryLink(b, cb.url)}</th></tr></thead>
    <tbody>
    ${line('Typical price', (c) => px(c.typical))}
    ${line('Price range', (c) => pxRange(c.low, c.high))}
    ${line('Cities tracked', (c) => esc(c.rows.map((r) => r.city).join(', ')))}
    ${line('Clinics listed', (c) => `<a href="${c.url}#clinics">${c.clinics.length}</a>`)}
    ${line('What is included', (c) => esc(c.included) || '—')}
    ${line('Confidence', (c) => confTag(c.confidence))}
    ${line('Source', (c) => esc(c.sources.join('; ')))}
    ${line('Last updated', (c) => `<time datetime="${c.updated}">${fmtDate(c.updated)}</time>`)}
    </tbody>
  </table></div>
  <p class="note">Figures are estimates for comparison, not quotes. <a href="/methodology">How Renoo collects prices</a>.</p>
  ${cityTable(ca)}
  ${cityTable(cb)}
</section>
${safeguard(data, { cat, proc, rows: [...ca.rows, ...cb.rows] })}
${faqBlock(faq)}
<section class="section" id="related">
  <h2>Related</h2>
  <ul class="links"><li><a href="${ca.url}">${esc(proc.short)} in ${esc(a.inName)}</a></li><li><a href="${cb.url}">${esc(proc.short)} in ${esc(b.inName)}</a></li><li><a href="${proc.url}">${esc(proc.short)} in all countries</a></li></ul>
  ${sameProc.length ? `<h3>Other comparisons for ${esc(proc.short)}</h3><ul class="links">${sameProc.map((c) => `<li><a href="${c.path}">${esc(c.a.name)} vs ${esc(c.b.name)}</a></li>`).join('')}</ul>` : ''}
  ${samePair.length ? `<h3>${esc(a.name)} vs ${esc(b.name)} for other procedures</h3><ul class="links">${samePair.map((c) => `<li><a href="${c.path}">${esc(c.proc.name)}</a></li>`).join('')}</ul>` : ''}
</section>
</main>`;
  return { path, title, description, jsonld, body, accent: cat.color, track: { event: 'comparison_made', method: 'page', procedure: proc.slug, home: a.slug, destination: b.slug } };
}

// ---------- Hubs ----------
export function proceduresIndex(data) {
  const path = '/procedures', crumbs = [HOME, { name: 'Procedures', url: path }];
  const title = `All ${data.procedures.length} procedures with prices by country | Renoo`;
  const description = `Every procedure Renoo tracks, grouped by section, with the lowest and highest typical price across ${data.countries.length} countries.`;
  const sections = data.categories.map((cat) => `<section class="section" style="--accent:${cat.color}" id="${cat.slug}">
<h2>${icon(cat.icon, 'ico ico-accent')}<a href="${cat.url}">${esc(cat.name)}</a></h2>
<div class="table-wrap"><table class="data"><caption>${esc(cat.name)} procedures</caption>
<thead><tr><th scope="col">Procedure</th><th scope="col">Lowest typical price</th><th scope="col">Highest typical price</th><th scope="col">Countries</th></tr></thead>
<tbody>${cat.procedures.map((p) => `<tr><th scope="row"><a href="${p.url}">${esc(p.name)}</a></th><td class="n">${px(p.cheapest.typical)} <span class="muted">${esc(p.cheapest.country.name)}</span></td><td class="n">${px(p.priciest.typical)} <span class="muted">${esc(p.priciest.country.name)}</span></td><td class="n">${p.cells.length}</td></tr>`).join('')}</tbody></table></div></section>`).join('\n');
  const jsonld = ld.graph([ld.breadcrumbs(crumbs), ld.webPage({ path, title, description, updated: data.updated }), { '@type': 'ItemList', name: 'Procedures', itemListElement: data.procedures.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: `${SITE.url}${p.url}` })) }]);
  const body = `<main id="main" class="wrap page">${breadcrumbs(crumbs)}
<header class="hero"><h1>All procedures</h1><p class="answer">Renoo tracks prices for ${data.procedures.length} procedures in ${data.countries.length} countries. Each one is listed here under its section with the lowest and highest typical price.</p>${fxNote(data)}</header>
${sections}</main>`;
  return { path, title, description, jsonld, body };
}

export function countriesIndex(data) {
  const path = '/countries', crumbs = [HOME, { name: 'Countries', url: path }];
  const title = `Procedure prices in ${data.countries.length} countries | Renoo`;
  const description = `Every country Renoo tracks, with the number of procedures and cities covered and the median price difference against the United States.`;
  const rows = data.countries.map((c) => `<tr><th scope="row">${countryLink(c)}</th><td class="n">${c.cells.length}</td><td>${esc(c.cityList.map((x) => x.name).slice(0, 4).join(', '))}${c.cityList.length > 4 ? ` +${c.cityList.length - 4}` : ''}</td><td class="n ${c.medianSavingVsBase > 0 ? 'vs-less' : c.medianSavingVsBase < 0 ? 'vs-more' : ''}">${c === data.base ? 'baseline' : pctShort(c.medianSavingVsBase)}</td><td class="n">${num(c.clinicCount)}</td></tr>`).join('\n');
  const jsonld = ld.graph([ld.breadcrumbs(crumbs), ld.webPage({ path, title, description, updated: data.updated }), { '@type': 'ItemList', name: 'Countries', itemListElement: data.countries.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, url: `${SITE.url}${c.url}` })) }]);
  const body = `<main id="main" class="wrap page">${breadcrumbs(crumbs)}
<header class="hero"><h1>All countries</h1><p class="answer">Renoo has price data for ${data.countries.length} countries and ${new Set(data.rows.map((r) => `${r.city}|${r.country.slug}`)).size} cities. The table shows how many procedures are tracked in each and the median difference in typical price against the United States.</p></header>
<section class="section"><h2>Countries with price data</h2>
<div class="table-wrap"><table class="data"><caption>Countries tracked by Renoo</caption>
<thead><tr><th scope="col">Country</th><th scope="col">Procedures</th><th scope="col">Cities</th><th scope="col">Median vs United States</th><th scope="col">Clinics listed</th></tr></thead>
<tbody>${rows}</tbody></table></div>
<p class="note">Median vs United States is the middle value of the price differences for the procedures tracked in both countries, at typical prices.${METHOD_LINK}</p></section></main>`;
  return { path, title, description, jsonld, body };
}

export function compareIndex(data, compares) {
  const path = '/compare', crumbs = [HOME, { name: 'Compare', url: path }];
  const title = 'Compare procedure prices between two countries | Renoo';
  const description = `Pick two countries and see every procedure Renoo tracks in both, side by side.${compares.length ? ` Includes ${compares.length} ready-made comparisons for common travel routes.` : ''}`;
  const pairs = new Map();
  for (const c of compares) { const k = `${c.a.slug}|${c.b.slug}`; if (!pairs.has(k)) pairs.set(k, { a: c.a, b: c.b, list: [] }); pairs.get(k).list.push(c); }
  const lists = [...pairs.values()].map((pr) => `<details class="pair"><summary>${flag(pr.a.iso2)} ${esc(pr.a.name)} vs ${flag(pr.b.iso2)} ${esc(pr.b.name)} <span class="muted">${plural(pr.list.length, 'procedure')}</span></summary><ul class="links">${pr.list.map((c) => `<li><a href="${c.path}">${esc(c.proc.name)}</a></li>`).join('')}</ul></details>`).join('\n');
  const jsonld = ld.graph([ld.breadcrumbs(crumbs), ld.webPage({ path, title, description, updated: data.updated })]);
  const body = `<main id="main" class="wrap page">${breadcrumbs(crumbs)}
<header class="hero"><h1>Compare prices between two countries</h1><p class="answer">Choose a home country and a destination to see the typical price of every procedure Renoo tracks in both.</p></header>
<section class="section" id="tool">
  <h2>Compare tool</h2>
  <form class="compare-form card" data-compare-tool>
    <label>Home country<select name="a" data-compare-a></select></label>
    <button type="button" class="btn btn-ghost btn-icon" data-compare-swap aria-label="Swap countries">${icon(ICONS.swap, 'ico ico-sm')}</button>
    <label>Destination<select name="b" data-compare-b></select></label>
  </form>
  <noscript><p class="placeholder">The compare tool needs JavaScript. Without it, open a <a href="/countries">country page</a> to see its prices.</p></noscript>
  <div data-compare-out aria-live="polite"></div>
</section>
${lists ? `<section class="section" id="pairs">
  <h2>Ready-made comparisons</h2>
  <p>These pages cover common travel routes. The list of routes is editorial; it is not based on traffic data.</p>
  ${lists}
</section>` : ''}</main>`;
  return { path, title, description, jsonld, body, scripts: '<script src="/assets/compare.js" defer></script>' };
}
