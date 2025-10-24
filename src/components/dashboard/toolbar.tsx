"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Play,
  Pause,
  Trash2,
  FileJson,
  Filter,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ToolbarProps = {
  isCapturing: boolean;
  onToggleCapture: () => void;
  onClear: () => void;
  onExport: () => void;
  filter: string;
  onFilterChange: (value: string) => void;
};

export function Toolbar({
  isCapturing,
  onToggleCapture,
  onClear,
  onExport,
  filter,
  onFilterChange,
}: ToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Filter packets..."
          className="pl-8 sm:w-[200px] md:w-[250px] h-9"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
        />
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={onToggleCapture} className="h-9 w-9">
            {isCapturing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isCapturing ? "Pause Capture" : "Start Capture"}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={onClear} className="h-9 w-9">
            <Trash2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Clear Packets</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={onExport} className="h-9 w-9">
            <FileJson className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Export as JSON</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
