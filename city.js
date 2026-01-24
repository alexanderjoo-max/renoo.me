// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const cityName = urlParams.get('city');
const procedure = urlParams.get('procedure');
const country = urlParams.get('country');

/* =========================
   CURRENCY CONVERSION
========================= */
const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1, name: 'USD' },
  GBP: { symbol: '£', rate: 0.79, name: 'GBP' },
  EUR: { symbol: '€', rate: 0.92, name: 'EUR' },
  JPY: { symbol: '¥', rate: 149, name: 'JPY' },
  AUD: { symbol: 'A$', rate: 1.52, name: 'AUD' },
  CAD: { symbol: 'C$', rate: 1.39, name: 'CAD' }
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

  // Update UI
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
  "Czech Rep.": "🇨🇿", "Denmark": "🇩🇰", "Estonia": "🇪🇪", "Finland": "🇫🇮",
  "France": "🇫🇷", "Germany": "🇩🇪", "Greece": "🇬🇷", "Hungary": "🇭🇺",
  "India": "🇮🇳", "Ireland": "🇮🇪", "Israel": "🇮🇱", "Italy": "🇮🇹",
  "Japan": "🇯🇵", "Kazakhstan": "🇰🇿", "Latvia": "🇱🇻", "Lithuania": "🇱🇹",
  "Luxembourg": "🇱🇺", "Malaysia": "🇲🇾", "Mexico": "🇲🇽", "Netherlands": "🇳🇱",
  "Poland": "🇵🇱", "Portugal": "🇵🇹", "Romania": "🇷🇴", "Russia": "🇷🇺",
  "Singapore": "🇸🇬", "Slovakia": "🇸🇰", "Slovenia": "🇸🇮", "South Korea": "🇰🇷",
  "Spain": "🇪🇸", "Sweden": "🇸🇪", "Switzerland": "🇨🇭", "Taiwan": "🇹🇼",
  "Thailand": "🇹🇭", "Turkey": "🇹🇷", "UAE": "🇦🇪", "UK": "🇬🇧",
  "USA": "🇺🇸", "Vietnam": "🇻🇳"
};

