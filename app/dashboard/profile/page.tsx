"use client";

import ChangePasswordForm from "@/components/forms/ChangePassword";
import UpdateMyDetailsForm from "@/components/forms/UpdateMyDetails";
import FadeUp from "@/components/global/FadeUp";
import Spinner from "@/components/global/Spinner";
import { Separator } from "@/components/ui/separator";
import { api } from "@/services/api";
import { UserCog } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {};

const ProfilePage = (props: Props) => {

  const [fetchingUserDetails, setFetchingUserDetails] =
    useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<any>();

  const fetchUserDetails = async () => {
    setFetchingUserDetails(true);
    try {
      const res = await api.getUserDetails();
      if (res.kind === "ok") {
        setUserDetails(res.data);
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message, {
        description: "For more information on the error, please view console.",
      });
    } finally {
      setFetchingUserDetails(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <FadeUp>
      <div className="flex items-center space-x-3 text-2xl text-muted-foreground font-semibold">
        <UserCog size={24} />
        <h1>My Profile</h1>
      </div>
      <Separator className="my-4" />
      {fetchingUserDetails && !userDetails ? (
        <Spinner />
      ) : (
        <>
          <section className="mt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
              <div className="pt-2">
                <h2 className="text-base font-semibold leading-7">
                  Basic Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Access this section to modify and update your personal
                  information.
                </p>
              </div>
              <UpdateMyDetailsForm user={userDetails}  />
            </div>
          </section>
          <section className="mt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
              <div className="pt-2">
                <h2 className="text-base font-semibold leading-7">
                  Change Password
                </h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Update your account security effortlessly by accessing this
                  section.
                </p>
              </div>
              <ChangePasswordForm />
            </div>
          </section>
        </>
      )}
    </FadeUp>
  );
};

export default ProfilePage;
