/* =========================
   URL PARAMETER
========================= */
const urlParams = new URLSearchParams(window.location.search);
const PROCEDURE_NAME = urlParams.get('procedure');

/* =========================
   PROCEDURE CATEGORIES (mirrors app.js)
========================= */
const PROCEDURE_CATEGORIES = {
  "Beauty": ["Botox", "Facelift", "Rhinoplasty", "Hair Transplant", "Dental Veneers"],
  "Body": ["Breast Augmentation", "Brazilian Butt Lift", "Liposuction", "Tummy Tuck", "Gastric Bypass", "Limb Lengthening Surgery", "Gender Reassignment Surgery"],
  "Medical": ["LASIK", "Dental Implant", "Knee Replacement", "Hip Replacement", "Colonoscopy", "IVF"],
  "Biohacking": ["Stem Cell Therapy", "Exosome Therapy", "PRP Therapy", "Plasma Exchange Therapy", "NAD+ IV Injection", "Peptide Therapy", "Ozone Therapy", "Hyperbaric Oxygen Therapy", "Biochip Implantation", "Advanced Health Screening", "Testosterone Replacement Therapy", "Human Growth Hormone"]
};

const procedureIcons = {
  "Botox": "\ud83d\udc89", "Facelift": "\u2728", "Rhinoplasty": "\ud83d\udc43",
  "Hair Transplant": "\ud83d\udc87", "Dental Veneers": "\ud83d\ude01",
  "Breast Augmentation": "\ud83c\udf52", "Brazilian Butt Lift": "\ud83c\udf51",
  "Liposuction": "\ud83d\udcaa", "Tummy Tuck": "\ud83e\uddcd", "Gastric Bypass": "\u2696\ufe0f",
  "Limb Lengthening Surgery": "\ud83e\uddb4", "Gender Reassignment Surgery": "\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f",
  "LASIK": "\ud83d\udc41\ufe0f", "Dental Implant": "\ud83e\uddb7", "Knee Replacement": "\ud83e\uddb5",
  "Hip Replacement": "\ud83e\uddb4", "Colonoscopy": "\ud83c\udfe5", "IVF": "\ud83d\udc76",
  "Stem Cell Therapy": "\ud83e\uddec", "Exosome Therapy": "\ud83e\uddeb",
  "PRP Therapy": "\ud83e\ude78", "Plasma Exchange Therapy": "\ud83e\ude78",
  "NAD+ IV Injection": "\u26a1", "Peptide Therapy": "\ud83e\uddea",
  "Ozone Therapy": "\ud83c\udf2c\ufe0f", "Hyperbaric Oxygen Therapy": "\ud83e\udec1",
  "Biochip Implantation": "\ud83e\udde0", "Advanced Health Screening": "\ud83d\udcca",
  "Testosterone Replacement Therapy": "\ud83d\udcaa", "Human Growth Hormone": "\ud83c\udf31"
};

function getIcon(name) {
  return procedureIcons[name] || '\u2728';
}

/* =========================
   PROCEDURE DESCRIPTIONS
========================= */
const procedureDescriptions = {
  "Botox": "Botox is an injectable treatment that temporarily relaxes facial muscles to reduce fine lines and wrinkles. It's the world's most popular non-surgical cosmetic procedure, with treatments typically lasting 3\u20136 months.",
  "Facelift": "A facelift (rhytidectomy) is a surgical procedure that tightens sagging skin and repositions underlying tissue to create a more youthful facial appearance. Results typically last 7\u201310 years.",
  "Rhinoplasty": "Rhinoplasty (nose reshaping) is a surgical procedure that alters the shape, size, or proportions of the nose for cosmetic or functional reasons, such as improving breathing.",
  "Hair Transplant": "Hair transplant surgery moves hair follicles from a donor area (usually the back of the head) to thinning or balding areas. Modern FUE and DHI techniques leave minimal scarring.",
  "Dental Veneers": "Dental veneers are thin, custom-made shells bonded to the front of teeth to improve their appearance. They can fix chips, stains, gaps, and minor misalignment for a brighter smile.",
  "Breast Augmentation": "Breast augmentation uses implants or fat transfer to increase breast size, restore volume, or improve symmetry. It\u2019s one of the most commonly performed cosmetic surgeries worldwide.",
  "Brazilian Butt Lift": "A Brazilian Butt Lift (BBL) uses fat transfer from other body areas to enhance the shape and volume of the buttocks, creating a more contoured silhouette.",
  "Liposuction": "Liposuction is a body contouring procedure that removes stubborn fat deposits from targeted areas like the abdomen, thighs, and arms using suction techniques.",
  "Tummy Tuck": "A tummy tuck (abdominoplasty) removes excess skin and fat from the abdomen while tightening the underlying muscles, often sought after significant weight loss or pregnancy.",
  "Gastric Bypass": "Gastric bypass surgery reduces the stomach size and reroutes the digestive system to aid significant, long-term weight loss for patients with obesity-related health conditions.",
  "Limb Lengthening Surgery": "Limb lengthening surgery uses gradual bone distraction to increase height or correct leg length discrepancies. The process typically takes several months with careful rehabilitation.",
  "Gender Reassignment Surgery": "Gender reassignment surgery encompasses a range of procedures to align physical characteristics with gender identity. It requires thorough evaluation and a multidisciplinary care team.",
  "LASIK": "LASIK is a refractive eye surgery that reshapes the cornea using a laser to correct nearsightedness, farsightedness, and astigmatism, often eliminating the need for glasses or contacts.",
  "Dental Implant": "Dental implants are titanium posts surgically placed into the jawbone to serve as artificial tooth roots. They provide a permanent, natural-looking replacement for missing teeth.",
  "Knee Replacement": "Knee replacement surgery replaces a damaged knee joint with an artificial implant to relieve pain and restore mobility, most commonly needed due to arthritis or injury.",
  "Hip Replacement": "Hip replacement surgery replaces a worn or damaged hip joint with a prosthetic implant, significantly reducing pain and improving mobility for patients with severe hip conditions.",
  "Colonoscopy": "A colonoscopy is a diagnostic procedure that uses a flexible camera to examine the inside of the colon. It\u2019s the gold standard for colorectal cancer screening.",
  "IVF": "In vitro fertilization (IVF) is an assisted reproductive technology where eggs are fertilized outside the body and transferred to the uterus, offering hope to those experiencing infertility.",
  "Stem Cell Therapy": "Stem cell therapy uses the body\u2019s own regenerative cells to repair damaged tissues and reduce inflammation. It\u2019s used for joint pain, autoimmune conditions, and anti-aging.",
  "Exosome Therapy": "Exosome therapy delivers cell-derived signaling vesicles to promote tissue repair, reduce inflammation, and support regeneration at the cellular level.",
  "PRP Therapy": "Platelet-Rich Plasma (PRP) therapy uses concentrated platelets from your own blood to accelerate healing in joints, tendons, skin, and hair restoration.",
  "Plasma Exchange Therapy": "Plasma exchange (plasmapheresis) filters and replaces blood plasma to remove harmful antibodies. It\u2019s explored both for autoimmune conditions and longevity protocols.",
  "NAD+ IV Injection": "NAD+ IV therapy delivers nicotinamide adenine dinucleotide directly into the bloodstream to boost cellular energy, support brain function, and slow aging at the molecular level.",
  "Peptide Therapy": "Peptide therapy uses short chains of amino acids to target specific biological functions such as growth hormone release, immune regulation, tissue repair, and fat metabolism.",
  "Ozone Therapy": "Ozone therapy introduces medical-grade ozone to the body to boost oxygen utilization, stimulate the immune system, and support detoxification.",
  "Hyperbaric Oxygen Therapy": "Hyperbaric Oxygen Therapy (HBOT) involves breathing pure oxygen in a pressurized chamber to accelerate healing, reduce inflammation, and enhance recovery.",
  "Biochip Implantation": "Biochip implantation places a small electronic device under the skin to monitor health metrics like glucose, temperature, or hormone levels in real time.",
  "Advanced Health Screening": "Advanced health screening provides comprehensive diagnostics including full-body MRI, blood biomarkers, genetic testing, and AI-driven risk analysis for early disease detection.",
  "Testosterone Replacement Therapy": "Testosterone Replacement Therapy (TRT) restores optimal testosterone levels in men experiencing fatigue, low libido, or muscle loss due to hormonal decline.",
  "Human Growth Hormone": "Human Growth Hormone (HGH) therapy supplements declining growth hormone levels to support muscle mass, bone density, energy, and recovery in aging adults."
};

