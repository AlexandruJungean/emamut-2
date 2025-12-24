'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  title: string
  items: FAQItem[]
}

export function FAQ({ title, items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section-padding dark-section">
      <div className="container-custom">
        <h2 className="heading-lg text-center text-white mb-12">{title}</h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="border-b border-white/10"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className={cn(
                  'text-lg font-medium transition-colors',
                  openIndex === index ? 'text-primary' : 'text-white'
                )}>
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-primary transition-transform duration-300',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  openIndex === index ? 'max-h-96 pb-5' : 'max-h-0'
                )}
              >
                <p className="text-text-on-dark leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

