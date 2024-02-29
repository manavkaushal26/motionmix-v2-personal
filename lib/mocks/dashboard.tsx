import {
  Calendar,
  Download,
  FileText,
  LineChart,
  LucideIcon,
  Replace,
  ShieldAlert,
  Tv2,
} from "lucide-react";

export type SidebarNavItem = {
  label: string;
  identifier: string;
  icon: LucideIcon | null;
  defaultOpen?: boolean;
  groupTitle?: boolean;
  newTab?: boolean;
  children?: {
    label: string;
    identifier: string;
    icon: LucideIcon;
  }[];
  href?: string;
};

export const sidebarAppsNavigationData: SidebarNavItem[] = [
  {
    label: "Sessions",
    identifier: "sessions",
    icon: Tv2,
  },
  {
    label: "Analytics",
    identifier: "analytics",
    icon: LineChart,
    defaultOpen: true,
    groupTitle: false,
    children: [
      // {
      //   label: "Events",
      //   identifier: `events`,
      //   icon: Calendar,
      // },
      {
        label: "Errors",
        identifier: "errors",
        icon: ShieldAlert,
      },
    ],
  },
];

export const sidebarNavigationData = [
  {
    label: "Documentation",
    groupTitle: true,
  },
  {
    label: "Docs",
    path: "https://docs.motionmix.ai/sdk-documentation",
    icon: FileText,
    newTab: true,
  },
  {
    label: "Changelog",
    identifier: "changelogs",
    icon: Replace,
  },
  {
    label: "Download",
    identifier: "download",
    icon: Download,
  },
];
