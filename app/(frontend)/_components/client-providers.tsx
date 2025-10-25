'use client'

import { CartProvider } from "@/lib/store/cart-provider";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}