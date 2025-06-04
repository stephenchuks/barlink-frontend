import { api } from '@/lib/api';
import type { Order } from '@/interfaces/order';

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

  if (error)
    return (
      <div className="max-w-md mx-auto mt-10 text-center text-red-600">
        {error}
      </div>
    );

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-card">
      <h1 className="text-2xl font-bold mb-4">Order #{order?._id}</h1>
      <div className="mb-2 font-semibold">Status: <span className="capitalize">{order?.status}</span></div>
      <div>
        <ul>
          {order?.items.map((item, idx) => (
            <li key={idx} className="flex justify-between py-1 border-b last:border-0">
              <span>Qty {item.quantity} × </span>
              <span>₦{item.price.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 font-bold flex justify-between">
        <span>Total</span>
        <span>₦{order?.total.toLocaleString()}</span>
      </div>
    </div>
  );
}
