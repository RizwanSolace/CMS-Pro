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
      "Media Library",
      "Admin Requests", 
    ],
    users: 1
    
  },
  {
    id: "2",
    name: "Admin",
    description: "Manage users and CMS",
    permissions: [
      "Users",
      "CMS",
      "Media Library",
     
    ],
    users: 4,
  
  },
  {
    id: "3",
    name: "Editor",
    description: "Manage CMS pages",
    permissions: [
      "CMS",
      "Media Library",
      "Admin Requests"

    ],
    users: 12,
 
  },
];