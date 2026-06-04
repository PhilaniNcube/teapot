'use client'

import { CartProvider } from "@/lib/store/cart-provider";
import { Toaster } from "@/components/ui/sonner";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Toaster position="bottom-right" richColors />
    </CartProvider>
  );
}