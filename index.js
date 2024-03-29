const showPricesButton = document.querySelector("#showPricesButton");
const newCalculationButton = document.querySelector("#newCalculationButton");
const showSlopesButton = document.querySelector("#showSlopesButton");
const backButton = document.querySelector("#backButton");
const sectionOne = document.querySelector("#sectionOne");
const sectionThree = document.querySelector("#sectionThree");
const deleteRoofButton = document.querySelector("#deleteRoofButton");
const drawRoofButton = document.querySelector("#drawRoofButton");
const allCheckBoxes = document.querySelectorAll('input[type="checkbox"]');
const roofs = [];
const roofSlopes = [];

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
    openModal("Please select a roof before delete");
  }
  const prevMode = draw.getMode();
  draw.changeMode("simple_select");
  const allDrawn = draw.getAll();
  if (allDrawn.features.length > 0) {
    draw.changeMode(draw.modes.SIMPLE_SELECT);
    checkShowPricesButton(allDrawn.features);
    draw.changeMode(prevMode);
  } else {
    draw.changeMode(draw.modes.DRAW_POLYGON);
    checkDeleteButton(allDrawn.features.length);
    checkShowPricesButton([]);
    draw.changeMode(prevMode);
  }
});

drawRoofButton.addEventListener("click", () => {
  draw.changeMode(draw.modes.DRAW_POLYGON);
});

//SECTION ONE
showPricesButton.addEventListener("click", (event) => {
  sectionOne.classList.add("d-none");
  sectionThree.classList.remove("d-none");
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
    const prevMode = draw.getMode();
    draw.changeMode("simple_select");
    const allDrawn = draw.getAll();
    checkDeleteButton(allDrawn.features);
    checkShowPricesButton(allDrawn.features);
    checkCheckBoxesIsChecked();
    draw.changeMode(prevMode);
  })
);

//SECTION TWO
newCalculationButton.addEventListener("click", (event) => {
  event.preventDefault();
  sectionThree.classList.add("d-none");
  sectionOne.classList.remove("d-none");

  draw.deleteAll();

  allCheckBoxes.forEach((checkbox) => (checkbox.checked = false));

  const allDrawn = draw.getAll();
  checkDeleteButton(allDrawn.features);
  checkShowPricesButton(allDrawn.features);
  checkCheckBoxesIsChecked();
  draw.changeMode("simple_select");
});

//MODAL EVENTS
function openModal(alertMessage) {
  document.getElementById("backdrop").style.display = "block";
  document.getElementById("modal").style.display = "block";
  document.getElementById("modal").classList.add("show");
  document.querySelector(".modal-body").innerHTML += `<p>${alertMessage}</p>`;
}
function closeModal() {
  document.getElementById("backdrop").style.display = "none";
  document.getElementById("modal").style.display = "none";
  document.getElementById("modal").classList.remove("show");
  document.querySelector(".modal-body").innerHTML = "";
}
// Get the modal
var modal = document.getElementById("modal");
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};
