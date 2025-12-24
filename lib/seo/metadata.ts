import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'

const siteConfig = {
  name: 'Emamut',
  url: 'https://emamut.ro',
  ogImage: '/images/og-image.jpg',
  description: {
    ro: 'Sisteme complete de securitate pentru locuințe și afaceri. Supraveghere video, alarme, control acces, interfoane și detecție incendiu. Experiență din 2010.',
    en: 'Complete security systems for homes and businesses. Video surveillance, alarms, access control, intercoms and fire detection. Experience since 2010.',
    hu: 'Teljes körű biztonsági rendszerek otthonok és vállalkozások számára. Videómegfigyelés, riasztók, beléptető rendszer, kaputelefonok és tűzjelzés. Tapasztalat 2010 óta.',
  },
  keywords: {
    ro: 'sisteme securitate, camere supraveghere, alarme, control acces, interfoane, detectie incendiu, Salonta, Bihor, Oradea',
    en: 'security systems, surveillance cameras, alarms, access control, intercoms, fire detection, Romania',
    hu: 'biztonsági rendszerek, megfigyelő kamerák, riasztók, beléptető rendszer, kaputelefonok, tűzjelzés, Románia',
  },
}

export function generatePageMetadata(
  locale: Locale,
  page: {
    title: string
    description: string
    path: string
    image?: string
    noIndex?: boolean
  }
): Metadata {
  const url = `${siteConfig.url}/${locale}${page.path}`
  
  return {
    title: `${page.title} | ${siteConfig.name}`,
    description: page.description,
    keywords: siteConfig.keywords[locale],
    authors: [{ name: 'Emamut SRL' }],
    creator: 'Emamut SRL',
    publisher: 'Emamut SRL',
    robots: page.noIndex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: url,
      languages: {
        'ro': `${siteConfig.url}/ro${page.path}`,
        'en': `${siteConfig.url}/en${page.path}`,
        'hu': `${siteConfig.url}/hu${page.path}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ro' ? 'ro_RO' : locale === 'hu' ? 'hu_HU' : 'en_US',
      url,
      title: `${page.title} | ${siteConfig.name}`,
      description: page.description,
      siteName: siteConfig.name,
      images: [
        {
          url: page.image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} | ${siteConfig.name}`,
      description: page.description,
      images: [page.image || siteConfig.ogImage],
    },
  }
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Emamut - Sisteme de Securitate | Supraveghere Video, Alarme, Control Acces',
    template: '%s | Emamut',
  },
  description: siteConfig.description.ro,
  keywords: siteConfig.keywords.ro,
  authors: [{ name: 'Emamut SRL' }],
  creator: 'Emamut SRL',
  publisher: 'Emamut SRL',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: siteConfig.url,
    title: 'Emamut - Sisteme de Securitate',
    description: siteConfig.description.ro,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Emamut - Sisteme de Securitate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emamut - Sisteme de Securitate',
    description: siteConfig.description.ro,
    images: [siteConfig.ogImage],
  },
  verification: {
    // Add these when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export { siteConfig }

