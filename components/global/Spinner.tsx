import { cn } from "@/lib/utils";
import { IconLoader2 } from "@tabler/icons-react";

const Sizes = {
  sm: "size-3",
  md: "size-5",
  lg: "size-7",
};

const Spinner = ({
  size = "md",
  text = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg";
  text?: string;
}) => {
  return (
    <div {...props}>
      <IconLoader2 className={cn("animate-spin", Sizes[size])} />
      {text ? (
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      ) : null}
    </div>
  );
};

export default Spinner;
