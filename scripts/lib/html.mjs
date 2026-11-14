// Shared HTML building blocks: escaping, prices, the page shell, tables, FAQ and JSON-LD.
import { SITE } from '../../content/site.mjs';

export const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const abs = (path) => `${SITE.url}${path === '/' ? '/' : path}`;
const nf = new Intl.NumberFormat('en-US');
export const num = (n) => nf.format(n);
export const usdText = (n) => `$${nf.format(Math.round(n))}`;
export const rangeText = (lo, hi) => (lo === hi ? usdText(lo) : `${usdText(lo)}–${usdText(hi)}`);
// Prices in the page body carry the USD figure so the browser can convert it to the visitor's currency.
export const px = (n) => `<span class="px" data-usd="${Math.round(n)}">${usdText(n)}</span>`;
export const pxRange = (lo, hi) => (lo === hi ? px(lo) : `${px(lo)}–${px(hi)}`);
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const fmtDate = (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${d} ${MONTHS[m - 1]} ${y}`; };
export const plural = (n, one, many = `${one}s`) => `${num(n)} ${n === 1 ? one : many}`;
export const flag = (iso2) => String.fromCodePoint(...[...iso2].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
export const pctWords = (p, than) => (p > 0 ? `about ${p}% less than ${than}` : p < 0 ? `about ${-p}% more than ${than}` : `about the same as ${than}`);
export const pctShort = (p) => (p === null || p === undefined ? '—' : p > 0 ? `−${p}%` : p < 0 ? `+${-p}%` : '0%');

export const icon = (paths, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

export const ICONS = {
  plane: '<path d="M10.500 13.500L3 11l1.500-1.500 7 1L16.500 5.500c1-1 2.700-1.300 3.400-.600s.400 2.400-.600 3.400L14.500 13l1 7L14 21.500l-2.500-7.500"/><path d="M10.500 13.500L7 17l-2-.500M11 17l.500 2"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
  arcs: '<path d="M3 18c2-8 7-12 9-12s7 4 9 12"/><path d="M7.500 18c1-4 3-6.500 4.500-6.500s3.500 2.500 4.500 6.500"/><circle cx="3" cy="18" r="1.200"/><circle cx="21" cy="18" r="1.200"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.200 3 14.800 0 18M12 3c-3 3.200-3 14.800 0 18"/>',
  doctor: '<path d="M12 3v6M9 6h6"/><path d="M5 21v-2a7 7 0 0114 0v2"/><circle cx="12" cy="6" r="4.500"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.500M12 7.600v.300"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
  swap: '<path d="M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>',
};

export const catChip = (cat, link = true) => {
  const inner = `${icon(cat.icon, 'ico ico-sm')}<span>${esc(cat.name)}</span>`;
  return link ? `<a class="cat-chip" style="--accent:${cat.color}" href="${cat.url}">${inner}</a>` : `<span class="cat-chip" style="--accent:${cat.color}">${inner}</span>`;
};

export function breadcrumbs(items) {
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map((it, i) => (i === items.length - 1
    ? `<li aria-current="page">${esc(it.name)}</li>`
    : `<li><a href="${it.url}">${esc(it.name)}</a></li>`)).join('')}</ol></nav>`;
}

export function faqBlock(faq, heading = 'Questions and answers') {
  if (!faq.length) return '';
  return `<section class="section" id="faq"><h2>${esc(heading)}</h2><div class="faq">${faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div></section>`;
}

