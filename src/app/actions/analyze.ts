"use server";

import {
  analyzeNetworkTraffic as analyze,
  type AnalyzeNetworkTrafficInput,
  type AnalyzeNetworkTrafficOutput,
} from "@/ai/flows/automated-threat-detection";

export async function analyzeNetworkTraffic(
  input: AnalyzeNetworkTrafficInput
): Promise<AnalyzeNetworkTrafficOutput> {
  try {
    const result = await analyze(input);
    return result;
  } catch (error) {
    console.error("Error in threat analysis:", error);
    throw new Error("Failed to perform threat analysis.");
  }
}
