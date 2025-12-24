'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, MapPin, Loader2 } from 'lucide-react'
import { Card, Button, Input, Textarea } from '@/components/ui'
import { use } from 'react'

const contactSchema = z.object({
  name: z.string().min(2, 'Numele este obligatoriu'),
  email: z.string().email('Email invalid'),
  phone: z.string().min(10, 'Număr de telefon invalid'),
  message: z.string().min(10, 'Mesajul trebuie să conțină cel puțin 10 caractere'),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export default function ContactPage({ params }: ContactPageProps) {
  const { locale } = use(params)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      console.log('Contact form data:', data)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      reset()
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Suport telefonic',
      value: '+40 735 777 296',
      href: 'tel:+40735777296',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@emamut.ro',
      href: 'mailto:contact@emamut.ro',
    },
    {
      icon: MapPin,
      title: 'Birou',
      value: 'Strada Horea 26, Salonta 415500',
      href: 'https://www.google.com/maps/place/Emamut/@46.8007841,21.6625299,679m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47466d8da2e81e31:0xae2552090cbc3ceb!8m2!3d46.8007805!4d21.6651048!16s%2Fg%2F11fy4r7r_d',
    },
  ]

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-bg-dark py-4">
        <div className="container-custom">
          <nav className="text-sm">
            <a href={`/${locale}`} className="text-primary hover:underline">
              Prima pagină
            </a>
            <span className="text-white mx-2">»</span>
            <span className="text-white">Contact</span>
          </nav>
        </div>
      </section>

      {/* Title */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h1 className="heading-xl text-center">Contact</h1>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="pb-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <a key={index} href={info.href} target="_blank" rel="noopener noreferrer">
                  <Card variant="bordered" hover={true} className="text-center h-full">
                    <div className="flex flex-col items-center py-4">
                      <Icon className="w-12 h-12 text-primary mb-4" strokeWidth={1.5} />
                      <h3 className="text-lg font-bold text-text-dark mb-2">
                        {info.title}
                      </h3>
                      <p className="text-primary font-medium">
                        {info.value}
                      </p>
                    </div>
                  </Card>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="pb-16 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="heading-md mb-6">Trimite-ne un mesaj</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label="Nume complet"
                  placeholder="Numele tău complet"
                  error={errors.name?.message}
                  {...register('name')}
                />
                <Input
                  type="email"
                  label="Adresa de email"
                  placeholder="email@exemplu.ro"
                  error={errors.email?.message}
                  {...register('email')}
                />
                <Input
                  type="tel"
                  label="Număr de telefon"
                  placeholder="+40 7XX XXX XXX"
                  error={errors.phone?.message}
                  {...register('phone')}
                />
                <Textarea
                  label="Mesajul tău"
                  placeholder="Scrie aici mesajul tău..."
                  rows={5}
                  error={errors.message?.message}
                  {...register('message')}
                />

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
                    Mesajul a fost trimis cu succes! Vă vom contacta în cel mai scurt timp.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                    A apărut o eroare. Te rugăm să încerci din nou.
                  </div>
                )}

                <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Se trimite...
                    </>
                  ) : (
                    'Trimite mesajul'
                  )}
                </Button>
              </form>
            </div>

            {/* Map */}
            <div>
              <h2 className="heading-md mb-6">Locația noastră</h2>
              <div className="h-[400px] rounded-xl overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2731.5!2d21.6625299!3d46.8007841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47466d8da2e81e31%3A0xae2552090cbc3ceb!2sEmamut!5e0!3m2!1sro!2sro!4v1703500000000!5m2!1sro!2sro"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Locația Emamut"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

