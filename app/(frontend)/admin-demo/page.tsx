'use client'

import React, { useState } from 'react'
import { PayloadLoadingFallback, PayloadMinimalFallback, PayloadWrapper } from '@/components/admin'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const DemoContent = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
    <p>This is the actual admin content that would load after the fallback.</p>
  </div>
)

export default function AdminFallbackDemo() {
  const [activeDemo, setActiveDemo] = useState<'full' | 'minimal' | 'wrapper'>('full')
  const [showContent, setShowContent] = useState(false)

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>PayloadCMS Dashboard Fallback UI Demo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">
                This demo showcases the different fallback UI components created for the PayloadCMS admin dashboard.
              </p>
              
              <div className="flex gap-4">
                <Button 
                  onClick={() => setActiveDemo('full')} 
                  variant={activeDemo === 'full' ? 'default' : 'outline'}
                >
                  Full Dashboard Fallback
                </Button>
                <Button 
                  onClick={() => setActiveDemo('minimal')} 
                  variant={activeDemo === 'minimal' ? 'default' : 'outline'}
                >
                  Minimal Fallback
                </Button>
                <Button 
                  onClick={() => setActiveDemo('wrapper')} 
                  variant={activeDemo === 'wrapper' ? 'default' : 'outline'}
                >
                  Wrapper Component
                </Button>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={() => setShowContent(!showContent)}
                  variant="secondary"
                >
                  {showContent ? 'Show Fallback' : 'Show Content'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demo Preview</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border rounded-lg overflow-hidden">
              {showContent ? (
                <DemoContent />
              ) : (
                <>
                  {activeDemo === 'full' && <PayloadLoadingFallback />}
                  {activeDemo === 'minimal' && <PayloadMinimalFallback />}
                  {activeDemo === 'wrapper' && (
                    <PayloadWrapper fallback={<PayloadLoadingFallback />}>
                      <DemoContent />
                    </PayloadWrapper>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Implementation Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Full Dashboard Fallback</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Use this for complete admin interface pages. It provides a comprehensive skeleton that matches the PayloadCMS layout.
                </p>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`import { PayloadLoadingFallback } from '@/components/admin'

<Suspense fallback={<PayloadLoadingFallback />}>
  {/* Your admin content */}
</Suspense>`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Minimal Fallback</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Use this for simple loading states, modal contents, or when you need a lightweight option.
                </p>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`import { PayloadMinimalFallback } from '@/components/admin'

<Suspense fallback={<PayloadMinimalFallback />}>
  {/* Your admin content */}
</Suspense>`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Wrapper Component</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Use this when you want more control over the fallback implementation or need a reusable pattern.
                </p>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`import { PayloadWrapper } from '@/components/admin'

<PayloadWrapper>
  {/* Your admin content */}
</PayloadWrapper>`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}