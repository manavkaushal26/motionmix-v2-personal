"use client";

import { SingleSession } from "@/lib/types";
import { formatSeconds } from "@/lib/utils";
import dayjs from "dayjs";
import Link from "next/link";
import CardSpotlight from "../../global/CardSpotlight";
import { Separator } from "../../ui/separator";

type Props = {
  appSession: SingleSession;
};

const AppSessionCard = ({ appSession }: Props) => {
  const date = dayjs(appSession.createdAt).format("DD MMM, YYYY");
  const time = dayjs(appSession.createdAt).format("hh:mm a");
  const duration = formatSeconds(appSession?.sessionTime);

  return (
    <Link href={`/session/${appSession._id}`} target="_blank">
      <CardSpotlight className="p-4">
        <div>
          <div>
            <div className="flex items-center space-x-1.5">
              <p className="text-muted-foreground text-xs">{date}</p>
              <Separator className="h-3 w-px bg-muted-foreground" />
              <p className="text-muted-foreground text-xs">{time}</p>
            </div>
            <p className="text-lg">
              M_{dayjs(appSession.createdAt).valueOf().toString().slice(9, 13)}
            </p>
          </div>
          <Separator className="mb-2 mt-1" />
          <div className="text-muted-foreground text-xs space-y-1">
            <p>
              Duration:{" "}
              <span className="text-foreground">{duration || "-"}</span>
            </p>
            <p>
              App Version:{" "}
              <span className="text-foreground">
                {appSession?.appVersion?.name || "-"}
              </span>
            </p>
            <p>
              Scene:{" "}
              <span className="text-foreground">
                {appSession?.appScene?.name}
              </span>
            </p>
          </div>
        </div>
      </CardSpotlight>
    </Link>
  );
};

export default AppSessionCard;
