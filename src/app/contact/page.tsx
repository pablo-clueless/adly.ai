"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Navbar, TagHeader } from "@/components/shared";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  company: z.string().min(1, "Company name is required"),
  message: z.string().min(1, "Message is required"),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy",
  }),
  marketingEmails: z.boolean().optional(),
});

type FormProps = z.infer<typeof schema>;

const Page = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormProps>({
    defaultValues: { email: "", name: "", company: "", message: "", privacyPolicy: false, marketingEmails: false },
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: FormProps) => {
    console.log({ values });
  };
  return (
    <>
      <Navbar />
      <div className="bg-image-2 w-screen bg-bottom-left bg-no-repeat sm:h-screen">
        <section className="container mx-auto h-full max-w-6xl px-4 py-20 sm:px-0 sm:py-40">
          <div className="grid h-full w-full grid-cols-1 sm:grid-cols-2">
            <div className="h-full space-y-6">
              <div className="space-y-1">
                <TagHeader title="Contact Us" />
                <p className="text-3xl sm:text-6xl">Let&apos;s Meet</p>
                <p className="text-xs text-gray-600 sm:text-sm">
                  Tell us about your project and we&apos;ll get back to you within 24 hours
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-y-5 rounded-lg border bg-white sm:gap-y-10 sm:px-20 sm:py-10">
              <p className="text-xl font-medium sm:text-2xl">Fill a form</p>
              <form className="flex w-full flex-col items-center gap-y-4" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <Input onChange={onChange} placeholder="Name" type="text" value={value} />
                  )}
                />
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <Input onChange={onChange} placeholder="Business Email" type="email" value={value} />
                  )}
                />
                <Controller
                  control={control}
                  name="company"
                  render={({ field: { onChange, value } }) => (
                    <Input onChange={onChange} placeholder="Company Name" type="text" value={value} />
                  )}
                />
                <Controller
                  control={control}
                  name="message"
                  render={({ field: { name, onChange, value } }) => (
                    <Textarea className="h-40" name={name} onChange={onChange} placeholder="Message" value={value} />
                  )}
                />
                <div className="w-full space-y-2">
                  <div className="flex items-center gap-x-2">
                    <Controller
                      control={control}
                      name="privacyPolicy"
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onCheckedChange={onChange} />
                      )}
                    />
                    <p className="text-sm font-medium">Agree to Privacy Policy</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Controller
                      control={control}
                      name="marketingEmails"
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onCheckedChange={onChange} />
                      )}
                    />
                    <p className="text-sm font-medium">Agree to recieve offers and commercial communications</p>
                  </div>
                </div>
                <Button disabled={!isValid} size="sm" type="button">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
