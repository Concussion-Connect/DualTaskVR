// Document Elements
let gamePin = document.getElementById("game-pin");
let submitBtn = document.getElementById("submit-btn");

// Global Variables
let stateIndex = 0;
let states = [
    "/", "/opening",
    "/trialAStance", "/trialA", 
    "/trialBStance", "/trialB",
    "/trialCStance", "/trialC",
    "/trialDStance", "/trialD",
]

// db.collection("sessions").doc(gamePin)
//     .onSnapshot(function(doc) {
//         updateSessionState();
//     });

submitBtn.addEventListener("click", updateSessionState);

// Helper Functions
function updateSessionState() {
    stateIndex++;
    location.replace(states[stateIndex]);
}
