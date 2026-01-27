mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxleGFuZGVyam9vIiwiYSI6ImNtazN1bXo5bDAwdmIzY291bXpvMGNldGoifQ.LpYK8I3J4Tt0AZY4KGEBNQ";

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

  // Refresh all prices by re-rendering with current filters
  if (currentFiltered && currentFiltered.length > 0) {
    renderMarkers(currentFiltered);
    renderResults(currentFiltered);
    renderCompareBox(currentFiltered);
  }
}

/* =========================
   MAP INIT
========================= */
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [0, 20],
  zoom: 1.4
});

let markers = [];

/* =========================
   DOM HOOKS
========================= */
const els = {
  panel: document.getElementById("panel"),
  panelHandle: document.getElementById("panelHandle"),
  procedureSelect: document.getElementById("procedureSelect"),
  citySearch: document.getElementById("citySearch"),
  countrySelect: document.getElementById("countrySelect"),
  sortSelect: document.getElementById("sortSelect"),
  resultsList: document.getElementById("resultsList"),
  floatingCompareBar: document.getElementById("floatingCompareBar"),
  floatingCompareCount: document.getElementById("floatingCompareCount"),
  floatingComparePreview: document.getElementById("floatingComparePreview"),
  floatingCompareClear: document.getElementById("floatingCompareClear"),
  floatingCompareDiff: document.getElementById("floatingCompareDiff"),
  compareModeToggle: document.getElementById("compareModeToggle")
};

let isCompareMode = false;

/* =========================
   MOBILE RESIZE (drag handle)
   (single implementation; iOS-friendly)
========================= */
(function initPanelResizer() {
  const panel = els.panel;
  const handle = els.panelHandle;
  if (!panel || !handle) return;

  // Also make swipe hint draggable
  const swipeHint = document.querySelector('.swipe-hint');

  let startY = 0;
  let startH = 0;
  let dragging = false;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const onDown = (e) => {
    dragging = true;
    startY = e.clientY;
    startH = panel.getBoundingClientRect().height;

    const target = e.currentTarget;
    target.setPointerCapture?.(e.pointerId);

    // prevent iOS overscroll / page pull-to-refresh while dragging
    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";

    e.preventDefault();
  };

  const onMove = (e) => {
    if (!dragging) return;

    const dy = startY - e.clientY; // drag up => increase height
    const vh = window.innerHeight;

    const minH = Math.round(vh * 0.22);
    const maxH = Math.round(vh * 0.90);

    const next = clamp(startH + dy, minH, maxH);
    panel.style.height = `${next}px`;

    e.preventDefault();
  };

  const onUp = () => {
    dragging = false;
    document.body.style.overflow = "";
    document.documentElement.style.overscrollBehavior = "";
  };

  handle.addEventListener("pointerdown", onDown);
  if (swipeHint) {
    swipeHint.addEventListener("pointerdown", onDown);
  }
  window.addEventListener("pointermove", onMove, { passive: false });
  window.addEventListener("pointerup", onUp);
})();

/* =========================
   FLAGS
========================= */
const COUNTRY_TO_ISO2 = {
  Argentina: "AR",
  Australia: "AU",
  Austria: "AT",
  Belgium: "BE",
  Brazil: "BR",
  Bulgaria: "BG",
  Canada: "CA",
  China: "CN",
  Colombia: "CO",
  "Costa Rica": "CR",
  Croatia: "HR",
  Cyprus: "CY",
  "Czech Rep.": "CZ",
  "Czech Republic": "CZ",
  Denmark: "DK",
  Egypt: "EG",
  Estonia: "EE",
  Finland: "FI",
  France: "FR",
  Germany: "DE",
  Greece: "GR",
  Hungary: "HU",
  India: "IN",
  Indonesia: "ID",
  Ireland: "IE",
  Israel: "IL",
  Italy: "IT",
  Japan: "JP",
  Kazakhstan: "KZ",
  Latvia: "LV",
  Lithuania: "LT",
  Luxembourg: "LU",
  Malaysia: "MY",
  Mexico: "MX",
  Netherlands: "NL",
  Norway: "NO",
  Philippines: "PH",
  Poland: "PL",
  Portugal: "PT",
  Romania: "RO",
  Russia: "RU",
  Singapore: "SG",
  Slovakia: "SK",
  Slovenia: "SI",
  "South Africa": "ZA",
  "South Korea": "KR",
  Spain: "ES",
  Sweden: "SE",
  Switzerland: "CH",
  Taiwan: "TW",
  Thailand: "TH",
  Turkey: "TR",
  UAE: "AE",
  UK: "GB",
  USA: "US",
  Vietnam: "VN"
};

