"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode, useRef, useState } from "react";

const CardSpotlightBorder = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  const divRef = useRef<HTMLInputElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <>
      <div className="relative w-full">
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          // className="h-12 w-full cursor-default rounded-md border border-gray-800 bg-gray-950 p-3.5 text-gray-100 transition-colors duration-500 placeholder:select-none placeholder:text-gray-500 focus:border-[#8678F9] focus:outline-none"
          className={cn("w-full h-full duration-200 delay-100", className)}
        >
          {children}
        </div>
        <div
          ref={divRef}
          style={{
            border: "1px solid #a955f7",
            opacity,
            WebkitMaskImage: `radial-gradient(100% 150px at ${position.x}px ${position.y}px, black 45%, transparent)`,
          }}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full cursor-default rounded-md border border-purple-500 bg-[transparent] p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none"
        />
      </div>
    </>
  );
};

export default CardSpotlightBorder;