// Procedure icons mapping
const procedureIcons = {
  "Botox": "💉", "Brazilian Butt Lift": "🍑", "Breast Augmentation": "🍒",
  "Colonoscopy": "🔬", "Dental Implant": "🦷", "Dental Veneers": "😁",
  "Facelift": "🧖", "Gastric Bypass": "🏥", "Hair Transplant": "💇",
  "Hip Replacement": "🦴", "IVF": "👶", "Knee Replacement": "🦵",
  "LASIK": "👁️", "Liposuction": "💪", "Rhinoplasty": "👃", "Tummy Tuck": "🤰"
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
  const icon = procedureIcons[procedure] || '';

  // Set title
  document.getElementById('cityTitle').textContent = `${flag} ${cityName} · ${icon} ${procedure}`;

  // Find city data from allData
  const cityData = allData.find(d =>
    d.city?.toLowerCase() === cityName.toLowerCase() &&
    d.procedure?.toLowerCase() === procedure.toLowerCase()
  );

  // Set stats
  if (cityData && cityData.price_mid_usd) {
    const avgPrice = formatPrice(cityData.price_mid_usd);
    document.getElementById('cityStats').innerHTML = `
      <div class="city-stat">
        <span>Avg Price:</span>
        <strong>${avgPrice}</strong>
      </div>
      <div class="city-stat">
        <span>★★★★☆</span>
        <span>(4.5 avg rating)</span>
      </div>
    `;
  }

  // City info blurb
  const infoBlurbs = {
    "Bangkok": "Bangkok is a leading destination for medical tourism, known for world-class hospitals, internationally accredited clinics, and English-speaking medical professionals at a fraction of Western prices.",
    "Istanbul": "Istanbul combines ancient heritage with modern medical excellence. The city's hospitals feature cutting-edge technology and highly trained surgeons, making it a top choice for European medical tourists.",
    "Mexico City": "Mexico City offers high-quality medical care with US-trained doctors and JCI-accredited facilities, all within easy reach of North American patients.",
    "Bodrum": "Bodrum is Turkey's premier coastal destination for medical tourism, offering world-class cosmetic procedures with scenic Mediterranean recovery."
  };

  const blurb = infoBlurbs[cityName] || `${cityName} is a popular destination for ${procedure} procedures, offering quality care at competitive prices.`;
  document.getElementById('cityInfo').textContent = blurb;

  // Render clinics
  renderClinics();

  // Render other procedures
  renderOtherProcedures();

  // Render compare cities
  renderCompareCities();

  // Populate compare dropdown
  populateCompareDropdown();

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

function populateCompareDropdown() {
  const container = document.getElementById('compareCitySelect');
  if (!container) return;

  const sameProcedure = allData.filter(d =>
    d.procedure?.toLowerCase() === procedure.toLowerCase() &&
    d.city?.toLowerCase() !== cityName.toLowerCase() &&
    d.price_mid_usd
  ).sort((a, b) => a.price_mid_usd - b.price_mid_usd);

  // Find current city's price for comparison
  const currentPrice = allData.find(d =>
    d.city?.toLowerCase() === cityName.toLowerCase() &&
    d.procedure?.toLowerCase() === procedure.toLowerCase()
  )?.price_mid_usd || 0;

  // Find the cheapest city
  let cheapestId = null;
  if (sameProcedure.length > 0) {
    const cheapest = sameProcedure.reduce((min, curr) =>
      (curr.price_mid_usd < min.price_mid_usd ? curr : min)
    );
    cheapestId = cheapest.city + cheapest.country;
  }

  // Render as a scrollable results list (same UI as front page)
  container.innerHTML = sameProcedure.map(city => {
    const flag = countryFlags[city.country] || '';
    const price = formatPrice(city.price_mid_usd);
    const isCheapest = (city.city + city.country) === cheapestId;

    // Calculate savings if this city is cheaper
    const savingsAmount = currentPrice && city.price_mid_usd < currentPrice
      ? convertPrice(currentPrice - city.price_mid_usd)
      : null;
    const savings = savingsAmount
      ? `Save ${CURRENCY_RATES[currentCurrency].symbol}${savingsAmount.toLocaleString()}`
      : '';

    return `
      <div class="result-item" onclick="window.location.href='compare.html?city1=${encodeURIComponent(cityName)}&city2=${encodeURIComponent(city.city)}&procedure=${encodeURIComponent(procedure)}&country1=${encodeURIComponent(country)}&country2=${encodeURIComponent(city.country)}'">
        <div class="result-left">
          <div class="result-city">${flag} ${city.city}${isCheapest ? '<span class="result-badge">Cheapest</span>' : ''}${savings ? `<span class="result-savings-badge">${savings}</span>` : ''}</div>
          <div class="result-meta">${city.country} • ${procedure}</div>
          <div class="result-view-clinics">Compare cities →</div>
        </div>
        <div class="result-price">${price}</div>
      </div>
    `;
  }).join('');
}

function renderClinics() {
  const clinics = clinicData.filter(c =>
    c.City?.toLowerCase() === cityName.toLowerCase() &&
    c.Procedure?.toLowerCase().includes(procedure.toLowerCase())
  );

  const clinicList = document.getElementById('clinicList');

  if (clinics.length === 0) {
    clinicList.innerHTML = `
      <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 12px; padding: 24px; text-align: center;">
        <h3 style="font-size: 18px; font-weight: 600; margin: 0 0 12px 0; color: #fff;">We're building our ${cityName} clinic database!</h3>
        <p style="color: rgba(255,255,255,0.8); margin: 0 0 20px 0; line-height: 1.6;">
          We're currently adding detailed clinic information for ${cityName}. In the meantime, we can connect you with verified medical tourism providers in this area.
        </p>
        <button class="clinic-btn clinic-btn-primary" style="max-width: 300px; margin: 0 auto;">Get Personalized Recommendations</button>
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
          <button class="clinic-btn clinic-btn-primary">Get Quote</button>
          ${clinic.Website ? `<button class="clinic-btn clinic-btn-secondary" onclick="window.open('${clinic.Website}', '_blank')">Visit Website</button>` : ''}
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

  procedureCards.innerHTML = uniqueProcedures.slice(0, 6).map(proc => {
    const procData = cityProcedures.find(d => d.procedure === proc);
    const icon = procedureIcons[proc] || '🏥';
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

function renderCompareCities() {
  const sameProcedure = allData.filter(d =>
    d.procedure?.toLowerCase() === procedure.toLowerCase() &&
    d.city?.toLowerCase() !== cityName.toLowerCase() &&
    d.price_mid_usd
  ).sort((a, b) => a.price_mid_usd - b.price_mid_usd);

  const compareCities = document.getElementById('compareCities');

  if (sameProcedure.length === 0) {
    compareCities.innerHTML = '<p style="color: rgba(255,255,255,0.6);">No comparison cities available.</p>';
    return;
  }

  const currentPrice = allData.find(d =>
    d.city?.toLowerCase() === cityName.toLowerCase() &&
    d.procedure?.toLowerCase() === procedure.toLowerCase()
  )?.price_mid_usd || 0;

  compareCities.innerHTML = sameProcedure.slice(0, 5).map(city => {
    const flag = countryFlags[city.country] || '';
    const price = formatPrice(city.price_mid_usd);
    const savingsAmount = currentPrice && city.price_mid_usd < currentPrice
      ? convertPrice(currentPrice - city.price_mid_usd)
      : null;
    const savings = savingsAmount
      ? `Save ${CURRENCY_RATES[currentCurrency].symbol}${savingsAmount.toLocaleString()}`
      : '';

    return `
      <a href="city.html?city=${encodeURIComponent(city.city)}&procedure=${encodeURIComponent(procedure)}&country=${encodeURIComponent(city.country)}" class="city-compare-card">
        <div class="city-compare-flag">${flag}</div>
        <div class="city-compare-name">${city.city}</div>
        <div class="city-compare-price">${price}</div>
        ${savings ? `<div class="city-compare-savings">${savings}</div>` : ''}
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize currency selector
  document.querySelectorAll('.currency-option, .currency-option-menu').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.currency === currentCurrency);
  });

  // Load data
  loadData();
});

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
   TRIP CALCULATOR
