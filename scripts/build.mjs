// Builds the whole site into /dist from the files in /data and /content.
// Run with: npm run build
import { mkdirSync, writeFileSync, readFileSync, rmSync, cpSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';
import { feature } from 'topojson-client';
import { SITE, ALLOWED_CRAWLERS, BLOCKED_CRAWLERS } from '../content/site.mjs';
import { loadData } from './lib/data.mjs';
import { layout, abs } from './lib/html.mjs';
import { procedurePage, comboPage, countryPage, categoryPage, comparePage, comparePages, proceduresIndex, countriesIndex, compareIndex } from './lib/pages.mjs';
import { methodologyPage, aboutPage, disclaimerPage, travelPage, notFoundPage, legacyRedirectPage } from './lib/static-pages.mjs';
import { homePage } from './lib/home.mjs';
import { vercelConfig } from './lib/vercel.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const t0 = Date.now();
const read = (p) => readFileSync(join(root, p), 'utf8');
const out = (p, content) => { const f = join(dist, p); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, content); };

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

const data = loadData();
if (data.issues.unknownProcedures.size || data.issues.unknownCountries.size) {
  throw new Error(`Data has names missing from content/site.mjs. Procedures: ${[...data.issues.unknownProcedures].join(', ') || 'none'}. Countries: ${[...data.issues.unknownCountries].join(', ') || 'none'}. Add them there and build again.`);
}

// ---------- Assets ----------
const srcFiles = ['src/css/site.css', ...readdirSync(join(root, 'src/js')).map((f) => `src/js/${f}`)];
const assetVersion = createHash('sha1').update(srcFiles.map(read).join('') + JSON.stringify(data.fx) + data.updated + data.rows.length).digest('hex').slice(0, 8);
const sizes = {};
const css = await transform(read('src/css/site.css'), { loader: 'css', minify: true });
out('assets/site.css', css.code); sizes['site.css'] = css.code.length;
for (const f of readdirSync(join(root, 'src/js'))) {
  const js = await transform(read(`src/js/${f}`).replaceAll('__V__', assetVersion), { loader: 'js', minify: true, target: 'es2019' });
  out(`assets/${f}`, js.code); sizes[f] = js.code.length;
}
cpSync(join(root, 'node_modules/@fontsource-variable/onest/files/onest-latin-wght-normal.woff2'), join(dist, 'assets/fonts/onest.woff2'), { recursive: true });
cpSync(join(root, 'node_modules/@fontsource-variable/unbounded/files/unbounded-latin-wght-normal.woff2'), join(dist, 'assets/fonts/unbounded.woff2'));
cpSync(join(root, 'node_modules/maplibre-gl/dist/maplibre-gl.js'), join(dist, 'assets/vendor/maplibre-gl.js'), { recursive: true });
cpSync(join(root, 'node_modules/maplibre-gl/dist/maplibre-gl.css'), join(dist, 'assets/vendor/maplibre-gl.css'));

// Country shapes for the globe (Natural Earth 1:110m via the world-atlas package)
const topo = JSON.parse(read('node_modules/world-atlas/countries-110m.json'));
const withData = new Set(data.countries.map((c) => c.id));
const round = (c) => (typeof c[0] === 'number' ? [Math.round(c[0] * 100) / 100, Math.round(c[1] * 100) / 100] : c.map(round));
const world = feature(topo, topo.objects.countries);
world.features = world.features.filter((f) => f.id !== '010').map((f) => ({ type: 'Feature', properties: { id: f.id || `x-${f.properties.name}`, name: f.properties.name, d: withData.has(f.id) ? 1 : 0 }, geometry: { type: f.geometry.type, coordinates: round(f.geometry.coordinates) } }));
out('assets/world.json', JSON.stringify(world));

