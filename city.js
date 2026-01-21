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
  EUR: { symbol: '€', rate: 0.92, name: 'EUR' }
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
  document.querySelectorAll('.currency-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.currency === currency);
  });

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

  // Back button
  document.getElementById('cityBackBtn').addEventListener('click', () => {
    window.history.back();
  });

  // Set city name for other procedures
  document.getElementById('cityNameProcedures').textContent = cityName;
}

function populateCompareDropdown() {
  const select = document.getElementById('compareCitySelect');
  if (!select) return;

  const sameProcedure = allData.filter(d =>
    d.procedure?.toLowerCase() === procedure.toLowerCase() &&
    d.city?.toLowerCase() !== cityName.toLowerCase() &&
    d.price_mid_usd
  ).sort((a, b) => a.price_mid_usd - b.price_mid_usd);

  // Populate dropdown
  sameProcedure.slice(0, 20).forEach(city => {
    const option = document.createElement('option');
    const flag = countryFlags[city.country] || '';
    option.value = JSON.stringify({ city: city.city, country: city.country });
    option.textContent = `${flag} ${city.city} - ${formatPrice(city.price_mid_usd)}`;
    select.appendChild(option);
  });

  // Handle selection
  select.addEventListener('change', (e) => {
    if (e.target.value) {
      const { city: selectedCity, country: selectedCountry } = JSON.parse(e.target.value);
      window.location.href = `compare.html?city1=${encodeURIComponent(cityName)}&city2=${encodeURIComponent(selectedCity)}&procedure=${encodeURIComponent(procedure)}&country1=${encodeURIComponent(country)}&country2=${encodeURIComponent(selectedCountry)}`;
    }
  });
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

// Initialize currency selector on page load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.currency-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.currency === currentCurrency);
  });
});

// Load data on page load
loadData();