/* =========================
   CURRENCY CONVERSION
========================= */
const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1, name: 'USD' },
  GBP: { symbol: '\u00a3', rate: 0.79, name: 'GBP' },
  EUR: { symbol: '\u20ac', rate: 0.92, name: 'EUR' },
  JPY: { symbol: '\u00a5', rate: 149, name: 'JPY' },
  AUD: { symbol: 'A$', rate: 1.52, name: 'AUD' },
  CAD: { symbol: 'C$', rate: 1.39, name: 'CAD' },
  CHF: { symbol: 'CHF', rate: 0.88, name: 'CHF' },
  CNY: { symbol: '\u00a5', rate: 7.24, name: 'CNY' },
  INR: { symbol: '\u20b9', rate: 83.12, name: 'INR' },
  MXN: { symbol: 'MX$', rate: 17.05, name: 'MXN' },
  SGD: { symbol: 'S$', rate: 1.34, name: 'SGD' },
  KRW: { symbol: '\u20a9', rate: 1320, name: 'KRW' },
  THB: { symbol: '\u0e3f', rate: 35.40, name: 'THB' },
  TRY: { symbol: '\u20ba', rate: 32.50, name: 'TRY' },
  BRL: { symbol: 'R$', rate: 4.97, name: 'BRL' },
  ZAR: { symbol: 'R', rate: 18.85, name: 'ZAR' }
};

let currentCurrency = localStorage.getItem('preferredCurrency') || 'USD';

function convertPrice(usdPrice) {
  if (!Number.isFinite(usdPrice)) return null;
  return Math.round(usdPrice * CURRENCY_RATES[currentCurrency].rate);
}

function formatPrice(usdPrice) {
  const converted = convertPrice(usdPrice);
  if (converted === null) return 'N/A';
  const symbol = CURRENCY_RATES[currentCurrency].symbol;
  return `${symbol}${converted.toLocaleString()}`;
}

function setCurrency(currency) {
  if (!CURRENCY_RATES[currency]) return;
  currentCurrency = currency;
  localStorage.setItem('preferredCurrency', currency);
  const currencyDropdown = document.getElementById('currencyDropdown');
  if (currencyDropdown) currencyDropdown.value = currency;
  const menuOverlay = document.getElementById('menuOverlay');
  if (menuOverlay) { menuOverlay.classList.remove('active'); document.body.style.overflow = ''; }
  if (allData.length > 0 && PROCEDURE_NAME) renderAll();
}

/* =========================
   COUNTRY FLAGS
========================= */
const countryFlags = {
  "Argentina": "\ud83c\udde6\ud83c\uddf7", "Australia": "\ud83c\udde6\ud83c\uddfa", "Austria": "\ud83c\udde6\ud83c\uddf9", "Belgium": "\ud83c\udde7\ud83c\uddea",
  "Brazil": "\ud83c\udde7\ud83c\uddf7", "Bulgaria": "\ud83c\udde7\ud83c\uddec", "Canada": "\ud83c\udde8\ud83c\udde6", "China": "\ud83c\udde8\ud83c\uddf3",
  "Colombia": "\ud83c\udde8\ud83c\uddf4", "Costa Rica": "\ud83c\udde8\ud83c\uddf7", "Croatia": "\ud83c\udded\ud83c\uddf7", "Cyprus": "\ud83c\udde8\ud83c\uddfe",
  "Czech Rep.": "\ud83c\udde8\ud83c\uddff", "Denmark": "\ud83c\udde9\ud83c\uddf0", "Egypt": "\ud83c\uddea\ud83c\uddec", "Estonia": "\ud83c\uddea\ud83c\uddea",
  "Finland": "\ud83c\uddeb\ud83c\uddee", "France": "\ud83c\uddeb\ud83c\uddf7", "Germany": "\ud83c\udde9\ud83c\uddea", "Greece": "\ud83c\uddec\ud83c\uddf7",
  "Hungary": "\ud83c\udded\ud83c\uddfa", "India": "\ud83c\uddee\ud83c\uddf3", "Indonesia": "\ud83c\uddee\ud83c\udde9", "Ireland": "\ud83c\uddee\ud83c\uddea",
  "Israel": "\ud83c\uddee\ud83c\uddf1", "Italy": "\ud83c\uddee\ud83c\uddf9", "Japan": "\ud83c\uddef\ud83c\uddf5", "Kazakhstan": "\ud83c\uddf0\ud83c\uddff",
  "Latvia": "\ud83c\uddf1\ud83c\uddfb", "Lithuania": "\ud83c\uddf1\ud83c\uddf9", "Luxembourg": "\ud83c\uddf1\ud83c\uddfa", "Malaysia": "\ud83c\uddf2\ud83c\uddfe",
  "Mexico": "\ud83c\uddf2\ud83c\uddfd", "Netherlands": "\ud83c\uddf3\ud83c\uddf1", "Norway": "\ud83c\uddf3\ud83c\uddf4", "Philippines": "\ud83c\uddf5\ud83c\udded",
  "Poland": "\ud83c\uddf5\ud83c\uddf1", "Portugal": "\ud83c\uddf5\ud83c\uddf9", "Romania": "\ud83c\uddf7\ud83c\uddf4", "Russia": "\ud83c\uddf7\ud83c\uddfa",
  "Singapore": "\ud83c\uddf8\ud83c\uddec", "Slovakia": "\ud83c\uddf8\ud83c\uddf0", "Slovenia": "\ud83c\uddf8\ud83c\uddee",
  "South Africa": "\ud83c\uddff\ud83c\udde6", "South Korea": "\ud83c\uddf0\ud83c\uddf7",
  "Spain": "\ud83c\uddea\ud83c\uddf8", "Sweden": "\ud83c\uddf8\ud83c\uddea", "Switzerland": "\ud83c\udde8\ud83c\udded", "Taiwan": "\ud83c\uddf9\ud83c\uddfc",
  "Thailand": "\ud83c\uddf9\ud83c\udded", "Turkey": "\ud83c\uddf9\ud83c\uddf7", "UAE": "\ud83c\udde6\ud83c\uddea", "UK": "\ud83c\uddec\ud83c\udde7",
  "USA": "\ud83c\uddfa\ud83c\uddf8", "United States": "\ud83c\uddfa\ud83c\uddf8", "Vietnam": "\ud83c\uddfb\ud83c\uddf3",
  "Serbia": "\ud83c\uddf7\ud83c\uddf8", "Czech Republic": "\ud83c\udde8\ud83c\uddff", "United Kingdom": "\ud83c\uddec\ud83c\udde7"
};

