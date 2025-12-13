'use client'

import { useCart } from '@/lib/store/cart-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/utils'
import { createOrder, OrderState } from './actions'
import { useActionState, useEffect, startTransition } from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema, CheckoutSchema } from '@/lib/validators/checkout'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const initialState: OrderState = {}

export default function CheckoutPage() {
  const { items, totalPrice, isHydrated, clearCart } = useCart()
  const [state, action, isPending] = useActionState(createOrder, initialState)

  const form = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      province: '',
      shippingMethod: 'pargo',
      collectionPoint: '',
      cartItems: [],
    },
  })

  // Watch for dynamic updates
  const shippingMethod = form.watch('shippingMethod')
  const shippingCost = shippingMethod === 'pargo' ? 100 : 80
  const finalTotal = totalPrice + shippingCost

  // Sync cart items to form
  useEffect(() => {
    if (items.length > 0) {
      // Map store items to schema items
      const schemaItems = items.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      }))
      form.setValue('cartItems', schemaItems)
    }
  }, [items, form])

  useEffect(() => {
    if (state.success) {
      clearCart()
    }
  }, [state.success, clearCart])

  const onSubmit = (data: CheckoutSchema) => {
    startTransition(() => {
      action(data)
    })
  }

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
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column: Customer Details & Shipping */}
            <div className="md:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+27 12 345 6789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-2" />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="123 Main St, Suburb" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                     <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Cape Town" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="8001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                   <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Province</FormLabel>
                        <FormControl>
                          <Input placeholder="Western Cape" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shipping Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="shippingMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:bg-muted/50 transition-colors space-y-0">
                              <FormControl>
                                <RadioGroupItem value="pargo" />
                              </FormControl>
                              <FormLabel className="flex flex-1 items-start justify-between cursor-pointer font-normal m-0">
                                <div className="flex flex-col space-y-1">
                                  <span className="font-medium">Pargo</span>
                                  <span className="text-xs text-muted-foreground">Collect from over 3,000 pickup points nationwide.</span>
                                </div>
                                <span className="font-bold">{formatPrice(100)}</span>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:bg-muted/50 transition-colors space-y-0">
                              <FormControl>
                                <RadioGroupItem value="pep" />
                              </FormControl>
                              <FormLabel className="flex flex-1 items-start justify-between cursor-pointer font-normal m-0">
                                <div className="flex flex-col space-y-1">
                                  <span className="font-medium">PEP Store</span>
                                  <span className="text-xs text-muted-foreground">Collect from your nearest PEP store.</span>
                                </div>
                                <span className="font-bold">{formatPrice(80)}</span>
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mt-4 space-y-2">
                    <FormField
                      control={form.control}
                      name="collectionPoint"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {shippingMethod === 'pargo' ? 'Nearest Pargo Collection Point' : 'Nearest PEP Store'}
                          </FormLabel>
                          <FormControl>
                             <Input 
                              placeholder={shippingMethod === 'pargo' ? 'e.g. Clicks Gardens Center' : 'e.g. PEP Gardens Center'} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
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
                  {state.errors && (
                    <div className="text-destructive text-sm p-2">
                      <ul className="list-disc pl-4">
                        {Object.entries(state.errors).map(([key, messages]) => (
                            messages.map((msg, i) => <li key={`${key}-${i}`}>{msg}</li>)
                        ))}
                      </ul>
                    </div>
                  )}

                   {/* Hidden field to ensure cart items are registered if needed, though we sync with setValue */}
                   <input type="hidden" {...form.register('cartItems')} />

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
      </Form>
    </div>
  )
}
