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
  ChevronsUpDown,
  Compass,
  CreditCard,
  LogOut,
  User,
  Users,
} from "lucide-react";
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
            <Compass />
            <div className="flex flex-col capitalize">
              {user.name}{" "}
              <span className="text-muted-foreground capitalize max-w-[165px] pr-5 truncate">
                {user.orgRole}
              </span>
            </div>
          </div>
          <div>
            <ChevronsUpDown size={16} className="text-muted-foreground" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-muted-foreground">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          {isAdmin(user.role) ? (
            <DropdownMenuItem disabled>
              <CreditCard className="mr-2 h-4 w-4" />
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
                  <Users className="mr-2 h-4 w-4" />
                  <span>Team</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        ) : null}
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserCard;
