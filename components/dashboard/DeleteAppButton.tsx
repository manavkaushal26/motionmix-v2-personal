"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteApp, revokeApp } from "@/lib/queries";
import { formatSeconds } from "@/lib/utils";
import { RotateCcw, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Spinner from "../global/Spinner";

type Props = {
  appId: string;
  deleteAppRequested: boolean;
  userToken: string;
  countdownFrom?: string;
};

const DeleteAppButton = ({
  appId,
  deleteAppRequested,
  userToken,
  countdownFrom,
}: Props) => {
  const router = useRouter();
  const [deleteAppRequesting, setDeleteAppRequesting] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!countdownFrom) return;

    const endDate = new Date(countdownFrom);
    endDate.setHours(endDate.getHours() + 24);
    const now = new Date();
    const difference = endDate.getTime() - now.getTime();
    const secondsLeft = Math.floor(difference / 1000);
    setTimeLeft(secondsLeft);
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === null || prevTimeLeft <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [countdownFrom]);

  const requestAppAction = async (action: string) => {
    setDeleteAppRequesting(true);
    const actionToast = toast.loading(`App ${action} request initiated...`);
    try {
      const res = await (action === "revoke"
        ? revokeApp(appId, userToken)
        : deleteApp(appId, userToken));
      if (!res.error) {
        toast.success(res.message);
        router.refresh();
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      toast.error(
        error?.message ||
          `Something went wrong while requesting for app ${action}. Please try again later.`
      );
    } finally {
      setDeleteAppRequesting(false);
      toast.dismiss(actionToast);
    }
  };

  if (deleteAppRequested) {
    return (
      <>
        <Button
          variant="outline"
          className="gap-x-2"
          onClick={() => requestAppAction("revoke")}
        >
          {deleteAppRequesting ? (
            <Spinner />
          ) : (
            <>
              <RotateCcw size={16} />
              <span>Revoke</span>
            </>
          )}
        </Button>
        {!deleteAppRequesting && timeLeft !== null && (
          <div className="text-xs text-center text-muted-foreground">
            <span>{formatSeconds(timeLeft, "h:m:s")}</span>
          </div>
        )}
      </>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="gap-x-2">
          <Trash size={16} />
          <span>Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            By clicking <span className="text-foreground">confirm</span>, an app
            deletion process will be initiated.
            <br />
            You can cancel the app deletion process and revoke the app anytime
            within 24 hours window.
            <br />
            <br />
            Click <span className="text-rose-500">Confirm</span> to continue:
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button size="sm" variant="outline">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => requestAppAction("delete")}
            >
              {deleteAppRequesting ? <Spinner /> : "Confirm"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAppButton;
