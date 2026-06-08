import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, inMemoryPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

// inMemoryPersistence is used because getReactNativePersistence requires
// the native Firebase SDK. For EAS production builds, migrate to
// @react-native-firebase for full AsyncStorage persistence.
export const auth = isFirstInit
  ? initializeAuth(app, { persistence: inMemoryPersistence })
  : getAuth(app);

export const db = getFirestore(app);
