'use client'

import { useCart } from '@/lib/store/cart-provider'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Check, Plus, Minus } from 'lucide-react'
import { Book } from '@/payload-types'
import { useState, useEffect } from 'react'

interface AddToCartButtonProps {
  book: Book
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  showQuantityControls?: boolean
  className?: string
}

export function AddToCartButton({ 
  book, 
  variant = 'default', 
  size = 'default',
  showQuantityControls = true,
  className 
}: AddToCartButtonProps) {
  const { addItem, getItemQuantity, updateQuantity, isHydrated } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        setQuantity(getItemQuantity(book.id))
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [book.id, getItemQuantity, isHydrated])

  const handleAddToCart = async () => {
    setIsAdding(true)
    addItem(book)
    
    // Brief loading state for better UX
    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(book.id, newQuantity)
  }

  if (!isHydrated) {
    return (
      <Button variant={variant} size={size} className={className} disabled>
        <ShoppingCart className="h-4 w-4 mr-2" />
        Add to Cart
      </Button>
    )
  }

  // Show quantity controls if item is in cart and showQuantityControls is true
  if (quantity > 0 && showQuantityControls) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="px-3 py-1 text-sm font-medium min-w-8 text-center">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={className}
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      {isAdding ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Added!
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </>
      )}
    </Button>
  )
}