/* =========================
   CONTINENT / REGION DATA
========================= */
const CONTINENT_ORDER = ["North America", "Europe", "Asia", "South America", "Africa", "Oceania"];

const COUNTRY_CONTINENT = {
  "USA": "North America", "Canada": "North America", "Mexico": "North America", "Costa Rica": "North America",
  "UK": "Europe", "France": "Europe", "Germany": "Europe", "Italy": "Europe", "Spain": "Europe",
  "Portugal": "Europe", "Netherlands": "Europe", "Belgium": "Europe", "Switzerland": "Europe",
  "Austria": "Europe", "Denmark": "Europe", "Sweden": "Europe", "Norway": "Europe", "Finland": "Europe",
  "Ireland": "Europe", "Greece": "Europe", "Poland": "Europe", "Czech Rep.": "Europe", "Czech Republic": "Europe",
  "Hungary": "Europe", "Romania": "Europe", "Bulgaria": "Europe", "Croatia": "Europe",
  "Slovenia": "Europe", "Slovakia": "Europe", "Estonia": "Europe", "Latvia": "Europe",
  "Lithuania": "Europe", "Luxembourg": "Europe", "Serbia": "Europe", "Cyprus": "Europe",
  "Turkey": "Europe", "Russia": "Europe", "United Kingdom": "Europe", "United States": "North America",
  "Thailand": "Asia", "Japan": "Asia", "South Korea": "Asia", "India": "Asia",
  "Indonesia": "Asia", "Philippines": "Asia", "Malaysia": "Asia", "Singapore": "Asia",
  "Vietnam": "Asia", "China": "Asia", "Taiwan": "Asia", "UAE": "Asia", "Israel": "Asia", "Kazakhstan": "Asia",
  "Argentina": "South America", "Brazil": "South America", "Colombia": "South America",
  "Egypt": "Africa", "South Africa": "Africa",
  "Australia": "Oceania"
};

/* =========================
   FLIGHT + HOTEL DATA
========================= */
const CITY_REGION = {
  'New York City': 'NA_E', 'Miami': 'NA_E', 'Philadelphia': 'NA_E', 'Jacksonville': 'NA_E',
  'Chicago': 'NA_S', 'Dallas': 'NA_S', 'Houston': 'NA_S', 'San Antonio': 'NA_S', 'Austin': 'NA_S',
  'Los Angeles': 'NA_W', 'San Diego': 'NA_W', 'San Jose': 'NA_W', 'Phoenix': 'NA_W',
  'Toronto': 'NA_E', 'Calgary': 'NA_W', 'Vancouver': 'NA_W',
  'Mexico City': 'LATAM_MX', 'Tijuana': 'LATAM_MX', 'Cancun': 'LATAM_MX',
  'Buenos Aires': 'LATAM_S', 'Rio de Janeiro': 'LATAM_S', 'Bogot\u00e1': 'LATAM_S', 'Medell\u00edn': 'LATAM_S',
  'London': 'EU_W', 'Paris': 'EU_W', 'Amsterdam': 'EU_W', 'Brussels': 'EU_W', 'Dublin': 'EU_W', 'Luxembourg': 'EU_W',
  'Berlin': 'EU_C', 'Vienna': 'EU_C', 'Zurich': 'EU_C', 'Prague': 'EU_C', 'Warsaw': 'EU_C', 'Budapest': 'EU_C', 'Bratislava': 'EU_C', 'Zagreb': 'EU_C', 'Ljubljana': 'EU_C',
  'Rome': 'EU_S', 'Madrid': 'EU_S', 'Barcelona': 'EU_S', 'Lisbon': 'EU_S', 'Athens': 'EU_S',
  'Stockholm': 'EU_N', 'Copenhagen': 'EU_N', 'Oslo': 'EU_N', 'Helsinki': 'EU_N', 'Tallinn': 'EU_N', 'Riga': 'EU_N', 'Vilnius': 'EU_N',
  'Moscow': 'EU_E', 'Bucharest': 'EU_E', 'Sofia': 'EU_E',
  'Istanbul': 'TR', 'Bodrum': 'TR',
  'Dubai': 'ME', 'Tel Aviv': 'ME', 'Cairo': 'ME',
  'Delhi': 'SA', 'Mumbai': 'SA',
  'Bangkok': 'SEA', 'Singapore': 'SEA', 'Kuala Lumpur': 'SEA', 'Ho Chi Minh City': 'SEA', 'Bali': 'SEA', 'Jakarta': 'SEA', 'Manila': 'SEA',
  'Seoul': 'EA', 'Tokyo': 'EA', 'Beijing': 'EA', 'Shanghai': 'EA', 'Hong Kong': 'EA', 'Taipei': 'EA',
  'Almaty': 'CA',
  'Sydney': 'OC', 'Melbourne': 'OC',
  'Cape Town': 'AF'
};

