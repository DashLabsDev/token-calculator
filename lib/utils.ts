import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value < 0.01 ? 4 : 2,
    maximumFractionDigits: value < 0.01 ? 6 : 2,
  }).format(value);
}

export function formatCompactCurrency(value: number) {
  if (value < 0.01) return `${formatCurrency(value)} per request`;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 2,
  }).format(value);
}

export function estimateTokens(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  const chars = trimmed.length;
  const words = trimmed.split(/\s+/).length;
  return Math.max(1, Math.round(chars / 4 + words * 0.08));
}
