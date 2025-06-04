// src/hooks/useOrderPolling.ts
'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import type { Order } from '@/interfaces/order';

export function useOrderPolling(orderId: string, initial: Order) {
  const [order, setOrder] = useState<Order>(initial);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const fresh = await api<Order>(`/orders/${orderId}`);
        setOrder(fresh);
      } catch { /* ignore polling errors */ }
    }, 7000); // poll every 7s

    return () => clearInterval(interval);
  }, [orderId]);

  return order;
}
