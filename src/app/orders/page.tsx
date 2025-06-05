'use client';

import { useEffect, useState } from 'react';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { api } from '@/lib/api';
import OrdersFilterBar from '@/components/OrdersFilterBar';
import OrdersList from '@/components/OrdersList';
import type { Order } from '@/interfaces/order';

export default function OrdersPage() {
  useRequireAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtering/search UI state
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      setError(null);
      try {
        // GET all orders for the authenticated user (customer)
        const res: Order[] = await api('/orders/me');
        setOrders(res);
      } catch (err: any) {
        setError(err.message || 'Failed to load orders.');
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  // Filter/search logic
  const filtered = orders.filter(order => {
    const matchStatus = status === 'all' || order.status === status;
    const matchSearch =
      !search ||
      order._id.toLowerCase().includes(search.toLowerCase()) ||
      order._id.slice(-6).toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded-xl shadow-card">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      <OrdersFilterBar
        status={status}
        setStatus={setStatus}
        search={search}
        setSearch={setSearch}
      />
      {loading ? (
        <div className="text-center py-8">Loading your orders...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-8">{error}</div>
      ) : (
        <OrdersList orders={filtered} />
      )}
    </div>
  );
}
