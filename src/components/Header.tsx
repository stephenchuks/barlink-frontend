'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Header() {
  const { items } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Count cart items
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Helper: style for active link
  function navLinkClass(path: string) {
    return pathname === path
      ? 'text-primary font-semibold underline underline-offset-4'
      : 'hover:text-primary transition-colors';
  }

  return (
    <header className="bg-white shadow sticky top-0 z-20">
      <nav className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-primary flex items-center gap-2">
          {/* Barlink Logo or Text */}
          <span>Barlink</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex gap-6 items-center">
          <Link href="/" className={navLinkClass('/')}>
            Discover
          </Link>
          <Link href="/orders" className={navLinkClass('/orders')}>
            My Orders
          </Link>
          <Link href="/cart" className="relative group">
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-primary text-white px-2 py-0.5 rounded-full font-bold shadow">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="sm:hidden flex items-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <rect x="4" y="6" width="16" height="2" rx="1" fill="#0d9488" />
            <rect x="4" y="11" width="16" height="2" rx="1" fill="#0d9488" />
            <rect x="4" y="16" width="16" height="2" rx="1" fill="#0d9488" />
          </svg>
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100 py-2 px-4 space-y-2">
          <Link
            href="/"
            className={navLinkClass('/')}
            onClick={() => setMenuOpen(false)}
          >
            Discover
          </Link>
          <Link
            href="/orders"
            className={navLinkClass('/orders')}
            onClick={() => setMenuOpen(false)}
          >
            My Orders
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center"
            onClick={() => setMenuOpen(false)}
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-2 left-6 text-xs bg-primary text-white px-2 py-0.5 rounded-full font-bold shadow">
                {cartCount}
              </span>
            )}
            <span className="ml-2">Cart</span>
          </Link>
        </div>
      )}
    </header>
  );
}

// Simple SVG Cart icon (replace with Heroicons if you have @heroicons/react)
function CartIcon() {
  return (
    <svg
      className="w-6 h-6 inline-block"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="9" cy="21" r="1.5" />
      <circle cx="18" cy="21" r="1.5" />
      <path
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2-6h13.2M7 13l-2 8m11-8V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
