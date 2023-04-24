// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH8tEdg2CNr5FBkzqX9MddFwSulAOHR_s",
  authDomain: "journal-app-20214.firebaseapp.com",
  projectId: "journal-app-20214",
  storageBucket: "journal-app-20214.appspot.com",
  messagingSenderId: "330111051277",
  appId: "1:330111051277:web:949e03850306dd1f7c1744"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);