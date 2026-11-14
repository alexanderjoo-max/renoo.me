// Loads the raw data files, cleans up naming differences, and builds the country-level
// figures every page and the map use. Nothing here changes the files in /data.
import { readFileSync } from 'node:fs';
import { CATEGORIES, PROCEDURES, COUNTRIES, COUNTRY_ALIASES, CITY_ALIASES, SITE } from '../../content/site.mjs';

const root = new URL('../../', import.meta.url);
const read = (p) => readFileSync(new URL(p, root), 'utf8');

export const slugify = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const median = (a) => { const s = [...a].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2); };
const mostCommon = (a) => { const c = new Map(); for (const x of a) if (x) c.set(x, (c.get(x) || 0) + 1); return [...c.entries()].sort((x, y) => y[1] - x[1])[0]?.[0] || ''; };
const CONF_RANK = { High: 3, Medium: 2, Low: 1 };

function parseCsv(text) {
  const rows = []; let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) { if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += ch; }
    else if (ch === '"') q = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') { if (ch === '\r' && text[i + 1] === '\n') i++; row.push(cell); cell = ''; if (row.length > 1 || row[0]) rows.push(row); row = []; }
    else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const head = rows.shift();
  return rows.map((r) => Object.fromEntries(head.map((h, i) => [h, (r[i] || '').trim()])));
}

const stripParens = (s) => s.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();

