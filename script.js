// script.js (FULL) — UCDP events.json -> Leaflet map with clustering

// --- Map init ---
const map = L.map("map").setView([31.5, 39.0], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// --- Marker clustering (requires Leaflet.markercluster plugin) ---
const markers = L.markerClusterGroup({
  // Tweaks for performance/UX
  chunkedLoading: true,
  chunkInterval: 200,
  chunkDelay: 50,
  removeOutsideVisibleBounds: true,
});

// --- Helper: color by severity ---
function colorForFatalities(f) {
  if (f >= 25) return "red";
  if (f >= 10) return "orange";
  if (f >= 2) return "yellow";
  return "gray";
}

// --- Helper: safe text ---
function esc(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// --- Load events ---
fetch("events.json", { cache: "no-store" })
  .then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status} loading events.json`);
    return r.json();
  })
  .then((events) => {
    if (!Array.isArray(events)) throw new Error("events.json is not an array");

    let plotted = 0;

    events.forEach((e) => {
      const lat = Number(e.lat);
      const lng = Number(e.lng);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

      const fatalities = Number(e.fatalities) || 0;

      const actor1 = esc(e.actor1);
      const actor2 = esc(e.actor2);
      const date = esc(e.date);
      const country = esc(e.country);
      const location = esc(e.location);
      const source = esc(e.source);
      const sourceDate = esc(e.source_date);
      const headline = esc(e.headline);

      const searchUrl =
        "https://www.google.com/search?q=" +
        encodeURIComponent((e.headline || "").toString());

      // Use circleMarker for visual severity; wrap in a DivIcon marker for clustering.
      // MarkerCluster works with L.Marker, so we create a tiny "dot" marker using DivIcon.
      const color = colorForFatalities(fatalities);

      const icon = L.divIcon({
        className: "event-dot",
        html: `<div style="
          width:10px;height:10px;border-radius:50%;
          background:${color};
          border:2px solid ${color};
          opacity:0.85;"></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
      });

      const m = L.marker([lat, lng], { icon });

      m.bindPopup(`
        <div style="min-width:240px">
          <div><b>${actor1} vs ${actor2}</b></div>
          <div><b>Fatalities:</b> ${fatalities}</div>
          <div><b>Date:</b> ${date}</div>
          <div><b>Country:</b> ${country}</div>
          <div><b>Location:</b> ${location}</div>
          <hr style="margin:8px 0">
          <div><b>Source:</b> ${source}</div>
          <div><b>Source date:</b> ${sourceDate}</div>
          <div style="margin-top:6px"><i>"${headline}"</i></div>
          <div style="margin-top:8px">
            <a href="${searchUrl}" target="_blank" rel="noopener noreferrer">
              Search headline for verification
            </a>
          </div>
        </div>
      `);

      markers.addLayer(m);
      plotted++;
    });

    map.addLayer(markers);
    console.log(`Loaded ${events.length} events; plotted ${plotted}.`);
  })
  .catch((err) => {
    console.error("Error loading events:", err);
    alert("Error loading events.json. Check console for details.");
  });