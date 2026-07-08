"use client";

import useAuth from "@/hooks/useAuth";
import { hasPermission, hasAnyRole } from "@/lib/permissions";

export default function usePermission() {
  const { role } = useAuth();

  function can(permission: string) {
    return hasPermission(role, permission);
  }

  function isInRole(roles: Array<string>) {
    return hasAnyRole(role, roles as any);
  }

  return {
    role,
    can,
    isInRole,
  };
}
