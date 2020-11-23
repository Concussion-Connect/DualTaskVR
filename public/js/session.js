// Global Variables
const pathArray = window.location.pathname.split('/');
const activeCurrentTrial = pathArray[4];
const states = [
  "/", "/opening",
  "/trialAStance", "/trialA", 
  "/trialBStance", "/trialB",
  "/trialCStance", "/trialC",
  "/trialDStance", "/trialD",
]

export function updateSessionState(id, wordList, currentTrial) {
  if (currentTrial == 0) {
    location.replace("/");
  } else {
    location.replace("/session" 
    + "/" + id 
    + "/" + wordList 
    + "/" + currentTrial
    + states[currentTrial]);
  }
}

function endSession() {
  setTimeout(function() {
    updateSessionState(null, null, 0);
    // Update this duration value if the final video is changed
  }, 19000);
}

export function sessionHasBeenUpdated(currentTrial) {
  return currentTrial != activeCurrentTrial;
}

// Main Functionality
if (states[activeCurrentTrial] === states[states.length - 1]) {
  endSession();
}
