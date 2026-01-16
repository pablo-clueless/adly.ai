import Link from "next/link";

import { FOOTER_ROUTES } from "@/config/routes";

export const Footer = () => {
  return (
    <footer className="bg-foreground">
      <div className="container mx-auto">
        <div className="flex w-full flex-wrap items-start justify-between gap-40 py-10 lg:py-20">
          <div className="w-[300px]">
            <p className="text-6xl font-semibold text-white">Adly.ai</p>
          </div>
          <div className="flex flex-1 flex-wrap items-start justify-between gap-10">
            {FOOTER_ROUTES.map(({ links }, index) => (
              <div className="flex min-w-[300px] flex-col gap-y-3" key={index}>
                {links.map((link, index) => (
                  <Link className="link w-fit text-sm text-white" href={link.href} key={index}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <hr className="border-white" />
        <div className="flex items-center justify-between py-5 text-white lg:py-5">
          <p className="text-sm">&copy;{new Date().getFullYear()}. All rights reserved</p>
          <p className="text-sm">Adly.ai</p>
        </div>
      </div>
    </footer>
  );
};
