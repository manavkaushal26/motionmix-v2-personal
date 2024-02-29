"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

type Props = {};

export type Sort = "createdAt" | "-createdAt";

const sortOptions = [
  { label: "Date, new to old", value: "-createdAt" },
  { label: "Date, old to new", value: "createdAt" },
];

const SessionsFilters = (props: Props) => {
  const [sortValue, setSortValue] = useState(sortOptions[0].value);

  // useEffect(() => {
  //   fetchAllSessionByAppId(appId,token,);
  // }, [sortValue]);

  return (
    <div className="flex items-center space-x-2">
      <Label className="text-muted-foreground text-sm">Sort By:</Label>
      <Select
        value={sortValue}
        onValueChange={(e: Sort) => {
          setSortValue(e);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SessionsFilters;
