'use client';

import Header from '@/components/Header';
import ToastManager from '@/components/ToastManager';
import { CartProvider } from '@/context/CartContext';

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main className="pt-4">{children}</main>
      <ToastManager />
    </CartProvider>
  );
}
