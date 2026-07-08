import { Role } from "@/types/role";

export const mockRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full access to the system",
    permissions: [
      "Users",
      "Roles",
      "CMS",
      "Settings",
    ],
    users: 1,
    createdAt: "06 Jul 2026",
  },
  {
    id: "2",
    name: "Admin",
    description: "Manage users and CMS",
    permissions: [
      "Users",
      "CMS",
    ],
    users: 4,
    createdAt: "05 Jul 2026",
  },
  {
    id: "3",
    name: "Editor",
    description: "Manage CMS pages",
    permissions: [
      "CMS",
    ],
    users: 12,
    createdAt: "02 Jul 2026",
  },
];