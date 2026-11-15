mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxleGFuZGVyam9vIiwiYSI6ImNtazN1bXo5bDAwdmIzY291bXpvMGNldGoifQ.LpYK8I3J4Tt0AZY4KGEBNQ";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [0, 20],
  zoom: 1.4
});

let markers = [];
let ALL_DATA = [];
let compareIds = []; // stores up to 2 ids

// ---- Flags (country -> ISO2) ----
const COUNTRY_TO_ISO2 = {
  "Australia": "AU",
  "Colombia": "CO",
  "Czech Rep.": "CZ",
  "Czech Republic": "CZ",
  "Egypt": "EG",
  "France": "FR",
  "Hungary": "HU",
  "India": "IN",
  "Japan": "JP",
  "Malaysia": "MY",
  "Mexico": "MX",
  "Poland": "PL",
  "South Korea": "KR",
  "Korea": "KR",
  "Spain": "ES",
  "Thailand": "TH",
  "Turkey": "TR",
  "UAE": "AE",
  "United Arab Emirates": "AE",
  "UK": "GB",
  "United Kingdom": "GB",
  "USA": "US",
  "United States": "US",
  "Vietnam": "VN"
};

function iso2ToFlagEmoji(iso2) {
  if (!iso2 || typeof iso2 !== "string") return "";
  const code = iso2.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return "";
  const A = 0x1f1e6;
  return String.fromCodePoint(
    A + (code.charCodeAt(0) - 65),
    A + (code.charCodeAt(1) - 65)
  );
}

function flagFromCountry(countryName) {
  const name = (countryName ?? "").toString().trim();
  const iso2 = COUNTRY_TO_ISO2[name];
  return iso2ToFlagEmoji(iso2);
}

// ---- Procedure cleanup + icons ----
function cleanProcedureName(name) {
  return (name ?? "")
    .toString()
    .replace(/\s*\([^)]*\)\s*/g, "") // remove parentheses + contents
    .replace(/\s+/g, " ")
    .trim();
}

function procedureIcon(cleanName) {
  const n = cleanName.toLowerCase();
  if (n.includes("breast augmentation")) return "🍒";
  if (n.includes("rhinoplasty")) return "👃";
  if (n.includes("hair transplant")) return "💇";
  if (n.includes("dental implant")) return "🦷";
  if (n.includes("lasik")) return "👁️";
  if (n.includes("colonoscopy")) return "🔬";
  return "🩺";
}

// ---- Price parsing ----
function toNumberMaybe(v) {
  if (v === null || v === undefined) return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  const s = String(v).replace(/,/g, "").trim();
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function readUsdPrice(d) {
  return (
    toNumberMaybe(d.typical_price_usd) ??
    toNumberMaybe(d.typicalPriceUSD) ??
    toNumberMaybe(d.price_mid_usd) ??
    toNumberMaybe(d.priceMidUSD) ??
    toNumberMaybe(d.typical_price) ??
    null
  );
}

// ---- Color scale: green -> yellow -> orange -> red ----
function clamp01(x) { return Math.max(0, Math.min(1, x)); }
function lerp(a, b, t) { return a + (b - a) * t; }

function lerpRgb(c1, c2, t) {
  return [
    Math.round(lerp(c1[0], c2[0], t)),
    Math.round(lerp(c1[1], c2[1], t)),
    Math.round(lerp(c1[2], c2[2], t))
  ];
}

function rgbToCss([r, g, b]) { return `rgb(${r},${g},${b})`; }

function priceToColor(price, minP, maxP) {
  if (!Number.isFinite(price) || !Number.isFinite(minP) || !Number.isFinite(maxP) || minP === maxP) {
    return "rgb(107,114,128)";
  }

  const t = clamp01((price - minP) / (maxP - minP));

  const GREEN  = [ 34,197, 94];
  const YELLOW = [250,204, 21];
  const ORANGE = [251,146, 60];
  const RED    = [239, 68, 68];

  if (t < 0.33) {
    return rgbToCss(lerpRgb(GREEN, YELLOW, t / 0.33));
  } else if (t < 0.66) {
    return rgbToCss(lerpRgb(YELLOW, ORANGE, (t - 0.33) / 0.33));
  } else {
    return rgbToCss(lerpRgb(ORANGE, RED, (t - 0.66) / 0.34));
  }
}

// ---- Load data ----
fetch("data.json")
  .then(res => res.json())
  .then(raw => {
    ALL_DATA = raw.map((d, idx) => {
      const procedureClean = cleanProcedureName(d.procedure);
      const priceUsd = readUsdPrice(d);

      return {
        ...d,
        _id: String(d.id ?? `${d.city ?? ""}|${d.country ?? ""}|${procedureClean}|${idx}`),
        city: (d.city ?? "").toString().trim(),
        country: (d.country ?? "").toString().trim(),
        procedure: procedureClean,
        procedure_icon: procedureIcon(procedureClean),
        lat: Number(d.lat),
        lng: Number(d.lng),
        price_usd: priceUsd
      };
    });

    populateProcedureDropdown(ALL_DATA);
    populateCountryDropdown(ALL_DATA);

    bindFilterEvents();

    const clearBtn = document.getElementById("compareClear");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        compareIds = [];
        applyFiltersAndRender();
      });
    }

    applyFiltersAndRender();
  })
  .catch(err => console.error("Failed to load data.json", err));

