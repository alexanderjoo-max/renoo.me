// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const cityName = urlParams.get('city');
const procedure = urlParams.get('procedure');
const country = urlParams.get('country');
const isEmbed = urlParams.get('embed') === '1';

// In embed mode, hide the header and adjust padding
if (isEmbed) {
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fixedHeader')?.style.setProperty('display', 'none');
    document.getElementById('menuOverlay')?.style.setProperty('display', 'none', 'important');
    const main = document.querySelector('.city-main');
    if (main) main.style.paddingTop = '24px';
  });
}

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

  // Update dropdown
  const currencyDropdown = document.getElementById('currencyDropdown');
  if (currencyDropdown) {
    currencyDropdown.value = currency;
  }

  // Update UI (legacy support for old currency buttons)
  document.querySelectorAll('.currency-option, .currency-option-menu').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.currency === currency);
  });

  // Close menu if open
  const menuOverlay = document.getElementById('menuOverlay');
  if (menuOverlay) {
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Refresh the page content
  if (allData && allData.length > 0) {
    renderPage();
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

// Helper function to strip parenthetical info
function stripParens(s) {
  return (s ?? "").toString().replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
}

// Procedure icons mapping
const procedureIcons = {
  "Botox": "💉", "Brazilian Butt Lift": "🍑", "Breast Augmentation": "🍒",
  "Colonoscopy": "🔬", "Dental Implant": "🦷", "Dental Veneers": "😁",
  "Facelift": "🧖", "Gastric Bypass": "🏥", "Hair Transplant": "💇",
  "Hip Replacement": "🦴", "IVF": "👶", "Knee Replacement": "🦵",
  "LASIK": "👁️", "Liposuction": "💪", "Rhinoplasty": "👃", "Tummy Tuck": "🤰",
  "Stem Cell Therapy": "🧬", "Hyperbaric Oxygen Therapy": "🫧",
  "Exosome Therapy": "🔬", "NAD+ IV Injection": "⚡",
  "Plasma Exchange Therapy": "🩸", "Advanced Health Screening": "🩺",
  "PRP Therapy": "💎", "Peptide Therapy": "🧪",
  "Ozone Therapy": "🌀", "Biochip Implantation": "📡"
};

// Data storage
let allData = [];
let clinicData = [];

// Load main data
async function loadData() {
  try {
    const [dataRes, clinicRes] = await Promise.all([
      fetch('data.json'),
      fetch('clinics_complete.csv')
    ]);

    allData = await dataRes.json();

    // Parse clinic CSV
    const csvText = await clinicRes.text();
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');

    clinicData = lines.slice(1).map(line => {
      const values = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());

      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = values[i] || '';
      });
      return obj;
    });

    renderPage();
    populateDestinationDropdown();
    populateDepartureCities();
  } catch (e) {
    console.error('Failed to load data:', e);
  }
}

function renderPage() {
  if (!cityName || !procedure) {
    window.location.href = '/';
    return;
  }

  const flag = countryFlags[country] || '';
  const cleanProcedure = stripParens(procedure);
  const icon = procedureIcons[cleanProcedure] || '';

  // Find city data from allData
  const cityData = allData.find(d =>
    d.city?.toLowerCase() === cityName.toLowerCase() &&
    d.procedure?.toLowerCase() === procedure.toLowerCase()
  );

  // Populate header dropdowns
  populateHeaderDropdowns();

  // Set city and procedure names with emojis
  const cityHeaderName = document.getElementById('cityHeaderName');
  const cityHeaderProcedure = document.getElementById('cityHeaderProcedure');
  if (cityHeaderName) cityHeaderName.textContent = `${flag} ${cityName}`;
  if (cityHeaderProcedure) cityHeaderProcedure.textContent = `${icon} ${procedure}`;

  // Set city header (large hero text)
  const cityStatsHeader = document.getElementById('cityStatsHeader');

  // Set header stats (average price and rating)
  if (cityStatsHeader && cityData && cityData.price_mid_usd) {
    const avgPrice = formatPrice(cityData.price_mid_usd);
    cityStatsHeader.innerHTML = `
      <div class="city-stat-header">
        <div class="city-stat-header-label">AVERAGE PRICE</div>
        <div class="city-stat-header-value">${avgPrice}</div>
      </div>
      <div class="city-stat-header">
        <div class="city-stat-header-label">RATING</div>
        <div class="city-stat-header-rating">★★★★☆ 4.5</div>
      </div>
    `;
  }

  // Render clinics
  renderClinics();

  // Render other procedures
  renderOtherProcedures();

  // Set up inline compare dropdowns
  setupInlineCompare();

  // Update trip calculator if a city is selected
  const departureCity = document.getElementById('departureCity');
  if (departureCity && departureCity.value) {
    calculateTripCost();
  }

  // Back button (if exists)
  const cityBackBtn = document.getElementById('cityBackBtn');
  if (cityBackBtn) {
    cityBackBtn.addEventListener('click', () => {
      window.history.back();
    });
  }

  // Set city name for other procedures
  const cityNameProcedures = document.getElementById('cityNameProcedures');
  if (cityNameProcedures) {
    cityNameProcedures.textContent = cityName;
  }
}


