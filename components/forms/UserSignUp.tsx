"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrganizationRoles } from "@/lib/enums";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PasswordInput from "../global/PasswordInput";
import Spinner from "../global/Spinner";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type Props = { callbackUrl: string };

// Convert enum to organization roles object
const orgRolesOptions: any[] = Object.keys(OrganizationRoles).map((key) => ({
  value: OrganizationRoles[key as keyof typeof OrganizationRoles],
  label: OrganizationRoles[key as keyof typeof OrganizationRoles],
}));
const orgRolesValuesArray = orgRolesOptions.map((option) => option.value) as [
  string,
  ...string[]
];

const FormSchema = z.object({
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

const UserSignUpForm = ({ callbackUrl }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      organizationName: "",
      orgRole: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const userDataToSend = {
        name: values.name,
        email: values.email,
        password: values.password,
        organizationName: values.organizationName,
        orgRole: values.orgRole,
      };
      const response: any = await api.signupUser(userDataToSend);

      if (response.kind === "ok") {
        toast.success("User signup complete!", {
          description: "Redirecting you to sign in page...",
        });
        setTimeout(() => {
          router.push(
            `/signin?callbackUrl=${
              searchParams.get("callbackUrl") || "/dashboard"
            }&firstSignIn=true`
          );
          router.refresh();
        }, 1000);
      } else {
        toast.error(response?.message || "Sign in failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred during sign in:", error);
      // toast.error("Unable to verify login details. Please try again later.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-2 gap-4"
        autoComplete="off"
      >
        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormControl>
                <Input Icon={Mail} placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormControl>
                <Input Icon={User} placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormControl>
                <PasswordInput
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="organizationName"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input Icon={Building2} placeholder="Company" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="orgRole"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {orgRolesOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2">
          <Button
            size="sm"
            variant="secondary"
            type="submit"
            disabled={isLoading}
            className="w-full mt-5"
          >
            {isLoading ? <Spinner /> : "Sign Up"}
          </Button>
          <p className="mt-4 text-sm text-center text-muted-foreground">
            Already have an account?{"  "}
            <Link
              href={`/signin?callbackUrl=${callbackUrl}`}
              className="text-foreground hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default UserSignUpForm;
