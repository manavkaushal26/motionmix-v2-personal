"use client";

import Spinner from "@/components/global/Spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrganizationRoles, Role } from "@/lib/enums";
import { TeamMember } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type Props = { teamMemberToEdit: TeamMember | null };

const rolesOptions: any[] = Object.keys(Role).map((key) => ({
  value: Role[key as keyof typeof Role],
  label: Role[key as keyof typeof Role],
}));
// Convert enum to organization roles object
const orgRolesOptions: any[] = Object.keys(OrganizationRoles).map((key) => ({
  value: OrganizationRoles[key as keyof typeof OrganizationRoles],
  label: OrganizationRoles[key as keyof typeof OrganizationRoles],
}));
const orgRolesValuesArray = orgRolesOptions.map((option) => option.value) as [
  string,
  ...string[]
];

const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Password is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  orgRole: z.string().min(1, { message: "orgRole is required" }),
});

const UpdateTeamMemberForm = ({ teamMemberToEdit }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: teamMemberToEdit?.name,
      email: teamMemberToEdit?.email,
      role: teamMemberToEdit?.role,
      orgRole: teamMemberToEdit?.orgRole || "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        autoComplete="off"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4"
      >
        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-muted-foreground">Name</FormLabel>
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
            <FormItem className="md:col-span-2">
              <FormLabel className="text-muted-foreground">Email</FormLabel>
              <FormControl>
                <Input Icon={Mail} placeholder="email" {...field} readOnly />
              </FormControl>
              <FormDescription className="text-xs flex items-center gap-x-1 text-amber-500">
                <AlertTriangle size={12} /> Email cannot be changed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">
                MotionMix Profile
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {rolesOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="capitalize"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <FormLabel className="text-muted-foreground">
                Organization Role
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Organization Role" />
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
        <div className="w-full md:col-span-2 flex items-center gap-x-4">
          {/* <Button
            size="sm"
            type="button"
            variant="ghost"
            disabled={isLoading}
            className="mt-4 w-full"
          >
            Cancel
          </Button> */}
          <Button
            size="sm"
            type="submit"
            variant="secondary"
            disabled={isLoading}
            className="mt-4 w-full"
          >
            {isLoading ? <Spinner /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateTeamMemberForm;
