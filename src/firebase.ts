import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Metro resolves firebase/auth to the React Native bundle at runtime,
// which exports getReactNativePersistence — the browser TS types don't include it.
const { getReactNativePersistence } = require('firebase/auth') as any;

const firebaseConfig = {
  apiKey: "AIzaSyA60Q8QWVt2ZZ9cyoQoVeQJWRPo9wWvpYs",
  authDomain: "smarthvac-eng-ney.firebaseapp.com",
  projectId: "smarthvac-eng-ney",
  storageBucket: "smarthvac-eng-ney.firebasestorage.app",
  messagingSenderId: "246187990177",
  appId: "1:246187990177:android:8262b8ff58fa095dc2e4e0",
};

const isFirstInit = getApps().length === 0;
const app = isFirstInit ? initializeApp(firebaseConfig) : getApp();

export const auth = isFirstInit
  ? initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })
  : getAuth(app);

export const db = getFirestore(app);
