// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments()

// DEV ENVIRONMENT
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDH8tEdg2CNr5FBkzqX9MddFwSulAOHR_s",
//   authDomain: "journal-app-20214.firebaseapp.com",
//   projectId: "journal-app-20214",
//   storageBucket: "journal-app-20214.appspot.com",
//   messagingSenderId: "330111051277",
//   appId: "1:330111051277:web:949e03850306dd1f7c1744"
// };


const firebaseConfig = {
  apiKey: VITE_APIKEY ,
  authDomain: VITE_AUTHDOMAIN ,
  projectId: VITE_PROJECTID ,
  storageBucket: VITE_STORAGEBUCKET ,
  messagingSenderId: VITE_MESSAGINGSENDERID ,
  appId: VITE_APPID 
};


// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);