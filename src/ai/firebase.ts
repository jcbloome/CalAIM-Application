
'use server';

/**
 * @fileOverview This file contains the server-side Firebase Admin SDK initialization logic.
 * It ensures that the Admin SDK is initialized only once across all server-side
 * functions, flows, and components.
 *
 * It should be the VERY FIRST import in any server-side entry point (e.g., dev.ts).
 */

import * as admin from 'firebase-admin';

// Check if the app is already initialized to prevent errors.
if (!admin.apps.length) {
  try {
    // Initialize the app. The Admin SDK will automatically use Google
    // Application Default Credentials in a supported environment like App Hosting.
    admin.initializeApp();
    console.log('[firebase.ts] Firebase Admin SDK initialized successfully.');
  } catch (error: any) {
    // Log a critical error if initialization fails. This will likely cause
    // the server to fail to start, which is intended behavior to prevent
    // running in a broken state.
    console.error(
      '[firebase.ts] CRITICAL: Firebase Admin SDK initialization failed.',
      error
    );
    // Re-throw the error to halt execution.
    throw new Error(
      `Firebase Admin SDK failed to initialize: ${error.message}`
    );
  }
} else {
  // This message is helpful for debugging to confirm that the singleton
  // pattern is working as expected during hot-reloads in development.
  console.log('[firebase.ts] Firebase Admin SDK was already initialized.');
}
