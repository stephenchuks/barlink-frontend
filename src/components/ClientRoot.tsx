// src/components/ClientRoot.tsx
'use client';

import Header from '@/components/Header';
import ToastManager from '@/components/ToastManager';

// This component is ONLY for app-wide providers that do NOT need restaurant slug.
// CartProvider should NOT be here.

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-4">{children}</main>
      <ToastManager />
    </>
  );
}
