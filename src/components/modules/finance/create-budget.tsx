"use client";

import { RiAddLine, RiWalletLine } from "@remixicon/react";
import { useState } from "react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DatePicker, type DateRange } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib";

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "\u20AC", name: "Euro" },
  { code: "GBP", symbol: "\u00A3", name: "British Pound" },
  { code: "NGN", symbol: "\u20A6", name: "Nigerian Naira" },
];

export const CreateBudget = () => {
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    budget: 1000,
    currency: "USD",
    dateRange: { from: undefined, to: undefined } as DateRange,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      budget: 1000,
      currency: "USD",
      dateRange: { from: undefined, to: undefined },
    });
  };

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      toast.error("Please enter a budget name");
      return;
    }
    if (formData.budget <= 0) {
      toast.error("Budget must be greater than 0");
      return;
    }

    setIsCreating(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsCreating(false);
    setOpen(false);
    toast.success(`Budget "${formData.name}" created successfully!`);
    resetForm();
  };

  const isValid = formData.name.trim() && formData.budget > 0;

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetForm();
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button size="sm">
          <RiAddLine /> Create Budget
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <div>
          <div className="text-primary-500 flex items-center gap-x-3">
            <RiWalletLine />
            <DialogTitle>Create Budget</DialogTitle>
          </div>
          <DialogDescription>Set up a new budget for your campaigns.</DialogDescription>
        </div>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Budget Name *</label>
            <Input
              placeholder="e.g., Q1 Marketing Campaign"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Budget Amount *</label>
              <Input
                type="number"
                min={0}
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Currency</label>
              <div className="flex flex-wrap gap-2">
                {CURRENCIES.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => setFormData({ ...formData, currency: currency.code })}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-sm font-medium transition-all",
                      formData.currency === currency.code
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    {currency.symbol} {currency.code}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Budget Period</label>
            <DatePicker
              type="range"
              value={formData.dateRange}
              onValueChange={(range) => setFormData({ ...formData, dateRange: range })}
            />
            <p className="text-xs text-gray-500">Optional: Set start and end dates for this budget</p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-700">Budget Summary</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Amount</span>
                <span className="font-semibold">
                  {CURRENCIES.find((c) => c.code === formData.currency)?.symbol}
                  {formData.budget.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Currency</span>
                <span className="text-sm">{CURRENCIES.find((c) => c.code === formData.currency)?.name}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-x-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isCreating || !isValid}>
            {isCreating ? "Creating..." : "Create Budget"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
