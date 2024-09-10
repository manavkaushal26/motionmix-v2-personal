"use client";

import Spinner from "@/components/global/Spinner";
import { signIn } from "@/lib/actions/auth-actions";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PasswordInput from "../global/PasswordInput";
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
import { SignInSchema } from "./schemas";

type Props = { callbackUrl: string };

const FormSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const UserSignInForm = ({ callbackUrl }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof SignInSchema>) => {
    setError("");

    startTransition(() => {
      signIn(values).then((data: any) => {
        setError(data?.error);
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        autoComplete="off"
        className="flex flex-col gap-y-4"
      >
        <FormField
          disabled={isPending}
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
          disabled={isPending}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex-1">
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
        <Link
          href="/forgot-password"
          className={cn(
            "w-fit text-xs ml-auto hover:underline text-muted-foreground hover:text-foreground duration-200"
          )}
        >
          Forgot Password?
        </Link>
        <FormError message={error} />
        {/* <FormSuccess message={success} /> */}
        <Button
          size="sm"
          type="submit"
          variant="secondary"
          disabled={isPending}
          className="mt-4"
        >
          {isPending ? <Spinner /> : "Sign In"}
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
