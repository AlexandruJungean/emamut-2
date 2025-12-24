export { cn } from './cn'

/**
 * Format a date to a localized string
 */
export function formatDate(date: Date | string, locale: string = 'ro-RO'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  return phone.replace(/(\+40)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4')
}

/**
 * Delay utility for animations
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Generate staggered animation delay class
 */
export function getStaggerDelay(index: number, baseDelay: number = 100): string {
  const delayMs = index * baseDelay
  return `delay-${Math.min(delayMs, 800)}`
}

