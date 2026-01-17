import Link from "next/link";

import { Button } from "../ui/button";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50! w-screen bg-white/50 py-4 backdrop-blur backdrop-filter">
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-0">
        <p className="font-medium">Adflow.ai</p>
        <div className="flex items-center gap-x-4"></div>
        <div className="flex items-center gap-x-4">
          <Button asChild size="sm" variant="outline">
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Start for Free</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
