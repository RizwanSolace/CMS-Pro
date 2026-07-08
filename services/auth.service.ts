import api from "@/lib/axios";
import { SignupPayLoad,SignupResponse,  VerifyEmailPayload,
  VerifyEmailResponse, LoginPayload, LoginResponse,ForgotPasswordPayload,ForgotPasswordResponse,VerifyForgotPasswordOtpPayload,VerifyForgotPasswordOtpResponse,ResetPasswordPayload,ResetPasswordResponse,  } from "@/types/auth";
import { UserProfileResponse, UserProfile, UpdateProfilePayload,UpdateProfileResponse} from "@/types/auth";
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
  try{
    const { data } = await api.post<LoginResponse>(
      "/auth/login",
      payload
    );

    return data;
  }catch(error:any){
    console.log(error)
    console.log(error.response)
     throw error; // <-- Important
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
  const { data } = await api.post(
    "/auth/resend-forgot-password-otp",
    payload
  );

  return data;
},
getProfile: async (): Promise<UserProfileResponse> => {
  const { data } = await api.get<UserProfileResponse>(
    "/user/profile"
  );

  return data;
},
updateProfile: async (
    payload: UpdateProfilePayload
  ): Promise<UpdateProfileResponse> => {
    const { data } = await api.patch(
      "/user/profile",
      payload
    );

    return data;
  },
};
  