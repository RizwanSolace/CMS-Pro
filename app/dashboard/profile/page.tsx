"use client";

import ProfileForm from "@/components/profile/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="text-slate-500">
          View and update your profile.
        </p>
      </div>

      <ProfileForm />
    </div>
  );
}