
'use server';
/**
 * @fileOverview A server-side flow to send test application data to a Make.com webhook.
 * This file is structured to prevent recursion errors by separating the internal
 * Genkit flow from the exported function called by the UI.
 */
import { ai } from '@/ai/genkit';
import { run } from 'genkit';
import { z } from 'zod';

/**
 * INTERNAL FLOW: Handles the actual logic.
 * By keeping this separate from the exported function, 
 * we prevent the UI from accidentally calling a recursive loop.
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
    
    if (!webhookUrl) {
      console.error("Backend Error: MAKE_WEBHOOK_URL is not defined.");
      return { 
        success: false, 
        message: "Configuration missing: Webhook URL not found in environment variables." 
      };
    }

    console.log('[sendToMakeInternal] Sending data to Make.com webhook...');
    try {
      // 2. Perform the actual fetch (No self-calls here!)
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input.data),
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
      return { success: false, message: error.message };
    }
  }
);

/**
 * EXPORTED FUNCTION: This is what your UI button calls.
 * It triggers the flow once and returns the result.
 */
export async function triggerMakeWebhook(userId: string, sampleData: any) {
  console.log('[triggerMakeWebhook] Initiating webhook send.');
  try {
    // We call the internal flow once. No recursion is possible here.
    return await run(sendToMakeInternal, { userId, data: sampleData });
  } catch (error: any) {
    console.error("[triggerMakeWebhook] Critical system error:", error.message);
    return { success: false, message: "Critical System Error: " + error.message };
  }
}
