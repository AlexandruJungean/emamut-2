import { Metadata } from 'next'
import { type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/getDictionary'
import fs from 'fs/promises'
import path from 'path'

interface PrivacyPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params
  
  return {
    title: locale === 'ro' ? 'Politica de Confidențialitate - Emamut' : 'Privacy Policy - Emamut',
  }
}

async function getPrivacyContent(locale: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'legal', locale, 'politica-confidentialitate.md')
    const content = await fs.readFile(filePath, 'utf-8')
    return content
  } catch {
    // Fallback to Romanian if translation doesn't exist
    try {
      const filePath = path.join(process.cwd(), 'content', 'legal', 'ro', 'politica-confidentialitate.md')
      const content = await fs.readFile(filePath, 'utf-8')
      return content
    } catch {
      return 'Content not available.'
    }
  }
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale as Locale)
  const content = await getPrivacyContent(locale)

  // Simple markdown to HTML conversion
  const htmlContent = content
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-6">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-8">$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^- (.*)$/gim, '<li class="ml-4 mb-2">• $1</li>')

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <h1 className="heading-xl text-center mb-12 heading-underline">
          {dictionary.legal.privacyTitle}
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-lg max-w-none text-text-body"
            dangerouslySetInnerHTML={{ __html: `<p class="mb-4">${htmlContent}</p>` }}
          />
        </div>
      </div>
    </section>
  )
}