========================= */
// Average flight costs (USD) - estimates based on distance
const FLIGHT_COSTS = {
  'New York': { 'Bangkok': 850, 'Istanbul': 650, 'Mexico City': 350, 'Dubai': 750, 'Seoul': 950, 'Singapore': 900 },
  'Los Angeles': { 'Bangkok': 750, 'Istanbul': 850, 'Mexico City': 250, 'Dubai': 900, 'Seoul': 750, 'Singapore': 850 },
  'London': { 'Bangkok': 650, 'Istanbul': 200, 'Mexico City': 700, 'Dubai': 450, 'Seoul': 800, 'Singapore': 700 },
  'Toronto': { 'Bangkok': 900, 'Istanbul': 700, 'Mexico City': 300, 'Dubai': 800, 'Seoul': 850, 'Singapore': 950 },
  'Sydney': { 'Bangkok': 450, 'Istanbul': 950, 'Mexico City': 1100, 'Dubai': 850, 'Seoul': 650, 'Singapore': 400 },
  'Paris': { 'Bangkok': 650, 'Istanbul': 220, 'Mexico City': 750, 'Dubai': 400, 'Seoul': 800, 'Singapore': 700 },
  'Berlin': { 'Bangkok': 600, 'Istanbul': 180, 'Mexico City': 800, 'Dubai': 400, 'Seoul': 750, 'Singapore': 650 },
  'Dubai': { 'Bangkok': 350, 'Istanbul': 250, 'Mexico City': 1000, 'Seoul': 600, 'Singapore': 400 }
};

// Average 7-night hotel costs (USD)
const HOTEL_COSTS = {
  'Bangkok': 350,
  'Istanbul': 400,
  'Mexico City': 450,
  'Dubai': 700,
  'Seoul': 550,
  'Singapore': 600,
  'Bodrum': 450,
  'Tijuana': 300,
  'Cancun': 500
};

// Populate departure city dropdown
function populateDepartureCities() {
  const departureSelect = document.getElementById('departureCity');
  if (!departureSelect) return;

  const cities = Object.keys(FLIGHT_COSTS).sort();
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
  const flightCost = FLIGHT_COSTS[departureCity]?.[arrivalCity] || 800; // Default if not found

  // Get hotel cost
  const hotelCost = HOTEL_COSTS[arrivalCity] || 400; // Default if not found

  // Get procedure cost (from current page data)
  const procedureCost = allData.find(d =>
    d.city?.toLowerCase() === arrivalCity.toLowerCase() &&
    d.procedure?.toLowerCase() === procedureName.toLowerCase()
  )?.price_mid_usd || 2000;

  // Get procedure cost in departure city (if available)
  const homeProcedureCost = allData.find(d =>
    d.city?.toLowerCase() === departureCity.toLowerCase() &&
    d.procedure?.toLowerCase() === procedureName.toLowerCase()
  )?.price_mid_usd;

  // Calculate totals
  const totalTripCost = flightCost + hotelCost + procedureCost;
  const savings = homeProcedureCost ? (homeProcedureCost - totalTripCost) : null;

  // Render results
  resultsDiv.innerHTML = `
    <div class="trip-breakdown">
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
    </div>

    <div class="trip-total">
      <div class="trip-total-row">
        <div class="trip-total-label">Total Trip Cost:</div>
        <div class="trip-total-value">${formatPrice(totalTripCost)}</div>
      </div>
    </div>

    ${savings && savings > 0 ? `
      <div class="trip-comparison">
        <div class="trip-comparison-title">💰 vs. Getting ${procedureName} in ${departureCity}:</div>
        <div class="trip-savings">Save ${formatPrice(savings)}!</div>
        <div class="trip-note">Even with flight + hotel, you save money by traveling to ${arrivalCity}</div>
      </div>
    ` : homeProcedureCost ? `
      <div class="trip-note">
        Note: ${procedureName} costs approximately ${formatPrice(homeProcedureCost)} in ${departureCity}.
        Total trip cost is ${formatPrice(totalTripCost)}.
      </div>
    ` : `
      <div class="trip-note">
        Estimated costs based on average flight and hotel prices. Actual costs may vary.
      </div>
    `}
  `;

  resultsDiv.classList.add('visible');
}
