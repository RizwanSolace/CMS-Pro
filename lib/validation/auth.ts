import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(8, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;