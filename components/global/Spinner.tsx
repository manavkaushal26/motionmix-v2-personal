import { cn } from "@/lib/utils";

const Sizes = {
  sm: "w-3 h-3",
  md: "w-5 h-5",
  lg: "w-7 h-7",
};

const Spinner = ({
  size = "md",
  sx = "",
  center = true,
  text = "",
}: {
  size?: "sm" | "md" | "lg";
  sx?: string;
  center?: boolean;
  text?: string;
}) => {
  return (
    <div className={cn({ "text-center": center })}>
      <svg
        className={cn(
          "text-white animate-spin",
          { "mx-auto": center },
          Sizes[size],
          sx
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text ? (
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      ) : null}
    </div>
  );
};

export default Spinner;
