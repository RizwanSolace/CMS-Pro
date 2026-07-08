"use client";

import ProfileForm from "@/components/profile/ProfileForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import { useRouter } from "next/navigation";
import  Button  from "@/components/common/Button"; 

export default function ProfilePage() {
const router=useRouter()
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
        <Button
        onClick={() =>
          router.push("/dashboard/profile/change-password")
        }
        className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
      >
        Change Password
      </Button>
    </div>
  );
}