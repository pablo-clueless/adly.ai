"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { RiGoogleLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

type FormProps = z.infer<typeof schema>;

const Page = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<FormProps>({
    defaultValues: { email: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: FormProps) => {
    console.log({ values });
    router.push("/verification");
  };

  return (
    <div className="grid h-full w-full place-items-center">
      <div className="flex w-[320px] flex-col items-center gap-y-10">
        <div className="space-y-4 text-center">
          <p className="text-xl font-semibold">Adflow.ai</p>
          <div>
            <p className="text-lg font-medium">Welcome to Adflow.ai</p>
            <p className="text-sm text-gray-600">Create your account and discover world-class ads service.</p>
          </div>
        </div>
        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input onChange={onChange} placeholder="Enter your email" type="email" value={value} />
            )}
          />
          <Button className="w-full" type="submit">
            Continue
          </Button>
        </form>
        <Button className="w-full" variant="outline">
          <RiGoogleLine /> Continue with Google
        </Button>
        <div className="space-y-4 text-center">
          <p className="text-sm text-gray-600">By continuing, you agree to our Terms and Privacy Policy.</p>
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link className="underline" href="/signin">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
