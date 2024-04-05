"use client";

import { generateRandomPassword } from "@/lib/utils";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenLine } from "lucide-react";
import { useState } from "react";
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
  oldPass: z.string().min(1, { message: "Current Password is required" }),
  newPass: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const ChangePasswordForm = (props: Props) => {
  const [allChecksPassed, setAllChecksPassed] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      oldPass: "",
      newPass: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    const updatingPass = toast.loading("Updating password...");
    try {
      const res = await api.updatePassword(values);
      toast.dismiss(updatingPass);
      if (res.kind === "ok") {
        toast.success(res?.data?.message || "Success! Password changed.");
        form.reset();
      } else {
        throw new Error(res?.data?.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Error! Password could not be changed.", {
        description: error?.message || "Something went wrong.",
      });
    }
  };

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
            name="oldPass"
            render={({ field }) => (
              <FormItem className="col-span-3">
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
            name="newPass"
            render={({ field }) => (
              <FormItem className="col-span-3">
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
                          form.setValue("newPass", pass);
                          toast.success(
                            "Generated a strong password for you!",
                            {
                              description:
                                "Make sure to save it securely for future sign-ins.",
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
                  // <PasswordStrength password={field.value} />
                  <PasswordStrength
                    password={field.value}
                    setAllChecksPassed={setAllChecksPassed}
                  />
                ) : null}
              </FormItem>
            )}
          />
          <Separator className="col-span-6" />
          <div className="col-span-6 flex items-center justify-end space-x-2">
            <Button
              size="sm"
              variant="secondary"
              type="button"
              onClick={() => form.reset()}
              disabled={
                isLoading ||
                (!form.getValues("oldPass") && !form.getValues("newPass"))
              }
            >
              Reset
            </Button>
            <Button
              size="sm"
              type="submit"
              variant="secondary"
              disabled={
                isLoading ||
                !allChecksPassed ||
                !form.getValues("oldPass") ||
                !form.getValues("newPass")
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