function setupInlineCompare() {
  const city1Select = document.getElementById('inlineCity1Select');
  const city2Select = document.getElementById('inlineCity2Select');
  const procSelect = document.getElementById('inlineProcedureSelect');
  if (!city1Select || !city2Select || !procSelect) return;

  // Populate city dropdowns
  const uniqueCities = [...new Set(allData.map(d => d.city))].filter(Boolean).sort();
  uniqueCities.forEach(city => {
    const cityData = allData.find(d => d.city === city);
    const flag = countryFlags[cityData?.country] || '';

    const opt1 = document.createElement('option');
    opt1.value = city;
    opt1.textContent = `${flag} ${city}`;
    if (city.toLowerCase() === cityName.toLowerCase()) opt1.selected = true;
    city1Select.appendChild(opt1);

    const opt2 = document.createElement('option');
    opt2.value = city;
    opt2.textContent = `${flag} ${city}`;
    city2Select.appendChild(opt2);
  });

  // Populate procedure dropdown
  const uniqueProcedures = [...new Set(allData.map(d => d.procedure))].filter(Boolean).sort();
  uniqueProcedures.forEach(proc => {
    const icon = procedureIcons[stripParens(proc)] || '🏥';
    const opt = document.createElement('option');
    opt.value = proc;
    opt.textContent = `${icon} ${proc}`;
    procSelect.appendChild(opt);
  });

  // Wire up change events
  city1Select.addEventListener('change', runInlineCompare);
  city2Select.addEventListener('change', runInlineCompare);
  procSelect.addEventListener('change', runInlineCompare);
}

function runInlineCompare() {
  const c1 = document.getElementById('inlineCity1Select').value;
  const c2 = document.getElementById('inlineCity2Select').value;
  const selectedProc = document.getElementById('inlineProcedureSelect').value;
  const resultsEl = document.getElementById('inlineComparisonResults');
  const tableEl = document.getElementById('inlineComparisonTable');

  if (!c1 || !c2) {
    resultsEl.style.display = 'none';
    return;
  }

  const c1Data = allData.filter(d => d.city === c1);
  const c2Data = allData.filter(d => d.city === c2);

  let procedures = new Set([
    ...c1Data.map(d => d.procedure),
    ...c2Data.map(d => d.procedure)
  ]);
  if (selectedProc) {
    procedures = new Set([selectedProc]);
  }

  const c1Country = c1Data[0]?.country;
  const c2Country = c2Data[0]?.country;
  const flag1 = countryFlags[c1Country] || '';
  const flag2 = countryFlags[c2Country] || '';

  let html = `
    <div class="comparison-header">
      <div class="comparison-city-col"></div>
      <div class="comparison-city-col comparison-city-header"><a href="city.html?city=${encodeURIComponent(c1)}&country=${encodeURIComponent(c1Country)}&procedure=${encodeURIComponent(selectedProc || 'Botox')}" class="compare-city-link">${flag1} ${c1}</a></div>
      <div class="comparison-city-col comparison-city-header"><a href="city.html?city=${encodeURIComponent(c2)}&country=${encodeURIComponent(c2Country)}&procedure=${encodeURIComponent(selectedProc || 'Botox')}" class="compare-city-link">${flag2} ${c2}</a></div>
    </div>
  `;

  Array.from(procedures).sort().forEach(proc => {
    const p1 = c1Data.find(d => d.procedure === proc);
    const p2 = c2Data.find(d => d.procedure === proc);
    const cleanProc = stripParens(proc);
    const icon = procedureIcons[cleanProc] || '🏥';
    const price1 = p1?.price_mid_usd ? formatPrice(p1.price_mid_usd) : 'N/A';
    const price2 = p2?.price_mid_usd ? formatPrice(p2.price_mid_usd) : 'N/A';

    let cheaper1 = '', cheaper2 = '';
    if (p1 && p2) {
      if (p1.price_mid_usd < p2.price_mid_usd) cheaper1 = 'comparison-cheaper';
      else if (p2.price_mid_usd < p1.price_mid_usd) cheaper2 = 'comparison-cheaper';
    }

    const link1 = p1 ? `city.html?city=${encodeURIComponent(c1)}&procedure=${encodeURIComponent(proc)}&country=${encodeURIComponent(c1Country)}` : '';
    const link2 = p2 ? `city.html?city=${encodeURIComponent(c2)}&procedure=${encodeURIComponent(proc)}&country=${encodeURIComponent(c2Country)}` : '';
    const price1Html = link1 ? `<a href="${link1}" class="compare-price-link ${cheaper1}">${price1}</a>` : `<span class="${cheaper1}">${price1}</span>`;
    const price2Html = link2 ? `<a href="${link2}" class="compare-price-link ${cheaper2}">${price2}</a>` : `<span class="${cheaper2}">${price2}</span>`;

    html += `
      <div class="comparison-row">
        <div class="comparison-procedure-col">${icon} ${proc}</div>
        <div class="comparison-price-col">${price1Html}</div>
        <div class="comparison-price-col">${price2Html}</div>
      </div>
    `;
  });

  tableEl.innerHTML = html;
  resultsEl.style.display = 'block';
}

