"use client";

import { generateRandomPassword } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenLine } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CardSpotlight from "../global/CardSpotlight";
import PasswordInput from "../global/PasswordInput";
import PasswordStrength from "../global/PasswordStrength";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Separator } from "../ui/separator";

type Props = {};

const FormSchema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: "Current Password is required" }),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const ChangePasswordForm = (props: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {};

  return (
    <CardSpotlight cursorEffect={false} className="md:col-span-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          autoComplete="off"
          className="p-6 grid grid-cols-1 gap-4 sm:grid-cols-6"
        >
          <FormField
            disabled={isLoading}
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="col-span-3">
                {/* <FormLabel className="text-muted-foreground">
                  Enter Current Password
                </FormLabel> */}
                <FormControl>
                  <PasswordInput
                    type="password"
                    placeholder="Current Password"
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
            name="newPassword"
            render={({ field }) => (
              <FormItem className="col-span-3">
                {/* <FormLabel className="text-muted-foreground">
                  Enter New Password
                </FormLabel> */}
                <FormControl>
                  <div className="w-full relative">
                    <PasswordInput
                      type="password"
                      placeholder="New Password"
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
                          form.setValue("newPassword", pass);
                          toast.success(
                            "Generated a random password for you!",
                            {
                              description:
                                "To prevent loss during form submission, securely copy the generated password.",
                            }
                          );
                        }}
                      >
                        <PenLine size={16} aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </FormControl>
                {/* <FormMessage /> */}
                {field.value ? (
                  <PasswordStrength password={field.value} />
                ) : null}
              </FormItem>
            )}
          />
          <Separator className="col-span-6" />
          <div className="col-span-6 flex items-center justify-end">
            <Button
              size="sm"
              type="submit"
              variant="secondary"
              disabled={
                isLoading ||
                !form.getValues("currentPassword") ||
                !form.getValues("newPassword")
              }
            >
              Update
            </Button>
          </div>
        </form>
      </Form>
    </CardSpotlight>
  );
};

export default ChangePasswordForm;
