'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// SVG Flag Components
function RomaniaFlag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <g fillRule="evenodd" strokeWidth="1pt">
        <path fill="#00319c" d="M0 0h213.3v480H0z"/>
        <path fill="#ffde00" d="M213.3 0h213.4v480H213.3z"/>
        <path fill="#de2110" d="M426.7 0H640v480H426.7z"/>
      </g>
    </svg>
  )
}

function HungaryFlag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <g fillRule="evenodd">
        <path fill="#fff" d="M640 480H0V0h640z"/>
        <path fill="#388d00" d="M640 480H0V320h640z"/>
        <path fill="#d43516" d="M640 160.1H0V.1h640z"/>
      </g>
    </svg>
  )
}

function UKFlag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <path fill="#012169" d="M0 0h640v480H0z"/>
      <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
      <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
      <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
      <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
    </svg>
  )
}

interface Language {
  code: string
  name: string
  Flag: React.FC<{ className?: string }>
}

const languages: Language[] = [
  { code: 'ro', name: 'Română', Flag: RomaniaFlag },
  { code: 'hu', name: 'Magyar', Flag: HungaryFlag },
  { code: 'en', name: 'English', Flag: UKFlag },
]

interface LanguageSwitcherProps {
  currentLocale: string
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (langCode: string) => {
    // Replace the locale in the current path
    const segments = pathname.split('/')
    segments[1] = langCode
    const newPath = segments.join('/')
    
    router.push(newPath)
    setIsOpen(false)
  }

  const CurrentFlag = currentLanguage.Flag

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-md',
          'text-sm font-medium text-text-dark',
          'hover:bg-gray-100 transition-colors',
          'border border-transparent hover:border-border'
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <CurrentFlag className="w-5 h-4 rounded-sm shadow-sm" />
        <span className="hidden sm:inline">{currentLanguage.code.toUpperCase()}</span>
        <ChevronDown className={cn(
          'w-4 h-4 transition-transform',
          isOpen && 'rotate-180'
        )} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-border py-1 animate-fade-in z-50">
          {languages.map((lang) => {
            const LangFlag = lang.Flag
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={cn(
                  'flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left',
                  'transition-colors',
                  lang.code === currentLocale
                    ? 'text-primary bg-primary/5 font-medium'
                    : 'text-text-body hover:bg-gray-50 hover:text-primary'
                )}
              >
                <LangFlag className="w-5 h-4 rounded-sm shadow-sm" />
                <span>{lang.name}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
