import { Card } from '@/components/ui'
import { 
  Wrench, 
  Award, 
  MessageSquare, 
  Zap 
} from 'lucide-react'

interface Feature {
  icon: 'wrench' | 'award' | 'message' | 'zap'
  title: string
  description: string
}

interface WhyChooseUsProps {
  title: string
  features: Feature[]
}

const iconMap = {
  wrench: Wrench,
  award: Award,
  message: MessageSquare,
  zap: Zap,
}

export function WhyChooseUs({ title, features }: WhyChooseUsProps) {
  return (
    <section className="section-padding bg-bg-light">
      <div className="container-custom">
        <h2 className="heading-lg text-center mb-12">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon]
            return (
              <Card
                key={index}
                variant="bordered"
                hover={false}
                className="text-center bg-white"
              >
                <div className="flex flex-col items-center">
                  <div className="mb-4 p-4">
                    <Icon className="w-12 h-12 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-text-dark mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