// ---------- Data for the map and tools ----------
const compares = comparePages(data);
const appData = {
  updated: data.updated, base: SITE.baseCountry,
  categories: data.categories.map((c) => ({ s: c.slug, n: c.name, c: c.color, r: c.regulated ? 1 : 0 })),
  procedures: data.procedures.map((p) => ({ s: p.slug, n: p.name, h: p.short, c: p.category, b: p.basis || '' })),
  countries: data.countries.map((c) => ({ s: c.slug, n: c.name, i: c.iso2, id: c.id, t: c.the ? 1 : 0, lat: +c.lat.toFixed(2), lng: +c.lng.toFixed(2), x: c.noindex ? 1 : 0 })),
  // prices[procedure][country] = [low, typical, high, cities, confidence initial, updated, noindex]
  prices: Object.fromEntries(data.procedures.map((p) => [p.slug, Object.fromEntries(p.cells.map((c) => [c.country.slug, [c.low, c.typical, c.high, c.rows.length, c.confidence[0], c.updated, c.noindex ? 1 : 0]]))])),
  cities: [...new Map(data.rows.map((r) => [`${r.city}|${r.country.slug}`, [r.city, r.country.slug, +r.lat.toFixed(2), +r.lng.toFixed(2)]])).values()],
  pairs: [...new Set(compares.map((c) => `${c.a.slug}|${c.b.slug}`))],
};
out('assets/app-data.json', JSON.stringify(appData));

const ctx = {
  data, assetVersion,
  clientConfig: { v: assetVersion, base: SITE.baseCountry, gtm: SITE.gtmId, ga4: SITE.ga4Id, fx: { date: data.fx.date, rates: data.fx.rates }, countries: data.countries.map((c) => [c.slug, c.name, c.iso2, c.currency, c.the ? 1 : 0]) },
};

// ---------- Pages ----------
const pages = [];
const add = (type, page, updated) => pages.push({ type, updated: updated || data.updated, ...page });
add('home', homePage(data));
add('hub', proceduresIndex(data)); add('hub', countriesIndex(data)); add('hub', compareIndex(data, compares));
for (const c of data.categories) add('category', categoryPage(data, c), c.procedures.map((p) => p.updated).sort().pop());
for (const p of data.procedures) add('procedure', procedurePage(data, p, compares), p.updated);
for (const c of data.countries) add('country', countryPage(data, c, compares), c.updated);
for (const c of data.cells) add('procedure-in-country', comboPage(data, c, compares), c.updated);
for (const c of compares) add('compare', comparePage(data, c, compares), [c.ca.updated, c.cb.updated].sort().pop());
add('trust', methodologyPage(data)); add('trust', aboutPage(data)); add('trust', disclaimerPage(data));
add('travel', travelPage(data));
add('system', notFoundPage(data));
add('system', legacyRedirectPage(data, 'procedure')); add('system', legacyRedirectPage(data, 'city'));

const seen = new Set();
for (const p of pages) {
  if (seen.has(p.path)) throw new Error(`Two pages want the same address: ${p.path}`);
  seen.add(p.path);
  const html = layout(ctx, { ...p, scripts: (p.scripts || '').replace(/(\/assets\/[a-z-]+\.js)/g, `$1?v=${assetVersion}`) });
  out(p.file || (p.path === '/' ? 'index.html' : `${p.path.slice(1)}.html`), html);
}

// ---------- Files at the site root ----------
for (const f of readdirSync(join(root, 'static'))) cpSync(join(root, 'static', f), join(dist, f), { recursive: true });
// Files that were public on the old site stay at the same addresses
cpSync(join(root, 'data/data.json'), join(dist, 'data.json'));
cpSync(join(root, 'data/clinics_complete.csv'), join(dist, 'clinics_complete.csv'));

const indexable = pages.filter((p) => !p.noindex);
const lastmod = (p) => (p.updated > SITE.released ? p.updated : SITE.released);
out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map((p) => `<url><loc>${abs(p.path)}</loc><lastmod>${lastmod(p)}</lastmod></url>`).join('\n')}\n</urlset>\n`);

out('robots.txt', `# Renoo welcomes search engines and AI crawlers.
# The crawler list is kept in content/site.mjs (ALLOWED_CRAWLERS, BLOCKED_CRAWLERS).
User-agent: *
Allow: /

${ALLOWED_CRAWLERS.map((c) => `User-agent: ${c}`).join('\n')}
Allow: /
${BLOCKED_CRAWLERS.length ? `\n${BLOCKED_CRAWLERS.map((c) => `User-agent: ${c}`).join('\n')}\nDisallow: /\n` : ''}
Sitemap: ${SITE.url}/sitemap.xml
`);

const cityCount = new Set(data.rows.map((r) => `${r.city}|${r.country.slug}`)).size;
out('llms.txt', `# Renoo

