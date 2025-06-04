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
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={e => updateQuantity(item.itemId, Number(e.target.value))}
          className="w-12 border rounded px-2 py-1 text-center"
        />
        <span className="font-semibold text-gray-700">₦{(item.price * item.quantity).toLocaleString()}</span>
        <button
          className="ml-2 text-red-500 text-sm font-semibold hover:underline"
          onClick={() => removeFromCart(item.itemId)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
