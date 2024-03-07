"use client";

import { Eye, EyeOff, KeyRound } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input, InputProps } from "../ui/input";

interface Props extends InputProps {}

const PasswordInput = (props: Props) => {
  const { type, ...rest } = props;
  const [showSecret, setShowSecret] = useState<boolean>(false);

  return (
    <div className="relative">
      <Input type={showSecret ? "text" : type} Icon={KeyRound} {...rest} />
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="absolute top-1/2 right-0 -translate-y-1/2 text-muted-foreground hover:text-foreground rounded-l-none"
        onClick={() => setShowSecret((prev) => !prev)}
      >
        {showSecret ? (
          <EyeOff size={16} aria-hidden="true" />
        ) : (
          <Eye size={16} aria-hidden="true" />
        )}
      </Button>
    </div>
  );
};

export default PasswordInput;
