// src/app/r/[slug]/[orderId]/page.tsx
import { apiFetch } from '@/lib/api';

interface PageParams {
  slug: string | string[];
  orderId: string | string[];
}

export default async function OrderStatusPage({ params }: { params: PageParams }) {
  const slugRaw = params.slug;
  const slug = Array.isArray(slugRaw) ? slugRaw[0] : slugRaw;
  const orderIdRaw = params.orderId;
  const orderId = Array.isArray(orderIdRaw) ? orderIdRaw[0] : orderIdRaw;

  if (!slug || !orderId) {
    return <div className="text-center py-12 text-red-600">Missing restaurant or order context.</div>;
  }

  let order, error = '';
  try {
    order = await apiFetch<any>(slug, `/orders/${orderId}`, {}, true);
  } catch (err: any) {
    error = err?.message || 'Order not found';
  }

  if (error || !order) {
    return (
      <div className="text-center py-12 text-red-600">{error || 'Order not found.'}</div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-2">Order Status</h2>
      <div className="mb-2">
        <span className="text-gray-500">Order #</span>
        <span className="font-mono ml-1">{order._id?.slice(-6).toUpperCase()}</span>
      </div>
      {/* ...rest of order info */}
    </div>
  );
}
