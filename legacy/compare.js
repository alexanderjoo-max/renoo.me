/* =========================
   CURRENCY CONVERSION
========================= */
const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1, name: 'USD' },
  GBP: { symbol: '£', rate: 0.79, name: 'GBP' },
  EUR: { symbol: '€', rate: 0.92, name: 'EUR' },
  JPY: { symbol: '¥', rate: 149, name: 'JPY' },
  AUD: { symbol: 'A$', rate: 1.52, name: 'AUD' },
  CAD: { symbol: 'C$', rate: 1.39, name: 'CAD' },
  CHF: { symbol: 'CHF', rate: 0.88, name: 'CHF' },
  CNY: { symbol: '¥', rate: 7.24, name: 'CNY' },
  INR: { symbol: '₹', rate: 83.12, name: 'INR' },
  MXN: { symbol: 'MX$', rate: 17.05, name: 'MXN' },
  SGD: { symbol: 'S$', rate: 1.34, name: 'SGD' },
  KRW: { symbol: '₩', rate: 1320, name: 'KRW' },
  THB: { symbol: '฿', rate: 35.40, name: 'THB' },
  TRY: { symbol: '₺', rate: 32.50, name: 'TRY' },
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
  if (currencyDropdown) {
    currencyDropdown.value = currency;
  }

  const menuOverlay = document.getElementById('menuOverlay');
  if (menuOverlay) {
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (allData && allData.length > 0) {
    compareCities();
  }
}

// Country flags mapping
const countryFlags = {
  "Argentina": "🇦🇷", "Australia": "🇦🇺", "Austria": "🇦🇹", "Belgium": "🇧🇪",
  "Brazil": "🇧🇷", "Bulgaria": "🇧🇬", "Canada": "🇨🇦", "China": "🇨🇳",
  "Colombia": "🇨🇴", "Costa Rica": "🇨🇷", "Croatia": "🇭🇷", "Cyprus": "🇨🇾",
  "Czech Rep.": "🇨🇿", "Denmark": "🇩🇰", "Egypt": "🇪🇬", "Estonia": "🇪🇪",
  "Finland": "🇫🇮", "France": "🇫🇷", "Germany": "🇩🇪", "Greece": "🇬🇷",
  "Hungary": "🇭🇺", "India": "🇮🇳", "Indonesia": "🇮🇩", "Ireland": "🇮🇪",
  "Israel": "🇮🇱", "Italy": "🇮🇹", "Japan": "🇯🇵", "Kazakhstan": "🇰🇿",
  "Latvia": "🇱🇻", "Lithuania": "🇱🇹", "Luxembourg": "🇱🇺", "Malaysia": "🇲🇾",
  "Mexico": "🇲🇽", "Netherlands": "🇳🇱", "Norway": "🇳🇴", "Philippines": "🇵🇭",
  "Poland": "🇵🇱", "Portugal": "🇵🇹", "Romania": "🇷🇴", "Russia": "🇷🇺",
  "Singapore": "🇸🇬", "Slovakia": "🇸🇰", "Slovenia": "🇸🇮",
  "South Africa": "🇿🇦", "South Korea": "🇰🇷",
  "Spain": "🇪🇸", "Sweden": "🇸🇪", "Switzerland": "🇨🇭", "Taiwan": "🇹🇼",
  "Thailand": "🇹🇭", "Turkey": "🇹🇷", "UAE": "🇦🇪", "UK": "🇬🇧",
  "USA": "🇺🇸", "United States": "🇺🇸", "Vietnam": "🇻🇳",
  "Serbia": "🇷🇸", "Czech Republic": "🇨🇿", "United Kingdom": "🇬🇧"
};

// Continent ordering (by popularity for medical tourism)
const CONTINENT_ORDER = ["North America", "Europe", "Asia", "South America", "Africa", "Oceania"];

