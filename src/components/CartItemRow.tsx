'use client';

import { useCart } from '@/context/CartContext';
import type { CartItem } from '@/interfaces/cart';
import { X } from 'lucide-react';

export default function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-white shadow-card mb-2">
      <div>
        <div className="font-semibold">{item.name}</div>
        <div className="text-xs text-gray-500">₦{item.price.toLocaleString()}</div>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="px-2 text-lg bg-neutral-100 rounded-full"
          onClick={() => updateQuantity(item.itemId, Math.max(1, item.quantity - 1))}
          aria-label="Decrease"
        >−</button>
        <span className="font-semibold w-5 text-center">{item.quantity}</span>
        <button
          className="px-2 text-lg bg-neutral-100 rounded-full"
          onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
          aria-label="Increase"
        >+</button>
        <button
          className="ml-2 text-gray-400 hover:text-red-500"
          onClick={() => removeFromCart(item.itemId)}
          aria-label="Remove"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="w-16 text-right font-semibold">
        ₦{(item.price * item.quantity).toLocaleString()}
      </div>
    </div>
  );
}
