import api from "@/lib/axios";
import { RegisterFormData } from "@/lib/validation/auth";
import { SignupPayLoad,SignupResponse,  VerifyEmailPayload,
  VerifyEmailResponse, LoginPayload, LoginResponse,ForgotPasswordPayload,ForgotPasswordResponse,VerifyForgotPasswordOtpPayload,VerifyForgotPasswordOtpResponse,ResetPasswordPayload,ResetPasswordResponse} from "@/types/auth";
import axios from "axios";

export const authService = {
 
  register: async (
    payload:SignupPayLoad
  ):Promise<SignupResponse>=>{
    const {data}=await api.post<SignupResponse>(
      "/auth/signup",
      payload
    );

    return data;
  },
  

  verifyEmail: async (payload:VerifyEmailPayload):Promise<VerifyEmailResponse> => {
    const { data } = await api.post<VerifyEmailResponse>("/auth/verify-email",payload);

    return data;
  },

  resendOtp: async (email: string) => {
    const response = await api.post("/auth/resend-otp", {
      email,
    });

    return response.data;
  },
 

login: async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  try {
    console.log("Login Payload:", payload);

    const { data } = await api.post<LoginResponse>(
      "/auth/login",
      payload
    );

    console.log("Login Response:", data);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:");
      console.error("Status:", error.response?.status);
      console.error("Status Text:", error.response?.statusText);
      console.error("Response Data:", error.response?.data);
      console.error("Headers:", error.response?.headers);
    } else {
      console.error("Unknown Error:", error);
    }

    throw error;
  }
},
forgotPassword: async (
  payload: ForgotPasswordPayload
): Promise<ForgotPasswordResponse> => {
  const { data } = await api.post(
    "/auth/forgot-password",
    payload
  );

  return data;
},

verifyForgotPasswordOtp: async (
  payload: VerifyForgotPasswordOtpPayload
): Promise<VerifyForgotPasswordOtpResponse> => {
  const { data } = await api.post(
    "/auth/verify-forgot-password-otp",
    payload
  );

  return data;
},

resetPassword: async (
  payload: ResetPasswordPayload
): Promise<ResetPasswordResponse> => {
  const resetToken = localStorage.getItem("resetToken");
  const { data } = await api.post(
    "/auth/reset-password",
    payload,
     {
      headers: {
        Authorization: `Bearer ${resetToken}`,
      },
    }
  );

  return data;
},
resendVerificationOtp: async (
  payload: { email: string }
) => {
  try{
  const { data } = await api.post(
    "/auth/resend-forgot-password-otp",
    payload
  );

  return data;
} catch (error) {
      console.log("Status:", error.response?.status);
  console.log("Data:", error.response?.data);
  console.error(error);
    }
},
};