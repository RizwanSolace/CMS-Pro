import { SignupPayLoad } from "@/types/auth";
import {  LoginPayload } from "@/types/auth";
import { LoginFormData } from "@/lib/validation/auth";



export const toSignupPayload = (data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}): SignupPayLoad => ({
  name: `${data.firstName} ${data.lastName}`.trim(),
  email: data.email,
  phone: data.phone,
  password: data.password,
  confirmPassword: data.confirmPassword,
 
});
export const toLoginPayload = (
  data: LoginFormData
): LoginPayload => ({
  email: data.email,
  password: data.password,
});