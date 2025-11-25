
'use server';

import { Resend } from 'resend';
import RevisionRequestEmail from '@/components/emails/RevisionRequestEmail';
import ApplicationStatusEmail from '@/components/emails/ApplicationStatusEmail';

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not set. Email functionality will be disabled.");
}

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailPayload {
    to: string;
    subject: string;
    memberName: string;
    formName: string;
    revisionNotes: string;
}

interface ApplicationStatusPayload {
  to: string;
  subject: string;
  memberName: string;
  staffName: string;
  message: string;
  status: 'Deleted' | 'Approved' | 'Submitted'; // Example statuses
}

export const sendRevisionRequestEmail = async (payload: SendEmailPayload) => {
    const { to, subject, memberName, formName, revisionNotes } = payload;
    
    if (!process.env.RESEND_API_KEY) {
        throw new Error('Resend API key is not configured.');
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'CalAIM Pathfinder <onboarding@resend.dev>', // This must be a verified domain on Resend. 'onboarding@resend.dev' is for testing.
            to: [to],
            subject: subject,
            react: RevisionRequestEmail({
                memberName,
                formName,
                revisionNotes,
            }),
        });

        if (error) {
            console.error('Resend Error:', error);
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
};

export const sendApplicationStatusEmail = async (payload: ApplicationStatusPayload) => {
    const { to, subject, memberName, staffName, message, status } = payload;

    if (!process.env.RESEND_API_KEY) {
        throw new Error('Resend API key is not configured.');
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'CalAIM Pathfinder <onboarding@resend.dev>',
            to: [to],
            subject: subject,
            react: ApplicationStatusEmail({
                memberName,
                staffName,
                message,
                status,
            }),
        });

        if (error) {
            console.error('Resend Error:', error);
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
};
