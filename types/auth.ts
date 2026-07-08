import { isAborted } from "zod/v3";

export interface SignupPayLoad {
  name: string;
  
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  
}
export interface SignupResponse {
  success: boolean;
  message: string;
    data?: unknown;
}
export interface VerifyEmailPayload {
  email: string;
  otp: string;
}

export interface VerifyEmailResponse {
  success?: boolean;
  message: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}
export interface LoggedInUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture: string | null;
  role: string;
  isVerified: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: LoggedInUser;
  };
}
export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface VerifyForgotPasswordOtpPayload {
  email: string;
  otp: string;
}

export interface VerifyForgotPasswordOtpResponse {
  success: boolean;
  message: string;
  data: {
    resetToken: string;
  };
}

export interface ResetPasswordPayload {

  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture: string | null;
  role: string;
  isVerified: boolean;
  isActive:boolean;
  lastLogin:string;
  createdAt:string;
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}
export interface UpdateProfilePayload {
  name: string;
  phone: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}