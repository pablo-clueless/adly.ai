"use client";

import { RiAddLine, RiFlaskLine } from "@remixicon/react";
import { useState } from "react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CampaignProps } from "@/types";
import { cn } from "@/lib";

interface AbTestProps {
  selectedCampaigns: CampaignProps[];
}

interface Variant {
  id: string;
  name: string;
  allocation: number;
}

export const AbTest = ({ selectedCampaigns }: AbTestProps) => {
  const [open, setOpen] = useState(false);
  const [testName, setTestName] = useState("");
  const [variants, setVariants] = useState<Variant[]>([
    { id: "1", name: "Control", allocation: 50 },
    { id: "2", name: "Variant A", allocation: 50 },
  ]);
  const [isCreating, setIsCreating] = useState(false);

  const hasSelection = selectedCampaigns.length > 0;
  const totalAllocation = variants.reduce((sum, v) => sum + v.allocation, 0);
  const isValidAllocation = totalAllocation === 100;

  const handleAddVariant = () => {
    const newVariant: Variant = {
      id: String(Date.now()),
      name: `Variant ${String.fromCharCode(65 + variants.length - 1)}`,
      allocation: 0,
    };
    setVariants([...variants, newVariant]);
  };

  const handleRemoveVariant = (id: string) => {
    if (variants.length <= 2) return;
    setVariants(variants.filter((v) => v.id !== id));
  };

  const handleVariantChange = (id: string, field: keyof Variant, value: string | number) => {
    setVariants(
      variants.map((v) => (v.id === id ? { ...v, [field]: field === "allocation" ? Number(value) : value } : v)),
    );
  };

  const handleDistributeEvenly = () => {
    const evenAllocation = Math.floor(100 / variants.length);
    const remainder = 100 % variants.length;
    setVariants(
      variants.map((v, index) => ({
        ...v,
        allocation: evenAllocation + (index < remainder ? 1 : 0),
      })),
    );
  };

  const handleCreate = async () => {
    if (!testName.trim()) {
      toast.error("Please enter a test name");
      return;
    }
    if (!isValidAllocation) {
      toast.error("Allocation must equal 100%");
      return;
    }
    if (!hasSelection) {
      toast.error("Please select campaigns to test");
      return;
    }

    setIsCreating(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsCreating(false);
    setOpen(false);
    toast.success(`A/B test "${testName}" created with ${variants.length} variants`);
    setTestName("");
    setVariants([
      { id: "1", name: "Control", allocation: 50 },
      { id: "2", name: "Variant A", allocation: 50 },
    ]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <RiFlaskLine /> A/B Test
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <div>
          <div className="text-primary-500 flex items-center gap-x-3">
            <RiFlaskLine />
            <DialogTitle>Create A/B Test</DialogTitle>
          </div>
          <DialogDescription>
            {hasSelection
              ? `Set up an A/B test for ${selectedCampaigns.length} selected campaign(s)`
              : "Select campaigns to create an A/B test"}
          </DialogDescription>
        </div>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Test Name</label>
            <Input placeholder="Enter test name" value={testName} onChange={(e) => setTestName(e.target.value)} />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Variants</label>
              <div className="flex gap-x-2">
                <Button size="sm" variant="ghost" onClick={handleDistributeEvenly}>
                  Distribute Evenly
                </Button>
                <Button size="sm" variant="outline" onClick={handleAddVariant}>
                  <RiAddLine /> Add Variant
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {variants.map((variant) => (
                <div key={variant.id} className="flex items-center gap-x-3">
                  <Input
                    className="flex-1"
                    placeholder="Variant name"
                    value={variant.name}
                    onChange={(e) => handleVariantChange(variant.id, "name", e.target.value)}
                  />
                  <div className="flex w-24 items-center gap-x-1">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={variant.allocation}
                      onChange={(e) => handleVariantChange(variant.id, "allocation", e.target.value)}
                    />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                  {variants.length > 2 && (
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      className="text-red-500"
                      onClick={() => handleRemoveVariant(variant.id)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div
              className={cn(
                "flex justify-between rounded-lg p-2 text-sm",
                isValidAllocation ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700",
              )}
            >
              <span>Total Allocation</span>
              <span className="font-medium">{totalAllocation}%</span>
            </div>
          </div>

          {hasSelection && (
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-sm font-medium text-gray-700">Selected Campaigns:</p>
              <ul className="mt-2 space-y-1">
                {selectedCampaigns.slice(0, 3).map((c) => (
                  <li key={c.id} className="truncate text-sm text-gray-600">
                    {c.name}
                  </li>
                ))}
                {selectedCampaigns.length > 3 && (
                  <li className="text-sm text-gray-500">+{selectedCampaigns.length - 3} more</li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-x-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isCreating || !hasSelection || !isValidAllocation}>
            {isCreating ? "Creating..." : "Create Test"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
