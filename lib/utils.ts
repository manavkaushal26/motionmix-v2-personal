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
