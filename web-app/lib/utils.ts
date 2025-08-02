import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function newPage(pageNumber: number) {
  return {
    contents: "",
    pageName: `Page ${pageNumber}`,
    "4x3": null,
    "16x9": null,
    "16x10": null,
  }
}
