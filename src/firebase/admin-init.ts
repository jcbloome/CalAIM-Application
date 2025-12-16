import { initializeApp, getApps, App, cert } from 'firebase-admin/app';

// This is a guard to prevent re-initializing the app on hot reloads.
export function initializeAdminApp(): App {
  const a = getApps().find(app => app.name === 'firebase-admin');
  if (a) {
    return a;
  }
  
  // Initialize without arguments to use Application Default Credentials
  return initializeApp({}, 'firebase-admin');
}
