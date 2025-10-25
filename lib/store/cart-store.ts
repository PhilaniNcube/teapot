import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Book } from '@/payload-types'

export interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  coverImageUrl?: string
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

interface CartActions {
  addItem: (book: Book) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getItemQuantity: (id: number) => number
}

type CartStore = CartState & CartActions

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  return { totalItems, totalPrice }
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (book: Book) => {
        const items = get().items
        const existingItem = items.find(item => item.id === book.id)
        
        let newItems: CartItem[]
        
        if (existingItem) {
          // If item already exists, increase quantity
          newItems = items.map(item =>
            item.id === book.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        } else {
          // Add new item to cart
          const newItem: CartItem = {
            id: book.id,
            title: book.title,
            price: book.price,
            quantity: 1,
            coverImageUrl: typeof book.coverImage === 'object' && book.coverImage?.url 
              ? book.coverImage.url 
              : undefined
          }
          newItems = [...items, newItem]
        }
        
        const { totalItems, totalPrice } = calculateTotals(newItems)
        
        set({
          items: newItems,
          totalItems,
          totalPrice
        })
      },

      removeItem: (id: number) => {
        const items = get().items
        const newItems = items.filter(item => item.id !== id)
        const { totalItems, totalPrice } = calculateTotals(newItems)
        
        set({
          items: newItems,
          totalItems,
          totalPrice
        })
      },

      updateQuantity: (id: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        
        const items = get().items
        const newItems = items.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
        const { totalItems, totalPrice } = calculateTotals(newItems)
        
        set({
          items: newItems,
          totalItems,
          totalPrice
        })
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0
        })
      },

      getItemQuantity: (id: number) => {
        const item = get().items.find(item => item.id === id)
        return item ? item.quantity : 0
      }
    }),
    {
      name: 'teapot-cart-storage',
      storage: createJSONStorage(() => typeof window !== 'undefined' ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      }),
    }
  )
)