"use client";

import { useState } from "react";
import { userService } from "@/services/user.service";
import Button from "@/components/common/Button";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !currentPassword ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response =
        await userService.changePassword({
          currentPassword,
          password,
          confirmPassword,
        });

      alert(response.message);

      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Unable to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl rounded-2xl bg-white p-8 shadow"
    >
      <div className="space-y-6">
        {/* Current Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Current Password
          </label>

          <input
            type="password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
            placeholder="Enter current password"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            New Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
            placeholder="Enter new password"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Confirm Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
            placeholder="Confirm new password"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Updating..."
              : "Change Password"}
          </Button>
        </div>
      </div>
    </form>
  );
}