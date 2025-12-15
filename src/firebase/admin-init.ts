
import { initializeApp, getApps, getApp, type App, cert } from 'firebase-admin/app';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : null;

const adminAppId = 'firebase-admin-app-e1a2b3c4d5';

export function initializeAdminApp(): App {
  const existingApp = getApps().find(app => app.name === adminAppId);
  if (existingApp) {
    return existingApp;
  }

  // If the service account is available, create a credential object.
  const credential = serviceAccount ? cert(serviceAccount) : undefined;

  // Conditionally create the app with credentials if they exist,
  // otherwise, initialize with default credentials for the environment.
  return initializeApp(credential ? { credential } : {}, adminAppId);
}
