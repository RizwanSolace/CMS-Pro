"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/common/Input";
import PasswordInput from "@/components/common/PasswordInput";
import Button from "@/components/common/Button";
import {toLoginPayload} from "@/lib/mappers/auth.mapper";
import { authService } from "@/services/auth.service";


import {
  loginSchema,
  LoginFormData,
} from "@/lib/validation/auth";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const payload = toLoginPayload(data);

const response = await authService.login(payload);
localStorage.setItem(
  "accessToken",
  response.data.accessToken
);
localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);
console.log(response);
    console.log(data);
    alert("Login successful!"); // TODO: Replace with success notification

    // TODO: Replace with API
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome Back
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Sign in to continue to your account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="john@example.com"
          required
          {...register("email")}
          error={errors.email?.message}
        />

        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          required
          {...register("password")}
          error={errors.password?.message}
        />

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
          className="hover:-translate-y-0.5 hover:shadow-lg"
        >
          Sign In
        </Button>

        <p className="text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}