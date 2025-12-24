'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

interface Stat {
  value: number
  suffix: string
  label: string
}

interface TrustSectionProps {
  title: string
  description: string
  ctaText: string
  ctaHref: string
  stats: Stat[]
  image?: string
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2000
          const steps = 60
          const increment = value / steps
          let current = 0
          
          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-primary">
      {count}{suffix}
    </div>
  )
}

export function TrustSection({
  title,
  description,
  ctaText,
  ctaHref,
  stats,
  image,
}: TrustSectionProps) {
  return (
    <section className="section-padding dark-section">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="heading-lg text-white mb-6">{title}</h2>
            <p className="text-text-on-dark text-lg leading-relaxed mb-8">
              {description}
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.location.href = ctaHref}
            >
              {ctaText}
            </Button>
          </div>

          {/* Stats or Image */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-text-on-dark mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

