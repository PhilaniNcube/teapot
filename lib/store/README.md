# Cart Implementation with Zustand

This cart system uses Zustand for state management with localStorage persistence and includes proper Next.js SSR support.

## Features

- ✅ Add items to cart
- ✅ Remove items from cart
- ✅ Update quantities
- ✅ Clear entire cart
- ✅ Persistent storage (localStorage)
- ✅ SSR/hydration safe
- ✅ TypeScript support
- ✅ Optimistic updates

## Components

### CartProvider
Wrap your app with `CartProvider` to enable cart functionality and handle SSR hydration.

```tsx
import { CartProvider } from '@/lib/store/cart-provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
```

### CartIcon
Displays a shopping cart icon with item count badge and opens the cart drawer.

```tsx
import { CartIcon } from '@/components/cart/cart-icon'

export function Navigation() {
  return (
    <nav>
      {/* other nav items */}
      <CartIcon />
    </nav>
  )
}
```

### AddToCartButton
Button component for adding items to cart with optional quantity controls.

```tsx
import { AddToCartButton } from '@/components/cart/add-to-cart-button'

export function BookCard({ book }) {
  return (
    <div>
      {/* book details */}
      <AddToCartButton 
        book={book}
        variant="outline"
        size="sm"
        showQuantityControls={true}
      />
    </div>
  )
}
```

### CartSummary
Simple text summary of cart contents.

```tsx
import { CartSummary } from '@/components/cart/cart-summary'

export function Header() {
  return (
    <header>
      <CartSummary />
    </header>
  )
}
```

## Hooks

### useCart
Main hook for accessing cart state and actions.

```tsx
import { useCart } from '@/lib/store/cart-provider'

export function MyComponent() {
  const { 
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isHydrated
  } = useCart()

  // Always check isHydrated before rendering cart-dependent UI
  if (!isHydrated) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <p>Total items: {totalItems}</p>
      <p>Total price: {totalPrice}</p>
    </div>
  )
}
```

### useCartStore (Direct Zustand Store)
For advanced use cases where you need direct store access.

```tsx
import { useCartStore } from '@/lib/store/cart-store'

export function AdvancedComponent() {
  const items = useCartStore(state => state.items)
  const addItem = useCartStore(state => state.addItem)
  
  // Note: This doesn't include hydration safety
}
```

## Types

### CartItem
```tsx
interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  coverImageUrl?: string
}
```

## Usage Examples

### Basic Add to Cart
```tsx
const { addItem } = useCart()

const handleAddToCart = () => {
  addItem(book)
}
```

### Update Quantity
```tsx
const { updateQuantity } = useCart()

const handleQuantityChange = (bookId: number, newQuantity: number) => {
  updateQuantity(bookId, newQuantity)
}
```

### Check if Item is in Cart
```tsx
const { getItemQuantity } = useCart()

const quantity = getItemQuantity(book.id)
const isInCart = quantity > 0
```

### Clear Cart
```tsx
const { clearCart } = useCart()

const handleClearCart = () => {
  clearCart()
}
```

## Best Practices

1. **Always check `isHydrated`** before rendering cart-dependent UI to prevent hydration mismatches
2. **Use the `useCart` hook** instead of `useCartStore` directly for automatic hydration handling
3. **Wrap your app** with `CartProvider` at the root level
4. **Handle loading states** while cart is hydrating
5. **Use optimistic updates** - the cart will show immediate feedback while persisting to localStorage

## Storage

Cart data is automatically persisted to localStorage under the key `teapot-cart-storage`. The cart will restore its state when the user returns to the site.