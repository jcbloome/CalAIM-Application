
'use server';

// This file is the single entry point for initializing the Firebase Admin SDK.
// It ensures that all server-side flows and actions share the same
// authenticated instance, preventing initialization conflicts.

import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      // The SDK will automatically use Google Application Default Credentials
      // in a supported environment like Cloud Run or Cloud Functions.
      // No explicit credential configuration is needed here.
    });
    console.log('[dev.ts] Firebase Admin SDK initialized successfully.');
  } catch (error: any) {
    console.error('[dev.ts] CRITICAL: Firebase Admin SDK initialization failed.', error);
    // Throwing the error here will prevent the server from starting in a broken state.
    throw new Error(`Firebase Admin SDK failed to initialize: ${error.message}`);
  }
} else {
  console.log('[dev.ts] Firebase Admin SDK was already initialized.');
}


// Import flows and tools AFTER initialization
import '@/ai/flows/ai-prioritize-form-fields.ts';
import '@/ai/flows/ai-suggest-next-steps.ts';
import '@/ai/flows/manage-staff.ts';
import '@/ai/flows/manage-notifications.ts';
import '@/ai/flows/make-webhook.ts';
import '@/ai/flows/manage-reminders.ts';
import '@/ai/flows/send-to-make-flow.ts';
