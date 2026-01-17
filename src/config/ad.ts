import { RiAdvertisementLine, RiAiGenerate2, RiRocket2Line } from "@remixicon/react";

export const AD_TYPES = [
  {
    description:
      "Let AI generate and optimize ads for you automatically, saving you time and effort while delivering high-performing campaigns tailored to your audience.",
    icon: RiAiGenerate2,
    label: "Automated Ads",
    value: "automated",
  },
  {
    description:
      "Create a new ad from scratch with full customization, giving you complete control over every element from visuals to messaging for a truly unique campaign.",
    icon: RiAdvertisementLine,
    label: "Create Ad",
    value: "create",
  },
  {
    description:
      "Boost your existing posts to reach a wider audience, amplifying content that already resonates with your followers to maximize engagement and visibility.",
    icon: RiRocket2Line,
    label: "Boost Existing Content",
    value: "boost",
  },
];
