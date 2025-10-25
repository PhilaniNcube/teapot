'use client'

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function PayloadLoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header/Navigation Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-32" /> {/* Logo/Brand */}
              <Separator orientation="vertical" className="h-6" />
              <Skeleton className="h-6 w-24" /> {/* Nav item */}
              <Skeleton className="h-6 w-20" /> {/* Nav item */}
              <Skeleton className="h-6 w-28" /> {/* Nav item */}
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-8 w-8 rounded-full" /> {/* User avatar */}
              <Skeleton className="h-6 w-20" /> {/* User name */}
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
          <div className="p-4 space-y-2">
            <Skeleton className="h-6 w-24 mb-4" /> {/* Section title */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 py-2">
                <Skeleton className="h-4 w-4" /> {/* Icon */}
                <Skeleton className="h-4 w-20" /> {/* Menu item */}
              </div>
            ))}
            
            <Separator className="my-4" />
            
            <Skeleton className="h-6 w-32 mb-4" /> {/* Another section */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 py-2">
                <Skeleton className="h-4 w-4" /> {/* Icon */}
                <Skeleton className="h-4 w-24" /> {/* Menu item */}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Page Header */}
          <div className="mb-6">
            <Skeleton className="h-8 w-48 mb-2" /> {/* Page title */}
            <Skeleton className="h-4 w-96" /> {/* Page description */}
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-32" /> {/* Search bar */}
              <Skeleton className="h-10 w-24" /> {/* Filter */}
            </div>
            <Skeleton className="h-10 w-28" /> {/* Add button */}
          </div>

          {/* Content Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-32" /> {/* Card title */}
                    <Skeleton className="h-4 w-16" /> {/* Status */}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex items-center justify-between pt-3">
                      <Skeleton className="h-3 w-20" /> {/* Date */}
                      <Skeleton className="h-8 w-16" /> {/* Action button */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Table Fallback (Alternative layout) */}
          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-40" /> {/* Table title */}
                <Skeleton className="h-8 w-24" /> {/* Table action */}
              </div>
            </CardHeader>
            <CardContent>
              {/* Table Header */}
              <div className="grid grid-cols-4 gap-4 mb-4 pb-2 border-b">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-18" />
              </div>
              
              {/* Table Rows */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className="grid grid-cols-4 gap-4 py-3 border-b last:border-b-0">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export function PayloadMinimalFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Loading Dashboard
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Please wait while we prepare your admin interface...
          </p>
        </div>
      </div>
    </div>
  )
}