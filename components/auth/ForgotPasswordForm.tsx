"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import {
  getApiErrorMessage,
  getApiFieldError,
} from "@/lib/api-response";
import { authService } from "@/services/auth.service";
import { toast } from "react-toastify";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    try {
      setLoading(true);
  const response =
    await authService.forgotPassword({
      email,
    });

  toast.success(response.message || "OTP sent successfully.");

  router.push(
    `/verify-forgot-password?email=${encodeURIComponent(email)}`
  );
} catch (error) {
  const message = getApiErrorMessage(error, "Unable to send OTP.");
  setEmailError(getApiFieldError(error, "email") || message);
  toast.error(message);
} finally {
  setLoading(false);
}

   
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold">
        Forgot Password
      </h2>

      <p className="text-slate-500">
        Enter your registered email address.
      </p>

      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        error={emailError}
        required
      />

      <Button type="submit" className="w-full" loading={loading}>
        Send OTP
      </Button>
    </form>
  );
}
