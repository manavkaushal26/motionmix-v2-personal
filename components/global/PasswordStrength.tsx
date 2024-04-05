"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  password: string;
  setAllChecksPassed?: Dispatch<SetStateAction<boolean>>;
};

const passwordStrengthColors = {
  Weak: "bg-rose-500",
  Moderate: "bg-amber-500",
  Strong: "bg-emerald-500",
  "Very Strong": "bg-blue-500",
};

const PasswordStrength = ({ password, setAllChecksPassed }: Props) => {
  const [completedChecklist, setCompletedChecklist] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const updateChecklist = (password: string) => {
      const length = password.length >= 8;
      const uppercaseScore = /[A-Z]/.test(password);
      const lowercaseScore = /[a-z]/.test(password);
      const numberScore = /\d/.test(password);
      const symbolScore = /[^A-Za-z0-9]/.test(password);

      setCompletedChecklist([
        length,
        uppercaseScore,
        lowercaseScore,
        numberScore,
        symbolScore,
      ]);
    };

    updateChecklist(password);
  }, [password]);

  const calculateStrength = (password: string): string => {
    // const lengthScore = password.length >= 8 ? 1 : 0;
    const uppercaseScore = /[A-Z]/.test(password) ? 1 : 0;
    const lowercaseScore = /[a-z]/.test(password) ? 1 : 0;
    const numberScore = /\d/.test(password) ? 1 : 0;
    const symbolScore = /[^A-Za-z0-9]/.test(password) ? 1 : 0;

    const strengthScore =
      uppercaseScore + lowercaseScore + numberScore + symbolScore;
    switch (strengthScore) {
      // case 0:
      //   return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Moderate";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "";
    }
  };

  const strength = calculateStrength(password);
  const strengthIndex = Object.keys(passwordStrengthColors).indexOf(strength);

  // if (!password) {
  //   return null;
  // }

  const checklist = [
    "At least 8 characters long",
    "At least one uppercase letter",
    "At least one lowercase letter",
    "At least one digit",
    "At least one special character",
  ];

  useEffect(() => {
    if (setAllChecksPassed) {
      const allChecksPassed = completedChecklist.every((check) => check);
      setAllChecksPassed(allChecksPassed);
    }
  }, [completedChecklist, setAllChecksPassed]);

  return (
    <div className="text-right pt-2">
      <div className="flex items-center gap-x-2 w-full">
        {Object.keys(passwordStrengthColors).map((level, index) => (
          <div
            key={level}
            className={`bg-muted-foreground h-[2px] w-full rounded-full`}
          >
            <motion.div
              className={`h-full rounded-full ${
                index <= strengthIndex
                  ? // @ts-ignore
                    passwordStrengthColors[strength]
                  : "bg-transparent"
              }`}
              animate={{
                width: index <= strengthIndex ? "100%" : "0%",
              }}
            />
          </div>
        ))}
      </div>
      <p className="text-xs mt-1 cursor-pointer text-muted-foreground">
        {strength || "-"}
      </p>
      <ul className="text-left ist-inside text-xs text-muted-foreground">
        {checklist.map((item, index) => (
          <li key={index}>
            {completedChecklist[index] ? (
              <Check
                size={12}
                className={cn(
                  "inline",
                  completedChecklist[index] ? "text-emerald-500" : ""
                )}
              />
            ) : (
              <Circle size={12} className="inline" />
            )}{" "}
            <span
              className={completedChecklist[index] ? "text-emerald-500" : ""}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordStrength;
