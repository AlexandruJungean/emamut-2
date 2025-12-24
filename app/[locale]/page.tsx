import { Metadata } from 'next'
import { locales, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { Hero } from '@/components/sections/Hero'
import { ServiceCards } from '@/components/sections/ServiceCards'
import { TrustSection } from '@/components/sections/TrustSection'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { FAQ } from '@/components/sections/FAQ'
import { QuoteForm } from '@/components/sections/QuoteForm'
import { BlogPosts } from '@/components/sections/BlogPosts'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params
  
  const titles: Record<string, string> = {
    ro: 'Emamut - Sisteme de Securitate | Supraveghere Video, Alarme, Control Acces',
    hu: 'Emamut - Biztonsági Rendszerek | Videómegfigyelés, Riasztók, Beléptető Rendszerek',
    en: 'Emamut - Security Systems | Video Surveillance, Alarms, Access Control',
  }

  const descriptions: Record<string, string> = {
    ro: 'Emamut oferă soluții complete de securitate: sisteme supraveghere video, alarme antiefracție, control acces. 15+ ani experiență. Salonta, Bihor.',
    hu: 'Az Emamut teljes körű biztonsági megoldásokat kínál: videómegfigyelés, riasztórendszerek, beléptető rendszerek. 15+ év tapasztalat.',
    en: 'Emamut offers complete security solutions: video surveillance, anti-theft alarms, access control. 15+ years of experience.',
  }

  return {
    title: titles[locale] || titles.ro,
    description: descriptions[locale] || descriptions.ro,
    alternates: {
      canonical: `https://emamut.ro/${locale}`,
      languages: {
        'ro': 'https://emamut.ro/ro',
        'hu': 'https://emamut.ro/hu',
        'en': 'https://emamut.ro/en',
      },
    },
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale as Locale)

  // Hero slides data
  const heroSlides = dictionary.home.hero.slides.map((slide: {
    title: string
    subtitle: string
    destinations: string[]
    ctaText: string
  }, index: number) => ({
    image: `/images/hero-${index + 1}.webp`,
    title: slide.title,
    subtitle: slide.subtitle,
    destinations: slide.destinations,
    ctaText: slide.ctaText,
    ctaHref: `/${locale}/servicii`,
  }))

  // Service cards data
  const serviceCards = dictionary.home.services.items.map((item: {
    icon: string
    title: string
    description: string
  }) => ({
    icon: item.icon as 'home' | 'camera' | 'bell' | 'phone',
    title: item.title,
    description: item.description,
    href: `/${locale}/servicii`,
  }))

  // Trust section stats
  const trustStats = dictionary.home.trust.stats

  // Why choose us features
  const whyUsFeatures = dictionary.home.whyUs.features.map((feature: {
    icon: string
    title: string
    description: string
  }) => ({
    icon: feature.icon as 'wrench' | 'award' | 'message' | 'zap',
    title: feature.title,
    description: feature.description,
  }))

  // FAQ items
  const faqItems = dictionary.home.faq.items

  // Quote form dictionary
  const quoteFormDict = {
    clientType: dictionary.home.quote.clientType,
    clientTypeOptions: dictionary.home.quote.clientTypeOptions,
    serviceType: dictionary.home.quote.serviceType,
    serviceTypeOptions: dictionary.home.quote.serviceTypeOptions,
    systemSize: dictionary.home.quote.systemSize,
    systemSizeOptions: dictionary.home.quote.systemSizeOptions,
    name: dictionary.home.quote.name,
    email: dictionary.home.quote.email,
    phone: dictionary.home.quote.phone,
    county: dictionary.home.quote.county,
    city: dictionary.home.quote.city,
    message: dictionary.home.quote.message,
    messagePlaceholder: dictionary.home.quote.messagePlaceholder,
    submit: dictionary.home.quote.submit,
    submitting: dictionary.home.quote.submitting,
    success: dictionary.home.quote.success,
    error: dictionary.home.quote.error,
  }

  // Mock blog posts (will be replaced with real data from Supabase)
  const blogPosts = [
    {
      slug: 'instalare-camere-supraveghere-santandrei',
      title: 'Instalare camere supraveghere Sântandrei – Protecție modernă pentru case și afaceri',
      excerpt: 'Sântandrei este una dintre cele mai dinamice și căutate zone rezidențiale din apropierea Oradiei.',
      image: '/images/residential-installation.webp',
      date: 'noiembrie 13, 2025',
    },
    {
      slug: 'instalare-camere-supraveghere-valea-lui-mihai',
      title: 'Instalare camere supraveghere Valea lui Mihai – Siguranță pentru locuințe și spații comerciale',
      excerpt: 'Într-un oraș în continuă dezvoltare precum Valea lui Mihai, siguranța locuinței sau afacerii tale nu este doar un avantaj.',
      image: '/images/commercial-building.webp',
      date: 'noiembrie 13, 2025',
    },
    {
      slug: 'instalare-camere-supraveghere-sacueni',
      title: 'Instalare Camere Supraveghere Săcueni – Protecție Inteligentă pentru Locuințe și Afaceri',
      excerpt: 'Ai nevoie de un sistem de securitate eficient pentru casa sau afacerea ta din Săcueni?',
      image: '/images/retail-store.webp',
      date: 'iulie 7, 2025',
    },
  ]

  return (
    <>
      <Hero slides={heroSlides} locale={locale} />
      
      <ServiceCards services={serviceCards} locale={locale} />
      
      <TrustSection
        title={dictionary.home.trust.title}
        description={dictionary.home.trust.description}
        ctaText={dictionary.home.trust.ctaText}
        ctaHref={`/${locale}/contact`}
        stats={trustStats}
      />
      
      <FAQ title={dictionary.home.faq.title} items={faqItems} />
      
      <WhyChooseUs
        title={dictionary.home.whyUs.title}
        features={whyUsFeatures}
      />
      
      <QuoteForm
        title={dictionary.home.quote.title}
        dictionary={quoteFormDict}
        image="/images/team.webp"
      />
      
      <BlogPosts
        title={dictionary.home.blog.title}
        posts={blogPosts}
        locale={locale}
        viewAllText={dictionary.home.blog.viewAll}
        readMoreText={dictionary.home.blog.readMore}
      />
    </>
  )
}

