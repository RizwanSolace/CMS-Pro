"use client";

import { useState } from "react";
import Link from "next/link";
import {
  OTPInput,
  REGEXP_ONLY_DIGITS
} from "input-otp";
import Button from "@/components/common/Button";
import {
  getApiErrorMessage,
  getApiFieldError,
  getApiSuccessMessage,
} from "@/lib/api-response";
import { useSearchParams } from "next/navigation";
import { authService} from "@/services/auth.service"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function VerifyOtpForm() {
const searchParams = useSearchParams();

const email = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const router=useRouter();

  const handleVerify = async () => {
 setErrorMessage("");
 setSuccessMessage("");
 if (otp.length !== 6) {
  setErrorMessage("Please enter the 6-digit OTP.");
  return;
 }
 if (!email) {
  setErrorMessage("Email address is missing. Please register again.");
  return;
 }

   try {
    setLoading(true);
    const response = await authService.verifyEmail({
      email,
      otp,
    });
    toast.success(response.message || "Email verified successfully.");

  router.push("/login");
   }
   catch (error) {
      const message = getApiErrorMessage(error, "OTP verification failed.");
      setErrorMessage(
        getApiFieldError(error, "otp") ||
          getApiFieldError(error, "email") ||
          message
      );
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!email) {
      setErrorMessage("Email address is missing. Please register again.");
      return;
    }

    try {
      setResending(true);
      const response = await authService.resendOtp(email);
      const message = getApiSuccessMessage(response, "OTP sent successfully.");

      setSuccessMessage(message);
      toast.success(message);
    } catch (error) {
      const message = getApiErrorMessage(error, "Unable to resend OTP.");
      setErrorMessage(getApiFieldError(error, "email") || message);
      toast.error(message);
    } finally {
      setResending(false);
    }
  };
  

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Verify Email
        </h1>

        <p className="mt-2 text-gray-500">
          Enter the 6-digit verification code sent to your email.
        </p>
        <p className="mt-2 text-sm text-gray-500">
  We&apos;ve sent a verification code to
</p>

<p className="font-semibold text-slate-700">
  {email}
</p>
      </div>


      <OTPInput
        maxLength={6}
        value={otp}
        onChange={setOtp}
        pattern={REGEXP_ONLY_DIGITS}
        containerClassName="flex justify-between gap-2"
        render={({ slots }) => (
          <>
            {slots.map((slot, index) => (
              <div
                key={index}
                className={`flex h-14 w-14 items-center justify-center rounded-lg border text-xl font-semibold ${
                  slot.isActive
                    ? "border-blue-600"
                    : "border-gray-300"
                }`}
              >
                {slot.char ?? ""}
              </div>
            ))}
          </>
        )}
      />
      {errorMessage && (
        <p className="mt-3 text-sm text-red-500">
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p className="mt-3 text-sm text-green-600">
          {successMessage}
        </p>
      )}

      <div className="mt-8">
        <Button
          fullWidth
          onClick={handleVerify}
          loading={loading}
        >
          Verify Email
        </Button>
      </div>

      <div className="mt-6 text-center text-sm">
        Didn&apos;t receive the code?{" "}
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={resending}
          className="font-semibold text-blue-600 hover:underline"
        >
          {resending ? "Sending..." : "Resend OTP"}
        </button>
      </div>

      <div className="mt-4 text-center">
        <Link
          href="/login"
          className="text-sm text-gray-600 hover:text-black"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
