// Works out when each price row last changed, using the repo's change history.
// The data has no date field, so the commit that last changed a row's numbers is the
// only real "last updated" date available. Writes content/price-dates.json.
// Run with: npm run update-price-dates (needs the full git history).
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { COUNTRY_ALIASES, CITY_ALIASES } from '../content/site.mjs';

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] });
const PATHS = ['data/data.json', 'data.json'];

const commits = git('log', '--reverse', '--format=%H %cs', '--', ...PATHS)
  .trim().split('\n').filter(Boolean).map((l) => l.split(' '));

const rows = {};
let latest = null;
let skipped = 0;
for (const [sha, date] of commits) {
  let json = null;
  for (const p of PATHS) {
    try { json = JSON.parse(git('show', `${sha}:${p}`)); break; } catch { /* try next path */ }
  }
  if (!Array.isArray(json)) { skipped++; continue; }
  for (const r of json) {
    const country = COUNTRY_ALIASES[r.country] || r.country;
    const city = CITY_ALIASES[r.city] || r.city;
    const key = `${r.procedure}|${city}|${country}`;
    const sig = [r.price_low_usd ?? r.low_price_usd, r.price_high_usd ?? r.high_price_usd, r.price_mid_usd ?? r.typical_price_usd].join('/');
    if (!rows[key] || rows[key].sig !== sig) rows[key] = { sig, date };
  }
  latest = date;
}

const out = { note: 'Date each price row last changed, from the git history of data.json.', latest, rows: Object.fromEntries(Object.entries(rows).map(([k, v]) => [k, v.date])) };
writeFileSync(new URL('../content/price-dates.json', import.meta.url), JSON.stringify(out, null, 1));
console.log(`price-dates: ${Object.keys(rows).length} rows from ${commits.length} commits (${skipped} unreadable), latest ${latest}`);
