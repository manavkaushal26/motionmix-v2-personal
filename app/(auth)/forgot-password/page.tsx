import ForgotPasswordForm from "@/components/forms/ForgotPassword";
import CardSpotlightBorder from "@/components/global/CardSpotlightBorder";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type Props = {};

const ForgotPasswordPage = (props: Props) => {
  return (
    <CardSpotlightBorder className="w-full bg-background shadow-lg !rounded-xl">
      <CardHeader className="text-left">
        <div className="mb-2 flex items-center justify-start space-x-2">
          <div className="relative w-5 aspect-square">
            <Image src={"/assets/logo_icon.svg"} alt="MotionMix Logo" fill />
          </div>
          <p className="text-motionmix text-normal text-lg">
            MOTION<span className="text-bold">MIX</span>
          </p>
        </div>
        <CardTitle>Forgot Password?</CardTitle>
        <CardDescription className="pt-2 leading-normal">
          No Worries. We&apos;ll email you the password reset link. <br />
          This link will be active for next 1 hour
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-1">
        <ForgotPasswordForm />
      </CardContent>
    </CardSpotlightBorder>
  );
};

export default ForgotPasswordPage;
