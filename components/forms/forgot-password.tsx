"use client";

import Spinner from "@/components/global/Spinner";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button, buttonVariants } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type Props = {};

const FormSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
});

const ForgotPasswordForm = (props: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const { email } = values;
      if (email) {
        const res: any = await api.getPasswordResetLink(values.email);
        if (res.kind === "ok") {
          toast.success("Reset link sent!", {
            description: "Check your email for a reset link.",
          });
          form.reset();
        } else {
          toast.error(res?.message || "Something went wrong!");
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
        <div className="mt-5 flex items-center justify-center space-x-2">
          <Link
            href="/signin?callbackUrl=/dashboard"
            className={cn(
              buttonVariants({ variant: "link", size: "sm" }),
              "text-muted-foreground hover:text-foreground duration-200"
            )}
          >
            Login
          </Link>
          <Button
            size="sm"
            type="submit"
            variant="secondary"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : null}
            <span className="ml-2">Request Link</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
