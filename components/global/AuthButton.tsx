"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";

type Props = {};

const AuthButton = ({}: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={`/login?callbackUrl=${pathname}`}
      className={cn(buttonVariants())}
    >
      Login
    </Link>
  );
};

export default AuthButton;
