"use client";

import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import { UserProfile } from "@/types/auth";

export default function ProfileForm() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
const [reason, setReason] = useState("");
const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await authService.getProfile();
      setProfile(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!profile) return;

    setSaving(true);

    try {
      const res = await authService.updateProfile({
        name: profile.name,
        phone: profile.phone,
      });

      setProfile(res.data);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-8 shadow">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-xl bg-white p-8 shadow">
        Failed to load profile.
      </div>
    );
  }
  const handleRequestAdmin = async (reason:string ) => {
  try {
    await userService.requestAdmin(reason);

    alert("Admin request submitted successfully.");
  } catch (error) {
    console.error(error);
    alert("Failed to submit request.");
  }
};

  return (
    <div className="rounded-2xl bg-white p-8 shadow">
      <div className="mb-8 flex items-center gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">
          {profile.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            {profile.name}
          </h2>

          <p className="text-slate-500">
            {profile.email}
          </p>

          <div className="mt-3 flex gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {profile.role}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                profile.isVerified
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {profile.isVerified
                ? "Verified"
                : "Not Verified"}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                profile.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {profile.isActive
                ? "Active"
                : "Inactive"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">
            Name
          </label>

          <input
            type="text"
            value={profile.name}
            onChange={(e) =>
              setProfile({
                ...profile,
                name: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Email
          </label>

          <input
            type="email"
            value={profile.email}
            readOnly
            className="w-full rounded-xl bg-slate-100 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Phone
          </label>

          <input
            type="text"
            value={profile.phone}
            onChange={(e) =>
              setProfile({
                ...profile,
                phone: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Role
          </label>

          <input
            type="text"
            value={profile.role}
            readOnly
            className="w-full rounded-xl bg-slate-100 p-3"
          />
        </div>
         

        <div>
          <label className="mb-2 block font-medium">
            Last Login
          </label>

          <input
            type="text"
            value={new Date(
              profile.lastLogin
            ).toLocaleString()}
            readOnly
            className="w-full rounded-xl bg-slate-100 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Member Since
          </label>

          <input
            type="text"
            value={new Date(
              profile.createdAt
            ).toLocaleDateString()}
            readOnly
            className="w-full rounded-xl bg-slate-100 p-3"
          />
        </div>
      </div>
      {profile.role === "EDITOR" && (
  <Button
    variant="secondary"
    className="m-4"
    onClick={() => setShowRequestModal(true)}
  >
    Request Admin Access
  </Button>
)}
  
{showRequestModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="w-full max-w-lg rounded-xl bg-white p-6">
      <h2 className="text-xl font-semibold">
        Request Admin Access
      </h2>

      <p className="mt-2 text-sm text-gray-600">
        Explain why you need Admin privileges.
      </p>

      <textarea
        rows={5}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="mt-4 w-full rounded-lg border p-3"
        placeholder="Reason..."
      />

      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="secondary"
          onClick={() => setShowRequestModal(false)}
        >
          Cancel
        </Button>

        <Button
          disabled={requesting}
          onClick={() => handleRequestAdmin(reason)}
        >
          {requesting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  </div>
)}
      <div className="mt-8">
        <Button
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}