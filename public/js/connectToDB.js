import {sessionHasBeenUpdated} from './session.js';
import {updateSessionState} from './session.js';

// Document Elements
const alert = document.getElementById("alert");

// Database Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA78Xpn_pNhsu0lkQRs2w4Z6Kw_vjCg_jc",
  authDomain: "concussion-connect.firebaseapp.com",
  databaseURL: "https://concussion-connect.firebaseio.com",
  projectId: "concussion-connect",
  storageBucket: "concussion-connect.appspot.com",
  messagingSenderId: "334885809125",
  appId: "1:334885809125:web:edc7f0b42b7ecc868f9d0c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const sessionRef = firestore.collection("sessions");

// Global Variables
const pathArray = window.location.pathname.split('/');
const activeId = pathArray[2];

// Helper Functions
function createTrainerSession() {
  sessionRef.doc("7tVOkMtByt693aK1jW5y").set({
    wordList: 1,
    currentTrial: 1,
  })
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });
}

export function getTrainerSession(id) {
  if (!id) {
    showAlert("empty");
    return;
  }
  const session = sessionRef.doc(id);
  session.get().then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      let data = doc.data()
      updateSessionState(id, data.wordList, data.currentTrial);
    } else {
      // doc.data() will be undefined in this case
      showAlert("does not exist");
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
}

function listenForChanges(id) {
  if (id) {
    sessionRef.doc(id)
    .onSnapshot(function(doc) {
      let data = doc.data();
      if (sessionHasBeenUpdated(data.currentTrial)) {
        updateSessionState(id, data.wordList, data.currentTrial, 
          data.currentTrial);
      }
    });
  }
}

function showAlert(alertType) {
  if (alertType == "empty") {
    alert.innerHTML = "The session pin can not be empty."
  } else {
    alert.innerHTML = "There is not an active session with that session pin."
  }
  alert.style.display = "block";
}

// Main Functionality
if (location.pathname !== "/") {
  listenForChanges(activeId);
}
