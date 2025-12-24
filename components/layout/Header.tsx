'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './LanguageSwitcher'

interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

interface HeaderProps {
  locale: string
  dictionary: {
    nav: {
      home: string
      about: string
      services: string
      references: string
      blog: string
      ebook: string
      career: string
      contact: string
    }
    cta: {
      requestQuote: string
    }
    services?: {
      videoSurveillance: string
      antiTheft: string
      dataNetworks: string
      accessControl: string
      intercom: string
      fireDetection: string
    }
  }
}

export function Header({ locale, dictionary }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navItems: NavItem[] = [
    { label: dictionary.nav.home, href: `/${locale}` },
    { label: dictionary.nav.about, href: `/${locale}/despre-noi` },
    {
      label: dictionary.nav.services,
      href: `/${locale}/servicii`,
      children: dictionary.services ? [
        { label: dictionary.services.videoSurveillance, href: `/${locale}/servicii/supraveghere-video` },
        { label: dictionary.services.antiTheft, href: `/${locale}/servicii/sisteme-antiefractie` },
        { label: dictionary.services.dataNetworks, href: `/${locale}/servicii/retele-date` },
        { label: dictionary.services.accessControl, href: `/${locale}/servicii/control-acces` },
        { label: dictionary.services.intercom, href: `/${locale}/servicii/interfoane` },
        { label: dictionary.services.fireDetection, href: `/${locale}/servicii/detectie-incendiu` },
      ] : undefined,
    },
    { label: dictionary.nav.references, href: `/${locale}/referinte` },
    {
      label: dictionary.nav.blog,
      href: `/${locale}/blog`,
    },
    { label: dictionary.nav.ebook, href: `/${locale}/ebook` },
    { label: dictionary.nav.career, href: `/${locale}/cariera` },
    { label: dictionary.nav.contact, href: `/${locale}/contact` },
  ]

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`
    }
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-white py-4'
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0">
            <Image
              src="/logo.webp"
              alt="Emamut Security Solutions"
              width={180}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md',
                    isActive(item.href)
                      ? 'text-primary'
                      : 'text-text-dark hover:text-primary'
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-border py-2 animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'block px-4 py-2.5 text-sm transition-colors',
                          isActive(child.href)
                            ? 'text-primary bg-primary/5'
                            : 'text-text-body hover:text-primary hover:bg-gray-50'
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side: Language Switcher + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher currentLocale={locale} />
            <Button
              variant="primary"
              size="md"
              leftIcon={<ShoppingCart className="w-4 h-4" />}
              onClick={() => window.location.href = `/${locale}/contact`}
            >
              {dictionary.cta.requestQuote}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-text-dark hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-slide-up">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block px-4 py-3 text-base font-medium rounded-md transition-colors',
                      isActive(item.href)
                        ? 'text-primary bg-primary/5'
                        : 'text-text-dark hover:text-primary hover:bg-gray-50'
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'block px-4 py-2 text-sm rounded-md transition-colors',
                            isActive(child.href)
                              ? 'text-primary bg-primary/5'
                              : 'text-text-muted hover:text-primary hover:bg-gray-50'
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
              <LanguageSwitcher currentLocale={locale} />
              <Button
                variant="primary"
                size="md"
                className="w-full"
                leftIcon={<ShoppingCart className="w-4 h-4" />}
                onClick={() => window.location.href = `/${locale}/contact`}
              >
                {dictionary.cta.requestQuote}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

