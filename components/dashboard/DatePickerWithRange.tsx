"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { Calendar as CalendarIcon } from "lucide-react";
import { HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Separator } from "../ui/separator";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const FormSchema = z.object({
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

const DatePickerWithRange = ({ className }: Props) => {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: {
        from: dayjs().subtract(7, "days").toDate(),
        to: dayjs().toDate(),
      },
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    setCalendarOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className={cn("grid gap-2", className)}>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {dayjs(field.value.from).format("MMM DD, YYYY")} -{" "}
                            {dayjs(field.value.to).format("MMM DD, YYYY")}
                          </>
                        ) : (
                          dayjs(field.value.from).format("MMM DD, YYYY")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value?.from}
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                      disabled={{ after: dayjs().toDate() }}
                    />
                    <Separator />
                    <div className="p-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        type="submit"
                        onClick={form.handleSubmit(onSubmit)}
                        className="col-span-2"
                      >
                        Submit
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default DatePickerWithRange;
