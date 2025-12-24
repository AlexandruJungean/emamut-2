import Link from 'next/link'
import Image from 'next/image'
import { Card, Button } from '@/components/ui'
import { ArrowRight } from 'lucide-react'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  image: string
  date: string
}

interface BlogPostsProps {
  title: string
  posts: BlogPost[]
  locale: string
  viewAllText: string
  readMoreText: string
}

export function BlogPosts({ title, posts, locale, viewAllText, readMoreText }: BlogPostsProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-12">
          <h2 className="heading-lg">{title}</h2>
          <Link href={`/${locale}/blog`}>
            <Button variant="ghost" rightIcon={<ArrowRight className="w-4 h-4" />}>
              {viewAllText}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
              <Card variant="default" hover={true} padding="none" className="overflow-hidden h-full">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-text-dark mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-text-muted text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-light">{post.date}</span>
                    <span className="text-primary font-medium text-sm flex items-center gap-1">
                      {readMoreText}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

