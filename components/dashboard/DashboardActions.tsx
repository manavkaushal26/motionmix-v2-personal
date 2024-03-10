"use client";

import CardSpotlight from "@/components/global/CardSpotlight";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, MoveRight, SquareUser, Wand2 } from "lucide-react";
import Link from "next/link";
import CreateAppForm from "../forms/create-app-form";
import CustomModal from "../global/CustomModal";
import { useModal } from "../providers/ModalProvider";

type Props = {};

const DashboardActions = (props: Props) => {
  const { setOpen } = useModal();

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <div
        onClick={() => {
          setOpen(
            <CustomModal title="Create a new app">
              <CreateAppForm />
            </CustomModal>
          );
        }}
      >
        <CardSpotlight className="group cursor-pointer">
          <CardContent className="p-5">
            <div className="flex items-center">
              <Wand2 size={18} className="mr-2" />
              <p>Create an app</p>
              <MoveRight
                size={18}
                className="p-0 ml-2 group-hover:ml-4 duration-200"
              />
            </div>
            <Separator className="my-3" />
            <p className="text-sm text-muted-foreground">
              Effortlessly build your customized application with intuitive
              tools. Unleash creativity and bring ideas to life.
            </p>
          </CardContent>
        </CardSpotlight>
      </div>
      <Link href="/dashboard/profile">
        <CardSpotlight className="group cursor-pointer">
          <CardContent className="p-5">
            <div className="flex items-center">
              <SquareUser size={18} className="mr-2" />
              <p>View my profile</p>
              <MoveRight
                size={18}
                className="p-0 ml-2 group-hover:ml-4 duration-200"
              />
            </div>
            <Separator className="my-3" />
            <p className="text-sm text-muted-foreground">
              Explore and manage your personal profile seamlessly. Access and
              update information with ease for an authentic online presence.
            </p>
          </CardContent>
        </CardSpotlight>
      </Link>
      <Link href="/dashboard/download">
        <CardSpotlight className="group cursor-pointer">
          <CardContent className="p-5">
            <div className="flex items-center">
              <Download size={18} className="mr-2" />
              <p>Download SDK</p>
              <MoveRight
                size={18}
                className="p-0 ml-2 group-hover:ml-4 duration-200"
              />
            </div>
            <Separator className="my-3" />
            <p className="text-sm text-muted-foreground">
              Start coding with our Software Development Kit (SDK). Access
              powerful tools and resources for an enhanced development
              experience.
            </p>
          </CardContent>
        </CardSpotlight>
      </Link>
    </section>
  );
};

export default DashboardActions;
