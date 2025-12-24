// Complete Dictionary Type Definitions

export interface SelectOption {
  value: string
  label: string
}

export interface HeroSlide {
  title: string
  subtitle: string
  destinations: string[]
  ctaText: string
}

export interface ServiceItem {
  icon: string
  title: string
  description: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface ValueItem {
  title: string
  description: string
}

export interface ServiceCategory {
  title: string
  subtitle: string
  image: string
  href: string
}

export interface CareerPosition {
  slug: string
  title: string
  type: string
  location: string
  description: string
  requirements: string[]
  benefits: string[]
}

export interface Dictionary {
  common: {
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
      learnMore: string
      readMore: string
      submit: string
      download: string
      sendMessage: string
      subscribe: string
      viewAll: string
    }
    services: {
      videoSurveillance: string
      antiTheft: string
      dataNetworks: string
      accessControl: string
      intercom: string
      fireDetection: string
    }
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
    contact: {
      phone: string
      email: string
      address: string
    }
    whatsapp: {
      tooltip: string
    }
  }
  home: {
    hero: {
      slides: HeroSlide[]
    }
    services: {
      title: string
      items: ServiceItem[]
    }
    trust: {
      title: string
      description: string
      ctaText: string
      stats: Stat[]
    }
    faq: {
      title: string
      items: FAQItem[]
    }
    whyUs: {
      title: string
      features: Feature[]
    }
    quote: {
      title: string
      clientType: string
      clientTypeOptions: SelectOption[]
      serviceType: string
      serviceTypeOptions: SelectOption[]
      systemSize: string
      systemSizeOptions: SelectOption[]
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
    blog: {
      title: string
      viewAll: string
      readMore: string
    }
  }
  about: {
    title: string
    intro: string
    description1: string
    description2: string
    description3: string
    stats: string
    values: {
      title: string
      items: ValueItem[]
    }
  }
  contact: {
    title: string
    breadcrumb: string
    phone: {
      title: string
      value: string
    }
    email: {
      title: string
      value: string
    }
    address: {
      title: string
      value: string
    }
    form: {
      title: string
      name: string
      email: string
      phone: string
      message: string
      messagePlaceholder: string
      submit: string
      submitting: string
      success: string
      error: string
    }
  }
  services: {
    pageTitle: string
    intro: string
    description: string
    equipment: string
    categories: ServiceCategory[]
    cta: string
    whyUs: {
      title: string
      items: string[]
    }
  }
  ebook: {
    title: string
    subtitle: string
    description: string
    form: {
      name: string
      email: string
      phone: string
      submit: string
      submitting: string
      success: string
      error: string
    }
  }
  career: {
    title: string
    subtitle: string
    description: string
    openPositions: string
    noPositions: string
    apply: string
    positions: CareerPosition[]
  }
  blog: {
    title: string
    subtitle: string
    search: string
    categories: string
    allCategories: string
    readMore: string
    relatedPosts: string
    share: string
    backToBlog: string
  }
  references: {
    title: string
    subtitle: string
    description: string
    viewProject: string
  }
  legal: {
    termsTitle: string
    privacyTitle: string
    cookiesTitle: string
  }
}
