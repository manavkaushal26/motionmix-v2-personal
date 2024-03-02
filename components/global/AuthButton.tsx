"use client";

import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, ButtonProps, buttonVariants } from "../ui/button";

interface Props extends ButtonProps {
  authType: "signIn" | "signOut";
}

const AuthButton = ({ authType, ...props }: Props) => {
  const pathname = usePathname();
  const { size = "default", variant = "default", className = "" } = props;

  return authType === "signIn" ? (
    <Link
      href={`/signin?callbackUrl=${pathname}`}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      Sign In
    </Link>
  ) : (
    <Button
      onClick={() => signOut({ callbackUrl: "/" })}
      className={cn(className)}
    >
      Sign Out
    </Button>
  );
};

export default AuthButton;
