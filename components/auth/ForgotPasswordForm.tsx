"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { authService } from "@/services/auth.service";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
         console.log(email);
  const response =
    await authService.forgotPassword({
      email,
    });

  console.log(response);

  router.push(
    `/verify-forgot-password?email=${email}`
  );
} catch (error) {
  console.error(error);
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
        required
      />

      <Button type="submit" className="w-full">
        Send OTP
      </Button>
    </form>
  );
}