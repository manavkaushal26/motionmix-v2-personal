import MaxWidthWrapper from "@/components/global/MaxWidthWrapper";
import Header from "@/components/site/Header";
import { ReactNode } from "react";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className="relative w-screen h-full min-h-screen flex flex-col items-center justify-center">
        <div className="hidden md:block absolute w-full max-h-2/5 min-h-3/4 opacity-100 h-2/4 left-1/2 blur-[150px] -translate-x-1/2 -z-1 pointer-events-none z-10">
          <div className="bg-gradient-blur-circle-3" />
          <div className="bg-gradient-blur-circle-2" />
          <div className="bg-gradient-blur-circle-1" />
        </div>
        <MaxWidthWrapper maxWidth="2xs" className="z-20 !p-4">
          {children}
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default Layout;
