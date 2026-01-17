import Link from "next/link";

import { FOOTER_ROUTES } from "@/config/routes";

export const Footer = () => {
  return (
    <footer className="bg-foreground">
      <div className="container mx-auto max-w-6xl px-4 sm:px-0">
        <div className="grid w-full grid-cols-1 gap-10 py-10 sm:grid-cols-2 sm:gap-40 lg:py-20">
          <div className="">
            <p className="text-3xl font-semibold text-white sm:text-6xl">Adflow.ai</p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {FOOTER_ROUTES.map((route, index) => (
              <Link className="link w-fit text-sm text-white" href={route.href} key={index}>
                {route.label}
              </Link>
            ))}
          </div>
        </div>
        <hr className="border-white" />
        <div className="flex items-center justify-between py-5 text-white lg:py-5">
          <p className="text-sm">&copy;{new Date().getFullYear()}. All rights reserved</p>
          <p className="text-sm">Adflow.ai</p>
        </div>
      </div>
    </footer>
  );
};
