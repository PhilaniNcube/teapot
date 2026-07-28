import { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertCircle, Loader2 } from 'lucide-react'

interface CancelPageProps {
  searchParams: Promise<{
    orderId?: string
  }>
}

async function CancelContent({ searchParams }: CancelPageProps) {
  const { orderId } = await searchParams

  return (
    <div className="container mx-auto py-20 px-4 min-h-[60vh] flex flex-col items-center justify-center text-center max-w-md">
      <div className="bg-amber-100 dark:bg-amber-950/50 p-6 rounded-full mb-6 text-amber-600 dark:text-amber-400">
        <AlertCircle className="w-12 h-12" />
      </div>
      <h1 className="text-3xl font-bold mb-3">Payment Cancelled</h1>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        {orderId
          ? `Your payment for order #${orderId} was cancelled before completion. No charges were made.`
          : 'Your payment process was cancelled before completion. No charges were made.'}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <Button asChild size="lg">
          <Link href="/checkout">Try Checkout Again</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/books">Return to Books</Link>
        </Button>
      </div>
    </div>
  )
}

export default function CheckoutCancelPage(props: CancelPageProps) {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto py-20 px-4 min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <CancelContent {...props} />
    </Suspense>
  )
}
