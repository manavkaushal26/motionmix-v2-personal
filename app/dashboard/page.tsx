import CardSpotlight from "@/components/global/CardSpotlight";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/authOptions";
import { Download, MoveRight, SquareUser, Wand2 } from "lucide-react";

type Props = {};

const Dashboard = async (props: Props) => {
  const session = await auth();

  return (
    <div>
      <h1 className="text-2xl capitalize">
        Hey {session.user.name.split(" ")[0]}, Welcome back!
      </h1>
      <p className="text-muted-foreground">
        You are now logged into your dashboard.
      </p>
      <Separator className="my-4" />
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          {
            id: "createApp",
            label: "Create an app",
            icon: Wand2,
            desc: "Effortlessly build your customized application with intuitive tools. Unleash creativity and bring ideas to life.",
          },
          {
            id: "viewProfile",
            label: "View my profile",
            icon: SquareUser,
            desc: "Explore and manage your personal profile seamlessly. Access and update information with ease for an authentic online presence.",
          },
          {
            id: "downloadSDK",
            label: "Download SDK",
            icon: Download,
            desc: "Start coding with our Software Development Kit (SDK). Access powerful tools and resources for an enhanced development experience.",
          },
        ].map((item) => (
          <CardSpotlight key={item.id} className="group cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-center">
                <item.icon size={18} className="mr-2" />
                <p>{item.label}</p>
                <MoveRight
                  size={18}
                  className="p-0 ml-2 group-hover:ml-4 duration-200"
                />
              </div>
              <Separator className="my-3" />
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </CardContent>
          </CardSpotlight>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
