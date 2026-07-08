import { User } from "@/types/user";

export const mockUsers: User[] = [
  {
    id: 1,
    firstName: "Rizwan",
    lastName: "Vahora",
    email: "rizwan@example.com",
    phone: "9876543210",
    role: "Super Admin",
    status: "Active",
    createdAt: "06 Jul 2026",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "9988776655",
    role: "Admin",
    status: "Active",
    createdAt: "05 Jul 2026",
  },
  {
    id: 3,
    firstName: "Sarah",
    lastName: "Smith",
    email: "sarah@example.com",
    phone: "9871234567",
    role: "Editor",
    status: "Inactive",
    createdAt: "02 Jul 2026",
  },
];