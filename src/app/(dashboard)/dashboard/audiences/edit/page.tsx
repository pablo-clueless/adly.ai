"use client";

import { RiArrowLeftLine, RiCloseLine, RiSaveLine } from "@remixicon/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import Link from "next/link";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AudienceProps } from "@/types";
import { cn } from "@/lib";

import { MOCK_AUDIENCES } from "@/__mock__";

const STATUS_OPTIONS = [
  { value: "active", label: "Active", color: "bg-green-100 text-green-700 border-green-300" },
  { value: "paused", label: "Paused", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
  { value: "archived", label: "Archived", color: "bg-gray-100 text-gray-700 border-gray-300" },
];

const AVAILABLE_INTERESTS = [
  "Technology",
  "Sports",
  "Fashion",
  "Travel",
  "Food",
  "Music",
  "Gaming",
  "Fitness",
  "Business",
  "Art",
  "Photography",
  "Movies",
];

const AVAILABLE_BEHAVIORS = [
  "Online Shoppers",
  "Frequent Travelers",
  "Tech Early Adopters",
  "Health Conscious",
  "Social Media Active",
  "Mobile Users",
  "Desktop Users",
  "Newsletter Subscribers",
];

const AVAILABLE_LOCATIONS = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const audienceId = searchParams.get("id");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [audience, setAudience] = useState<AudienceProps | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active" as AudienceProps["status"],
    targeting: {
      age_range: { min: 18, max: 65 },
      genders: [] as ("male" | "female")[],
      locations: [] as string[],
      interests: [] as string[],
      behaviors: [] as string[],
    },
  });

  useEffect(() => {
    if (audienceId) {
      setTimeout(() => {
        const found = MOCK_AUDIENCES.find((a) => a.id === audienceId);
        if (found) {
          setAudience(found);
          setFormData({
            name: found.name,
            description: found.description || "",
            status: found.status,
            targeting: {
              age_range: found.targeting.age_range || { min: 18, max: 65 },
              genders: (found.targeting.genders?.filter((g) => g !== "unknown") as ("male" | "female")[]) || [],
              locations: found.targeting.locations || [],
              interests: found.targeting.interests || [],
              behaviors: found.targeting.behaviors || [],
            },
          });
        }
        setIsLoading(false);
      }, 500);
    } else {
      setIsLoading(false);
    }
  }, [audienceId]);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success("Audience updated successfully!");
    router.push("/dashboard/audiences");
  };

  const hasChanges = useMemo(() => {
    if (!audience) return false;
    return (
      formData.name !== audience.name ||
      formData.description !== (audience.description || "") ||
      formData.status !== audience.status ||
      JSON.stringify(formData.targeting) !== JSON.stringify(audience.targeting)
    );
  }, [audience, formData]);

  const toggleGender = (gender: "male" | "female") => {
    setFormData((prev) => ({
      ...prev,
      targeting: {
        ...prev.targeting,
        genders: prev.targeting.genders.includes(gender)
          ? prev.targeting.genders.filter((g) => g !== gender)
          : [...prev.targeting.genders, gender],
      },
    }));
  };

  const toggleItem = (field: "locations" | "interests" | "behaviors", item: string) => {
    setFormData((prev) => ({
      ...prev,
      targeting: {
        ...prev.targeting,
        [field]: prev.targeting[field].includes(item)
          ? prev.targeting[field].filter((i) => i !== item)
          : [...prev.targeting[field], item],
      },
    }));
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading audience...</div>
      </div>
    );
  }

  if (!audience) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Audience not found</p>
        <Button asChild variant="outline">
          <Link href="/dashboard/audiences">
            <RiArrowLeftLine /> Back to Audiences
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full w-full space-y-6 overflow-y-auto">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Button asChild size="icon" variant="ghost">
            <Link href="/dashboard/audiences">
              <RiArrowLeftLine />
            </Link>
          </Button>
          <div>
            <p className="text-2xl font-semibold">Edit Audience</p>
            <p className="text-sm text-gray-500">ID: {audience.id}</p>
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
            <h3 className="mb-4 font-semibold">Basic Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Audience Name</label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => setFormData({ ...formData, status: status.value as AudienceProps["status"] })}
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
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 font-semibold">Targeting</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Age Range</label>
                <div className="flex items-center gap-x-4">
                  <div className="flex items-center gap-x-2">
                    <span className="text-sm text-gray-500">Min:</span>
                    <Input
                      type="number"
                      className="w-20"
                      min={13}
                      max={65}
                      value={formData.targeting.age_range.min}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          targeting: {
                            ...formData.targeting,
                            age_range: { ...formData.targeting.age_range, min: Number(e.target.value) },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <span className="text-sm text-gray-500">Max:</span>
                    <Input
                      type="number"
                      className="w-20"
                      min={18}
                      max={100}
                      value={formData.targeting.age_range.max}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          targeting: {
                            ...formData.targeting,
                            age_range: { ...formData.targeting.age_range, max: Number(e.target.value) },
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Gender</label>
                <div className="flex gap-x-2">
                  {(["male", "female"] as const).map((gender) => (
                    <button
                      key={gender}
                      onClick={() => toggleGender(gender)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium capitalize transition-all",
                        formData.targeting.genders.includes(gender)
                          ? "border-primary-500 bg-primary-50 text-primary-700"
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100",
                      )}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
                {formData.targeting.genders.length === 0 && (
                  <p className="text-xs text-gray-500">No gender selected = All genders</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Locations</label>
                <div className="flex flex-wrap gap-2">
                  {formData.targeting.locations.map((loc) => (
                    <span
                      key={loc}
                      className="bg-primary-100 text-primary-700 flex items-center gap-x-1 rounded-full px-3 py-1 text-sm"
                    >
                      {loc}
                      <button onClick={() => toggleItem("locations", loc)}>
                        <RiCloseLine className="size-4" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_LOCATIONS.filter((loc) => !formData.targeting.locations.includes(loc)).map((loc) => (
                    <button
                      key={loc}
                      onClick={() => toggleItem("locations", loc)}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
                    >
                      + {loc}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Interests</label>
                <div className="flex flex-wrap gap-2">
                  {formData.targeting.interests.map((interest) => (
                    <span
                      key={interest}
                      className="flex items-center gap-x-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                    >
                      {interest}
                      <button onClick={() => toggleItem("interests", interest)}>
                        <RiCloseLine className="size-4" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_INTERESTS.filter((i) => !formData.targeting.interests.includes(i)).map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleItem("interests", interest)}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
                    >
                      + {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Behaviors</label>
                <div className="flex flex-wrap gap-2">
                  {formData.targeting.behaviors.map((behavior) => (
                    <span
                      key={behavior}
                      className="flex items-center gap-x-1 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700"
                    >
                      {behavior}
                      <button onClick={() => toggleItem("behaviors", behavior)}>
                        <RiCloseLine className="size-4" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_BEHAVIORS.filter((b) => !formData.targeting.behaviors.includes(b)).map((behavior) => (
                    <button
                      key={behavior}
                      onClick={() => toggleItem("behaviors", behavior)}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
                    >
                      + {behavior}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 font-semibold">Targeting Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Age Range</span>
                <span className="font-medium">
                  {formData.targeting.age_range.min} - {formData.targeting.age_range.max}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Genders</span>
                <span className="font-medium capitalize">
                  {formData.targeting.genders.length > 0 ? formData.targeting.genders.join(", ") : "All"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Locations</span>
                <span className="font-medium">{formData.targeting.locations.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Interests</span>
                <span className="font-medium">{formData.targeting.interests.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Behaviors</span>
                <span className="font-medium">{formData.targeting.behaviors.length || 0}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 font-semibold">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Duplicate Audience
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Use in Campaign
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600">
                Delete Audience
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
