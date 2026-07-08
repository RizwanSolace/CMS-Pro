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

export default function VerifyForgotPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

const handleResendOtp = async () => {
  try {
    setLoading(true);

    const response =
      await authService.resendVerificationOtp({
        email,
      });

    console.log(response);

    alert("OTP sent successfully.");
  } catch (error) {
    console.error(error);
    alert("Unable to resend OTP.");
  } finally {
    setLoading(false);
  }
};

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
    const response=await authService.verifyForgotPasswordOtp({
        email,
        otp,
      });
      localStorage.setItem(
  "resetToken",
  response.data.resetToken
);
      console.log("Verify OTP Response:", response);
toast("OTP verified successfully. Redirecting to reset password page.", {
  type: "success",
  autoClose: 3000, // Close after 3 seconds
});

      router.push(
        `/reset-password?email=${email}`
      );
    } catch (error:any) {
      console.log("Status:", error.response?.status);
  console.log("Data:", error.response?.data);
  console.error(error);
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

      <Button
        type="submit"
        className="w-full"
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