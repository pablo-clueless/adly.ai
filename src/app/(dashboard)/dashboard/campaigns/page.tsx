import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="w-full space-y-6">
      <div className="flex w-full items-center justify-between">
        <div>
          <p className="text-2xl font-semibold">Campaigns</p>
          <p className="mt-1 text-sm text-gray-500">Manage and monitor your campaigns here</p>
        </div>
        <Button asChild size="sm">
          <Link href="/dashboard/campaigns/new">Create Campaign</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
