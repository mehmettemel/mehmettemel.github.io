const form = document.getElementById("form");
const inputsArr = form.querySelectorAll("input");
const errorMessage = document.getElementById("formDangerAlert");
const successMessage = document.getElementById("formSuccesAlert");
const resultsSpinner = document.getElementById("resultsSpinner");
const resultsAlert = document.getElementById("resultsAlert");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const validations = {
  required: function (value) {
    return value !== "";
  },
  phone: function (value) {
    return value.match(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    );
  },
  email: function (value) {
    return value.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  },
};
function validate() {
  form.addEventListener(
    "submit",
    async function (e) {
      var i = 0;
      while (i < inputsArr.length) {
        var attr = inputsArr[i].getAttribute("data-validation"),
          rules = attr ? attr.split(" ") : "",
          parent = inputsArr[i].closest(".field"),
          j = 0;
        while (j < rules.length) {
          if (!validations[rules[j]](inputsArr[i].value)) {
            e.preventDefault();

            errorMessage.className = "alert alert-danger";
            errorMessage.innerHTML = `You should fill  <strong>${inputsArr[i].name}</strong> field because it is  ${rules[j]}`;
            parent.className = "field error";
            return false;
          }
          errorMessage.className = "alert alert-danger d-none";
          parent.className = "field";
          j++;
        }
        i++;
      }
      e.preventDefault();
      successMessage.className = "alert alert-success";
      successMessage.innerHTML = "Form successfuly sended.";
      resultsSpinner.classList.remove("d-none");
      resultsAlert.classList.add("d-none");
      await delay(3000);
      resultsSpinner.classList.add("d-none");
      successMessage.classList.add("d-none");
      //   form.outerHTML = "";
      //   delete form;
    },
    false
  );
}
validate();
