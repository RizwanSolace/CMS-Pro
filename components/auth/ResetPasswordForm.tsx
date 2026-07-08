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
import { toast} from "react-toastify";

export default function ResetPasswordForm() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setConfirmPasswordError("");

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await authService.resetPassword({
        password,
        confirmPassword,
      });

localStorage.removeItem("resetToken");
      router.push("/login");
      toast.success(response.message || "Password reset successfully. Please login.");
    } catch (error) {
      const message = getApiErrorMessage(error, "Unable to reset password.");
      setPasswordError(getApiFieldError(error, "password") || message);
      setConfirmPasswordError(getApiFieldError(error, "confirmPassword") || "");
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
        error={passwordError}
        required
      />

      <Input
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={confirmPasswordError}
        required
      />

      <Button
        type="submit"
        className="w-full"
        loading={loading}
      >
        Reset Password
      </Button>
    </form>
  );
}
