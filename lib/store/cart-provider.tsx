'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useCartStore } from './cart-store'

interface CartContextType {
  isHydrated: boolean
}

const CartContext = createContext<CartContextType>({ isHydrated: false })

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Use a timeout to ensure this runs after the initial render to avoid hydration mismatches
    const timer = setTimeout(() => {
      setIsHydrated(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <CartContext.Provider value={{ isHydrated }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}

// Custom hook that combines cart store with hydration state
export function useCart() {
  const cart = useCartStore()
  const { isHydrated } = useCartContext()
  
  // Return safe defaults when not hydrated to prevent hydration mismatches
  if (!isHydrated) {
    return {
      ...cart,
      items: [],
      totalItems: 0,
      totalPrice: 0,
      isHydrated: false
    }
  }
  
  return {
    ...cart,
    isHydrated: true
  }
}