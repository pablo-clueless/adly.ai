import React from "react";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="grid h-screen w-screen grid-cols-1 sm:grid-cols-7">
      <div className="col-span-1 h-full p-12 sm:col-span-5">{children}</div>
      <div className="bg-primary-500 hidden h-full sm:col-span-2 sm:block">
        <video className="h-full w-full object-cover" autoPlay muted loop src="/assets/videos/adly.mp4"></video>
      </div>
    </div>
  );
};

export default AuthLayout;
