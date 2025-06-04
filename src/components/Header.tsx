'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function Header() {
  const { items } = useCart();
  const totalCount = items.reduce((sum: number, i) => sum + i.quantity, 0);

  return (
    <header className="w-full bg-white shadow-card sticky top-0 z-20">
      <div className="max-w-4xl mx-auto flex items-center justify-between py-4 px-4">
        <Link href="/" className="text-2xl font-bold text-primary tracking-tight">
          Barlink
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/cart" className="relative group" aria-label="View Cart">
            <ShoppingCart className="w-7 h-7 text-gray-700 group-hover:text-primary transition" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-primary text-white text-xs rounded-full px-1.5 py-0.5 font-semibold min-w-[20px] text-center">
                {totalCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
