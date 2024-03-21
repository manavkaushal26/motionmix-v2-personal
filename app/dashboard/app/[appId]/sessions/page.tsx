import PageHeader from "@/components/dashboard/PageHeader";
import AppSessionCard from "@/components/dashboard/sessions/AppSessionCard";
import SessionsFilters from "@/components/dashboard/sessions/SessionsFilters";
import AppKeySecret from "@/components/global/AppKeySecret";
import FadeUp from "@/components/global/FadeUp";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/authOptions";
import { config } from "@/lib/globalConfig";
import { MoveRight } from "lucide-react";
import Link from "next/link";

type Props = {
  params: { appId: string };
};

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

// const fetchAppVersions = async (appId: string, token: string) => {
//   const res = await fetch(`https://api.motionmix.ai/v1/app/${appId}/version`, {
//     method: "GET",
//     headers: { token },
//   });
//   const data = await res.json();
//   if (res.ok) {
//     return data;
//   } else {
//     return { message: data?.message, description: data?.description };
//   }
// };

const fetchAllSessionByAppId = async (
  appId: string,
  token: string,
  limit: number = 16,
  skip: number = 0
) => {
  const res = await fetch(
    `${config.apiBaseUrl}/v1/app/${appId}/session?limit=${limit}&skip=${skip}`,
    {
      method: "GET",
      headers: { token },
    }
  );
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    return { message: data?.message, description: data?.description };
  }
};

const SessionsPage = async ({ params }: Props) => {
  const { appId = "" } = params;
  const authSession = await auth();

  const app = await fetchAppDetails(appId, authSession?.user?.token);
  const { sessions = [] } = await fetchAllSessionByAppId(
    appId,
    authSession?.user?.token
  );
  // const sessionsRes = await api.getAllSessionsByAppId(appId);

  return (
    <FadeUp>
      <section className="flex items-center justify-between">
        <PageHeader
          title={
            <>
              Sessions under <span className="text-motionmix">{app.name}</span>
            </>
          }
          description={`${sessions?.length || 0} session${
            sessions?.length !== 1 ? "s" : ""
          }`}
        />
        {sessions?.length !== 0 ? <SessionsFilters /> : null}
      </section>
      <Separator className="my-4" />
      <section className="mt-5">
        {sessions?.length > 0 ? (
          <div className="grid grid-cols-4 gap-5">
            {sessions?.map((session: any) => (
              <AppSessionCard key={session._id} appSession={session} />
            ))}
          </div>
        ) : (
          <div>
            <div>
              <p>
                No sessions found! Integrate the MotionMix SDK into your app to
                start capturing sessions.
              </p>
              <Link
                href="https://docs.motionmix.ai/sdk-documentation/sdk-guide/importing-the-sdk"
                target="_blank"
                className="block cursor-pointer hover:text-foreground text-muted-foreground hover:underline hover:underline-offset-4 mt-5 group w-fit duration-200"
              >
                Learn how to integrate our SDK effortlessly{" "}
                <MoveRight
                  size={18}
                  className="inline ml-2 group-hover:ml-3 duration-200"
                />
              </Link>
            </div>
            <div className="mt-16">
              <PageHeader
                title={
                  <>
                    Your app <span className="text-motionmix">secrets</span>
                  </>
                }
              />
              <Separator className="my-4" />
              <AppKeySecret appKey={app._id} appSecret={app.keys[0]} />
            </div>
          </div>
        )}
      </section>
    </FadeUp>
  );
};

export default SessionsPage;
