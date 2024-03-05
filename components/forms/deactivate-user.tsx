"use client";

import Spinner from "@/components/global/Spinner";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react";
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

type Props = { memberId: string; fetchTeamMembers: () => Promise<void> };

const FormSchema = z.object({
  value: z.string().min(1, { message: "This is required" }),
});

const DeactivateUserForm = ({ memberId, fetchTeamMembers }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      value: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleDeactivate = async (values: z.infer<typeof FormSchema>) => {
    const { value } = values;
    if (value !== "deactivate") {
      toast.error("Incorrect input!", {
        description: "Please check the entered value.",
      });
      return;
    }
    try {
      const res = await api.deactivateUser(memberId);
      if (res.kind === "ok") {
        toast.success(res.data.message || "Success");
        await fetchTeamMembers();
      } else {
        toast.error(res.data.message || "Failed");
      }
    } catch (error) {
      console.error(`Error deactivating user:`, error);
      toast.error(`Failed to deactivating user`);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleDeactivate)}
        autoComplete="off"
        className="flex flex-col gap-y-4"
      >
        <FormField
          disabled={isLoading}
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="Enter here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage />
        <div className="mt-3 w-full flex items-center justify-between">
          <div className="text-xs flex items-center space-x-1 text-amber-500">
            <AlertTriangle size={12} />
            <span>The action is reversible</span>
          </div>
          <div className="space-x-2">
            <Button size="sm" type="submit" variant="destructive">
              {isLoading ? <Spinner /> : "Confirm"}{" "}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default DeactivateUserForm;
