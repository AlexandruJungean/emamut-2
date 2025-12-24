'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

interface HeroSlide {
  image: string
  title: string
  subtitle: string
  destinations: string[]
  ctaText: string
  ctaHref: string
}

interface HeroProps {
  slides: HeroSlide[]
  locale: string
}

export function Hero({ slides, locale }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length)
  }, [currentSlide, slides.length, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length)
  }, [currentSlide, slides.length, goToSlide])

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const slide = slides[currentSlide]

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background Images */}
      {slides.map((s, index) => (
        <div
          key={index}
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full container-custom flex items-center">
        <div className="max-w-2xl text-white pt-20">
          <h1
            key={`title-${currentSlide}`}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            {slide.title}
          </h1>

          <h2
            key={`subtitle-${currentSlide}`}
            className="text-xl md:text-2xl font-semibold mb-4 animate-slide-up delay-100"
          >
            {slide.subtitle}
          </h2>

          <ul
            key={`destinations-${currentSlide}`}
            className="space-y-2 mb-8 animate-slide-up delay-200"
          >
            {slide.destinations.map((dest, i) => (
              <li key={i} className="text-lg text-gray-200">
                - {dest}
              </li>
            ))}
          </ul>

          <div
            key={`cta-${currentSlide}`}
            className="animate-slide-up delay-300"
          >
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ChevronRight className="w-5 h-5" />}
              onClick={() => window.location.href = slide.ctaHref}
            >
              {slide.ctaText}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors text-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors text-white"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              index === currentSlide
                ? 'bg-primary w-8'
                : 'bg-white/50 hover:bg-white/80'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