const REGION_FLIGHT = {
  'NA_E-NA_E': 200, 'NA_S-NA_S': 150, 'NA_W-NA_W': 100, 'EU_W-EU_W': 150, 'EU_C-EU_C': 120, 'EU_S-EU_S': 150, 'EU_N-EU_N': 150, 'EU_E-EU_E': 200, 'SEA-SEA': 150, 'EA-EA': 200, 'LATAM_MX-LATAM_MX': 150, 'LATAM_S-LATAM_S': 250, 'TR-TR': 100, 'ME-ME': 200, 'SA-SA': 150, 'OC-OC': 200, 'CA-CA': 150, 'AF-AF': 200,
  'NA_E-NA_S': 200, 'NA_E-NA_W': 350, 'NA_E-LATAM_MX': 350, 'NA_E-LATAM_S': 700, 'NA_E-EU_W': 600, 'NA_E-EU_C': 650, 'NA_E-EU_S': 650, 'NA_E-EU_N': 700, 'NA_E-EU_E': 750, 'NA_E-TR': 700, 'NA_E-ME': 800, 'NA_E-SA': 950, 'NA_E-SEA': 900, 'NA_E-EA': 950, 'NA_E-CA': 900, 'NA_E-OC': 1200, 'NA_E-AF': 1000,
  'NA_S-NA_W': 200, 'NA_S-LATAM_MX': 250, 'NA_S-LATAM_S': 650, 'NA_S-EU_W': 700, 'NA_S-EU_C': 750, 'NA_S-EU_S': 700, 'NA_S-EU_N': 800, 'NA_S-EU_E': 800, 'NA_S-TR': 800, 'NA_S-ME': 850, 'NA_S-SA': 1000, 'NA_S-SEA': 950, 'NA_S-EA': 950, 'NA_S-CA': 950, 'NA_S-OC': 1200, 'NA_S-AF': 1050,
  'NA_W-LATAM_MX': 250, 'NA_W-LATAM_S': 750, 'NA_W-EU_W': 750, 'NA_W-EU_C': 800, 'NA_W-EU_S': 800, 'NA_W-EU_N': 850, 'NA_W-EU_E': 850, 'NA_W-TR': 900, 'NA_W-ME': 950, 'NA_W-SA': 1000, 'NA_W-SEA': 800, 'NA_W-EA': 750, 'NA_W-CA': 900, 'NA_W-OC': 1000, 'NA_W-AF': 1100,
  'LATAM_MX-LATAM_S': 500, 'LATAM_MX-EU_W': 700, 'LATAM_MX-EU_C': 750, 'LATAM_MX-EU_S': 700, 'LATAM_MX-EU_N': 800, 'LATAM_MX-EU_E': 850, 'LATAM_MX-TR': 900, 'LATAM_MX-ME': 1000, 'LATAM_MX-SA': 1100, 'LATAM_MX-SEA': 1050, 'LATAM_MX-EA': 1000, 'LATAM_MX-CA': 1050, 'LATAM_MX-OC': 1200, 'LATAM_MX-AF': 1100,
  'LATAM_S-EU_W': 800, 'LATAM_S-EU_C': 850, 'LATAM_S-EU_S': 800, 'LATAM_S-EU_N': 900, 'LATAM_S-EU_E': 950, 'LATAM_S-TR': 950, 'LATAM_S-ME': 1050, 'LATAM_S-SA': 1100, 'LATAM_S-SEA': 1100, 'LATAM_S-EA': 1150, 'LATAM_S-CA': 1100, 'LATAM_S-OC': 1300, 'LATAM_S-AF': 1000,
  'EU_W-EU_C': 150, 'EU_W-EU_S': 150, 'EU_W-EU_N': 200, 'EU_W-EU_E': 250, 'EU_W-TR': 250, 'EU_W-ME': 450, 'EU_W-SA': 550, 'EU_W-SEA': 650, 'EU_W-EA': 750, 'EU_W-CA': 500, 'EU_W-OC': 1100, 'EU_W-AF': 700,
  'EU_C-EU_S': 150, 'EU_C-EU_N': 150, 'EU_C-EU_E': 200, 'EU_C-TR': 200, 'EU_C-ME': 400, 'EU_C-SA': 500, 'EU_C-SEA': 600, 'EU_C-EA': 700, 'EU_C-CA': 450, 'EU_C-OC': 1050, 'EU_C-AF': 650,
  'EU_S-EU_N': 250, 'EU_S-EU_E': 200, 'EU_S-TR': 200, 'EU_S-ME': 400, 'EU_S-SA': 500, 'EU_S-SEA': 650, 'EU_S-EA': 750, 'EU_S-CA': 500, 'EU_S-OC': 1100, 'EU_S-AF': 600,
  'EU_N-EU_E': 200, 'EU_N-TR': 300, 'EU_N-ME': 500, 'EU_N-SA': 600, 'EU_N-SEA': 700, 'EU_N-EA': 750, 'EU_N-CA': 500, 'EU_N-OC': 1100, 'EU_N-AF': 750,
  'EU_E-TR': 200, 'EU_E-ME': 400, 'EU_E-SA': 500, 'EU_E-SEA': 650, 'EU_E-EA': 700, 'EU_E-CA': 350, 'EU_E-OC': 1100, 'EU_E-AF': 700,
  'TR-ME': 250, 'TR-SA': 450, 'TR-SEA': 650, 'TR-EA': 800, 'TR-CA': 400, 'TR-OC': 1050, 'TR-AF': 600,
  'ME-SA': 300, 'ME-SEA': 500, 'ME-EA': 700, 'ME-CA': 400, 'ME-OC': 900, 'ME-AF': 550,
  'SA-SEA': 300, 'SA-EA': 550, 'SA-CA': 350, 'SA-OC': 800, 'SA-AF': 700,
  'SEA-EA': 350, 'SEA-CA': 500, 'SEA-OC': 450, 'SEA-AF': 850,
  'EA-CA': 500, 'EA-OC': 650, 'EA-AF': 1000,
  'CA-OC': 900, 'CA-AF': 750,
  'OC-AF': 1100
};

function getFlightCost(from, to) {
  if (from === to) return 0;
  const r1 = CITY_REGION[from], r2 = CITY_REGION[to];
  if (!r1 || !r2) return 700;
  if (r1 === r2) return REGION_FLIGHT[`${r1}-${r2}`] || 200;
  return REGION_FLIGHT[`${r1}-${r2}`] || REGION_FLIGHT[`${r2}-${r1}`] || 700;
}

const HOTEL_COSTS = {
  'Bangkok': 1000, 'Ho Chi Minh City': 450, 'Kuala Lumpur': 450, 'Bali': 550, 'Jakarta': 400, 'Manila': 350, 'Singapore': 1200,
  'Seoul': 700, 'Tokyo': 900, 'Beijing': 550, 'Shanghai': 600, 'Hong Kong': 900, 'Taipei': 550,
  'Delhi': 250, 'Mumbai': 300,
  'Istanbul': 600, 'Bodrum': 700,
  'Dubai': 700, 'Tel Aviv': 750, 'Cairo': 250,
  'London': 1500, 'Paris': 1400, 'Amsterdam': 1200, 'Brussels': 900, 'Dublin': 1100, 'Luxembourg': 1000,
  'Berlin': 550, 'Vienna': 600, 'Zurich': 900, 'Prague': 400, 'Warsaw': 350, 'Budapest': 350, 'Bratislava': 350, 'Zagreb': 350, 'Ljubljana': 350,
  'Rome': 600, 'Madrid': 500, 'Barcelona': 550, 'Lisbon': 450, 'Athens': 400,
  'Stockholm': 650, 'Copenhagen': 700, 'Oslo': 750, 'Helsinki': 600, 'Tallinn': 350, 'Riga': 300, 'Vilnius': 300,
  'Moscow': 450, 'Bucharest': 300, 'Sofia': 250,
  'New York City': 2000, 'Miami': 2200, 'Los Angeles': 1600, 'Chicago': 1200, 'Dallas': 900, 'Houston': 900, 'Austin': 1000, 'San Antonio': 800, 'San Diego': 1100, 'Phoenix': 800, 'Jacksonville': 700, 'Philadelphia': 1000, 'San Jose': 1300, 'Toronto': 1000, 'Calgary': 800, 'Vancouver': 1100,
  'Mexico City': 350, 'Tijuana': 250, 'Cancun': 500, 'Buenos Aires': 350, 'Rio de Janeiro': 400, 'Bogot\u00e1': 300, 'Medell\u00edn': 280,
  'Almaty': 300,
  'Sydney': 750, 'Melbourne': 650,
  'Cape Town': 400
};

