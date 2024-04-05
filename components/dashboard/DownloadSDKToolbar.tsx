"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/services/api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

type Props = {};

const sdkVersions = ["1.2.1", "1.0.9", "1.0.0"];

const DownloadSDKToolbar = (props: Props) => {
  const [percentage, setPercentage] = useState(0);
  const [version, setVersion] = useState(sdkVersions[1]);
  const fileName = `MotionMix_v${version}.unitypackage`;

  const downloadSdk = async () => {
    const preparingDownloadToast = toast.loading(`Preparing your download...`, {
      description: `version: v${version}`,
    });
    try {
      const res = await api.apisauce.get("/download/sdk", undefined, {
        timeout: 25000,
        responseType: "arraybuffer",
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setPercentage(percentage);
          }
        },
      });

      if (!res.ok) {
        toast.error(
          "Oops! Something went wrong while trying to get the file. Please try again later."
        );
      }

      const blob = new Blob([res.data as any], {
        type: "application/octet-stream",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.dismiss(preparingDownloadToast);
      toast.success("Your download is complete.");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error(
        "Oops! Something went wrong while trying to get the file. Please try again later."
      );
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Select value={version} onValueChange={(e) => setVersion(e)}>
        <SelectTrigger className="w-[180px] text-foreground">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sdkVersions.map((option, i) => (
            <SelectItem
              key={option}
              value={option}
              disabled={option !== sdkVersions[1]}
            >
              v{option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="secondary" onClick={downloadSdk}>
        Download
      </Button>
    </div>
  );
};

export default DownloadSDKToolbar;
