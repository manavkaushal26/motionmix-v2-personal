"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { orgRolesOptions, SignUpSchema } from "./schemas";

type Props = { callbackUrl: string };

const UserSignUpForm = ({ callbackUrl }: Props) => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      organizationName: "",
      orgRole: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    setError("");
    const { name, email, password, organizationName, orgRole } = values;

    try {
      const userDataToSend = {
        name,
        email,
        password,
        organizationName,
        orgRole,
      };
      const response: any = await api.signupUser(userDataToSend);

      if (response.kind === "ok") {
        setSuccess("Account created! Redirecting to Sign In...");
        setTimeout(() => {
          setTimeout(() => {
            router.push("/signin");
          }, 1500);
        }, 1000);
      } else {
        setError(
          response?.data?.message ||
            "Unable to perform action. Please try again later."
        );
      }
    } catch (error) {
      console.error("An error occurred during sign in:", error);
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
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
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
