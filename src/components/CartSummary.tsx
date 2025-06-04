'use client';

import { useCart } from '@/context/CartContext';
import { useOrder } from '@/hooks/useOrder';
import { useState } from 'react';

export default function CartSummary({ restaurantId }: { restaurantId: string }) {
  const { items, clearCart } = useCart();
  const { placeOrder, order, loading, error } = useOrder();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  async function handlePlaceOrder() {
    if (!restaurantId) return;
    const itemsForOrder = items.map(i => ({
      menuItem: i.itemId,
      quantity: i.quantity,
      price: i.price,
    }));
    const result = await placeOrder(itemsForOrder, restaurantId);
    if (result) {
      setOrderPlaced(true);
      clearCart();
    }
  }

  if (orderPlaced && order) {
    return (
      <div className="mt-6 bg-green-50 border border-green-300 rounded-2xl p-6 text-center">
        <div className="text-xl font-semibold text-green-700 mb-2">Order Placed!</div>
        <div className="text-gray-700 mb-2">Your order is now <b>{order.status}</b>. Order ID: <span className="font-mono">{order._id.slice(-6)}</span></div>
        <div className="text-xs text-gray-500">Track your order in "My Orders".</div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between font-semibold text-lg">
        <span>Subtotal</span>
        <span>₦{subtotal.toLocaleString()}</span>
      </div>
      <button
        className="mt-4 w-full bg-primary text-white py-3 rounded-2xl font-bold shadow hover:bg-primary/90 transition"
        onClick={handlePlaceOrder}
        disabled={loading || !items.length}
      >
        {loading ? 'Placing Order…' : 'Place Order'}
      </button>
      {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
    </div>
  );
}