/* =========================
   DATA
========================= */
let allData = [];
let procedureData = [];

/* =========================
   DYNAMIC SEO + PAGE TEXT
========================= */
function updateSEO(name) {
  const icon = getIcon(name);
  document.title = `${name} Cost Worldwide \u2014 Compare Prices Including Flights & Hotels | Renoo.me`;

  const metaDesc = document.getElementById('metaDescription');
  if (metaDesc) metaDesc.content = `How much does ${name} cost? Compare ${name} prices worldwide including flights and hotels. Find affordable ${name} abroad.`;

  const ogTitle = document.getElementById('ogTitle');
  if (ogTitle) ogTitle.content = `${name} Cost Worldwide \u2014 Compare Prices Including Flights & Hotels`;

  const ogDesc = document.getElementById('ogDescription');
  if (ogDesc) ogDesc.content = `Compare ${name} prices worldwide. Find affordable ${name} abroad including total trip costs.`;

  const canonical = document.getElementById('canonicalUrl');
  if (canonical) canonical.href = `https://renoo.me/procedure.html?procedure=${encodeURIComponent(name)}`;

  const sd = document.getElementById('structuredData');
  if (sd) {
    sd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": `${name} Cost Worldwide`,
      "description": `Compare ${name} prices worldwide including flights and hotels.`,
      "url": `https://renoo.me/procedure.html?procedure=${encodeURIComponent(name)}`,
      "isPartOf": { "@type": "WebSite", "name": "Renoo.me", "url": "https://renoo.me/" }
    });
  }
}

function updatePageText(name) {
  const icon = getIcon(name);
  const el = (id) => document.getElementById(id);

  if (el('headerProcedureName')) el('headerProcedureName').textContent = `${icon} ${name}`;
  if (el('procHeroTitle')) el('procHeroTitle').textContent = `${icon} ${name}`;
  if (el('procHeroDesc')) {
    const desc = procedureDescriptions[name] || '';
    el('procHeroDesc').textContent = desc;
    el('procHeroDesc').style.display = desc ? '' : 'none';
  }
  if (el('countryTableTitle')) el('countryTableTitle').textContent = `Average ${name} Cost by Country`;
  if (el('calcDesc')) el('calcDesc').textContent = `See what ${name} would actually cost you, including flights and hotels.`;
  if (el('topCitiesTitle')) el('topCitiesTitle').textContent = `Top Cities for ${name}`;
  if (el('whatIsItTitle')) el('whatIsItTitle').textContent = `What Is ${name}?`;
  if (el('whyChooseTitle')) el('whyChooseTitle').textContent = `Why People Choose ${name}`;
  if (el('howItWorksTitle')) el('howItWorksTitle').textContent = `How ${name} Works`;
  if (el('benefitsTitle')) el('benefitsTitle').textContent = `${name} Benefits`;
  if (el('whoIsItForTitle')) el('whoIsItForTitle').textContent = `Who Is ${name} For?`;
  if (el('resultsTitle')) el('resultsTitle').textContent = `${name} Results & Expectations`;
  if (el('costsTitle')) el('costsTitle').textContent = `${name} Cost Factors`;
  if (el('faqTitle')) el('faqTitle').textContent = `Frequently Asked Questions About ${name}`;
}

/* =========================
   RELATED PROCEDURES (dynamic by category)
========================= */
function getRelatedProcedures(name) {
  for (const [category, procs] of Object.entries(PROCEDURE_CATEGORIES)) {
    if (procs.includes(name)) {
      return procs.filter(p => p !== name).map(p => ({ name: p, icon: getIcon(p) }));
    }
  }
  // Not in any category — return first 6 procedures from other categories
  const all = Object.values(PROCEDURE_CATEGORIES).flat().filter(p => p !== name);
  return all.slice(0, 6).map(p => ({ name: p, icon: getIcon(p) }));
}

/* =========================
   POPULATE CITY SELECT (grouped by continent)
========================= */
function populateCitySelectGrouped(selectEl, cities) {
  const grouped = {};
  CONTINENT_ORDER.forEach(c => { grouped[c] = []; });
  cities.forEach(city => {
    const cityData = allData.find(d => d.city === city);
    const country = cityData?.country;
    const continent = COUNTRY_CONTINENT[country] || "Other";
    if (!grouped[continent]) grouped[continent] = [];
    grouped[continent].push({ city, country });
  });
  CONTINENT_ORDER.forEach(continent => {
    if (!grouped[continent] || grouped[continent].length === 0) return;
    const optgroup = document.createElement('optgroup');
    optgroup.label = continent;
    grouped[continent].sort((a, b) => a.city.localeCompare(b.city)).forEach(({ city, country }) => {
      const flag = countryFlags[country] || '';
      const option = document.createElement('option');
      option.value = city;
      option.textContent = `${flag} ${city}`;
      optgroup.appendChild(option);
    });
    selectEl.appendChild(optgroup);
  });
}

/* =========================
   RENDER FUNCTIONS
========================= */
function renderCountryTable() {
  const tbody = document.getElementById('countryTableBody');
  if (!tbody) return;

  const countryMap = {};
  procedureData.forEach(d => {
    const c = d.country;
    if (!countryMap[c]) countryMap[c] = { prices: [], lows: [], highs: [] };
    countryMap[c].prices.push(d.price_mid_usd);
    countryMap[c].lows.push(d.price_low_usd);
    countryMap[c].highs.push(d.price_high_usd);
  });

  const countries = Object.entries(countryMap).map(([country, data]) => {
    const avg = Math.round(data.prices.reduce((a, b) => a + b, 0) / data.prices.length);
    const low = Math.min(...data.lows);
    const high = Math.max(...data.highs);
    return { country, avg, low, high };
  });

  countries.sort((a, b) => a.avg - b.avg);

  const usaEntry = countries.find(c => c.country === 'USA' || c.country === 'United States');
  const usaAvg = usaEntry?.avg || countries[countries.length - 1]?.avg || 1000;

  let html = '';
  countries.forEach(c => {
    const flag = countryFlags[c.country] || '';
    const savings = usaAvg - c.avg;
    const savingsPct = Math.round((savings / usaAvg) * 100);
    const isBaseline = c.country === 'USA' || c.country === 'United States';
    const savingsLabel = isBaseline
      ? '<span class="proc-table-baseline">Baseline</span>'
      : savings > 0
        ? `<span class="proc-table-save">Save ${savingsPct}%</span>`
        : `<span class="proc-table-more">${Math.abs(savingsPct)}% more</span>`;

    html += `
      <div class="proc-table-row">
        <span class="proc-table-col-country">${flag} ${c.country}</span>
        <span class="proc-table-col-price">${formatPrice(c.avg)}</span>
        <span class="proc-table-col-range">${formatPrice(c.low)} \u2013 ${formatPrice(c.high)}</span>
        <span class="proc-table-col-savings">${savingsLabel}</span>
      </div>
    `;
  });

  tbody.innerHTML = html;
}

