'use client';

import type { CartItem } from '@/interfaces/cart';
import { useCart } from '@/context/CartContext';

export default function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between py-2 border-b">
      <div>
        <div className="font-semibold">{item.name}</div>
        <div className="text-xs text-gray-500">₦{item.price.toLocaleString()} each</div>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="rounded bg-gray-200 px-2 py-1 font-bold"
          aria-label="Decrease quantity"
          disabled={item.quantity === 1}
          onClick={() => item.quantity > 1 && updateQuantity(item.itemId, item.quantity - 1)}
        >
          –
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          className="rounded bg-gray-200 px-2 py-1 font-bold"
          aria-label="Increase quantity"
          onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
        >
          +
        </button>
        <span className="font-semibold text-gray-700">
          ₦{(item.price * item.quantity).toLocaleString()}
        </span>
        <button
          className="ml-2 text-red-500 text-xs font-semibold hover:underline"
          onClick={() => removeFromCart(item.itemId)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
