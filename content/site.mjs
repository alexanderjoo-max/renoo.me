// Site structure: categories, procedures and countries.
// This file is the single place to change which section a procedure belongs to.

export const SITE = {
  name: 'Renoo',
  domain: 'renoo.me',
  // The live host. renoo.me redirects to www.renoo.me, so canonical URLs use www.
  url: (process.env.SITE_URL || 'https://www.renoo.me').replace(/\/$/, ''),
  email: 'hello@renoo.me',
  baseCountry: 'united-states',
  gtmId: 'GTM-WXWMBBSK',
  ga4Id: 'G-SVV8QNE0QJ',
  // Date of the last change to page templates or wording. Used for sitemap dates.
  released: '2026-11-14',
};

// Crawlers named in robots.txt. All are allowed. Remove a name here to stop naming it;
// to block one, move it to BLOCKED_CRAWLERS.
export const ALLOWED_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', // OpenAI: training, search, user-requested fetches
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', // Anthropic
  'PerplexityBot', 'Perplexity-User', // Perplexity
  'Google-Extended', // Google AI training control (Googlebot itself is covered by *)
];
export const BLOCKED_CRAWLERS = [];

// What is switched on. The redesign is being delivered in stages:
//   safeguards: regulatory-status boxes, "consult a doctor" notes and the no-dosing text filter (Phase 5)
//   seo:        methodology and disclaimer pages, generated FAQs, compare pages, llms.txt, JSON endpoint (Phase 6)
// Set a stage to true and rebuild to switch it on.
export const STAGE = { safeguards: false, seo: false };

export const CATEGORIES = [
  {
    slug: 'mens-health',
    name: "Men's Health",
    color: '#5AA9FF',
    icon: '<circle cx="10" cy="14" r="5.5"/><path d="M14 10l6-6M15 4h5v5"/>',
    regulated: true,
    tagline: 'Hormone and hair treatments for men, priced by country.',
    intro: "Prices for men's health treatments differ widely between countries. This section covers the treatments Renoo tracks today, with the price range in each country and the type of source behind each figure.",
  },
  {
    slug: 'anti-aging-longevity',
    name: 'Anti-Aging & Longevity',
    color: '#3DE8A8',
    icon: '<path d="M7.5 9C4.5 9 3 10.7 3 12s1.500 3 4.500 3c4 0 5-6 9-6 3 0 4.500 1.700 4.500 3s-1.500 3-4.500 3c-4 0-5-6-9-6z"/>',
    regulated: false,
    tagline: 'Longevity clinics, infusions and advanced screening.',
    intro: 'Longevity and wellness clinics price the same therapy very differently from one country to the next. This section lists the therapies Renoo tracks and what clinics charge for them in each country.',
  },
  {
    slug: 'peptides',
    name: 'Peptides',
    color: '#B197FF',
    icon: '<circle cx="6" cy="7" r="2.500"/><circle cx="18" cy="8" r="2.500"/><circle cx="11" cy="17" r="2.500"/><path d="M8.400 7.400l7.100.400M7.200 9.200l2.700 5.600M16.600 10.100l-4 5"/>',
    regulated: true,
    tagline: 'What clinics charge for peptide therapy, by country.',
    intro: 'Peptide therapy is offered by wellness and anti-aging clinics in a limited number of countries. This section shows where Renoo has price data and what clinics charge.',
  },
  {
    slug: 'restricted-at-home',
    name: 'Restricted at Home',
    color: '#FFB547',
    icon: '<path d="M12 3l7 3v5.500c0 4.300-2.900 7.900-7 9.500-4.100-1.600-7-5.200-7-9.500V6l7-3z"/><path d="M12 8.500v4.500M12 16.200v.300"/>',
    regulated: true,
    tagline: 'Therapies whose rules change at the border.',
    intro: 'Some therapies are offered by clinics in one country and restricted, prescription-only or unapproved in another. This section shows where clinics list them and at what price. Renoo has not yet verified the legal status in each country, so each entry is marked accordingly.',
  },
  {
    slug: 'beauty',
    name: 'Beauty',
    color: '#FF6FB5',
    icon: '<path d="M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800L12 3z"/><path d="M19 15.500l.700 1.800 1.800.700-1.800.700-.700 1.800-.700-1.800-1.800-.700 1.800-.700.700-1.800z"/>',
    regulated: false,
    tagline: 'Non-surgical treatments: injectables, skin and hair.',
    intro: 'Non-surgical beauty treatments are short clinic visits with little or no downtime. This section compares what clinics charge in each country.',
  },
  {
    slug: 'cosmetic-surgery',
    name: 'Cosmetic Surgery',
    color: '#FF8A5C',
    icon: '<path d="M20.500 3.500c-5 1.500-9.500 5.500-12 10.500l2.500 2.500c4.500-2.500 8.500-7.500 9.500-13z"/><path d="M8.500 14L4 18.500 5.500 20 10 15.500"/>',
    regulated: false,
    tagline: 'Surgical procedures for face and body.',
    intro: 'Cosmetic surgery is where the price gap between countries is largest in absolute terms. This section compares surgeon and hospital package prices in each country.',
  },
  {
    slug: 'dental',
    name: 'Dental',
    color: '#4FE3F5',
    icon: '<path d="M7.500 3.500C5.300 3.500 4 5.200 4 7.500c0 2 .800 3.300 1.200 5 .500 2.200.600 8 2.300 8 1.600 0 1.300-5 4.500-5s2.900 5 4.500 5c1.700 0 1.800-5.800 2.300-8 .400-1.700 1.200-3 1.200-5 0-2.300-1.300-4-3.500-4-1.800 0-2.700 1-4.500 1s-2.700-1-4.500-1z"/>',
    regulated: false,
    tagline: 'Implants, veneers and aligners.',
    intro: 'Dental work is one of the most common reasons people travel for treatment. This section compares clinic prices for implants, veneers and aligners in each country.',
  },
  {
    // Holding section for existing procedures that fit none of the seven sections above.
    slug: 'medical',
    name: 'Medical & Surgical',
    color: '#B8C6E6',
    icon: '<rect x="3.500" y="3.500" width="17" height="17" rx="4"/><path d="M12 8v8M8 12h8"/>',
    regulated: false,
    holding: true,
    tagline: 'Other medical procedures tracked by Renoo.',
    intro: 'These procedures were already on Renoo before the site was reorganised and do not belong to any of the seven main sections: joint replacement, eye surgery, fertility treatment, weight-loss surgery, diagnostics and gender-affirming surgery.',
  },
];

