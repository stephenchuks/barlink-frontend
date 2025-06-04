'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface OrderPreview {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  // Add more fields as needed
}

// Placeholder fetcher – replace with actual API call in a real app
async function fetchOrder(id: string): Promise<OrderPreview | null> {
  // Simulate API fetch here
  // Replace with real fetch(`/api/orders/${id}`) logic
  return {
    id,
    status: 'pending',
    total: 4300,
    createdAt: new Date().toISOString(),
  };
}

export default function OrderStatusPreview() {
  const [order, setOrder] = useState<OrderPreview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lastOrderId = typeof window !== 'undefined' && localStorage.getItem('lastOrderId');
    if (lastOrderId) {
      fetchOrder(lastOrderId).then((order) => {
        setOrder(order);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return null;
  if (!order) return null;

  return (
    <section className="max-w-3xl mx-auto mt-6 px-4">
      <div className="rounded-2xl bg-white shadow-card px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-gray-800 font-semibold">
            Last Order <span className="text-primary">#{order.id.slice(-4)}</span>
          </div>
          <div className="text-sm text-gray-500">Status: <span className="capitalize">{order.status}</span></div>
          <div className="text-sm text-gray-500">Total: ₦{order.total.toLocaleString()}</div>
        </div>
        <div className="mt-3 md:mt-0">
          <Link
            href={`/orders/${order.id}`}
            className="inline-block bg-primary text-white font-medium px-4 py-2 rounded-2xl shadow transition hover:bg-primary/90"
          >
            View Details →
          </Link>
        </div>
      </div>
    </section>
  );
}
