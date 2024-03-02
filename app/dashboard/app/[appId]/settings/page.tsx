import { GeneralAppForm } from "@/components/forms/app-settings";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/authOptions";
import { config } from "@/lib/globalConfig";
import { AppMeta } from "@/lib/types";
import dayjs from "dayjs";
import { Settings } from "lucide-react";

type Props = { params: { appId: string } };

export const fetchAppDetails = async (appId: string, token: string) => {
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
};

const AppSettingsPage = async ({ params }: Props) => {
  const { appId = "" } = params;
  const authSession = await auth();

  const app: AppMeta = await fetchAppDetails(appId, authSession?.user?.token);

  if (!app) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center space-x-3 text-2xl text-muted-foreground font-semibold">
        <Settings size={24} />
        <h1>
          Settings for <span className="text-motionmix">{app.name}</span>
        </h1>
      </div>
      <Separator className="my-4" />
      {/* <section className="mt-6">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="p-0 rounded-none">
            <TabsTrigger
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "rounded-none"
              )}
              value="account"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "rounded-none"
              )}
              value="password"
            >
              SDK
            </TabsTrigger>
          </TabsList>
          <Separator />
          <TabsContent value="account">
            <GeneralAppForm app={app} />
          </TabsContent>
          <TabsContent value="password">SDK here</TabsContent>
        </Tabs>
      </section> */}
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

          <Card className="bg-[#161616] md:col-span-2">
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
          </Card>
        </div>
      </section>

      <GeneralAppForm app={app} />
    </div>
  );
};

export default AppSettingsPage;
