import type { Menu } from '@/interfaces/menu';
import MenuCard from './MenuCard';

interface Props {
  menus: Menu[];
  restaurantSlug?: string;
}

export default function MenuGrid({ menus, restaurantSlug }: Props) {
  if (!menus.length) {
    return (
      <div className="text-center text-gray-500 py-12">
        No menus found for this restaurant.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
      {menus.map((menu) => (
        <MenuCard
          key={menu._id}
          menu={menu}
          restaurantSlug={restaurantSlug}
        />
      ))}
    </div>
  );
}
