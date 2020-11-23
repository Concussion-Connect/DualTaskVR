import {getTrainerSession} from './connectToDB.js';

let submitBtn = document.getElementById("submit-btn");
let sessionPin = document.getElementById("session-pin");

submitBtn.addEventListener("click", validateId);

function validateId() {
  getTrainerSession(sessionPin.value);
}
