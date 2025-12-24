export const locales = ['ro', 'hu', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'ro'

export const localeNames: Record<Locale, string> = {
  ro: 'Română',
  hu: 'Magyar',
  en: 'English',
}

// Note: Flag emojis don't work on Windows, use FlagIcon component instead

export const localeCodes: Record<Locale, string> = {
  ro: 'RO',
  hu: 'HU',
  en: 'EN',
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

