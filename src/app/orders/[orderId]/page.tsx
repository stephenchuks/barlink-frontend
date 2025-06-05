'use client';

import { useParams } from 'next/navigation';
import { useOrderPolling } from '@/hooks/useOrderPolling';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { toast } from 'sonner';
import { Order } from '@/interfaces/order';

export default function OrderStatusPage() {
  useRequireAuth();

  // Params handling
  const params = useParams();
  const rawId = params?.orderId;
  // If dynamic param is an array (possible in Next), take first element; else just the string.
  const orderId = Array.isArray(rawId) ? rawId[0] : rawId;

  // Guard for missing orderId
  if (!orderId || typeof orderId !== 'string') {
    return (
      <div className="text-center text-red-600 py-10">
        Invalid order ID.
      </div>
    );
  }

  const { order, loading, error } = useOrderPolling({
    orderId,
    interval: 5000,
    onUpdate: (newOrder) => {
      if (newOrder.status === 'served') {
        toast.success('Your order is served!');
      }
      if (newOrder.status === 'paid') {
        toast.success('Your order is paid. Thank you!');
      }
    },
  });

  if (loading) {
    return <div className="text-center py-10">Loading order status...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-10">{error}</div>;
  }

  if (!order) {
    return (
      <div className="text-center py-10 text-gray-600">
        Order not found.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-2">Order Status</h2>
      <div className="mb-2">
        <span className="text-gray-500">Order #</span>
        <span className="font-mono ml-1">{order._id.slice(-6).toUpperCase()}</span>
      </div>
      <div className="mb-2">
        <span
          className={`inline-block px-2 py-1 rounded text-xs font-bold ${
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
      <div className="text-xs text-gray-500 mb-4">
        Placed: {new Date(order.createdAt).toLocaleString()}
      </div>
      <ul className="divide-y">
        {order.items.map((item, i) => (
          <li key={i} className="py-2 flex justify-between text-sm">
            <span>
              {item.quantity} × {typeof item.menuItem === 'string' ? item.menuItem : '[unknown]'}
            </span>
            <span>₦{item.price}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-right font-semibold">
        Total: ₦{order.total}
      </div>
      <div className="mt-4 text-xs text-gray-400">
        Updated: {new Date(order.updatedAt).toLocaleString()}
      </div>
    </div>
  );
}
