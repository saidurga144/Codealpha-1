import type { AnalyzeNetworkTrafficOutput } from '@/ai/flows/automated-threat-detection';

export type Packet = {
  id: string;
  timestamp: string;
  src: string;
  dst: string;
  protocol: string;
  length: number;
  summary: string;
  payload: {
    hex: string;
    ascii: string;
  };
};

export type AnalysisResult = AnalyzeNetworkTrafficOutput;
