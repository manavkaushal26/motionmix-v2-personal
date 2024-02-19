"use client";

import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";

type Props = {
  type: "login" | "logout";
};

const AuthButton = ({ type }: Props) => {
  const pathname = usePathname();

  return type === "login" ? (
    <Link
      href={`/login?callbackUrl=${pathname}`}
      className={cn(buttonVariants())}
    >
      Login
    </Link>
  ) : (
    <Button onClick={() => signOut({ callbackUrl: "/" })}>Logout</Button>
  );
};

export default AuthButton;
