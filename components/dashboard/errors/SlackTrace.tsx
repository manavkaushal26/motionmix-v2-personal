"use client";

import FadeUp from "@/components/global/FadeUp";
import MaxWidthWrapper from "@/components/global/MaxWidthWrapper";
import Spinner from "@/components/global/Spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
} from "@/components/ui/drawer";
import { SingleError } from "@/lib/types";
import { copyTextToClipboard } from "@/lib/utils";
import { api } from "@/services/api";
import dayjs from "dayjs";
import { Copy, Text } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = { errorId: string };

const SlackTrace = ({ errorId }: Props) => {
  const [fetchingSingleError, setFetchingSingleError] =
    useState<boolean>(false);
  const [singleError, setSingleError] = useState<SingleError | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchSingleError = async (errorId: string) => {
    setFetchingSingleError(true);
    try {
      const res = await api.getSingleError(errorId);
      if (res.kind === "ok") {
        setSingleError(res.data);
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setFetchingSingleError(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <Badge
        variant="secondary"
        className="cursor-pointer text-muted-foreground hover:text-foreground duration-200"
        onClick={async () => {
          setIsOpen(true);
          await fetchSingleError(errorId);
        }}
      >
        <Text size={12} className="mr-1" />
        <span>Stack Trace</span>
      </Badge>

      <DrawerContent>
        <MaxWidthWrapper>
          <DrawerDescription className="py-12 px-6">
            {fetchingSingleError ? (
              <Spinner text={"Fetching latest data..."} />
            ) : (
              <FadeUp>
                {/* <div className="grid gap-4 mx-4 sm:grid-cols-12">
                  <div className="col-span-12 sm:col-span-3">
                    <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-1.5 before:mb-3 before:rounded-md before:mx-auto sm:before:mx-0 before:dark:bg-gradient-to-r before:dark:from-purple-500 before:dark:to-pink-500">
                      <span className="text-sm font-bold tracking-normal uppercase text-muted-foreground flex items-center space-x-2">
                        Error
                      </span>
                    </div>
                  </div>
                  <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                    <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-red-400/50">
                      <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-3 sm:before:h-3 sm:before:rounded-full sm:before:left-[-33px] sm:before:z-[1] before:dark:bg-red-400">
                        <div>Other details we can show here!</div>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="mt-6 grid gap-4 mx-4 sm:grid-cols-12">
                  <div className="col-span-12 sm:col-span-3">
                    <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-1.5 before:mb-3 before:rounded-md before:mx-auto sm:before:mx-0 before:dark:bg-gradient-to-r before:dark:from-purple-500 before:dark:to-pink-500">
                      <span className="text-sm font-bold tracking-normal uppercase text-muted-foreground flex items-center space-x-2">
                        Stack Trace
                      </span>
                    </div>
                  </div>
                  <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                    <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-red-400/50">
                      <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-3 sm:before:h-3 sm:before:rounded-full sm:before:left-[-33px] sm:before:z-[1] before:dark:bg-red-400">
                        <h3 className="text-foreground text-xl font-semibold tracking-tight">
                          {singleError?.name?.split(":")[0]}
                        </h3>
                        <time className="text-xs tracking-tight dark:text-muted-foreground">
                          {dayjs(singleError?.updatedAt).format(
                            "DD MMMM, YYYY"
                          )}
                        </time>
                        <div className="p-4 rounded-lg mt-2 relative">
                          <Button
                            className="absolute top-2 -right-10"
                            size="icon"
                            variant="ghost"
                            onClick={async () => {
                              try {
                                await copyTextToClipboard(
                                  singleError?.trace as string
                                );
                                toast.success("Stack trace copied!");
                              } catch {
                                toast.error("Error while copying stack trace!");
                              }
                            }}
                          >
                            <Copy size={18} />
                          </Button>
                          <code className="block h-64 mt-3 text-sm overflow-y-scroll">
                            {singleError?.trace}
                          </code>
                        </div>
                      </div>
                      {/* <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-red-400"></div>
                    <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-red-400"></div> */}
                    </div>
                  </div>
                </div>
              </FadeUp>
            )}
          </DrawerDescription>
        </MaxWidthWrapper>
      </DrawerContent>
    </Drawer>
  );
};

export default SlackTrace;
