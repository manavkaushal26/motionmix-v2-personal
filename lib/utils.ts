import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { imageKit } from "./globalConfig";

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
