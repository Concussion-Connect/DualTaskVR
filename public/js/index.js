import {getTrainerSession} from './connectToDB.js';

let submitBtn = document.getElementById("submit-btn");
let gamePin = document.getElementById("game-pin");

submitBtn.addEventListener("click", validateId);

function validateId() {
  getTrainerSession(gamePin.value);
}

function startSession() {
  location.replace("/session/opening");
}