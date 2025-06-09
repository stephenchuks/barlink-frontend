// src/components/PopularMenus.tsx
import React from 'react';
import BoxedSection from '@/components/BoxedSection';

export default function PopularMenus() {
  // Dummy data
  const menus = [
    { id: 1, name: 'Pasta Classics', image: 'https://source.unsplash.com/400x200/?pasta', description: 'Italian comfort food' },
    { id: 2, name: 'Sushi Deluxe', image: 'https://source.unsplash.com/400x200/?sushi', description: 'Fresh rolls & sashimi' },
  ];

  return (
    <BoxedSection>
      <h2 className="text-2xl font-bold mb-4 text-primary">Popular Menus</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {menus.map(menu => (
          <div key={menu.id} className="bg-white rounded-xl shadow-card overflow-hidden flex flex-col">
            <img src={menu.image} alt={menu.name} className="h-36 w-full object-cover" />
            <div className="p-4 flex flex-col gap-2">
              <div className="font-bold text-lg text-primary">{menu.name}</div>
              <div className="text-gray-700 text-sm">{menu.description}</div>
            </div>
          </div>
        ))}
      </div>
    </BoxedSection>
  );
}