function bindFilterEvents() {
  document.getElementById("procedureSelect").addEventListener("change", applyFiltersAndRender);
  document.getElementById("countrySelect").addEventListener("change", applyFiltersAndRender);
  document.getElementById("citySearch").addEventListener("input", applyFiltersAndRender);
  document.getElementById("minPrice").addEventListener("input", applyFiltersAndRender);
  document.getElementById("maxPrice").addEventListener("input", applyFiltersAndRender);
}

// ---- Dropdowns ----
function populateProcedureDropdown(data) {
  const select = document.getElementById("procedureSelect");
  select.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "ALL";
  allOption.textContent = "All procedures";
  select.appendChild(allOption);

  const unique = [...new Set(data.map(d => d.procedure).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  unique.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = `${procedureIcon(p)} ${p}`;
    select.appendChild(opt);
  });
}

function populateCountryDropdown(data) {
  const select = document.getElementById("countrySelect");
  select.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "ALL";
  allOption.textContent = "All countries";
  select.appendChild(allOption);

  const unique = [...new Set(data.map(d => d.country).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  unique.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    const flag = flagFromCountry(c);
    opt.textContent = `${flag ? flag + " " : ""}${c}`;
    select.appendChild(opt);
  });
}

// ---- Filtering + rendering ----
function applyFiltersAndRender() {
  const procedureVal = document.getElementById("procedureSelect").value;
  const countryVal = document.getElementById("countrySelect").value;
  const cityQ = document.getElementById("citySearch").value.trim().toLowerCase();

  const minP = toNumberMaybe(document.getElementById("minPrice").value);
  const maxP = toNumberMaybe(document.getElementById("maxPrice").value);

  let filtered = ALL_DATA.slice();

  if (procedureVal !== "ALL") filtered = filtered.filter(d => d.procedure === procedureVal);
  if (countryVal !== "ALL") filtered = filtered.filter(d => d.country === countryVal);
  if (cityQ) filtered = filtered.filter(d => (d.city || "").toLowerCase().includes(cityQ));
  if (minP !== null) filtered = filtered.filter(d => d.price_usd !== null && d.price_usd >= minP);
  if (maxP !== null) filtered = filtered.filter(d => d.price_usd !== null && d.price_usd <= maxP);

  filtered.sort((a, b) => {
    const ap = a.price_usd;
    const bp = b.price_usd;
    if (ap === null && bp === null) return 0;
    if (ap === null) return 1;
    if (bp === null) return -1;
    return ap - bp;
  });

  renderMarkers(filtered);
  renderResults(filtered);
  renderCompare();
}

