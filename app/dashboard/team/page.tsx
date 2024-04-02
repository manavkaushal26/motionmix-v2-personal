"use client";

import DeactivateUserForm from "@/components/forms/deactivate-user";
import InviteTeamMemberForm from "@/components/forms/invite-team-member-form";
import UpdateTeamMemberForm from "@/components/forms/update-team-member";
import CustomModal from "@/components/global/CustomModal";
import { DataTable } from "@/components/global/DataTable";
import FadeUp from "@/components/global/FadeUp";
import UserAvatar from "@/components/global/UserAvatar";
import { useModal } from "@/components/providers/ModalProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { TeamMember } from "@/lib/types";
import { cn, copyTextToClipboard, isAdmin } from "@/lib/utils";
import { api } from "@/services/api";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import {
  CheckCheck,
  CheckCircle,
  Copy,
  LucideIcon,
  MoreHorizontal,
  SquarePen,
  UserPlus,
  UserRoundMinus,
  UserRoundPlus,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
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
  const [activatingUser, setActivatingUser] = useState<boolean>(false);

  const ALLOWED_TEAM_MEMBERS = 3;

  const { setOpen } = useModal();

  const fetchTeamMembers = useCallback(async () => {
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
  }, []);

  const handleActivate = async (memberId: string) => {
    setActivatingUser(true);
    const loadingToast = toast.loading("Activating user...");
    try {
      const res = await api.activateUser(memberId);
      if (res.kind === "ok") {
        toast.success(res?.data?.message || res?.message || "Success");
        await fetchTeamMembers();
      } else {
        throw new Error(res?.data?.message || res?.message || "Failed");
      }
    } catch (error: any) {
      console.error(`Error activating user:`, error);
      toast.error(error?.message || `Failed to activate user`);
    } finally {
      setActivatingUser(false);
      toast.dismiss(loadingToast);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
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

            {/* <CBadge
                text="Not verified"
                variant="danger"
                size="sm"
                Icon={ShieldAlert}
              /> */}

            <CBadge
              text="Verified"
              variant="success"
              size="sm"
              Icon={CheckCheck}
            />
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
          <CBadge text="Not active" variant="danger" Icon={XCircle} />
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
        const member = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-sm">
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <SquarePen size={14} className="inline mr-2" />
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit member details</DialogTitle>
                    <DialogDescription>
                      Make changes to team profile here. Click save when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <UpdateTeamMemberForm teamMemberToEdit={member} />
                </DialogContent>
              </Dialog>
              <DropdownMenuItem
                onClick={async () => {
                  try {
                    await copyTextToClipboard(member._id as string);
                    toast.success("Member ID copied!");
                  } catch {
                    toast.error("Error while copying member id!");
                  }
                }}
              >
                <Copy size={14} className="inline mr-2" />
                Copy ID
              </DropdownMenuItem>
              {!isAdmin(member.role) ? (
                <>
                  <DropdownMenuSeparator />
                  {row.getValue("isActive") ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <UserRoundMinus size={14} className="inline mr-2" />
                          Deactivate
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            <div className="mt-5 space-y-4">
                              <p>
                                After deactivation, access to this account with
                                email{" "}
                                <span className="text-foreground">
                                  {member.email}
                                </span>{" "}
                                will be restricted.
                              </p>
                              <p>
                                To proceed with deactivation, please type{" "}
                                <code className="text-amber-500">
                                  deactivate
                                </code>{" "}
                                in the box below and click &apos;Confirm&apos;.
                              </p>
                              <DeactivateUserForm
                                memberId={member._id}
                                fetchTeamMembers={fetchTeamMembers}
                              />
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        handleActivate(member._id);
                      }}
                      disabled={activatingUser}
                    >
                      <UserRoundPlus size={14} className="inline mr-2" />
                      Activate
                    </DropdownMenuItem>
                  )}
                </>
              ) : null}
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
        <Button
          size="sm"
          onClick={() => {
            if (teamMembersData?.users?.length < ALLOWED_TEAM_MEMBERS) {
              setOpen(
                <CustomModal title="Add a team member">
                  <InviteTeamMemberForm fetchTeamMembers={fetchTeamMembers} />
                </CustomModal>
              );
            } else {
              toast.error("Unable to invite another team member!", {
                description: (
                  <>
                    The free plan allows for creating a team of up to{" "}
                    {ALLOWED_TEAM_MEMBERS} members. Upgrade to the{" "}
                    <Link
                      href="/#pricing"
                      className="text-foreground hover:underline"
                    >
                      PRO
                    </Link>{" "}
                    plan to add unlimited members to your team.
                  </>
                ),
              });
            }
          }}
        >
          <UserPlus size={16} className="mr-2" />
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
