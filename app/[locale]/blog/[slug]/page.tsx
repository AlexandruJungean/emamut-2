import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { Card } from '@/components/ui'
import { ArrowLeft, Calendar, Share2, ChevronRight } from 'lucide-react'

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>
}

// Mock blog data (would come from Supabase in production)
const blogPostsData: Record<string, {
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  category: string
}> = {
  'instalare-camere-supraveghere-santandrei': {
    title: 'Instalare camere supraveghere Sântandrei – Protecție modernă pentru case și afaceri',
    excerpt: 'Sântandrei este una dintre cele mai dinamice și căutate zone rezidențiale din apropierea Oradiei.',
    content: `
      <p>Sântandrei este una dintre cele mai dinamice și căutate zone rezidențiale din apropierea Oradiei. Tot mai multe familii aleg să se mute aici, iar afacerile locale prosperă.</p>
      
      <p>Cu această creștere vine și nevoia de securitate sporită. De aceea, instalarea unui sistem de camere de supraveghere devine din ce în ce mai importantă.</p>

      <h2>De ce să instalezi camere de supraveghere în Sântandrei?</h2>
      
      <p>Un sistem de supraveghere video oferă multiple beneficii:</p>
      
      <ul>
        <li>Monitorizare în timp real a proprietății</li>
        <li>Descurajarea potențialilor infractori</li>
        <li>Dovezi video în cazul unui incident</li>
        <li>Liniște sufletească pentru tine și familia ta</li>
      </ul>

      <h2>Serviciile noastre de instalare</h2>
      
      <p>Echipa Emamut oferă servicii complete de instalare camere supraveghere în Sântandrei și împrejurimi. Folosim echipamente de ultima generație și oferim garanție pentru toate lucrările efectuate.</p>
    `,
    image: '/images/residential-installation.webp',
    date: 'noiembrie 13, 2025',
    category: 'Supraveghere',
  },
  'instalare-camere-supraveghere-valea-lui-mihai': {
    title: 'Instalare camere supraveghere Valea lui Mihai – Siguranță pentru locuințe și spații comerciale',
    excerpt: 'Într-un oraș în continuă dezvoltare precum Valea lui Mihai, siguranța locuinței sau afacerii tale nu este doar un avantaj.',
    content: `
      <p>Într-un oraș în continuă dezvoltare precum Valea lui Mihai, siguranța locuinței sau afacerii tale nu este doar un avantaj, ci o necesitate reală.</p>
      
      <p>Fie că ai nevoie de supraveghere pentru casă, magazin sau depozit, un sistem profesional de camere video îți oferă control și liniște.</p>

      <h2>Beneficiile supravegherii video</h2>
      
      <p>Sistemele moderne de supraveghere oferă:</p>
      
      <ul>
        <li>Imagine de înaltă calitate HD/4K</li>
        <li>Vedere pe timp de noapte</li>
        <li>Acces de la distanță prin aplicație mobilă</li>
        <li>Înregistrare continuă sau la detectare de mișcare</li>
      </ul>
    `,
    image: '/images/commercial-building.webp',
    date: 'noiembrie 13, 2025',
    category: 'Supraveghere',
  },
  'instalare-camere-supraveghere-sacueni': {
    title: 'Instalare Camere Supraveghere Săcueni – Protecție Inteligentă pentru Locuințe și Afaceri',
    excerpt: 'Ai nevoie de un sistem de securitate eficient pentru casa sau afacerea ta din Săcueni?',
    content: `
      <p>Ai nevoie de un sistem de securitate eficient pentru casa sau afacerea ta din Săcueni? Emamut.ro îți oferă servicii complete de instalare camere supraveghere.</p>
      
      <p>Cu experiență de peste 15 ani în domeniu, garantăm calitate și profesionalism în fiecare proiect.</p>

      <h2>Ce oferim în Săcueni?</h2>
      
      <ul>
        <li>Consultanță gratuită și evaluare la fața locului</li>
        <li>Proiectare personalizată a sistemului</li>
        <li>Instalare profesională</li>
        <li>Configurare și instruire utilizare</li>
        <li>Service și mentenanță</li>
      </ul>
    `,
    image: '/images/retail-store.webp',
    date: 'iulie 7, 2025',
    category: 'Supraveghere',
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

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPostsData[slug]
  
  if (!post) {
    return { title: 'Article Not Found' }
  }

  return {
    title: `${post.title} - Emamut Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params
  const post = blogPostsData[slug]
  
  if (!post) {
    notFound()
  }

  const dictionary = await getDictionary(locale as Locale)

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[400px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-2 text-primary mb-6 hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                {dictionary.blog.backToBlog}
              </Link>

              <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-medium rounded-full mb-4">
                {post.category}
              </span>

              <h1 className="heading-lg mb-4">{post.title}</h1>

              <div className="flex items-center gap-4 text-text-muted mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
              </div>

              <div
                className="prose prose-lg max-w-none text-text-body"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-4">
                  <Share2 className="w-5 h-5 text-text-muted" />
                  <span className="font-medium">{dictionary.blog.share}:</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://emamut.ro/${locale}/blog/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card variant="bordered" hover={false} className="sticky top-24">
                <h3 className="font-bold text-lg mb-4">Servicii</h3>
                <nav className="space-y-1">
                  {allServices.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/${locale}/servicii/${s.slug}`}
                      className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 text-text-body transition-colors"
                    >
                      <span>{s.title}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-border">
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center justify-center gap-2 w-full font-semibold rounded-full transition-all duration-300 ease-out bg-primary text-white hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 px-6 py-3 text-base"
                  >
                    Cere ofertă
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

