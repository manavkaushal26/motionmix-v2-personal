"use client";

import Spinner from "@/components/global/Spinner";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Building2, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useModal } from "../providers/ModalProvider";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type Props = { fetchTeamMembers: () => Promise<void> };

const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  orgRole: z.string().min(1, { message: "Organization role is required" }),
});

const InviteTeamMemberForm = ({ fetchTeamMembers }: Props) => {
  const { setClose } = useModal();
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      orgRole: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const { email } = values;
      if (email) {
        const res: any = await api.inviteTeamMember(values);
        if (res.kind === "ok") {
          toast.success("Invitation sent successfully!", {
            description:
              "Login details have been sent to the team member's email address.",
          });
          setClose();
          await fetchTeamMembers();
        } else {
          toast.error(res?.message || "Something went wrong!");
        }
      }
    } catch (error: any) {
      console.error("An error occurred during login:", error);
      toast.error(
        error?.message || "Please check console... something went wrong!"
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        autoComplete="off"
        className="mt-4 flex flex-col gap-y-4"
      >
        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
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
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input Icon={Mail} placeholder="Email" {...field} />
              </FormControl>
              <FormDescription className="text-xs flex items-center gap-x-1 text-amber-500">
                <AlertTriangle size={12} /> Email address must not be linked to
                any other organization.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="orgRole"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  Icon={Building2}
                  placeholder="Organization Role"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-5 flex items-center justify-end space-x-2">
          <Button
            size="sm"
            type="button"
            variant="ghost"
            disabled={isLoading}
            onClick={() => {
              setClose();
            }}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            type="submit"
            variant="secondary"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Invite"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InviteTeamMemberForm;
