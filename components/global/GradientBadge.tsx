import { ReactNode } from "react";

type Props = {
  variant: "shining" | "normal";
  children: ReactNode;
};

const GradientBadge = ({ variant, children }: Props) => {
  if (variant === "normal")
    return (
      <div className="inline-flex cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950 px-3 py-1 text-sm font-medium text-zinc-800 dark:text-zinc-400 backdrop-blur-3xl">
        <div className="flex items-center space-x-2">{children}</div>
      </div>
    );

  return (
    <div className="inline-flex animate-background-shine cursor-pointer items-center justify-center rounded-full border border-gray-800 bg-[linear-gradient(110deg,#000,45%,#4D4B4B,55%,#000)] bg-[length:250%_100%] px-3 py-1 text-sm font-medium text-gray-400">
      <div className="flex items-center space-x-2">{children}</div>
    </div>
  );
};

export default GradientBadge;
