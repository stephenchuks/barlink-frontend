// src/components/MenuCard.tsx
import Link from 'next/link';
import type { Menu } from '@/interfaces/menu';
import { Card } from '@/components/ui';

interface Props {
  menu: Menu;
  restaurantSlug: string;
}

export default function MenuCard({ menu, restaurantSlug }: Props) {
  return (
    <Card className="flex flex-col h-full">
      <h3 className="font-semibold text-xl text-primary mb-2">{menu.title}</h3>
      <p className="text-gray-700 text-sm mb-4">{menu.description || '—'}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs text-gray-500">{menu.items.length} items</span>
        <Link
          href={`/r/${restaurantSlug}/menu/${menu._id}`}
          className="inline-block bg-primary text-white px-4 py-2 rounded-2xl text-sm font-medium shadow hover:bg-primary/90 transition"
        >
          View Menu
        </Link>
      </div>
    </Card>
  );
}
