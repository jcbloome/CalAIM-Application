
import { initializeApp, getApps, getApp, type App } from 'firebase-admin/app';

const adminAppId = 'firebase-admin-app-e1a2b3c4d5';

// This function initializes the Firebase Admin SDK.
// It is intended to be used only in server-side code (e.g., Server Actions).
export function initializeAdminApp(): App {
  // getApps() returns an array of all initialized apps.
  // We check if an app with our custom ID already exists to prevent re-initialization.
  const existingApp = getApps().find(app => app.name === adminAppId);
  if (existingApp) {
    return existingApp;
  }

  // If the app doesn't exist, initialize it with a unique name.
  // The Admin SDK automatically uses the GOOGLE_APPLICATION_CREDENTIALS
  // environment variable for authentication, so no config object is needed.
  return initializeApp({}, adminAppId);
}
