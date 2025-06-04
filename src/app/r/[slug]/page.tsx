// src/app/r/[slug]/page.tsx
import { fetchAndValidate, endpoints } from '@/utils/api';
import { RestaurantSchema } from '@/schemas/restaurant';
import { MenuArraySchema } from '@/schemas/menu';
import RestaurantHeader from '@/components/RestaurantHeader';
import MenuGrid from '@/components/MenuGrid';

interface PageParams {
  slug: string;
}

export default async function RestaurantPage({ params }: { params: PageParams }) {
  let restaurant = undefined;
  let menus = undefined;
  let error = '';

  try {
    restaurant = await fetchAndValidate(
      endpoints.getRestaurantBySlug(params.slug),
      RestaurantSchema
    );
    menus = await fetchAndValidate(
      endpoints.getMenusByRestaurant(restaurant._id),
      MenuArraySchema
    );
  } catch (err: any) {
    error = err?.message || 'An error occurred';
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">Restaurant Not Found</h1>
        <div className="text-gray-500">{error}</div>
      </div>
    );
  }

  // **New: Only render if data is definitely present**
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
      <MenuGrid menus={menus} restaurantSlug={params.slug} />
    </div>
  );
}