function iso2ToFlagEmoji(iso2) {
  if (!iso2 || typeof iso2 !== "string") return "";
  const code = iso2.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return "";
  const A = 0x1f1e6;
  return String.fromCodePoint(A + code.charCodeAt(0) - 65, A + code.charCodeAt(1) - 65);
}

function flagFromCountry(countryName) {
  const name = (countryName ?? "").toString().trim();
  return iso2ToFlagEmoji(COUNTRY_TO_ISO2[name]);
}

/* =========================
   PROCEDURE DISPLAY HELPERS
   - Remove parentheses + inside
   - Icons in dropdown
   - Cherry emoji for breast augmentation
========================= */
function stripParens(s) {
  return (s ?? "").toString().replace(/\s*\([^)]*\)\s*/g, "").trim();
}

/* Open city page: overlay on desktop, navigate on mobile */
function openCityPage(city, procedure, country) {
  const url = `city.html?city=${encodeURIComponent(city)}&procedure=${encodeURIComponent(stripParens(procedure))}&country=${encodeURIComponent(country)}`;
  if (window.innerWidth > 768) {
    const overlay = document.getElementById('cityOverlay');
    const frame = document.getElementById('cityOverlayFrame');
    frame.src = url + '&embed=1';
    overlay.style.display = 'block';
  } else {
    window.location.href = url;
  }
}

function procedureIcon(cleanName) {
  const key = cleanName.toLowerCase();

  // Cosmetic procedures
  if (key.includes("breast augmentation")) return "🍒";
  if (key.includes("rhinoplasty")) return "👃";
  if (key.includes("hair transplant")) return "💇";
  if (key.includes("liposuction")) return "💪";
  if (key.includes("tummy tuck")) return "🤰";
  if (key.includes("brazilian butt lift")) return "🍑";
  if (key.includes("facelift")) return "🧖";
  if (key.includes("botox")) return "💉";

  // Diagnostic & Vision
  if (key.includes("colonoscopy")) return "🔬";
  if (key.includes("lasik")) return "👁️";

  // Dental
  if (key.includes("dental implant")) return "🦷";
  if (key.includes("dental veneers")) return "😁";

  // Orthopedic
  if (key.includes("knee replacement")) return "🦵";
  if (key.includes("hip replacement")) return "🦴";

  // Weight Loss
  if (key.includes("bariatric surgery")) return "⚖️";
  if (key.includes("gastric bypass")) return "🏥";

  // Fertility
  if (key.includes("ivf")) return "👶";

  return "✨";
}

function procedureLabel(procedureRawOrClean) {
  const clean = stripParens(procedureRawOrClean);
  return `${procedureIcon(clean)} ${clean}`;
}

