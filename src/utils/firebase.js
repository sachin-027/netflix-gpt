// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwhrQMgyq4_EE91soI3bRE2ztPMz_qNBg",
  authDomain: "netflixgpt-82f5a.firebaseapp.com",
  projectId: "netflixgpt-82f5a",
  storageBucket: "netflixgpt-82f5a.firebasestorage.app",
  messagingSenderId: "27058107550",
  appId: "1:27058107550:web:2bb7753cf80a3169cb378f",
  measurementId: "G-EFY9ZNPLE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);