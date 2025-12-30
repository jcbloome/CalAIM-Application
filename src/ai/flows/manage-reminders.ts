
'use server';
/**
 * @fileOverview A simple server action for sending reminder emails.
 * This file replaces the more complex Genkit flow to avoid recursion issues.
 */
import '@/ai/firebase'; // CRITICAL: Ensures Firebase Admin is initialized.
import * as admin from 'firebase-admin';
import { sendReminderEmail } from '@/app/actions/send-email';

interface SendRemindersOutput {
    success: boolean;
    sentCount: number;
    message: string;
}

/**
 * Finds incomplete applications and sends reminder emails directly.
 * This is a standard Next.js Server Action, not a Genkit flow.
 */
export async function sendReminderEmails(): Promise<SendRemindersOutput> {
    const firestore = admin.firestore();

    try {
        const applicationsSnapshot = await firestore.collectionGroup('applications')
            .where('status', 'in', ['In Progress', 'Requires Revision'])
            .get();
        
        let sentCount = 0;

        for (const doc of applicationsSnapshot.docs) {
            const app = doc.data() as any;
            
            // Find pending forms or uploads
            const incompleteItems = app.forms
                ?.filter((form: any) => form.status === 'Pending')
                .map((form: any) => form.name);
            
            // Only send if there are incomplete items and an email to send to
            if (incompleteItems && incompleteItems.length > 0 && app.referrerEmail) {
                await sendReminderEmail({
                    to: app.referrerEmail,
                    subject: `Reminder: Action needed for CalAIM application for ${app.memberFirstName} ${app.memberLastName}`,
                    referrerName: app.referrerName || 'there',
                    memberName: `${app.memberFirstName} ${app.memberLastName}`,
                    applicationId: app.id,
                    incompleteItems,
                });
                sentCount++;
            }
        }
        
        return { success: true, sentCount, message: `Sent ${sentCount} reminder emails.` };

    } catch (error: any) {
        console.error('[sendReminderEmails] Error:', error);
        return { success: false, sentCount: 0, message: `Failed to send reminders: ${error.message}` };
    }
}
