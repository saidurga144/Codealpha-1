"use client";

import { useEffect, useState } from "react";
import { Packet, AnalysisResult } from "@/lib/types";
import { analyzeNetworkTraffic } from "@/app/actions/analyze";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ThreatLevelBadge = ({ level }: { level: AnalysisResult["threatLevel"] }) => {
  const variant: "destructive" | "default" | "secondary" =
    level === "high" ? "destructive" : level === "medium" ? "default" : "secondary";
  
  return <Badge variant={variant} className="capitalize">{level}</Badge>;
};

export function ThreatAnalysis({ packet }: { packet: Packet }) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!packet) return;

    const runAnalysis = async () => {
      setIsLoading(true);
      setAnalysis(null);
      try {
        const input = {
          packetSummary: `${packet.timestamp} ${packet.src} -> ${packet.dst} ${packet.protocol} len=${packet.length} ${packet.summary}`,
          payloadPreviewHex: packet.payload.hex,
          payloadPreviewAscii: packet.payload.ascii,
        };
        const result = await analyzeNetworkTraffic(input);
        setAnalysis(result);
      } catch (e) {
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: "Could not get threat analysis from the AI model.",
        });
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Debounce analysis slightly to avoid spamming on rapid selection
    const timeoutId = setTimeout(runAnalysis, 300);
    return () => clearTimeout(timeoutId);

  }, [packet, toast]);
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-28" />
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
     return (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Ready to Analyze</AlertTitle>
          <AlertDescription>
            AI analysis will begin automatically for the selected packet.
          </AlertDescription>
        </Alert>
     );
  }

  return (
    <div className="space-y-4 text-sm">
      <div className="flex items-center justify-between">
        <span className="font-medium text-muted-foreground">Threat Level</span>
        <ThreatLevelBadge level={analysis.threatLevel} />
      </div>
      <div>
        <h4 className="font-medium text-muted-foreground mb-1">Threat Description</h4>
        <p className="p-3 bg-muted rounded-md">{analysis.threatDescription}</p>
      </div>
      <div>
        <h4 className="font-medium text-muted-foreground mb-2">Vulnerability Associations</h4>
        <div className="flex flex-wrap gap-2">
          {analysis.vulnerabilityAssociations.map((vuln, index) => (
            <Badge key={index} variant="secondary">{vuln}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
