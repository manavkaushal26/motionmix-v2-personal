import CardSpotlight from "@/components/global/CardSpotlight";
import CardSpotlightBorder from "@/components/global/CardSpotlightBorder";
import GradientBadge from "@/components/global/GradientBadge";
import MaxWidthWrapper from "@/components/global/MaxWidthWrapper";
import HeroCanvas from "@/components/site/HeroCanvas";
import { Button, buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/authOptions";
import { cn } from "@/lib/utils";
import {
  BrainCircuit,
  MessageSquare,
  MoveRight,
  Pencil,
  ShieldCheck,
  TabletSmartphone,
  User,
  Users,
  X,
} from "lucide-react";
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
        <div className="flex flex-col items-center justify-center text-center">
          <GradientBadge variant="normal">
            <TabletSmartphone size={14} />
            <span>MotionMix is Now Open for Everyone</span>
          </GradientBadge>
          <h1 className="mt-2 text-6xl font-light text-foreground">
            Supercharge Your 3D App
          </h1>
          <h2 className="text-6xl font-semibold text-motionmix leading-normal">
            Visualize, Analyze, Optimize
          </h2>
          <p className="text-foreground mt-4">
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
              href="/how-it-works"
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
          <h3 className="text-4xl font-semibold leading-tight text-center">
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

      {/* VISION SECTION */}
      <CardSpotlight className="border-none mt-20 py-16">
        <MaxWidthWrapper className="w-full">
          <div className="space-y-5">
            <div className="flex items-center space-x-4">
              <div className="relative w-10 aspect-square">
                <Image
                  src={"/assets/logo_icon.svg"}
                  alt="MotionMix Logo"
                  fill
                />
              </div>
              <p className="text-motionmix text-bold text-4xl">VISION</p>
            </div>
            <h4 className="text-6xl text-muted-foreground leading-tight">
              We want to change how content is written and distributed.
            </h4>
            <h4 className="text-6xl text-foreground leading-tight">
              We want to build the best tools to help ambitious content
              teams-developers, marketers, bloggers, journalists-write better
              content, faster.
            </h4>
            <GradientBadge variant="normal">
              <Pencil size={14} />
              <span>Read more about our mission</span>
            </GradientBadge>
          </div>
        </MaxWidthWrapper>
      </CardSpotlight>

      {/* PRICING SECTION */}
      <MaxWidthWrapper className="w-full mt-20">
        <div>
          <div className="text-4xl font-semibold leading-tight text-center">
            <p className="bg-gradient-to-b from-purple-500 to-pink-500 text-transparent bg-clip-text">
              Pricing
            </p>
            <p className="text-muted-foreground text-base">
              Get started with a free Personal Account, or a Team with{" "}
              <span className="text-foreground">unlimited members</span>.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 max-w-3xl mx-auto gap-10">
            {[
              {
                id: "personal",
                useType: "Personal Use",
                plan: "free",
                price: 0,
                features: [
                  {
                    icon: User,
                    title: "Personal Workspace",
                    color: "foreground",
                  },
                  {
                    icon: MessageSquare,
                    title: "Discord Support",
                    color: "foreground",
                  },
                  {
                    icon: BrainCircuit,
                    title: "AI Assistant",
                    color: "foreground",
                  },
                ],
                descriptiveFeatures: [
                  `<p>375 Blocks, <span class="text-muted-foreground">then $2.5 per 125</span></p>`,
                  `<p>75K API Requests, <span class="text-muted-foreground">then $2.5 per 25K</span></p>`,
                ],
                ctaText: "Get Started For Free",
                infoContent: "No credit card required",
              },
              {
                id: "teams",
                useType: "Teams",
                plan: "teams",
                price: 49,
                features: [
                  {
                    icon: Users,
                    title: "Unlimited Members",
                    color: "gradient",
                  },
                  {
                    icon: MessageSquare,
                    title: "Discord + Slack Connect Support",
                    color: "foreground",
                  },
                  {
                    icon: BrainCircuit,
                    title: "AI Assistant",
                    color: "foreground",
                  },
                ],
                descriptiveFeatures: [
                  `<p>500 Blocks, <span class="text-muted-foreground">then $2.5 per 125</span></p>`,
                  `<p>100K API Requests, <span class="text-muted-foreground">then $2.5 per 25K</span></p>`,
                ],
                ctaText: "Create a Team",
                infoContent: "Payments secured by Stripe",
              },
            ].map((card, i) => {
              const isFreePlan = card.plan === "free";
              const Component = isFreePlan ? "div" : CardSpotlightBorder;
              return (
                <Component
                  key={card.id}
                  className={cn(
                    "p-6 rounded-xl divide-y divide-zinc-800 text-sm border border-zinc-800",
                    {
                      "bg-[#161616] shadow-[0_35px_60px_-15px_rgba(169,85,247,0.3)]":
                        !isFreePlan,
                    }
                  )}
                >
                  <div className="text-center pb-5">
                    <p>For {card.useType}</p>
                    <p className="text-4xl mt-4">
                      {isFreePlan ? (
                        "FREE"
                      ) : (
                        <span>
                          ${card.price}
                          <small className="text-base text-zinc-500">
                            {" "}
                            / month
                          </small>
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="py-5">
                    <ul className="space-y-3">
                      {card.features.map((feature) => (
                        <li
                          key={feature.title}
                          className={cn("flex items-center space-x-2", {
                            "text-purple-500": feature.color === "gradient",
                          })}
                        >
                          <feature.icon size={16} />
                          <span>{feature.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-5">
                    <ul className="space-y-3">
                      {card.descriptiveFeatures.map((feat) => (
                        <li
                          key={feat}
                          dangerouslySetInnerHTML={{ __html: feat }}
                        />
                      ))}
                    </ul>
                    <div className="mt-6 text-center">
                      <Button size="sm">{card.ctaText}</Button>
                      <p className="text-xs text-zinc-500 mt-2 flex items-center justify-center space-x-1">
                        {isFreePlan ? (
                          <X size={14} />
                        ) : (
                          <ShieldCheck size={14} />
                        )}{" "}
                        <span>{card.infoContent}</span>
                      </p>
                    </div>
                  </div>
                </Component>
              );
            })}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Home;
