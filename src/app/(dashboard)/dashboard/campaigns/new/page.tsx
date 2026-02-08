"use client";

import { RiArrowLeftLine, RiArrowRightLine, RiCheckLine, RiImageAddLine, RiUploadCloud2Line } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

import { DatePicker, type DateRange, Stepper } from "@/components/shared";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib";

const steps = [
  { index: 1, label: "Basic Info" },
  { index: 2, label: "Select Audience" },
  { index: 3, label: "Create Copy" },
  { index: 4, label: "Add Assets" },
  { index: 5, label: "Review" },
];

interface CampaignFormData {
  name: string;
  objective: string;
  budget: number;
  dateRange: DateRange;
  audiences: string[];
  headline: string;
  description: string;
  callToAction: string;
  assets: File[];
  landingUrl: string;
}

const OBJECTIVES = [
  { value: "awareness", label: "Brand Awareness", description: "Increase visibility and reach" },
  { value: "traffic", label: "Website Traffic", description: "Drive visitors to your website" },
  { value: "engagement", label: "Engagement", description: "Get more likes, comments, and shares" },
  { value: "leads", label: "Lead Generation", description: "Collect contact information" },
  { value: "conversions", label: "Conversions", description: "Drive sales or sign-ups" },
];

const AUDIENCES = [
  { id: "1", name: "Tech Enthusiasts", size: "2.5M", description: "Interest in technology and gadgets" },
  { id: "2", name: "Small Business Owners", size: "1.8M", description: "Entrepreneurs and SMB decision makers" },
  { id: "3", name: "Young Professionals", size: "3.2M", description: "Age 25-35, urban professionals" },
  { id: "4", name: "E-commerce Shoppers", size: "4.1M", description: "Frequent online shoppers" },
  { id: "5", name: "Content Creators", size: "890K", description: "Influencers and content creators" },
];

const CTA_OPTIONS = ["Learn More", "Shop Now", "Sign Up", "Get Started", "Contact Us", "Download", "Subscribe"];

