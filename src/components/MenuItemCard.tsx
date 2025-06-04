'use client';

import type { MenuItem } from '@/interfaces/menu';
import { useCart } from '@/context/CartContext';

export default function MenuItemCard({ item, menuId }: { item: MenuItem; menuId: string }) {
  const { addToCart } = useCart();
  return (
    <div className="rounded-2xl bg-white p-4 shadow-card flex flex-col gap-2">
      <div className="font-semibold text-lg">{item.name}</div>
      <div className="text-sm text-gray-700">{item.description}</div>
      <div className="flex items-center justify-between mt-2">
        <span className="font-bold text-primary">₦{item.price.toLocaleString()}</span>
        <button
          className="bg-primary text-white rounded-2xl px-3 py-1 font-semibold shadow hover:bg-primary/90 transition"
          onClick={() => addToCart(item, menuId)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