export function loadData() {
  const raw = JSON.parse(read('data/data.json'));
  const dates = JSON.parse(read('content/price-dates.json'));
  const fx = JSON.parse(read('content/fx.json'));
  const content = new Function(`${read('data/procedure-content.js')};return PROCEDURE_CONTENT`)();
  const issues = { unknownProcedures: new Set(), unknownCountries: new Set(), reorderedPrices: [] };

  const categories = CATEGORIES.map((c) => ({ ...c, url: `/category/${c.slug}`, procedures: [] }));
  const catBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

  const procedures = Object.entries(PROCEDURES).map(([dataName, p]) => ({
    ...p, dataName, url: `/procedure/${p.slug}`, cat: catBySlug[p.category],
    content: p.contentKey ? content[p.contentKey] || null : null,
    Phrase: p.phrase[0].toUpperCase() + p.phrase.slice(1),
    rows: [], countries: {},
  }));
  const procByName = Object.fromEntries(procedures.map((p) => [p.dataName, p]));
  for (const p of procedures) p.cat.procedures.push(p);

  const countries = Object.entries(COUNTRIES).map(([name, [iso2, id, currency, the]]) => ({
    name, slug: slugify(name), iso2, id, currency, the: !!the,
    inName: `${the ? 'the ' : ''}${name}`, url: `/country/${slugify(name)}`,
    cities: new Map(), rows: [], procedures: {}, clinics: [],
  }));
  const countryByName = Object.fromEntries(countries.map((c) => [c.name, c]));

  // Price rows
  const rows = [];
  for (const r of raw) {
    const proc = procByName[r.procedure];
    const country = countryByName[COUNTRY_ALIASES[r.country] || r.country];
    if (!proc) { issues.unknownProcedures.add(r.procedure); continue; }
    if (!country) { issues.unknownCountries.add(r.country); continue; }
    const city = CITY_ALIASES[r.city] || r.city;
    // 53 Botox rows list a "typical" price outside their own low-high range.
    // Treat the three figures as unordered: lowest, middle, highest.
    const sorted = [r.price_low_usd, r.price_mid_usd, r.price_high_usd].sort((a, b) => a - b);
    const reordered = !(r.price_low_usd <= r.price_mid_usd && r.price_mid_usd <= r.price_high_usd);
    if (reordered) issues.reorderedPrices.push(`${r.procedure} / ${city}`);
    const row = {
      proc, country, city, citySlug: slugify(city),
      low: sorted[0], typical: sorted[1], high: sorted[2], reordered,
      localCurrency: r.currency, included: r.included || '', notes: r.notes || '', caveats: r.caveats || '',
      confidence: r.confidence || 'Low', source: r.source || 'Not stated',
      updated: dates.rows[`${r.procedure}|${city}|${country.name}`] || dates.latest,
      lat: r.lat, lng: r.lng, clinics: (r.clinics || []).map((c) => ({ name: c.name, website: c.contact, notes: c.notes || '', city, fromPriceRow: true })),
    };
    rows.push(row); proc.rows.push(row); country.rows.push(row);
    if (!country.cities.has(city)) country.cities.set(city, { name: city, slug: row.citySlug, lat: r.lat, lng: r.lng });
  }

  // Clinic listings
  const clinicRows = parseCsv(read('data/clinics_complete.csv'));
  const procByLoose = Object.fromEntries(procedures.filter((p) => p.dataName !== 'Dental Veneers').map((p) => [stripParens(p.dataName), p]));
  let clinicsUsed = 0;
  const clinicIndex = new Map();
  for (const c of clinicRows) {
    const proc = procByName[c.Procedure] || procByLoose[stripParens(c.Procedure)];
    const country = countryByName[COUNTRY_ALIASES[c.Country] || c.Country];
    if (!proc || !country || !c.Clinic_Name) continue;
    const city = CITY_ALIASES[c.City] || c.City;
    const key = `${proc.slug}|${country.slug}`;
    if (!clinicIndex.has(key)) clinicIndex.set(key, []);
    const list = clinicIndex.get(key);
    if (list.some((x) => x.name === c.Clinic_Name && x.city === city)) continue;
    const website = /^https?:\/\//.test(c.Website) ? c.Website : '';
    list.push({
      name: c.Clinic_Name, city, address: c.Address, website,
      low: Number(c.Price_USD_Low) || null, high: Number(c.Price_USD_High) || null,
      certifications: c.Certifications, languages: c.Languages, includes: c.Package_Includes,
    });
    clinicsUsed++;
  }

  // Country-level figures for each procedure
  const cells = [];
  for (const proc of procedures) {
    const byCountry = new Map();
    for (const row of proc.rows) { if (!byCountry.has(row.country)) byCountry.set(row.country, []); byCountry.get(row.country).push(row); }
    for (const [country, rs] of byCountry) {
      rs.sort((a, b) => a.typical - b.typical);
      const key = `${proc.slug}|${country.slug}`;
      const clinics = [...(clinicIndex.get(key) || [])];
      for (const r of rs) for (const c of r.clinics) if (!clinics.some((x) => x.name === c.name && x.city === c.city)) clinics.push(c);
      const cell = {
        proc, country, rows: rs, clinics,
        low: Math.min(...rs.map((r) => r.low)), high: Math.max(...rs.map((r) => r.high)), typical: median(rs.map((r) => r.typical)),
        confidence: rs.map((r) => r.confidence).sort((a, b) => CONF_RANK[b] - CONF_RANK[a])[0],
        sources: [...new Set(rs.map((r) => r.source))], updated: rs.map((r) => r.updated).sort().pop(),
        included: mostCommon(rs.map((r) => r.included)),
        slug: `${proc.slug}-in-${country.slug}`, url: `/${proc.slug}-in-${country.slug}`,
      };
      proc.countries[country.slug] = cell; country.procedures[proc.slug] = cell; cells.push(cell);
    }
    proc.cells = Object.values(proc.countries).sort((a, b) => a.typical - b.typical);
    proc.cheapest = proc.cells[0]; proc.priciest = proc.cells[proc.cells.length - 1];
    proc.updated = proc.cells.map((c) => c.updated).sort().pop();
  }

  const base = countries.find((c) => c.slug === SITE.baseCountry);
  const savingsVs = (cell, home) => {
    const h = home.procedures[cell.proc.slug];
    if (!h || h === cell || !h.typical) return null;
    return Math.round(((h.typical - cell.typical) / h.typical) * 100);
  };

  for (const country of countries) {
    country.cells = Object.values(country.procedures).sort((a, b) => a.proc.name.localeCompare(b.proc.name));
    country.cityList = [...country.cities.values()].sort((a, b) => a.name.localeCompare(b.name));
    country.updated = country.cells.map((c) => c.updated).sort().pop();
    const s = country.cells.map((c) => savingsVs(c, base)).filter((x) => x !== null);
    country.medianSavingVsBase = s.length ? median(s) : null;
    country.clinicCount = country.cells.reduce((n, c) => n + c.clinics.length, 0);
    const lats = country.cityList.map((c) => c.lat), lngs = country.cityList.map((c) => c.lng);
    country.lat = lats.reduce((a, b) => a + b, 0) / (lats.length || 1);
    country.lng = lngs.reduce((a, b) => a + b, 0) / (lngs.length || 1);
  }
  const liveCountries = countries.filter((c) => c.cells.length).sort((a, b) => a.name.localeCompare(b.name));

  // Indexing rules (see docs/redesign-report.md)
  for (const cell of cells) {
    const reasons = [];
    if (cell.proc.cells.length === 1) reasons.push('the procedure has prices in only one country, so this page would repeat the procedure page');
    else if (cell.confidence === 'Low' && cell.clinics.length === 0) reasons.push('only low-confidence price estimates and no clinic listed');
    cell.noindex = reasons.length ? reasons.join('; ') : null;
  }
  for (const c of liveCountries) c.noindex = c.cells.length < 3 ? `only ${c.cells.length} procedure${c.cells.length === 1 ? '' : 's'} with price data` : null;

  // Biggest price gaps: most expensive country against cheapest, per procedure
  const gaps = procedures.filter((p) => p.cells.length >= 2).map((p) => ({
    proc: p, high: p.priciest, low: p.cheapest,
    diff: p.priciest.typical - p.cheapest.typical,
    pct: Math.round((1 - p.cheapest.typical / p.priciest.typical) * 100),
    ratio: p.priciest.typical / p.cheapest.typical,
  })).sort((a, b) => b.pct - a.pct);

  return { categories, catBySlug, procedures, countries: liveCountries, base, rows, cells, gaps, fx, dates, content, issues, clinicsUsed, clinicsTotal: clinicRows.length, savingsVs, updated: dates.latest };
}
