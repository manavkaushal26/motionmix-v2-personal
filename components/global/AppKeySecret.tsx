import { ClipboardType } from "lucide-react";
import CardSpotlight from "../global/CardSpotlight";
import PasswordInput from "../global/PasswordInput";
import { CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = { appKey: string; appSecret: string };

const AppKeySecret = ({ appKey, appSecret }: Props) => {
  return (
    <CardSpotlight>
      <CardContent className="p-6 grid grid-cols-1 gap-6 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <Label className="text-muted-foreground">App ID</Label>
          <Input Icon={ClipboardType} value={appKey} readOnly />
        </div>

        <div className="sm:col-span-3">
          <Label className="text-muted-foreground">App Secret</Label>
          <PasswordInput type="password" value={appSecret} readOnly />
        </div>
      </CardContent>
    </CardSpotlight>
  );
};

export default AppKeySecret;
