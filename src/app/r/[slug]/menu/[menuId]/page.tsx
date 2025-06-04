// src/app/r/[slug]/menu/[menuId]/page.tsx
import { fetchAndValidate, endpoints } from '@/utils/api';
import { MenuSchema } from '@/schemas/menu';
import MenuDetailHeader from '@/components/MenuDetailHeader';
import ItemList from '@/components/ItemList';
import { CartProvider } from '@/context/CartContext';

interface PageParams {
  slug: string;
  menuId: string;
}

export default async function MenuDetailPage({ params }: { params: PageParams }) {
  let menu;
  let error = '';

  try {
    menu = await fetchAndValidate(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/menus/${params.menuId}`,
      MenuSchema
    );
  } catch (err: any) {
    error = err?.message || 'An error occurred';
  }

  if (error || !menu) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">Menu Not Found</h1>
        <div className="text-gray-500">{error}</div>
      </div>
    );
  }

  // CartProvider must wrap all components that use cart context!
  return (
    <CartProvider>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <MenuDetailHeader menu={menu} />
        <h2 className="text-lg font-bold text-gray-700 mb-2">Items</h2>
        <ItemList items={menu.items} menuId={menu._id} />
      </div>
    </CartProvider>
  );
}
