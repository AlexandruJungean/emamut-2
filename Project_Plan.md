# 🦣 EMAMUT Website Redesign - Project Plan

## 📋 Project Overview

**Client:** EMAMUT Security Solutions  
**Website:** https://emamut.ro/  
**Established:** 2010  
**Location:** Str. Horea nr. 26, Salonta, jud. Bihor, Romania

**Goal:** Complete website redesign with a dark, futuristic, security-themed aesthetic that looks and works 10x better than the current site.

---

## 🎨 Design Direction

### Theme: "Digital Fortress"
A dark, futuristic security-themed design that conveys trust, technology, and protection.

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Deep Black | `#0a0a0f` | Primary background |
| Dark Navy | `#0d1117` | Secondary background |
| Electric Cyan | `#00d4ff` | Primary accent, highlights |
| Neon Red | `#ff3b3b` | Secondary accent (from logo) |
| Steel Gray | `#1a1f2e` | Cards, containers |
| Light Gray | `#8b949e` | Secondary text |
| Pure White | `#ffffff` | Primary text |

### Typography
- **Headings:** Orbitron or Exo 2 (futuristic, techy feel)
- **Body:** Plus Jakarta Sans or Outfit (modern, readable)
- **Accents:** JetBrains Mono (for technical elements)

### Visual Elements
- 🔷 Glassmorphism cards with glowing borders
- ⚡ Animated grid patterns & circuit-board backgrounds
- 🎬 Smooth scroll animations & micro-interactions
- 📐 Sharp, angular design elements
- 🌟 Subtle particle effects
- 🔒 Security-inspired iconography
- 📊 Surveillance-style grid overlays

---

## 📄 Pages to Build

### 1. **Acasă (Home)**
- Hero section with animated slider (3 slides from hero images)
- Floating service cards with hover effects
- "Nu-ți lăsa siguranța pe mâinile oricui" section with stats counter
- Client testimonials carousel
- FAQ accordion with smooth animations
- "De ce să ne alegi" features grid
- Quote request form with glassmorphism styling
- Recent blog posts carousel
- Footer with newsletter signup

### 2. **Despre Noi (About Us)**
- Company history with timeline animation
- Team photo section with parallax
- Key metrics: 15 ani, 500+ clienți
- 4 differentiators (Viteză, Fiabilitate, Comunicare, Flexibilitate)
- "Dacă:" call-to-action section
- Embedded quote form

### 3. **Servicii (Services Overview)**
- Introduction text
- 8 interactive service cards with image overlays
  1. Sisteme supraveghere video
  2. Sisteme antiefracție
  3. Rețele date / voce / TV / Wi-Fi
  4. Control acces / pontaj
  5. Interfoane & Videointerfoane
  6. Sisteme detecție incendiu
  7. Consultanță de specialitate
  8. Mentenanță

### 4. **Individual Service Pages (6 pages)**
Each with:
- Sidebar navigation with all services
- Hero image related to the service
- Detailed description
- System components list
- "De ce să ne alegeți pe noi?" section
- Related blog posts
- Quote request form

**Service Pages:**
- `/servicii/supraveghere-video`
- `/servicii/sisteme-antiefractie`
- `/servicii/retele-date`
- `/servicii/control-acces`
- `/servicii/interfoane`
- `/servicii/detectie-incendiu`

### 5. **Referințe (Portfolio/References)**
- Grid gallery of completed projects
- Filterable by service type
- Lightbox for images
- Client logos carousel

### 6. **Blog**
- Grid layout with featured article
- Categories filter
- Search functionality
- Pagination
- **Admin capability:** Add/edit/delete posts (Supabase integration later)

### 7. **Blog Individual**
- Full article content
- Sidebar with services links
- Related articles
- Share buttons
- Comments section (optional)

### 8. **Ebook**
- Lead magnet landing page
- Ebook mockup display
- Lead capture form (Name, Email, Phone)
- "3+1 aspecte la care hoții sunt atenți"

### 9. **Carieră (Career)**
- Hero section with team photo
- Job listings grid
- Individual job pages:
  - Tehnician sisteme de securitate
  - Agent comercial
