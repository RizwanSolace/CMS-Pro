export type Role = "SUPER_ADMIN" | "ADMIN" | "EDITOR"|"USER";

export const Roles = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  EDITOR: "EDITOR",
  USER: "USER",
} as const;

// Permission keys are descriptive and scalable for later enhancements
export const rolePermissions: Record<Role, string[]> = {
  SUPER_ADMIN: [
    "dashboard",
    "users:crud",
    "roles:crud",
    "cms:crud",
    "builder",
    "settings",
    "profile",
    "approveAdmin",
    "analytics",
  ],

  ADMIN: [
    "dashboard",
    "users:view",
    "users:update",
    "users:delete",
    "users:activate",
    "cms:crud",
    "builder",
    "profile",
    "analytics",
  ],

  EDITOR: [
    "dashboard",
    "cms:create",
    "cms:edit:own",
    "builder",
    "profile",
    "changePassword",
  ],
  USER: [
    "dashboard",
    "profile",
    "settings",
    "changePassword",
  ],

};

export function hasPermission(
  role: string | undefined | null,
  permission: string
): boolean {
  if (!role) return false;

  const normalized = normalizeRole(role);
  if (!normalized) return false;


  const perms = (rolePermissions as any)[normalized];

  if (!perms) return false;

  return perms.includes(permission) || perms.includes("*") || normalized === Roles.SUPER_ADMIN;
}

export function hasAnyRole(role: string | undefined | null, roles: Role[]) {
  if (!role) return false;
  const normalized = normalizeRole(role);

  return roles.includes(normalized as Role);
}

export function getUserFromLocalStorage() {
  try {
    const raw = localStorage.getItem("user");

    if (!raw) return null;

    const parsed = JSON.parse(raw);

    if (parsed && typeof parsed.role === "string") {
        // keep original role for display, store normalized role separately
        parsed.normalizedRole = normalizeRole(parsed.role);
    }

    return parsed;
  } catch (e) {
    return null;
  }
}

function normalizeRole(role: string | undefined | null) {
  if (!role) return role;
  const normalized = role
    .toString()
    .trim()
    .replace(/\s+/g, "_")
    .toUpperCase();

  return normalized;
}
