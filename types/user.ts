export type UserStatus = "Active" | "Inactive" | "Blocked";

export type UserRole =
  | "Super Admin"
  | "Admin"
  | "Editor"
  | "User";

export interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
  phone: string;

  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
  status: UserStatus;
  createdAt: string;
}
export interface GetUsersResponse {
  success: boolean;
  message: string;
  data: {
    users: User[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
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
export interface UpdateUserPayload {
  name: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
}
export interface CreateEditorPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
export interface CreateAdminPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;

}