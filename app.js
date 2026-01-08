mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxleGFuZGVyam9vIiwiYSI6ImNtazN1bXo5bDAwdmIzY291bXpvMGNldGoifQ.LpYK8I3J4Tt0AZY4KGEBNQ";

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
  panelToggle: document.getElementById("panelToggle"), // (optional button in HTML)
  procedureSelect: document.getElementById("procedureSelect"),
  citySearch: document.getElementById("citySearch"),
  countrySelect: document.getElementById("countrySelect"),
  minPrice: document.getElementById("minPrice"),
  maxPrice: document.getElementById("maxPrice"),
  resultsList: document.getElementById("resultsList"),
  compareClear: document.getElementById("compareClear"),
  compareEmpty: document.getElementById("compareEmpty"),
  compareGrid: document.getElementById("compareGrid")
};

/* =========================
   MOBILE PANEL TOGGLE (your snippet + safe)
   NOTE: Requires a button with id="panelToggle" in HTML.
========================= */
if (els.panel && els.panelToggle) {
  els.panelToggle.addEventListener("click", () => {
    els.panel.classList.toggle("is-collapsed");
    els.panelToggle.textContent = els.panel.classList.contains("is-collapsed")
      ? "Filters ▲"
      : "Filters ▼";
  });
}

/* =========================
   FLAGS
========================= */
const COUNTRY_TO_ISO2 = {
  Australia: "AU",
  Colombia: "CO",
  "Czech Rep.": "CZ",
  "Czech Republic": "CZ",
  Egypt: "EG",
  France: "FR",
  Hungary: "HU",
  India: "IN",
  Japan: "JP",
  Malaysia: "MY",
  Mexico: "MX",
  Poland: "PL",
  "South Korea": "KR",
  Spain: "ES",
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
   - Add icons in dropdown
   - Cherry emoji for breast augmentation
========================= */
function stripParens(s) {
  return (s ?? "").toString().replace(/\s*\([^)]*\)\s*/g, "").trim();
}

function procedureIcon(cleanName) {
  const key = cleanName.toLowerCase();
  if (key.includes("colonoscopy")) return "🧪";
  if (key.includes("rhinoplasty")) return "👃";
  if (key.includes("hair transplant")) return "💇";
  if (key.includes("dental implant")) return "🦷";
  if (key.includes("breast augmentation")) return "🍒";
  if (key.includes("lasik")) return "👁️";
  return "✨";
}

function procedureLabel(procedureRaw) {
  const clean = stripParens(procedureRaw);
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

// Green (cheap) -> Yellow -> Orange -> Red (expensive)
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function hex(n) {
  const s = Math.round(n).toString(16).padStart(2, "0");
  return s;
}
function rgbToHex(r, g, b) {
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}
function lerpColor(c1, c2, t) {
  return rgbToHex(
    lerp(c1[0], c2[0], t),
    lerp(c1[1], c2[1], t),
    lerp(c1[2], c2[2], t)
  );
}
function priceToColor(price, min, max) {
  if (!Number.isFinite(price) || !Number.isFinite(min) || !Number.isFinite(max) || min === max) {
    return "#2563eb"; // fallback blue
  }
  const t = Math.min(1, Math.max(0, (price - min) / (max - min)));

  // anchors: green -> yellow -> orange -> red
  const GREEN = [34, 197, 94];     // #22c55e
  const YELLOW = [250, 204, 21];   // #facc15
  const ORANGE = [249, 115, 22];   // #f97316
  const RED = [239, 68, 68];       // #ef4444

  if (t < 0.33) return lerpColor(GREEN, YELLOW, t / 0.33);
  if (t < 0.66) return lerpColor(YELLOW, ORANGE, (t - 0.33) / 0.33);
  return lerpColor(ORANGE, RED, (t - 0.66) / 0.34);
}

/* =========================
   STATE
========================= */
let ALL = [];
let compareSelection = []; // store ids (row keys)

/* =========================
   LOAD DATA
========================= */
fetch("data.json")
  .then((res) => res.json())
  .then((raw) => {
    // normalize schema
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
          procedure_raw: procedureRaw,
          procedure: procedureClean,
          city: (d.city ?? "").toString(),
          country: (d.country ?? "").toString(),
          region: (d.region ?? d.continent ?? "").toString(),
          lat,
          lng,
          price_usd: price
        };
      })
      .filter((d) => Number.isFinite(d.lat) && Number.isFinite(d.lng) && d.city && d.country && d.procedure);

    populateProcedureDropdown(ALL);
    populateCountryDropdown(ALL);

    wireUI();
    applyFiltersAndRender();
  })
  .catch((err) => console.error("Failed to load data.json", err));

