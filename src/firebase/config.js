// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCPL8dX9rAd06TUVokdnPLARZPHBLC9Sbw",
  authDomain: "taskboard-app-348a7.firebaseapp.com",
  projectId: "taskboard-app-348a7",
  storageBucket: "taskboard-app-348a7.firebasestorage.app",
  messagingSenderId: "84799885100",
  appId: "1:84799885100:web:f4098057d1638913752689"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
const auth=getAuth(app)

export {db,auth}