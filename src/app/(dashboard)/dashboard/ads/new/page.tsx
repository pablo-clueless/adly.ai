"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { AutomatedAd, BoostContent, CreateAd } from "@/components/modules/ad";
import { Button } from "@/components/ui/button";
import { AD_TYPES } from "@/config/ad";

const adComponents = {
  automated: AutomatedAd,
  boost: BoostContent,
  create: CreateAd,
};

const Page = () => {
  const searchParams = useSearchParams();
  const adType = searchParams.get("ad_type");

  const AdComponent = adType ? adComponents[adType as keyof typeof adComponents] : null;

  if (AdComponent) {
    return (
      <div className="w-full space-y-6">
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-semibold">Create Ad</p>
          <Button asChild size="sm" variant="outline">
            <Link href="/dashboard/ads/new">Back to Selection</Link>
          </Button>
        </div>
        <AdComponent />
      </div>
    );
  }

  return (
    <div className="container mx-auto w-full max-w-5xl space-y-6">
      <div className="flex w-full items-center justify-between">
        <p className="text-2xl font-semibold">Choose Ad Type</p>
        <Button asChild size="sm" variant="outline">
          <Link href="/dashboard/ads">Cancel</Link>
        </Button>
      </div>
      <div className="grid w-full grid-cols-3 gap-6">
        {AD_TYPES.map((type, index) => (
          <Link
            className="hover:border-primary-300 flex cursor-pointer flex-col items-center gap-y-6 rounded-lg border bg-white px-6 py-20 shadow-sm transition-all hover:shadow-md"
            href={`/dashboard/ads/new?ad_type=${type.value}`}
            key={index}
          >
            <div className="border-primary-200 bg-primary-50 grid size-16 place-items-center rounded-full border-2">
              <type.icon className="text-primary-600 size-8" />
            </div>
            <div className="text-center">
              <p className="mb-1 text-lg font-semibold">{type.label}</p>
              <p className="text-sm text-gray-600">{type.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
