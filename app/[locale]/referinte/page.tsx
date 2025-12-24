import { Metadata } from 'next'
import Image from 'next/image'
import { type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { Card } from '@/components/ui'

interface ReferencesPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ReferencesPageProps): Promise<Metadata> {
  const { locale } = await params
  
  return {
    title: locale === 'ro' ? 'Referințe - Emamut Security Solutions' : 'References - Emamut',
  }
}

// Mock project data (would come from CMS/Supabase in production)
const projects = [
  {
    id: 1,
    title: 'Sistem supraveghere complex rezidențial',
    category: 'Rezidențial',
    image: '/images/residential-installation.webp',
  },
  {
    id: 2,
    title: 'Securitate clădire birouri',
    category: 'Comercial',
    image: '/images/commercial-building.webp',
  },
  {
    id: 3,
    title: 'Sistem antiefracție magazin retail',
    category: 'Retail',
    image: '/images/retail-store.webp',
  },
  {
    id: 4,
    title: 'Supraveghere depozit logistic',
    category: 'Industrial',
    image: '/images/warehouse.webp',
  },
  {
    id: 5,
    title: 'Control acces birou modern',
    category: 'Comercial',
    image: '/images/modern-office.webp',
  },
  {
    id: 6,
    title: 'Sistem integrat atelier tehnic',
    category: 'Industrial',
    image: '/images/technical-workshop.webp',
  },
]

// Media gallery images
const mediaImages = [
  '/images/media/260406473_4460893333947366_7473312307142176474_n-708x1024.webp',
  '/images/media/276028104_4857235784313117_6950281578202732512_n.webp',
  '/images/media/300621551_537090204875450_8778421308840228138_n-1024x516.webp',
  '/images/media/302527607_544111704173300_1287084132434775137_n-819x1024.webp',
  '/images/media/57411817_2099792900057433_8634688250008567808_n-1024x576.webp',
  '/images/media/Dulap-de-date-curenti-slabi-1-1024x1024.webp',
]

export default async function ReferencesPage({ params }: ReferencesPageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale as Locale)

  return (
    <>
      {/* Title */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h1 className="heading-xl text-center mb-4 heading-underline">
            {dictionary.references.title}
          </h1>
          <p className="text-center text-text-muted text-lg max-w-2xl mx-auto">
            {dictionary.references.description}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-16 bg-white">
        <div className="container-custom">
          <h2 className="heading-md mb-8">{dictionary.references.subtitle}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} variant="default" hover={true} padding="none" className="overflow-hidden group">
                <div className="relative h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform">
                    <span className="text-xs font-medium text-primary mb-1 block">
                      {project.category}
                    </span>
                    <h3 className="font-bold">{project.title}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Gallery */}
      <section className="section-padding bg-bg-light">
        <div className="container-custom">
          <h2 className="heading-md mb-8 text-center">Galerie foto</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaImages.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
                <Image
                  src={image}
                  alt={`Proiect ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

