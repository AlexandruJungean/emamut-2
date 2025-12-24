import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { Card } from '@/components/ui'
import { ArrowRight } from 'lucide-react'

interface BlogPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params
  
  return {
    title: locale === 'ro' ? 'Blog - Emamut Security Solutions' : 'Blog - Emamut',
  }
}

// Mock blog posts (would come from Supabase in production)
const blogPosts = [
  {
    slug: 'instalare-camere-supraveghere-santandrei',
    title: 'Instalare camere supraveghere Sântandrei – Protecție modernă pentru case și afaceri',
    excerpt: 'Sântandrei este una dintre cele mai dinamice și căutate zone rezidențiale din apropierea Oradiei. Tot mai multe familii aleg să se mute aici, iar afacerile locale prosperă.',
    image: '/images/residential-installation.webp',
    date: 'noiembrie 13, 2025',
    category: 'Supraveghere',
  },
  {
    slug: 'instalare-camere-supraveghere-valea-lui-mihai',
    title: 'Instalare camere supraveghere Valea lui Mihai – Siguranță pentru locuințe și spații comerciale',
    excerpt: 'Într-un oraș în continuă dezvoltare precum Valea lui Mihai, siguranța locuinței sau afacerii tale nu este doar un avantaj, ci o necesitate reală.',
    image: '/images/commercial-building.webp',
    date: 'noiembrie 13, 2025',
    category: 'Supraveghere',
  },
  {
    slug: 'instalare-camere-supraveghere-sacueni',
    title: 'Instalare Camere Supraveghere Săcueni – Protecție Inteligentă pentru Locuințe și Afaceri',
    excerpt: 'Ai nevoie de un sistem de securitate eficient pentru casa sau afacerea ta din Săcueni? Emamut.ro îți oferă servicii complete de instalare camere supraveghere.',
    image: '/images/retail-store.webp',
    date: 'iulie 7, 2025',
    category: 'Supraveghere',
  },
  {
    slug: 'importanta-sistemelor-de-securitate',
    title: 'De ce sunt importante sistemele de securitate pentru afacerea ta',
    excerpt: 'Află care sunt principalele beneficii ale sistemelor de securitate moderne și cum te pot ajuta să îți protejezi afacerea.',
    image: '/images/modern-office.webp',
    date: 'iunie 15, 2025',
    category: 'Securitate',
  },
  {
    slug: 'ghid-alegere-camere-supraveghere',
    title: 'Ghid complet pentru alegerea camerelor de supraveghere potrivite',
    excerpt: 'Cum să alegi camerele de supraveghere perfecte pentru nevoile tale? Iată un ghid complet cu tot ce trebuie să știi.',
    image: '/images/warehouse.webp',
    date: 'mai 20, 2025',
    category: 'Ghiduri',
  },
  {
    slug: 'sisteme-alarma-2025',
    title: 'Cele mai bune sisteme de alarmă în 2025 - Top recomandări',
    excerpt: 'Descoperă care sunt cele mai recomandate sisteme de alarmă în 2025 și ce caracteristici ar trebui să cauți.',
    image: '/images/technical-workshop.webp',
    date: 'aprilie 10, 2025',
    category: 'Alarme',
  },
]

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale as Locale)

  return (
    <>
      {/* Title */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h1 className="heading-xl text-center mb-4 heading-underline">
            {dictionary.blog.title}
          </h1>
          <p className="text-center text-text-muted text-lg max-w-2xl mx-auto">
            {dictionary.blog.subtitle}
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
                <Card variant="default" hover={true} padding="none" className="overflow-hidden h-full">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-lg font-bold text-text-dark mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-text-muted text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-light">{post.date}</span>
                      <span className="text-primary font-medium text-sm flex items-center gap-1">
                        {dictionary.blog.readMore}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