function renderTopCities() {
  const grid = document.getElementById('topCitiesGrid');
  if (!grid) return;

  const sorted = [...procedureData]
    .filter(d => CITY_REGION[d.city])
    .sort((a, b) => a.price_mid_usd - b.price_mid_usd)
    .slice(0, 12);

  let html = '';
  sorted.forEach(d => {
    const flag = countryFlags[d.country] || '';
    html += `
      <a href="city.html?city=${encodeURIComponent(d.city)}&procedure=${encodeURIComponent(PROCEDURE_NAME)}&country=${encodeURIComponent(d.country)}" class="proc-city-card">
        <div class="proc-city-card-flag">${flag}</div>
        <div class="proc-city-card-name">${d.city}</div>
        <div class="proc-city-card-price">${formatPrice(d.price_mid_usd)}</div>
        <div class="proc-city-card-range">${formatPrice(d.price_low_usd)} \u2013 ${formatPrice(d.price_high_usd)}</div>
      </a>
    `;
  });

  grid.innerHTML = html;
}

function renderRelatedProcedures() {
  const container = document.getElementById('relatedProcedures');
  if (!container) return;

  const related = getRelatedProcedures(PROCEDURE_NAME);
  const available = related.filter(rp => allData.some(d => d.procedure === rp.name));

  let html = '';
  available.forEach(rp => {
    html += `
      <a href="procedure.html?procedure=${encodeURIComponent(rp.name)}" class="proc-related-card">
        <span class="proc-related-icon">${rp.icon}</span>
        <span class="proc-related-name">${rp.name}</span>
      </a>
    `;
  });

  container.innerHTML = html;
}

function renderCalculator() {
  const homeSelect = document.getElementById('calcHomeCity');
  const destSelect = document.getElementById('calcDestCity');
  if (!homeSelect || !destSelect) return;

  const procCities = [...new Set(procedureData.map(d => d.city))].filter(c => CITY_REGION[c]).sort();

  homeSelect.innerHTML = '<option value="">Home City...</option>';
  destSelect.innerHTML = '<option value="">Destination City...</option>';

  populateCitySelectGrouped(homeSelect, procCities);
  populateCitySelectGrouped(destSelect, procCities);

  homeSelect.addEventListener('change', calculateTrip);
  destSelect.addEventListener('change', calculateTrip);
}

function calculateTrip() {
  const homeCity = document.getElementById('calcHomeCity')?.value;
  const destCity = document.getElementById('calcDestCity')?.value;
  const resultsDiv = document.getElementById('calcResults');

  if (!homeCity || !destCity || !resultsDiv) {
    if (resultsDiv) resultsDiv.innerHTML = '';
    return;
  }

  const flightCost = getFlightCost(homeCity, destCity);
  const hotelCost = HOTEL_COSTS[destCity] || 400;
  const destProc = procedureData.find(d => d.city === destCity)?.price_mid_usd || 2000;
  const homeProc = procedureData.find(d => d.city === homeCity)?.price_mid_usd;
  const totalTrip = flightCost + hotelCost + destProc;
  const savings = homeProc ? (homeProc - totalTrip) : null;

  resultsDiv.innerHTML = `
    ${homeProc && savings && savings > 0 ? `
      <div class="trip-savings-banner">
        <div class="savings-icon">\ud83d\udcb0</div>
        <div class="savings-content">
          <div class="savings-amount">Save ${formatPrice(savings)}</div>
          <div class="savings-subtitle">Even with flight + hotel included</div>
        </div>
      </div>
    ` : homeProc && savings && savings < 0 ? `
      <div class="trip-cost-more-banner">
        <div class="cost-more-icon">\u2708\ufe0f</div>
        <div class="cost-more-content">
          <div class="cost-more-amount">Only ${formatPrice(Math.abs(savings))} more</div>
          <div class="cost-more-subtitle">For a medical vacation with flight + hotel included</div>
        </div>
      </div>
    ` : !homeProc ? `
      <div class="trip-note">
        ${PROCEDURE_NAME} price data isn\u2019t available in ${homeCity} \u2014 showing trip cost only.
      </div>
    ` : ''}

    <div class="trip-breakdown">
      <div class="trip-breakdown-title">Trip Cost Breakdown:</div>
      <div class="trip-row">
        <div class="trip-row-label"><span class="trip-row-icon">\u2708\ufe0f</span> Round-trip flight (${homeCity} \u2192 ${destCity})</div>
        <div class="trip-row-value">${formatPrice(flightCost)}</div>
      </div>
      <div class="trip-row">
        <div class="trip-row-label"><span class="trip-row-icon">\ud83c\udfe8</span> 7-night hotel in ${destCity}</div>
        <div class="trip-row-value">${formatPrice(hotelCost)}</div>
      </div>
      <div class="trip-row">
        <div class="trip-row-label"><span class="trip-row-icon">${getIcon(PROCEDURE_NAME)}</span> ${PROCEDURE_NAME} procedure</div>
        <div class="trip-row-value">${formatPrice(destProc)}</div>
      </div>
      <div class="trip-row trip-row-total">
        <div class="trip-row-label">Total Trip Cost</div>
        <div class="trip-row-value trip-total-value">${formatPrice(totalTrip)}</div>
      </div>
      ${homeProc ? `
        <div class="trip-row trip-row-comparison">
          <div class="trip-row-label">${PROCEDURE_NAME} in ${homeCity}</div>
          <div class="trip-row-value">${formatPrice(homeProc)}</div>
        </div>
      ` : ''}
    </div>

    <a href="travel.html#city=${encodeURIComponent(destCity)}" class="trip-travel-cta" target="_blank" rel="noopener">
      <span class="trip-travel-cta-inner">\u2708\ufe0f Compare flight + hotel prices</span>
    </a>
  `;
}

/* =========================
   RENDER NEW CONTENT SECTIONS
========================= */
function renderHeroValues() {
  const container = document.getElementById('procHeroValues');
  if (!container) return;
  const content = PROCEDURE_CONTENT[PROCEDURE_NAME];
  if (!content || !content.heroValues) { container.style.display = 'none'; return; }

  container.innerHTML = content.heroValues.map(v =>
    `<div class="proc-hero-value"><span class="proc-hero-value-icon">${v.icon}</span><span>${v.text}</span></div>`
  ).join('');
}

