import type { Locale } from './config'
import type { Dictionary } from './types'

const dictionaries = {
  ro: () => import('./dictionaries/ro.json').then((module) => module.default as unknown as Dictionary),
  hu: () => import('./dictionaries/hu.json').then((module) => module.default as unknown as Dictionary),
  en: () => import('./dictionaries/en.json').then((module) => module.default as unknown as Dictionary),
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]()
}

export type { Dictionary }
