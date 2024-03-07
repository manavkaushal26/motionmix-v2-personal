import CardSpotlight from "@/components/global/CardSpotlight";
import CardSpotlightBorder from "@/components/global/CardSpotlightBorder";
import GradientBadge from "@/components/global/GradientBadge";
import MaxWidthWrapper from "@/components/global/MaxWidthWrapper";
import HeroCanvas from "@/components/site/HeroCanvas";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/authOptions";
import { cn } from "@/lib/utils";
import {
  BrainCircuit,
  CaptionsOff,
  MessageSquare,
  MessagesSquare,
  MoveRight,
  Pencil,
  ShieldCheck,
  TabletSmartphone,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Home = async () => {
  const session = await auth();

  return (
    <div>
      <div className="relative h-screen w-full">
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
                href={
                  !session ? "/signin?callbackUrl=/dashboard" : "/dashboard"
                }
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
      </div>
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
              <div className="z-10 flex w-full items-center justify-between p-4">
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
      <CardSpotlight className="flex items-center justify-center border-none mt-20 py-16">
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
              Lorem ipsum dolor, sit amet consectetur adipisicing.
            </h4>
            <h4 className="text-6xl text-foreground leading-tight">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet ex
              totam fugiat necessitatibus. Eos similique libero maxime.
            </h4>
            <GradientBadge variant="normal">
              <Pencil size={14} />
              <span>Read more about our mission</span>
            </GradientBadge>
          </div>
        </MaxWidthWrapper>
      </CardSpotlight>

      {/* TODO: ROADMAP SECTION */}

      {/* PRICING SECTION */}
      <MaxWidthWrapper className="w-full mt-20" id="pricing">
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
                    icon: MessagesSquare,
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
                      "bg-[#161616] shadow-[0_10px_60px_-30px_rgba(169,85,247,0.5)]":
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
                          <CaptionsOff size={14} />
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
          <div className="text-center mt-6 text-sm text-muted-foreground">
            <p>
              Are you an Alpha User? You&apos;ll be able to use MotionMix
              completely for free until{" "}
              <span className="text-foreground">23 May, 2024</span>.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>

      {/* FAQS */}
      <MaxWidthWrapper className="w-full mt-20" id="pricing">
        <div>
          <p className="text-4xl font-semibold leading-tight text-center">
            Frequently Asked Questions
          </p>
          <Accordion type="single" collapsible className="mt-10 space-y-4">
            {[
              {
                id: "q1",
                question:
                  "How does the platform track user interactions within a 3D app?",
                answer:
                  "Our platform utilizes advanced tracking mechanisms, including event tracking and data collection libraries, to monitor and capture user interactions in real-time within your 3D application.",
              },
              {
                id: "q2",
                question:
                  "Can I integrate the analytics platform into my existing 3D application?",
                answer:
                  "Absolutely! Our analytics platform provides easy-to-use SDKs and integration guides, allowing seamless integration with your existing 3D application across various platforms and frameworks.",
              },
              {
                id: "q3",
                question: "Will the integration slow down my App's performance",
                answer:
                  "No, integrating MotionMix won't affect your App's performance. Our SDK transmits data in Kbs for each recorded session and all the heavy lifting is done at our end.",
              },
              {
                id: "q4",
                question:
                  "What kind of insights can I gain from the recorded sessions feature?",
                answer:
                  "The recorded sessions feature enables you to replay and analyze actual user sessions, gaining deep insights into user behavior, navigation patterns, feature usage, and any obstacles or challenges users encounter during their app journey.",
              },
              {
                id: "q5",
                question:
                  "How do heatmaps help in optimizing my 3D app's performance?",
                answer:
                  "Heatmaps provide visual representations of user engagement and interaction patterns within your 3D app. By analyzing heatmaps, you can identify popular areas, interaction hotspots, and potential usability issues, helping you optimize the app's performance, user interface, and overall user experience.",
              },
              {
                id: "q6",
                question:
                  "Is my users' data and privacy protected with your analytics platform?",
                answer:
                  "Yes, data privacy and security are our top priorities. We adhere to strict data protection protocols and ensure that all user data is anonymized and securely stored. We also provide customizable privacy settings, allowing you to control the data collection and comply with privacy regulations.",
              },
            ].map((faq, i) => {
              return (
                <AccordionItem key={faq.id} value={faq.id}>
                  <Card>
                    <CardContent className="p-0 px-4">
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </CardContent>
                  </Card>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Home;
