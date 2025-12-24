'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Input, Select, Textarea } from '@/components/ui'
import { Loader2 } from 'lucide-react'

const quoteSchema = z.object({
  clientType: z.string().min(1, 'Selectați tipul clientului'),
  serviceType: z.string().min(1, 'Selectați tipul serviciului'),
  systemSize: z.string().min(1, 'Selectați dimensiunea sistemului'),
  name: z.string().min(2, 'Numele este obligatoriu'),
  email: z.string().email('Email invalid'),
  phone: z.string().min(10, 'Număr de telefon invalid'),
  county: z.string().optional(),
  city: z.string().min(2, 'Localitatea este obligatorie'),
  message: z.string().optional(),
})

type QuoteFormData = z.infer<typeof quoteSchema>

interface QuoteFormProps {
  title: string
  dictionary: {
    clientType: string
    clientTypeOptions: { value: string; label: string }[]
    serviceType: string
    serviceTypeOptions: { value: string; label: string }[]
    systemSize: string
    systemSizeOptions: { value: string; label: string }[]
    name: string
    email: string
    phone: string
    county: string
    city: string
    message: string
    messagePlaceholder: string
    submit: string
    submitting: string
    success: string
    error: string
  }
  image?: string
}

export function QuoteForm({ title, dictionary, image }: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  })

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // TODO: Implement form submission
      console.log('Form data:', data)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      reset()
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section-padding bg-bg-light">
      <div className="container-custom">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            {image && (
              <div className="relative h-64 lg:h-auto">
                <Image
                  src={image}
                  alt="Request a quote"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Form */}
            <div className="p-8 lg:p-12">
              <h2 className="heading-md mb-8">{title}</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select
                    placeholder={dictionary.clientType}
                    options={dictionary.clientTypeOptions}
                    error={errors.clientType?.message}
                    {...register('clientType')}
                  />
                  <Select
                    placeholder={dictionary.serviceType}
                    options={dictionary.serviceTypeOptions}
                    error={errors.serviceType?.message}
                    {...register('serviceType')}
                  />
                  <Select
                    placeholder={dictionary.systemSize}
                    options={dictionary.systemSizeOptions}
                    error={errors.systemSize?.message}
                    {...register('systemSize')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder={dictionary.name}
                    error={errors.name?.message}
                    {...register('name')}
                  />
                  <Input
                    type="email"
                    placeholder={dictionary.email}
                    error={errors.email?.message}
                    {...register('email')}
                  />
                  <Input
                    type="tel"
                    placeholder={dictionary.phone}
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder={dictionary.county}
                    error={errors.county?.message}
                    {...register('county')}
                  />
                  <Input
                    placeholder={dictionary.city}
                    error={errors.city?.message}
                    {...register('city')}
                  />
                </div>

                <Textarea
                  placeholder={dictionary.messagePlaceholder}
                  rows={4}
                  {...register('message')}
                />

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
                    {dictionary.success}
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                    {dictionary.error}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {dictionary.submitting}
                    </>
                  ) : (
                    dictionary.submit
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