// ---------- JSON-LD ----------
export const ld = {
  breadcrumbs: (items) => ({ '@type': 'BreadcrumbList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.url) })) }),
  webPage: ({ path, title, description, updated }) => ({ '@type': 'WebPage', '@id': `${abs(path)}#webpage`, url: abs(path), name: title, description, inLanguage: 'en', ...(updated ? { dateModified: updated } : {}), isPartOf: { '@type': 'WebSite', '@id': `${SITE.url}/#website`, name: SITE.name, url: `${SITE.url}/` } }),
  faq: (faq) => ({ '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }),
  offer: ({ name, serviceType, area, low, high, count, path }) => ({
    '@type': 'Service', name, serviceType, url: abs(path),
    ...(area ? { areaServed: area.map((a) => ({ '@type': 'Country', name: a })) } : {}),
    offers: { '@type': 'AggregateOffer', priceCurrency: 'USD', lowPrice: low, highPrice: high, offerCount: count },
  }),
  procedure: ({ name, description, howPerformed, followup, path }) => ({ '@type': 'MedicalProcedure', name, url: abs(path), ...(description ? { description } : {}), ...(howPerformed ? { howPerformed } : {}), ...(followup ? { followup } : {}) }),
  graph: (nodes) => JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) }).replace(/</g, '\\u003c'),
};

// ---------- Page shell ----------
const NAV = [['/', 'Map'], ['/procedures', 'Procedures'], ['/countries', 'Countries'], ['/compare', 'Compare'], ['/methodology', 'Methodology']];

export function layout(ctx, page) {
  const { data, assetVersion } = ctx;
  const { path, title, description, noindex, jsonld, body, accent, bodyClass = '', track = null, ogType = 'website', extraHead = '', scripts = '' } = page;
  const canonical = abs(path);
  const v = `?v=${assetVersion}`;
  const nav = NAV.map(([href, label]) => `<a href="${href}"${href === path ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const footCats = data.categories.map((c) => `<li><a href="${c.url}">${esc(c.name)}</a></li>`).join('');
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE.url}/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${SITE.url}/og-image.jpg">
<meta name="theme-color" content="#05070d">
<meta name="google-site-verification" content="vqFYYebbN6-s_Q4LNZOU4WV6Y1y2qMtVcvH4r-k9gBM">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="preload" href="/assets/fonts/onest.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/unbounded.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css${v}">
<script>document.documentElement.className='js';window.dataLayer=window.dataLayer||[];</script>
<script type="application/ld+json">${jsonld}</script>
${extraHead}</head>
<body class="${bodyClass}"${accent ? ` style="--accent:${accent}"` : ''}${track ? ` data-track='${esc(JSON.stringify(track))}'` : ''}>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <a class="logo" href="/" aria-label="Renoo home"><img src="/logo-white.svg" alt="Renoo.me" width="116" height="20"></a>
  <nav class="site-nav" aria-label="Main">${nav}</nav>
  <div class="header-tools">
    <button class="home-pill" type="button" data-home-open hidden aria-haspopup="dialog"><span data-home-flag></span><span data-home-label>Home country</span></button>
    <details class="mobile-menu">
      <summary aria-label="Menu">${icon(ICONS.menu)}</summary>
      <nav aria-label="Mobile">${nav}<a href="/about">About</a><a href="/medical-disclaimer">Medical disclaimer</a></nav>
    </details>
  </div>
</header>
${body}
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <img src="/logo-white.svg" alt="Renoo.me" width="116" height="20" loading="lazy">
      <p>Renoo compares what clinics charge for medical, wellness and aesthetic procedures in ${data.countries.length} countries. Prices are estimates for comparison, not quotes.</p>
      <p>Price data last changed on ${fmtDate(data.updated)}.</p>
    </div>
    <nav aria-label="Sections"><h2>Sections</h2><ul>${footCats}</ul></nav>
    <nav aria-label="Explore"><h2>Explore</h2><ul>
      <li><a href="/">Price map</a></li><li><a href="/procedures">All procedures</a></li><li><a href="/countries">All countries</a></li><li><a href="/compare">Compare two countries</a></li><li><a href="/travel">Flights and hotels</a></li>
    </ul></nav>
    <nav aria-label="About Renoo"><h2>About</h2><ul>
      <li><a href="/methodology">Methodology</a></li><li><a href="/about">About Renoo</a></li><li><a href="/medical-disclaimer">Medical disclaimer</a></li><li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
    </ul></nav>
  </div>
  <p class="wrap footer-legal">Renoo does not provide medical advice and is not a clinic. Talk to a qualified doctor before any treatment. <a href="/medical-disclaimer">Read the medical disclaimer</a>.</p>
</footer>
<dialog class="home-dialog" id="homeDialog" aria-labelledby="homeDialogTitle">
  <form method="dialog">
    <h2 id="homeDialogTitle">Your home country</h2>
    <p>Savings are worked out against prices in your home country.</p>
    <label>Home country<select data-home-country></select></label>
    <label>Show prices in<select data-home-currency></select></label>
    <p class="note" data-home-note></p>
    <button class="btn" value="ok">Done</button>
  </form>
</dialog>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${SITE.gtmId}" height="0" width="0" style="display:none;visibility:hidden" title="Google Tag Manager"></iframe></noscript>
<script type="application/json" id="site-config">${JSON.stringify(ctx.clientConfig).replace(/</g, '\\u003c')}</script>
<script src="/assets/app.js${v}" defer></script>
${scripts}</body>
</html>
`;
}
