"use client";

import { RiAddLine, RiDeleteBinLine, RiFunctionAddLine } from "@remixicon/react";
import { useState } from "react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CampaignProps } from "@/types";

interface CreateRuleProps {
  selectedCampaigns: CampaignProps[];
}

type Condition = "greater_than" | "less_than" | "equals" | "between";
type Metric = "impressions" | "clicks" | "cost" | "conversions" | "ctr" | "cpc";
type Action = "pause" | "activate" | "increase_budget" | "decrease_budget" | "notify";

interface Rule {
  id: string;
  metric: Metric;
  condition: Condition;
  value: number;
  value2?: number;
  action: Action;
  actionValue?: number;
}

const METRICS: { value: Metric; label: string }[] = [
  { value: "impressions", label: "Impressions" },
  { value: "clicks", label: "Clicks" },
  { value: "cost", label: "Cost" },
  { value: "conversions", label: "Conversions" },
  { value: "ctr", label: "CTR (%)" },
  { value: "cpc", label: "CPC" },
];

const CONDITIONS: { value: Condition; label: string }[] = [
  { value: "greater_than", label: "Greater than" },
  { value: "less_than", label: "Less than" },
  { value: "equals", label: "Equals" },
  { value: "between", label: "Between" },
];

const ACTIONS: { value: Action; label: string; hasValue?: boolean }[] = [
  { value: "pause", label: "Pause campaign" },
  { value: "activate", label: "Activate campaign" },
  { value: "increase_budget", label: "Increase budget by %", hasValue: true },
  { value: "decrease_budget", label: "Decrease budget by %", hasValue: true },
  { value: "notify", label: "Send notification" },
];

export const CreateRule = ({ selectedCampaigns }: CreateRuleProps) => {
  const [open, setOpen] = useState(false);
  const [ruleName, setRuleName] = useState("");
  const [rules, setRules] = useState<Rule[]>([
    { id: "1", metric: "impressions", condition: "greater_than", value: 1000, action: "notify" },
  ]);
  const [isCreating, setIsCreating] = useState(false);

  const hasSelection = selectedCampaigns.length > 0;

  const handleAddRule = () => {
    setRules([
      ...rules,
      { id: String(Date.now()), metric: "clicks", condition: "greater_than", value: 0, action: "notify" },
    ]);
  };

  const handleRemoveRule = (id: string) => {
    if (rules.length <= 1) return;
    setRules(rules.filter((r) => r.id !== id));
  };

  const handleRuleChange = (id: string, field: keyof Rule, value: string | number) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const handleCreate = async () => {
    if (!ruleName.trim()) {
      toast.error("Please enter a rule name");
      return;
    }
    if (!hasSelection) {
      toast.error("Please select campaigns to apply rules");
      return;
    }

    setIsCreating(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsCreating(false);
    setOpen(false);
    toast.success(`Rule "${ruleName}" created with ${rules.length} condition(s)`);
    setRuleName("");
    setRules([{ id: "1", metric: "impressions", condition: "greater_than", value: 1000, action: "notify" }]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <RiFunctionAddLine /> Create Rule
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <div>
          <div className="text-primary-500 flex items-center gap-x-3">
            <RiFunctionAddLine />
            <DialogTitle>Create Automation Rule</DialogTitle>
          </div>
          <DialogDescription>
            {hasSelection
              ? `Create automation rules for ${selectedCampaigns.length} selected campaign(s)`
              : "Select campaigns to create automation rules"}
          </DialogDescription>
        </div>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Rule Name</label>
            <Input placeholder="Enter rule name" value={ruleName} onChange={(e) => setRuleName(e.target.value)} />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Conditions & Actions</label>
              <Button size="sm" variant="outline" onClick={handleAddRule}>
                <RiAddLine /> Add Condition
              </Button>
            </div>

            <div className="space-y-4">
              {rules.map((rule, index) => (
                <div key={rule.id} className="space-y-3 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Condition {index + 1}</span>
                    {rules.length > 1 && (
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        className="text-red-500"
                        onClick={() => handleRemoveRule(rule.id)}
                      >
                        <RiDeleteBinLine className="size-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">When</label>
                      <Select
                        value={rule.metric}
                        onValueChange={(value) => handleRuleChange(rule.id, "metric", value as Metric)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {METRICS.map((m) => (
                            <SelectItem key={m.value} value={m.value}>
                              {m.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Is</label>
                      <Select
                        value={rule.condition}
                        onValueChange={(value) => handleRuleChange(rule.id, "condition", value as Condition)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CONDITIONS.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Value</label>
                      <Input
                        type="number"
                        value={rule.value}
                        onChange={(e) => handleRuleChange(rule.id, "value", Number(e.target.value))}
                      />
                    </div>

                    {rule.condition === "between" && (
                      <div className="space-y-1">
                        <label className="text-xs text-gray-500">And</label>
                        <Input
                          type="number"
                          value={rule.value2 || 0}
                          onChange={(e) => handleRuleChange(rule.id, "value2", Number(e.target.value))}
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Then</label>
                      <Select
                        value={rule.action}
                        onValueChange={(value) => handleRuleChange(rule.id, "action", value as Action)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ACTIONS.map((a) => (
                            <SelectItem key={a.value} value={a.value}>
                              {a.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {ACTIONS.find((a) => a.value === rule.action)?.hasValue && (
                      <div className="space-y-1">
                        <label className="text-xs text-gray-500">By (%)</label>
                        <Input
                          type="number"
                          value={rule.actionValue || 10}
                          onChange={(e) => handleRuleChange(rule.id, "actionValue", Number(e.target.value))}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {hasSelection && (
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-sm font-medium text-gray-700">Apply to:</p>
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
          <Button onClick={handleCreate} disabled={isCreating || !hasSelection}>
            {isCreating ? "Creating..." : "Create Rule"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
