// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDH20eVIGtw-D5BSWhe9JkWtcIRAQL5ZXg",
  authDomain: "crypto-tracker-6e7d1.firebaseapp.com",
  projectId: "crypto-tracker-6e7d1",
  storageBucket: "crypto-tracker-6e7d1.firebasestorage.app",
  messagingSenderId: "687602642472",
  appId: "1:687602642472:web:bf31c1174786dbdf06cf1d",
  measurementId: "G-X97SMBZFXL",
};
const googleAuthPublicFacingName = "project-687602642472";
// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp); // For Authentication
const db = getFirestore(firebaseApp); // For Using Database
export { auth, db };