// key = procedure name exactly as written in data/data.json
// phrase = how the procedure reads mid-sentence ("a dental implant")
// contentKey = key in data/procedure-content.js (null where no text exists)
// noHowTo = drug or infusion therapy: pages leave out step-by-step and dosing text
// basis = what the price covers, taken from the "included" and "caveats" fields of the data
export const PROCEDURES = {
  'Testosterone Replacement Therapy (TRT)': { slug: 'testosterone-replacement-therapy', name: 'Testosterone Replacement Therapy (TRT)', short: 'TRT', phrase: 'testosterone replacement therapy (TRT)', category: 'mens-health', contentKey: 'Testosterone Replacement Therapy', noHowTo: true, basis: 'per month of treatment and monitoring' },
  'Hair Transplant (3000 grafts)': { slug: 'hair-transplant', name: 'Hair Transplant', short: 'Hair transplant', phrase: 'a hair transplant', category: 'mens-health', contentKey: 'Hair Transplant', basis: 'for about 3,000 grafts', unsure: 'Placed in Men\'s Health because most patients are men. It is surgical, so it could also sit in Cosmetic Surgery, or in Beauty under "hair".' },

  'NAD+ IV Injection': { slug: 'nad-iv-injection', name: 'NAD+ IV Injection', short: 'NAD+ IV', phrase: 'a NAD+ IV injection', category: 'anti-aging-longevity', contentKey: 'NAD+ IV Injection', noHowTo: true },
  'Hyperbaric Oxygen Therapy (HBOT)': { slug: 'hyperbaric-oxygen-therapy', name: 'Hyperbaric Oxygen Therapy (HBOT)', short: 'HBOT', phrase: 'hyperbaric oxygen therapy (HBOT)', category: 'anti-aging-longevity', contentKey: 'Hyperbaric Oxygen Therapy' },
  'Ozone Therapy': { slug: 'ozone-therapy', name: 'Ozone Therapy', short: 'Ozone therapy', phrase: 'ozone therapy', category: 'anti-aging-longevity', contentKey: 'Ozone Therapy', noHowTo: true },
  'Plasma Exchange (TPE) Therapy': { slug: 'plasma-exchange-therapy', name: 'Plasma Exchange (TPE) Therapy', short: 'Plasma exchange', phrase: 'plasma exchange (TPE) therapy', category: 'anti-aging-longevity', contentKey: 'Plasma Exchange Therapy', noHowTo: true, unsure: 'Placed in Anti-Aging & Longevity because the data describes it as a longevity therapy. It is also a hospital treatment for autoimmune conditions, and may belong in Restricted at Home.' },
  'Advanced Health Screening': { slug: 'advanced-health-screening', name: 'Advanced Health Screening', short: 'Health screening', phrase: 'an advanced health screening', category: 'anti-aging-longevity', contentKey: 'Advanced Health Screening', unsure: 'A diagnostic service rather than a therapy. Placed in Anti-Aging & Longevity because longevity clinics sell it; it could also sit in Medical & Surgical.' },
  'Biochip Implantation': { slug: 'biochip-implantation', name: 'Biochip Implantation', short: 'Biochip implant', phrase: 'biochip implantation', category: 'anti-aging-longevity', contentKey: 'Biochip Implantation', unsure: 'A biohacking procedure that fits none of the seven sections well. Placed in Anti-Aging & Longevity as the closest match.' },

  'Peptide Therapy': { slug: 'peptide-therapy', name: 'Peptide Therapy', short: 'Peptide therapy', phrase: 'peptide therapy', category: 'peptides', contentKey: 'Peptide Therapy', noHowTo: true },

  'Stem Cell Therapy': { slug: 'stem-cell-therapy', name: 'Stem Cell Therapy', short: 'Stem cell therapy', phrase: 'stem cell therapy', category: 'restricted-at-home', contentKey: 'Stem Cell Therapy', noHowTo: true, unsure: 'Placed in Restricted at Home because rows in the data mention regulation (for example "COFEPRIS regulation varies by clinic"). The repo holds no legal status per country, so please confirm.' },
  'Exosome Therapy': { slug: 'exosome-therapy', name: 'Exosome Therapy', short: 'Exosome therapy', phrase: 'exosome therapy', category: 'restricted-at-home', contentKey: 'Exosome Therapy', noHowTo: true, unsure: 'Placed in Restricted at Home because the data mentions regulatory oversight and the procedure text calls it experimental. The price rows describe skin and hair uses, so it could sit in Beauty instead.' },
  'Human Growth Hormone (HGH)': { slug: 'human-growth-hormone', name: 'Human Growth Hormone (HGH)', short: 'HGH', phrase: 'human growth hormone (HGH) therapy', category: 'restricted-at-home', contentKey: 'Human Growth Hormone', noHowTo: true, basis: 'per month of supply and monitoring', unsure: 'Placed in Restricted at Home because every row says "Prescription required" and "legal restrictions vary". It could also sit in Men\'s Health or Anti-Aging & Longevity.' },

  'Botox': { slug: 'botox', name: 'Botox', short: 'Botox', phrase: 'Botox', category: 'beauty', contentKey: 'Botox', basis: 'per treatment area' },
  'PRP Therapy': { slug: 'prp-therapy', name: 'PRP Therapy', short: 'PRP', phrase: 'PRP therapy', category: 'beauty', contentKey: 'PRP Therapy', basis: 'per session', unsure: 'Placed in Beauty because the data lists it for facial rejuvenation and hair loss. It is also used for joints, so it could sit in Anti-Aging & Longevity.' },

  'Facelift': { slug: 'facelift', name: 'Facelift', short: 'Facelift', phrase: 'a facelift', category: 'cosmetic-surgery', contentKey: 'Facelift' },
  'Rhinoplasty': { slug: 'rhinoplasty', name: 'Rhinoplasty', short: 'Rhinoplasty', phrase: 'rhinoplasty', category: 'cosmetic-surgery', contentKey: 'Rhinoplasty' },
  'Breast Augmentation': { slug: 'breast-augmentation', name: 'Breast Augmentation', short: 'Breast augmentation', phrase: 'breast augmentation', category: 'cosmetic-surgery', contentKey: 'Breast Augmentation' },
  'Brazilian Butt Lift (BBL)': { slug: 'brazilian-butt-lift', name: 'Brazilian Butt Lift (BBL)', short: 'BBL', phrase: 'a Brazilian butt lift (BBL)', category: 'cosmetic-surgery', contentKey: 'Brazilian Butt Lift' },
  'Liposuction': { slug: 'liposuction', name: 'Liposuction', short: 'Liposuction', phrase: 'liposuction', category: 'cosmetic-surgery', contentKey: 'Liposuction' },
  'Tummy Tuck': { slug: 'tummy-tuck', name: 'Tummy Tuck', short: 'Tummy tuck', phrase: 'a tummy tuck', category: 'cosmetic-surgery', contentKey: 'Tummy Tuck' },
  'Limb Lengthening Surgery': { slug: 'limb-lengthening-surgery', name: 'Limb Lengthening Surgery', short: 'Limb lengthening', phrase: 'limb lengthening surgery', category: 'cosmetic-surgery', contentKey: 'Limb Lengthening Surgery', unsure: 'Placed in Cosmetic Surgery because it is mostly sought for height. It is orthopedic surgery, so it could sit in Medical & Surgical.' },

  'Dental Implant': { slug: 'dental-implant', name: 'Dental Implant', short: 'Dental implant', phrase: 'a dental implant', category: 'dental', contentKey: 'Dental Implant', basis: 'for a single implant' },
  'Dental Veneers (Full Mouth)': { slug: 'dental-veneers-full-mouth', name: 'Dental Veneers (Full Mouth)', short: 'Veneers, full mouth', phrase: 'a full mouth of dental veneers', category: 'dental', contentKey: 'Dental Veneers', basis: 'for a full set' },
  'Dental Veneers': { slug: 'dental-veneers', name: 'Dental Veneers (Per Tooth)', short: 'Veneers, per tooth', phrase: 'a dental veneer', category: 'dental', contentKey: 'Dental Veneers', basis: 'per tooth' },
  'Clear Aligners': { slug: 'clear-aligners', name: 'Clear Aligners', short: 'Clear aligners', phrase: 'clear aligners', category: 'dental', contentKey: null, unsure: 'The old site listed this under Beauty. Moved to Dental now that a Dental section exists.' },

  'Gastric Bypass': { slug: 'gastric-bypass', name: 'Gastric Bypass', short: 'Gastric bypass', phrase: 'gastric bypass surgery', category: 'medical', contentKey: 'Gastric Bypass', unsure: 'Weight-loss surgery fits none of the seven sections.' },
  'Colonoscopy': { slug: 'colonoscopy', name: 'Colonoscopy', short: 'Colonoscopy', phrase: 'a colonoscopy', category: 'medical', contentKey: 'Colonoscopy', unsure: 'A diagnostic procedure that fits none of the seven sections.' },
  'IVF (Fertility Treatment)': { slug: 'ivf', name: 'IVF (Fertility Treatment)', short: 'IVF', phrase: 'IVF', category: 'medical', contentKey: 'IVF', basis: 'per cycle', unsure: 'Fertility treatment fits none of the seven sections.' },
  'Hip Replacement': { slug: 'hip-replacement', name: 'Hip Replacement', short: 'Hip replacement', phrase: 'a hip replacement', category: 'medical', contentKey: 'Hip Replacement', unsure: 'Orthopedic surgery fits none of the seven sections.' },
  'Knee Replacement': { slug: 'knee-replacement', name: 'Knee Replacement', short: 'Knee replacement', phrase: 'a knee replacement', category: 'medical', contentKey: 'Knee Replacement', unsure: 'Orthopedic surgery fits none of the seven sections.' },
  'LASIK': { slug: 'lasik', name: 'LASIK', short: 'LASIK', phrase: 'LASIK', category: 'medical', contentKey: 'LASIK', unsure: 'Eye surgery fits none of the seven sections.' },
  'Gender Reassignment Surgery': { slug: 'gender-reassignment-surgery', name: 'Gender Reassignment Surgery', short: 'Gender reassignment', phrase: 'gender reassignment surgery', category: 'medical', contentKey: 'Gender Reassignment Surgery', unsure: 'Fits none of the seven sections. It is not cosmetic surgery, so it was not placed there.' },
};

