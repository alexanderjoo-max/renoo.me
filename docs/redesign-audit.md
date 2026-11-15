# Renoo.me redesign audit

Audit of the `main` branch at commit `9315ad0`, taken on 2026-11-14 before any redesign work.

## 1. Stack

| Area | What exists today |
| --- | --- |
| Type of site | Hand-written static site. Seven HTML files, five JavaScript files and one 5,197-line stylesheet. No framework, no build step, no package.json. |
| Rendering | Every page is an empty shell. All content is drawn in the browser by JavaScript after it downloads `data.json` (672 KB). With JavaScript off, a search engine or AI tool sees a header and nothing else. |
| Map | Mapbox GL JS 2.15, loaded from the Mapbox CDN on first paint, with a public Mapbox token hard-coded in `app.js`. Flat street map, one HTML marker per city, popups on click. |
| Analytics | Google Tag Manager (`GTM-WXWMBBSK`) and Google Analytics 4 (`G-SVV8QNE0QJ`) on every page. One custom event exists: `clinic_website_click`. |
| Other third-party scripts | Travelpayouts affiliate script (`emrldtp.cc`) on most pages, and Travelpayouts flight/hotel widgets on `travel.html`. Google Fonts (Inter). |
| Languages | English only, so no hreflang is needed. |

## 2. Hosting and deploys

- The live domain is served by **Vercel**. `https://renoo.me` answers with a 308 redirect to `https://www.renoo.me/`, with `server: Vercel`.
- The GitHub repo is connected to Vercel: every commit gets a Vercel **Production** deployment (for `main`) and **Preview** deployments (for other branches).
- GitHub Pages is also switched on for the repo (legacy mode, `main` branch, root folder, `CNAME` = renoo.me). It still builds on every push, but the domain's DNS points at Vercel, so the Pages build is not what visitors see.
- Vercel currently has no build to run: it serves the repo root as-is.
- The canonical tags and sitemap say `https://renoo.me/`, but the server redirects that host to `https://www.renoo.me/`. Canonical URLs should match the host that actually answers.

## 3. Data model

### 3.1 `data.json` (the live data, 1,356 rows)

One row per procedure per city:

| Field | Meaning | Notes |
| --- | --- | --- |
| `procedure` | Procedure name | 32 distinct names |
| `category` | Old category | 12 values: Cosmetic, Orthopedic, Dental, Diagnostics, Vision, Fertility, Weight Loss, Wellness, Regenerative, Hormone Therapy, Surgical, Bariatric |
| `city`, `country`, `region` | Location | 76 cities, 53 countries once duplicates are merged |
| `price_low_usd`, `price_high_usd`, `price_mid_usd` | Price range and typical price | Always in US dollars |
| `currency` | The local currency code | Informational only; no local-currency prices are stored |
| `included`, `notes`, `caveats` | Free text | Sometimes mentions regulation ("Prescription required", "legal restrictions vary") |
| `confidence` | High / Medium / Low | 382 High, 920 Medium, 54 Low |
| `source` | Free-text source type | e.g. "Market estimates" (368 rows), "Clinic websites + aggregators" (192) |
| `lat`, `lng` | City coordinates | |
| `clinics` | Optional list of named clinics | Only 12 rows |

Coverage: 18 procedures have prices in all 53 countries; the other 14 (mostly wellness, hormone and regenerative therapies) cover 1 to 12 countries.

### 3.2 Other data files

| File | What it is | Used by the live site? |
| --- | --- | --- |
| `clinics_complete.csv` | 1,545 clinic listings (name, address, phone, website, price range, certifications, languages) across 85 cities | Yes, on city pages |
| `procedure-content.js` | Editorial text for 30 procedures: what it is, how it works, benefits, candidates, results, safety, FAQ | Yes, on procedure pages |
| `clinics_data.csv` | Earlier clinic list (877 rows) | No |
| `renoo-data.json` | Early export, 6 procedures | No |
| `old data.json` | First data version, 120 rows | No |
| `add_cities.py`, `add_procedures.py`, `remove_duplicates.py` | One-off scripts used to grow the data | No |

### 3.3 Currencies

Prices are stored only in USD. The site converts to 16 currencies using exchange rates hard-coded in four separate JavaScript files, with no date. Several are clearly stale (for example the Turkish lira rate is 32.5 per dollar).

Flight and hotel costs for the "trip calculator" are also hard-coded estimates inside `city.js` and `procedure.js`, with no source.

## 4. Pages and URLs today

