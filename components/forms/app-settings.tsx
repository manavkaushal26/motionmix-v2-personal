"use client";

import { AppMeta } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type GeneralAppProps = { app: AppMeta };

const GeneralAppSchema = z.object({
  id: z.string(),
  secret: z.string(),
});

export const GeneralAppForm = ({ app }: GeneralAppProps) => {
  const [showSecret, setShowSecret] = useState<boolean>(false);

  const form = useForm<z.infer<typeof GeneralAppSchema>>({
    mode: "onChange",
    resolver: zodResolver(GeneralAppSchema),
    defaultValues: {
      id: app._id,
      secret: app.keys[0],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={() => {}} autoComplete="off" className="mt-8">
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
            <div className="pt-2">
              <h2 className="text-base font-semibold leading-7">
                SDK Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Find key information about the SDK implementation.
              </p>
            </div>

            <Card className="bg-[#161616] md:col-span-2">
              <CardContent className="p-6 grid grid-cols-1 gap-6 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-muted-foreground">
                          App ID
                        </FormLabel>
                        <FormControl>
                          <Input readOnly {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="sm:col-span-3">
                  <FormField
                    control={form.control}
                    name="secret"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-muted-foreground">
                          App Secret
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              readOnly
                              type={showSecret ? "text" : "password"}
                              {...field}
                            />
                            {showSecret ? (
                              <EyeOff
                                size={18}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground cursor-pointer"
                                onClick={() => setShowSecret(false)}
                              />
                            ) : (
                              <Eye
                                size={18}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground cursor-pointer"
                                onClick={() => setShowSecret(true)}
                              />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 pb-6 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 pt-2">
                Danger Zone
              </h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                This section contains actions that may have irreversible
                consequences.
              </p>
            </div>
            <Card className="bg-[#161616] md:col-span-2">
              <CardContent className="p-6">
                <div className="w-full flex items-center gap-x-4 justify-between">
                  <div>
                    <p className="block font-medium leading-6">Delete App?</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Deleting the app will permanently remove all associated
                      data.
                    </p>
                  </div>
                  <div>
                    <Button variant="destructive" className="gap-x-2">
                      <Trash size={16} />
                      <span>Delete</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};
