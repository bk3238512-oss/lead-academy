// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9CX6QsvzGEh-nA0Idiw_LwqCH2HNYwa0",
  authDomain: "lead-academy-d9705.firebaseapp.com",
  projectId: "lead-academy-d9705",
  storageBucket: "lead-academy-d9705.firebasestorage.app",
  messagingSenderId: "1090312998956",
  appId: "1:1090312998956:web:70bd9bd689ffe231e9c189",
  measurementId: "G-57LGDBE9T4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);