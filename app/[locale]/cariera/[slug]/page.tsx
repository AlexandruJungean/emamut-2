import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { Button, Card } from '@/components/ui'
import { MapPin, Briefcase, ArrowLeft, Check, Mail } from 'lucide-react'

interface CareerPositionPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: CareerPositionPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const dictionary = await getDictionary(locale as Locale)
  
  const position = dictionary.career.positions.find(
    (p: { slug: string }) => p.slug === slug
  )
  
  if (!position) {
    return { title: 'Position Not Found' }
  }

  return {
    title: `${position.title} - Carieră Emamut`,
    description: position.description,
  }
}

export default async function CareerPositionPage({ params }: CareerPositionPageProps) {
  const { locale, slug } = await params
  const dictionary = await getDictionary(locale as Locale)
  
  const position = dictionary.career.positions.find(
    (p: { slug: string }) => p.slug === slug
  )
  
  if (!position) {
    notFound()
  }

  return (
    <>
      {/* Header */}
      <section className="section-padding bg-bg-light">
        <div className="container-custom">
          <Link
            href={`/${locale}/cariera`}
            className="inline-flex items-center gap-2 text-primary mb-6 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi la posturi
          </Link>

          <h1 className="heading-xl mb-4">{position.title}</h1>
          
          <div className="flex flex-wrap gap-4 text-text-muted">
            <span className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              {position.type}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {position.location}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2>Descrierea postului</h2>
                <p>{position.description}</p>

                <h2>Cerințe</h2>
                <ul>
                  {position.requirements.map((req: string, index: number) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>

                <h2>Beneficii</h2>
                <ul>
                  {position.benefits.map((benefit: string, index: number) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card variant="bordered" hover={false} className="sticky top-24">
                <h3 className="font-bold text-lg mb-4">Aplică pentru acest post</h3>
                <p className="text-text-muted mb-6">
                  Trimite-ne CV-ul și o scrisoare de intenție la adresa de email de mai jos.
                </p>

                <a
                  href="mailto:contact@emamut.ro?subject=Aplicație pentru postul de: {{position.title}}"
                  className="block"
                >
                  <Button variant="primary" className="w-full" leftIcon={<Mail className="w-4 h-4" />}>
                    Trimite CV
                  </Button>
                </a>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-text-muted">
                    Email: <a href="mailto:contact@emamut.ro" className="text-primary hover:underline">contact@emamut.ro</a>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

