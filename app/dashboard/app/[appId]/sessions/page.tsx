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

const fetchAllSessionByAppId = async (appId: string, token: string) => {
  const res = await fetch(
    `https://api.motionmix.ai/v1/app/${appId}/session?limit=10&skip=0`,
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
  const authSession = await auth();

  const appDetails = await fetchAppDetails(
    params?.appId,
    authSession?.user?.token
  );
  const { sessions = [] }: { sessions: SingleSession[] } =
    await fetchAllSessionByAppId(params?.appId, authSession?.user?.token);

  return (
    <div>
      <section>
        <h1 className="text-2xl text-muted-foreground font-semibold">
          Sessions under{" "}
          <span className="text-motionmix">{appDetails.name}</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          {sessions?.length || 0} total sessions
        </p>
      </section>
      <section className="mt-10 grid grid-cols-4 gap-5">
        {sessions?.map((session) => (
          <p key={session._id}>{session.createdAt}</p>
        ))}
      </section>
    </div>
  );
};

export default SessionsPage;