const COUNTRY_CONTINENT = {
  "USA": "North America", "Canada": "North America", "Mexico": "North America", "Costa Rica": "North America",
  "UK": "Europe", "France": "Europe", "Germany": "Europe", "Italy": "Europe", "Spain": "Europe",
  "Portugal": "Europe", "Netherlands": "Europe", "Belgium": "Europe", "Switzerland": "Europe",
  "Austria": "Europe", "Denmark": "Europe", "Sweden": "Europe", "Norway": "Europe", "Finland": "Europe",
  "Ireland": "Europe", "Greece": "Europe", "Poland": "Europe", "Czech Rep.": "Europe",
  "Hungary": "Europe", "Romania": "Europe", "Bulgaria": "Europe", "Croatia": "Europe",
  "Slovenia": "Europe", "Slovakia": "Europe", "Estonia": "Europe", "Latvia": "Europe",
  "Lithuania": "Europe", "Luxembourg": "Europe", "Serbia": "Europe", "Cyprus": "Europe",
  "Turkey": "Europe", "Russia": "Europe", "Serbia": "Europe",
  "United Kingdom": "Europe", "Czech Republic": "Europe", "United States": "North America",
  "Thailand": "Asia", "Japan": "Asia", "South Korea": "Asia", "India": "Asia",
  "Indonesia": "Asia", "Philippines": "Asia", "Malaysia": "Asia", "Singapore": "Asia",
  "Vietnam": "Asia", "China": "Asia", "Taiwan": "Asia", "UAE": "Asia", "Israel": "Asia", "Kazakhstan": "Asia",
  "Argentina": "South America", "Brazil": "South America", "Colombia": "South America",
  "Egypt": "Africa", "South Africa": "Africa",
  "Australia": "Oceania"
};

