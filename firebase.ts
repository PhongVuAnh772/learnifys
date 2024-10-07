// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSV9wD8FRoCPYhE3hfjFXXAifcDJJx2xo",
  authDomain: "e-learning-dbc62.firebaseapp.com",
  databaseURL: "https://e-learning-dbc62-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "e-learning-dbc62",
  storageBucket: "e-learning-dbc62.appspot.com",
  messagingSenderId: "592359907391",
  appId: "1:592359907391:web:fa39f4b1324daff06a188a",
  measurementId: "G-JNM98P4HGX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Get Firebase Authentication
export const auth = getAuth(app);

export const db = getFirestore(app);


// Optional: Initialize Analytics
export const analytics = getAnalytics(app);
