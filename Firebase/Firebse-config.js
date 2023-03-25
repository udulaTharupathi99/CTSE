import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA-epGVgaQ-0gdki_uB-Dbm-qkc2pcqNo4",
  authDomain: "uee-job-finder-project.firebaseapp.com",
  projectId: "uee-job-finder-project",
  storageBucket: "uee-job-finder-project.appspot.com",
  messagingSenderId: "122421237502",
  appId: "1:122421237502:web:0da7833527355e4e46b7af",
  measurementId: "G-FG1JW11Z0X",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
export { firebase };
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const storage = getStorage(app);
// const auth = getAuth(app);

// export { app, db, storage, auth };