// Country names as they should read, keyed by every spelling found in the data.
export const COUNTRY_ALIASES = { 'UK': 'United Kingdom', 'USA': 'United States', 'Czech Rep.': 'Czech Republic', 'UAE': 'United Arab Emirates' };
export const CITY_ALIASES = { 'Bogota': 'Bogotá', 'New York': 'New York City' };

// iso2, ISO numeric id (matches the map shapes), home currency, and whether the name takes "the".
export const COUNTRIES = {
  'Argentina': ['AR', '032', 'ARS'], 'Australia': ['AU', '036', 'AUD'], 'Austria': ['AT', '040', 'EUR'],
  'Belgium': ['BE', '056', 'EUR'], 'Brazil': ['BR', '076', 'BRL'], 'Bulgaria': ['BG', '100', 'EUR'],
  'Canada': ['CA', '124', 'CAD'], 'China': ['CN', '156', 'CNY'], 'Colombia': ['CO', '170', 'COP'],
  'Costa Rica': ['CR', '188', 'CRC'], 'Croatia': ['HR', '191', 'EUR'], 'Czech Republic': ['CZ', '203', 'CZK', true],
  'Denmark': ['DK', '208', 'DKK'], 'Egypt': ['EG', '818', 'EGP'], 'Estonia': ['EE', '233', 'EUR'],
  'Finland': ['FI', '246', 'EUR'], 'France': ['FR', '250', 'EUR'], 'Germany': ['DE', '276', 'EUR'],
  'Greece': ['GR', '300', 'EUR'], 'Hungary': ['HU', '348', 'HUF'], 'India': ['IN', '356', 'INR'],
  'Indonesia': ['ID', '360', 'IDR'], 'Ireland': ['IE', '372', 'EUR'], 'Israel': ['IL', '376', 'ILS'],
  'Italy': ['IT', '380', 'EUR'], 'Japan': ['JP', '392', 'JPY'], 'Kazakhstan': ['KZ', '398', 'KZT'],
  'Latvia': ['LV', '428', 'EUR'], 'Lithuania': ['LT', '440', 'EUR'], 'Luxembourg': ['LU', '442', 'EUR'],
  'Malaysia': ['MY', '458', 'MYR'], 'Mexico': ['MX', '484', 'MXN'], 'Netherlands': ['NL', '528', 'EUR', true],
  'Norway': ['NO', '578', 'NOK'], 'Philippines': ['PH', '608', 'PHP', true], 'Poland': ['PL', '616', 'PLN'],
  'Portugal': ['PT', '620', 'EUR'], 'Romania': ['RO', '642', 'RON'], 'Russia': ['RU', '643', 'RUB'],
  'Serbia': ['RS', '688', 'RSD'], 'Singapore': ['SG', '702', 'SGD'], 'Slovakia': ['SK', '703', 'EUR'],
  'Slovenia': ['SI', '705', 'EUR'], 'South Africa': ['ZA', '710', 'ZAR'], 'South Korea': ['KR', '410', 'KRW'],
  'Spain': ['ES', '724', 'EUR'], 'Sweden': ['SE', '752', 'SEK'], 'Switzerland': ['CH', '756', 'CHF'],
  'Taiwan': ['TW', '158', 'TWD'], 'Thailand': ['TH', '764', 'THB'], 'Turkey': ['TR', '792', 'TRY'],
  'United Arab Emirates': ['AE', '784', 'AED', true], 'United Kingdom': ['GB', '826', 'GBP', true],
  'United States': ['US', '840', 'USD', true], 'Vietnam': ['VN', '704', 'VND'],
};

// Reference countries shown in "compared with" tables (the main home markets in the data).
export const REFERENCE_COUNTRIES = ['united-states', 'united-kingdom', 'canada', 'australia', 'germany'];

// Country pairs that get a /compare page. There is no traffic data in the repo, so this is an
// editorial list of well-known travel routes: home market first, destination second.
export const COMPARE_PAIRS = [
  ['united-states', 'mexico'], ['united-states', 'turkey'], ['united-states', 'thailand'],
  ['united-states', 'colombia'], ['united-states', 'costa-rica'], ['united-states', 'south-korea'],
  ['united-states', 'india'],
  ['united-kingdom', 'turkey'], ['united-kingdom', 'hungary'], ['united-kingdom', 'poland'],
  ['united-kingdom', 'thailand'],
  ['canada', 'mexico'], ['australia', 'thailand'], ['australia', 'malaysia'],
  ['germany', 'turkey'], ['germany', 'poland'],
];
