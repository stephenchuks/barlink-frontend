// src/app/r/[slug]/cart/page.tsx
'use client';

import { useParams } from 'next/navigation';
import CartSummary from '@/components/CartSummary';

export default function CartPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  if (!slug) {
    return (
      <div className="text-center text-red-600 py-12">
        Missing restaurant context.
      </div>
    );
  }

  return (
    <div className="pt-8">
      <CartSummary slug={slug} />
    </div>
  );
}
