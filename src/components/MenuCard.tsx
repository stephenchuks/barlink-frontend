import Link from 'next/link';
import type { Menu } from '@/interfaces/menu';

interface Props {
  menu: Menu;
  restaurantSlug?: string;
}

export default function MenuCard({ menu, restaurantSlug }: Props) {
  return (
    <div className="rounded-2xl bg-white shadow-card px-5 py-4 flex flex-col h-full">
      <h3 className="font-semibold text-xl text-primary mb-2">{menu.title}</h3>
      <p className="text-gray-700 text-sm mb-4">{menu.description || '—'}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {menu.items.length} items
        </span>
        <Link
          href={
            restaurantSlug
              ? `/r/${restaurantSlug}/menu/${menu._id}`
              : `/menu/${menu._id}`
          }
          className="inline-block bg-primary text-white px-4 py-2 rounded-2xl text-sm font-medium shadow hover:bg-primary/90 transition"
        >
          View Menu
        </Link>
      </div>
    </div>
  );
}
