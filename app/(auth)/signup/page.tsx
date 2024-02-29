import UserSignUpForm from "@/components/forms/user-signup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = { searchParams: { callbackUrl?: string } };

const SignUpPage = ({ searchParams }: Props) => {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <UserSignUpForm callbackUrl={searchParams?.callbackUrl || "/"} />
      </CardContent>
    </Card>
  );
};

export default SignUpPage;
