'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
  tooltipText?: string
}

export function WhatsAppButton({ 
  phoneNumber, 
  message = 'Bună! Aș dori mai multe informații despre serviciile Emamut.',
  tooltipText = 'Aveți nevoie de ajutor? Chat rapid'
}: WhatsAppButtonProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(true)

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Tooltip */}
      {isTooltipVisible && (
        <div className="bg-white rounded-lg shadow-lg p-3 pr-8 animate-fade-in relative">
          <button
            onClick={() => setIsTooltipVisible(false)}
            className="absolute top-1 right-1 p-1 text-text-muted hover:text-text-dark transition-colors"
            aria-label="Close tooltip"
          >
            <X className="w-4 h-4" />
          </button>
          <p className="text-sm text-text-body whitespace-nowrap">
            {tooltipText}
          </p>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'flex items-center justify-center',
          'w-14 h-14 rounded-full',
          'bg-primary hover:bg-primary-dark',
          'text-white shadow-lg',
          'transition-all duration-300',
          'hover:scale-110 hover:shadow-xl'
        )}
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  )
}

