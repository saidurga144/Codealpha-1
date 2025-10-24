"use client";

import { Packet } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThreatAnalysis } from "./threat-analysis";
import { ScrollArea } from "@/components/ui/scroll-area";

export function PacketDetail({ packet }: { packet: Packet }) {
  const { timestamp, src, dst, protocol, length, summary, payload } = packet;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Packet Details</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <Tabs defaultValue="details" className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="payload">Payload</TabsTrigger>
            <TabsTrigger value="analysis">Threat Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4 flex-1">
             <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-muted-foreground">Timestamp</span>
                  <span className="font-mono">{timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-muted-foreground">Source</span>
                  <span className="font-mono">{src}</span>
                </div>
                 <div className="flex justify-between">
                  <span className="font-medium text-muted-foreground">Destination</span>
                  <span className="font-mono">{dst}</span>
                </div>
                 <div className="flex justify-between">
                  <span className="font-medium text-muted-foreground">Protocol</span>
                  <span className="font-mono">{protocol}</span>
                </div>
                 <div className="flex justify-between">
                  <span className="font-medium text-muted-foreground">Length</span>
                  <span className="font-mono">{length} bytes</span>
                </div>
                <div className="flex flex-col pt-2">
                  <span className="font-medium text-muted-foreground">Summary</span>
                  <p className="font-mono text-xs mt-1 p-2 bg-muted rounded-md">{summary}</p>
                </div>
              </div>
          </TabsContent>
          <TabsContent value="payload" className="mt-4 flex-1 flex flex-col min-h-0">
             <ScrollArea className="flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-code text-xs">
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Hexadecimal</h4>
                  <pre className="p-3 bg-muted rounded-md whitespace-pre-wrap break-all">{payload.hex}</pre>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm">ASCII</h4>
                  <pre className="p-3 bg-muted rounded-md whitespace-pre-wrap break-all">{payload.ascii}</pre>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="analysis" className="mt-4 flex-1">
            <ThreatAnalysis packet={packet} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
