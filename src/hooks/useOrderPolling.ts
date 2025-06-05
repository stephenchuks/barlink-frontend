import { useEffect, useState, useRef } from 'react';
import { api } from '@/lib/api';
import { Order } from '@/interfaces/order';

interface UseOrderPollingOptions {
  orderId: string;
  interval?: number;
  onUpdate?: (order: Order) => void;
}

export function useOrderPolling({
  orderId,
  interval = 5000,
  onUpdate,
}: UseOrderPollingOptions) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ FIX: correct ref typing and initialization!
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!orderId) return;
    let mounted = true;

    async function fetchOrder() {
      try {
        setLoading(true);
        setError(null);
        const result = await api<Order>(`/orders/${orderId}`);
        if (!mounted) return;
        setOrder(result);
        if (onUpdate) onUpdate(result);
      } catch (err: any) {
        if (!mounted) return;
        setError(err.message || 'Failed to fetch order');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchOrder();
    timer.current = setInterval(fetchOrder, interval);

    return () => {
      mounted = false;
      if (timer.current) clearInterval(timer.current);
    };
  }, [orderId, interval, onUpdate]);

  return { order, loading, error };
}
