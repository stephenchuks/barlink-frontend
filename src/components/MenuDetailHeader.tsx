// src/components/MenuDetailHeader.tsx
import type { Menu } from '@/interfaces/menu';

export default function MenuDetailHeader({ menu }: { menu: Menu }) {
  return (
    <section className="bg-white rounded-2xl shadow-card px-6 py-5 mb-6">
      <h1 className="text-2xl font-bold text-primary">{menu.title}</h1>
      {menu.description && (
        <p className="text-gray-600 mt-2">{menu.description}</p>
      )}
    </section>
  );
}
