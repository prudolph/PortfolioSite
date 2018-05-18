 import * as firebase from 'firebase'
 
 
 // Initialize Firebase
 const config = {
    apiKey: "AIzaSyA-HVwMJKwOi9QanItVOJ4sofS8MbyBBv4",
    authDomain: "pr-portfolio.firebaseapp.com",
    databaseURL: "https://pr-portfolio.firebaseio.com",
    projectId: "pr-portfolio",
    storageBucket: "pr-portfolio.appspot.com",
    messagingSenderId: "199228183475"
  };

  firebase.initializeApp(config);

  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {firebase,googleAuthProvider };