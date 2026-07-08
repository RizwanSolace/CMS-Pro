"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { authService } from "@/services/auth.service";
import { toast} from "react-toastify";

export default function ResetPasswordForm() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await authService.resetPassword({
        password,
        confirmPassword,
      });

      console.log(response);
localStorage.removeItem("resetToken");
      router.push("/login");
      toast.success("Password reset successfully. Please login.");
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
        Reset Password
      </h2>

      <p className="text-slate-500">
        Enter your new password.
      </p>

      <Input
        id="password"
        label="New Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Input
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <Button
        type="submit"
        className="w-full"
      >
        Reset Password
      </Button>
    </form>
  );
}