> Renoo compares what clinics charge for ${data.procedures.length} medical, wellness and aesthetic procedures in ${cityCount} cities across ${data.countries.length} countries. Prices are ranges in US dollars with a source type, a confidence rating and a last-updated date. They are estimates for comparison, not quotes, and nothing on the site is medical advice. Price data last changed on ${data.updated}.

Every page is plain HTML with a one-paragraph answer at the top and a price table. Renoo has not verified the legal status of any therapy in any country and does not state it.

## URL patterns

- \`/procedure/{procedure}\`: one procedure, price by country. Example: ${abs('/procedure/dental-implant')}
- \`/{procedure}-in-{country}\`: one procedure in one country, price by city, clinics listed. Example: ${abs('/dental-implant-in-thailand')}
- \`/country/{country}\`: every procedure tracked in one country. Example: ${abs('/country/thailand')}
- \`/category/{section}\`: one section of the site. Example: ${abs('/category/dental')}
- \`/compare/{procedure}/{country-a}-vs-{country-b}\`: two countries side by side. Example: ${abs(compares[0].path)}

## Data

- [All prices as JSON](${abs('/api/prices.json')}): country-level low, typical and high price for every procedure, with source types and dates
- [Sitemap](${abs('/sitemap.xml')}): every indexable page
- [Methodology](${abs('/methodology')}): where prices come from, how country figures are calculated, how often they change
- [Medical disclaimer](${abs('/medical-disclaimer')})

## Sections

${data.categories.map((c) => `- [${c.name}](${abs(c.url)}): ${c.tagline} Procedures: ${c.procedures.map((p) => p.name).join(', ')}`).join('\n')}

## Procedures

${data.procedures.map((p) => `- [${p.name}](${abs(p.url)}): typical price ${p.cheapest.typical} USD (${p.cheapest.country.name}) to ${p.priciest.typical} USD (${p.priciest.country.name}), ${p.cells.length} ${p.cells.length === 1 ? 'country' : 'countries'}`).join('\n')}

## Countries

${data.countries.map((c) => `- [${c.name}](${abs(c.url)}): ${c.cells.length} procedures`).join('\n')}

## About

- [About Renoo](${abs('/about')})
- Contact: ${SITE.email}
`);

out('api/prices.json', JSON.stringify({
  name: 'Renoo procedure prices by country', url: abs('/api/prices.json'), documentation: abs('/methodology'),
  currency: 'USD', dataLastChanged: data.updated,
  notes: 'Country-level figures. low and high span the cities tracked in the country; typical is the median of city typical prices. Estimates for comparison, not quotes.',
  procedures: data.procedures.map((p) => ({
    slug: p.slug, name: p.name, category: p.cat.name, url: abs(p.url), priceBasis: p.basis || null,
    countries: p.cells.map((c) => ({ country: c.country.name, iso2: c.country.iso2, url: abs(c.url), low: c.low, typical: c.typical, high: c.high, cities: c.rows.map((r) => r.city), confidence: c.confidence, sourceTypes: c.sources, lastUpdated: c.updated })),
  })),
}));

// ---------- Hosting config check ----------
const wantVercel = JSON.stringify(vercelConfig(data), null, 2) + '\n';
if (process.argv.includes('--write-vercel')) writeFileSync(join(root, 'vercel.json'), wantVercel);
else if (!existsSync(join(root, 'vercel.json')) || read('vercel.json') !== wantVercel) console.warn('WARNING: vercel.json is out of date. Run: node scripts/build.mjs --write-vercel');

// ---------- Report ----------
const byType = {};
for (const p of pages) { byType[p.type] ??= { total: 0, noindex: [] }; byType[p.type].total++; if (p.noindex) byType[p.type].noindex.push({ path: p.path, reason: p.noindex }); }
out('build-report.json', JSON.stringify({ built: new Date().toISOString(), assetVersion, pages: pages.length, indexable: indexable.length, byType, assetBytes: sizes, dataUpdated: data.updated, fxDate: data.fx.date, clinicsUsed: data.clinicsUsed, reorderedPrices: data.issues.reorderedPrices.length }, null, 1));
console.log(`Built ${pages.length} pages (${indexable.length} indexable) in ${Date.now() - t0} ms`);
console.log(Object.entries(byType).map(([k, v]) => `  ${k}: ${v.total}${v.noindex.length ? ` (${v.noindex.length} noindex)` : ''}`).join('\n'));