function renderClinics() {
  const cleanProc = stripParens(procedure).toLowerCase();
  const clinics = clinicData.filter(c =>
    c.City?.toLowerCase() === cityName.toLowerCase() &&
    c.Procedure?.toLowerCase().includes(cleanProc)
  );

  const clinicList = document.getElementById('clinicList');

  if (clinics.length === 0) {
    clinicList.innerHTML = `
      <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 12px; padding: 24px; text-align: center;">
        <h3 style="font-size: 18px; font-weight: 600; margin: 0 0 12px 0; color: #fff;">We're building our ${cityName} clinic database!</h3>
        <p style="color: rgba(255,255,255,0.8); margin: 0 0 20px 0; line-height: 1.6;">
          We're currently adding detailed clinic information for ${cityName}. In the meantime, we can connect you with verified medical tourism providers in this area.
        </p>
      </div>
    `;
    return;
  }

  clinicList.innerHTML = clinics.map(clinic => {
    const priceLow = parseFloat(clinic.Price_USD_Low);
    const priceHigh = parseFloat(clinic.Price_USD_High);
    const stars = '★★★★☆';
    const reviews = Math.floor(Math.random() * 500 + 50);

    return `
      <div class="clinic-card-full">
        <div class="clinic-card-header">
          <div>
            <h3 class="clinic-card-name">${clinic.Clinic_Name}</h3>
            <div class="clinic-card-rating">
              <span class="clinic-card-stars">${stars}</span>
              <span class="clinic-card-reviews">(${reviews} reviews)</span>
            </div>
          </div>
          <div class="clinic-card-price">${formatPrice(priceLow)} – ${formatPrice(priceHigh)}</div>
        </div>
        <div class="clinic-card-details">
          ${clinic.Address ? `<div class="clinic-detail-row"><span class="clinic-detail-label">Address:</span><span>${clinic.Address}</span></div>` : ''}
          ${clinic.Phone ? `<div class="clinic-detail-row"><span class="clinic-detail-label">Phone:</span><span>${clinic.Phone}</span></div>` : ''}
          ${clinic.Certifications ? `<div class="clinic-detail-row"><span class="clinic-detail-label">Certifications:</span><span>${clinic.Certifications}</span></div>` : ''}
          ${clinic.Languages ? `<div class="clinic-detail-row"><span class="clinic-detail-label">Languages:</span><span>${clinic.Languages}</span></div>` : ''}
        </div>
        <div class="clinic-card-footer">
          ${clinic.Website ? `<button class="clinic-btn clinic-btn-primary" onclick="window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'clinic_website_click',clinic_name:'${clinic.Clinic_Name.replace(/'/g, "\\'")}',clinic_website:'${clinic.Website}',city:'${cityName}',procedure:'${procedure}'});window.open('${clinic.Website}', '_blank')">Visit Website</button>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function renderOtherProcedures() {
  const cityProcedures = allData.filter(d =>
    d.city?.toLowerCase() === cityName.toLowerCase() &&
    d.procedure?.toLowerCase() !== procedure.toLowerCase()
  );

  // Get unique procedures
  const uniqueProcedures = [...new Set(cityProcedures.map(d => d.procedure))];
  const procedureCards = document.getElementById('procedureCards');

  if (uniqueProcedures.length === 0) {
    procedureCards.innerHTML = '<p style="color: rgba(255,255,255,0.6);">No other procedures available.</p>';
    return;
  }

  procedureCards.innerHTML = uniqueProcedures.map(proc => {
    const procData = cityProcedures.find(d => d.procedure === proc);
    const cleanProc = stripParens(proc);
    const icon = procedureIcons[cleanProc] || '🏥';
    const price = procData?.price_mid_usd ? formatPrice(procData.price_mid_usd) : 'N/A';

    return `
      <a href="city.html?city=${encodeURIComponent(cityName)}&procedure=${encodeURIComponent(proc)}&country=${encodeURIComponent(country)}" class="procedure-card">
        <div class="procedure-card-icon">${icon}</div>
        <div class="procedure-card-name">${proc}</div>
        <div class="procedure-card-price">${price}</div>
      </a>
    `;
  }).join('');
}


