// Document Elements
let videoPlayer = document.getElementById('video-player');

// Global Variables
const pathArray = window.location.pathname.split('/');
const screen_width = window.screen.width;
const isMobile = screen_width < 850;
const activeCurrentTrial = pathArray[4];
console.log(window.location.host);
let states = ["/opening", "/trial1","/trial2", "/trial3", "/trial4",]
if (isMobile) {
  states = ["/opening_vr", "/trial1_vr","/trial2_vr", "/trial3_vr", "/trial4_vr",]
} 

// Helper Functions
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

export function sessionHasBeenUpdated(currentTrial) {
  return currentTrial != activeCurrentTrial;
}

function handleVideoOnEnd() {
  if (states[activeCurrentTrial] === states[states.length - 1]) {
    endSession();
  }
}

function endSession() {
  updateSessionState(null, null, 0);
}

// Main Functionality
if (activeCurrentTrial) {
  videoPlayer.onended = function(){
    handleVideoOnEnd();
  }
}
