import DashboardActions from "@/components/dashboard/DashboardActions";
import FadeUp from "@/components/global/FadeUp";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/authOptions";

type Props = {};

const Dashboard = async (props: Props) => {
  const session = await auth();

  return (
    <FadeUp>
      <h1 className="text-2xl capitalize">
        Hey {session.user.name.split(" ")[0]}, Welcome back!
      </h1>
      <p className="text-muted-foreground">
        You are now logged into your dashboard.
      </p>
      <Separator className="my-4" />
      <DashboardActions session={session} />
    </FadeUp>
  );
};

export default Dashboard;
