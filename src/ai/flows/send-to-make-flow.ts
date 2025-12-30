
'use server';
/**
 * @fileOverview A server-side flow to send test application data to a Make.com webhook.
 * This file is structured to prevent recursion errors by separating the internal
 * Genkit flow from the exported function called by the UI.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

/**
 * INTERNAL FLOW: Handles the actual logic.
 * This is the Genkit flow object that will perform the fetch.
 */
const sendToMakeInternal = ai.defineFlow(
  {
    name: 'sendToMakeInternal',
    inputSchema: z.object({
      userId: z.string(),
      data: z.any(),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      message: z.string(),
    }),
  },
  async (input) => {
    // 1. Check for Config before trying anything
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    
    if (!webhookUrl || webhookUrl === 'YOUR_WEBHOOK_URL_HERE') {
      console.error("Backend Error: MAKE_WEBHOOK_URL is not defined in .env file.");
      return { 
        success: false, 
        message: "Configuration missing: Webhook URL not found in environment variables. Please set it in the .env file." 
      };
    }

    console.log('[sendToMakeInternal] Sending data to Make.com webhook...');
    try {
      // 2. Perform the actual fetch
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Ensure userId is part of the payload being sent
        body: JSON.stringify({ ...input.data, userId: input.userId }),
      });

      const responseBody = await response.text();

      if (!response.ok) {
        console.error(`[sendToMakeInternal] Webhook response not OK: ${response.status}`, responseBody);
        throw new Error(`Webhook failed with status ${response.status}: ${responseBody}`);
      }

      console.log('[sendToMakeInternal] Webhook sent successfully. Response:', responseBody);
      return { success: true, message: `Successfully sent test data. Response: ${responseBody}` };
    } catch (error: any) {
      console.error("Flow execution failed:", error.message);
      // Ensure a helpful error message is returned if the URL is invalid
      if (error.message.includes('fetch failed')) {
          return { success: false, message: 'The request to the webhook failed. Please check if the URL is correct and accessible.' };
      }
      return { success: false, message: error.message };
    }
  }
);

/**
 * EXPORTED FUNCTION: This is what your UI button calls.
 * It directly invokes the Genkit flow object.
 */
export async function triggerMakeWebhook(userId: string, sampleData: any) {
  console.log('[triggerMakeWebhook] Initiating webhook send.');
  try {
    // Directly call the flow object. This is the simplest and most reliable way.
    return await sendToMakeInternal({ userId, data: sampleData });
  } catch (error: any) {
    console.error("[triggerMakeWebhook] Critical system error:", error.message);
    return { success: false, message: "Critical System Error: " + error.message };
  }
}
