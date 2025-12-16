'use server';

/**
 * @fileOverview Finds a user by email using the Firebase Admin SDK.
 * This flow is designed to be called from a secure, admin-only context.
 *
 * - findUserByEmail - A function that finds a user by their email.
 * - FindUserByEmailOutput - The return type for the findUserByEmail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { initializeApp, getApps, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const adminAppId = 'firebase-admin-app-e1a2b3c4d5';

function initializeAdminApp(): App {
  const existingApp = getApps().find(app => app.name === adminAppId);
  if (existingApp) {
    return existingApp;
  }
  return initializeApp({}, adminAppId);
}


const FindUserByEmailInputSchema = z.string().email();

const FindUserByEmailOutputSchema = z.object({
  uid: z.string().optional(),
  error: z.string().optional(),
});
export type FindUserByEmailOutput = z.infer<typeof FindUserByEmailOutputSchema>;

export async function findUserByEmail(email: string): Promise<FindUserByEmailOutput> {
  return findUserByEmailFlow(email);
}

const findUserByEmailFlow = ai.defineFlow(
  {
    name: 'findUserByEmailFlow',
    inputSchema: FindUserByEmailInputSchema,
    outputSchema: FindUserByEmailOutputSchema,
  },
  async (email) => {
    try {
      const adminApp = initializeAdminApp();
      const adminAuth = getAuth(adminApp);

      const userRecord = await adminAuth.getUserByEmail(email);
      return { uid: userRecord.uid };

    } catch (error: any) {
      console.error('Find User By Email Flow Error:', error);
      if (error.code === 'auth/user-not-found') {
        return { error: 'User not found in Firebase Authentication.' };
      }
      return {
        error: error.message || 'An unexpected error occurred while finding the user.',
      };
    }
  }
);
