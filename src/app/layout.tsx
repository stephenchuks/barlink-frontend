// src/app/layout.tsx

import './globals.css';
import './globals.css';
import Header from '@/components/Header';
import { CartProvider } from '@/context/CartContext';  // <-- Make sure import path is correct
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {/* PROVIDER MUST BE OUTSIDE Header */}
        <CartProvider>
          <Header />
          <main className="pt-4 pb-10 max-w-4xl mx-auto">{children}</main>
        </CartProvider>
        <Toaster position="top-right" richColors closeButton duration={4500} />
      </body>
    </html>
  );
}
