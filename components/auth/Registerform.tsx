"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import Input from "@/components/common/Input";
import PasswordInput from "@/components/common/PasswordInput";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

import {toSignupPayload} from  "@/lib/mappers/auth.mapper";
import { authService } from "@/services/auth.service";

import {registerSchema,RegisterFormData}  from "@/lib/validation/auth";

export default function RegisterForm() {
    const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
    const response = toSignupPayload(data);
    await authService.register(response)

    router.push(
      `/verify-email?email=${encodeURIComponent(response.email)}`
    );

  } catch (error) {
    console.error(error);
      if (error.response) {
    console.log("Status:", error.response?.status);
  console.log("Data:", error.response?.data);
  console.log("Headers:", error.response?.headers);
  console.log("Full Error:", error);
    alert(error.response.data.message);
  } else {
    alert("Something went wrong");
  }
  }

    // TODO:
    // await authService.register(data);

    // Redirect to login page
  };

  return (
   <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Create Account
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Register to access your account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            id="firstName"
            label="First Name"
            placeholder="John"
            required
            {...register("firstName")}
            error={errors.firstName?.message}
          />

          <Input
            id="lastName"
            label="Last Name"
            placeholder="Doe"
            required
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>

        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="john@example.com"
          required
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          id="phone"
          type="tel"
          label="Phone Number"
          placeholder="9876543210"
          required
          {...register("phone")}
          error={errors.phone?.message}
        />

        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          required
          {...register("password")}
          error={errors.password?.message}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          required
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
           className="hover:-translate-y-0.5 hover:shadow-lg"
        >

          Create Account
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}