/* =========================
   UI WIRING
========================= */
function wireUI() {
  if (els.procedureSelect) els.procedureSelect.addEventListener("change", applyFiltersAndRender);
  if (els.countrySelect) els.countrySelect.addEventListener("change", applyFiltersAndRender);

  if (els.citySearch) {
    els.citySearch.addEventListener("input", debounce(applyFiltersAndRender, 120));
  }
  if (els.minPrice) els.minPrice.addEventListener("input", debounce(applyFiltersAndRender, 200));
  if (els.maxPrice) els.maxPrice.addEventListener("input", debounce(applyFiltersAndRender, 200));

  if (els.compareClear) {
    els.compareClear.addEventListener("click", () => {
      compareSelection = [];
      renderCompareBox();
      // refresh results highlight
      renderResults(currentFiltered);
    });
  }
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
  els.procedureSelect.innerHTML = "";

  const all = document.createElement("option");
  all.value = "ALL";
  all.textContent = "All procedures";
  els.procedureSelect.appendChild(all);

  const procedures = [...new Set(data.map((d) => d.procedure))].sort((a, b) => a.localeCompare(b));

  for (const p of procedures) {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = procedureLabel(p);
    els.procedureSelect.appendChild(opt);
  }
}

function populateCountryDropdown(data) {
  if (!els.countrySelect) return;
  els.countrySelect.innerHTML = "";

  const all = document.createElement("option");
  all.value = "ALL";
  all.textContent = "All countries";
  els.countrySelect.appendChild(all);

  const countries = [...new Set(data.map((d) => d.country))].filter(Boolean).sort((a, b) => a.localeCompare(b));

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
let currentFiltered = [];

function applyFiltersAndRender() {
  const procVal = els.procedureSelect?.value ?? "ALL";
  const countryVal = els.countrySelect?.value ?? "ALL";
  const q = (els.citySearch?.value ?? "").trim().toLowerCase();

  const minP = toNumber(els.minPrice?.value);
  const maxP = toNumber(els.maxPrice?.value);

  let filtered = ALL.slice();

  if (procVal !== "ALL") {
    filtered = filtered.filter((d) => d.procedure === procVal);
  }
  if (countryVal !== "ALL") {
    filtered = filtered.filter((d) => d.country === countryVal);
  }
  if (q) {
    filtered = filtered.filter((d) => d.city.toLowerCase().includes(q));
  }

  if (minP !== null) filtered = filtered.filter((d) => d.price_usd !== null && d.price_usd >= minP);
  if (maxP !== null) filtered = filtered.filter((d) => d.price_usd !== null && d.price_usd <= maxP);

  // sort cheapest -> most expensive (nulls last)
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

  currentFiltered = filtered;

  renderMarkers(filtered);
  renderResults(filtered);
  renderCompareBox();
}

/* =========================
   MARKERS
========================= */
function renderMarkers(data) {
  markers.forEach((m) => m.remove());
  markers = [];

  const prices = data.map((d) => d.price_usd).filter(Number.isFinite);
  const min = prices.length ? Math.min(...prices) : NaN;
  const max = prices.length ? Math.max(...prices) : NaN;

  for (const d of data) {
    const el = document.createElement("div");
    el.className = "price-marker";

    const flag = flagFromCountry(d.country);
    const label = Number.isFinite(d.price_usd)
      ? `$${d.price_usd.toLocaleString()}`
      : "N/A";

    // flags beside price in bubbles
    el.textContent = `${flag ? flag + " " : ""}${label}`;

    // price-based coloring
    el.style.background = priceToColor(d.price_usd, min, max);

    // reduce shadow (you asked)
    el.style.boxShadow = "0 3px 8px rgba(0,0,0,0.16)";

    // popup
    const popupHTML = `
      <div>
        <div class="popup-title">${flag ? flag + " " : ""}${escapeHtml(d.city)}</div>
        <div class="popup-row">${escapeHtml(d.country)}</div>
        <div class="popup-row">${escapeHtml(procedureLabel(d.procedure))}</div>
        <div class="popup-row"><strong>Typical price:</strong> ${Number.isFinite(d.price_usd) ? `$${d.price_usd.toLocaleString()}` : "N/A"}</div>
      </div>
    `;

    const marker = new mapboxgl.Marker(el)
      .setLngLat([d.lng, d.lat])
      .setPopup(new mapboxgl.Popup({ offset: 22 }).setHTML(popupHTML))
      .addTo(map);

    // click marker -> fly to + open popup
    el.addEventListener("click", () => {
      map.flyTo({ center: [d.lng, d.lat], zoom: Math.max(map.getZoom(), 4), speed: 0.9 });
      marker.togglePopup();
    });

    markers.push(marker);
  }
}

/* =========================
   RESULTS LIST
========================= */
function renderResults(data) {
  if (!els.resultsList) return;

  els.resultsList.innerHTML = "";

  if (!data.length) {
    els.resultsList.innerHTML = `<div class="result-item"><div class="result-left"><div class="result-city">No results</div><div class="result-meta">Try changing filters</div></div><div class="result-price"></div></div>`;
    return;
  }

  for (const d of data) {
    const flag = flagFromCountry(d.country);
    const price = Number.isFinite(d.price_usd) ? `$${d.price_usd.toLocaleString()}` : "N/A";

    const item = document.createElement("div");
    item.className = "result-item";
    if (compareSelection.includes(d._id)) item.classList.add("selected");

    item.innerHTML = `
      <div class="result-left">
        <div class="result-city">${escapeHtml(d.city)}</div>
        <div class="result-meta">${flag ? flag + " " : ""}${escapeHtml(d.country)} • ${escapeHtml(procedureLabel(d.procedure))}</div>
      </div>
      <div class="result-price">${escapeHtml(price)}</div>
    `;

    item.addEventListener("click", () => {
      // compare: pick 2
      toggleCompare(d._id);

      // fly to city
      map.flyTo({ center: [d.lng, d.lat], zoom: Math.max(map.getZoom(), 4), speed: 0.9 });

      // refresh UI highlights
      renderResults(currentFiltered);
      renderCompareBox();
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
  if (compareSelection.length >= 2) {
    // replace the oldest selection
    compareSelection.shift();
  }
  compareSelection.push(id);
}

function renderCompareBox() {
  if (!els.compareGrid || !els.compareEmpty) return;

  const picks = compareSelection
    .map((id) => ALL.find((d) => d._id === id))
    .filter(Boolean);

  els.compareGrid.innerHTML = "";

  if (picks.length < 2) {
    els.compareEmpty.style.display = "block";
  } else {
    els.compareEmpty.style.display = "none";
  }

  // render cards for 1 or 2 picks
  for (const d of picks) {
    const flag = flagFromCountry(d.country);
    const price = Number.isFinite(d.price_usd) ? d.price_usd : null;

    const card = document.createElement("div");
    card.className = "compare-card";
    card.innerHTML = `
      <div class="compare-title">${flag ? flag + " " : ""}${escapeHtml(d.city)}</div>
      <div class="compare-line">${escapeHtml(d.country)}</div>
      <div class="compare-line">${escapeHtml(procedureLabel(d.procedure))}</div>
      <div class="compare-price">${price !== null ? `$${price.toLocaleString()}` : "N/A"}</div>
    `;
    els.compareGrid.appendChild(card);
  }

  // diff line when 2 picks
  if (picks.length === 2) {
    const a = picks[0].price_usd;
    const b = picks[1].price_usd;

    const diff = document.createElement("div");
    diff.className = "compare-diff";

    if (Number.isFinite(a) && Number.isFinite(b)) {
      const delta = Math.abs(a - b);
      const cheaper = a < b ? picks[0].city : picks[1].city;
      diff.textContent = `${cheaper} is cheaper by $${delta.toLocaleString()}`;
    } else {
      diff.textContent = `Price missing for one of the selections.`;
    }

    els.compareGrid.appendChild(diff);
  }
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
