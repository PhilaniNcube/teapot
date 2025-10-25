'use client'

import { useCart } from '@/lib/store/cart-provider'
import { formatPrice } from '@/lib/utils'

export function CartSummary() {
  const { totalItems, totalPrice, isHydrated } = useCart()

  if (!isHydrated) {
    return (
      <div className="text-sm text-muted-foreground">
        Cart: 0 items
      </div>
    )
  }

  if (totalItems === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        Cart: 0 items
      </div>
    )
  }

  return (
    <div className="text-sm">
      <span className="font-medium">
        Cart: {totalItems} item{totalItems !== 1 ? 's' : ''} • {formatPrice(totalPrice)}
      </span>
    </div>
  )
}