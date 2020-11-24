// Global Variables
const pathArray = window.location.pathname.split('/');
const activeCurrentTrial = pathArray[4];
const states = ["/opening", "/trial1","/trial2", "/trial3", "/trial4",]

export function updateSessionState(id, wordList, currentTrial) {
  if (id == null) {
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