// Populates a <select> element with city options grouped by continent, with flags
function populateCitySelectGrouped(selectEl, cities, data) {
  const grouped = {};
  CONTINENT_ORDER.forEach(c => { grouped[c] = []; });

  cities.forEach(city => {
    const cityData = data.find(d => d.city === city);
    const country = cityData?.country;
    const continent = COUNTRY_CONTINENT[country] || "Other";
    if (!grouped[continent]) grouped[continent] = [];
    grouped[continent].push({ city, country });
  });

  CONTINENT_ORDER.forEach(continent => {
    if (grouped[continent].length === 0) return;
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
  // Any cities not in a known continent
  if (grouped["Other"] && grouped["Other"].length > 0) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = "Other";
    grouped["Other"].sort((a, b) => a.city.localeCompare(b.city)).forEach(({ city, country }) => {
      const flag = countryFlags[country] || '';
      const option = document.createElement('option');
      option.value = city;
      option.textContent = `${flag} ${city}`;
      optgroup.appendChild(option);
    });
    selectEl.appendChild(optgroup);
  }
}

// Procedure icons mapping
// Helper function to strip parenthetical info
function stripParens(s) {
  return (s ?? "").toString().replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
}

const procedureIcons = {
  "Botox": "💉", "Brazilian Butt Lift": "🍑", "Breast Augmentation": "🍒",
  "Colonoscopy": "🔬", "Dental Implant": "🦷", "Dental Veneers": "😁",
  "Facelift": "🧖", "Gastric Bypass": "🏥", "Hair Transplant": "💇",
  "Hip Replacement": "🦴", "IVF": "👶", "Knee Replacement": "🦵",
  "LASIK": "👁️", "Liposuction": "💪", "Rhinoplasty": "👃", "Tummy Tuck": "🤰",
  "Stem Cell Therapy": "🧬", "Hyperbaric Oxygen Therapy": "🫧",
  "Exosome Therapy": "🧫", "NAD+ IV Injection": "⚡",
  "Plasma Exchange Therapy": "🩸", "Advanced Health Screening": "🩺",
  "PRP Therapy": "💎", "Peptide Therapy": "🧪",
  "Ozone Therapy": "🌀", "Biochip Implantation": "📡",
  "Testosterone Replacement Therapy": "💊", "Human Growth Hormone": "📈",
  "Limb Lengthening Surgery": "📏", "Gender Reassignment Surgery": "🏳️‍⚧️"
};

// Data storage
let allData = [];

// Load main data
async function loadData() {
  try {
    const dataRes = await fetch('data.json');
    allData = await dataRes.json();

    populateCitySelectors();
    populateProcedureSelector();
    populateMenuMegaNav();
  } catch (e) {
    console.error('Failed to load data:', e);
  }
}

function populateCitySelectors() {
  const uniqueCities = [...new Set(allData.map(d => d.city))].filter(Boolean).sort();

  const city1Select = document.getElementById('city1Select');
  const city2Select = document.getElementById('city2Select');

  populateCitySelectGrouped(city1Select, uniqueCities, allData);
  populateCitySelectGrouped(city2Select, uniqueCities, allData);

  city1Select.addEventListener('change', compareCities);
  city2Select.addEventListener('change', compareCities);

  // Autofill defaults: Los Angeles → Bangkok
  if ([...city1Select.options].some(o => o.value === 'Los Angeles')) {
    city1Select.value = 'Los Angeles';
  }
  if ([...city2Select.options].some(o => o.value === 'Bangkok')) {
    city2Select.value = 'Bangkok';
  }
  compareCities();

  // Populate menu destination dropdown
  const menuDestinationSelect = document.getElementById('menuDestinationSelect');
  if (menuDestinationSelect) {
    menuDestinationSelect.innerHTML = '<option value="" selected>Choose destination...</option>';
    populateCitySelectGrouped(menuDestinationSelect, uniqueCities, allData);
    menuDestinationSelect.addEventListener('change', (e) => {
      const selectedCity = e.target.value;
      if (selectedCity) {
        const cityData = allData.find(d => d.city === selectedCity);
        if (cityData) {
          window.location.href = `city.html?city=${encodeURIComponent(selectedCity)}&country=${encodeURIComponent(cityData.country)}&procedure=Botox`;
        }
      }
    });
  }
}

function populateProcedureSelector() {
  const uniqueProcedures = [...new Set(allData.map(d => d.procedure))].filter(Boolean).sort();
  const procedureSelect = document.getElementById('procedureSelect');

  uniqueProcedures.forEach(procedure => {
    const icon = procedureIcons[stripParens(procedure)] || '🏥';
    const option = document.createElement('option');
    option.value = procedure;
    option.textContent = `${icon} ${procedure}`;
    procedureSelect.appendChild(option);
  });

  procedureSelect.addEventListener('change', compareCities);
}

function compareCities() {
  const city1 = document.getElementById('city1Select').value;
  const city2 = document.getElementById('city2Select').value;
  const selectedProcedure = document.getElementById('procedureSelect').value;

  if (!city1 || !city2) {
    document.getElementById('comparisonResults').style.display = 'none';
    return;
  }

  // Get all procedures available in both cities
  const city1Data = allData.filter(d => d.city === city1);
  const city2Data = allData.filter(d => d.city === city2);

  // Get unique procedures from both cities
  let procedures = new Set([
    ...city1Data.map(d => d.procedure),
    ...city2Data.map(d => d.procedure)
  ]);

  // Filter by selected procedure if one is chosen
  if (selectedProcedure) {
    procedures = new Set([selectedProcedure]);
  }

  const city1Country = city1Data[0]?.country;
  const city2Country = city2Data[0]?.country;
  const flag1 = countryFlags[city1Country] || '';
  const flag2 = countryFlags[city2Country] || '';

  // Build comparison table
  let html = `
    <div class="compare-travel-cta">
      <a href="travel.html?city=${encodeURIComponent(city1)}" target="_blank" class="compare-travel-cta-btn">✈️ Travel to ${city1}</a>
      <a href="travel.html?city=${encodeURIComponent(city2)}" target="_blank" class="compare-travel-cta-btn">✈️ Travel to ${city2}</a>
    </div>
    <div class="comparison-header">
      <div class="comparison-city-col"></div>
      <div class="comparison-city-col comparison-city-header"><a href="city.html?city=${encodeURIComponent(city1)}&country=${encodeURIComponent(city1Country)}&procedure=${encodeURIComponent(selectedProcedure || 'Liposuction')}" class="compare-city-link">${flag1} ${city1}</a></div>
      <div class="comparison-city-col comparison-city-header"><a href="city.html?city=${encodeURIComponent(city2)}&country=${encodeURIComponent(city2Country)}&procedure=${encodeURIComponent(selectedProcedure || 'Liposuction')}" class="compare-city-link">${flag2} ${city2}</a></div>
    </div>
  `;

  Array.from(procedures).sort().forEach(procedure => {
    const proc1 = city1Data.find(d => d.procedure === procedure);
    const proc2 = city2Data.find(d => d.procedure === procedure);

    const cleanProcedure = stripParens(procedure);
    const icon = procedureIcons[cleanProcedure] || '🏥';
    const price1 = proc1?.price_mid_usd ? formatPrice(proc1.price_mid_usd) : 'N/A';
    const price2 = proc2?.price_mid_usd ? formatPrice(proc2.price_mid_usd) : 'N/A';

    let cheaperClass1 = '';
    let cheaperClass2 = '';

    if (proc1 && proc2) {
      if (proc1.price_mid_usd < proc2.price_mid_usd) {
        cheaperClass1 = 'comparison-cheaper';
      } else if (proc2.price_mid_usd < proc1.price_mid_usd) {
        cheaperClass2 = 'comparison-cheaper';
      }
    }

    const link1 = proc1 ? `city.html?city=${encodeURIComponent(city1)}&procedure=${encodeURIComponent(procedure)}&country=${encodeURIComponent(city1Country)}` : '';
    const link2 = proc2 ? `city.html?city=${encodeURIComponent(city2)}&procedure=${encodeURIComponent(procedure)}&country=${encodeURIComponent(city2Country)}` : '';

    const price1Html = link1 ? `<a href="${link1}" class="compare-price-link ${cheaperClass1}">${price1}</a>` : `<span class="${cheaperClass1}">${price1}</span>`;
    const price2Html = link2 ? `<a href="${link2}" class="compare-price-link ${cheaperClass2}">${price2}</a>` : `<span class="${cheaperClass2}">${price2}</span>`;

    html += `
      <div class="comparison-row">
        <div class="comparison-procedure-col"><a href="procedure.html?procedure=${encodeURIComponent(procedure)}" class="procedure-link">${icon} ${procedure}</a></div>
        <div class="comparison-price-col">${price1Html}</div>
        <div class="comparison-price-col">${price2Html}</div>
      </div>
    `;
  });

  document.getElementById('comparisonTable').innerHTML = html;
  document.getElementById('comparisonResults').style.display = 'block';
}

/* =========================
   HAMBURGER MENU
========================= */
const hamburgerMenu = document.getElementById('hamburgerMenu');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');

if (hamburgerMenu) {
  hamburgerMenu.addEventListener('click', () => {
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

if (menuClose) {
  menuClose.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

if (menuOverlay) {
  menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Browse Procedures expandable toggle
const menuBrowseProcedures = document.getElementById('menuBrowseProcedures');
const menuProcedureDropdown = document.getElementById('menuProcedureDropdown');
if (menuBrowseProcedures && menuProcedureDropdown) {
  menuBrowseProcedures.addEventListener('click', () => {
    menuBrowseProcedures.classList.toggle('expanded');
    menuProcedureDropdown.classList.toggle('open');
  });
}

// Browse Cities expandable toggle
const menuBrowseCities = document.getElementById('menuBrowseCities');
const menuCityDropdown = document.getElementById('menuCityDropdown');
if (menuBrowseCities && menuCityDropdown) {
  menuBrowseCities.addEventListener('click', () => {
    menuBrowseCities.classList.toggle('open');
    menuCityDropdown.classList.toggle('open');
  });
}

/* Procedure categories for hamburger mega-nav */
const PROCEDURE_CATEGORIES = {
  "Beauty": ["Botox", "Facelift", "Rhinoplasty", "Hair Transplant", "Dental Veneers"],
  "Body": ["Breast Augmentation", "Brazilian Butt Lift", "Liposuction", "Tummy Tuck", "Gastric Bypass", "Limb Lengthening Surgery", "Gender Reassignment Surgery"],
  "Medical": ["LASIK", "Dental Implant", "Knee Replacement", "Hip Replacement", "Colonoscopy", "IVF"],
  "Biohacking": ["Stem Cell Therapy", "Exosome Therapy", "PRP Therapy", "Plasma Exchange Therapy", "NAD+ IV Injection", "Peptide Therapy", "Ozone Therapy", "Hyperbaric Oxygen Therapy", "Biochip Implantation", "Advanced Health Screening", "Testosterone Replacement Therapy", "Human Growth Hormone"]
};

/* Populate the hamburger menu mega-nav with procedure links */
function populateMenuMegaNav() {
  const container = document.getElementById('menuMegaNavCategories');
  if (!container || !allData || allData.length === 0) return;
  const procedures = [...new Set(allData.map(d => d.procedure ? stripParens(d.procedure) : null))].filter(Boolean);
  let html = '';
  for (const [category, categoryProcs] of Object.entries(PROCEDURE_CATEGORIES)) {
    const available = categoryProcs.filter(p => procedures.includes(p));
    if (available.length === 0) continue;
    html += `<div class="menu-mega-nav-category">
      <h4 class="menu-mega-nav-cat-title">${category}</h4>
      ${available.map(proc => {
        const icon = procedureIcons[proc] || '✨';
        return `<a href="procedure.html?procedure=${encodeURIComponent(proc)}" class="menu-mega-nav-item">
          <span>${icon}</span>
          <span>${proc}</span>
        </a>`;
      }).join('')}
    </div>`;
  }
  container.innerHTML = html;
}

// Use-case chips toggle
const compareUseCasesToggle = document.getElementById('compareUseCasesToggle');
const compareUseCaseChips = document.getElementById('compareUseCaseChips');
if (compareUseCasesToggle && compareUseCaseChips) {
  compareUseCasesToggle.addEventListener('click', () => {
    const expanded = compareUseCasesToggle.getAttribute('aria-expanded') === 'true';
    compareUseCasesToggle.setAttribute('aria-expanded', !expanded);
    compareUseCaseChips.classList.toggle('open', !expanded);
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const currencyDropdown = document.getElementById('currencyDropdown');
  if (currencyDropdown) {
    currencyDropdown.value = currentCurrency;
  }

  loadData();
});
