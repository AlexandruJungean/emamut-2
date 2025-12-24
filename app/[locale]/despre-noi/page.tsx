import { Metadata } from 'next'
import Image from 'next/image'
import { type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { Card } from '@/components/ui'
import { QuoteForm } from '@/components/sections/QuoteForm'
import { Zap, Shield, MessageSquare, Shuffle } from 'lucide-react'

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params
  
  const titles: Record<string, string> = {
    ro: 'Despre Noi - Emamut Security Solutions',
    hu: 'Rólunk - Emamut Biztonsági Megoldások',
    en: 'About Us - Emamut Security Solutions',
  }

  return {
    title: titles[locale] || titles.ro,
  }
}

const iconMap = {
  speed: Zap,
  reliability: Shield,
  communication: MessageSquare,
  flexibility: Shuffle,
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale as Locale)

  const values = dictionary.about.values.items

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

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h1 className="heading-xl text-center mb-4 heading-underline">
            {dictionary.about.title}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-text-dark mb-6">
              {dictionary.about.intro}
            </h2>
            
            <div className="prose prose-lg max-w-none text-text-body space-y-4">
              <p>{dictionary.about.description1}</p>
              <p>{dictionary.about.description2}</p>
              <p>
                <strong>{dictionary.about.description3}</strong>
              </p>
              <p>
                <strong>{dictionary.about.stats}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Image */}
      <section className="pb-16 bg-white">
        <div className="container-custom">
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/images/team.webp"
              alt="Echipa Emamut"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-bg-light">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-12">
            {dictionary.about.values.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value: { title: string; description: string }, index: number) => {
              const icons = [Zap, Shield, MessageSquare, Shuffle]
              const Icon = icons[index % icons.length]
              
              return (
                <Card key={index} variant="bordered" hover={false} className="text-center bg-white">
                  <div className="flex flex-col items-center">
                    <div className="mb-4 p-4 rounded-full bg-primary/5">
                      <Icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-text-dark mb-3">
                      {value.title}
                    </h3>
                    <p className="text-text-muted text-sm">
                      {value.description}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <QuoteForm
        title={dictionary.home.quote.title}
        dictionary={quoteFormDict}
        image="/images/modern-office.webp"
      />
    </>
  )
}

