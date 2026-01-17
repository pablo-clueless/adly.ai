import { ScrollArea } from "@/components/shared";

const metrics = [
  { label: "Impressions", value: "245000" },
  { label: "Clicks", value: "12500" },
  { label: "CTR", value: "5.1" },
  { label: "Conversions", value: "2100" },
];

const Page = () => {
  return (
    <ScrollArea className="h-full w-full space-y-6">
      <div className="grid w-full grid-cols-4 gap-5">
        {metrics.map((metric, index) => (
          <div className="space-y-4 rounded-md border p-4" key={index}>
            <div className="flex w-full items-center justify-between">
              <p className="">{metric.label}</p>
            </div>
            <p className="text-4xl font-semibold">{metric.value}</p>
            <p className="text-sm text-green-500">Increase from last week</p>
          </div>
        ))}
      </div>
      <div className="grid w-full grid-cols-6 gap-5">
        <div className="col-span-4 space-y-4 rounded-xl border p-4">
          <div>
            <p className="font-medium">Ad Performance</p>
            <p className="text-sm text-gray-600">Last 7 days</p>
          </div>
          <div className=""></div>
        </div>
        <div className="col-span-2 space-y-4 rounded-xl border p-4">
          <div>
            <p className="font-medium">Campaign Distribution</p>
            <p className="text-sm text-gray-600">By Impression</p>
          </div>
          <div className=""></div>
        </div>
      </div>
      <div className="w-full space-y-4 rounded-xl border p-4">
        <div>
          <p className="font-medium">Recent Campaigns</p>
          <p className="text-sm text-gray-600">Your latest ad campaigns</p>
        </div>
        <div className=""></div>
      </div>
    </ScrollArea>
  );
};

export default Page;
