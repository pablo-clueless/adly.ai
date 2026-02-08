"use client";

import { RiAddLine, RiArrowLeftLine, RiArrowRightLine, RiCheckLine, RiCloseLine } from "@remixicon/react";
import { useState } from "react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Stepper } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib";

const steps = [
  { index: 1, label: "Basic Info" },
  { index: 2, label: "Demographics" },
  { index: 3, label: "Interests" },
  { index: 4, label: "Behaviors" },
  { index: 5, label: "Review" },
];

interface AudienceFormData {
  name: string;
  description: string;
  ageMin: number;
  ageMax: number;
  genders: ("male" | "female")[];
  locations: string[];
  interests: string[];
  behaviors: string[];
}

const AVAILABLE_LOCATIONS = [
  { id: "new-york", name: "New York", country: "USA" },
  { id: "los-angeles", name: "Los Angeles", country: "USA" },
  { id: "chicago", name: "Chicago", country: "USA" },
  { id: "houston", name: "Houston", country: "USA" },
  { id: "phoenix", name: "Phoenix", country: "USA" },
  { id: "philadelphia", name: "Philadelphia", country: "USA" },
  { id: "san-antonio", name: "San Antonio", country: "USA" },
  { id: "san-diego", name: "San Diego", country: "USA" },
  { id: "dallas", name: "Dallas", country: "USA" },
  { id: "london", name: "London", country: "UK" },
  { id: "paris", name: "Paris", country: "France" },
  { id: "tokyo", name: "Tokyo", country: "Japan" },
];

const AVAILABLE_INTERESTS = [
  { id: "technology", name: "Technology", category: "Tech" },
  { id: "gadgets", name: "Gadgets", category: "Tech" },
  { id: "software", name: "Software", category: "Tech" },
  { id: "sports", name: "Sports", category: "Lifestyle" },
  { id: "fitness", name: "Fitness", category: "Lifestyle" },
  { id: "travel", name: "Travel", category: "Lifestyle" },
  { id: "food", name: "Food & Dining", category: "Lifestyle" },
  { id: "fashion", name: "Fashion", category: "Shopping" },
  { id: "beauty", name: "Beauty", category: "Shopping" },
  { id: "gaming", name: "Gaming", category: "Entertainment" },
  { id: "music", name: "Music", category: "Entertainment" },
  { id: "movies", name: "Movies & TV", category: "Entertainment" },
  { id: "business", name: "Business", category: "Professional" },
  { id: "finance", name: "Finance", category: "Professional" },
  { id: "marketing", name: "Marketing", category: "Professional" },
];

const AVAILABLE_BEHAVIORS = [
  { id: "online-shoppers", name: "Online Shoppers", description: "Frequently purchases online" },
  { id: "frequent-travelers", name: "Frequent Travelers", description: "Travels multiple times a year" },
  { id: "tech-early-adopters", name: "Tech Early Adopters", description: "First to try new technology" },
  { id: "health-conscious", name: "Health Conscious", description: "Focus on healthy lifestyle" },
  { id: "social-media-active", name: "Social Media Active", description: "High engagement on social platforms" },
  { id: "mobile-users", name: "Mobile Users", description: "Primarily uses mobile devices" },
  { id: "desktop-users", name: "Desktop Users", description: "Primarily uses desktop/laptop" },
  { id: "newsletter-subscribers", name: "Newsletter Subscribers", description: "Subscribes to email newsletters" },
  { id: "brand-loyal", name: "Brand Loyal", description: "Sticks with preferred brands" },
  { id: "deal-seekers", name: "Deal Seekers", description: "Always looking for discounts" },
];

