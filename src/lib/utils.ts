import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency = '₪') {
  return `${currency}${amount.toLocaleString()}`
}

export function getDifficultyColor(difficulty: string) {
  const map: Record<string, string> = {
    Easy: 'text-green-400 bg-green-400/10 border-green-400/20',
    Moderate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    Challenging: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    Extreme: 'text-red-400 bg-red-400/10 border-red-400/20',
  }
  return map[difficulty] ?? 'text-gray-400'
}
