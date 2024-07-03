// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, ProviderId} from "firebase/auth";


import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "react-course-a4289.firebaseapp.com",
  projectId: "react-course-a4289",
  storageBucket: "react-course-a4289.appspot.com",
  messagingSenderId: "333483336380",
  appId: "1:333483336380:web:8ad0a97c0041e51050e6b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);