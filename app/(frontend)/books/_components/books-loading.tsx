import React from 'react'
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const BooksLoading = () => {
  return (
    <div className="container mx-auto px-4 pt-12 lg:pt-24">
     
      <div className="container px-4 mx-auto lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-border/50 bg-card p-0"
            >
              <div className="relative aspect-3/4 overflow-hidden bg-muted">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <Skeleton className="h-6 w-3/4 mb-1" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="mb-3">
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-9 w-20" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BooksLoading