/* =========================
   HAMBURGER MENU
========================= */
const hamburgerMenu = document.getElementById('hamburgerMenu');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');

// Open menu
if (hamburgerMenu) {
  hamburgerMenu.addEventListener('click', () => {
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

// Close menu
if (menuClose) {
  menuClose.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// Close menu when clicking overlay
if (menuOverlay) {
  menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize currency dropdown
  const currencyDropdown = document.getElementById('currencyDropdown');
  if (currencyDropdown) {
    currencyDropdown.value = currentCurrency;
  }

  // Initialize currency selector (legacy support)
  document.querySelectorAll('.currency-option, .currency-option-menu').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.currency === currentCurrency);
  });

  // Load data
  loadData();

  // Setup collapsible sections
  setupCollapsibleSections();
});

/* =========================
   COLLAPSIBLE SECTIONS
========================= */
function setupCollapsibleSections() {
  const toggleButtons = [
    { button: 'toggleClinics', content: 'clinicsContent' },
    { button: 'toggleProcedures', content: 'proceduresContent' },
    { button: 'toggleCompare', content: 'compareContent' }
  ];

  toggleButtons.forEach(({ button, content }) => {
    const btnEl = document.getElementById(button);
    const contentEl = document.getElementById(content);

    if (btnEl && contentEl) {
      btnEl.addEventListener('click', () => {
        const isActive = btnEl.classList.contains('active');

        if (isActive) {
          btnEl.classList.remove('active');
          contentEl.style.display = 'none';
        } else {
          btnEl.classList.add('active');
          contentEl.style.display = 'block';
        }
      });
    }
  });
}

/* =========================
   MENU DESTINATION DROPDOWN
========================= */
let dropdownInitialized = false;

// Populate destination dropdown with unique cities
function populateDestinationDropdown() {
  const menuDestinationSelect = document.getElementById('menuDestinationSelect');

  if (!menuDestinationSelect) {
    console.log('menuDestinationSelect not found');
    return;
  }

  if (!allData || allData.length === 0) {
    console.log('allData not loaded or empty');
    return;
  }

  // Get unique cities sorted alphabetically
  const uniqueCities = [...new Set(allData.map(d => d.city))].filter(Boolean).sort();
  console.log('Populating dropdown with cities:', uniqueCities.length);

  // Clear existing options (except first placeholder)
  menuDestinationSelect.innerHTML = '<option value="" selected>Choose destination...</option>';

  // Add city options
  uniqueCities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    menuDestinationSelect.appendChild(option);
  });

  console.log('Dropdown populated successfully');

  // Add event listener only once
  if (!dropdownInitialized) {
    menuDestinationSelect.addEventListener('change', (e) => {
      const selectedCity = e.target.value;
      console.log('City selected:', selectedCity);

      if (selectedCity) {
        // Get city data to find country
        const cityData = allData.filter(d => d.city === selectedCity);
        console.log('City data found:', cityData.length);

        if (cityData.length > 0) {
          // Navigate to city page with city, country, and current procedure
          const country = cityData[0].country;
          const targetUrl = `city.html?city=${encodeURIComponent(selectedCity)}&country=${encodeURIComponent(country)}&procedure=${encodeURIComponent(procedure)}`;
          console.log('Navigating to:', targetUrl);
          window.location.href = targetUrl;
        } else {
          console.error('No city data found for:', selectedCity);
        }
      }
    });
    dropdownInitialized = true;
    console.log('Dropdown event listener added');
  }
}

