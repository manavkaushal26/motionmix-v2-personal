"use client";

import Spinner from "@/components/global/Spinner";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const UserSignInForm = ({ callbackUrl }: Props) => {
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
          callbackUrl: callbackUrl,
        });
        if (response?.ok) {
          toast.success("Successful login confirmed. Welcome back!", {
            description: "Redirecting...",
          });
          router.push(response.url as string);
          router.refresh();
        } else {
          toast.error(response?.error || "Login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        autoComplete="off"
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
            "w-fit text-xs ml-auto hover:underline text-muted-foreground hover:text-foreground duration-200"
          )}
        >
          Forgot Password?
        </Link>
        <Button
          size="sm"
          type="submit"
          variant="secondary"
          disabled={isLoading}
          className="mt-4"
        >
          {isLoading ? <Spinner /> : "Sign In"}
        </Button>
        <p className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href={`/signup?callbackUrl=${callbackUrl}`}
            className="text-foreground hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default UserSignInForm;
