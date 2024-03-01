import AppSessionCard from "@/components/dashboard/sessions/AppSessionCard";
import SessionsFilters from "@/components/dashboard/sessions/SessionsFilters";
import { api } from "@/services/api";

type Props = {
  params: { appId: string };
};

// export const fetchAppDetails = async (appId: string, token: string) => {
//   const res = await fetch(`https://api.motionmix.ai/v1/app/${appId}`, {
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

// export const fetchAllSessionByAppId = async (
//   appId: string,
//   token: string,
//   limit: number = 16,
//   skip: number = 0,
//   sortBy: Sort = "createdAt"
// ) => {
//   const res = await fetch(
//     `https://api.motionmix.ai/v1/app/${appId}/session?limit=${limit}&skip=${skip}&sort=${sortBy}`,
//     {
//       next: { revalidate: 3600 }, // Revalidate every hour
//       method: "GET",
//       headers: { token },
//     }
//   );
//   const data = await res.json();
//   if (res.ok) {
//     return data;
//   } else {
//     return { message: data?.message, description: data?.description };
//   }
// };

const SessionsPage = async ({ params }: Props) => {
  const { appId = "" } = params;

  const appResponse = await api.getSingleApp(appId);
  const sessionsRes = await api.getAllSessionsByAppId(appId);

  if (appResponse.kind === "ok" && sessionsRes.kind === "ok") {
    const app = appResponse.data;
    const sessions = sessionsRes.data;

    return (
      <div>
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-muted-foreground font-semibold">
              Sessions under <span className="text-motionmix">{app.name}</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              {sessions?.length || 0} sessions
            </p>
          </div>
          <SessionsFilters />
        </section>
        <section className="mt-5 grid grid-cols-4 gap-5">
          {sessions?.map((session) => (
            <AppSessionCard key={session._id} appSession={session} />
          ))}
        </section>
      </div>
    );
  }
};

export default SessionsPage;
