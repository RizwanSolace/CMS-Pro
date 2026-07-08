"use client";

import ChangePasswordForm from "@/components/profile/ChangePasswordForm";

export default function ChangePasswordPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Change Password
        </h1>

        <p className="mt-2 text-slate-500">
          Update your account password securely.
        </p>
      </div>

      <ChangePasswordForm />
    </div>
  );
}