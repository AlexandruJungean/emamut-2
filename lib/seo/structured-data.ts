import type { Locale } from '@/lib/i18n/config'

// Organization Schema
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://emamut.ro/#organization',
    name: 'Emamut SRL',
    alternateName: 'Emamut Security Solutions',
    url: 'https://emamut.ro',
    logo: {
      '@type': 'ImageObject',
      url: 'https://emamut.ro/logo.webp',
      width: 180,
      height: 56,
    },
    image: 'https://emamut.ro/images/og-image.jpg',
    description: 'Sisteme complete de securitate pentru locuințe și afaceri. Supraveghere video, alarme, control acces, interfoane și detecție incendiu.',
    foundingDate: '2010',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Str. Horea nr. 26',
      addressLocality: 'Salonta',
      addressRegion: 'Bihor',
      postalCode: '415500',
      addressCountry: 'RO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 46.7975,
      longitude: 21.6558,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+40-735-777-296',
        contactType: 'customer service',
        availableLanguage: ['Romanian', 'Hungarian', 'English'],
        areaServed: 'RO',
      },
    ],
    sameAs: [
      'https://www.facebook.com/EmamutSRL',
    ],
  }
}

// Local Business Schema
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://emamut.ro/#localbusiness',
    name: 'Emamut SRL',
    image: 'https://emamut.ro/images/og-image.jpg',
    url: 'https://emamut.ro',
    telephone: '+40-735-777-296',
    email: 'contact@emamut.ro',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Str. Horea nr. 26',
      addressLocality: 'Salonta',
      addressRegion: 'Bihor',
      postalCode: '415500',
      addressCountry: 'RO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 46.7975,
      longitude: 21.6558,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
    },
  }
}

// Service Schema
export function getServiceSchema(service: {
  name: string
  description: string
  url: string
  image: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    image: service.image,
    provider: {
      '@type': 'Organization',
      name: 'Emamut SRL',
      url: 'https://emamut.ro',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Romania',
    },
    serviceType: 'Security Systems Installation',
  }
}

// FAQ Schema
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Breadcrumb Schema
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Blog Article Schema
export function getArticleSchema(article: {
  title: string
  description: string
  url: string
  image: string
  datePublished: string
  dateModified?: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || 'Emamut SRL',
      url: 'https://emamut.ro',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Emamut SRL',
      logo: {
        '@type': 'ImageObject',
        url: 'https://emamut.ro/logo.webp',
      },
    },
  }
}

// Job Posting Schema
export function getJobPostingSchema(job: {
  title: string
  description: string
  datePosted: string
  validThrough?: string
  employmentType: string
  location: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType: job.employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Emamut SRL',
      sameAs: 'https://emamut.ro',
      logo: 'https://emamut.ro/logo.webp',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Str. Horea nr. 26',
        addressLocality: job.location,
        addressRegion: 'Bihor',
        addressCountry: 'RO',
      },
    },
  }
}

// Website Schema with SearchAction
export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://emamut.ro/#website',
    name: 'Emamut',
    url: 'https://emamut.ro',
    description: 'Sisteme complete de securitate pentru locuințe și afaceri',
    publisher: {
      '@id': 'https://emamut.ro/#organization',
    },
    inLanguage: ['ro-RO', 'en-US', 'hu-HU'],
  }
}

// All Services List Schema
export function getServicesListSchema(locale: Locale) {
  const services = [
    {
      name: 'Sisteme Supraveghere Video',
      description: 'Camere HD, înregistrare și monitorizare de la distanță',
      url: `https://emamut.ro/${locale}/servicii/supraveghere-video`,
      image: 'https://emamut.ro/images/hero-1.webp',
    },
    {
      name: 'Sisteme Antiefracție',
      description: 'Centrale alarmă, senzori și avertizare în caz de efracție',
      url: `https://emamut.ro/${locale}/servicii/sisteme-antiefractie`,
      image: 'https://emamut.ro/images/hero-2.webp',
    },
    {
      name: 'Rețele Date / Voce / TV / Wi-Fi',
      description: 'Cablare structurată, Wi-Fi și rețele voce/TV',
      url: `https://emamut.ro/${locale}/servicii/retele-date`,
      image: 'https://emamut.ro/images/hero-3.webp',
    },
    {
      name: 'Control Acces / Pontaj',
      description: 'Carduri, biometrie și pontaj pentru gestionarea accesului',
      url: `https://emamut.ro/${locale}/servicii/control-acces`,
      image: 'https://emamut.ro/images/commercial-building.webp',
    },
    {
      name: 'Interfoane / Videointerfoane',
      description: 'Sisteme audio și video pentru identificare vizitatori',
      url: `https://emamut.ro/${locale}/servicii/interfoane`,
      image: 'https://emamut.ro/images/residential-installation.webp',
    },
    {
      name: 'Sisteme Detecție Incendiu',
      description: 'Sisteme de detectare și avertizare incendiu certificate',
      url: `https://emamut.ro/${locale}/servicii/detectie-incendiu`,
      image: 'https://emamut.ro/images/warehouse.webp',
    },
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Servicii Emamut',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: getServiceSchema(service),
    })),
  }
}

