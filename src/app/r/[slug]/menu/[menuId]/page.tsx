import { apiFetch } from '@/lib/api';
import MenuDetailHeader from '@/components/MenuDetailHeader';
import ItemList from '@/components/ItemList';
import { CartProvider } from '@/context/CartContext';

interface PageParams {
  slug: string | string[];
  menuId: string | string[];
}

export default async function MenuDetailPage({ params }: { params: PageParams }) {
  const slugRaw = params.slug;
  const slug = Array.isArray(slugRaw) ? slugRaw[0] : slugRaw;
  const menuIdRaw = params.menuId;
  const menuId = Array.isArray(menuIdRaw) ? menuIdRaw[0] : menuIdRaw;

  if (!slug || !menuId) {
    return <div className="text-center py-12 text-red-600">Missing restaurant slug or menuId.</div>;
  }

  let menu: any = null, error = '';
  try {
    menu = await apiFetch<any>(slug, `/menus/${menuId}`, {}, false);
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

  return (
    <CartProvider slug={slug}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <MenuDetailHeader menu={menu} />
        <h2 className="text-lg font-bold text-gray-700 mb-2">Items</h2>
        <ItemList items={menu.items} menuId={menu._id} slug={slug} />
      </div>
    </CartProvider>
  );
}
