"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import Input from "@/components/common/Input";
import PasswordInput from "@/components/common/PasswordInput";
import Button from "@/components/common/Button";

import { isValidPhoneNumber } from "libphonenumber-js";
import {
  applyApiValidationErrors,
  getApiErrorMessage,
  getApiValidationErrors,
} from "@/lib/api-response";
import { useRouter } from "next/navigation";

import {toSignupPayload} from  "@/lib/mappers/auth.mapper";
import { authService } from "@/services/auth.service";
import { toast } from "react-toastify";

import { RegisterFormData } from "@/lib/validation/auth";

export default function RegisterForm() {
    const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
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
      const payload = toSignupPayload(data);
      const response = await authService.register(payload);

      toast.success(response.message || "Account created successfully.");

      router.push(
        `/verify-email?email=${encodeURIComponent(payload.email)}`
      );
    } catch (error) {
      const hadFieldErrors = applyApiValidationErrors(error, setError, {
        name: "firstName",
      });
       const message = getApiErrorMessage(error);

  if (message === "Email already exists.") {
    setError("email", {
      type: "server",
      message,
    });
  }
  if (message === "Phone number already exists.") {
  setError("phone", {
    type: "server",
    message,
  });
}
   toast.error(message);


      const apiErrors = getApiValidationErrors(error);
      if (Array.isArray(apiErrors)) {
        apiErrors.forEach((item) => {
          const message = item?.message || item?.msg;
          if (typeof message === "string") {
            toast.error(message);
          }
        });
      } else if (hadFieldErrors) {
        // If field errors were applied but there is also a top-level message,
        // show that too for general validation failure.
        toast.error(getApiErrorMessage(error, "Registration failed. Please try again."));
      } else {
        toast.error(getApiErrorMessage(error, "Registration failed. Please try again."));
      }
    }
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
 {...register("firstName", {
    required: "First Name is required",
  })}
            error={errors.firstName?.message}
          />

          <Input
            id="lastName"
            label="Last Name"
            placeholder="Doe"
            required
             {...register("lastName", {
    required: "Last Name is required",
  })}
            error={errors.lastName?.message}
          />
        </div>

        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="john@example.com"
          required
         {...register("email", {
    required: "Email is required",
  })}
          error={errors.email?.message}
        />

        <Input
          id="phone"
          type="tel"
          label="Phone Number"
          placeholder="9876543210"
          required
          {...register("phone", {
    required: "Phone number is required",
     pattern: {
      value: /^[6-9]\d{9}$/,
      message: "Please enter a valid 10-digit Indian phone number",
    },
     validate: (value) =>
      isValidPhoneNumber(`+91${value}`)
        || "Please enter a valid Indian phone number",
  } )}
  
          error={errors.phone?.message}
        />

        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          required
          {...register("password", {
    required: "Password is required",
  })}
          error={errors.password?.message}
        />

        <p className="text-sm text-slate-500">
          Password must be at least 8 characters and include one uppercase letter, one lowercase letter, and one special character.
        </p>

        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          required
          {...register("confirmPassword", {
    required: "Please confirm your password",
  })}
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
