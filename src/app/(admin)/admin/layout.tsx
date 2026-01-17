import React, { Suspense } from "react";

import { Header } from "@/components/shared";

interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const AdminLayout = ({ children, sidebar }: Props) => {
  return (
    <Suspense>
      <div className="flex h-screen w-screen items-center">
        {sidebar}
        <div className="h-full w-full">
          <Header />
          <div className="h-[calc(100%-56px)] w-full overflow-hidden">{children}</div>
        </div>
      </div>
    </Suspense>
  );
};

export default AdminLayout;
