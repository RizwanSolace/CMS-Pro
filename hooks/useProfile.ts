"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/auth.service";
import { UserProfile } from "@/types/auth";

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authService.getProfile();
        setProfile(response.data);
      } catch (error:any) {
        console.error("Failed to load profile:", error);
        console.log("Error Response", error.response);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return {
    profile,
    loading,
  };
}