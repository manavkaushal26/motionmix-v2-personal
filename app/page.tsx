import GradientBadge from "@/components/global/GradientBadge";
import MaxWidthWrapper from "@/components/global/MaxWidthWrapper";
import HeroCanvas from "@/components/site/HeroCanvas";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/authOptions";
import { cn } from "@/lib/utils";
import { TabletSmartphone } from "lucide-react";
import Link from "next/link";

const Home = async () => {
  const session = await auth();
  // <div className="relative h-full w-full bg-slate-950">
  //   <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
  //   <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
  // </div>;
  return (
    <div className="relative h-screen w-full">
      <MaxWidthWrapper className="absolute inset-0 w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-3 text-center">
          <GradientBadge variant="normal">
            <TabletSmartphone size={14} />
            <span>MotionMix is now open to use!</span>
          </GradientBadge>
          <h1 className="text-6xl font-light text-foreground">
            Supercharge Your 3D App
          </h1>
          <h2 className="text-6xl font-semibold bg-gradient-to-b from-purple-500 to-pink-500 text-transparent bg-clip-text">
            Visualize, Analyze, Optimize
          </h2>
          <p className="text-foreground">
            Track your users through Heatmaps and Recorded sessions to uncover
            the missing pieces!
          </p>
          <div className="mt-10 flex items-center space-x-4">
            <Link
              href={!session ? "/login" : "/dashboard"}
              className={cn(buttonVariants(), "flex items-center group")}
            >
              {!session ? "Get Early Access" : "View Sessions"}
            </Link>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "link" }),
                "flex items-center group"
              )}
            >
              <>
                <span>How it works?</span>
                {/* <MoveRight
                  size={16}
                  className="ml-3 group-hover:ml-5 duration-200"
                /> */}
              </>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>

      <HeroCanvas />
      <div className="h-screen">Section 2</div>
    </div>
  );
};

export default Home;