/* =========================
   HEADER DROPDOWNS
========================= */
function populateHeaderDropdowns() {
  // Get unique cities and procedures
  const uniqueCities = [...new Set(allData.map(d => d.city))].filter(Boolean).sort();
  const uniqueProcedures = [...new Set(allData.map(d => d.procedure))].filter(Boolean).sort();

  // Populate city page header dropdowns only (not top header)
  const cityHeaderCitySelect = document.getElementById('cityHeaderCitySelect');
  const cityHeaderProcedureSelect = document.getElementById('cityHeaderProcedureSelect');

  if (cityHeaderCitySelect) {
    uniqueCities.forEach(city => {
      const option = document.createElement('option');
      const cityCountry = allData.find(d => d.city === city)?.country;
      const flag = countryFlags[cityCountry] || '';
      option.value = city;
      option.textContent = `${flag} ${city}`;
      if (city === cityName) option.selected = true;
      cityHeaderCitySelect.appendChild(option);
    });

    cityHeaderCitySelect.addEventListener('change', (e) => {
      const selectedCity = e.target.value;
      const cityCountry = allData.find(d => d.city === selectedCity)?.country;
      window.location.href = `city.html?city=${encodeURIComponent(selectedCity)}&country=${encodeURIComponent(cityCountry)}&procedure=${encodeURIComponent(procedure)}`;
    });
  }

  if (cityHeaderProcedureSelect) {
    uniqueProcedures.forEach(proc => {
      const option = document.createElement('option');
      const cleanProc = stripParens(proc);
      const icon = procedureIcons[cleanProc] || '';
      option.value = proc;
      option.textContent = `${icon} ${proc}`;
      if (proc === procedure) option.selected = true;
      cityHeaderProcedureSelect.appendChild(option);
    });

    cityHeaderProcedureSelect.addEventListener('change', (e) => {
      const selectedProcedure = e.target.value;
      window.location.href = `city.html?city=${encodeURIComponent(cityName)}&country=${encodeURIComponent(country)}&procedure=${encodeURIComponent(selectedProcedure)}`;
    });
  }
}

/* =========================
   TRIP CALCULATOR
========================= */
// Region-based flight cost estimation (round-trip USD)
// Each city is assigned a region; costs are estimated by region pairs
const CITY_REGION = {
  // North America — East
  'New York City': 'NA_E', 'Jacksonville': 'NA_E', 'Philadelphia': 'NA_E', 'Toronto': 'NA_E', 'Chicago': 'NA_E', 'Calgary': 'NA_E',
  // North America — South/Central
  'Dallas': 'NA_S', 'Houston': 'NA_S', 'Austin': 'NA_S', 'San Antonio': 'NA_S',
  // North America — West
  'Los Angeles': 'NA_W', 'San Diego': 'NA_W', 'Phoenix': 'NA_W', 'San Jose': 'NA_W', 'Vancouver': 'NA_W',
  // Latin America — Mexico/Central
  'Mexico City': 'LATAM_MX', 'Tijuana': 'LATAM_MX', 'Cancun': 'LATAM_MX',
  // Latin America — South
  'Buenos Aires': 'LATAM_S', 'Rio de Janeiro': 'LATAM_S', 'Bogotá': 'LATAM_S', 'Medellín': 'LATAM_S', 'San Jose': 'LATAM_MX',
  // Western Europe
  'London': 'EU_W', 'Paris': 'EU_W', 'Amsterdam': 'EU_W', 'Brussels': 'EU_W', 'Dublin': 'EU_W', 'Luxembourg': 'EU_W',
  // Central Europe
  'Berlin': 'EU_C', 'Vienna': 'EU_C', 'Zurich': 'EU_C', 'Prague': 'EU_C', 'Warsaw': 'EU_C', 'Budapest': 'EU_C', 'Bratislava': 'EU_C', 'Zagreb': 'EU_C', 'Ljubljana': 'EU_C',
  // Southern Europe
  'Rome': 'EU_S', 'Madrid': 'EU_S', 'Barcelona': 'EU_S', 'Lisbon': 'EU_S', 'Athens': 'EU_S',
  // Northern Europe
  'Stockholm': 'EU_N', 'Copenhagen': 'EU_N', 'Oslo': 'EU_N', 'Helsinki': 'EU_N', 'Tallinn': 'EU_N', 'Riga': 'EU_N', 'Vilnius': 'EU_N',
  // Eastern Europe
  'Moscow': 'EU_E', 'Bucharest': 'EU_E', 'Sofia': 'EU_E',
  // Turkey
  'Istanbul': 'TR', 'Bodrum': 'TR',
  // Middle East
  'Dubai': 'ME', 'Tel Aviv': 'ME', 'Cairo': 'ME',
  // South Asia
  'Delhi': 'SA', 'Mumbai': 'SA',
  // Southeast Asia
  'Bangkok': 'SEA', 'Singapore': 'SEA', 'Kuala Lumpur': 'SEA', 'Ho Chi Minh City': 'SEA', 'Bali': 'SEA', 'Jakarta': 'SEA', 'Manila': 'SEA',
  // East Asia
  'Seoul': 'EA', 'Tokyo': 'EA', 'Beijing': 'EA', 'Shanghai': 'EA', 'Hong Kong': 'EA', 'Taipei': 'EA',
  // Central Asia
  'Almaty': 'CA',
  // Oceania
  'Sydney': 'OC', 'Melbourne': 'OC',
  // Africa
  'Cape Town': 'AF'
};

