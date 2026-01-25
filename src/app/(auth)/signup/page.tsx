"use client";

import { RiGoogleLine, RiCheckLine, RiCloseLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useMemo } from "react";

import { useGoogleMutation, useSignupMutation } from "@/services/auth/api";
import { formContainerVariants, formItemVariants, useReducedMotion } from "@/lib/motion";
import { ButtonLoader } from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SignUpDto } from "@/types";
import { cn } from "@/lib";

const schema = Yup.object<SignUpDto>({
  email: Yup.string().required("Email is required").email("Please enter a valid email"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,20}$/, "Please use a stronger password"),
  password_confirm: Yup.string().oneOf([Yup.ref("password"), ""], "Passwords must match"),
});

const passwordRequirements = [
  { label: "8-20 characters", test: (p: string) => p.length >= 8 && p.length <= 20 },
  { label: "Uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "Number", test: (p: string) => /[0-9]/.test(p) },
  { label: "Special character", test: (p: string) => /[\W]/.test(p) },
];

const Page = () => {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const [, { isLoading: isGoogleLoading }] = useGoogleMutation();
  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();

  const { errors, handleChange, handleSubmit, touched, values } = useFormik<SignUpDto>({
    initialValues: { email: "", first_name: "", last_name: "", password: "", password_confirm: "" },
    onSubmit: (values) => {
      signup(values)
        .unwrap()
        .then((response) => {
          console.log({ response });
          router.push("/verification");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    validationSchema: schema,
  });

  const passwordStrength = useMemo(() => {
    const passed = passwordRequirements.filter((req) => req.test(values.password)).length;
    return {
      percentage: (passed / passwordRequirements.length) * 100,
      requirements: passwordRequirements.map((req) => ({
        ...req,
        passed: req.test(values.password),
      })),
    };
  }, [values.password]);

  const containerVariants = shouldReduceMotion ? { hidden: {}, visible: {} } : formContainerVariants;

  const itemVariants = shouldReduceMotion ? { hidden: {}, visible: {} } : formItemVariants;

  return (
    <div className="grid h-full w-full place-items-center py-8">
      <motion.div
        className="flex w-[320px] flex-col items-center gap-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="space-y-4 text-center" variants={itemVariants}>
          <p className="text-xl font-semibold">Adflow.ai</p>
          <div>
            <p className="text-lg font-medium">Welcome to Adflow.ai</p>
            <p className="text-sm text-gray-600">Create your account and discover world-class ads service.</p>
          </div>
        </motion.div>

        <motion.form className="w-full space-y-4" onSubmit={handleSubmit} variants={itemVariants}>
          <motion.div variants={itemVariants}>
            <Input
              error={{ message: errors.first_name, touched: touched.first_name }}
              name="first_name"
              onChange={handleChange}
              placeholder="Enter your first name"
              value={values.first_name}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Input
              error={{ message: errors.last_name, touched: touched.last_name }}
              name="last_name"
              onChange={handleChange}
              placeholder="Enter your last name"
              value={values.last_name}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Input
              error={{ message: errors.email, touched: touched.email }}
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              type="email"
              value={values.email}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <Input
              error={{ message: errors.password, touched: touched.password }}
              name="password"
              onChange={handleChange}
              placeholder="Create a password"
              type="password"
              value={values.password}
            />

            {values.password && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={cn(
                        "h-1 flex-1 rounded-full transition-colors",
                        i < passwordStrength.requirements.filter((r) => r.passed).length
                          ? passwordStrength.percentage >= 80
                            ? "bg-green-500"
                            : passwordStrength.percentage >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          : "bg-gray-200",
                      )}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: i * 0.05 }}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {passwordStrength.requirements.map((req, i) => (
                    <motion.div
                      key={req.label}
                      className="flex items-center gap-1 text-xs"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {req.passed ? (
                        <RiCheckLine className="size-3 text-green-500" />
                      ) : (
                        <RiCloseLine className="size-3 text-gray-400" />
                      )}
                      <span className={cn(req.passed ? "text-green-600" : "text-gray-500")}>{req.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Input
              error={{ message: errors.password_confirm, touched: touched.password_confirm }}
              name="password_confirm"
              onChange={handleChange}
              placeholder="Please confirm your password"
              type="password"
              value={values.password_confirm}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button className="w-full" disabled={isSignupLoading} type="submit">
              {isSignupLoading ? <ButtonLoader /> : "Continue"}
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
            Already have an account?{" "}
            <Link className="hover:text-primary-500 underline transition-colors" href="/signin">
              Sign in
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;
