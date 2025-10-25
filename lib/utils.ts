import { Media } from "@/payload-types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
  }).format(price);
}

 export const getCoverImageUrl = (coverImage: number | Media): string => {
    if (typeof coverImage === "number") {
      return "/abstract-book-cover.png"
    }
    return coverImage.url || coverImage.thumbnailURL || "/abstract-book-cover.png"
  }