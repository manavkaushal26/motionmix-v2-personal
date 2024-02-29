import { auth } from "@/lib/authOptions";
import { redirect } from "next/navigation";

type Props = {
  params: { appId: string };
  searchParams?: { scene?: string };
};

// const fetchScenesList = async (
//   appId: string,
//   version: string,
//   token: string
// ) => {
//   const res = await fetch(
//     `https://api.motionmix.ai/v2/app/${appId}/${version}/scene`,
//     {
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

// const fetchSessionsByAppId = async (appId: string, token: string) => {
//   const res = await fetch(`https://api.motionmix.ai/v1/app/${appId}/session`, {
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

const SingleAppDetails = async ({ params, searchParams }: Props) => {
  const authSession = await auth();

  if (!authSession) {
    return redirect("/signin?callbackUrl=/dashboard");
  }

  return redirect(`/dashboard/app/${params.appId}/sessions`);
};

export default SingleAppDetails;
