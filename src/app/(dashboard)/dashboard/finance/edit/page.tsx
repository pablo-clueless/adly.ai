"use client";

import { RiArrowLeftLine, RiSaveLine } from "@remixicon/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import Link from "next/link";

import { DatePicker, type DateRange } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FinanceProps } from "@/types";
import { formatCurrency, cn } from "@/lib";

import { MOCK_FINANCES } from "@/__mock__";

const STATUS_OPTIONS = [
  { value: "active", label: "Active", color: "bg-green-100 text-green-700 border-green-300" },
  { value: "paused", label: "Paused", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
  { value: "completed", label: "Completed", color: "bg-gray-100 text-gray-700 border-gray-300" },
];

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "\u20AC", name: "Euro" },
  { code: "GBP", symbol: "\u00A3", name: "British Pound" },
  { code: "NGN", symbol: "\u20A6", name: "Nigerian Naira" },
];

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const budgetId = searchParams.get("id");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [budget, setBudget] = useState<FinanceProps | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    budget: 0,
    currency: "USD",
    status: "active" as FinanceProps["status"],
    dateRange: { from: undefined, to: undefined } as DateRange,
  });

  useEffect(() => {
    if (budgetId) {
      setTimeout(() => {
        const found = MOCK_FINANCES.find((f) => f.id === budgetId);
        if (found) {
          setBudget(found);
          setFormData({
            name: found.name,
            budget: found.budget,
            currency: found.currency,
            status: found.status,
            dateRange: {
              from: new Date(found.start_date),
              to: found.end_date ? new Date(found.end_date) : undefined,
            },
          });
        }
        setIsLoading(false);
      }, 500);
    }
  }, [budgetId]);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success("Budget updated successfully!");
    router.push("/dashboard/finance");
  };

  const hasChanges = useMemo(() => {
    if (!budget) return false;
    return (
      formData.name !== budget.name ||
      formData.budget !== budget.budget ||
      formData.currency !== budget.currency ||
      formData.status !== budget.status
    );
  }, [budget, formData]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading budget...</div>
      </div>
    );
  }

  if (!budget) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Budget not found</p>
        <Button asChild variant="outline">
          <Link href="/dashboard/finance">
            <RiArrowLeftLine /> Back to Finance
          </Link>
        </Button>
      </div>
    );
  }

  const percentageSpent = Math.round((budget.spent / budget.budget) * 100);
  const isOverBudget = budget.spent > budget.budget;
  const isNearLimit = percentageSpent >= 80 && !isOverBudget;

  return (
    <div className="h-full w-full space-y-6 overflow-y-auto">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Button asChild size="icon" variant="ghost">
            <Link href="/dashboard/finance">
              <RiArrowLeftLine />
            </Link>
          </Button>
          <div>
            <p className="text-2xl font-semibold">Edit Budget</p>
            <p className="text-sm text-gray-500">ID: {budget.id}</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={isSaving || !hasChanges}>
          <RiSaveLine />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 font-semibold">Budget Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Budget Name</label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Budget Amount</label>
                  <Input
                    type="number"
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
                        {currency.symbol}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => setFormData({ ...formData, status: status.value as FinanceProps["status"] })}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                        formData.status === status.value
                          ? status.color
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100",
                      )}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Budget Period</label>
                <DatePicker
                  type="range"
                  value={formData.dateRange}
                  onValueChange={(range) => setFormData({ ...formData, dateRange: range })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 font-semibold">Spending Overview</h3>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Budget Usage</span>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isOverBudget ? "text-red-600" : isNearLimit ? "text-orange-600" : "text-gray-900",
                    )}
                  >
                    {percentageSpent}%
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-200">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      isOverBudget ? "bg-red-500" : isNearLimit ? "bg-orange-500" : "bg-primary-500",
                    )}
                    style={{ width: `${Math.min(percentageSpent, 100)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Budget</span>
                  <span className="font-semibold">{formatCurrency(budget.budget, budget.currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Spent</span>
                  <span className={cn("font-semibold", isOverBudget && "text-red-600")}>
                    {formatCurrency(budget.spent, budget.currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Remaining</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(budget.remaining, budget.currency)}
                  </span>
                </div>
              </div>

              {isOverBudget && (
                <div className="rounded-lg bg-red-50 p-3">
                  <p className="text-sm font-medium text-red-700">Over Budget Warning</p>
                  <p className="text-xs text-red-600">
                    This budget has exceeded its limit by{" "}
                    {formatCurrency(budget.spent - budget.budget, budget.currency)}
                  </p>
                </div>
              )}

              {isNearLimit && !isOverBudget && (
                <div className="rounded-lg bg-orange-50 p-3">
                  <p className="text-sm font-medium text-orange-700">Near Limit</p>
                  <p className="text-xs text-orange-600">This budget is approaching its limit</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 font-semibold">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Duplicate Budget
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View Transactions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Export Report
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600">
                Delete Budget
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
