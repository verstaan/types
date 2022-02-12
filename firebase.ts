import { initializeApp } from "firebase/app";
import "firebase/analytics";
import { getAuth, signInWithCustomToken, updateEmail } from "firebase/auth";

const firebaseConfigProduction = {
    apiKey: "AIzaSyA2ZlggwXUmjN_kXJOUl3TxJ6K_BijNWx0",
    authDomain: "arcturus-21283.firebaseapp.com",
    databaseURL: "https://arcturus-21283.firebaseio.com",
    projectId: "arcturus-21283",
    storageBucket: "arcturus-21283.appspot.com",
    messagingSenderId: "230566375040",
    appId: "1:230566375040:web:b1bf9af00326a2ba4c4065",
    measurementId: "G-M9NWNF38VQ"
};

const firebaseConfigLocalTesting = {
    apiKey: "AIzaSyCLSu5czOgzjn4fl5GARDQH1VfHqAnIctU",
    authDomain: "arcturus-misc.firebaseapp.com",
    projectId: "arcturus-misc",
    storageBucket: "arcturus-misc.appspot.com",
    messagingSenderId: "200127050713",
    appId: "1:200127050713:web:4563df6a0a0c12b03e1fc8"
};

const firebaseConfigDevelopment = {
    apiKey: "AIzaSyBted_5miNMNZFtNr3gBouxHFHEtqaVYNQ",
    authDomain: "arcturus-dev-46da0.firebaseapp.com",
    projectId: "arcturus-dev-46da0",
    storageBucket: "arcturus-dev-46da0.appspot.com",
    messagingSenderId: "322005121532",
    appId: "1:322005121532:web:fe34812623c4ac880cda79"
};

const firebaseConfigStaging = {
    apiKey: "AIzaSyAQxf6n2Kdpi2mtGKlI8JPLVEe4yfH_Lrc",
    authDomain: "arcturus-staging-7ce6d.firebaseapp.com",
    projectId: "arcturus-staging-7ce6d",
    storageBucket: "arcturus-staging-7ce6d.appspot.com",
    messagingSenderId: "207528072036",
    appId: "1:207528072036:web:5aef07aeb70f5a07eca071"
};

export const getFirebaseConfig = () => {
    let env = "";
    if (process.env.REACT_APP_ENV) {
        env = process.env.REACT_APP_ENV;
    } else if (process.env.BACKEND_ENV) {
        env = process.env.BACKEND_ENV;
    }

    switch (env) {
        case "local":
            return firebaseConfigLocalTesting;
        case "development":
            return firebaseConfigDevelopment;
        case "staging":
            return firebaseConfigStaging;
        case "production":
            return firebaseConfigProduction;
        default:
            throw new Error("Unable to determine firebase environment. Set REACT_APP_ENV or BACKEND_ENV to values: local | development | staging | production");
    }
};

export const firebaseApp = initializeApp(getFirebaseConfig());

export const auth = getAuth();
export const signInFirebase = signInWithCustomToken;
export const updateUserEmail = updateEmail;
