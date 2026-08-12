"use client";

import { useEffect, useState } from "react";
import { getUserFromLocalStorage } from "@/lib/permissions";
import { authService } from "@/services/auth.service";

export default function useAuth() {
  const [user, setUser] = useState<any | null>(() => {
    if (typeof window === "undefined") return null;

    return getUserFromLocalStorage();
  });

  useEffect(() => {
    // Fetch fresh user data from API to ensure we have the latest role
    const fetchFreshUser = async () => {
      try {
        const response = await authService.getProfile();
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch fresh user data:", error);
        // Fall back to localStorage if API fails
        setUser(getUserFromLocalStorage());
      }
    };

    fetchFreshUser();
  }, []);

  useEffect(() => {
    // ensure we stay in sync if something else updates localStorage
    const handleStorage = () => {
      setUser(getUserFromLocalStorage());
    };

    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return {
    user,
    // `role` remains the original value (for display)
    role: user?.role as string | undefined,
    // `normalizedRole` is used for permission checks
    normalizedRole: (user as any)?.normalizedRole as string | undefined,
  };
}
