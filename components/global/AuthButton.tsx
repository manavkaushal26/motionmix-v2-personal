"use client";

import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";

type Size = "default" | "sm" | "lg" | "icon";

type Props = {
  type: "login" | "logout";
  size?: Size;
  className?: string;
};

const AuthButton = ({ type, size = "default", className = "" }: Props) => {
  const pathname = usePathname();

  return type === "login" ? (
    <Link
      href={`/login?callbackUrl=${pathname}`}
      className={cn(buttonVariants({ size }), className)}
    >
      Login
    </Link>
  ) : (
    <Button
      onClick={() => signOut({ callbackUrl: "/" })}
      className={cn(className)}
    >
      Logout
    </Button>
  );
};

export default AuthButton;
