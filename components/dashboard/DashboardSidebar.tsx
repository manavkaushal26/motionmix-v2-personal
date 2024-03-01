"use client";

import AppsDropdown from "@/components/dashboard/AppsDropdown";
import {
  sidebarAppsNavigationData,
  sidebarNavigationData,
} from "@/lib/mocks/dashboard";
import { AppMeta } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSelectedLayoutSegments } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import SidebarItem from "./SidebarItem";

type Props = {
  appsList: AppMeta[];
};

const DashboardSidebar = ({ appsList }: Props) => {
  const { appId = "" } = useParams();

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
        <AppsDropdown
          lastSegment={lastSegment}
          appsList={appsList.map((app) => {
            return { label: app.name, value: app._id };
          })}
        />

        {appId ? (
          <ul className="mt-4">
            {sidebarAppsNavigationData?.map((item) => (
              <SidebarItem
                key={item.label}
                item={item}
                lastSegment={lastSegment}
                appId={appId as string}
              />
            ))}
          </ul>
        ) : null}

        <div className="mt-5 tracking-wider font-semibold text-sm text-muted-foreground/25">
          <p>Documentation</p>
        </div>
        <Separator className="my-2" />
        <ul role="list">
          {sidebarNavigationData?.map((item) => (
            <SidebarItem
              key={item.label}
              item={item}
              lastSegment={lastSegment}
              appId={appId as string}
            />
          ))}
        </ul>
      </nav>
      {appId ? (
        <Link
          href={`/dashboard/app/${appId}/settings`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            {
              "text-muted-foreground hover:text-foreground":
                lastSegment === "settings",
            },
            "duration-200"
          )}
        >
          <Settings size={18} className="mr-2" /> Settings
        </Link>
      ) : null}
    </aside>
  );
};

export default DashboardSidebar;
