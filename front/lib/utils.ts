import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ErrorResponse {
  timestamp: number;
  message: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
