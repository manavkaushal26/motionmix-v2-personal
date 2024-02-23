import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

type MaxWidth = "sm" | "md" | "lg";

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
        { "max-w-screen-md": maxWidth === "sm" },
        { "max-w-screen-lg": maxWidth === "md" },
        { "max-w-screen-xl": maxWidth === "lg" },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
