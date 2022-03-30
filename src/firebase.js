import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAQBDox7EQ2yLY9diaXbdrED4Pr4UTQ9TE",
    authDomain: "bachelor-project-ed90c.firebaseapp.com",
    projectId: "bachelor-project-ed90c",
    storageBucket: "bachelor-project-ed90c.appspot.com",
    messagingSenderId: "883962923969",
    appId: "1:883962923969:web:5ec79a7069e412a9e8bd40",
    measurementId: "G-ZGRHN04R03"
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app);

export {db, auth}