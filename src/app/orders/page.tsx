'use client';

import { useEffect, useState } from 'react';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { api } from '@/lib/api';
import { toast } from 'sonner';

// (Re-use your types)
interface OrderItem {
  menuItem: string; // could be menuItemId or you can expand as needed
  quantity: number;
  price: number;
}
interface Order {
  _id: string;
  restaurant: string;
  user: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function OrdersPage() {
  useRequireAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      setError(null);
      try {
        // GET all orders for the authenticated user (customer)
        const res: Order[] = await api('/orders/me'); // endpoint must exist in your backend!
        setOrders(res);
      } catch (err: any) {
        setError(err.message || 'Failed to load orders.');
        toast.error(err.message || 'Failed to load orders.');
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading your orders...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        {error}
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center py-8 text-gray-600">
        You have no orders yet. Browse the menu and order your first meal!
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      <ul className="space-y-4">
        {orders.map(order => (
          <li
            key={order._id}
            className="border rounded-lg p-4 shadow-sm hover:shadow transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Order #{order._id.slice(-6).toUpperCase()}</span>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  order.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : order.status === 'served'
                    ? 'bg-blue-100 text-blue-700'
                    : order.status === 'paid'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {order.status}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <ul className="text-sm mb-2">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.quantity} × {item.menuItem} &mdash; ₦{item.price}
                </li>
              ))}
            </ul>
            <div className="text-right font-bold">
              Total: ₦{order.total}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
