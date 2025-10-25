import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { BookOpen } from 'lucide-react';

export function BookDetailsFallback() {
  return (
    <div className="space-y-8">
      {/* Loading indicator */}
      <div className="flex items-center justify-center py-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <BookOpen className="h-5 w-5 animate-pulse" />
          <span className="text-sm">Loading book details...</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 animate-pulse">
        {/* Book Cover Skeleton */}
        <div className="space-y-4">
          <Card className="overflow-hidden p-0">
            <CardContent className="p-0">
              <AspectRatio ratio={3/4}>
                <Skeleton className="w-full h-full" />
              </AspectRatio>
            </CardContent>
          </Card>
        </div>

        {/* Book Information Skeleton */}
        <div className="space-y-6">
          {/* Title and Basic Info Skeleton */}
          <div className="space-y-4">
            {/* Title skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-8 lg:h-10 w-3/4" />
              <Skeleton className="h-8 lg:h-10 w-1/2" />
            </div>
            
            {/* Book details badges skeleton */}
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>

          {/* Description Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
          </Card>

          {/* Purchase/Action Section Skeleton */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Skeleton className="h-11 flex-1" />
                  <Skeleton className="h-11 flex-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info Skeleton */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional content sections skeleton */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
}