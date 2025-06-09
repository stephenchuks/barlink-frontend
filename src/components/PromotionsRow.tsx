// src/components/PromotionsRow.tsx
import React from 'react';
import BoxedSection from '@/components/BoxedSection';

export default function PromotionsRow() {
  const promotions = [
    { id: 1, title: 'Free Drink', desc: 'Get a free drink with your first order' },
    { id: 2, title: 'Lunch Combo', desc: 'Lunch deals from ₦2000' },
  ];
  return (
    <BoxedSection>
      <h2 className="text-xl font-semibold mb-2 text-primary">Promotions</h2>
      <div className="flex flex-col gap-4">
        {promotions.map(promo => (
          <div key={promo.id} className="rounded-2xl bg-primary/10 border border-primary/20 px-5 py-4 shadow-card text-left">
            <div className="text-primary font-bold">{promo.title}</div>
            <div className="text-gray-700 text-sm">{promo.desc}</div>
          </div>
        ))}
      </div>
    </BoxedSection>
  );
}
