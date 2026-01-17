import { CreateAudience } from "@/components/modules/audience";

const Page = () => {
  return (
    <div className="w-full space-y-6">
      <div className="flex w-full items-center justify-between">
        <div>
          <p className="text-2xl font-semibold">Audiences</p>
          <p className="mt-1 text-sm text-gray-500">Create, manage, and analyze your audience segments</p>
        </div>
        <CreateAudience />
      </div>
      <div className=""></div>
    </div>
  );
};

export default Page;
