'use client';

import { useCart } from '@/context/CartContext';
import CartItemRow from '@/components/CartItemRow';
import CartSummary from '@/components/CartSummary';
import { useEffect, useState } from 'react';

// For MVP: keep restaurantId in local state or derive from items
export default function CartPage() {
  const { items } = useCart();
  const [restaurantId, setRestaurantId] = useState('');

  useEffect(() => {
    if (items.length) {
      setRestaurantId(items[0].menuId);
    }
  }, [items]);

  if (!items.length) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">Your Cart</h1>
        <div className="text-gray-500">Your cart is empty.</div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-primary mb-4">Your Cart</h1>
      <div className="bg-white rounded-2xl shadow-card p-4">
        {items.map(item => (
          <CartItemRow key={item.itemId} item={item} />
        ))}
        <CartSummary />

      </div>
    </div>
  );
}
