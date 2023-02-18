const showPricesButton = document.querySelector("#showPricesButton");
const showSlopesButton = document.querySelector("#showSlopesButton");
const backButton = document.querySelector("#backButton");
const sectionOne = document.querySelector("#sectionOne");
const sectionThree = document.querySelector("#sectionThree");
const deleteRoofButton = document.querySelector("#deleteRoofButton");
const drawRoofButton = document.querySelector("#drawRoofButton");
const allCheckBoxes = document.querySelectorAll('input[type="checkbox"]');
const roofs = [];
const roofSlopes = [];

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
  const data = draw.getAll();
  checkDeleteButton(data.features);
  console.log("draw.selectionchange", e.features);
});

map.on("draw.update", function (e) {
  console.log("draw.update", e.features);
});

// FUNCTIONS
const checkDeleteButton = (features) => {
  if (features && features.length > 0) {
    if (checkCheckBoxesIsChecked()) {
      showPricesButton.classList.remove("disabled");
    } else {
      showPricesButton.classList.add("disabled");
    }
    deleteRoofButton.classList.remove("disabled");
  } else {
    deleteRoofButton.classList.add("disabled");
    showPricesButton.classList.add("disabled");
  }
};

checkShowPricesButton = (roofLength) => {
  if (roofLength.length > 0 && checkCheckBoxesIsChecked()) {
    showPricesButton.classList.remove("disabled");
  } else {
    showPricesButton.classList.add("disabled");
  }
};

checkCheckBoxesIsChecked = () => {
  const checkSelectedCheckbox = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  if (checkSelectedCheckbox.length > 0) {
    return true;
  } else {
    return false;
  }
};

//MAP ACTION BUTTONS
deleteRoofButton.addEventListener("click", () => {
  const selectedRoof = draw.getSelected();
  if (selectedRoof.features.length) {
    draw.delete(selectedRoof.features[0].id);
  } else {
    window.alert("Please select a roof before delete");
  }

  const allRoofs = draw.getAll();
  if (allRoofs.features.length > 0) {
    draw.changeMode(draw.modes.SIMPLE_SELECT);
    checkShowPricesButton(allRoofs.features);
  } else {
    draw.changeMode(draw.modes.DRAW_POLYGON);
    checkDeleteButton(allRoofs.features.length);
    checkShowPricesButton([]);
  }
});

drawRoofButton.addEventListener("click", () => {
  draw.changeMode(draw.modes.DRAW_POLYGON);
});

showPricesButton.addEventListener("click", (event) => {
  sectionOne.classList.add("d-none");
  event.preventDefault();
  const data = draw.getAll();

  //   const area = turf.area(data);
  //   const rounded_area = Math.round(area * 100) / 100;
  //   if (area === 0) {
  //     window.alert("Please draw your roof");
  //   } else {
  //     sectionOne.classList.add("d-none");
  //     sectionTwo.classList.remove("d-none");
  //   }
});

allCheckBoxes.forEach((checkbox) =>
  checkbox.addEventListener("change", (event) => {
    checkCheckBoxesIsChecked();
    const data = draw.getAll();
    checkDeleteButton(data.features);
  })
);
