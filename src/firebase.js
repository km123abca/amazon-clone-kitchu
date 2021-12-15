import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDR8796Dh-jY5IgAIS9IvYMFPljlY8u7sE",
  authDomain: "to-do-app-16e84.firebaseapp.com",
  databaseURL: "https://to-do-app-16e84.firebaseio.com",
  projectId: "to-do-app-16e84",
  storageBucket: "to-do-app-16e84.appspot.com",
  messagingSenderId: "148892227885",
  appId: "1:148892227885:web:a5bc85bc40ccda99c75ba4",
  measurementId: "G-DS3H8JH80C",
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
