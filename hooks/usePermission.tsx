"use client";

import useAuth from "@/hooks/useAuth";
import { hasPermission, hasAnyRole } from "@/lib/permissions";

export default function usePermission() {
  const { role } = useAuth();

  const { normalizedRole } = useAuth() as any;

  function can(permission: string) {
    const checkRole = normalizedRole ?? role;
    return hasPermission(checkRole, permission);
  }

  function isInRole(roles: Array<string>) {
    const checkRole = normalizedRole ?? role;
    return hasAnyRole(checkRole, roles as any);
  }

  return {
    role,
    can,
    isInRole,
  };
}
