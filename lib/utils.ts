import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  return dateString;
  // if (dateString==='-') return '-';
  // return new Date(dateString).toLocaleDateString('en-US', {
  //   year: 'numeric',
  //   month: 'short',
  //   day: 'numeric',
  // });
}
export function formatPrice(price: number | null): string {
  if (price === null || isNaN(price)) return '-';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function formatPercentage(percentage: number | null): string {
  if (percentage === null) return 'N/A';
  return `${percentage}%`;
}
