import { auth } from "@/lib/authOptions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import AuthButton from "../global/AuthButton";
import MaxWidthWrapper from "../global/MaxWidthWrapper";
import { buttonVariants } from "../ui/button";

interface HeaderProps {}

const Header = async () => {
  const session = await auth();

  return (
    <header
      className={`fixed top-5 w-full z-[100] duration-200 ease-in-out bg-transparent`}
    >
      <MaxWidthWrapper maxWidth="md">
        <div className="bg-black rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 py-3 px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <div className="relative w-10 aspect-square">
                <Image
                  src={"/assets/logo_icon.svg"}
                  alt="MotionMix Logo"
                  fill
                />
              </div>
            </Link>

            {/* Login/Signup */}
            <div className="flex items-center">
              <Link
                href="https://docs.motionmix.ai/sdk-documentation/"
                target="_blank"
                className={cn(buttonVariants({ variant: "link" }))}
                rel="noopener noreferrer"
              >
                Docs
              </Link>
              <Link
                href="#pricing"
                className={cn(buttonVariants({ variant: "link" }))}
              >
                Pricing
              </Link>
              {session ? (
                <Link
                  href="/dashboard"
                  className={cn(buttonVariants({ variant: "link" }))}
                >
                  Dashboard
                </Link>
              ) : null}
              <AuthButton
                type={!session ? "signin" : "signout"}
                size="sm"
                className="ml-3"
              />
              {/* <ModeToggle /> */}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Header;
