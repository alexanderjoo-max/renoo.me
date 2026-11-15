// Downloads the European Central Bank's daily reference exchange rates and saves them,
// rebased to US dollars, in content/fx.json. Run with: npm run update-rates
import { writeFileSync } from 'node:fs';

const SOURCE = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
const xml = await (await fetch(SOURCE)).text();
const date = xml.match(/time='(\d{4}-\d{2}-\d{2})'/)?.[1];
const eur = { EUR: 1 };
for (const m of xml.matchAll(/currency='([A-Z]{3})' rate='([\d.]+)'/g)) eur[m[1]] = Number(m[2]);
if (!date || !eur.USD) throw new Error('Could not read the ECB rates file');

const rates = {};
for (const [code, perEur] of Object.entries(eur)) rates[code] = Number((perEur / eur.USD).toPrecision(6));
rates.USD = 1;

const out = { date, source: 'European Central Bank euro foreign exchange reference rates', sourceUrl: SOURCE, base: 'USD', rates };
writeFileSync(new URL('../content/fx.json', import.meta.url), JSON.stringify(out, null, 1));
console.log(`fx: ${Object.keys(rates).length} currencies as of ${date}`);
