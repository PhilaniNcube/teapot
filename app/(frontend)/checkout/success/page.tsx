import { Suspense } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, MapPin, Package, Loader2 } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface SuccessPageProps {
  searchParams: Promise<{
    orderId?: string
  }>
}

async function SuccessContent({ searchParams }: SuccessPageProps) {
  const { orderId } = await searchParams

  let order = null
  if (orderId) {
    try {
      const payload = await getPayload({ config })
      order = await payload.findByID({
        collection: 'orders',
        id: orderId,
      })
    } catch (e) {
      console.error('Failed to load order:', e)
    }
  }

  const isPaid = order?.paymentStatus === 'paid'

  return (
    <div className="container mx-auto py-16 px-4 max-w-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 bg-green-100 dark:bg-green-950/50 rounded-full mb-4 text-green-600 dark:text-green-400">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground text-lg">
          {isPaid
            ? `Payment successfully received for order #${orderId || ''}.`
            : `Thank you for your order #${orderId || ''}. Your payment is currently being processed.`}
        </p>
      </div>

      {order && (
        <Card className="mb-8">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="text-xl">Order Summary</CardTitle>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  isPaid
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                }`}
              >
                {isPaid ? 'Payment Complete' : 'Payment Processing'}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4 text-sm bg-muted/30 p-4 rounded-lg">
              <div>
                <p className="text-muted-foreground font-medium mb-1">Customer Details</p>
                <p className="font-semibold">{order.customerDetails.firstName} {order.customerDetails.lastName}</p>
                <p>{order.customerDetails.email}</p>
                <p>{order.customerDetails.phone}</p>
              </div>

              <div>
                <p className="text-muted-foreground font-medium mb-1 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> PEP Collection Store
                </p>
                <p className="font-semibold">{order.collectionPoint}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Method: {order.shippingMethod === 'pep_express' ? 'PEP Express (3-5 days)' : 'PEP Standard (7-9 days)'}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-semibold text-sm flex items-center gap-1.5">
                <Package className="h-4 w-4 text-muted-foreground" /> Purchased Items
              </p>
              <div className="divide-y border rounded-lg overflow-hidden">
                {order.items?.map((item, idx) => {
                  const bookTitle = typeof item.book === 'object' ? item.book.title : `Book #${item.book}`
                  return (
                    <div key={idx} className="flex justify-between items-center p-3 text-sm">
                      <div>
                        <p className="font-medium">{bookTitle}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="space-y-1.5 text-sm pt-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{formatPrice(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t">
                <span>Total Amount Paid</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg">
          <Link href="/books">Continue Shopping</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage(props: SuccessPageProps) {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto py-20 px-4 min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <SuccessContent {...props} />
    </Suspense>
  )
}
