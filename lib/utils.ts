import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { imageKit } from "./globalConfig";
import { Role } from "./enums";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageKitUrl(src: string, type: "image" | "other" = "image") {
  return type === "image"
    ? `${imageKit.baseDeliveryUrl.image}${src}`
    : `${imageKit.baseDeliveryUrl.otherFiles}${src}`;
}

export function getInitials(name: string): string {
  const words = name.split(" ");
  let initials = "";
  for (const word of words) {
    if (word.length > 0) {
      initials += word[0].toUpperCase();
    }
  }
  return initials;
}

export function formatSeconds(
  seconds: number,
  format: "default" | "mm:ss" | "h:m:s" = "default"
) {
  if (seconds === 0 && format === "default") return `0s`;
  if (seconds === 0 && format === "mm:ss") return `00:00`;
  if (seconds === 0 && format === "h:m:s") return `0h 0m 0s`;

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let result = "";

  if (format === "mm:ss") {
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
    result = `${formattedMinutes}:${formattedSeconds}`;
  } else if (format === "h:m:s") {
    result = `${hours}h ${minutes}m ${remainingSeconds}s`;
  } else {
    if (hours > 0) {
      result += `${hours}h `;
    }

    if (minutes > 0) {
      result += `${minutes}m `;
    }

    if (remainingSeconds > 0) {
      result += `${remainingSeconds}s`;
    }
  }

  return result;
}

export function formatNumber(number: number) {
  return new Intl.NumberFormat().format(number);
}

export const copyTextToClipboard = async (text: string) => {
  try {
    if (!navigator.clipboard) {
      // For older browsers or if clipboard API is not supported
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      try {
        const successful = document.execCommand("copy");
        const message = successful ? "successful" : "unsuccessful";
      } catch (err) {
        console.error("Unable to copy:", err);
      } finally {
        document.body.removeChild(textarea);
      }
    } else {
      // For modern browsers supporting Clipboard API
      await navigator.clipboard.writeText(text);
    }
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export function isAdmin(role: Role) {
  if (role.toLowerCase() === Role.Admin || role.toLowerCase() === Role.Owner) {
    return true;
  }
  return false;
}
