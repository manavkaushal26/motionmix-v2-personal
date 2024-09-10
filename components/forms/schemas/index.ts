import { OrganizationRoles } from "@/lib/enums";
import * as z from "zod";

// Convert enum to organization roles object
export const orgRolesOptions: any[] = Object.keys(OrganizationRoles).map(
  (key) => ({
    value: OrganizationRoles[key as keyof typeof OrganizationRoles],
    label: OrganizationRoles[key as keyof typeof OrganizationRoles],
  })
);
export const orgRolesValuesArray = orgRolesOptions.map(
  (option) => option.value
) as [string, ...string[]];

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
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  organizationName: z
    .string()
    .min(1, { message: "Organization name is required" }),
  orgRole: z.enum(orgRolesValuesArray),
});
export type SignUpDataSchema = z.infer<typeof SignUpSchema>;

export const VerificationFormSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 digits" })
    .regex(/^\d{6}$/, { message: "OTP must be a numeric value" }),
});
export type VerificationDataSchema = z.infer<typeof VerificationFormSchema>;
