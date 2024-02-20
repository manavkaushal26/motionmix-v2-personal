"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AuthButton from "../global/AuthButton";
import MaxWidthWrapper from "../global/MaxWidthWrapper";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 50; // Adjust scroll threshold as needed
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-5 w-full z-50 duration-200 ease-in-out bg-transparent`}
    >
      <MaxWidthWrapper maxWidth="md">
        <div className="bg-black rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 py-2 px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <Image
                src={"/assets/logo_icon.svg"}
                alt="MotionMix Logo"
                width={50}
                height={50}
              />
            </Link>

            {/* Login/Signup */}
            <div className="flex items-center space-x-4">
              <AuthButton type="login" size="sm" />
              {/* <ModeToggle /> */}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Header;
