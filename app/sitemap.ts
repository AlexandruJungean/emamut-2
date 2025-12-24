import { MetadataRoute } from 'next'

const baseUrl = 'https://emamut.ro'

const locales = ['ro', 'en', 'hu']

const staticPages = [
  '',
  '/despre-noi',
  '/servicii',
  '/servicii/supraveghere-video',
  '/servicii/sisteme-antiefractie',
  '/servicii/retele-date',
  '/servicii/control-acces',
  '/servicii/interfoane',
  '/servicii/detectie-incendiu',
  '/referinte',
  '/blog',
  '/ebook',
  '/cariera',
  '/contact',
  '/termeni-conditii',
  '/politica-confidentialitate',
  '/politica-cookies',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Generate entries for each locale and page
  for (const locale of locales) {
    for (const page of staticPages) {
      const url = `${baseUrl}/${locale}${page}`
      
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page === '/servicii' ? 0.9 : 0.8,
        alternates: {
          languages: {
            ro: `${baseUrl}/ro${page}`,
            en: `${baseUrl}/en${page}`,
            hu: `${baseUrl}/hu${page}`,
          },
        },
      })
    }
  }

  return entries
}

