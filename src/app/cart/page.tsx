'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CartSummary from '@/components/CartSummary';
import { useCart } from '@/context/CartContext';
import type { CartItem } from '@/interfaces/cart';
import { api } from '@/lib/api';

export default function CartPage() {
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    if (items.length === 0) return toast.error('Cart is empty!');
    setLoading(true);
    try {
      // Prepare payload for /api/orders
      const payload = {
        items: items.map((i: CartItem) => ({
          menuItem: i.itemId,
          quantity: i.quantity,
          price: i.price,
        })),
      };
      // Call backend API
      const order = await api('/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      toast.success('Order placed!');
      clearCart();
      router.push(`/orders/${order._id}`);
    } catch (e: any) {
      toast.error(e.message || 'Order failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-8">
      <CartSummary />
      <div className="max-w-md mx-auto mt-4 flex justify-end">
        <button
          className="bg-primary text-white rounded-xl py-2 px-6 font-semibold hover:bg-primary/90 transition disabled:opacity-60"
          onClick={handleCheckout}
          disabled={loading || items.length === 0}
        >
          {loading ? 'Placing Order...' : 'Checkout'}
        </button>
      </div>
    </div>
  );
}
