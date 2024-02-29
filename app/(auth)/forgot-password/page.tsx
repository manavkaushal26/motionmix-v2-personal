import ForgotPasswordForm from "@/components/forms/forgot-password";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type Props = {};

const ForgotPasswordPage = (props: Props) => {
  return (
    <Card className="w-full shadow-lg !rounded-lg">
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
        <CardDescription>
          No Worries. We&apos;ll email you the password reset link. <br />
          This link will be active for next 30 Mins
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-2">
        <ForgotPasswordForm />
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordPage;
