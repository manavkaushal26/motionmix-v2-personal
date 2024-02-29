import {
  Download,
  FileText,
  LineChart,
  LucideIcon,
  ShieldAlert,
  Tv2,
} from "lucide-react";

export type SidebarNavItem = {
  label: string;
  identifier: string;
  icon: LucideIcon | null;
  defaultOpen: boolean;
  groupTitle: boolean;
  newTab: boolean;
  children: {
    label: string;
    identifier: string;
    icon: LucideIcon;
  }[];
  href: string;
};

export const sidebarAppsNavigationData: Partial<SidebarNavItem>[] = [
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

export const sidebarNavigationData: Partial<SidebarNavItem>[] = [
  // {
  //   label: "Documentation",
  //   groupTitle: true,
  // },
  {
    label: "Docs",
    href: "https://docs.motionmix.ai/sdk-documentation",
    icon: FileText,
    newTab: true,
    identifier: "",
  },
  // {
  //   label: "Changelog",
  //   identifier: "changelogs",
  //   icon: Replace,
  // },
  {
    label: "Download",
    identifier: "download",
    icon: Download,
  },
];

export const sdkReleases = [
  {
    version: "34.0.5",
    date: "October 2023",
    changes: [
      {
        subTitle: "adb",
        desc: [
          "adb now defaults to libusb on macOS to address issue #270205252.",
          "Previously, adb responded with a successful code when wireless pairing fails. Resolved this by returning a failure code (1) and user-facing error (error: protocol fault (couldn't read status message...)). echo $? now reports 1.",
          "adb wait-for-disconnect is now operational for non-USB (wireless debugging).",
          "Added new DbC interface for future support of ChromeOS over adb.",
        ],
      },
      {
        subTitle: "fastboot",
        desc: ["Fixed flashall on Pixel 3 devices."],
      },
    ],
  },
  {
    version: "34.0.4",
    date: "July 2023",
    changes: [
      {
        subTitle: "adb",
        desc: [
          "Propagate -a (gListenAll) when adb forks an adb host server (previously, the flag only worked for adb -a server nodaemon)",
          "Faster root and unroot",
          "Reland Flag(env) guarding clear endpoint (device) feature for OSX usb start. (issue #270205252).",
        ],
      },
      {
        subTitle: "fastboot",
        desc: [
          "Mac: remove retries on invalid IO iterator (flashing failure with LIBUSB_TRANSFER_CANCELLED)",
          'Windows: fix "Sparse file is too large or invalid" when using "flashall"',
          'All platforms: fix "ANDROID_PRODUCT_OUT not set" when using "update"',
        ],
      },
    ],
  },
  {
    version: "34.0.1",
    date: "March 2023",
    changes: [
      {
        subTitle: "adb",
        desc: [
          'macOS: Reverted "unstable connectivity (MacBook high speed cable)" resolution due to adb install hang (issue #270205252).',
        ],
      },
      {
        subTitle: "fastboot",
        desc: [
          'Windows: Fixed "mke2fs: Illegal or malformed device name while trying to determine filesystem size" error introduced in Platform tools 34.0.0 (issue #271039230).',
        ],
      },
    ],
  },
];
