import AppSessionCard from "@/components/dashboard/sessions/AppSessionCard";
import SessionsFilters, {
  Sort,
} from "@/components/dashboard/sessions/SessionsFilters";
import { auth } from "@/lib/authOptions";
import { SingleSession } from "@/lib/types";

type Props = {
  params: { appId: string };
};

const fetchAppDetails = async (appId: string, token: string) => {
  const res = await fetch(`https://api.motionmix.ai/v1/app/${appId}`, {
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

const fetchAppVersions = async (appId: string, token: string) => {
  const res = await fetch(`https://api.motionmix.ai/v1/app/${appId}/version`, {
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

export const fetchAllSessionByAppId = async (
  appId: string,
  token: string,
  limit: number = 16,
  skip: number = 0,
  sortBy: Sort = "createdAt"
) => {
  const res = await fetch(
    `https://api.motionmix.ai/v1/app/${appId}/session?limit=${limit}&skip=${skip}&sort=${sortBy}`,
    {
      next: { revalidate: 3600 }, // Revalidate every hour
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
  const authSession = await auth();

  const appDetails = await fetchAppDetails(
    params?.appId,
    authSession?.user?.token
  );
  const { sessions = [] }: { sessions: SingleSession[] } =
    await fetchAllSessionByAppId(params?.appId, authSession?.user?.token);

  return (
    <div>
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-muted-foreground font-semibold">
            Sessions under{" "}
            <span className="text-motionmix">{appDetails.name}</span>
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
      {/* <section>
        <Pagination />
      </section> */}
    </div>
  );
};

export default SessionsPage;
