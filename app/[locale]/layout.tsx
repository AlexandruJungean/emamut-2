import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/common/WhatsAppButton'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const dictionary = await getDictionary(locale as Locale)

  // Build the header dictionary
  const headerDictionary = {
    nav: dictionary.common.nav,
    cta: dictionary.common.cta,
    services: dictionary.common.services,
  }

  // Build the footer dictionary
  const footerDictionary = {
    footer: dictionary.common.footer,
    services: dictionary.common.services,
    nav: dictionary.common.nav,
  }

  return (
    <>
      <Header locale={locale} dictionary={headerDictionary} />
      <main className="pt-20">{children}</main>
      <Footer locale={locale} dictionary={footerDictionary} />
      <WhatsAppButton 
        phoneNumber="+40735777296" 
        tooltipText={dictionary.common.whatsapp?.tooltip || "Aveți nevoie de ajutor? Chat rapid"}
      />
    </>
  )
}

