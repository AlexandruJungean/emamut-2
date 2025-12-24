import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { Card, Button } from '@/components/ui'
import { MapPin, Briefcase, ArrowRight } from 'lucide-react'

interface CareerPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: CareerPageProps): Promise<Metadata> {
  const { locale } = await params
  
  return {
    title: locale === 'ro' ? 'Carieră - Emamut Security Solutions' : 'Career - Emamut',
  }
}

export default async function CareerPage({ params }: CareerPageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale as Locale)

  const positions = dictionary.career.positions

  return (
    <>
      {/* Hero */}
      <section className="relative h-[400px]">
        <Image
          src="/images/team.webp"
          alt="Echipa Emamut"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {dictionary.career.title}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              {dictionary.career.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <p className="text-lg text-text-body text-center max-w-3xl mx-auto">
            {dictionary.career.description}
          </p>
        </div>
      </section>

      {/* Open Positions */}
      <section className="pb-16 bg-white">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-12">
            {dictionary.career.openPositions}
          </h2>

          {positions.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {positions.map((position: {
                slug: string
                title: string
                type: string
                location: string
                description: string
              }) => (
                <Card key={position.slug} variant="bordered" hover={true}>
                  <div className="flex flex-col h-full">
                    <h3 className="text-xl font-bold text-text-dark mb-2">
                      {position.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-text-muted">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {position.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                    </div>

                    <p className="text-text-body mb-6 flex-grow">
                      {position.description}
                    </p>

                    <Link href={`/${locale}/cariera/${position.slug}`}>
                      <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                        {dictionary.career.apply}
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-muted text-lg">
                {dictionary.career.noPositions}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

