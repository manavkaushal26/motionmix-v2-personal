"use client";

import Spinner from "@/components/global/Spinner";
import { generateRandomPassword } from "@/lib/utils";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PasswordInput from "../global/PasswordInput";
import PasswordStrength from "../global/PasswordStrength";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

type Props = { userId: string; code: string };

const FormSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const ResetPasswordForm = ({ userId, code }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const { password } = values;
      const res = await api.verifyCode({
        userId,
        code,
        password,
      });
      if (res.kind === "ok") {
        toast.success("Password updated!", {
          description: "Redirecting...",
        });
        setTimeout(() => router.push(`/signin?callbackUrl=/dashboard`), 2000);
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("An error occurred during signin:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <FormField
          disabled={isLoading}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="w-full relative">
                  <PasswordInput
                    type="password"
                    placeholder="Enter New Password"
                    {...field}
                  />
                  <div
                    className="absolute right-6 top-1/2 -translate-y-1/2"
                    title="Generate Password"
                  >
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className="absolute top-1/2 right-[15px] -translate-y-1/2 text-muted-foreground hover:text-foreground rounded-none"
                      onClick={() => {
                        const pass = generateRandomPassword();
                        form.setValue("password", pass);
                        toast.success("Generated a random password for you!", {
                          description:
                            "To prevent loss during form submission, securely copy the generated password.",
                        });
                      }}
                    >
                      <Wand2 size={16} aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </FormControl>
              {field.value ? <PasswordStrength password={field.value} /> : null}
            </FormItem>
          )}
        />
        <div className="mt-8 flex items-center justify-center">
          <Button
            size="sm"
            className="w-full"
            variant="secondary"
            type="submit"
            disabled={isLoading || !form.getValues("password")}
          >
            {isLoading ? <Spinner /> : null}
            <span className="ml-2">Reset Password</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
