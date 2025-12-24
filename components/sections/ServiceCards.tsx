'use client'

import Link from 'next/link'
import { Card } from '@/components/ui'
import { 
  Camera, 
  Shield, 
  Wifi, 
  KeyRound, 
  Phone as PhoneIcon, 
  Flame,
  Home,
  Bell
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Service {
  icon: 'camera' | 'shield' | 'wifi' | 'key' | 'phone' | 'flame' | 'home' | 'bell'
  title: string
  description: string
  href: string
}

interface ServiceCardsProps {
  services: Service[]
  locale: string
}

const iconMap = {
  camera: Camera,
  shield: Shield,
  wifi: Wifi,
  key: KeyRound,
  phone: PhoneIcon,
  flame: Flame,
  home: Home,
  bell: Bell,
}

export function ServiceCards({ services, locale }: ServiceCardsProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon]
            return (
              <Link key={index} href={service.href}>
                <Card
                  variant="bordered"
                  hover={true}
                  className="h-full text-center group"
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-4 p-4 rounded-full bg-gray-50 group-hover:bg-primary/5 transition-colors">
                      <Icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-text-dark mb-3">
                      {service.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

