import { initializeApp } from "firebase/app";
import "firebase/analytics";
import { getAuth, signInWithCustomToken, updateEmail } from "firebase/auth";

const firebaseConfigProduction = {
    apiKey: "AIzaSyA4X_XVhMvAYBtVTtWQf6vptanNMelgFDM",
    authDomain: "jarvis-dev-9a39b.firebaseapp.com",
    projectId: "jarvis-dev-9a39b",
    storageBucket: "jarvis-dev-9a39b.appspot.com",
    messagingSenderId: "691705522763",
    appId: "1:691705522763:web:7078966778a366da743bce",
    measurementId: "G-XXRC8H6FZZ"
};

const firebaseConfigDevelopment = {
    apiKey: "AIzaSyA4X_XVhMvAYBtVTtWQf6vptanNMelgFDM",
    authDomain: "jarvis-dev-9a39b.firebaseapp.com",
    projectId: "jarvis-dev-9a39b",
    storageBucket: "jarvis-dev-9a39b.appspot.com",
    messagingSenderId: "691705522763",
    appId: "1:691705522763:web:7078966778a366da743bce",
    measurementId: "G-XXRC8H6FZZ"
};

const firebaseConfigStaging = {
    apiKey: "AIzaSyA4X_XVhMvAYBtVTtWQf6vptanNMelgFDM",
    authDomain: "jarvis-dev-9a39b.firebaseapp.com",
    projectId: "jarvis-dev-9a39b",
    storageBucket: "jarvis-dev-9a39b.appspot.com",
    messagingSenderId: "691705522763",
    appId: "1:691705522763:web:7078966778a366da743bce",
    measurementId: "G-XXRC8H6FZZ"
};

export const getFirebaseConfig = () => {
    let env = "";
    if (process.env.REACT_APP_ENV) {
        env = process.env.REACT_APP_ENV;
    } else if (process.env.BACKEND_ENV) {
        env = process.env.BACKEND_ENV;
    }

    switch(env) {
        case "local":
        case "development":
            return firebaseConfigDevelopment
        case "staging":
            return firebaseConfigStaging
        case "production":
            return firebaseConfigProduction;
        default:
            throw new Error("Unable to determine firebase environment. Set REACT_APP_ENV or BACKEND_ENV to values: local | development | staging | production");
    }
}

export const firebaseApp = initializeApp(getFirebaseConfig());

export const auth = getAuth();
export const signInFirebase = signInWithCustomToken;
export const updateUserEmail = updateEmail;
