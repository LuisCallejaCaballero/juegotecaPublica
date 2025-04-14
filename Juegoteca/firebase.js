// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9cGjUxRO6Vtg4oBuh_lVJbCzUbApQut0",
  authDomain: "arcade-games-3bed6.firebaseapp.com",
  projectId: "arcade-games-3bed6",
  storageBucket: "arcade-games-3bed6.firebasestorage.app",
  messagingSenderId: "369595077089",
  appId: "1:369595077089:web:e2f369098ebf6bb128c2a0",
  measurementId: "G-9CZGB69B1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);