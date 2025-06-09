// src/app/r/[slug]/page.tsx
import { RestaurantSchema } from '@/schemas/restaurant';
import { MenuArraySchema } from '@/schemas/menu';
import { apiFetch } from '@/lib/api';
import RestaurantHeader from '@/components/RestaurantHeader';
import MenuGrid from '@/components/MenuGrid';

interface PageParams {
  slug: string | string[];
}

export default async function RestaurantPage({ params }: { params: PageParams }) {
  // Safe extraction of slug
  const slugRaw = params.slug;
  const slug = Array.isArray(slugRaw) ? slugRaw[0] : slugRaw;
  if (!slug) {
    return <div className="max-w-2xl mx-auto py-12 text-center text-red-600">Missing restaurant context.</div>;
  }

  let restaurant;
  let menus;
  let error = '';

  try {
    restaurant = await apiFetch<typeof RestaurantSchema._type>(
      slug,
      `/restaurants/slug/${slug}`,
      {},
      false
    );
    menus = await apiFetch<typeof MenuArraySchema._type>(
      slug,
      `/menus?restaurant=${restaurant._id}`,
      {},
      false
    );
  } catch (err: any) {
    error = err?.message || 'Failed to fetch restaurant data';
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">Restaurant Not Found</h1>
        <div className="text-gray-500">{error}</div>
      </div>
    );
  }
  if (!restaurant || !menus) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">Restaurant Not Found</h1>
        <div className="text-gray-500">No restaurant or menu data found.</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <RestaurantHeader restaurant={restaurant} />
      <h2 className="text-lg font-bold text-gray-700 mb-2">Menus</h2>
      <MenuGrid menus={menus} restaurantSlug={slug} />
    </div>
  );
}
