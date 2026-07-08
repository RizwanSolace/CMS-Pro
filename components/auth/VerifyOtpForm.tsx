"use client";

import { useState } from "react";
import Link from "next/link";
import { Suspense } from 'react';
import {
  OTPInput,
  REGEXP_ONLY_DIGITS
} from "input-otp";
import Button from "@/components/common/Button";
import { useSearchParams } from "next/navigation";
import { authService} from "@/services/auth.service"
import { useRouter } from "next/navigation";


export default function VerifyOtpForm() {
const searchParams = useSearchParams();

const email = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const router=useRouter();

  const handleVerify = async () => {
   //await authService.verifyEmail(email!, otp);
 if (otp.length !== 6) return;
 if (!email) return;

  console.log(otp);
   try {
    const response = await authService.verifyEmail({
      email,
      otp,
    });
    console.log(response)

  router.push("/login");
    // TODO:
   }
   catch (error) {
      console.error("OTP verification failed:", error);
    }
  }  // verify OTP API
  

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
  We've sent a verification code to
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

      <div className="mt-8">
        <Button
          fullWidth
          onClick={handleVerify}
        >
          Verify Email
        </Button>
      </div>

      <div className="mt-6 text-center text-sm">
        Didn't receive the code?{" "}
        <button
          className="font-semibold text-blue-600 hover:underline"
        >
          Resend OTP
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
