import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib";

interface Props {
  className?: string;
  isLink?: boolean;
}

export const Logo = ({ className, isLink = false }: Props) => {
  if (isLink) {
    return (
      <Link href="/">
        <div className={cn("relative aspect-3/1 w-20", className)}>
          <Image alt="adly.ai" className="" fill sizes="100%" src="" />
        </div>
      </Link>
    );
  }

  return (
    <div className={cn("relative aspect-3/1 w-20", className)}>
      <Image alt="adly.ai" className="" fill sizes="100%" src="" />
    </div>
  );
};
