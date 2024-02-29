"use client";

import AppsDropdown from "@/components/dashboard/apps-dropdown";
import {
  sidebarAppsNavigationData,
  sidebarNavigationData,
} from "@/lib/mocks/dashboard";
import { SingleApp } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSelectedLayoutSegments } from "next/navigation";
import SidebarItem from "./SidebarItem";

type Props = {
  appsList: SingleApp[];
};

const DashboardSidebar = ({ appsList }: Props) => {
  const { appId = "" } = useParams();

  const segments = useSelectedLayoutSegments();
  const lastSegment = segments[segments.length - 1];

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#161616] px-6 py-4">
      <div className="flex h-16 shrink-0 items-center">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <div className="relative w-8 aspect-square">
              <Image src={"/assets/logo_icon.svg"} alt="MotionMix Logo" fill />
            </div>
            <p className="text-motionmix font-normal text-3xl">
              Motion<b>Mix</b>
            </p>
          </div>
        </Link>
      </div>
      <nav className="flex flex-1 flex-col ">
        <AppsDropdown
          lastSegment={lastSegment}
          appsList={appsList.map((app) => {
            return { label: app.name, value: app._id };
          })}
        />
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
        <ul role="list" className="mt-4">
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
    </div>
  );
};

export default DashboardSidebar;
