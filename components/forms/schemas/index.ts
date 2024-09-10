import * as z from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
export type SignInDataSchema = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
export type SignUpDataSchema = z.infer<typeof SignUpSchema>;

export const VerificationFormSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 digits" })
    .regex(/^\d{6}$/, { message: "OTP must be a numeric value" }),
});
export type VerificationDataSchema = z.infer<typeof VerificationFormSchema>;
