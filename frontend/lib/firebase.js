import { initializeApp } from "firebase/app";

/**
 * ==========================================================
 * Firebase Configuration
 * ----------------------------------------------------------
 * Loads Firebase configuration from environment variables.
 * Environment variables keep project configuration separate
 * from the application code.
 * ==========================================================
 */

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * ==========================================================
 * Initialize Firebase Application
 * ----------------------------------------------------------
 * Creates a single Firebase app instance that is shared
 * across the entire application.
 * ==========================================================
 */

const app = initializeApp(firebaseConfig);

export default app;