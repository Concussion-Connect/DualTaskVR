// Document Element

// Global Variables
let states = [
    "/", "/opening",
    "/trialAStance", "/trialA", 
    "/trialBStance", "/trialB",
    "/trialCStance", "/trialC",
    "/trialDStance", "/trialD",
]

// function updateSessionState(currentTrial) {
//     if (location.pathname == "/") {
//         location.replace("/session/opening");
//     } else {
//         let stateIndex = 0;
//         while ("/session" + states[stateIndex] != location.pathname) {
//             stateIndex++;
//         }
//         stateIndex++;
//         location.replace("/session" + states[stateIndex]);
//     }
// }


export function updateSessionState(currentTrial) {
    location.replace("/session" + states[currentTrial]);
    console.log("fish");
}
