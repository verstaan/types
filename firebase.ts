import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB6GQdtvDGb8ozZDFRx7ymAaQaqWUQzUr4",
    authDomain: "jarvis-46347.firebaseapp.com",
    projectId: "jarvis-46347",
    storageBucket: "jarvis-46347.appspot.com",
    messagingSenderId: "470207736143",
    appId: "1:470207736143:web:9cd6f282ed84c4983bbd3a",
    measurementId: "G-94SGZNG6SJ"
};
  
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();