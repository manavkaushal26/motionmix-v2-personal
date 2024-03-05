"use client";

import { Eye, EyeOff, KeyRound } from "lucide-react";
import { useState } from "react";
import { Input, InputProps } from "../ui/input";

interface Props extends InputProps {}

const PasswordInput = (props: Props) => {
  const { type, ...rest } = props;
  const [showSecret, setShowSecret] = useState<boolean>(false);

  return (
    <div className="relative">
      <Input type={showSecret ? "text" : type} Icon={KeyRound} {...rest} />
      {showSecret ? (
        <EyeOff
          size={18}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground cursor-pointer"
          onClick={() => setShowSecret(false)}
        />
      ) : (
        <Eye
          size={18}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground cursor-pointer"
          onClick={() => setShowSecret(true)}
        />
      )}
    </div>
  );
};

export default PasswordInput;
