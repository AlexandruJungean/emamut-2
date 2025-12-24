'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Input } from '@/components/ui'
import { Loader2, Download, CheckCircle } from 'lucide-react'
import { use } from 'react'

const ebookSchema = z.object({
  name: z.string().min(2, 'Numele este obligatoriu'),
  email: z.string().email('Email invalid'),
  phone: z.string().min(10, 'Număr de telefon invalid'),
})

type EbookFormData = z.infer<typeof ebookSchema>

interface EbookPageProps {
  params: Promise<{ locale: string }>
}

export default function EbookPage({ params }: EbookPageProps) {
  const { locale } = use(params)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EbookFormData>({
    resolver: zodResolver(ebookSchema),
  })

  const onSubmit = async (data: EbookFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      console.log('Ebook download request:', data)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      reset()
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const features = [
    'Ce verifică hoții înainte să acționeze',
    'Cele mai vulnerabile puncte ale locuinței tale',
    'Cum să îți protejezi casa eficient',
    'Bonus: Checklist de securitate gratuit',
  ]

  return (
    <section className="min-h-screen bg-gradient-to-br from-bg-dark to-bg-darker py-20">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              DESCARCĂ EBOOK GRATUIT!
            </h1>
            
            <h2 className="text-xl md:text-2xl text-primary font-semibold mb-6">
              3+1 aspecte la care hoții sunt atenți când îți analizează locuința
            </h2>

            <p className="text-text-on-dark text-lg mb-8">
              Află ce verifică infractorii înainte să acționeze și cum te poți proteja eficient.
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-text-on-dark">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Form */}
            {submitStatus === 'success' ? (
              <div className="p-6 bg-green-500/20 border border-green-500/50 rounded-xl text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Ebook-ul a fost trimis pe email!
                </h3>
                <p className="text-text-on-dark">
                  Verifică inbox-ul (și folderul Spam) pentru a descărca ebook-ul.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                  type="text"
                  placeholder="Numele tău"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-text-light focus:outline-none focus:border-primary transition-colors"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm">{errors.name.message}</p>
                )}

                <input
                  type="email"
                  placeholder="Adresa de email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-text-light focus:outline-none focus:border-primary transition-colors"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email.message}</p>
                )}

                <input
                  type="tel"
                  placeholder="Număr de telefon"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-text-light focus:outline-none focus:border-primary transition-colors"
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm">{errors.phone.message}</p>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-md text-red-300">
                    A apărut o eroare. Te rugăm să încerci din nou.
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                  leftIcon={isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                >
                  {isSubmitting ? 'Se procesează...' : 'Descarcă acum'}
                </Button>
              </form>
            )}
          </div>

          {/* Ebook Image */}
          <div className="relative flex justify-center">
            <div className="relative w-[300px] md:w-[400px] h-[400px] md:h-[550px]">
              <Image
                src="/images/Ebook.webp"
                alt="Ebook - 3+1 aspecte la care hoții sunt atenți"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

