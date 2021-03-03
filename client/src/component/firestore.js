import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA78Xpn_pNhsu0lkQRs2w4Z6Kw_vjCg_jc",
    authDomain: "concussion-connect.firebaseapp.com",
    databaseURL: "https://concussion-connect.firebaseio.com",
    projectId: "concussion-connect",
    storageBucket: "concussion-connect.appspot.com",
    messagingSenderId: "334885809125",
    appId: "1:334885809125:web:edc7f0b42b7ecc868f9d0c"
  };
  firebase.initializeApp(firebaseConfig);

  export default firebase;