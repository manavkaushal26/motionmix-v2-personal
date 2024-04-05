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
import { isAdmin } from "@/lib/utils";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Mail, User, UserSearch } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CardSpotlight from "../global/CardSpotlight";
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
import { Separator } from "../ui/separator";

type Props = { user: any };

const rolesOptions: any[] = Object.keys(Role)
  .filter((role) => role !== "Guest")
  .map((key) => ({
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
  email: z.string(),
  organization: z.string(),
  role: z.string(),
  orgRole: z.string(), // TODO :: Make this better
});

const UpdateMyDetailsForm = ({ user }: Props) => {
  const { data: session, update } = useSession();

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      organization: user?.organization,
      orgRole: user?.orgRole,
      role: user?.role,
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    // TODO :: Better logic implementation
    try {
      const res = await api.updateUserDetails({
        name: values.name.trim(),
        orgRole: values.orgRole.trim(),
        role: values.role,
      });
      if (res.kind === "ok") {
        update({
          name: values.name.trim(),
          orgRole: values.orgRole.trim(),
          role: values.role,
        });
        toast.success(res?.data?.message || "Your details are updated.");
      } else {
        throw new Error(
          res?.message || "Error! User details could not be updated."
        );
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Error! Something went wrong.");
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
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-3">
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
              <FormItem className="col-span-3">
                <FormLabel className="text-muted-foreground">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input Icon={Mail} placeholder="Email" readOnly {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel className="text-muted-foreground">
                  MotionMix Profile
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading || !isAdmin(session?.user?.role)}
                >
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
                {!isAdmin(session?.user?.role) ? (
                  <FormDescription className="text-xs flex items-center gap-x-1 text-amber-500">
                    <AlertTriangle size={12} /> Only admins or owners can update
                    profiles
                  </FormDescription>
                ) : null}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isLoading}
            control={form.control}
            name="orgRole"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel className="text-muted-foreground">
                  Organization Role
                </FormLabel>
                <FormControl>
                  <Input
                    Icon={UserSearch}
                    placeholder="Organization Role"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            disabled={isLoading}
            control={form.control}
            name="orgRole"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel className="text-muted-foreground">
                  Organization Role
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
          /> */}
          <Separator className="col-span-6" />
          <div className="col-span-6 flex items-center justify-end">
            <Button size="sm" variant="secondary" disabled={isLoading}>
              {isLoading ? <Spinner /> : null}
              {isLoading ? <span className="ml-2">Saving...</span> : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </CardSpotlight>
  );
};

export default UpdateMyDetailsForm;
