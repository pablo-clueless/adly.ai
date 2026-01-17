const Page = () => {
  return (
    <div className="w-full space-y-6">
      <div className="flex w-full items-center justify-between">
        <div>
          <p className="text-2xl font-semibold">Analytics</p>
          <p className="mt-1 text-sm text-gray-500">Track and analyze your campaign performance</p>
        </div>
      </div>
      <div className="grid grid-cols-1">
        <div className="space-y-4 rounded-md border p-4">
          <div>
            <p className="font-medium">Daily Performance</p>
            <p className="text-sm text-gray-600">Impressions, Clicks and CTR Trends</p>
          </div>
          <div className=""></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-4 rounded-md border p-4">
          <div>
            <p className="font-medium">CTR & Cost Per Click</p>
            <p className="text-sm text-gray-600">Daily Metrics</p>
          </div>
          <div className=""></div>
        </div>
        <div className="space-y-4 rounded-md border p-4">
          <div>
            <p className="font-medium">Conversion Rate & ROI</p>
            <p className="text-sm text-gray-600">Trend Analysis</p>
          </div>
          <div className=""></div>
        </div>
      </div>
      <div className="grid grid-cols-1">
        <div className="space-y-4 rounded-md border p-4">
          <div>
            <p className="font-medium">Performance Table</p>
            <p className="text-sm text-gray-600">Daily Breakdown</p>
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
