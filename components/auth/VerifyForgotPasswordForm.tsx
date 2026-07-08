"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Button from "@/components/common/Button";
import {
  OTPInput,
  REGEXP_ONLY_DIGITS,
} from "input-otp";

import { authService } from "@/services/auth.service";
import { toast} from "react-toastify";
import {
  getApiErrorMessage,
  getApiFieldError,
  getApiSuccessMessage,
} from "@/lib/api-response";

export default function VerifyForgotPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

const handleResendOtp = async () => {
  setErrorMessage("");
  setSuccessMessage("");
  if (!email) {
    setErrorMessage("Email address is missing. Please try forgot password again.");
    return;
  }

  try {
    setLoading(true);

    const response =
      await authService.resendVerificationOtp({
        email,
      });

    const message = getApiSuccessMessage(response, "OTP sent successfully.");

    setSuccessMessage(message);
    toast.success(message);
  } catch (error) {
    const message = getApiErrorMessage(error, "Unable to resend OTP.");
    setErrorMessage(getApiFieldError(error, "email") || message);
    toast.error(message);
  } finally {
    setLoading(false);
  }
};

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (otp.length !== 6) {
      setErrorMessage("Please enter the 6-digit OTP.");
      return;
    }

    try {
    setVerifying(true);
    const response=await authService.verifyForgotPasswordOtp({
        email,
        otp,
      });
      localStorage.setItem(
  "resetToken",
  response.data.resetToken
);
toast.success(response.message || "OTP verified successfully.");

      router.push(
        `/reset-password?email=${encodeURIComponent(email)}`
      );
    } catch (error) {
      const message = getApiErrorMessage(error, "OTP verification failed.");
      setErrorMessage(
        getApiFieldError(error, "otp") ||
          getApiFieldError(error, "email") ||
          message
      );
      toast.error(message);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold">
        Verify OTP
      </h2>

      <p className="text-slate-500">
        Enter the OTP sent to your email.
      </p>

      <OTPInput
        value={otp}
        onChange={setOtp}
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
         render={({ slots }) => (
    <div className="flex gap-2">
      {slots.map((slot, index) => (
        <div
          key={index}
          className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-300 text-lg font-semibold"
        >
          {slot.char ?? ""}
        </div>
      ))}
    </div>
  )}
      />
      {errorMessage && (
        <p className="text-sm text-red-500">
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p className="text-sm text-green-600">
          {successMessage}
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        loading={verifying}
      >
        Verify OTP
      </Button>
      <div className="" >
        Not received the OTP?{" "} 
        <Button  type="button" onClick={handleResendOtp} disabled={loading}>
          {loading ? "Sending..." : "Resend OTP"}
        </Button>
        
        </div>
    </form>
  );
}