/* =========================
   PRICE PARSING + GRADIENT
========================= */
function toNumber(v) {
  if (v === null || v === undefined) return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  const s = String(v).replace(/,/g, "").trim();
  if (s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function lerp(a, b, t) { return a + (b - a) * t; }
function hex(n) { return Math.round(n).toString(16).padStart(2, "0"); }
function rgbToHex(r, g, b) { return `#${hex(r)}${hex(g)}${hex(b)}`; }
function lerpColor(c1, c2, t) {
  return rgbToHex(
    lerp(c1[0], c2[0], t),
    lerp(c1[1], c2[1], t),
    lerp(c1[2], c2[2], t)
  );
}

// Green (cheap) -> Yellow -> Orange -> Red (expensive)
function priceToColor(price, min, max) {
  if (!Number.isFinite(price) || !Number.isFinite(min) || !Number.isFinite(max) || min === max) {
    return "#2563eb";
  }
  const t = Math.min(1, Math.max(0, (price - min) / (max - min)));

  const GREEN = [34, 197, 94];
  const YELLOW = [250, 204, 21];
  const ORANGE = [249, 115, 22];
  const RED = [239, 68, 68];

  if (t < 0.33) return lerpColor(GREEN, YELLOW, t / 0.33);
  if (t < 0.66) return lerpColor(YELLOW, ORANGE, (t - 0.33) / 0.33);
  return lerpColor(ORANGE, RED, (t - 0.66) / 0.34);
}

/* =========================
   STATE
========================= */
let ALL = [];
let currentFiltered = [];
let compareSelection = [];

/* =========================
   LOAD DATA
========================= */
fetch("data.json")
  .then((res) => res.json())
  .then((raw) => {
    ALL = (raw || [])
      .map((d, i) => {
        const lat = toNumber(d.lat);
        const lng = toNumber(d.lng);

        const price =
          toNumber(d.price_usd) ??
          toNumber(d.typical_price_usd) ??
          toNumber(d.price_mid_usd) ??
          toNumber(d.typical_price) ??
          null;

        const procedureRaw = (d.procedure ?? "").toString();
        const procedureClean = stripParens(procedureRaw);

        return {
          _id: d.id ?? `${procedureClean}__${d.city ?? ""}__${d.country ?? ""}__${i}`,
          procedure: procedureClean,
          city: (d.city ?? "").toString(),
          country: (d.country ?? "").toString(),
          lat,
          lng,
          price_usd: price
        };
      })
      .filter((d) => Number.isFinite(d.lat) && Number.isFinite(d.lng) && d.city && d.country && d.procedure);

    populateProcedureDropdown(ALL);
    populateCountryDropdown(ALL);
    populateDestinationDropdown();
    wireUI();

    // Set "Botox" as default and load pins on map
    if (els.procedureSelect) {
      els.procedureSelect.value = "Botox";
      applyFiltersAndRender();
    }
  })
  .catch((err) => console.error("Failed to load data.json", err));

/* =========================
   UI WIRING
========================= */
function wireUI() {
  els.procedureSelect?.addEventListener("change", () => {
    compareSelection = [];
    applyFiltersAndRender();
  });

  els.countrySelect?.addEventListener("change", applyFiltersAndRender);
  els.citySearch?.addEventListener("input", debounce(applyFiltersAndRender, 120));
  els.sortSelect?.addEventListener("change", applyFiltersAndRender);

  // desktop sometimes restores selects from bfcache; force placeholder + clear pins/results
  window.addEventListener("pageshow", () => {
    if (!els.procedureSelect) return;
    if (els.procedureSelect.value) return; // user already picked
    clearMarkers();
    currentFiltered = [];
    compareSelection = [];
    renderResults([]);
    renderCompareBox([]);
  });

  // Compare Mode Toggle
  els.compareModeToggle?.addEventListener("change", (e) => {
    isCompareMode = e.target.checked;
    document.body.classList.toggle("compare-mode", isCompareMode);

    if (!isCompareMode) {
      // Exiting compare mode - clear selections
      compareSelection = [];
      renderResults(currentFiltered);
      renderCompareBox(currentFiltered);
    }
  });
}

function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

/* =========================
   DROPDOWNS
========================= */
function populateProcedureDropdown(data) {
  if (!els.procedureSelect) return;

  // keep existing placeholder from HTML (value="")
  const placeholder = els.procedureSelect.querySelector('option[value=""]');
  els.procedureSelect.innerHTML = "";
  if (placeholder) els.procedureSelect.appendChild(placeholder);

  const procedures = [...new Set(data.map((d) => d.procedure))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  for (const p of procedures) {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = procedureLabel(p); // icons for real procedures
    els.procedureSelect.appendChild(opt);
  }

  // force placeholder on load (prevents desktop remembering old selection)
  els.procedureSelect.value = "";
  els.procedureSelect.selectedIndex = 0;
}

function populateCountryDropdown(data) {
  if (!els.countrySelect) return;
  els.countrySelect.innerHTML = "";

  const all = document.createElement("option");
  all.value = "ALL";
  all.textContent = "Filter country";
  els.countrySelect.appendChild(all);

  const countries = [...new Set(data.map((d) => d.country))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  for (const c of countries) {
    const flag = flagFromCountry(c);
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = `${flag ? flag + " " : ""}${c}`;
    els.countrySelect.appendChild(opt);
  }
}

/* =========================
   FILTERING + RENDER
========================= */
function applyFiltersAndRender() {
  const procVal = els.procedureSelect?.value ?? "";
  if (!procVal) {
    // no selection => show NOTHING
    clearMarkers();
    currentFiltered = [];
    renderResults([]);
    renderCompareBox([]);
    return;
  }

  let filtered = ALL.filter((d) => d.procedure === procVal);

  // Top-rated cities for sorting
  const TOP_RATED_SORT = new Set(["Bangkok", "Istanbul", "Seoul"]);

  // Apply sorting based on sort select
  const sortMode = els.sortSelect?.value ?? "price";

  if (sortMode === "rating") {
    // Top Rated first, then by price
    filtered.sort((a, b) => {
      const aTop = TOP_RATED_SORT.has(a.city) ? 0 : 1;
      const bTop = TOP_RATED_SORT.has(b.city) ? 0 : 1;
      if (aTop !== bTop) return aTop - bTop;
      const ap = a.price_usd;
      const bp = b.price_usd;
      const aN = Number.isFinite(ap);
      const bN = Number.isFinite(bp);
      if (aN && bN) return ap - bp;
      if (aN) return -1;
      if (bN) return 1;
      return a.city.localeCompare(b.city);
    });
  } else if (sortMode === "alphabetical") {
    // Sort alphabetically by city name
    filtered.sort((a, b) => a.city.localeCompare(b.city));
  } else {
    // Sort by price: cheapest -> most expensive (nulls last)
    filtered.sort((a, b) => {
      const ap = a.price_usd;
      const bp = b.price_usd;
      const aN = Number.isFinite(ap);
      const bN = Number.isFinite(bp);
      if (aN && bN) return ap - bp;
      if (aN) return -1;
      if (bN) return 1;
      return a.city.localeCompare(b.city);
    });
  }

  currentFiltered = filtered;

  renderMarkers(filtered);
  renderResults(filtered);
  renderCompareBox(filtered);
}

/* =========================
   MARKERS
========================= */
function clearMarkers() {
  markers.forEach((m) => m.remove());
  markers = [];
}

function renderMarkers(data) {
  clearMarkers();

  const prices = data.map((d) => d.price_usd).filter(Number.isFinite);
  const min = prices.length ? Math.min(...prices) : NaN;
  const max = prices.length ? Math.max(...prices) : NaN;

  for (const d of data) {
    const el = document.createElement("div");
    el.className = "price-marker";

    const flag = flagFromCountry(d.country);
    const label = formatPrice(d.price_usd);

    // flags beside price in bubbles
    el.textContent = `${flag ? flag + " " : ""}${label}`;

    // Check if this marker is in compare selection
    const isSelected = compareSelection.includes(d._id);
    
    // price-based color
    el.style.background = priceToColor(d.price_usd, min, max);
    
    // Highlight selected markers with a border
    if (isSelected) {
      el.style.border = "3px solid #ef4444";
      el.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.3), 0 4px 10px rgba(0,0,0,0.18)";
    } else {
      el.style.border = "1px solid rgba(255,255,255,0.35)";
      el.style.boxShadow = "0 4px 10px rgba(0,0,0,0.18)";
    }

    const popupHTML = `
      <div>
        <div class="popup-title">${flag ? flag + " " : ""}${escapeHtml(d.city)}</div>
        <div class="popup-row">${escapeHtml(d.country)}</div>
        <div class="popup-row">${escapeHtml(procedureLabel(d.procedure))}</div>
        <div class="popup-row"><strong>Typical price:</strong> ${formatPrice(d.price_usd)}</div>
        <div class="popup-view-clinics" data-city-id="${d._id}">View Details →</div>
      </div>
    `;

    const popup = new mapboxgl.Popup({ offset: 22 }).setHTML(popupHTML);

    const marker = new mapboxgl.Marker(el)
      .setLngLat([d.lng, d.lat])
      .setPopup(popup)
      .addTo(map);

    // Add click handler for "View Details" button in popup
    popup.on('open', () => {
      const viewClinicsBtn = document.querySelector(`[data-city-id="${d._id}"]`);
      if (viewClinicsBtn) {
        viewClinicsBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openCityPage(d.city, d.procedure, d.country);
        });
      }
    });

    el.addEventListener("click", (e) => {
      if (isCompareMode) {
        // In compare mode, toggle selection instead of opening popup
        e.stopPropagation();
        toggleCompare(d._id);
        renderMarkers(currentFiltered);
        renderResults(currentFiltered);
        renderCompareBox(currentFiltered);
      } else {
        // Normal mode: fly to location and show popup
        map.flyTo({ center: [d.lng, d.lat], zoom: Math.max(map.getZoom(), 4), speed: 0.9 });
        marker.togglePopup();
      }
    });

    markers.push(marker);
  }
}

/* =========================
   RESULTS LIST
========================= */
function renderResults(data) {
  if (!els.resultsList) return;

  if (!els.procedureSelect?.value) {
    els.resultsList.innerHTML =
      `<div class="result-item"><div class="result-left"><div class="result-city">Choose a procedure</div><div class="result-meta">Nothing will show until you pick one</div></div><div class="result-price"></div></div>`;
    return;
  }

  els.resultsList.innerHTML = "";

  if (!data.length) {
    els.resultsList.innerHTML =
      `<div class="result-item"><div class="result-left"><div class="result-city">No results</div><div class="result-meta">Try changing filters</div></div><div class="result-price"></div></div>`;
    return;
  }

  // Find all cheapest results (only if sorting by price) — tag ties
  const sortMode = els.sortSelect?.value ?? "price";
  const cheapestIds = new Set();
  if (sortMode === "price" && data.length > 0) {
    const prices = data.map((d) => ({ id: d._id, price: d.price_usd })).filter((d) => Number.isFinite(d.price));
    if (prices.length > 0) {
      const minPrice = Math.min(...prices.map(p => p.price));
      prices.filter(p => p.price === minPrice).forEach(p => cheapestIds.add(p.id));
    }
  }

  // Top-rated medical tourism destinations
  const TOP_RATED_CITIES = new Set(["Bangkok", "Istanbul", "Seoul"]);

  for (const d of data) {
    const flag = flagFromCountry(d.country);
    const price = formatPrice(d.price_usd);
    const isCheapest = cheapestIds.has(d._id);
    const isTopRated = TOP_RATED_CITIES.has(d.city);

    const item = document.createElement("div");
    item.className = "result-item";
    if (compareSelection.includes(d._id)) {
      item.classList.add("selected");
      item.classList.add("compare-selected");
    }

    // Build badges
    let badges = '';
    if (isCheapest) badges += '<span class="result-badge">Cheapest</span>';
    if (isTopRated) badges += '<span class="result-badge result-badge-top-rated">Top Rated</span>';

    item.innerHTML = `
      <div class="result-left">
        <div class="result-city">${flag ? flag + " " : ""}${escapeHtml(d.city)}${badges}</div>
        <div class="result-meta">${escapeHtml(d.country)} • ${escapeHtml(stripParens(d.procedure))}</div>
        <div class="result-view-clinics">View Details →</div>
      </div>
      <div class="result-price">${escapeHtml(price)}</div>
    `;

    item.addEventListener("click", () => {
      if (isCompareMode) {
        // Compare mode: toggle selection
        toggleCompare(d._id);
        renderResults(currentFiltered);
        renderCompareBox(currentFiltered);
      } else {
        // Browse mode: navigate to city page
        openCityPage(d.city, d.procedure, d.country);
      }
    });

    els.resultsList.appendChild(item);
  }
}

/* =========================
   COMPARE (pick 2)
========================= */
function toggleCompare(id) {
  const idx = compareSelection.indexOf(id);
  if (idx >= 0) {
    compareSelection.splice(idx, 1);
    return;
  }
  if (compareSelection.length >= 2) compareSelection.shift();
  compareSelection.push(id);
}

function renderCompareBox() {
  const picks = compareSelection
    .map((id) => ALL.find((d) => d._id === id))
    .filter(Boolean);

  if (picks.length === 2) {
    // Fit map to show both selected cities
    fitMapToCompare(picks[0], picks[1]);
  } else {
    // Re-render markers to update highlighting
    renderMarkers(currentFiltered);
  }

  // Update floating compare bar
  updateFloatingCompareBar();
}

function fitMapToCompare(city1, city2) {
  if (!city1 || !city2) return;
  
  // Re-render markers first to show highlighting
  renderMarkers(currentFiltered);
  
  // Create bounds to include both cities
  const bounds = new mapboxgl.LngLatBounds();
  bounds.extend([city1.lng, city1.lat]);
  bounds.extend([city2.lng, city2.lat]);
  
  // Fit map to show both cities with padding
  map.fitBounds(bounds, {
    padding: { top: 80, bottom: 80, left: 80, right: 80 },
    duration: 1000,
    maxZoom: 10 // Prevent zooming in too close
  });
}

/* =========================
   FLOATING COMPARE BAR
========================= */
function updateFloatingCompareBar() {
  if (!els.floatingCompareBar) return;

  const picks = compareSelection
    .map((id) => ALL.find((d) => d._id === id))
    .filter(Boolean);

  const count = picks.length;

  // Update count
  if (els.floatingCompareCount) {
    els.floatingCompareCount.textContent = count;
  }

  // Update preview
  if (els.floatingComparePreview) {
    els.floatingComparePreview.innerHTML = "";

    picks.forEach((d) => {
      const flag = flagFromCountry(d.country);

      const item = document.createElement("div");
      item.className = "floating-compare-preview-item";
      item.innerHTML = `
        <span class="floating-compare-preview-city">${flag ? flag + " " : ""}${escapeHtml(d.city)}</span>
        <span class="floating-compare-preview-price">${formatPrice(d.price_usd)}</span>
      `;
      els.floatingComparePreview.appendChild(item);
    });
  }

  // Update diff pill
  if (els.floatingCompareDiff) {
    if (count === 2) {
      const a = picks[0].price_usd;
      const b = picks[1].price_usd;

      if (Number.isFinite(a) && Number.isFinite(b)) {
        const delta = convertPrice(Math.abs(a - b));
        const cheaper = a < b ? picks[0].city : picks[1].city;
        const symbol = CURRENCY_RATES[currentCurrency].symbol;
        els.floatingCompareDiff.textContent = `${cheaper} is cheaper by ${symbol}${delta.toLocaleString()}`;
        els.floatingCompareDiff.classList.add("visible");
      } else {
        els.floatingCompareDiff.classList.remove("visible");
      }
    } else {
      els.floatingCompareDiff.classList.remove("visible");
    }
  }

  // Show/hide bar with animation
  if (count > 0) {
    els.floatingCompareBar.classList.add("visible");
  } else {
    els.floatingCompareBar.classList.remove("visible");
  }
}

// Clear button handler
if (els.floatingCompareClear) {
  els.floatingCompareClear.addEventListener("click", () => {
    compareSelection.length = 0;
    renderResults(currentFiltered);
    renderCompareBox();
    renderMarkers(currentFiltered);
  });
}


/* =========================
   UTILS
========================= */
function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================
   CLINIC MODAL
========================= */
let clinicData = [];

// Load clinic CSV file
async function loadClinicData() {
  try {
    const response = await fetch('clinics_complete.csv');
    const text = await response.text();
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',');

    clinicData = lines.slice(1).map(line => {
      // Handle CSV with quoted fields
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
  } catch (e) {
    console.error('Failed to load clinics_complete.csv:', e);
  }
}

// Initialize modal elements
const clinicModal = document.getElementById('clinicModal');
const clinicModalBack = document.getElementById('clinicModalBack');
const clinicModalClose = document.getElementById('clinicModalClose');
const clinicModalTitle = document.getElementById('clinicModalTitle');
const clinicModalBody = document.getElementById('clinicModalBody');

// Close modal handlers
function closeClinicModal() {
  clinicModal.classList.remove('visible');
}

clinicModalClose?.addEventListener('click', closeClinicModal);
clinicModalBack?.addEventListener('click', closeClinicModal);
clinicModal?.querySelector('.clinic-modal-overlay')?.addEventListener('click', closeClinicModal);

// Open clinic modal with city data
function openClinicModal(cityData) {
  const procedure = els.procedureSelect?.value;
  if (!procedure || !clinicData.length) return;

  const cityName = cityData.city;
  const country = cityData.country;
  const procedureName = stripParens(procedure);

  // Filter clinics for this city and procedure
  const clinics = clinicData.filter(clinic =>
    clinic.City?.toLowerCase() === cityName.toLowerCase() &&
    clinic.Procedure?.toLowerCase().includes(procedureName.toLowerCase())
  );

  if (clinics.length === 0) {
    return; // Don't open modal if no clinics
  }

  // Set modal title
  const flag = flagFromCountry(country) || '';
  clinicModalTitle.textContent = `${flag} ${cityName} · ${procedureName}`;

  // Render clinics
  clinicModalBody.innerHTML = clinics.map((clinic, idx) => {
    const priceLow = parseFloat(clinic.Price_USD_Low);
    const priceHigh = parseFloat(clinic.Price_USD_High);
    const stars = '★★★★☆'; // 4 stars default
    const reviews = Math.floor(Math.random() * 500 + 50); // Random reviews for demo

    return `
      <div class="clinic-card">
        <div class="clinic-name">${escapeHtml(clinic.Clinic_Name)}</div>
        <div class="clinic-price">${formatPrice(priceLow)} – ${formatPrice(priceHigh)}</div>
        <div class="clinic-rating">
          <div class="clinic-stars">${stars}</div>
          <div class="clinic-reviews">(${reviews})</div>
        </div>
        <div class="clinic-details-btn" onclick="toggleClinicDetails(${idx})">
          [ Details → ]
        </div>
        <div class="clinic-details-content" id="clinicDetails${idx}">
          <div class="clinic-info-row">
            <span class="clinic-info-label">Address:</span>
            ${escapeHtml(clinic.Address || 'Not available')}
          </div>
          <div class="clinic-info-row">
            <span class="clinic-info-label">Phone:</span>
            ${escapeHtml(clinic.Phone || 'Not available')}
          </div>
          <div class="clinic-info-row">
            <span class="clinic-info-label">Email:</span>
            ${escapeHtml(clinic.Email || 'Not available')}
          </div>
          ${clinic.Website ? `
          <div class="clinic-info-row">
            <span class="clinic-info-label">Website:</span>
            ${escapeHtml(clinic.Website)}
          </div>
          ` : ''}
          ${clinic.Certifications ? `
          <div class="clinic-info-row">
            <span class="clinic-info-label">Certifications:</span>
            ${escapeHtml(clinic.Certifications)}
          </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  clinicModal.classList.add('visible');
}

// Toggle clinic details
window.toggleClinicDetails = function(idx) {
  const details = document.getElementById(`clinicDetails${idx}`);
  if (details) {
    details.classList.toggle('visible');
  }
};

/* =========================
   HAMBURGER MENU
========================= */
const hamburgerMenu = document.getElementById('hamburgerMenu');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');
const compareModeToggleMenu = document.getElementById('compareModeToggleMenu');

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

// Sync compare mode toggle in menu with main compare mode
if (compareModeToggleMenu) {
  compareModeToggleMenu.addEventListener('change', (e) => {
    isCompareMode = e.target.checked;

    // Update compare bar visibility
    if (isCompareMode) {
      els.floatingCompareBar.classList.add('active');
    } else {
      compareSelection = [];
      els.floatingCompareBar.classList.remove('active');
    }

    // Re-render
    renderResults(currentFiltered);
    renderMarkers(currentFiltered);
    renderCompareBox(currentFiltered);

    // Close menu
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// Initialize currency selector on page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize currency dropdown
  const currencyDropdown = document.getElementById('currencyDropdown');
  if (currencyDropdown) {
    currencyDropdown.value = currentCurrency;
  }

  // City overlay close button
  document.getElementById('cityOverlayClose')?.addEventListener('click', () => {
    const overlay = document.getElementById('cityOverlay');
    const frame = document.getElementById('cityOverlayFrame');
    overlay.style.display = 'none';
    frame.src = '';
  });

  // Initialize currency selector (legacy support)
  document.querySelectorAll('.currency-option, .currency-option-menu').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.currency === currentCurrency);
  });
});

// Load clinic data on init and re-render when loaded
loadClinicData().then(() => {
  // Re-apply filters to show "View Details" buttons
  applyFiltersAndRender();
});

/* =========================
   WELCOME OVERLAY (first visit)
========================= */
const overlay = document.getElementById('welcomeOverlay');
if (overlay && !localStorage.getItem('welcomeSeen')) {
  overlay.style.display = 'flex';
  const dismiss = () => {
    overlay.style.display = 'none';
    localStorage.setItem('welcomeSeen', '1');
  };
  overlay.addEventListener('click', dismiss);
  const procSelect = document.getElementById('procedureSelect');
  if (procSelect) {
    procSelect.addEventListener('change', dismiss, { once: true });
  }
}

/* =========================
   MENU DESTINATION DROPDOWN
========================= */
const menuDestinationSelect = document.getElementById('menuDestinationSelect');

// Populate destination dropdown with unique cities
function populateDestinationDropdown() {
  if (!menuDestinationSelect || !ALL || ALL.length === 0) return;

  // Get unique cities sorted alphabetically
  const uniqueCities = [...new Set(ALL.map(d => d.city))].filter(Boolean).sort();

  // Clear existing options (except first placeholder)
  menuDestinationSelect.innerHTML = '<option value="" selected>Choose destination...</option>';

  // Add city options
  uniqueCities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    menuDestinationSelect.appendChild(option);
  });
}

// Handle destination selection
if (menuDestinationSelect) {
  menuDestinationSelect.addEventListener('change', (e) => {
    const selectedCity = e.target.value;
    if (selectedCity) {
      // Get city data to find country and procedure
      const cityData = ALL.filter(d => d.city === selectedCity);

      if (cityData.length > 0) {
        // Get currently selected procedure or default to Botox
        const currentProcedure = els.procedureSelect?.value || 'Botox';
        const country = cityData[0].country;

        // Navigate to city page with city, country, and procedure
        openCityPage(selectedCity, currentProcedure, country);
      }
    }
  });
}
