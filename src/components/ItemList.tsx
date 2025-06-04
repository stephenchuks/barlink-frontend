// src/components/ItemList.tsx
import type { MenuItem } from '@/interfaces/menu';
import MenuItemCard from './MenuItemCard';

interface Props {
  items: MenuItem[];
  menuId: string;
}

export default function ItemList({ items, menuId }: Props) {
  if (!items.length) {
    return (
      <div className="text-center text-gray-400 py-8">
        No items found in this menu.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4">
      {items.map((item) => (
        <MenuItemCard key={item._id} item={item} menuId={menuId} />
      ))}
    </div>
  );
}
