import { auth } from "@/lib/authOptions";
import { config } from "@/lib/globalConfig";

type Props = {};

const Dashboard = async (props: Props) => {
  const session = await auth();

  // if (appsList) {
  //   const firstAppId = appsList[0]?._id;
  //   return redirect(`/dashboard/app/${firstAppId}`);
  // }

  return (
    <div>
      <h1 className="text-2xl capitalize">
        Hey {session.user.name.split(" ")[0]}, Welcome back!
      </h1>
      <p className="text-muted-foreground">
        You are now logged into your dashboard.
      </p>
      {/* <section className="mt-5 text-muted-foreground">
        <p>Here are some things you can do:</p>
        <ul className="mt-2 list-disc text-sm space-y-2">
          <li className="hover:text-foreground duration-200 cursor-normal ml-4">
            View your recent activity
          </li>
          <li className="hover:text-foreground duration-200 cursor-normal ml-4">
            Manage your profile settings
          </li>
          <li className="hover:text-foreground duration-200 cursor-normal ml-4">
            Access analytics and reports
          </li>
          <li className="hover:text-foreground duration-200 cursor-normal ml-4">
            Explore new features
          </li>
        </ul>
      </section> */}
    </div>
  );
};

export default Dashboard;