// Average round-trip flight costs between regions (USD)
const REGION_FLIGHT = {
  // Same region
  'NA_E-NA_E': 200, 'NA_S-NA_S': 150, 'NA_W-NA_W': 100, 'EU_W-EU_W': 150, 'EU_C-EU_C': 120, 'EU_S-EU_S': 150, 'EU_N-EU_N': 150, 'EU_E-EU_E': 200, 'SEA-SEA': 150, 'EA-EA': 200, 'LATAM_MX-LATAM_MX': 150, 'LATAM_S-LATAM_S': 250, 'TR-TR': 100, 'ME-ME': 200, 'SA-SA': 150, 'OC-OC': 200, 'CA-CA': 150, 'AF-AF': 200,
  // NA East ↔ other regions
  'NA_E-NA_S': 200, 'NA_E-NA_W': 350, 'NA_E-LATAM_MX': 350, 'NA_E-LATAM_S': 700, 'NA_E-EU_W': 600, 'NA_E-EU_C': 650, 'NA_E-EU_S': 650, 'NA_E-EU_N': 700, 'NA_E-EU_E': 750, 'NA_E-TR': 700, 'NA_E-ME': 800, 'NA_E-SA': 950, 'NA_E-SEA': 900, 'NA_E-EA': 950, 'NA_E-CA': 900, 'NA_E-OC': 1200, 'NA_E-AF': 1000,
  // NA South ↔ other regions
  'NA_S-NA_W': 200, 'NA_S-LATAM_MX': 250, 'NA_S-LATAM_S': 650, 'NA_S-EU_W': 700, 'NA_S-EU_C': 750, 'NA_S-EU_S': 700, 'NA_S-EU_N': 800, 'NA_S-EU_E': 800, 'NA_S-TR': 800, 'NA_S-ME': 850, 'NA_S-SA': 1000, 'NA_S-SEA': 950, 'NA_S-EA': 950, 'NA_S-CA': 950, 'NA_S-OC': 1200, 'NA_S-AF': 1050,
  // NA West ↔ other regions
  'NA_W-LATAM_MX': 250, 'NA_W-LATAM_S': 750, 'NA_W-EU_W': 750, 'NA_W-EU_C': 800, 'NA_W-EU_S': 800, 'NA_W-EU_N': 850, 'NA_W-EU_E': 850, 'NA_W-TR': 900, 'NA_W-ME': 950, 'NA_W-SA': 1000, 'NA_W-SEA': 800, 'NA_W-EA': 750, 'NA_W-CA': 900, 'NA_W-OC': 1000, 'NA_W-AF': 1100,
  // Latin America MX ↔ other regions
  'LATAM_MX-LATAM_S': 500, 'LATAM_MX-EU_W': 700, 'LATAM_MX-EU_C': 750, 'LATAM_MX-EU_S': 700, 'LATAM_MX-EU_N': 800, 'LATAM_MX-EU_E': 850, 'LATAM_MX-TR': 900, 'LATAM_MX-ME': 1000, 'LATAM_MX-SA': 1100, 'LATAM_MX-SEA': 1050, 'LATAM_MX-EA': 1000, 'LATAM_MX-CA': 1050, 'LATAM_MX-OC': 1200, 'LATAM_MX-AF': 1100,
  // Latin America South ↔ other regions
  'LATAM_S-EU_W': 800, 'LATAM_S-EU_C': 850, 'LATAM_S-EU_S': 800, 'LATAM_S-EU_N': 900, 'LATAM_S-EU_E': 950, 'LATAM_S-TR': 950, 'LATAM_S-ME': 1050, 'LATAM_S-SA': 1100, 'LATAM_S-SEA': 1100, 'LATAM_S-EA': 1150, 'LATAM_S-CA': 1100, 'LATAM_S-OC': 1300, 'LATAM_S-AF': 1000,
  // EU West ↔ other regions
  'EU_W-EU_C': 150, 'EU_W-EU_S': 150, 'EU_W-EU_N': 200, 'EU_W-EU_E': 250, 'EU_W-TR': 250, 'EU_W-ME': 450, 'EU_W-SA': 550, 'EU_W-SEA': 650, 'EU_W-EA': 750, 'EU_W-CA': 500, 'EU_W-OC': 1100, 'EU_W-AF': 700,
  // EU Central ↔ other regions
  'EU_C-EU_S': 150, 'EU_C-EU_N': 150, 'EU_C-EU_E': 200, 'EU_C-TR': 200, 'EU_C-ME': 400, 'EU_C-SA': 500, 'EU_C-SEA': 600, 'EU_C-EA': 700, 'EU_C-CA': 450, 'EU_C-OC': 1050, 'EU_C-AF': 650,
  // EU South ↔ other regions
  'EU_S-EU_N': 250, 'EU_S-EU_E': 200, 'EU_S-TR': 200, 'EU_S-ME': 400, 'EU_S-SA': 500, 'EU_S-SEA': 650, 'EU_S-EA': 750, 'EU_S-CA': 500, 'EU_S-OC': 1100, 'EU_S-AF': 600,
  // EU North ↔ other regions
  'EU_N-EU_E': 200, 'EU_N-TR': 300, 'EU_N-ME': 500, 'EU_N-SA': 600, 'EU_N-SEA': 700, 'EU_N-EA': 750, 'EU_N-CA': 500, 'EU_N-OC': 1100, 'EU_N-AF': 750,
  // EU East ↔ other regions
  'EU_E-TR': 200, 'EU_E-ME': 400, 'EU_E-SA': 500, 'EU_E-SEA': 650, 'EU_E-EA': 700, 'EU_E-CA': 350, 'EU_E-OC': 1100, 'EU_E-AF': 700,
  // Turkey ↔ other regions
  'TR-ME': 250, 'TR-SA': 450, 'TR-SEA': 650, 'TR-EA': 800, 'TR-CA': 400, 'TR-OC': 1050, 'TR-AF': 600,
  // Middle East ↔ other regions
  'ME-SA': 300, 'ME-SEA': 500, 'ME-EA': 700, 'ME-CA': 400, 'ME-OC': 900, 'ME-AF': 550,
  // South Asia ↔ other regions
  'SA-SEA': 300, 'SA-EA': 550, 'SA-CA': 350, 'SA-OC': 800, 'SA-AF': 700,
  // Southeast Asia ↔ other regions
  'SEA-EA': 350, 'SEA-CA': 500, 'SEA-OC': 450, 'SEA-AF': 850,
  // East Asia ↔ other regions
  'EA-CA': 500, 'EA-OC': 650, 'EA-AF': 1000,
  // Central Asia ↔ other regions
  'CA-OC': 900, 'CA-AF': 750,
  // Oceania ↔ Africa
  'OC-AF': 1100
};

