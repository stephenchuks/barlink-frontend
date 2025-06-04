'use client';

import { useState } from 'react';
import { OrderSchema } from '@/schemas/order';
import type { Order } from '@/schemas/order';

export function useOrder() {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string>('');

  async function placeOrder(items: { menuItem: string; quantity: number; price: number }[], restaurant: string) {
    setLoading(true);
    setError('');
    setOrder(null);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, restaurant }),
      });
      if (!res.ok) throw new Error('Order failed');
      const json = await res.json();
      const parsed = OrderSchema.safeParse(json);
      if (!parsed.success) throw new Error('Bad order response');
      setOrder(parsed.data);
      return parsed.data;
    } catch (e: any) {
      setError(e?.message || 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { placeOrder, order, loading, error };
}
