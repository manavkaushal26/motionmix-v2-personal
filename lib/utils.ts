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
