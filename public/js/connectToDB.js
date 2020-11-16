import {updateSessionState} from './session.js';
import {sessionHasBeenUpdated} from './session.js';

const firebaseConfig = {
    apiKey: "AIzaSyAUwiJ_mwu2z7VbXMjwOmqU21CaXlUDfo8",
    authDomain: "testing-c4ea7.firebaseapp.com",
    databaseURL: "https://testing-c4ea7.firebaseio.com",
    projectId: "testing-c4ea7",
    storageBucket: "testing-c4ea7.appspot.com",
    messagingSenderId: "530686084404",
    appId: "1:530686084404:web:bcf92f7f8e28a20651d161",
    measurementId: "G-3PN4TE0YNW"
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
    db.collection("sessions").doc("7tVOkMtByt693aK1jW5y").set({
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
    const session = sessionRef.doc(id);
    session.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            let data = doc.data()
            updateSessionState(id, data.wordList, data.currentTrial);
        } else {
            // doc.data() will be undefined in this case
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

// Main Functionality
if (location.pathname !== "/") {
    listenForChanges(activeId);
}
