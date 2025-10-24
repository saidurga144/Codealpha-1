"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Packet } from "@/lib/types";
import { generateMockPacket } from "@/lib/mock-packets";
import { PacketTable } from "@/components/dashboard/packet-table";
import { PacketDetail } from "@/components/dashboard/packet-detail";
import { Toolbar } from "@/components/dashboard/toolbar";
import { Logo } from "@/components/logo";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("");
  const isMobile = useIsMobile();

  useEffect(() => {
    // Pre-populate with a few packets
    setPackets(Array.from({ length: 20 }, generateMockPacket));
  }, []);

  useEffect(() => {
    if (!isCapturing) {
      return;
    }
    const intervalId = setInterval(() => {
      setPackets((prev) =>
        [generateMockPacket(), ...prev].slice(0, 200)
      );
    }, 1200);

    return () => clearInterval(intervalId);
  }, [isCapturing]);

  const handleToggleCapture = useCallback(() => {
    setIsCapturing((prev) => !prev);
  }, []);

  const handleClear = useCallback(() => {
    setPackets([]);
    setSelectedPacket(null);
  }, []);

  const handleExport = useCallback(() => {
    const dataStr = JSON.stringify(packets, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "packet_capture.json";
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }, [packets]);

  const filteredPackets = useMemo(() => {
    if (!filter) return packets;
    return packets.filter((p) => {
      const searchStr = `${p.src} ${p.dst} ${p.protocol} ${p.summary}`.toLowerCase();
      return searchStr.includes(filter.toLowerCase());
    });
  }, [packets, filter]);

  const handleSelectPacket = useCallback((packet: Packet) => {
    setSelectedPacket(packet);
  }, []);
  
  const handleSheetOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedPacket(null);
    }
  };

  const MainContent = () => (
    <div className="md:w-3/5 flex flex-col gap-4">
      <PacketTable
        packets={filteredPackets}
        selectedPacket={selectedPacket}
        onSelectPacket={handleSelectPacket}
      />
    </div>
  );

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
          <Logo />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Packet Detective</h1>
          </div>
          <div className="flex items-center gap-4">
            <Toolbar
              isCapturing={isCapturing}
              onToggleCapture={handleToggleCapture}
              onClear={handleClear}
              onExport={handleExport}
              filter={filter}
              onFilterChange={setFilter}
            />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 flex flex-col md:flex-row gap-6">
          {isMobile ? (
            <>
              <MainContent />
              <Sheet open={!!selectedPacket} onOpenChange={handleSheetOpenChange}>
                <SheetContent side="bottom" className="h-[85vh] p-0 border-t">
                  {selectedPacket && <PacketDetail packet={selectedPacket} />}
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <>
              <MainContent />
              <div className="md:w-2/5 flex flex-col">
                {selectedPacket ? (
                  <PacketDetail packet={selectedPacket} />
                ) : (
                  <Card className="flex-1 flex items-center justify-center">
                    <CardContent className="p-6 text-center text-muted-foreground">
                      <Search className="mx-auto h-12 w-12" />
                      <h3 className="mt-4 text-lg font-medium">No Packet Selected</h3>
                      <p className="mt-1 text-sm">
                        Click on a packet in the table to see its details and threat analysis.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </TooltipProvider>
  );
}
