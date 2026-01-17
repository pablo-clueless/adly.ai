"use client";

import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

import { OtpInput } from "@/components/shared";

const schema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type FormProps = z.infer<typeof schema>;

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<FormProps>({
    defaultValues: { otp: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    (values: FormProps) => {
      setIsSubmitting(true);
      try {
        console.log({ values });
        router.push("/dashboard");
      } catch (error) {
        console.error({ error });
        toast.error("Verification failed");
      } finally {
        setIsSubmitting(false);
      }
    },
    [router],
  );

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.otp?.length === 6) {
        handleSubmit(onSubmit)();
      }
    });
    return () => subscription.unsubscribe();
  }, [handleSubmit, onSubmit, watch]);

  return (
    <div className="grid h-full w-full place-items-center">
      <div className="flex w-[320px] flex-col items-center gap-y-10">
        <div className="space-y-4 text-center">
          <p className="text-xl font-semibold">Adflow.ai</p>
          <div>
            <p className="text-lg font-medium">Verification</p>
            <p className="text-sm text-gray-600">Enter the OTP sent your mail to continue.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={control}
            name="otp"
            render={({ field: { onChange, value } }) => (
              <OtpInput disabled={isSubmitting} length={6} onChange={onChange} value={value} />
            )}
          />
        </form>
      </div>
    </div>
  );
};

export default Page;
