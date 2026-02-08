"use client";

import { RiCheckLine, RiExportLine, RiFileExcel2Line, RiFilePdf2Line } from "@remixicon/react";
import { useState } from "react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { CampaignProps } from "@/types";
import { cn } from "@/lib";

interface ExportProps {
  campaigns: CampaignProps[];
  selectedCampaigns: CampaignProps[];
}

type ExportFormat = "csv" | "excel" | "pdf";
type ExportScope = "all" | "selected" | "filtered";

export const Export = ({ campaigns, selectedCampaigns }: ExportProps) => {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<ExportFormat>("csv");
  const [scope, setScope] = useState<ExportScope>("filtered");
  const [isExporting, setIsExporting] = useState(false);

  const hasSelection = selectedCampaigns.length > 0;

  const handleExport = async () => {
    setIsExporting(true);

    const dataToExport = scope === "selected" ? selectedCampaigns : campaigns;

    // Simulate export delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate CSV content
    if (format === "csv") {
      const headers = ["Name", "Status", "Budget", "Impressions", "Clicks", "Cost", "Start Date", "End Date"];
      const rows = dataToExport.map((c) => [
        c.name,
        c.status,
        c.budget,
        c.impressions,
        c.clicks,
        c.cost,
        c.start_date,
        c.end_date,
      ]);

      const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `campaigns-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }

    setIsExporting(false);
    setOpen(false);
    toast.success(`Exported ${dataToExport.length} campaign(s) as ${format.toUpperCase()}`);
  };

  const formatOptions: { value: ExportFormat; label: string; icon: React.ReactNode }[] = [
    { value: "csv", label: "CSV", icon: <RiFileExcel2Line className="size-5" /> },
    { value: "excel", label: "Excel", icon: <RiFileExcel2Line className="size-5" /> },
    { value: "pdf", label: "PDF", icon: <RiFilePdf2Line className="size-5" /> },
  ];

  const scopeOptions: { value: ExportScope; label: string; count: number; disabled?: boolean }[] = [
    { value: "filtered", label: "Filtered campaigns", count: campaigns.length },
    { value: "selected", label: "Selected campaigns", count: selectedCampaigns.length, disabled: !hasSelection },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <RiExportLine /> Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div>
          <div className="text-primary-500 flex items-center gap-x-3">
            <RiExportLine />
            <DialogTitle>Export Campaigns</DialogTitle>
          </div>
          <DialogDescription>Choose the format and scope for your export</DialogDescription>
        </div>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <p className="text-sm font-medium">Export Format</p>
            <div className="flex gap-x-3">
              {formatOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFormat(option.value)}
                  className={cn(
                    "flex flex-1 flex-col items-center gap-y-2 rounded-lg border-2 p-4 transition-colors",
                    format === option.value
                      ? "border-primary-500 bg-primary-50 text-primary-600"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                >
                  {option.icon}
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Export Scope</p>
            <div className="space-y-2">
              {scopeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => !option.disabled && setScope(option.value)}
                  disabled={option.disabled}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg border-2 p-3 transition-colors",
                    scope === option.value
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-gray-300",
                    option.disabled && "cursor-not-allowed opacity-50",
                  )}
                >
                  <div className="flex items-center gap-x-3">
                    <div
                      className={cn(
                        "flex size-5 items-center justify-center rounded-full border-2",
                        scope === option.value ? "border-primary-500 bg-primary-500" : "border-gray-300",
                      )}
                    >
                      {scope === option.value && <RiCheckLine className="size-3 text-white" />}
                    </div>
                    <span className="text-sm">{option.label}</span>
                  </div>
                  <span className="text-sm text-gray-500">{option.count} items</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-x-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? "Exporting..." : "Export"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
