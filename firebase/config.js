// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKpyiIeUXITdvknew7Gd5qPXoNuhohtnA",
  authDomain: "juorneyapp.firebaseapp.com",
  projectId: "juorneyapp",
  storageBucket: "juorneyapp.appspot.com",
  databaseURL:
    "https://juorneyapp-default-rtdb.europe-west1.firebasedatabase.app/",
  messagingSenderId: "491740373793",
  appId: "1:491740373793:web:d30779fea41c596a311460",
  measurementId: "G-QQJKZYL6NM",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const storage = getStorage(firebase);
export const dataBase = getDatabase(firebase);
export const db = getFirestore(firebase);
