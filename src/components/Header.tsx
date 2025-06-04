// src/components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-card sticky top-0 z-20">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
        <Link href="/">
          <span className="text-2xl font-bold tracking-tight text-primary">
            Barlink
          </span>
        </Link>
        {/* Future: Navigation, Cart, Account */}
      </div>
    </header>
  );
}
