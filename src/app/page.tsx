"use client";

import Link from "next/link";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BENEFITS, FEATURES, FREQUENTLY_ASKED_QUESTIONS, HOW_IT_WORKS } from "@/constants";
import { Footer, Navbar, TagHeader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="w-screen">
        <section className="container mx-auto h-screen max-w-6xl pt-40">
          <div className="flex h-full w-full flex-col items-center justify-between">
            <div className="flex flex-col items-center gap-y-10 px-4 sm:gap-y-20 sm:px-0">
              <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-end">
                <p className="text-primary-500 text-5xl font-semibold sm:text-9xl">Adflow.ai</p>
                <p className="max-w-md text-center text-base text-gray-600 sm:text-left sm:text-lg">
                  The AI-powered ads manager that automates campaign creation, optimizes spend across every channel, and
                  delivers real-time insights so your team can scale ROAS without scaling headcount.
                </p>
              </div>
              <Button size="lg">Start your free trial</Button>
            </div>
            <div className="h-[400px] w-full rounded-t-xl border border-b-0"></div>
          </div>
        </section>
        <section className="container mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-0 sm:py-20">
          <div className="space-y-4">
            <TagHeader title="how it works" />
            <p className="text-primary-500 text-3xl sm:text-6xl">
              See how Adflow.ai streamlines your ad workflow in four simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-10">
            {HOW_IT_WORKS.map((item, index) => (
              <div className="bg-primary-50/10 relative shrink-0 space-y-4 p-4" key={index}>
                <item.icon className="text-primary-500/10 absolute top-0 right-0 size-20 sm:size-40" />
                <div className="flex w-full items-center justify-between">
                  <p className="font-medium sm:text-lg">{item.title}</p>
                  <item.icon className="text-primary-500 size-4 sm:size-6" />
                </div>
                <p className="text-xs sm:text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="container mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-0 sm:py-20">
          <div className="flex w-full flex-col items-center gap-y-10 sm:gap-y-20">
            <div className="space-y-4">
              <TagHeader title="benefits" />
              <p className="text-primary-500 text-3xl sm:text-6xl">
                Maximize efficiency and ROI with intelligent automation
              </p>
            </div>
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-10">
              <div className="w-full">
                <div className="relative aspect-4/5 w-full">
                  <Image alt="automation" className="" fill sizes="100%" src="/assets/images/automation.png" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:gap-10">
                {BENEFITS.map((benefit, index) => (
                  <div className="space-y-1" key={index}>
                    <div className="flex items-center gap-x-2">
                      <div className="bg-primary-100/25 grid size-6 place-items-center rounded">
                        <benefit.icon className="text-primary-500 size-4" />
                      </div>

                      <p className="text-primary-500 text-sm font-medium sm:text-base">{benefit.title}</p>
                    </div>
                    <p className="text-xs text-gray-600 sm:text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="bg-primary-500 w-full text-white">
          <div className="container mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-0 sm:py-20">
            <div className="space-y-4">
              <TagHeader title="features" inverted />
              <p className="text-3xl text-gray-200 sm:text-6xl">Discover the tools that power smarter campaigns</p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-10">
              {FEATURES.map((feature, index) => (
                <div className="" key={index}>
                  <div className="flex items-center gap-x-2">
                    <feature.icon className="size-4" />
                    <p className="">{feature.title}</p>
                  </div>
                  <p className="text-xs text-gray-400 sm:text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="container mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-0 sm:py-20">
          <div className="space-y-4">
            <TagHeader title="reviews" />
            <p className="text-primary-500 text-3xl sm:text-6xl">Trusted by thousands of marketers worldwide</p>
          </div>
          <div className=""></div>
        </section>
        <section className="container mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-0 sm:py-20">
          <div className="grid w-full grid-cols-1 sm:grid-cols-3">
            <div className="space-y-4">
              <TagHeader title="frequently asked questions" />
              <p className="text-primary-500 text-3xl sm:text-6xl">Everything you need to know</p>
            </div>
            <Accordion className="sm:col-span-2" type="single">
              {FREQUENTLY_ASKED_QUESTIONS.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="sm:text-base">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 sm:text-base">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
        <section className="bg-image-1 w-full bg-black/50 bg-cover bg-no-repeat bg-blend-overlay">
          <div className="container mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-0 sm:py-20">
            <div className="flex flex-col items-center gap-y-10 sm:gap-y-20">
              <p className="text-center text-3xl text-white sm:text-6xl">
                Ready to scale your ad performance without scaling your team?
              </p>
              <Button asChild size="xl">
                <Link href="/signup">Get started for free</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
