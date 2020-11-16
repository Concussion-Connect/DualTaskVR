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
    location.replace("/session" 
    + "/" + id 
    + "/" + wordList 
    + "/" + currentTrial
    + states[currentTrial]);
}

export function sessionHasBeenUpdated(currentTrial) {
    return currentTrial != activeCurrentTrial;
}
