import { initializeApp } from "firebase/app";
import "firebase/analytics";
import { getAuth, signInWithCustomToken } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA4X_XVhMvAYBtVTtWQf6vptanNMelgFDM",
    authDomain: "jarvis-dev-9a39b.firebaseapp.com",
    projectId: "jarvis-dev-9a39b",
    storageBucket: "jarvis-dev-9a39b.appspot.com",
    messagingSenderId: "691705522763",
    appId: "1:691705522763:web:7078966778a366da743bce",
    measurementId: "G-XXRC8H6FZZ"
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const signInCustom = signInWithCustomToken;