function getFlightCost(from, to) {
  if (from === to) return 0;
  const r1 = CITY_REGION[from];
  const r2 = CITY_REGION[to];
  if (!r1 || !r2) return 700;
  if (r1 === r2) {
    return REGION_FLIGHT[`${r1}-${r2}`] || 200;
  }
  return REGION_FLIGHT[`${r1}-${r2}`] || REGION_FLIGHT[`${r2}-${r1}`] || 700;
}

// Average 7-night hotel costs (USD)
const HOTEL_COSTS = {
  // Southeast Asia
  'Bangkok': 350, 'Ho Chi Minh City': 280, 'Kuala Lumpur': 320, 'Bali': 350, 'Jakarta': 300, 'Manila': 250, 'Singapore': 700,
  // East Asia
  'Seoul': 550, 'Tokyo': 750, 'Beijing': 400, 'Shanghai': 450, 'Hong Kong': 700, 'Taipei': 400,
  // South Asia
  'Delhi': 250, 'Mumbai': 300,
  // Turkey
  'Istanbul': 400, 'Bodrum': 450,
  // Middle East / North Africa
  'Dubai': 700, 'Tel Aviv': 750, 'Cairo': 250,
  // Western Europe
  'London': 900, 'Paris': 850, 'Amsterdam': 750, 'Brussels': 600, 'Dublin': 700, 'Luxembourg': 650,
  // Central Europe
  'Berlin': 550, 'Vienna': 600, 'Zurich': 900, 'Prague': 400, 'Warsaw': 350, 'Budapest': 350, 'Bratislava': 350, 'Zagreb': 350, 'Ljubljana': 350,
  // Southern Europe
  'Rome': 600, 'Madrid': 500, 'Barcelona': 550, 'Lisbon': 450, 'Athens': 400,
  // Northern Europe
  'Stockholm': 650, 'Copenhagen': 700, 'Oslo': 750, 'Helsinki': 600, 'Tallinn': 350, 'Riga': 300, 'Vilnius': 300,
  // Eastern Europe
  'Moscow': 450, 'Bucharest': 300, 'Sofia': 250,
  // North America
  'New York City': 1050, 'Los Angeles': 800, 'Chicago': 700, 'Dallas': 550, 'Houston': 550, 'Austin': 600, 'San Antonio': 500, 'San Diego': 700, 'Phoenix': 500, 'Jacksonville': 500, 'Philadelphia': 600, 'San Jose': 750, 'Toronto': 650, 'Calgary': 500, 'Vancouver': 600,
  // Latin America
  'Mexico City': 350, 'Tijuana': 250, 'Cancun': 500, 'Buenos Aires': 350, 'Rio de Janeiro': 400, 'Bogotá': 300, 'Medellín': 280,
  // Central Asia
  'Almaty': 300,
  // Oceania
  'Sydney': 750, 'Melbourne': 650,
  // Africa
  'Cape Town': 400
};

