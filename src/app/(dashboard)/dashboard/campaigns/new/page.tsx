"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/shared";

const steps = [
  { index: 1, label: "Basic Info" },
  { index: 2, label: "Select Audience" },
  { index: 3, label: "Create Copy" },
  { index: 4, label: "Add Assets" },
  { index: 5, label: "Ad Review" },
];

const Page = () => {
  const [current, setCurrent] = useState(1);

  return (
    <div className="w-full space-y-6">
      <div className="flex w-full items-center justify-between">
        <p className="text-2xl font-semibold">New Campaign</p>
        <Button asChild size="sm">
          <Link href="/dashboard/campaigns">Cancel</Link>
        </Button>
      </div>
      <Stepper current={current} steps={steps} onStepChange={setCurrent} />
    </div>
  );
};

export default Page;