// ---- Markers ----
function renderMarkers(data) {
  markers.forEach(m => m.remove());
  markers = [];

  const prices = data.map(d => d.price_usd).filter(v => Number.isFinite(v));
  const minP = prices.length ? Math.min(...prices) : NaN;
  const maxP = prices.length ? Math.max(...prices) : NaN;

  data.forEach(d => {
    if (!Number.isFinite(d.lat) || !Number.isFinite(d.lng)) return;

    const el = document.createElement("div");
    el.className = "price-marker";

    const label = Number.isFinite(d.price_usd)
      ? `$${d.price_usd.toLocaleString()}`
      : "N/A";

    el.textContent = label;
    el.style.background = priceToColor(d.price_usd, minP, maxP);

    const flag = flagFromCountry(d.country);
    const popupHTML = `
      <div>
        <div class="popup-title">${flag ? flag + " " : ""}${escapeHtml(d.city)}</div>
        <div class="popup-row">${escapeHtml(d.country)}</div>
        <div class="popup-row">${escapeHtml(d.procedure)}</div>
        <div class="popup-row"><strong>Typical price:</strong> ${Number.isFinite(d.price_usd) ? "$" + d.price_usd.toLocaleString() : "N/A"}</div>
      </div>
    `;

    const marker = new mapboxgl.Marker(el)
      .setLngLat([d.lng, d.lat])
      .setPopup(new mapboxgl.Popup({ offset: 18 }).setHTML(popupHTML))
      .addTo(map);

    markers.push(marker);
  });
}

// ---- Results ----
function renderResults(data) {
  const list = document.getElementById("resultsList");
  list.innerHTML = "";

  if (!data.length) {
    list.innerHTML = `<div class="result-item"><div class="result-left"><div class="result-city">No results</div><div class="result-meta">Try clearing filters.</div></div></div>`;
    return;
  }

  data.forEach(d => {
    const item = document.createElement("div");
    item.className = "result-item";
    if (compareIds.includes(d._id)) item.classList.add("selected");

    const flag = flagFromCountry(d.country);
    const priceText = Number.isFinite(d.price_usd) ? `$${d.price_usd.toLocaleString()}` : "N/A";

    item.innerHTML = `
      <div class="result-left">
        <div class="result-city">${escapeHtml(d.city)}</div>
        <div class="result-meta">${flag ? flag + " " : ""}${escapeHtml(d.country)} • ${escapeHtml(d.procedure)}</div>
      </div>
      <div class="result-price">${priceText}</div>
    `;

    item.addEventListener("click", () => {
      // toggle compare selection
      const id = d._id;
      if (compareIds.includes(id)) {
        compareIds = compareIds.filter(x => x !== id);
      } else {
        if (compareIds.length >= 2) compareIds.shift();
        compareIds.push(id);
      }

      // fly + popup (still useful)
      if (Number.isFinite(d.lat) && Number.isFinite(d.lng)) {
        map.flyTo({ center: [d.lng, d.lat], zoom: Math.max(map.getZoom(), 4), speed: 1.2 });
      }

      applyFiltersAndRender();
    });

    list.appendChild(item);
  });
}

// ---- Compare ----
function renderCompare() {
  const empty = document.getElementById("compareEmpty");
  const grid = document.getElementById("compareGrid");
  if (!empty || !grid) return;

  grid.innerHTML = "";

  const picks = compareIds
    .map(id => ALL_DATA.find(d => d._id === id))
    .filter(Boolean);

  if (picks.length < 2) {
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
  }

  picks.forEach(d => {
    const flag = flagFromCountry(d.country);
    const priceText = Number.isFinite(d.price_usd) ? `$${d.price_usd.toLocaleString()}` : "N/A";

    const card = document.createElement("div");
    card.className = "compare-card";
    card.innerHTML = `
      <div class="compare-title">${flag ? flag + " " : ""}${escapeHtml(d.city)}</div>
      <div class="compare-line">${escapeHtml(d.country)}</div>
      <div class="compare-line">${escapeHtml(d.procedure)}</div>
      <div class="compare-price">${priceText}</div>
    `;
    grid.appendChild(card);
  });

  // add a simple diff line if exactly 2 and both have prices
  if (picks.length === 2 && Number.isFinite(picks[0].price_usd) && Number.isFinite(picks[1].price_usd)) {
    const a = picks[0];
    const b = picks[1];
    const diff = b.price_usd - a.price_usd;

    const diffEl = document.createElement("div");
    diffEl.className = "compare-diff";
    diffEl.textContent =
      diff === 0
        ? "Same price."
        : diff > 0
          ? `${b.city} is $${diff.toLocaleString()} more expensive than ${a.city}.`
          : `${b.city} is $${Math.abs(diff).toLocaleString()} cheaper than ${a.city}.`;

    grid.appendChild(diffEl);
  }
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}