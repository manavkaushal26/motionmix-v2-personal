import ResetPasswordForm from "@/components/forms/reset-password";
import CardSpotlightBorder from "@/components/global/CardSpotlightBorder";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type Props = { params: { userId: string; code: string } };

const ResetPasswordPage = ({ params }: Props) => {
  const { userId = "", code = "" } = params;

  return (
    <CardSpotlightBorder className="w-full bg-background shadow-lg !rounded-lg">
      <CardHeader className="text-left">
        <div className="mb-2 flex items-center justify-start space-x-2">
          <div className="relative w-5 aspect-square">
            <Image src={"/assets/logo_icon.svg"} alt="MotionMix Logo" fill />
          </div>
          <p className="text-motionmix text-normal text-lg">
            MOTION<span className="text-bold">MIX</span>
          </p>
        </div>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Please choose your new password below:
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-1">
        <ResetPasswordForm userId={userId} code={code} />
      </CardContent>
    </CardSpotlightBorder>
  );
};

export default ResetPasswordPage;
