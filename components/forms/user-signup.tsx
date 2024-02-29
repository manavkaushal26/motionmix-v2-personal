"use client";


import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const UserSignUpForm = ({ callbackUrl }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const { email, password } = values;
      if (email && password) {
        const response = await signIn<"credentials">("user-login", {
          email,
          password,
          redirect: false,
          callbackUrl: "/",
        });
        if (response?.ok) {
          toast.success("Successful login confirmed. Welcome back.");
          router.push(response.url as string);
          router.refresh();
        } else {
          toast.error(response?.error || "Login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      // toast.error("Unable to verify login details. Please try again later.");
    }
  };

  return (
    
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-y-4"
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
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
              name="password"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="password"
                      Icon={Key}
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href="/forgot-password"
              className={cn(
                "w-fit text-sm ml-auto hover:underline text-muted-foreground hover:text-foreground duration-200"
              )}
            >
              Forgot Password?
            </Link>
            <Button
              size="sm"
              variant="secondary"
              type="submit"
              disabled={isLoading}
              className="w-full mt-5"
            >
              {isLoading ? <Spinner /> : "Sign In"}
            </Button>
            <p className="mt-2 text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link
                href={`/signin?callbackUrl=${callbackUrl}`}
                className="text-foreground hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </Form>
      
  );
};

export default UserSignUpForm;
