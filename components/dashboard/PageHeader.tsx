import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  title: string | ReactNode;
  description?: string | ReactNode;
  Icon?: LucideIcon;
};

const PageHeader = ({ title, description, Icon }: Props) => {
  return (
    <div>
      <div className="flex items-center text-muted-foreground space-x-3 text-2xl font-semibold">
        {Icon ? <Icon size={24} /> : null}
        <h1>{title}</h1>
      </div>
      {description ? (
        <p className="text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
};

export default PageHeader;
