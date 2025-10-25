'use client'

import { useCart } from '@/lib/store/cart-provider'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Plus, Minus, X } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'

export function CartIcon() {
  const { totalItems, isHydrated } = useCart()

  if (!isHydrated) {
    return (
      <Button variant="outline" size="icon" className="relative">
        <ShoppingCart className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg px-4 py-3">
        <CartContent />
      </SheetContent>
    </Sheet>
  )
}

function CartContent() {
  const { items, totalPrice, totalItems, updateQuantity, removeItem, clearCart, isHydrated } = useCart()

  if (!isHydrated) {
    return (
      <div>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="flex items-center justify-center h-40">
          <p className="text-muted-foreground">Loading cart...</p>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-center justify-center h-40 space-y-2">
          <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          <p className="text-muted-foreground">Your cart is empty</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <SheetHeader>
        <div className="flex items-center justify-between">
          <SheetTitle>Shopping Cart ({totalItems} items)</SheetTitle>
          <Button variant="ghost" size="sm" onClick={clearCart}>
            Clear all
          </Button>
        </div>
      </SheetHeader>
      
      <ScrollArea className="flex-1 mt-4">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              {item.coverImageUrl && (
                <div className="relative w-16 h-20 bg-muted rounded overflow-hidden">
                  <Image
                    src={item.coverImageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm leading-none truncate">{item.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatPrice(item.price)}
                </p>
                
                <div className="flex items-center space-x-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-medium w-8 text-center">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-medium text-sm">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-destructive hover:text-destructive"
                  onClick={() => removeItem(item.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="border-t pt-4 mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Total</span>
          <span className="font-bold text-lg">{formatPrice(totalPrice)}</span>
        </div>
        
        <Button className="w-full" size="lg">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  )
}