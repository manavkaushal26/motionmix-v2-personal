import CardSpotlight from "@/components/global/CardSpotlight";
import GradientBadge from "@/components/global/GradientBadge";
import MaxWidthWrapper from "@/components/global/MaxWidthWrapper";
import HeroCanvas from "@/components/site/HeroCanvas";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/authOptions";
import { cn } from "@/lib/utils";
import { MoveRight, TabletSmartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Home = async () => {
  const session = await auth();
  // <div className="relative h-full w-full bg-slate-950">
  //   <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
  //   <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
  // </div>;
  return (
    <div className="relative h-screen w-full">
      {/* HERO SECTION */}
      <MaxWidthWrapper className="absolute inset-0 w-full h-full flex items-center justify-center z-20">
        <div className="flex flex-col items-center justify-center gap-y-3 text-center">
          <GradientBadge variant="normal">
            <TabletSmartphone size={14} />
            <span>MotionMix is Now Open for Everyone</span>
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
              How it works?
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
      <HeroCanvas />
      {/* HERO SECTION ENDS */}

      {/* FEATURES SECTIONS */}
      <MaxWidthWrapper className="w-full mt-10">
        <div>
          <h3 className="text-4xl font-semibold leading-tight  text-center">
            Unlock your App&apos;s Potential: <br />
            <span className="bg-gradient-to-b from-purple-500 to-pink-500 text-transparent bg-clip-text">
              Understand Users, Boost Performance
            </span>
          </h3>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                title: "A type-safe SDK",
                description:
                  "Install and run our SDK generator, which introspects your repositories’ content to output automatic TypeScript types.",
                cta: "Learn More",
                ctaPath: "",
                imgSrc:
                  "https://basehub.earth/cdn-cgi/imagedelivery/AcMAerS13uRNdcqmxOA-IQ/dcb6bb45-3792-46f5-a59a-f1252c444f00/quality=100,format=webp",
                imgPos: "right",
              },
              {
                title: "3D Session Recordings",
                description:
                  "See what your users see. Discover confusion and frustration signals.",
                cta: "Learn More",
                ctaPath: "",
                imgSrc:
                  "https://basehub.earth/cdn-cgi/imagedelivery/AcMAerS13uRNdcqmxOA-IQ/627a07fb-3e6f-4b6a-0d5e-2c3726bd3700/quality=100,format=webp",
                imgPos: "right",
              },
              {
                title: "Heatmaps",
                description:
                  "Understand navigation and interactions to optimize user experience.",
                cta: "Learn More",
                ctaPath: "",
                imgSrc:
                  "https://basehub.earth/cdn-cgi/imagedelivery/AcMAerS13uRNdcqmxOA-IQ/389a7cdf-1239-4296-498a-05180ec2ab00/quality=100,format=webp",
                imgPos: "right",
              },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className="bg-[#161616] rounded-xl overflow-hidden"
              >
                <div
                  className={cn("w-full relative flex flex-col h-full", {
                    "flex-col-reverse": i % 2 !== 0,
                  })}
                >
                  <div className="p-6 flex-1">
                    <p className="text-lg mb-2">{feature.title}</p>
                    <span className="text-sm text-muted-foreground">
                      {feature.description}
                    </span>{" "}
                    <Link
                      href={feature.ctaPath}
                      className="inline-flex group text-sm items-center text-muted-foreground hover:text-foreground duration-200 underline underline-offset-2"
                    >
                      <span>{feature.cta}</span>
                      <MoveRight
                        size={14}
                        className="ml-2 group-hover:ml-3 duration-200"
                      />
                    </Link>
                  </div>
                  <Image
                    src={feature.imgSrc}
                    alt={feature.title}
                    className="ml-auto flex-0 shadow-lg"
                    width={330}
                    height={282}
                  />
                </div>
              </div>
            ))}
          </div>
          {!session ? (
            <CardSpotlight className="mt-4">
              <div className="flex w-full items-center justify-between p-4">
                <p className="text-2xl font-bold">Try MotionMix Today</p>
                <Link href="" className={cn(buttonVariants())}>
                  Get Started
                </Link>
              </div>
            </CardSpotlight>
          ) : null}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Home;
