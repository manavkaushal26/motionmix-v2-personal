import DeleteAppButton from "@/components/dashboard/DeleteAppButton";
import AppKeySecret from "@/components/global/AppKeySecret";
import CardSpotlight from "@/components/global/CardSpotlight";
import FadeUp from "@/components/global/FadeUp";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/authOptions";
import { config } from "@/lib/globalConfig";
import { AppMeta } from "@/lib/types";
import dayjs from "dayjs";
import { Settings } from "lucide-react";

type Props = { params: { appId: string } };

const fetchAppDetails = async (appId: string, token: string) => {
  try {
    const res = await fetch(`${config.apiBaseUrl}/v1/app/${appId}`, {
      method: "GET",
      headers: { token },
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return { message: data?.message, description: data?.description };
    }
  } catch (error) {
    console.log(error);
  }
};

const AppSettingsPage = async ({ params }: Props) => {
  const { appId = "" } = params;
  const authSession = await auth();

  const app: AppMeta = await fetchAppDetails(appId, authSession?.user?.token);
  const deleteAppRequested = app?.deleteInProgress ? true : false;

  if (!app) {
    return null;
  }

  return (
    <FadeUp>
      <div className="flex items-center space-x-3 text-2xl text-muted-foreground font-semibold">
        <Settings size={24} />
        <h1>
          Settings for <span className="text-motionmix">{app.name}</span>
        </h1>
      </div>
      <Separator className="my-4" />
      {/* Basic Information */}
      <section className="mt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
          <div className="pt-2">
            <h2 className="text-base font-semibold leading-7">
              Basic Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              This section displays basic information about the application.
              This data cannot be changed.
            </p>
          </div>

          <CardSpotlight className="md:col-span-2">
            <CardContent className="p-6 grid grid-cols-1 gap-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Label className="text-muted-foreground">App Name</Label>
                <p>{app.name}</p>
              </div>
              <div className="sm:col-span-3">
                <Label className="text-muted-foreground">App Created</Label>
                <p>
                  {dayjs(app.createdAt).format("DD MMMM, YYYY")} at{" "}
                  {dayjs(app.createdAt).format("hh:mm a")}
                </p>
              </div>
              <div className="sm:col-span-3">
                <Label className="text-muted-foreground">
                  App Last Updated
                </Label>
                <p>
                  {dayjs(app.updatedAt).format("DD MMMM, YYYY")} at{" "}
                  {dayjs(app.updatedAt).format("hh:mm a")}
                </p>
              </div>
            </CardContent>
          </CardSpotlight>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7">SDK Information</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Find key information about the SDK implementation.
          </p>
        </div>
        <div className="md:col-span-2">
          <AppKeySecret appKey={app._id} appSecret={app.keys[0]} />
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7 pt-2">
            Danger Zone
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            This section contains actions that may have irreversible
            consequences.
          </p>
        </div>
        <CardSpotlight className="md:col-span-2">
          <CardContent className="p-6">
            <div className="w-full flex items-center gap-x-4 justify-between">
              <div>
                <p className="block font-medium leading-6">
                  {deleteAppRequested ? "Revoke App" : "Delete App"}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {deleteAppRequested
                    ? "Your request to delete this app has been initiated. You have 24 hours to cancel the deletion process and revoke the app."
                    : "Deleting the app will remove all associated data."}
                </p>
              </div>
              <div>
                <DeleteAppButton
                  appId={app._id}
                  deleteAppRequested={deleteAppRequested}
                  countdownFrom={
                    app?.deleteInProgress ? app.deleteInProgress : ""
                  }
                  userToken={authSession?.user?.token}
                />
              </div>
            </div>
          </CardContent>
        </CardSpotlight>
      </section>
    </FadeUp>
  );
};

export default AppSettingsPage;
