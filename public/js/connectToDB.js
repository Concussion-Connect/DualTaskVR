import {updateSessionState} from './session.js';

var firebaseConfig = {
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
var firestore = firebase.firestore();
var sessionRef = firestore.collection("sessions");

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
            sessionRef.doc(id)
            .onSnapshot(function(doc) {
                let data = doc.data();
                updateSessionState(data.currentTrial);
            });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}
