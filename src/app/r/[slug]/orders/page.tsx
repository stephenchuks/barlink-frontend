// src/app/r/[slug]/orders/page.tsx
import { apiFetch } from '@/lib/api';

interface PageParams {
  slug: string | string[];
}

export default async function OrdersPage({ params }: { params: PageParams }) {
  const slugRaw = params.slug;
  const slug = Array.isArray(slugRaw) ? slugRaw[0] : slugRaw;

  if (!slug) {
    return (
      <div className="text-center text-red-600 py-8">
        Missing restaurant context. Please scan your restaurant QR.
      </div>
    );
  }

  let orders = [];
  let error = '';
  try {
    orders = await apiFetch<any[]>(slug, `/orders`, {}, true);
  } catch (err: any) {
    error = err?.message || 'Could not fetch orders';
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">{error}</div>
    );
  }

  // ...render orders
  return (
    <div className="max-w-2xl mx-auto pt-10">
      {/* Render list of orders for this restaurant/user */}
    </div>
  );
}
