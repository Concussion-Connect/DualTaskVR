import {getTrainerSession} from './connectToDB.js';

let submitBtn = document.getElementById("submit-btn");
let sessionPin = document.getElementById("session-pin");
let alert = document.getElementById("alert");

submitBtn.addEventListener("click", validateId);

function validateId() {
  getTrainerSession(sessionPin.value);
}

export function showAlert(alertType) {
  if (alertType == "empty") {
    alert.innerHTML = "The session pin can not be empty."
  } else {
    alert.innerHTML = "There is not an active session with that session pin."
  }
  alert.style.display = "block";
}