| URL | What it does |
| --- | --- |
| `/` (`index.html`) | Full-screen map, procedure picker, result list, compare bar |
| `/procedure.html` | List of all procedures |
| `/procedure.html?procedure=Botox` | Procedure guide: text, prices by country, trip calculator |
| `/city.html?city=Bangkok&country=Thailand&procedure=Botox` | City page: price, clinics, other procedures, comparison |
| `/compare.html` | Compare two cities across all procedures |
| `/about.html` | About and contact |
| `/travel.html` (`#city=` or `?city=`) | Travelpayouts flight and hotel widgets |
| `/data.json`, `/clinics_complete.csv`, logos, `og-image.jpg`, Google verification file | Public files |

`sitemap.xml` lists only the home page. `robots.txt` allows everything but points at the non-www sitemap.

## 5. How the map works now

1. Mapbox GL loads on first paint (about 250 KB of script plus map tiles), before any content.
2. `app.js` downloads the whole `data.json`, then waits for the visitor to choose a procedure.
3. It draws one price marker per city for that procedure and a sorted result list in a side panel (a bottom sheet on phones).
4. Clicking a marker opens a popup; clicking a result opens the city page (in an iframe overlay on desktop).
5. There is no country-level view, no heatmap, no price-gap view, no home-country comparison, and no category filter on the map.

## 6. What to keep

- All price data (`data.json`), clinic data (`clinics_complete.csv`) and procedure text (`procedure-content.js`), unchanged.
- Vercel hosting and the GitHub-to-Vercel connection.
- Google Tag Manager and GA4, including the existing `clinic_website_click` event.
- The Travelpayouts script and widgets (they appear to be the site's revenue source).
- The logo, favicon, share image, contact address and Google Search Console verification file.
- Every existing URL, either as a working page or a redirect.

## 7. What to replace

| Today | Replacement | Why |
| --- | --- | --- |
| Pages drawn entirely by JavaScript | Static HTML generated from the data by a build script | Search engines and AI tools can read every page without JavaScript |
| Query-string URLs (`procedure.html?procedure=…`) | Readable URLs (`/procedure/botox`, `/botox-in-thailand`) with redirects from the old ones | One indexable URL per topic |
| Mapbox with a token, loaded up front | MapLibre GL (open source, no token, no usage fees) with a 3D globe, loaded only after the text is on screen | Faster first screen, no vendor key, same programming model as the current map |
| Four copies of hard-coded exchange rates | One dated rates file from the European Central Bank | Prices in the visitor's currency are accurate and show their date |
| 12 old categories and a 4-group menu | The 7 requested sections (plus a holding section for procedures that fit none) | New site structure |
| One-line sitemap | Sitemap generated from the data on every build | Always current |
| 5,197-line stylesheet | New compact design system | Dark, glassy, app-like direction |

## 8. Data problems found

1. **Duplicate country names.** "UK" and "United Kingdom", "USA" and "United States", "Czech Rep." and "Czech Republic" all appear. Regions are inconsistent too (Turkey appears under three region names, Mexico under two).
2. **Duplicate city names.** "Bogota" and "Bogotá"; "New York" and "New York City".
3. **53 Botox rows have a "typical" price outside their own low–high range** (for example Bangkok: low 80, high 250, typical 375).
4. **"San Jose" is two different cities** (Costa Rica and United States); they must be kept apart by country.
5. **Two procedure names overlap.** "Dental Veneers" (3 rows, priced per tooth) and "Dental Veneers (Full Mouth)" (75 rows). The live site merges them, which mixes per-tooth and full-mouth prices.
6. **Hong Kong is filed under China**, and Taiwan as its own country. Kept as the data has it.

## 9. Data missing for the new structure

| Needed for | Missing | Consequence |
| --- | --- | --- |
| "Restricted at Home" legal status by country | There is **no legal-status field** anywhere in the repo. Only scattered free-text hints such as "Prescription required" and "legal restrictions vary". | Pages can show where clinics offer a therapy and quote the regulatory notes that exist. Actual legal status must be shown as "not yet verified". |
| "How old is this price" | No date on any row. | The only real dates are in the repo's change history. Each row's "last updated" can be taken from the commit that last changed its numbers. |
| Price source | Source is a category ("Market estimates"), not a link or a named clinic. | Pages can state the source type, not cite a document. |
| Local-currency prices | Only USD is stored. | Other currencies are conversions, and must be labelled as such. |
| Recovery and safety facts | Present for 30 of 32 procedures. Missing for Clear Aligners; the single-tooth "Dental Veneers" shares the full-mouth text. | Clear Aligners gets a marked placeholder. |
| Country pages | No country-level descriptions or regulatory summaries. | Country pages are built from prices, cities, clinics and any regulatory notes in the rows. |
| Popular comparison pairs | No traffic or search data in the repo. | "Popular pairs" has to be an editorial list until analytics can inform it. |
| Men's Health, Peptides sections | Only one procedure each fits cleanly (TRT; Peptide Therapy). | These sections will be thin until more procedures are added. |
| Authors, reviewers, credentials | None in the repo. | None will be shown. |
