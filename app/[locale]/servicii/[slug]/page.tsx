import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { Button, Card } from '@/components/ui'
import { QuoteForm } from '@/components/sections/QuoteForm'
import { Check, ChevronRight } from 'lucide-react'

interface ServicePageProps {
  params: Promise<{ locale: string; slug: string }>
}

// Service data (would come from CMS/Supabase in production)
const servicesData: Record<string, {
  title: string
  description: string
  image: string
  features: string[]
  components: string[]
}> = {
  'supraveghere-video': {
    title: 'Sisteme Supraveghere Video',
    description: 'Supravegherea video este una dintre cele mai utilizate și eficiente metode de securitate. Oferim soluții complete HD, IP și analogice pentru orice tip de proprietate.',
    image: '/images/hero-1.webp',
    features: [
      'Monitorizare în timp real de pe telefon',
      'Înregistrare continuă 24/7',
      'Calitate HD și 4K',
      'Vedere pe timp de noapte',
      'Detectare mișcare inteligentă',
      'Stocare locală și cloud',
    ],
    components: [
      'Camere dome pentru interior',
      'Camere bullet pentru exterior',
      'DVR/NVR pentru înregistrare',
      'Hard disk-uri de supraveghere',
      'Switch-uri PoE',
      'Cabluri și conectori',
    ],
  },
  'sisteme-antiefractie': {
    title: 'Sisteme Antiefracție',
    description: 'Sistemele de alarmă antiefracție sunt esențiale pentru protecția locuinței și afacerii tale. Oferim centrale alarmă cu și fără fir, de la producători de top.',
    image: '/images/hero-2.webp',
    features: [
      'Alertare instantă pe telefon',
      'Conexiune la dispecerat 24/7',
      'Comunicator GSM/IP',
      'Baterie backup',
      'Armare/dezarmare de la distanță',
      'Istoric evenimente',
    ],
    components: [
      'Centrale alarmă',
      'Detectoare de mișcare',
      'Contacte magnetice',
      'Sirene interior/exterior',
      'Tastaturi LCD',
      'Telecomanda',
    ],
  },
  'retele-date': {
    title: 'Rețele Date / Voce / TV / Wi-Fi',
    description: 'Instalăm rețele de date structurate pentru birouri, locuințe și spații comerciale. Soluții complete de conectivitate.',
    image: '/images/hero-3.webp',
    features: [
      'Cablare structurată Cat5e/Cat6',
      'Rețele Wi-Fi profesionale',
      'Configurare routere și switch-uri',
      'Sisteme TV/cablu',
      'VoIP și telefonie',
      'Testare și certificare',
    ],
    components: [
      'Cabluri UTP/FTP',
      'Patch panel-uri',
      'Switch-uri managed',
      'Access point-uri Wi-Fi',
      'Routere enterprise',
      'Rack-uri și organizatoare',
    ],
  },
  'control-acces': {
    title: 'Control Acces / Pontaj',
    description: 'Sisteme moderne de control acces pentru gestionarea intrărilor și pontajul angajaților. Soluții cu card, cod PIN sau biometrie.',
    image: '/images/modern-office.webp',
    features: [
      'Acces cu card RFID',
      'Cititor de amprente',
      'Pontaj electronic',
      'Rapoarte de prezență',
      'Integrare cu alte sisteme',
      'Administrare de la distanță',
    ],
    components: [
      'Cititoare de carduri',
      'Controlere de acces',
      'Yale electromagnetice',
      'Butoane de ieșire',
      'Software de gestiune',
      'Carduri de acces',
    ],
  },
  'interfoane': {
    title: 'Interfoane / Videointerfoane',
    description: 'Sisteme de interfonie audio și video pentru case, apartamente și blocuri. Identificare vizuală a vizitatorilor înainte de a deschide ușa.',
    image: '/images/residential-installation.webp',
    features: [
      'Video color HD',
      'Comunicare bidirecțională',
      'Deschidere yală electrică',
      'Memorie fotografii/video',
      'Conectare la telefon mobil',
      'Instalare simplă',
    ],
    components: [
      'Post exterior cu cameră',
      'Monitor interior color',
      'Yale electrice',
      'Surse de alimentare',
      'Cabluri de conectare',
      'Accesorii montaj',
    ],
  },
  'detectie-incendiu': {
    title: 'Sisteme Detecție Incendiu',
    description: 'Sisteme de detectare și semnalizare incendiu certificate, conform normelor în vigoare. Protecție completă pentru clădiri și spații comerciale.',
    image: '/images/technical-workshop.webp',
    features: [
      'Detectare fum și căldură',
      'Alertare sonoră și vizuală',
      'Conexiune la pompieri',
      'Monitorizare 24/7',
      'Teste automate',
      'Conformitate cu normele ISU',
    ],
    components: [
      'Centrale de incendiu',
      'Detectoare de fum',
      'Detectoare de temperatură',
      'Butoane de panică',
      'Sirene de alarmare',
      'Indicatoare luminoase',
    ],
  },
}

const allServices = [
  { slug: 'supraveghere-video', title: 'Sisteme supraveghere video' },
  { slug: 'sisteme-antiefractie', title: 'Sisteme antiefracție' },
  { slug: 'retele-date', title: 'Rețele date' },
  { slug: 'control-acces', title: 'Control acces' },
  { slug: 'interfoane', title: 'Interfoane' },
  { slug: 'detectie-incendiu', title: 'Detecție incendiu' },
]

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = servicesData[slug]
  
  if (!service) {
    return { title: 'Service Not Found' }
  }

  return {
    title: `${service.title} - Emamut Security Solutions`,
    description: service.description,
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params
  const service = servicesData[slug]
  
  if (!service) {
    notFound()
  }

  const dictionary = await getDictionary(locale as Locale)

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
      {/* Hero */}
      <section className="relative h-[400px]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {service.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <Card variant="bordered" hover={false} className="sticky top-24">
                <h3 className="font-bold text-lg mb-4">Servicii</h3>
                <nav className="space-y-1">
                  {allServices.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/${locale}/servicii/${s.slug}`}
                      className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                        s.slug === slug
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100 text-text-body'
                      }`}
                    >
                      <span>{s.title}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  ))}
                </nav>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <p className="text-lg text-text-body mb-8">
                {service.description}
              </p>

              <h2 className="heading-md mb-6">Caracteristici</h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-12">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-text-body">{feature}</span>
                  </div>
                ))}
              </div>

              <h2 className="heading-md mb-6">Componente sistem</h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-12">
                {service.components.map((component, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                      <Check className="w-3 h-3 text-text-muted" />
                    </div>
                    <span className="text-text-body">{component}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-primary/5 rounded-xl border border-primary/20">
                <h3 className="font-bold text-lg mb-2">De ce să ne alegeți pe noi?</h3>
                <ul className="space-y-2 text-text-body">
                  <li>✓ Experiență de peste 15 ani în domeniu</li>
                  <li>✓ Echipamente de la producători recunoscuți</li>
                  <li>✓ Garanție și service post-vânzare</li>
                  <li>✓ Consultanță gratuită</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <QuoteForm
        title={dictionary.home.quote.title}
        dictionary={quoteFormDict}
      />
    </>
  )
}

