import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCzcW-khPwmkMia1l1RAKri1HMCfRRZaqs",
    authDomain: "nextleet-3ebd0.firebaseapp.com",
    projectId: "nextleet-3ebd0",
    storageBucket: "nextleet-3ebd0.appspot.com",
    messagingSenderId: "595450453525",
    appId: "1:595450453525:web:5e41ae37d514b6a61a781c"
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, app };