function renderWhatIsIt() {
  const content = PROCEDURE_CONTENT[PROCEDURE_NAME]?.whatIsIt;
  if (!content) return;
  const el = (id) => document.getElementById(id);
  if (el('whatIsItDefinition')) el('whatIsItDefinition').textContent = content.definition;
  if (el('whatIsItPurpose')) el('whatIsItPurpose').textContent = content.purpose;
  if (el('whatIsItHowItWorks')) el('whatIsItHowItWorks').textContent = content.howItWorks;
}

function renderWhyChoose() {
  const content = PROCEDURE_CONTENT[PROCEDURE_NAME]?.whyChoose;
  if (!content) return;
  const el = (id) => document.getElementById(id);
  if (el('whyChooseGoals')) el('whyChooseGoals').innerHTML = content.goals.map(g => `<li>${g}</li>`).join('');
  if (el('whyChooseUseCases')) el('whyChooseUseCases').innerHTML = content.useCases.map(u => `<li>${u}</li>`).join('');
}

function renderHowItWorksSteps() {
  const content = PROCEDURE_CONTENT[PROCEDURE_NAME]?.howItWorks;
  if (!content) return;
  const el = (id) => document.getElementById(id);

  if (el('howItWorksSteps')) {
    el('howItWorksSteps').innerHTML = content.steps.map((s, i) =>
      `<div class="proc-step"><div class="proc-step-number">${i + 1}</div><div class="proc-step-content"><h4>${s.title}</h4><p>${s.desc}</p></div></div>`
    ).join('');
  }
  if (el('howItWorksDuration')) el('howItWorksDuration').textContent = content.duration;
  if (el('howItWorksSetting')) el('howItWorksSetting').textContent = content.setting;
  if (el('howItWorksAnesthesia')) el('howItWorksAnesthesia').textContent = content.anesthesia;
}

function renderBenefits() {
  const content = PROCEDURE_CONTENT[PROCEDURE_NAME]?.benefits;
  if (!content) return;
  const el = (id) => document.getElementById(id);
  if (el('benefitsPhysical')) el('benefitsPhysical').innerHTML = content.physical.map(b => `<li>${b}</li>`).join('');
  if (el('benefitsMental')) el('benefitsMental').innerHTML = content.mental.map(b => `<li>${b}</li>`).join('');
  if (el('benefitsLongTerm')) el('benefitsLongTerm').innerHTML = content.longTerm.map(b => `<li>${b}</li>`).join('');
  if (el('benefitsEvidence')) el('benefitsEvidence').textContent = '\uD83D\uDCCA Evidence Level: ' + content.evidenceLevel;
}

function renderWhoIsItFor() {
  const content = PROCEDURE_CONTENT[PROCEDURE_NAME]?.whoIsItFor;
  if (!content) return;
  const el = (id) => document.getElementById(id);
  if (el('whoIsItForGood')) el('whoIsItForGood').innerHTML = content.goodCandidates.map(c => `<li>${c}</li>`).join('');
  if (el('whoIsItForNot')) el('whoIsItForNot').innerHTML = content.notSuitableFor.map(c => `<li>${c}</li>`).join('');
  if (el('whoIsItForScreening')) el('whoIsItForScreening').innerHTML = `<strong>Medical Screening:</strong> ${content.screeningRequired}`;
}

function renderResults() {
  const content = PROCEDURE_CONTENT[PROCEDURE_NAME]?.results;
  if (!content) return;
  const el = (id) => document.getElementById(id);
  if (el('resultsImmediate')) el('resultsImmediate').textContent = content.immediate;
  if (el('resultsShortTerm')) el('resultsShortTerm').textContent = content.shortTerm;
  if (el('resultsMediumTerm')) el('resultsMediumTerm').textContent = content.mediumTerm;
  if (el('resultsLongTerm')) el('resultsLongTerm').textContent = content.longTerm;
  if (el('resultsTypicalPlan')) el('resultsTypicalPlan').innerHTML = `<strong>Typical Treatment Plan:</strong> ${content.typicalPlan}`;
}

function renderSafetyExpanded() {
  const content = PROCEDURE_CONTENT[PROCEDURE_NAME]?.safety;
  if (!content) return;
  const el = (id) => document.getElementById(id);
  if (el('safetyCommonEffects')) el('safetyCommonEffects').innerHTML = content.commonEffects.map(e => `<li>${e}</li>`).join('');
  if (el('safetyRareRisks')) el('safetyRareRisks').innerHTML = content.rareRisks.map(r => `<li>${r}</li>`).join('');
  if (el('safetyProtocols')) el('safetyProtocols').innerHTML = content.protocols.map(p => `<li>${p}</li>`).join('');
}

function renderFaq() {
  const content = PROCEDURE_CONTENT[PROCEDURE_NAME]?.faq;
  if (!content) return;
  const el = (id) => document.getElementById(id);
  if (el('faqList')) {
    el('faqList').innerHTML = content.map((item, i) =>
      `<div class="proc-faq-item" data-faq="${i}"><button class="proc-faq-question" onclick="toggleFaq(${i})"><span>${item.q}</span><span class="proc-faq-icon">\u25BC</span></button><div class="proc-faq-answer">${item.a}</div></div>`
    ).join('');
  }
}

function toggleFaq(index) {
  const item = document.querySelector(`.proc-faq-item[data-faq="${index}"]`);
  if (item) item.classList.toggle('open');
}

function renderNewSections() {
  if (!PROCEDURE_CONTENT[PROCEDURE_NAME]) return;
  renderHeroValues();
  renderWhatIsIt();
  renderWhyChoose();
  renderHowItWorksSteps();
  renderBenefits();
  renderWhoIsItFor();
  renderResults();
  renderSafetyExpanded();
  renderFaq();
}

