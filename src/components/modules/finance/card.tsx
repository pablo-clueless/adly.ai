import { format } from "date-fns";

import type { FinanceProps } from "@/types/finance";
import { formatCurrency } from "@/lib";
import { cn } from "@/lib";

interface Props {
  finance: FinanceProps;
}

export const Card = ({ finance }: Props) => {
  const percentageSpent = Math.round((finance.spent / finance.budget) * 100);
  const isOverBudget = finance.spent > finance.budget;
  const isNearLimit = percentageSpent >= 80 && !isOverBudget;

  const statusConfig = {
    active: { label: "Active", color: "bg-green-100 text-green-700 border-green-200" },
    paused: { label: "Paused", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
    completed: { label: "Completed", color: "bg-gray-100 text-gray-700 border-gray-200" },
  };

  const currentStatus = statusConfig[finance.status];

  return (
    <div className="w-full rounded-lg border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{finance.name}</h3>
          <div className="mt-1 flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                currentStatus.color,
              )}
            >
              {currentStatus.label}
            </span>
            {isOverBudget && (
              <span className="inline-flex items-center rounded-full border border-red-200 bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
                Over Budget
              </span>
            )}
            {isNearLimit && (
              <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700">
                Near Limit
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mb-3 space-y-1">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-gray-600">Spent</span>
          <span className={cn("text-xl font-bold", isOverBudget ? "text-red-600" : "text-gray-900")}>
            {formatCurrency(finance.spent, finance.currency)}
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-gray-600">Budget</span>
          <span className="text-sm font-medium text-gray-500">{formatCurrency(finance.budget, finance.currency)}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">{percentageSpent}% used</span>
          <span className="text-gray-600">{formatCurrency(finance.remaining, finance.currency)} remaining</span>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300",
              isOverBudget ? "bg-red-500" : isNearLimit ? "bg-orange-500" : "bg-primary-600",
            )}
            style={{ width: `${Math.min(percentageSpent, 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4">
        <div>
          <p className="text-xs text-gray-500">Start Date</p>
          <p className="text-sm font-medium text-gray-900">{format(finance.startDate, "MMM dd, yyyy")}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">End Date</p>
          <p className="text-sm font-medium text-gray-900">{format(finance.endDate, "MMM dd, yyyy")}</p>
        </div>
      </div>
    </div>
  );
};