- **Admin capability:** Add/edit/delete job posts (Supabase integration later)
- Application CTA with email

### 10. **Contact**
- Contact info cards (Phone, Email, Address)
- Contact form with validation
- Google Maps embed (interactive)
- Working hours

### 11. **Legal Pages**
- Termeni și condiții
- Politica de confidențialitate
- Politica cookies

---

## 🌍 Multi-Language Support

### Languages
| Language | Code | Flag | Priority |
|----------|------|------|----------|
| Română | `ro` | 🇷🇴 | Default |
| Magyar | `hu` | 🇭🇺 | Secondary |
| English | `en` | 🇬🇧 | Secondary |

### Implementation
- Language switcher in header with flag icons
- URL structure: `/ro/page`, `/hu/page`, `/en/page`
- Default redirect to `/ro` on first visit
- Remember language preference in localStorage
- All static content translated
- Dynamic content (blog, careers) with language field

---

## ⚙️ Features & Functionality

### Core Features
- [x] Responsive design (mobile-first)
- [x] Dark mode (default, no toggle needed)
- [x] SEO optimization with meta tags
- [x] Open Graph & Twitter cards
- [x] Structured data (JSON-LD)
- [x] Sitemap generation
- [x] Performance optimization (Core Web Vitals)

### Interactive Elements
- [x] Smooth scroll animations (on-scroll reveals)
- [x] Parallax effects
- [x] Interactive service cards
- [x] FAQ accordion
- [x] Image lightbox/gallery
- [x] Testimonials carousel
- [x] Blog posts carousel

### Forms
1. **Quote Request Form** (appears on multiple pages)
   - Personal sau Business (dropdown)
   - Tip serviciu (dropdown)
   - Dimensiune sistem (dropdown)
   - Nume complet
   - Email
   - Telefon
   - Județ
   - Localitate
   - Mesaj
   - reCAPTCHA

2. **Contact Form**
   - Nume complet
   - Email
   - Telefon
   - Mesaj
   - reCAPTCHA

3. **Newsletter Form**
   - Nume
   - Email

4. **Ebook Download Form**
   - Nume
   - Email
   - Nr. telefon

### Integrations
- Google Maps (contact page)
- Email sending (forms)
- WhatsApp chat button
- Facebook link
- reCAPTCHA v3

---

## 🛠️ Admin Capabilities (Phase 2 - Supabase)

### Blog Management
- Create/Edit/Delete blog posts
- Rich text editor
- Image upload
- Categories & tags
- Draft/Published status
- Multi-language content

### Career Management
- Create/Edit/Delete job listings
- Job details editor
- Active/Inactive status
- Multi-language content

---

## 📅 Development Phases

### Phase 1: Foundation (Current)
- [x] Project setup (Next.js 16 + Tailwind 4)
- [ ] Design system & components
- [ ] Multi-language setup
- [ ] Layout components (Header, Footer)
- [ ] Home page
- [ ] About page

### Phase 2: Content Pages
- [ ] Services overview
- [ ] Individual service pages (6)
- [ ] Contact page with form
- [ ] Ebook landing page

### Phase 3: Dynamic Content
- [ ] Blog list page
- [ ] Blog individual page
- [ ] Career page
- [ ] References/Portfolio page

### Phase 4: Integrations
- [ ] Email sending (forms)
- [ ] Google Maps integration
- [ ] WhatsApp button
- [ ] reCAPTCHA

### Phase 5: Supabase Integration
- [ ] Database setup
- [ ] Blog CRUD operations
- [ ] Career CRUD operations
- [ ] Admin authentication

### Phase 6: Polish & Launch
- [ ] Performance optimization
- [ ] SEO finalization
- [ ] Testing (all languages)
- [ ] Deployment

---

## 📊 Success Metrics

- Lighthouse score > 90 on all categories
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Time to Interactive < 3s
- Mobile-friendly (100% responsive)
- All forms working with email delivery

---

## 📝 Notes

- The website should feel premium, modern, and trustworthy
- Security theme should be subtle but present (not cheesy)
- Animations should be smooth but not distracting
- Content should be easy to read despite dark theme
- Forms should have excellent UX with clear validation
- All images should be optimized (WebP format)

