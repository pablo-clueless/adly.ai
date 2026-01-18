import React, { Suspense } from "react";

import { WithAuth } from "@/components/providers/with-auth";
import { Header, Sidebar } from "@/components/shared";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <Suspense>
      <WithAuth allowedRoles={["USER"]}>
        <div className="flex h-screen w-screen items-center">
          <Sidebar type="dashboard" />
          <div className="h-full w-full">
            <Header />
            <div className="h-[calc(100%-56px)] w-full overflow-hidden p-4">{children}</div>
          </div>
        </div>
      </WithAuth>
    </Suspense>
  );
};

export default AdminLayout;
