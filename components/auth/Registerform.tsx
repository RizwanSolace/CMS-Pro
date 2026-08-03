"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import Input from "@/components/common/Input";
import PasswordInput from "@/components/common/PasswordInput";
import Button from "@/components/common/Button";
import {
  applyApiValidationErrors,
  getApiErrorMessage,
} from "@/lib/api-response";
import { useRouter } from "next/navigation";

import {toSignupPayload} from  "@/lib/mappers/auth.mapper";
import { authService } from "@/services/auth.service";
import { toast } from "react-toastify";

import {registerSchema,RegisterFormData}  from "@/lib/validation/auth";

export default function RegisterForm() {
    const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
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
    const payload = toSignupPayload(data);
    const response = await authService.register(payload);
    // Some APIs return 200 with success: false and include validation errors.
    if (response && (response as any).success === false) {
      const resp = response as any;

      const mapField = (fieldName: string | undefined) => {
        if (!fieldName) return fieldName;
        if (fieldName.startsWith("body.")) {
          return fieldName.split(".").pop();
        }
        if (fieldName === "name") {
          return "firstName";
        }
        return fieldName;
      };

      const setServerError = (fieldName: string, message: string) => {
        const mappedField = mapField(fieldName) as any;

        if (mappedField) {
          setError(mappedField, {
            type: "server",
            message,
          });
          return true;
        }

        return false;
      };

      let handled = false;

      if (Array.isArray(resp.errors)) {
        resp.errors.forEach((item: any) => {
          const fieldName = item.field || item.path || item.param;
          const message = item.message || item.msg;

          if (fieldName && message) {
            handled = setServerError(fieldName, message) || handled;
          }
        });
      } else if (resp.errors && typeof resp.errors === "object") {
        Object.entries(resp.errors).forEach(([k, v]) => {
          const fieldName = mapField(k);
          const message = Array.isArray(v) ? v[0] : v;

          if (typeof fieldName === "string" && typeof message === "string") {
            setError(fieldName as any, {
              type: "server",
              message,
            });
            handled = true;
          }
        });
      }

      if (!handled && Array.isArray(resp.message)) {
        resp.message.forEach((item: any) => {
          if (item && typeof item === "object") {
            const fieldName = item.field || item.path || item.param;
            const message = item.message || item.msg;

            if (fieldName && message) {
              handled = setServerError(fieldName, message) || handled;
            }
          } else if (typeof item === "string") {
            toast.error(item);
            handled = true;
          }
        });
      }

      if (!handled) {
        const msg = typeof resp.message === "string" ? resp.message : resp.error;
        toast.error(msg || "Registration failed. Please try again.");
      }

      return;
    }

    toast.success(response.message || "Account created successfully.");

    router.push(
      `/verify-email?email=${encodeURIComponent(payload.email)}`
    );

  } catch (error) {
    applyApiValidationErrors(error, setError, {
      name: "firstName",
    });
    toast.error(getApiErrorMessage(error, "Registration failed. Please try again."));
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
