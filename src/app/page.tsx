"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";

import { staggerContainerVariants, staggerItemVariants, useReducedMotion, cardHoverVariants } from "@/lib/motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BENEFITS, FEATURES, FREQUENTLY_ASKED_QUESTIONS, HOW_IT_WORKS } from "@/constants";
import { Footer, Navbar, TagHeader } from "@/components/shared";
import { MotionSection } from "@/components/motion";
import { Button } from "@/components/ui/button";

const Page = () => {
  const shouldReduceMotion = useReducedMotion();

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

  const containerVariants = shouldReduceMotion ? {} : staggerContainerVariants;
  const itemVariants = shouldReduceMotion ? {} : staggerItemVariants;

  return (
    <>
      <Navbar />
      <div className="w-screen">
        <section className="container mx-auto h-screen max-w-6xl pt-40">
          <motion.div
            ref={heroRef}
            className="flex h-full w-full flex-col items-center justify-between"
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div
              className="flex flex-col items-center gap-y-10 px-4 sm:gap-y-20 sm:px-0"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-end">
                <motion.p
                  className="text-primary-500 text-5xl font-semibold sm:text-9xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Adflow.ai
                </motion.p>
                <motion.p
                  className="max-w-md text-center text-base text-gray-600 sm:text-left sm:text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  The AI-powered ads manager that automates campaign creation, optimizes spend across every channel, and
                  delivers real-time insights so your team can scale ROAS without scaling headcount.
                </motion.p>
              </div>
              <motion.a
                initial={{ opacity: 0, scale: 0.9 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 }}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
              >
                <Button asChild size="lg">
                  <Link href="/signup">Start your free trial</Link>
                </Button>
              </motion.a>
            </motion.div>
            <motion.div
              className="relative h-[400px] w-full rounded-t-xl border border-b-0"
              initial={{ opacity: 0, y: 60 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Image
                alt="ad (abstract)"
                className="rounded-t-xl object-cover"
                fill
                sizes="100%"
                src="/assets/images/ad.jpg"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <MotionSection
          as="section"
          className="container mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-0 sm:py-20"
          variant="fadeUp"
        >
          <div className="space-y-4">
            <TagHeader title="how it works" />
            <motion.p
              className="text-primary-500 text-3xl sm:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              See how Adflow.ai streamlines your ad workflow in four simple steps
            </motion.p>
          </div>
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {HOW_IT_WORKS.map((item, index) => (
              <motion.div
                className="bg-primary-50/10 relative shrink-0 space-y-4 p-4"
                key={index}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? undefined : cardHoverVariants.hover}
              >
                <item.icon className="text-primary-500/10 absolute top-0 right-0 size-20 sm:size-40" />
                <div className="flex w-full items-center justify-between">
                  <p className="font-medium sm:text-lg">{item.title}</p>
                  <item.icon className="text-primary-500 size-4 sm:size-6" />
                </div>
                <p className="text-xs sm:text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </MotionSection>

        {/* Benefits Section */}
        <MotionSection
          as="section"
          className="container mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-0 sm:py-20"
          variant="fadeUp"
        >
          <div className="flex w-full flex-col items-center gap-y-10 sm:gap-y-20">
            <div className="space-y-4">
              <TagHeader title="benefits" />
              <motion.p
                className="text-primary-500 text-3xl sm:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Maximize efficiency and ROI with intelligent automation
              </motion.p>
            </div>
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-10">
              <motion.div
                className="w-full"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative aspect-4/5 w-full">
                  <Image alt="automation" className="" fill sizes="100%" src="/assets/images/automation.png" />
                </div>
              </motion.div>
              <motion.div
                className="grid grid-cols-1 gap-5 sm:gap-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
              >
                {BENEFITS.map((benefit, index) => (
                  <motion.div className="space-y-1" key={index} variants={itemVariants}>
                    <div className="flex items-center gap-x-2">
                      <div className="bg-primary-100/25 grid size-6 place-items-center rounded">
                        <benefit.icon className="text-primary-500 size-4" />
                      </div>
                      <p className="text-primary-500 text-sm font-medium sm:text-base">{benefit.title}</p>
                    </div>
                    <p className="text-xs text-gray-600 sm:text-sm">{benefit.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </MotionSection>

        {/* Features Section */}
        <section className="bg-primary-500 w-full text-white">
          <MotionSection
            as="div"
            className="container mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-0 sm:py-20"
            variant="fadeUp"
          >
            <div className="space-y-4">
              <TagHeader title="features" inverted />
              <motion.p
                className="text-3xl text-gray-200 sm:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Discover the tools that power smarter campaigns
              </motion.p>
            </div>
            <motion.div
              className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              {FEATURES.map((feature, index) => (
                <motion.div
                  className="group"
                  key={index}
                  variants={itemVariants}
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                >
                  <div className="flex items-center gap-x-2">
                    <feature.icon className="size-4" />
                    <p className="">{feature.title}</p>
                  </div>
                  <p className="text-xs text-gray-400 sm:text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </MotionSection>
        </section>

        {/* Reviews Section */}
        <MotionSection
          as="section"
          className="container mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-0 sm:py-20"
          variant="fadeUp"
        >
          <div className="space-y-4">
            <TagHeader title="reviews" />
            <motion.p
              className="text-primary-500 text-3xl sm:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Trusted by thousands of marketers worldwide
            </motion.p>
          </div>
          <motion.div
            className="flex h-[200px] items-center justify-center rounded-lg border border-dashed text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Testimonials will be displayed here
          </motion.div>
        </MotionSection>

        {/* FAQ Section */}
        <MotionSection
          as="section"
          className="container mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-0 sm:py-20"
          variant="fadeUp"
        >
          <div className="grid w-full grid-cols-1 sm:grid-cols-3">
            <div className="space-y-4">
              <TagHeader title="frequently asked questions" />
              <motion.p
                className="text-primary-500 text-3xl sm:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Everything you need to know
              </motion.p>
            </div>
            <motion.div
              className="sm:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Accordion type="single">
                {FREQUENTLY_ASKED_QUESTIONS.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="sm:text-base">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600 sm:text-base">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </MotionSection>

        {/* CTA Section */}
        <section className="bg-image-1 w-full bg-black/50 bg-cover bg-no-repeat bg-blend-overlay">
          <div className="container mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-0 sm:py-20">
            <motion.div
              className="flex flex-col items-center gap-y-10 sm:gap-y-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.p
                className="text-center text-3xl text-white sm:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Ready to scale your ad performance without scaling your team?
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
              >
                <Button asChild size="xl">
                  <Link href="/signup">Get started for free</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
