import { auth } from "@/lib/authOptions";

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

const SessionsPage = async ({ params }: Props) => {
  const authSession = await auth();

  const appDetails = await fetchAppDetails(
    params?.appId,
    authSession?.user?.token
  );
  const appVersionsList = await fetchAppDetails(
    params?.appId,
    authSession?.user?.token
  );

  return (
    <div>
      <pre>{JSON.stringify(appDetails, undefined, 2)}</pre>
      <pre>{JSON.stringify(appVersionsList, undefined, 2)}</pre>
    </div>
  );
};

export default SessionsPage;
