import UserSignUpForm from "@/components/forms/UserSignUp";
import CardSpotlightBorder from "@/components/global/CardSpotlightBorder";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type Props = { searchParams: { callbackUrl?: string } };

const SignUpPage = ({ searchParams }: Props) => {
  return (
    <CardSpotlightBorder className="bg-background w-full shadow-lg !rounded-xl">
      <CardHeader className="text-center">
        <div className="mb-2 flex items-center justify-center space-x-2">
          <div className="relative w-5 aspect-square">
            <Image src={"/assets/logo_icon.svg"} alt="MotionMix Logo" fill />
          </div>
          <p className="text-motionmix text-normal text-lg">
            MOTION<span className="text-bold">MIX</span>
          </p>
        </div>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Let&apos;s get started</CardDescription>
      </CardHeader>
      <CardContent className="mt-2">
        <UserSignUpForm callbackUrl={searchParams?.callbackUrl || "/"} />
      </CardContent>
    </CardSpotlightBorder>
  );
};

export default SignUpPage;
