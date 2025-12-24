import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { Button } from '@/components/ui'
import { Check } from 'lucide-react'

interface ServicesPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params
  
  const titles: Record<string, string> = {
    ro: 'Servicii - Emamut Security Solutions',
    hu: 'Szolgáltatások - Emamut Biztonsági Megoldások',
    en: 'Services - Emamut Security Solutions',
  }

  return {
    title: titles[locale] || titles.ro,
  }
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale as Locale)

  return (
    <>
      {/* Title Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h1 className="heading-xl text-center mb-8 heading-underline">
            {dictionary.services.pageTitle}
          </h1>
          
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg font-semibold text-text-dark mb-4">
              {dictionary.services.intro}
            </p>
            <p className="text-text-body mb-4">
              {dictionary.services.description}
            </p>
            <p className="text-text-body">
              {dictionary.services.equipment}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dictionary.services.categories.map((category: {
              title: string
              subtitle: string
              image: string
              href: string
            }, index: number) => (
              <Link
                key={index}
                href={`/${locale}${category.href}`}
                className="group relative h-[350px] rounded-2xl overflow-hidden"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                  <p className="text-gray-300 mb-4">{category.subtitle}</p>
                  <Button variant="primary" size="sm">
                    {dictionary.services.cta}
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-bg-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-center mb-8">
              {dictionary.services.whyUs.title}
            </h2>
            <ul className="space-y-4">
              {dictionary.services.whyUs.items.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-text-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

