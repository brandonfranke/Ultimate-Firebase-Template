import { FirebaseOptions, initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
import { getPerformance } from "firebase/performance";
import { getFunctions } from "firebase/functions";

import { env } from "@utils/other";

const firebaseConfig: FirebaseOptions = {
  apiKey: env("VITE_FIREBASE_CONFIG_API_KEY"),
  authDomain: env("VITE_FIREBASE_CONFIG_AUTH_DOMAIN"),
  projectId: env("VITE_FIREBASE_CONFIG_PROJECT_ID"),
  storageBucket: env("VITE_FIREBASE_CONFIG_STORAGE_BUCKET"),
  messagingSenderId: env("VITE_FIREBASE_CONFIG_MESSAGING_SENDER_ID"),
  appId: env("VITE_FIREBASE_CONFIG_APP_ID"),
};

//Remove the features you do not need
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const messaging = getMessaging(app);
export const perf = getPerformance(app);
export const analytics = getAnalytics(app);
export const functions = getFunctions(app);

if (env("MODE") === "development") {
  app.automaticDataCollectionEnabled = false;
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
}
