"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

type Props = {
  appsList: { label: string; value: string }[];
  selectedApp: string;
  setSelectedApp: Dispatch<SetStateAction<string>>;
};

const AppsDropdown = ({ appsList, selectedApp, setSelectedApp }: Props) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", {
            "text-zinc-500 hover:text-zinc-500": !selectedApp,
          })}
        >
          {selectedApp
            ? appsList.find((app) => app.value === selectedApp)?.label
            : "Select App"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <CommandInput
              placeholder={`Search from ${appsList?.length} apps`}
            />
            <CommandEmpty>No app found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value={""}
                onSelect={(currentValue) => {
                  toast.success("App created");
                  setOpen(false);
                }}
                className="cursor-pointer hover:bg-muted"
              >
                <Plus size={16} />
                <span className="ml-2">Create an App</span>
              </CommandItem>
            </CommandGroup>
            <CommandGroup className="no-scrollbar">
              {appsList.map((app) => (
                <CommandItem
                  key={app.label}
                  value={app.value}
                  onSelect={(currentValue) => {
                    setSelectedApp(
                      currentValue === selectedApp ? "" : currentValue
                    );
                    setOpen(false);
                    router.push(`/dashboard/app/${currentValue}/sessions`);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedApp === app.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {app.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AppsDropdown;