const Page = () => {
  const router = useRouter();
  const [current, setCurrent] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CampaignFormData>({
    name: "",
    objective: "",
    budget: 1000,
    dateRange: { from: undefined, to: undefined },
    audiences: [],
    headline: "",
    description: "",
    callToAction: "Learn More",
    assets: [],
    landingUrl: "",
  });

  const updateFormData = <K extends keyof CampaignFormData>(field: K, value: CampaignFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleAudience = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      audiences: prev.audiences.includes(id) ? prev.audiences.filter((a) => a !== id) : [...prev.audiences, id],
    }));
  };

  const handleNext = () => {
    if (current < steps.length) {
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast.success("Campaign created successfully!");
    router.push("/dashboard/campaigns");
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!formData.name && !!formData.objective && formData.budget > 0;
      case 2:
        return formData.audiences.length > 0;
      case 3:
        return !!formData.headline && !!formData.description;
      case 4:
        return !!formData.landingUrl;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (current) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Campaign Name</label>
              <Input
                placeholder="Enter campaign name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Campaign Objective</label>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {OBJECTIVES.map((obj) => (
                  <button
                    key={obj.value}
                    onClick={() => updateFormData("objective", obj.value)}
                    className={cn(
                      "rounded-lg border-2 p-4 text-left transition-colors",
                      formData.objective === obj.value
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    <p className="font-medium">{obj.label}</p>
                    <p className="mt-1 text-sm text-gray-500">{obj.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Daily Budget</label>
                <div className="relative">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    type="number"
                    className="pl-8"
                    value={formData.budget}
                    onChange={(e) => updateFormData("budget", Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Campaign Duration</label>
                <DatePicker
                  type="range"
                  value={formData.dateRange}
                  onValueChange={(range) => updateFormData("dateRange", range)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600">
                Select target audiences for your campaign. You can select multiple audiences.
              </p>
            </div>

            <div className="space-y-3">
              {AUDIENCES.map((audience) => (
                <button
                  key={audience.id}
                  onClick={() => toggleAudience(audience.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg border-2 p-4 transition-colors",
                    formData.audiences.includes(audience.id)
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                >
                  <div className="flex items-center gap-x-4">
                    <Checkbox checked={formData.audiences.includes(audience.id)} />
                    <div className="text-left">
                      <p className="font-medium">{audience.name}</p>
                      <p className="text-sm text-gray-500">{audience.description}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{audience.size} reach</span>
                </button>
              ))}
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm font-medium">Estimated Total Reach</p>
              <p className="text-primary-600 text-2xl font-bold">
                {formData.audiences.length > 0 ? `${(formData.audiences.length * 1.5).toFixed(1)}M` : "0"}
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Headline</label>
              <Input
                placeholder="Enter your ad headline"
                value={formData.headline}
                onChange={(e) => updateFormData("headline", e.target.value)}
                maxLength={100}
              />
              <p className="text-xs text-gray-500">{formData.headline.length}/100 characters</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Enter your ad description"
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                rows={4}
              />
              <p className="text-xs text-gray-500">{formData.description.length}/500 characters</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Call to Action</label>
              <div className="flex flex-wrap gap-2">
                {CTA_OPTIONS.map((cta) => (
                  <button
                    key={cta}
                    onClick={() => updateFormData("callToAction", cta)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition-colors",
                      formData.callToAction === cta
                        ? "border-primary-500 bg-primary-500 text-white"
                        : "border-gray-300 hover:border-gray-400",
                    )}
                  >
                    {cta}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <p className="mb-3 text-sm font-medium">Preview</p>
              <div className="rounded-lg bg-gray-100 p-4">
                <p className="font-semibold">{formData.headline || "Your headline here"}</p>
                <p className="mt-2 text-sm text-gray-600">
                  {formData.description || "Your description will appear here..."}
                </p>
                <button className="bg-primary-500 mt-3 rounded px-4 py-2 text-sm text-white">
                  {formData.callToAction}
                </button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload Creative Assets</label>
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                <RiUploadCloud2Line className="mx-auto size-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Drag and drop files here, or click to browse</p>
                <p className="mt-1 text-xs text-gray-500">Supports: JPG, PNG, GIF, MP4 (Max 50MB)</p>
                <Button variant="outline" className="mt-4">
                  <RiImageAddLine /> Browse Files
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Landing Page URL</label>
              <Input
                type="url"
                placeholder="https://example.com/landing-page"
                value={formData.landingUrl}
                onChange={(e) => updateFormData("landingUrl", e.target.value)}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200">
              <div className="border-b border-gray-200 p-4">
                <h3 className="font-semibold">Campaign Summary</h3>
              </div>
              <div className="divide-y divide-gray-100">
                <div className="flex justify-between p-4">
                  <span className="text-gray-600">Campaign Name</span>
                  <span className="font-medium">{formData.name || "-"}</span>
                </div>
                <div className="flex justify-between p-4">
                  <span className="text-gray-600">Objective</span>
                  <span className="font-medium capitalize">{formData.objective || "-"}</span>
                </div>
                <div className="flex justify-between p-4">
                  <span className="text-gray-600">Daily Budget</span>
                  <span className="font-medium">${formData.budget}</span>
                </div>
                <div className="flex justify-between p-4">
                  <span className="text-gray-600">Target Audiences</span>
                  <span className="font-medium">{formData.audiences.length} selected</span>
                </div>
                <div className="flex justify-between p-4">
                  <span className="text-gray-600">Headline</span>
                  <span className="max-w-xs truncate font-medium">{formData.headline || "-"}</span>
                </div>
                <div className="flex justify-between p-4">
                  <span className="text-gray-600">Call to Action</span>
                  <span className="font-medium">{formData.callToAction}</span>
                </div>
                <div className="flex justify-between p-4">
                  <span className="text-gray-600">Landing URL</span>
                  <span className="max-w-xs truncate font-medium">{formData.landingUrl || "-"}</span>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 rounded-lg p-4">
              <div className="flex items-start gap-x-3">
                <RiCheckLine className="text-primary-600 mt-0.5 size-5" />
                <div>
                  <p className="text-primary-900 font-medium">Ready to Launch</p>
                  <p className="text-primary-700 text-sm">
                    Your campaign is configured and ready to go. Click &lsaquo;Create Campaign&rsaquo; to launch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full space-y-6 overflow-y-auto">
      <div className="flex w-full items-center justify-between">
        <p className="text-2xl font-semibold">New Campaign</p>
        <Button asChild size="sm" variant="outline">
          <Link href="/dashboard/campaigns">Cancel</Link>
        </Button>
      </div>

      <Stepper current={current} steps={steps} onStepChange={setCurrent} />

      <div className="rounded-lg border border-gray-200 bg-white p-6">{renderStep()}</div>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handlePrev} disabled={current === 1}>
          <RiArrowLeftLine /> Previous
        </Button>

        {current === steps.length ? (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Campaign"}
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={!isStepValid(current)}>
            Next <RiArrowRightLine />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Page;
