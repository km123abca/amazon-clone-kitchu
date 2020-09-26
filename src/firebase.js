import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBuYy1UXy5Mw0644G7tzSa-AF6Dw4Qtw_4",
  authDomain: "clone-2d8c1.firebaseapp.com",
  databaseURL: "https://clone-2d8c1.firebaseio.com",
  projectId: "clone-2d8c1",
  storageBucket: "clone-2d8c1.appspot.com",
  messagingSenderId: "313010323689",
  appId: "1:313010323689:web:e1609f3a08181f9e6ef078",
  measurementId: "G-K0DGW5F1X6",
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
