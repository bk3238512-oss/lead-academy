// Firebase initialization for a TypeScript module
// Use Firebase JS SDK from npm packages (install firebase) instead of CDN script tags
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9CX6QsvzGEh-nA0Idiw_LwqCH2HNYwa0",
  authDomain: "lead-academy-d9705.firebaseapp.com",
  projectId: "lead-academy-d9705",
  storageBucket: "lead-academy-d9705.firebasestorage.app",
  messagingSenderId: "1090312998956",
  appId: "1:1090312998956:web:c6731bc02b0879fce9c189",
  measurementId: "G-Q9ZX2JKQ7Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// getAnalytics may throw on non-browser environments (SSR). Guard it.
export let analytics: ReturnType<typeof getAnalytics> | undefined;
try {
  analytics = getAnalytics(app);
} catch (e) {
  analytics = undefined;
}

export default app;