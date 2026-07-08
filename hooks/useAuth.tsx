"use client";

import { useEffect, useState } from "react";
import { getUserFromLocalStorage } from "@/lib/permissions";

export default function useAuth() {
  const [user, setUser] = useState<any | null>(() => {
    if (typeof window === "undefined") return null;

    return getUserFromLocalStorage();
  });

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
    role: user?.role as string | undefined,
  };
}
