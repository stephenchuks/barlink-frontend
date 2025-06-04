import { api } from '@/lib/api';
import type { Order } from '@/interfaces/order';
import { useOrderPolling } from '@/hooks/useOrderPolling';

interface Props {
  params: { orderId: string };
}

export default async function OrderStatusPage({ params }: Props) {
  let order: Order | null = null;
  let error = '';
  try {
    order = await api<Order>(`/orders/${params.orderId}`);
  } catch (e: any) {
    error = e.message || 'Order not found';
  }

  if (error || !order)
    return (
      <div className="max-w-md mx-auto mt-10 text-center text-red-600">
        {error || 'Order not found'}
      </div>
    );

  // For client polling
  function ClientOrderStatus({ order: initial }: { order: Order }) {
    const polledOrder = useOrderPolling(params.orderId, initial);
    return (
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-card">
        <h1 className="text-2xl font-bold mb-4">Order #{polledOrder._id.slice(-5)}</h1>
        <div className="mb-2 font-semibold">
          Status:{' '}
          <span className="capitalize">
            {polledOrder.status}
          </span>
        </div>
        <div>
          <ul>
            {polledOrder.items.map((item, idx) => (
              <li key={idx} className="flex justify-between py-1 border-b last:border-0">
                <span>Qty {item.quantity} × </span>
                <span>₦{item.price.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 font-bold flex justify-between">
          <span>Total</span>
          <span>₦{polledOrder.total.toLocaleString()}</span>
        </div>
      </div>
    );
  }

  // Must wrap in 'use client' for client-side
  return <ClientOrderStatus order={order} />;
}
