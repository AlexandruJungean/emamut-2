'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook } from 'lucide-react'
import { Input } from '@/components/ui'
import { Button } from '@/components/ui'

interface FooterProps {
  locale: string
  dictionary: {
    footer: {
      tagline: string
      services: string
      usefulLinks: string
      newsletter: string
      newsletterText: string
      namePlaceholder: string
      emailPlaceholder: string
      subscribe: string
      copyright: string
      termsConditions: string
      privacyPolicy: string
      cookiePolicy: string
    }
    services: {
      videoSurveillance: string
      antiTheft: string
      dataNetworks: string
      accessControl: string
      intercom: string
      fireDetection: string
    }
    nav: {
      about: string
      contact: string
    }
  }
}

export function Footer({ locale, dictionary }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const services = [
    { label: dictionary.services.videoSurveillance, href: `/${locale}/servicii/supraveghere-video` },
    { label: dictionary.services.antiTheft, href: `/${locale}/servicii/sisteme-antiefractie` },
    { label: dictionary.services.dataNetworks, href: `/${locale}/servicii/retele-date` },
    { label: dictionary.services.accessControl, href: `/${locale}/servicii/control-acces` },
    { label: dictionary.services.intercom, href: `/${locale}/servicii/interfoane` },
    { label: dictionary.services.fireDetection, href: `/${locale}/servicii/detectie-incendiu` },
  ]

  const usefulLinks = [
    { label: dictionary.footer.termsConditions, href: `/${locale}/termeni-conditii` },
    { label: dictionary.footer.privacyPolicy, href: `/${locale}/politica-confidentialitate` },
    { label: dictionary.footer.cookiePolicy, href: `/${locale}/politica-cookies` },
    { label: dictionary.nav.about, href: `/${locale}/despre-noi` },
    { label: dictionary.nav.contact, href: `/${locale}/contact` },
  ]

  return (
    <footer className="bg-bg-dark text-white">
      {/* Contact Banner */}
      <div className="bg-primary">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-full">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm opacity-90">Suport clienți</p>
                <a href="tel:+40735777296" className="text-xl font-bold hover:underline">
                  +40 735 777 296
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-full">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm opacity-90">Informații & Oferte</p>
                <a href="mailto:contact@emamut.ro" className="text-xl font-bold hover:underline">
                  contact@emamut.ro
                </a>
              </div>
            </div>

            <a 
              href="https://www.google.com/maps/place/Emamut/@46.8007841,21.6625299,679m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47466d8da2e81e31:0xae2552090cbc3ceb!8m2!3d46.8007805!4d21.6651048!16s%2Fg%2F11fy4r7r_d"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <div className="p-3 bg-white/10 rounded-full">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm opacity-90">Adresa</p>
                <p className="text-lg font-semibold hover:underline">
                  Strada Horea 26, Salonta 415500
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link href={`/${locale}`} className="inline-block mb-6">
              <div className="bg-white rounded-lg p-3 inline-block">
                <Image
                  src="/logo.webp"
                  alt="Emamut Security Solutions"
                  width={180}
                  height={60}
                  className="h-12 w-auto"
                />
              </div>
            </Link>
            <p className="text-text-on-dark text-sm leading-relaxed mb-6">
              {dictionary.footer.tagline}
            </p>
            <a
              href="https://www.facebook.com/EmamutSRL"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-full hover:bg-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">{dictionary.footer.services}</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-text-on-dark hover:text-primary transition-colors text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">{dictionary.footer.usefulLinks}</h3>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-on-dark hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6">{dictionary.footer.newsletter}</h3>
            <p className="text-text-on-dark text-sm mb-4">
              {dictionary.footer.newsletterText}
            </p>
            <form className="space-y-3">
              <input
                type="text"
                placeholder={dictionary.footer.namePlaceholder}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-text-light focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="email"
                placeholder={dictionary.footer.emailPlaceholder}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-text-light focus:outline-none focus:border-primary transition-colors"
              />
              <Button variant="primary" className="w-full">
                {dictionary.footer.subscribe}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <p className="text-center text-text-on-dark text-sm">
            ©{currentYear} Emamut - {dictionary.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

