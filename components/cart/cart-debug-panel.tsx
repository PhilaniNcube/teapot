'use client'

import { useCart } from '@/lib/store/cart-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trash2, ShoppingCart } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'

export function CartDebugPanel() {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    isHydrated 
  } = useCart()

  if (!isHydrated) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Cart Debug (Loading...)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Hydrating cart state...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Cart Debug
            {totalItems > 0 && (
              <Badge variant="secondary">{totalItems}</Badge>
            )}
          </CardTitle>
          {items.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearCart}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            Cart is empty
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-2 border rounded">
                {item.coverImageUrl && (
                  <div className="relative w-8 h-10 bg-muted rounded overflow-hidden">
                    <Image
                      src={item.coverImageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatPrice(item.price)} × {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span className="text-xs w-6 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))}
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center font-medium">
                <span>Total:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}