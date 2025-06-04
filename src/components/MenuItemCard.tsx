'use client';

import type { MenuItem } from '@/interfaces/menu';
import { useCart } from '@/context/CartContext';

interface Props {
  item: MenuItem;
  menuId: string;
}

export default function MenuItemCard({ item, menuId }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="rounded-2xl bg-white shadow-card p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-800">{item.name}</span>
        <span className="text-primary font-bold">₦{item.price.toLocaleString()}</span>
      </div>
      {item.description && (
        <p className="text-gray-500 text-sm">{item.description}</p>
      )}
      <button
        className="mt-2 w-max bg-primary text-white rounded-2xl px-4 py-2 font-medium hover:bg-primary/90 transition"
        onClick={() => addToCart(item, menuId)}
      >
        Add to Cart
      </button>
    </div>
  );
}

