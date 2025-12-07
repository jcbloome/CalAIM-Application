
// This file is exclusively for client-side Firebase initialization.
// It should ONLY be imported by top-level client components (e.g., FirebaseClientProvider).
import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

interface FirebaseSdks {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

function getSdks(firebaseApp: FirebaseApp): FirebaseSdks {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
  };
}

export function initializeFirebase(): FirebaseSdks {
  if (!getApps().length) {
    // Always initialize with the explicit config for consistent behavior
    // across all environments.
    const firebaseApp = initializeApp(firebaseConfig);
    return getSdks(firebaseApp);
  }

  // If the app is already initialized, just get the instance and SDKs.
  return getSdks(getApp());
}
