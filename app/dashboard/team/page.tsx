"use client";

import { DataTable } from "@/components/global/DataTable";
import FadeUp from "@/components/global/FadeUp";
import UserAvatar from "@/components/global/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { TeamMember } from "@/lib/types";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import {
  CheckCheck,
  CheckCircle,
  LucideIcon,
  MoreHorizontal,
  ShieldAlert,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {};

const CBadge = ({
  text,
  variant,
  Icon,
  size = "default",
}: {
  text: string;
  variant: "danger" | "success";
  Icon: LucideIcon;
  size?: "sm" | "default";
}) => {
  return (
    <div
      className={cn("mt-1 flex items-center text-base space-x-1 opacity-75", {
        "text-rose-400": variant === "danger",
        "text-emerald-400": variant === "success",
        "text-xs": size === "sm",
      })}
    >
      <Icon size={12} />
      <span>{text}</span>
    </div>
  );
};

const TeamsPage = (props: Props) => {
  const [fetchingTeamMembers, setFetchingTeamMembers] =
    useState<boolean>(false);
  const [teamMembersData, setTeamMembersData] = useState<{
    users: Array<TeamMember>;
  }>({ users: [] });

  useEffect(() => {
    (async () => {
      setFetchingTeamMembers(true);
      try {
        const res = await api.fetchOrganizationTeam();
        if (res.kind === "ok") {
          setTeamMembersData(res.data);
        } else {
          toast.error(res?.message || "Failed to fetch users");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching users");
      } finally {
        setFetchingTeamMembers(false);
      }
    })();
  }, []);

  const columns: ColumnDef<TeamMember>[] = [
    {
      accessorKey: "name",
      header: "Team Member",
      size: 250,
      cell: ({ row }) => {
        return (
          <div className="flex items-center space-x-2">
            <UserAvatar name={row.getValue("name")} />
            <div>
              <p className="capitalize">{row.getValue("name")}</p>
              <p className="capitalize text-muted-foreground text-xs">
                {row.original.role}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email Address",
      cell: ({ row }) => {
        return (
          <div>
            <p>{row.getValue("email")}</p>
            {row.index === 1 ? (
              <CBadge
                text="Not verified"
                variant="danger"
                size="sm"
                Icon={ShieldAlert}
              />
            ) : (
              <CBadge
                text="Verified"
                variant="success"
                size="sm"
                Icon={CheckCheck}
              />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "orgRole",
      header: "Organization Role",
      cell: ({ row }) => {
        return <p className="capitalize">{row.getValue("orgRole")}</p>;
      },
    },
    {
      accessorKey: "isActive",
      header: "Active Status",
      cell: ({ row }) => {
        return row.getValue("isActive") ? (
          <CBadge text="Active" variant="success" Icon={CheckCircle} />
        ) : (
          <CBadge text="Not verified" variant="danger" Icon={XCircle} />
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Joined",
      cell: ({ row }) => {
        const date = dayjs(row.getValue("createdAt")).format("DD MMM, YYYY");
        const time = dayjs(row.getValue("createdAt")).format("hh:mm a");
        return (
          <>
            <p>{date}</p>
            <p className="text-sm text-muted-foreground">{time}</p>
          </>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      size: 100,
      enableHiding: false,
      cell: ({ row }) => {
        const teamMember = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View teamMember details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <FadeUp>
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">My Team</h1>
        </div>
        <Button>
          <span>Invite Member</span>
        </Button>
      </section>
      <Separator className="mt-4 mb-6" />
      <section>
        <DataTable
          columns={columns}
          data={teamMembersData?.users}
          loading={fetchingTeamMembers}
        />
      </section>
    </FadeUp>
  );
};

export default TeamsPage;
