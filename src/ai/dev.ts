'use server';
import { config } from 'dotenv';
config();

import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK only if it hasn't been already.
// This call will automatically use the GOOGLE_APPLICATION_CREDENTIALS 
// environment variable if it's set in the .env file.
if (!admin.apps.length) {
  admin.initializeApp();
}

// Import flows after initialization
import '@/ai/flows/ai-prioritize-form-fields.ts';
import '@/ai/flows/ai-suggest-next-steps.ts';
import '@/ai/flows/send-to-make-flow.ts';
import '@/ai/flows/manage-staff.ts';
import '@/ai/flows/manage-notifications.ts';
import '@/ai/flows/make-webhook.ts';
