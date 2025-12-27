import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI({
      auth: {
        // This forces Genkit to re-evaluate and use the environment's
        // Application Default Credentials on startup.
        // It's a more robust way to handle auth in managed dev environments.
        getGoogleAuth: async () => (await import('google-auth-library')).auth,
      },
    }),
  ],
});
