export type UserStatus = "Active" | "Inactive" | "Blocked";

export type UserRole =
  | "Super Admin"
  | "Admin"
  | "Editor"
  | "User";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}
export interface ChangePasswordPayload {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}