"use client";

import { useState } from "react";

import { Footer, Navbar, TagHeader } from "@/components/shared";
import { HELP_CATEGORIES } from "@/constants/help-center";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";

const Page = () => {
  const [search, setSearch] = useState("");
  useDebounce(search, 500);

  return (
    <>
      <Navbar />
      <div className="w-screen">
        <section className="container mx-auto max-w-6xl space-y-6 px-4 pt-20 sm:px-0 sm:pt-40">
          <div className="space-y-4">
            <TagHeader title="Help Center" />
            <p className="text-3xl text-gray-800 sm:text-6xl">
              Find answers, learn how to use Adflow.ai, and get support
            </p>
          </div>
          <Input
            className="max-w-md"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search help articles..."
            value={search}
          />
        </section>
        <section className="container mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-0 sm:py-20">
          <h2 className="text-xl sm:text-2xl">Browse by Category</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {HELP_CATEGORIES.map((category) => (
              <div
                key={category.title}
                className="cursor-pointer rounded-lg border p-6 transition-shadow hover:shadow-lg"
              >
                <div className="">
                  <div className="text-primary-500 mb-4">
                    <category.icon />
                  </div>
                  <h3 className="text-sm font-medium sm:text-base">{category.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{category.description}</p>
                  <ul className="space-y-2">
                    {category.articles.map((article) => (
                      <li key={article} className="hover:text-primary-500 cursor-pointer text-sm transition-colors">
                        → {article}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
