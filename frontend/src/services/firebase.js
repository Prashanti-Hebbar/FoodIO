// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//add your own configuration here
const firebaseConfig = {

    
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "foodio-test-24590.firebaseapp.com",
  projectId: "foodio-test-24590",
  storageBucket: "foodio-test-24590.firebasestorage.app",
  messagingSenderId: "1040257717042",
  appId: "1:1040257717042:web:94bb65a78dbb2e124dfd2b",
  measurementId: "G-919SB267JG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();