"use client";

import { Packet } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Globe, Dna, ArrowRightLeft, Waves, AlertTriangle, HelpCircle } from "lucide-react";

const protocolIcons: { [key: string]: React.ReactNode } = {
  HTTP: <Globe className="h-4 w-4 text-blue-500" />,
  DNS: <Dna className="h-4 w-4 text-green-500" />,
  TCP: <ArrowRightLeft className="h-4 w-4 text-orange-500" />,
  UDP: <Waves className="h-4 w-4 text-purple-500" />,
  ICMP: <AlertTriangle className="h-4 w-4 text-red-500" />,
};

const getProtocolIcon = (protocol: string) => {
  const mainProtocol = protocol.split("/")[0].toUpperCase();
  return protocolIcons[mainProtocol] || <HelpCircle className="h-4 w-4 text-muted-foreground" />;
};


export function PacketTable({
  packets,
  selectedPacket,
  onSelectPacket,
}: {
  packets: Packet[];
  selectedPacket: Packet | null;
  onSelectPacket: (packet: Packet) => void;
}) {
  return (
    <Card className="h-full flex-1 flex flex-col">
       <CardHeader className="p-4 md:p-6">
        <CardTitle>Live Packet Capture</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col min-h-[400px] md:min-h-0">
        <ScrollArea className="flex-1">
          <Table>
            <TableHeader className="sticky top-0 bg-background/95 backdrop-blur-sm">
              <TableRow>
                <TableHead className="w-[100px] md:w-[180px]">Timestamp</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="hidden md:table-cell">Destination</TableHead>
                <TableHead className="w-[100px] text-center">Protocol</TableHead>
                <TableHead className="w-[100px] text-right">Length</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packets.map((packet) => (
                <TableRow
                  key={packet.id}
                  onClick={() => onSelectPacket(packet)}
                  className={cn(
                    "cursor-pointer",
                    selectedPacket?.id === packet.id && "bg-accent/50"
                  )}
                >
                  <TableCell className="font-mono text-xs">{packet.timestamp}</TableCell>
                  <TableCell className="font-mono text-xs truncate max-w-[120px] md:max-w-none">{packet.src}</TableCell>
                  <TableCell className="font-mono text-xs hidden md:table-cell truncate max-w-[120px] md:max-w-none">{packet.dst}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      {getProtocolIcon(packet.protocol)}
                      <span className="text-xs hidden sm:inline">{packet.protocol}</span>
                    </div>

                  </TableCell>
                  <TableCell className="text-right font-mono text-xs">{packet.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {packets.length === 0 && (
             <div className="text-center p-8 text-muted-foreground">
              No packets captured yet.
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
