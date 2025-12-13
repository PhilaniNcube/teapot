'use client'

import { useCart } from '@/lib/store/cart-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/utils'
import { createOrder, OrderState } from './actions'
import { useFormState } from 'react-dom'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

const initialState: OrderState = {}

export default function CheckoutPage() {
  const { items, totalPrice, isHydrated, clearCart } = useCart()
  const [shippingMethod, setShippingMethod] = useState<'pargo' | 'pep'>('pargo')
  const [state, formAction] = useFormState(createOrder, initialState)
  const [isPending, setIsPending] = useState(false)

  const shippingCost = shippingMethod === 'pargo' ? 100 : 80
  const finalTotal = totalPrice + shippingCost

  useEffect(() => {
    if (state.success) {
      clearCart()
    }
  }, [state.success, clearCart])

  const handleSubmit = (formData: FormData) => {
    setIsPending(true)
    // Add cart items to form data
    formData.append('cartItems', JSON.stringify(items))
    formData.append('shippingMethod', shippingMethod)
    
    // Call server action
    formAction(formData)
  }

  // Reset pending state when state changes
  useEffect(() => {
    setIsPending(false)
  }, [state])

  if (!isHydrated) {
    return (
      <div className="container mx-auto py-10 px-4 min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (state.success) {
    return (
      <div className="container mx-auto py-10 px-4 min-h-[60vh] flex flex-col items-center justify-center text-center max-w-md">
        <div className="bg-primary/10 p-6 rounded-full mb-6">
          <svg
            className="w-12 h-12 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">Order Placed!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your order. Your order ID is #{state.orderId}. We will contact you shortly with payment details.
        </p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Add some books to your cart to proceed to checkout.</p>
        <Button asChild>
          <Link href="/books">Browse Books</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <form action={handleSubmit}>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Customer Details & Shipping */}
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" required placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" required placeholder="Doe" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" type="tel" required placeholder="+27 12 345 6789" />
                  </div>
                </div>

                <Separator className="my-2" />
                
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Textarea id="address" name="address" required placeholder="123 Main St, Suburb" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" required placeholder="Cape Town" />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" name="postalCode" required placeholder="8001" />
                  </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="province">Province</Label>
                    <Input id="province" name="province" required placeholder="Western Cape" />
                  </div>

              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  defaultValue="pargo" 
                  value={shippingMethod} 
                  onValueChange={(val) => setShippingMethod(val as 'pargo' | 'pep')}
                >
                  <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="pargo" id="pargo" />
                    <Label htmlFor="pargo" className="flex flex-1 items-start justify-between cursor-pointer font-normal">
                      <div className="flex flex-col space-y-1">
                        <span className="font-medium">Pargo</span>
                        <span className="text-xs text-muted-foreground">Collect from over 3,000 pickup points nationwide.</span>
                      </div>
                      <span className="font-bold">{formatPrice(100)}</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="pep" id="pep" />
                     <Label htmlFor="pep" className="flex flex-1 items-start justify-between cursor-pointer font-normal">
                      <div className="flex flex-col space-y-1">
                        <span className="font-medium">PEP Store</span>
                        <span className="text-xs text-muted-foreground">Collect from your nearest PEP store.</span>
                      </div>
                      <span className="font-bold">{formatPrice(80)}</span>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="mt-4 space-y-2">
                  <Label htmlFor="collectionPoint">
                    {shippingMethod === 'pargo' ? 'Nearest Pargo Collection Point' : 'Nearest PEP Store'}
                  </Label>
                  <Input 
                    id="collectionPoint" 
                    name="collectionPoint" 
                    required 
                    placeholder={shippingMethod === 'pargo' ? 'e.g. Clicks Gardens Center' : 'e.g. PEP Gardens Center'}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Order Summary */}
          <div className="md:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="truncate flex-1 pr-4">{item.title} (x{item.quantity})</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>

                {state.error && (
                  <div className="text-destructive text-sm bg-destructive/10 p-2 rounded">
                    {state.error}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                 <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Place Order
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
