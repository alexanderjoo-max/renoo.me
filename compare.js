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
  "USA": "🇺🇸", "Vietnam": "🇻🇳"
};

// Procedure icons mapping
// Helper function to strip parenthetical info
function stripParens(s) {
  return (s ?? "").toString().replace(/\s*\([^)]*\)\s*/g, "").trim();
}

const procedureIcons = {
  "Botox": "💉", "Brazilian Butt Lift": "🍑", "Breast Augmentation": "🍒",
  "Colonoscopy": "🔬", "Dental Implant": "🦷", "Dental Veneers": "😁",
  "Facelift": "🧖", "Gastric Bypass": "🏥", "Hair Transplant": "💇",
  "Hip Replacement": "🦴", "IVF": "👶", "Knee Replacement": "🦵",
  "LASIK": "👁️", "Liposuction": "💪", "Rhinoplasty": "👃", "Tummy Tuck": "🤰"
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
  } catch (e) {
    console.error('Failed to load data:', e);
  }
}

function populateCitySelectors() {
  const uniqueCities = [...new Set(allData.map(d => d.city))].filter(Boolean).sort();

  const city1Select = document.getElementById('city1Select');
  const city2Select = document.getElementById('city2Select');

  uniqueCities.forEach(city => {
    const cityData = allData.find(d => d.city === city);
    const flag = countryFlags[cityData?.country] || '';

    const option1 = document.createElement('option');
    option1.value = city;
    option1.textContent = `${flag} ${city}`;
    city1Select.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = city;
    option2.textContent = `${flag} ${city}`;
    city2Select.appendChild(option2);
  });

  city1Select.addEventListener('change', compareCities);
  city2Select.addEventListener('change', compareCities);
}

function populateProcedureSelector() {
  const uniqueProcedures = [...new Set(allData.map(d => d.procedure))].filter(Boolean).sort();
  const procedureSelect = document.getElementById('procedureSelect');

  uniqueProcedures.forEach(procedure => {
    const icon = procedureIcons[procedure] || '🏥';
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
    <div class="comparison-header">
      <div class="comparison-city-col"></div>
      <div class="comparison-city-col comparison-city-header"><a href="city.html?city=${encodeURIComponent(city1)}&country=${encodeURIComponent(city1Country)}" class="compare-city-link">${flag1} ${city1}</a></div>
      <div class="comparison-city-col comparison-city-header"><a href="city.html?city=${encodeURIComponent(city2)}&country=${encodeURIComponent(city2Country)}" class="compare-city-link">${flag2} ${city2}</a></div>
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
        <div class="comparison-procedure-col">${icon} ${procedure}</div>
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const currencyDropdown = document.getElementById('currencyDropdown');
  if (currencyDropdown) {
    currencyDropdown.value = currentCurrency;
  }

  loadData();
});
