"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type Props = {};

const Notifications = (props: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" type="button" variant="outline">
          <span className="sr-only">View notifications</span>
          <Bell
            className="h-[1.2rem] w-[1.2rem] duration-200"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div>
          <h4 className="font-medium leading-none">Notifications</h4>
          <Separator className="mt-2 mb-4" />
          <div>
            <p className="text-muted-foreground">No new notifications.</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
