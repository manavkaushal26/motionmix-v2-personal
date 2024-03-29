"use client";

import AppsDropdown from "@/components/dashboard/AppsDropdown";
import {
  sidebarAppsNavigationData,
  sidebarNavigationData,
} from "@/lib/mocks/dashboard";
import { AppMeta } from "@/lib/types";
import { LayoutTemplate } from "lucide-react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSelectedLayoutSegments } from "next/navigation";
import { useState } from "react";
import { Separator } from "../ui/separator";
import SidebarItem from "./SidebarItem";
import UserCard from "./UserCard";

type Props = {
  session: Session | null;
  appsList: AppMeta[];
};

const DashboardSidebar = ({ session, appsList }: Props) => {
  const { data: clientSession } = useSession();
  const { appId = "" } = useParams();
  const [selectedApp, setSelectedApp] = useState<string>(
    (appId as string) || appsList[0]?._id
  );

  const segments = useSelectedLayoutSegments();
  const lastSegment = segments[segments.length - 1];

  return (
    <aside className="flex grow flex-col gap-y-5 overflow-y-auto dark:bg-custom-zinc  px-6 py-4 shadow-md">
      <div className="flex h-10 shrink-0 items-center">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <div className="relative w-6 aspect-square">
              <Image src={"/assets/logo_icon.svg"} alt="MotionMix Logo" fill />
            </div>
            <p className="text-motionmix font-normal text-2xl">
              Motion<b>Mix</b>
            </p>
          </div>
        </Link>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul className="text-sm space-y-1">
          <SidebarItem
            item={{
              label: "Dashboard",
              href: "/dashboard",
              icon: LayoutTemplate,
            }}
            lastSegment={lastSegment}
          />
        </ul>
        <div className="mt-5 tracking-wider font-semibold text-sm text-muted-foreground/30">
          <p>Apps</p>
        </div>
        <Separator className="mt-2 mb-3" />
        <AppsDropdown
          appsList={appsList.map((app) => {
            return { label: app.name, value: app._id };
          })}
          selectedApp={selectedApp}
          setSelectedApp={setSelectedApp}
          session={session}
        />
        {appsList.length === 0 ? (
          <p className="text-sm text-muted-foreground mt-4 text-center">
            No apps found.
          </p>
        ) : null}
        {selectedApp ? (
          <ul className="text-sm space-y-1 mt-2">
            {sidebarAppsNavigationData?.map((item) => (
              <SidebarItem
                key={item.label}
                item={item}
                lastSegment={lastSegment}
                appId={selectedApp}
              />
            ))}
          </ul>
        ) : null}
        <div className="mt-5 tracking-wider font-semibold text-sm text-muted-foreground/30">
          <p>SDK</p>
        </div>
        <Separator className="my-2" />
        <ul role="list" className="text-sm space-y-1">
          {sidebarNavigationData?.map((item) => (
            <SidebarItem
              key={item.label}
              item={item}
              lastSegment={lastSegment}
            />
          ))}
        </ul>
      </nav>

      {/* USER CARD */}
      {/* TODO :: implement this with different logic -> update user data on backend */}
      <UserCard user={clientSession?.user || session!.user} />
    </aside>
  );
};

export default DashboardSidebar;
