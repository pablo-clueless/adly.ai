import { useMemo } from "react";

import { Card } from "@/components/modules/finance";
import { ScrollArea } from "@/components/shared";
import { formatCurrency } from "@/lib";

import { MOCK_FINANCES } from "@/__mock__";

const Page = () => {
  const metrics = useMemo(() => {
    const totalBudget = MOCK_FINANCES.reduce((sum, finance) => sum + finance.budget, 0);
    const totalSpent = MOCK_FINANCES.reduce((sum, finance) => sum + finance.spent, 0);
    const totalRemaining = MOCK_FINANCES.reduce((sum, finance) => sum + finance.remaining, 0);
    const currency = MOCK_FINANCES[0]?.currency || "USD";

    const percentageSpent = totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(1) : "0";
    const percentageRemaining = totalBudget > 0 ? ((totalRemaining / totalBudget) * 100).toFixed(1) : "0";

    return [
      {
        label: "Total Budget",
        value: formatCurrency(totalBudget, currency),
        rawValue: totalBudget,
        subtitle: `Across ${MOCK_FINANCES.length} campaigns`,
        trend: null,
      },
      {
        label: "Total Spent",
        value: formatCurrency(totalSpent, currency),
        rawValue: totalSpent,
        subtitle: `${percentageSpent}% of budget`,
        trend: "up",
      },
      {
        label: "Total Remaining",
        value: formatCurrency(totalRemaining, currency),
        rawValue: totalRemaining,
        subtitle: `${percentageRemaining}% available`,
        trend: "down",
      },
      {
        label: "Active Campaigns",
        value: MOCK_FINANCES.filter((f) => f.status === "active").length.toString(),
        rawValue: MOCK_FINANCES.filter((f) => f.status === "active").length,
        subtitle: `${MOCK_FINANCES.filter((f) => f.status === "paused").length} paused`,
        trend: null,
      },
    ];
  }, []);

  return (
    <ScrollArea className="h-full w-full space-y-6">
      <div className="flex w-full items-center justify-between">
        <div>
          <p className="text-2xl font-semibold">Budget</p>
          <p className="mt-1 text-sm text-gray-500">Manage and monitor your campaign budgets</p>
        </div>
      </div>
      <div className="grid w-full grid-cols-4 gap-5">
        {metrics.map((metric, index) => (
          <div className="space-y-3 rounded-lg border bg-white p-5 shadow-sm" key={index}>
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-medium text-gray-600">{metric.label}</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
            <p className="text-xs text-gray-500">{metric.subtitle}</p>
          </div>
        ))}
      </div>
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Campaign Budgets</h2>
          <p className="text-sm text-gray-500">{MOCK_FINANCES.length} total</p>
        </div>
        {MOCK_FINANCES.map((finance) => (
          <Card finance={finance} key={finance.id} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default Page;
