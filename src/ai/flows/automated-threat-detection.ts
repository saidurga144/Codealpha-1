'use server';

/**
 * @fileOverview An AI-powered tool for analyzing network traffic and predicting potential threats.
 *
 * - analyzeNetworkTraffic - A function that handles the network traffic analysis process.
 * - AnalyzeNetworkTrafficInput - The input type for the analyzeNetworkTraffic function.
 * - AnalyzeNetworkTrafficOutput - The return type for the analyzeNetworkTraffic function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeNetworkTrafficInputSchema = z.object({
  packetSummary: z
    .string()
    .describe('A summary of the network packet, including timestamp, source/destination IPs and ports, protocol, and length.'),
  payloadPreviewHex: z.string().describe('A truncated preview of the packet payload in hex format.'),
  payloadPreviewAscii: z.string().describe('A truncated preview of the packet payload in ASCII format.'),
});
export type AnalyzeNetworkTrafficInput = z.infer<typeof AnalyzeNetworkTrafficInputSchema>;

const AnalyzeNetworkTrafficOutputSchema = z.object({
  threatLevel: z
    .enum(['low', 'medium', 'high'])
    .describe('The predicted threat level of the network traffic.'),
  threatDescription: z.string().describe('A description of the potential threat.'),
  vulnerabilityAssociations: z
    .array(z.string())
    .describe('A list of potential vulnerability classes associated with the network traffic.'),
});
export type AnalyzeNetworkTrafficOutput = z.infer<typeof AnalyzeNetworkTrafficOutputSchema>;

export async function analyzeNetworkTraffic(
  input: AnalyzeNetworkTrafficInput
): Promise<AnalyzeNetworkTrafficOutput> {
  return analyzeNetworkTrafficFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeNetworkTrafficPrompt',
  input: {schema: AnalyzeNetworkTrafficInputSchema},
  output: {schema: AnalyzeNetworkTrafficOutputSchema},
  prompt: `You are an AI-powered network security analyst. Your task is to analyze network traffic and predict potential threats.

  Based on the provided packet summary and payload previews, determine the threat level, describe the potential threat, and identify potential vulnerability associations.

  Packet Summary: {{{packetSummary}}}
  Payload Preview (Hex): {{{payloadPreviewHex}}}
  Payload Preview (ASCII): {{{payloadPreviewAscii}}}

  Threat Level (low, medium, high): 
  Threat Description:
  Vulnerability Associations (list of vulnerability classes):`,
});

const analyzeNetworkTrafficFlow = ai.defineFlow(
  {
    name: 'analyzeNetworkTrafficFlow',
    inputSchema: AnalyzeNetworkTrafficInputSchema,
    outputSchema: AnalyzeNetworkTrafficOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
