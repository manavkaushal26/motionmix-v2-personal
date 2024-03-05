import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

type Props = {
  name: string;
  size?: Size;
  image?: string;
};

const getSize = (size: Size) => {
  switch (size) {
    case "sm":
      return "w-6 h-6 text-xs";
    case "md":
      return "w-8 h-8 text-sm";
    case "lg":
      return "w-10 h-10 text-base";
    default:
      break;
  }
};

const UserAvatar = ({ name, size = "md", image = "" }: Props) => {
  return (
    <Avatar className={cn(getSize(size))}>
      <AvatarImage src={image} alt={`team member image`} />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
