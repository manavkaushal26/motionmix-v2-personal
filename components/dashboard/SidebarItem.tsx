"use client";

import { SidebarNavItem } from "@/lib/mocks/dashboard";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  item: Partial<SidebarNavItem>;
  appId: string;
  lastSegment: string;
};

const SidebarItem = ({ item, lastSegment, appId }: Props) => {
  const [isSubMenuOpen, setSubMenuOpen] = useState(item?.defaultOpen || false);

  // const buildUrlWithQueryParams = (
  //   url: string,
  //   searchParams?: ParsedUrlQuery
  // ) => {
  //   const currentQueryParams = { appId: rest.appId, ...searchParams };

  //   // Remove any undefined or null values
  //   Object.keys(currentQueryParams).forEach(
  //     (key) => currentQueryParams[key] == null && delete currentQueryParams[key]
  //   );

  //   const queryString = new URLSearchParams(
  //     currentQueryParams as any
  //   ).toString();
  //   return queryString ? `${url}?${queryString}` : url;
  // };

  const toggleSubMenu = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };

  const baseNavigationItemClass =
    "flex items-center duration-200 rounded-md text-muted-foreground";

  // if (item.groupTitle) {
  //   return (
  //     <div className="my-4 tracking-wider font-semibold text-muted-foreground/50">
  //       <p>{item.label}</p>
  //     </div>
  //   );
  // }

  return (
    <li className="mb-1">
      <div className={cn(baseNavigationItemClass, "mb-1")}>
        <Link
          href={
            item.href ? item.href : `/dashboard/app/${appId}/${item.identifier}`
          }
          target={item.href ? "_blank" : "_self"}
          className="w-full"
        >
          <p
            className={cn(
              "flex items-center w-full px-2.5 rounded-md py-2 space-x-2 duration-200",
              lastSegment === item.identifier
                ? "text-foreground bg-muted"
                : "hover:text-foreground"
            )}
          >
            {item.icon ? <item.icon size={18} /> : null}
            <span>{item.label}</span>
          </p>
        </Link>

        {item.children ? (
          <button onClick={toggleSubMenu}>
            <ChevronDown
              size={18}
              className={cn(
                "mr-2 duration-200 rounded-md focus:outline-none focus:shadow-outline hover:hover:text-foreground",
                isSubMenuOpen ? "-rotate-180" : ""
              )}
            />
          </button>
        ) : null}
      </div>

      {/* Submenu */}
      <AnimatePresence>
        {isSubMenuOpen && item.children && (
          <ul className="pl-4 first:mt-2">
            {item.children.map((subItem: any) => (
              <SidebarItem
                key={subItem.label}
                item={subItem}
                lastSegment={lastSegment}
                appId={appId}
              />
            ))}
          </ul>
        )}
      </AnimatePresence>
    </li>
  );
};

export default SidebarItem;