// Populate departure city dropdown
function populateDepartureCities() {
  const departureSelect = document.getElementById('departureCity');
  if (!departureSelect) return;

  // Get all unique cities that have region data (for flight estimation)
  const dataCities = [...new Set(allData.map(d => d.city))];
  const cities = Object.keys(CITY_REGION)
    .filter(city => dataCities.includes(city))
    .sort();

  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    departureSelect.appendChild(option);
  });

  // Add change event listener
  departureSelect.addEventListener('change', calculateTripCost);
}

function calculateTripCost() {
  const departureCity = document.getElementById('departureCity')?.value;
  const resultsDiv = document.getElementById('tripCalculatorResults');

  if (!departureCity || !resultsDiv) return;

  // Get current city and procedure from URL
  const arrivalCity = cityName;
  const procedureName = procedure;

  // Get flight cost
  const flightCost = getFlightCost(departureCity, arrivalCity);

  // Get hotel cost
  const hotelCost = HOTEL_COSTS[arrivalCity] || 400;

  // Strip parentheses for matching
  const cleanProcedureName = stripParens(procedureName);

  // Get procedure cost (from current page data)
  const procedureCost = allData.find(d =>
    d.city?.toLowerCase() === arrivalCity.toLowerCase() &&
    stripParens(d.procedure || '').toLowerCase() === cleanProcedureName.toLowerCase()
  )?.price_mid_usd || 2000;

  // Get procedure cost in departure city (if available)
  const homeProcedureCost = allData.find(d =>
    d.city?.toLowerCase() === departureCity.toLowerCase() &&
    stripParens(d.procedure || '').toLowerCase() === cleanProcedureName.toLowerCase()
  )?.price_mid_usd;

  // Calculate totals
  const totalTripCost = flightCost + hotelCost + procedureCost;
  const savings = homeProcedureCost ? (homeProcedureCost - totalTripCost) : null;

  // Render results — savings/total banner at top, breakdown below
  resultsDiv.innerHTML = `
    ${homeProcedureCost && savings && savings > 0 ? `
      <div class="trip-savings-banner">
        <div class="savings-icon">💰</div>
        <div class="savings-content">
          <div class="savings-amount">Save ${formatPrice(savings)}</div>
          <div class="savings-subtitle">Even with flight + hotel included</div>
        </div>
      </div>
    ` : homeProcedureCost && savings && savings < 0 ? `
      <div class="trip-cost-more-banner">
        <div class="cost-more-icon">✈️</div>
        <div class="cost-more-content">
          <div class="cost-more-amount">Only ${formatPrice(Math.abs(savings))} more</div>
          <div class="cost-more-subtitle">For a medical vacation with flight + hotel included</div>
        </div>
      </div>
    ` : !homeProcedureCost ? `
      <div class="trip-note">
        Estimated costs based on average flight and hotel prices. Actual costs may vary.
      </div>
    ` : ''}

    <div class="trip-breakdown">
      <div class="trip-breakdown-title">Trip Cost Breakdown:</div>
      <div class="trip-row">
        <div class="trip-row-label">
          <span class="trip-row-icon">✈️</span>
          Round-trip flight (${departureCity} → ${arrivalCity})
        </div>
        <div class="trip-row-value">${formatPrice(flightCost)}</div>
      </div>

      <div class="trip-row">
        <div class="trip-row-label">
          <span class="trip-row-icon">🏨</span>
          7-night hotel in ${arrivalCity}
        </div>
        <div class="trip-row-value">${formatPrice(hotelCost)}</div>
      </div>

      <div class="trip-row">
        <div class="trip-row-label">
          <span class="trip-row-icon">💉</span>
          ${procedureName} procedure
        </div>
        <div class="trip-row-value">${formatPrice(procedureCost)}</div>
      </div>

      <div class="trip-row trip-row-total">
        <div class="trip-row-label">Total Trip Cost</div>
        <div class="trip-row-value trip-total-value">${formatPrice(totalTripCost)}</div>
      </div>

      ${homeProcedureCost ? `
        <div class="trip-row trip-row-comparison">
          <div class="trip-row-label">${procedureName} in ${departureCity}</div>
          <div class="trip-row-value">${formatPrice(homeProcedureCost)}</div>
        </div>
      ` : ''}
    </div>
  `;

  resultsDiv.classList.add('visible');
}
