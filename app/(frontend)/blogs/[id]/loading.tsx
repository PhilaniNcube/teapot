import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const BlogDetailFallback = () => {
  return (
    <main className="py-24 lg:py-32">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back button */}
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link href="/blogs" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </Link>
          </Button>
        </div>

        {/* Blog header skeleton */}
        <header className="mb-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-3/4" />
          </div>
          <div className="flex items-center gap-4 mt-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </header>

        {/* Cover image skeleton */}
        <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>

        {/* Content skeleton */}
        <article className="prose prose-lg max-w-none">
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          
          <div className="mt-8 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          
          <div className="mt-8 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </article>

        {/* Gallery skeleton */}
        <section className="mt-12">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Skeleton className="h-full w-full" />
              </div>
            ))}
          </div>
        </section>

        {/* Navigation skeleton */}
        <div className="mt-12 pt-8 border-t">
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </main>
  )
}

export default BlogDetailFallback