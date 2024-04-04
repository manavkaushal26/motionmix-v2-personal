"use client";

import Spinner from "@/components/global/Spinner";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useModal } from "../providers/ModalProvider";
import { Button } from "../ui/button";
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
  name: z.string().min(1, { message: "App is required" }),
});

const CreateAppForm = (props: Props) => {
  const router = useRouter();
  const { setClose } = useModal();

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleDeactivate = async (values: z.infer<typeof FormSchema>) => {
    const { name } = values;

    try {
      const res = await api.createApp(name);
      if (res.kind !== "ok") throw new Error(res?.message);
      setClose();
      toast.success("New app created!");
      router.push(`/dashboard/app/${res?.data?._id}/sessions`);
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleDeactivate)}
        autoComplete="off"
        className="flex mt-4 flex-col gap-y-4"
      >
        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="Enter App Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage />
        <div className="mt-3 w-full flex items-center justify-end">
          <Button size="sm" type="submit" variant="secondary">
            {isLoading ? <Spinner /> : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateAppForm;
