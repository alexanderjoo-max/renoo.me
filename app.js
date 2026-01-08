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
  panelHandle: document.getElementById("panelHandle"),
  procedureSelect: document.getElementById("procedureSelect"),
  resultsList: document.getElementById("resultsList"),
  compareClear: document.getElementById("compareClear"),
  compareEmpty: document.getElementById("compareEmpty"),
  compareGrid: document.getElementById("compareGrid")
};

/* =========================
   MOBILE RESIZE (drag handle)
========================= */
(function initPanelResizer() {
  const panel = els.panel;
  const handle = els.panelHandle;
  if (!panel || !handle) return;

  let startY = 0;
  let startH = 0;
  let dragging = false;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const onDown = (e) => {
    dragging = true;
    startY = e.clientY;
    startH = panel.getBoundingClientRect().height;
    handle.setPointerCapture?.(e.pointerId);

    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";
    e.preventDefault();
  };

  const onMove = (e) => {
    if (!dragging) return;

    const dy = startY - e.clientY;
    const vh = window.innerHeight;
    const minH = Math.round(vh * 0.22);
    const maxH = Math.round(vh * 0.9);

    panel.style.height = clamp(startH + dy, minH, maxH) + "px";
    e.preventDefault();
  };

  const onUp = () => {
    dragging = false;
    document.body.style.overflow = "";
    document.documentElement.style.overscrollBehavior = "";
  };

  handle.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove, { passive: false });
  window.addEventListener("pointerup", onUp);
})();

/* =========================
   FLAGS
========================= */
const COUNTRY_TO_ISO2 = {
  Australia: "AU",
  Colombia: "CO",
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

function iso2ToFlagEmoji(code) {
  if (!code) return "";
  const A = 0x1f1e6;
  return String.fromCodePoint(
    A + code.charCodeAt(0) - 65,
    A + code.charCodeAt(1) - 65
  );
}

function flagFromCountry(country) {
  return iso2ToFlagEmoji(COUNTRY_TO_ISO2[country]);
}

/* =========================
   PROCEDURES
========================= */
function stripParens(s) {
  return s.replace(/\s*\([^)]*\)/g, "").trim();
}

function procedureIcon(name) {
  const k = name.toLowerCase();
  if (k.includes("breast")) return "🍒";
  if (k.includes("colonoscopy")) return "🧪";
  if (k.includes("rhinoplasty")) return "👃";
  if (k.includes("hair")) return "💇";
  if (k.includes("implant")) return "🦷";
  if (k.includes("lasik")) return "👁️";
  return "✨";
}

function procedureLabel(name) {
  return `${procedureIcon(name)} ${name}`;
}

