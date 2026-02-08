import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function paginate<T extends object>(data: T[], page: number, size: number, total: number): T[] {
  const start = Math.max(0, (page - 1) * size);
  const end = Math.min(start + size, total);
  return data.slice(start, end);
}
