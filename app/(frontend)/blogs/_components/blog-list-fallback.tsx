import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const BlogListFallback = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Generate 6 skeleton blog cards */}
      {Array.from({ length: 6 }).map((_, index) => (
        <Card 
          key={index} 
          className="overflow-hidden animate-pulse p-0"
          style={{ 
            animationDelay: `${index * 100}ms`,
            animationDuration: '1.5s'
          }}
        >
          {/* Skeleton cover image */}
          <div className="relative h-48 w-full bg-gray-200">
            <Skeleton className="h-full w-full" />
          </div>
          
          <CardHeader>
            {/* Skeleton title - 2 lines */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
            
            {/* Skeleton date */}
            <Skeleton className="h-4 w-28 mt-2" />
          </CardHeader>
          
          <CardContent>
            {/* Skeleton content - 3 lines */}
            <div className="space-y-2 mb-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            
            {/* Skeleton button */}
            <Skeleton className="h-9 w-24 rounded-md" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default BlogListFallback