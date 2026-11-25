import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

/** @param {...any} inputs */
export function cn(...inputs) {
  return twMerge(cx(inputs));
}
