"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { hasPermission, hasAnyRole } from "@/lib/permissions";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: Array<string>;
  requiredPermission?: string;
}

export default function RoleGuard({
  children,
  allowedRoles,
  requiredPermission,
}: RoleGuardProps) {
  const router = useRouter();
  const { role, normalizedRole, user } = useAuth() as any;

  useEffect(() => {
    // wait until user is loaded
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/login");
      return;
    }

    // If allowedRoles provided, enforce
    if (allowedRoles && allowedRoles.length > 0) {
      const checkRole = normalizedRole ?? role;
      if (!hasAnyRole(checkRole, allowedRoles as any)) {
        router.replace("/unauthorized");
        return;
      }
    }

    if (requiredPermission) {
      const checkRole = normalizedRole ?? role;
      if (!hasPermission(checkRole, requiredPermission)) {
        router.replace("/unauthorized");
        return;
      }
    }
  }, [role, allowedRoles, requiredPermission, router, user]);

  // during SSR / initial load, avoid flashing content when not allowed
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("accessToken");

  if (!token) return null;

  // basic client-side guard; redirection handled in effect
  const checkRole = normalizedRole ?? role;
  if (allowedRoles && allowedRoles.length > 0 && !hasAnyRole(checkRole, allowedRoles as any)) {
    return null;
  }

  if (requiredPermission && !hasPermission(checkRole, requiredPermission)) return null;

  return <>{children}</>;
}
