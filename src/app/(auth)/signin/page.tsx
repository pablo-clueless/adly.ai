"use client";

import { RiGoogleLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";

import { useGoogleMutation, useSigninMutation } from "@/services/auth/api";
import { formContainerVariants, formItemVariants, shakeVariants, useReducedMotion } from "@/lib/motion";
import { ButtonLoader } from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SignInDto } from "@/types";

const schema = Yup.object<SignInDto>({
  email: Yup.string().required("Email is required").email("Please enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,20}$/, "Please use a stronger password"),
});

const Page = () => {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const [, { isLoading: isGoogleLoading }] = useGoogleMutation();
  const [signin, { isLoading: isSigninLoading, isError }] = useSigninMutation();

  const { errors, handleChange, handleSubmit, touched, values } = useFormik<SignInDto>({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      signin(values)
        .unwrap()
        .then((response) => {
          console.log({ response });
          router.push("/dashboard");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    validationSchema: schema,
  });

  const containerVariants = shouldReduceMotion ? { hidden: {}, visible: {} } : formContainerVariants;

  const itemVariants = shouldReduceMotion ? { hidden: {}, visible: {} } : formItemVariants;

  return (
    <div className="grid h-full w-full place-items-center">
      <motion.div
        className="flex w-[320px] flex-col items-center gap-y-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="space-y-4 text-center" variants={itemVariants}>
          <p className="text-xl font-semibold">Adflow.ai</p>
          <div>
            <p className="text-lg font-medium">Welcome back</p>
          </div>
        </motion.div>

        <motion.form
          className="w-full space-y-4"
          onSubmit={handleSubmit}
          variants={itemVariants}
          animate={isError && !shouldReduceMotion ? "shake" : undefined}
        >
          <motion.div variants={shouldReduceMotion ? {} : { ...itemVariants, ...shakeVariants }}>
            <Input
              error={{ message: errors.email, touched: touched.email }}
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              type="email"
              value={values.email}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Input
              error={{ message: errors.password, touched: touched.password }}
              name="password"
              onChange={handleChange}
              placeholder="Create a password"
              type="password"
              value={values.password}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button className="w-full" type="submit" disabled={isSigninLoading}>
              {isSigninLoading ? <ButtonLoader /> : "Continue"}
            </Button>
          </motion.div>
        </motion.form>

        <motion.div className="w-full" variants={itemVariants}>
          <Button className="w-full" disabled={isGoogleLoading} variant="outline">
            {isGoogleLoading ? (
              <ButtonLoader color="primary" />
            ) : (
              <>
                <RiGoogleLine /> Continue with Google
              </>
            )}
          </Button>
        </motion.div>

        <motion.div className="space-y-4 text-center" variants={itemVariants}>
          <p className="text-sm text-gray-600">By continuing, you agree to our Terms and Privacy Policy.</p>
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link className="hover:text-primary-500 underline transition-colors" href="/signup">
              Sign up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;
