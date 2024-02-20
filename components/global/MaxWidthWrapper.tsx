import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type MaxWidth = "sm" | "md" | "lg";

type Props = {
  children: ReactNode;
  className?: string;
  maxWidth?: MaxWidth;
};

const MaxWidthWrapper = ({
  children,
  className = "",
  maxWidth = "lg",
}: Props) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-xl px-2.5 md:px-20 h-full",
        { "max-w-screen-md": maxWidth === "sm" },
        { "max-w-screen-lg": maxWidth === "md" },
        { "max-w-screen-xl": maxWidth === "lg" },
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
