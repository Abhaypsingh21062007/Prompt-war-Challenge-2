import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB9HDjWflrNCi1Bn9CqG_cYTjx9SEzIPoU",
  authDomain: "election-guide-ai-adcdc.firebaseapp.com",
  projectId: "election-guide-ai-adcdc",
  storageBucket: "election-guide-ai-adcdc.firebasestorage.app",
  messagingSenderId: "311054229457",
  appId: "1:311054229457:web:63b531ea1948a99d3a4af0",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
