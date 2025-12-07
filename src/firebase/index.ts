
'use client';

// This file serves as the main entry point for all client-side Firebase functionality.
// It should only export hooks, providers, and other modules that are safe to run in a client environment.
// It MUST NOT contain any code that executes immediately upon import, such as initialization functions,
// as this can cause server-side rendering (SSR) failures.

// Initialization logic has been moved to a separate file (e.g., client-init.ts) and is
// called exclusively from the top-level client provider.

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
