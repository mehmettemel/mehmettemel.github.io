mapboxgl.accessToken =
  "pk.eyJ1IjoibWVobWV0dGVtZWwiLCJhIjoiY2xkZm9uMHlkMGJjODNwbzF2ZGJtaXp4MiJ9.O-Op6Ze5ipuuB4WnwThFTQ";
const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/satellite-streets-v11", // style URL
  center: [-105.063721, 39.83559], // starting position [lng, lat]
  zoom: 18, // starting zoom
});

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  countries: "us",
});
document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

const draw = new MapboxDraw({
  displayControlsDefault: false,
  defaultMode: "draw_polygon",
});

map.addControl(draw);

map.on("draw.create", function (e) {
  checkDeleteButton(e.features);
});
map.on("draw.delete", function (e) {
  console.log("draw.delete", e.features);
});

map.on("draw.selectionchange", function (e) {
  const allDrawn = draw.getAll();
  checkDeleteButton(allDrawn.features);
  console.log("draw.selectionchange", e.features);
});

map.on("draw.update", function (e) {
  console.log("draw.update", e.features);
});
