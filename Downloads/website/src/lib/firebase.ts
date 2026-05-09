import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9CX6QsvzGEh-nA0Idiw_LwqCH2HNYwa0",
  authDomain: "lead-academy-d9705.firebaseapp.com",
  projectId: "lead-academy-d9705",
  storageBucket: "lead-academy-d9705.firebasestorage.app",
  messagingSenderId: "1090312998956",
  appId: "1:1090312998956:web:70bd9bd689ffe231e9c189",
  measurementId: "G-57LGDBE9T4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider);

export { RecaptchaVerifier, signInWithPhoneNumber };
export const logout = () => auth.signOut();