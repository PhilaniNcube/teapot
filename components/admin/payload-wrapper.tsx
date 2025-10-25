'use client'

import React from 'react'
import { PayloadLoadingFallback } from '@/components/admin'

interface PayloadWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PayloadWrapper({ children, fallback }: PayloadWrapperProps) {
  return (
    <React.Suspense fallback={fallback || <PayloadLoadingFallback />}>
      {children}
    </React.Suspense>
  )
}