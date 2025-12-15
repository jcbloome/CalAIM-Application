'use server';

import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { initializeAdminApp } from '@/firebase/admin-init';

// This file is intentionally left with no exported functions
// to prevent usage of the broken server-side user creation.
// All user creation is now handled client-side via an AI flow.
// See /admin/super/page.tsx for the new implementation.

// The old functions are commented out below for historical reference.

/*
interface CreateUserPayload {
    email: string;
    firstName: string;
    lastName: string;
}

// THIS FUNCTION IS DEPRECATED AND WILL NOT WORK.
export const createAdminUser = async (payload: CreateUserPayload) => {
    // ... implementation removed ...
};

// THIS FUNCTION IS DEPRECATED AND WILL NOT WORK.
export const createSuperAdminUser = async (payload: CreateUserPayload) => {
    // ... implementation removed ...
};
*/
