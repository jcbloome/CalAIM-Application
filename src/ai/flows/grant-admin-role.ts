
'use server';
/**
 * @fileOverview A server-side flow to grant admin privileges to a user.
 *
 * This flow handles the logic for finding an existing user by email or creating a new one,
 * and then creating the necessary Firestore documents to grant them admin rights.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeAdminApp } from '@/firebase/admin-init';

// Ensure the admin app is initialized
try {
    initializeAdminApp();
    console.log("Firebase Admin SDK initialized successfully in grant-admin-role flow.");
} catch (e) {
    console.error("CRITICAL: Firebase Admin SDK failed to initialize in grant-admin-role flow.", e);
}


const GrantAdminRoleInputSchema = z.object({
  email: z.string().email().describe('The email address of the user to be granted admin privileges.'),
  firstName: z.string().describe('The first name of the user.'),
  lastName: z.string().describe('The last name of the user.'),
});
export type GrantAdminRoleInput = z.infer<typeof GrantAdminRoleInputSchema>;

const GrantAdminRoleOutputSchema = z.object({
  uid: z.string().describe('The UID of the user who was granted admin privileges.'),
  email: z.string().describe('The email of the user.'),
  message: z.string().describe('A confirmation message.'),
});
export type GrantAdminRoleOutput = z.infer<typeof GrantAdminRoleOutputSchema>;


/**
 * Public function to be called from the client.
 * This wraps the Genkit flow.
 */
export async function grantAdminRole(input: GrantAdminRoleInput): Promise<GrantAdminRoleOutput> {
  console.log(`[grantAdminRole] Starting flow for email: ${input.email}`);
  return grantAdminRoleFlow(input);
}


const grantAdminRoleFlow = ai.defineFlow(
  {
    name: 'grantAdminRoleFlow',
    inputSchema: GrantAdminRoleInputSchema,
    outputSchema: GrantAdminRoleOutputSchema,
  },
  async (input) => {
    console.log('[grantAdminRoleFlow] Entered defineFlow execution.');
    const auth = getAuth();
    const firestore = getFirestore();
    const { email, firstName, lastName } = input;
    const displayName = `${firstName} ${lastName}`.trim();

    let uid: string;
    let userExists = false;

    try {
      console.log(`[grantAdminRoleFlow] Attempting to find user by email: ${email}`);
      const userRecord = await auth.getUserByEmail(email);
      uid = userRecord.uid;
      userExists = true;
      console.log(`[grantAdminRoleFlow] Found existing user with UID: ${uid}`);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        console.log(`[grantAdminRoleFlow] User not found. Creating new user for: ${email}`);
        const newUserRecord = await auth.createUser({
          email: email,
          displayName: displayName,
          password: `temp_${new Date().getTime()}`,
        });
        uid = newUserRecord.uid;
        console.log(`[grantAdminRoleFlow] Created new user with UID: ${uid}`);
      } else {
        console.error('[grantAdminRoleFlow] Error looking up or creating user:', error);
        throw error;
      }
    }

    console.log(`[grantAdminRoleFlow] Proceeding with UID: ${uid}. Starting Firestore batch write.`);
    const userDocRef = firestore.collection('users').doc(uid);
    const adminRoleRef = firestore.collection('roles_admin').doc(uid);

    const batch = firestore.batch();

    batch.set(userDocRef, {
      id: uid,
      email: email,
      firstName: firstName,
      lastName: lastName,
      displayName: displayName,
    }, { merge: true });
    console.log(`[grantAdminRoleFlow] Batch: Set user document at ${userDocRef.path}`);

    batch.set(adminRoleRef, { grantedAt: new Date() });
    console.log(`[grantAdminRoleFlow] Batch: Set admin role at ${adminRoleRef.path}`);

    await batch.commit();
    console.log('[grantAdminRoleFlow] Batch commit successful.');

    const message = userExists 
        ? `Successfully granted admin role to existing user ${email}.`
        : `Successfully created new user ${email} and granted admin role.`;

    console.log(`[grantAdminRoleFlow] Flow successful. Returning message: "${message}"`);
    return {
      uid,
      email,
      message,
    };
  }
);