/* =========================
   IN-PAGE NAVIGATION
========================= */
function initProcNav() {
  const nav = document.getElementById('procNav');
  if (!nav) return;

  const header = document.getElementById('fixedHeader');
  const getHeaderH = () => header ? header.offsetHeight : 100;

  const links = nav.querySelectorAll('.proc-nav-link');
  const sections = [];

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const id = href.replace('#', '');
    const section = document.getElementById(id);
    if (section) sections.push({ id, el: section, link });
  });

  function updateActiveLink() {
    const headerH = getHeaderH();
    const scrollPos = window.scrollY + headerH + 20;
    let active = sections[0];
    for (const section of sections) {
      const top = section.el.getBoundingClientRect().top + window.scrollY;
      if (top <= scrollPos) active = section;
    }
    links.forEach(l => l.classList.remove('active'));
    if (active) {
      active.link.classList.add('active');
      const linkRect = active.link.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      if (linkRect.left < navRect.left || linkRect.right > navRect.right) {
        nav.scrollLeft += linkRect.left - navRect.left - 24;
      }
    }
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const id = href.replace('#', '');
      const target = document.getElementById(id);
      if (target) {
        const headerH = getHeaderH();
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 10;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

function renderAll() {
  renderCountryTable();
  renderTopCities();
  renderRelatedProcedures();
  calculateTrip();
  renderNewSections();
}

/* =========================
   BROWSE LANDING (no procedure param)
========================= */
function renderBrowseLanding() {
  document.getElementById('procDynamicContent').style.display = 'none';
  document.getElementById('procBrowseLanding').style.display = 'block';

  const container = document.getElementById('procLandingCategories');
  if (!container) return;

  const procedures = [...new Set(allData.map(d => d.procedure))].filter(Boolean);

  let html = '';
  for (const [category, categoryProcs] of Object.entries(PROCEDURE_CATEGORIES)) {
    const available = categoryProcs.filter(p => procedures.includes(p));
    if (available.length === 0) continue;
    html += `<div class="proc-landing-category">
      <h3 class="proc-landing-category-title">${category}</h3>
      <div class="proc-landing-items">
        ${available.map(proc => `
          <a href="procedure.html?procedure=${encodeURIComponent(proc)}" class="proc-landing-item">
            <span class="proc-landing-item-icon">${getIcon(proc)}</span>
            <span class="proc-landing-item-name">${proc}</span>
          </a>
        `).join('')}
      </div>
    </div>`;
  }

  // Uncategorized
  const allCategorized = Object.values(PROCEDURE_CATEGORIES).flat();
  const uncategorized = procedures.filter(p => !allCategorized.includes(p));
  if (uncategorized.length > 0) {
    html += `<div class="proc-landing-category">
      <h3 class="proc-landing-category-title">Other</h3>
      <div class="proc-landing-items">
        ${uncategorized.map(proc => `
          <a href="procedure.html?procedure=${encodeURIComponent(proc)}" class="proc-landing-item">
            <span class="proc-landing-item-icon">${getIcon(proc)}</span>
            <span class="proc-landing-item-name">${proc}</span>
          </a>
        `).join('')}
      </div>
    </div>`;
  }

  container.innerHTML = html;
}

/* =========================
   COLLAPSIBLE SECTIONS
========================= */
function setupCollapsibleSections() {
  const toggleBtn = document.getElementById('toggleCountryTable');
  const content = document.getElementById('countryTableContent');
  if (toggleBtn && content) {
    toggleBtn.addEventListener('click', () => {
      const isActive = toggleBtn.classList.contains('active');
      toggleBtn.classList.toggle('active', !isActive);
      content.style.display = isActive ? 'none' : 'block';
    });
  }
}

/* =========================
   MENU MEGA-NAV (Browse Procedures in hamburger menu)
========================= */
function populateMenuMegaNav() {
  const container = document.getElementById('menuMegaNavCategories');
  if (!container) return;

  const procedures = [...new Set(allData.map(d => d.procedure))].filter(Boolean);

  let html = '';
  for (const [category, categoryProcs] of Object.entries(PROCEDURE_CATEGORIES)) {
    const available = categoryProcs.filter(p => procedures.includes(p));
    if (available.length === 0) continue;
    html += `<div class="menu-mega-nav-category">
      <h4 class="menu-mega-nav-cat-title">${category}</h4>
      ${available.map(proc => `
        <a href="procedure.html?procedure=${encodeURIComponent(proc)}" class="menu-mega-nav-item">
          <span>${getIcon(proc)}</span>
          <span>${proc}</span>
        </a>
      `).join('')}
    </div>`;
  }

  container.innerHTML = html;
}

/* =========================
   HAMBURGER MENU
========================= */
function initMenu() {
  const hamburger = document.getElementById('hamburgerMenu');
  const overlay = document.getElementById('menuOverlay');
  const close = document.getElementById('menuClose');

  if (hamburger && overlay) {
    hamburger.addEventListener('click', () => { overlay.classList.add('active'); document.body.style.overflow = 'hidden'; });
  }
  if (close && overlay) {
    close.addEventListener('click', () => { overlay.classList.remove('active'); document.body.style.overflow = ''; });
  }
  if (overlay) {
    overlay.addEventListener('click', (e) => { if (e.target === overlay) { overlay.classList.remove('active'); document.body.style.overflow = ''; } });
  }

  // Browse Procedures expandable
  const browseProc = document.getElementById('menuBrowseProcedures');
  const procDropdown = document.getElementById('menuProcedureDropdown');
  if (browseProc && procDropdown) {
    browseProc.addEventListener('click', () => {
      browseProc.classList.toggle('expanded');
      procDropdown.classList.toggle('open');
    });
  }

  // Browse Cities expandable
  const browseCities = document.getElementById('menuBrowseCities');
  const cityDropdown = document.getElementById('menuCityDropdown');
  if (browseCities && cityDropdown) {
    browseCities.addEventListener('click', () => {
      const isOpen = cityDropdown.style.display === 'block';
      cityDropdown.style.display = isOpen ? 'none' : 'block';
      browseCities.classList.toggle('expanded', !isOpen);
    });
  }

  // Menu destination select
  const menuDestSelect = document.getElementById('menuDestinationSelect');
  if (menuDestSelect) {
    const cities = [...new Set(allData.map(d => d.city))].sort();
    populateCitySelectGrouped(menuDestSelect, cities);
    menuDestSelect.addEventListener('change', () => {
      const city = menuDestSelect.value;
      if (!city) return;
      const cityData = allData.find(d => d.city === city);
      const proc = PROCEDURE_NAME || 'Botox';
      window.location.href = `city.html?city=${encodeURIComponent(city)}&procedure=${encodeURIComponent(proc)}&country=${encodeURIComponent(cityData?.country || '')}`;
    });
  }

  // Currency dropdown
  const currDropdown = document.getElementById('currencyDropdown');
  if (currDropdown) currDropdown.value = currentCurrency;
}

/* =========================
   INIT
========================= */
fetch('data.json')
  .then(r => r.json())
  .then(data => {
    allData = data;

    // Check if procedure is valid
    if (!PROCEDURE_NAME || !data.some(d => d.procedure === PROCEDURE_NAME)) {
      // Show browse landing
      renderBrowseLanding();
      populateMenuMegaNav();
      initMenu();
      return;
    }

    procedureData = data.filter(d => d.procedure === PROCEDURE_NAME);

    // Show dynamic content, hide landing
    document.getElementById('procDynamicContent').style.display = '';
    document.getElementById('procBrowseLanding').style.display = 'none';

    // Show proc-nav in header
    const procNav = document.getElementById('procNav');
    if (procNav) procNav.style.display = '';
    document.body.classList.add('has-proc-nav');

    updateSEO(PROCEDURE_NAME);
    updatePageText(PROCEDURE_NAME);
    renderAll();
    renderCalculator();
    setupCollapsibleSections();
    initProcNav();
    populateMenuMegaNav();
    initMenu();

    // Scroll to hash section if arriving from another page
    if (window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      const target = document.getElementById(hashId);
      if (target) {
        setTimeout(() => {
          const header = document.getElementById('fixedHeader');
          const headerH = header ? header.offsetHeight : 100;
          window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - headerH - 10, behavior: 'smooth' });
        }, 300);
      }
    }
  });
