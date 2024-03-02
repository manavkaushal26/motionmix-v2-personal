import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

type MaxWidth = "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  maxWidth?: MaxWidth;
}

const MaxWidthWrapper = ({
  children,
  className = "",
  maxWidth = "lg",
  ...props
}: Props) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-xl px-2.5 md:px-20 min-h-fit",
        { "max-w-[32rem]": maxWidth === "2xs" },
        { "max-w-screen-sm": maxWidth === "xs" },
        { "max-w-screen-md": maxWidth === "sm" },
        { "max-w-screen-lg": maxWidth === "md" },
        { "max-w-screen-xl": maxWidth === "lg" },
        { "max-w-screen-2xl": maxWidth === "xl" },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
