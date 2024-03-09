"use client";

import Spinner from "@/components/global/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

type Props = {};

const FormSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
});

const NewsletterSubscriptionForm = (props: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleSubmit = (e: any) => {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbzRvh1O5wiQhWhwQ1fXkRFnHDQGzjMJY16-sUMjTF6lgwP89Rk5zB2yxIuPdwPSePo9iQ/exec";

    // @ts-ignore
    const form = document.forms["google-sheet"];

    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => toast.success("Your email has been saved!"))
      .catch((error) => console.error("Error!", error.message))
      .finally(() => {
        form.reset();
      });
  };

  return (
    <div className="mt-4 sm:flex sm:max-w-lg lg:mt-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          autoComplete="off"
          className="w-full flex items-center space-x-2"
        >
          <FormField
            disabled={isLoading}
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    Icon={Mail}
                    placeholder="Enter Your Email"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="secondary"
            disabled={isLoading || !form.getValues("email")}
          >
            {isLoading ? <Spinner /> : "Subscribe"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewsletterSubscriptionForm;