export const CreateAudience = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<AudienceFormData>({
    name: "",
    description: "",
    ageMin: 18,
    ageMax: 65,
    genders: [],
    locations: [],
    interests: [],
    behaviors: [],
  });

  const resetForm = () => {
    setCurrent(1);
    setFormData({
      name: "",
      description: "",
      ageMin: 18,
      ageMax: 65,
      genders: [],
      locations: [],
      interests: [],
      behaviors: [],
    });
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

  const handleCreate = async () => {
    setIsCreating(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsCreating(false);
    setOpen(false);
    toast.success(`Audience "${formData.name}" created successfully!`);
    resetForm();
  };

  const toggleGender = (gender: "male" | "female") => {
    setFormData((prev) => ({
      ...prev,
      genders: prev.genders.includes(gender) ? prev.genders.filter((g) => g !== gender) : [...prev.genders, gender],
    }));
  };

  const toggleLocation = (locationId: string) => {
    setFormData((prev) => ({
      ...prev,
      locations: prev.locations.includes(locationId)
        ? prev.locations.filter((l) => l !== locationId)
        : [...prev.locations, locationId],
    }));
  };

  const toggleInterest = (interestId: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((i) => i !== interestId)
        : [...prev.interests, interestId],
    }));
  };

  const toggleBehavior = (behaviorId: string) => {
    setFormData((prev) => ({
      ...prev,
      behaviors: prev.behaviors.includes(behaviorId)
        ? prev.behaviors.filter((b) => b !== behaviorId)
        : [...prev.behaviors, behaviorId],
    }));
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!formData.name.trim();
      case 2:
        return formData.ageMin < formData.ageMax;
      case 3:
        return true;
      case 4:
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const getEstimatedReach = () => {
    let base = 1000000;
    if (formData.genders.length === 1) base *= 0.5;
    if (formData.locations.length > 0) base *= 0.3 * formData.locations.length;
    if (formData.interests.length > 0) base *= 0.2 * formData.interests.length;
    if (formData.behaviors.length > 0) base *= 0.15 * formData.behaviors.length;
    const ageRange = formData.ageMax - formData.ageMin;
    base *= ageRange / 50;
    return Math.floor(base);
  };

  const formatReach = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const renderStep = () => {
    switch (current) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Audience Name *</label>
              <Input
                placeholder="e.g., Tech Enthusiasts 25-45"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Describe who this audience is targeting..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-medium">Age Range</label>
              <div className="flex items-center gap-x-4">
                <div className="flex items-center gap-x-2">
                  <span className="text-sm text-gray-500">Min:</span>
                  <Input
                    type="number"
                    className="w-24"
                    min={13}
                    max={100}
                    value={formData.ageMin}
                    onChange={(e) => setFormData({ ...formData, ageMin: Number(e.target.value) })}
                  />
                </div>
                <span className="text-gray-400">—</span>
                <div className="flex items-center gap-x-2">
                  <span className="text-sm text-gray-500">Max:</span>
                  <Input
                    type="number"
                    className="w-24"
                    min={13}
                    max={100}
                    value={formData.ageMax}
                    onChange={(e) => setFormData({ ...formData, ageMax: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Gender</label>
              <div className="flex gap-x-3">
                {(["male", "female"] as const).map((gender) => (
                  <button
                    key={gender}
                    onClick={() => toggleGender(gender)}
                    className={cn(
                      "rounded-lg border-2 px-6 py-3 text-sm font-medium capitalize transition-all",
                      formData.genders.includes(gender)
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    {gender}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500">Leave empty to target all genders</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Locations</label>
              <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto">
                {AVAILABLE_LOCATIONS.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => toggleLocation(location.id)}
                    className={cn(
                      "flex items-center gap-x-3 rounded-lg border p-3 text-left transition-all",
                      formData.locations.includes(location.id)
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    <Checkbox checked={formData.locations.includes(location.id)} />
                    <div>
                      <p className="text-sm font-medium">{location.name}</p>
                      <p className="text-xs text-gray-500">{location.country}</p>
                    </div>
                  </button>
                ))}
              </div>
              {formData.locations.length > 0 && (
                <p className="text-primary-600 text-sm">{formData.locations.length} location(s) selected</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Select Interests</label>
              <p className="text-xs text-gray-500">Choose interests that describe your target audience</p>
            </div>

            {formData.interests.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.interests.map((id) => {
                  const interest = AVAILABLE_INTERESTS.find((i) => i.id === id);
                  return (
                    <span
                      key={id}
                      className="flex items-center gap-x-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                    >
                      {interest?.name}
                      <button onClick={() => toggleInterest(id)}>
                        <RiCloseLine className="size-4" />
                      </button>
                    </span>
                  );
                })}
              </div>
            )}

            <div className="grid max-h-64 grid-cols-3 gap-2 overflow-y-auto">
              {AVAILABLE_INTERESTS.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={cn(
                    "rounded-lg border p-3 text-left transition-all",
                    formData.interests.includes(interest.id)
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                >
                  <p className="text-sm font-medium">{interest.name}</p>
                  <p className="text-xs text-gray-500">{interest.category}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Select Behaviors</label>
              <p className="text-xs text-gray-500">Choose behaviors that match your target audience</p>
            </div>

            {formData.behaviors.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.behaviors.map((id) => {
                  const behavior = AVAILABLE_BEHAVIORS.find((b) => b.id === id);
                  return (
                    <span
                      key={id}
                      className="flex items-center gap-x-1 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700"
                    >
                      {behavior?.name}
                      <button onClick={() => toggleBehavior(id)}>
                        <RiCloseLine className="size-4" />
                      </button>
                    </span>
                  );
                })}
              </div>
            )}

            <div className="space-y-2">
              {AVAILABLE_BEHAVIORS.map((behavior) => (
                <button
                  key={behavior.id}
                  onClick={() => toggleBehavior(behavior.id)}
                  className={cn(
                    "flex w-full items-center gap-x-3 rounded-lg border p-4 text-left transition-all",
                    formData.behaviors.includes(behavior.id)
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                >
                  <Checkbox checked={formData.behaviors.includes(behavior.id)} />
                  <div>
                    <p className="text-sm font-medium">{behavior.name}</p>
                    <p className="text-xs text-gray-500">{behavior.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200">
              <div className="border-b border-gray-200 p-4">
                <h3 className="font-semibold">Audience Summary</h3>
              </div>
              <div className="divide-y divide-gray-100">
                <div className="flex justify-between p-4">
                  <span className="text-gray-600">Name</span>
                  <span className="font-medium">{formData.name || "-"}</span>
                </div>
                <div className="flex justify-between p-4">
                  <span className="text-gray-600">Age Range</span>
                  <span className="font-medium">
                    {formData.ageMin} - {formData.ageMax}
                  </span>
                </div>
                <div className="flex justify-between p-4">
                  <span className="text-gray-600">Genders</span>
                  <span className="font-medium capitalize">
                    {formData.genders.length > 0 ? formData.genders.join(", ") : "All"}
                  </span>
                </div>
                <div className="flex justify-between p-4">
                  <span className="text-gray-600">Locations</span>
                  <span className="font-medium">{formData.locations.length} selected</span>
                </div>
                <div className="flex justify-between p-4">
                  <span className="text-gray-600">Interests</span>
                  <span className="font-medium">{formData.interests.length} selected</span>
                </div>
                <div className="flex justify-between p-4">
                  <span className="text-gray-600">Behaviors</span>
                  <span className="font-medium">{formData.behaviors.length} selected</span>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 rounded-lg p-4">
              <div className="flex items-start gap-x-3">
                <RiCheckLine className="text-primary-600 mt-0.5 size-5" />
                <div>
                  <p className="text-primary-900 font-medium">Estimated Reach</p>
                  <p className="text-primary-600 text-2xl font-bold">{formatReach(getEstimatedReach())}</p>
                  <p className="text-primary-700 text-sm">
                    Your audience is ready to be created. Click &quot;Create Audience&quot; to save.
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
    <Dialog
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetForm();
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button size="sm">
          <RiAddLine /> Create Audience
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <div>
          <DialogTitle>Create Audience</DialogTitle>
          <DialogDescription>
            Define your target audience with demographics, interests, and behaviors.
          </DialogDescription>
        </div>

        <Stepper current={current} steps={steps} onStepChange={setCurrent} />

        <div className="min-h-[300px] py-4">{renderStep()}</div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <Button variant="outline" onClick={handlePrev} disabled={current === 1}>
            <RiArrowLeftLine /> Previous
          </Button>

          {current === steps.length ? (
            <Button onClick={handleCreate} disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Audience"}
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={!isStepValid(current)}>
              Next <RiArrowRightLine />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
