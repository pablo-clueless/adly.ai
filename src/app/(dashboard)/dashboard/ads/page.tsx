import Link from "next/link";

import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="w-full space-y-6">
      <div className="flex w-full items-center justify-between">
        <div>
          <p className="text-2xl font-semibold">Ads</p>
          <p className="mt-1 text-sm text-gray-500">Create and manage your ad campaigns</p>
        </div>
        <Button asChild size="sm">
          <Link href="/dashboard/ads/new">Create Ad</Link>
        </Button>
      </div>
      <div className=""></div>
    </div>
  );
};

export default Page;
