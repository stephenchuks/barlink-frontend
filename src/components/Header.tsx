// src/components/Header.tsx
'use client';

import Link from 'next/link';

export default function Header() {
  // Simulate cart count as 2 for demo, later pull from context
  const cartCount = 2;
  return (
    <header className="w-full border-b bg-white sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6">
        <div className="text-2xl font-extrabold tracking-tight">
          Temporarily BarLink
        </div>
        <nav className="flex items-center gap-8 font-medium text-gray-700">
          <Link href="/" className="hover:text-primary">Menu</Link>
          <Link href="/orders" className="hover:text-primary">My Orders</Link>
          <Link href="/favorites" className="hover:text-primary">Favorites</Link>
          <Link href="/profile" className="hover:text-primary">Profile</Link>
          <Link href="/help" className="hover:text-primary">Help</Link>
          <Link href="/cart" className="relative group ml-2">
            <svg className="w-6 h-6 inline" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="9" cy="21" r="1.5" />
              <circle cx="18" cy="21" r="1.5" />
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2-6h13.2M7 13l-2 8m11-8V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-3 text-xs bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold shadow">{cartCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
