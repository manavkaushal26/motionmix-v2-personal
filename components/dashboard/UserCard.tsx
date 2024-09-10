"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { isAdmin } from "@/lib/utils";
import {
  IconCompass,
  IconCreditCard,
  IconLogout,
  IconSelector,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

type Props = { user: any };

const UserCard = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full my-4 flex items-center justify-between py-8"
        >
          <div className="flex items-center text-left gap-2">
            <IconCompass />
            <div className="flex flex-col capitalize">
              {user.name}{" "}
              <span className="text-muted-foreground capitalize max-w-[165px] pr-5 truncate">
                {user.orgRole}
              </span>
            </div>
          </div>
          <div>
            <IconSelector size={16} className="text-muted-foreground" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-muted-foreground">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard/profile">
            <DropdownMenuItem>
              <IconUser className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          {isAdmin(user.role) ? (
            <DropdownMenuItem disabled>
              <IconCreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {isAdmin(user.role) ? (
          <>
            <DropdownMenuGroup>
              <Link href="/dashboard/team">
                <DropdownMenuItem>
                  <IconUsers className="mr-2 h-4 w-4" />
                  <span>Team</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        ) : null}
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          <IconLogout className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserCard;