/* =========================
   PRICE HELPERS
========================= */
function toNumber(v) {
  const n = Number(String(v).replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

function priceToColor(p, min, max) {
  if (!Number.isFinite(p) || min === max) return "#2563eb";
  const t = (p - min) / (max - min);
  return `hsl(${120 - t * 120}, 70%, 50%)`;
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
  .then((r) => r.json())
  .then((raw) => {
    ALL = raw.map((d, i) => ({
      _id: `${d.procedure}_${i}`,
      procedure: stripParens(d.procedure),
      city: d.city,
      country: d.country,
      lat: toNumber(d.lat),
      lng: toNumber(d.lng),
      price_usd: toNumber(d.price_usd)
    }))
    .filter(d => d.lat && d.lng && d.procedure);

    populateProcedureDropdown();
    wireUI();

    clearMarkers();
    renderResults([]);
    renderCompareBox();
  });

/* =========================
   UI WIRING
========================= */
function wireUI() {
  els.procedureSelect.addEventListener("change", () => {
    compareSelection = [];
    applyFilters();
  });

  els.compareClear.addEventListener("click", () => {
    compareSelection = [];
    renderResults(currentFiltered);
    renderCompareBox();
  });
}

/* =========================
   DROPDOWN
========================= */
function populateProcedureDropdown() {
  els.procedureSelect.innerHTML = "";

  const ph = document.createElement("option");
  ph.value = "";
  ph.textContent = "Choose Procedure";
  ph.disabled = true;
  ph.selected = true;
  els.procedureSelect.appendChild(ph);

  [...new Set(ALL.map(d => d.procedure))]
    .sort()
    .forEach(p => {
      const o = document.createElement("option");
      o.value = p;
      o.textContent = procedureLabel(p);
      els.procedureSelect.appendChild(o);
    });
}

/* =========================
   FILTER + RENDER
========================= */
function applyFilters() {
  const proc = els.procedureSelect.value;
  if (!proc) {
    clearMarkers();
    renderResults([]);
    renderCompareBox();
    return;
  }

  currentFiltered = ALL
    .filter(d => d.procedure === proc)
    .sort((a, b) => a.price_usd - b.price_usd);

  renderMarkers(currentFiltered);
  renderResults(currentFiltered);
  renderCompareBox();
}

/* =========================
   MARKERS
========================= */
function clearMarkers() {
  markers.forEach(m => m.remove());
  markers = [];
}

function renderMarkers(data) {
  clearMarkers();

  const prices = data.map(d => d.price_usd);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  data.forEach(d => {
    const el = document.createElement("div");
    el.className = "price-marker";
    el.textContent = `$${d.price_usd.toLocaleString()}`;
    el.style.background = priceToColor(d.price_usd, min, max);

    const popup = new mapboxgl.Popup({ offset: 22 }).setHTML(`
      <div class="popup-title">${d.city}</div>
      <div class="popup-row">${d.country}</div>
      <div class="popup-row">${procedureLabel(d.procedure)}</div>
      <div class="popup-row"><strong>$${d.price_usd.toLocaleString()}</strong></div>
    `);

    const marker = new mapboxgl.Marker(el)
      .setLngLat([d.lng, d.lat])
      .setPopup(popup)
      .addTo(map);

    markers.push(marker);
  });
}

/* =========================
   RESULTS
========================= */
function renderResults(data) {
  els.resultsList.innerHTML = "";

  if (!els.procedureSelect.value) {
    els.resultsList.innerHTML = `
      <div class="result-item">
        <div class="result-city">Choose a procedure</div>
      </div>`;
    return;
  }

  data.forEach(d => {
    const row = document.createElement("div");
    row.className = "result-item";
    row.innerHTML = `
      <div class="result-left">
        <div class="result-city">${d.city}</div>
        <div class="result-meta">${d.country}</div>
      </div>
      <div class="result-price">$${d.price_usd.toLocaleString()}</div>
    `;

    row.onclick = () => {
      toggleCompare(d._id);
      renderResults(currentFiltered);
      renderCompareBox();
    };

    els.resultsList.appendChild(row);
  });
}

/* =========================
   COMPARE
========================= */
function toggleCompare(id) {
  if (compareSelection.includes(id)) {
    compareSelection = compareSelection.filter(x => x !== id);
  } else {
    if (compareSelection.length >= 2) compareSelection.shift();
    compareSelection.push(id);
  }
}

function renderCompareBox() {
  els.compareGrid.innerHTML = "";

  if (compareSelection.length < 2) {
    els.compareEmpty.style.display = "block";
    return;
  }

  els.compareEmpty.style.display = "none";

  const picks = compareSelection.map(id => ALL.find(d => d._id === id));

  picks.forEach(d => {
    const c = document.createElement("div");
    c.className = "compare-card";
    c.innerHTML = `
      <div class="compare-title">${d.city}</div>
      <div class="compare-price">$${d.price_usd.toLocaleString()}</div>
    `;
    els.compareGrid.appendChild(c);
  });

  const diff = Math.abs(picks[0].price_usd - picks[1].price_usd);
  const cheaper = picks[0].price_usd < picks[1].price_usd ? picks[0] : picks[1];

  const d = document.createElement("div");
  d.className = "compare-diff";
  d.textContent = `${cheaper.city} is cheaper by $${diff.toLocaleString()}`;
  els.compareGrid.appendChild(d);
}
