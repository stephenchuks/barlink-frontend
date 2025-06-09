// src/components/LatestOrderCard.tsx
import React from 'react';
import BoxedSection from '@/components/BoxedSection';

export default function LatestOrderCard() {
  // Dummy order data
  const order = {
    id: '123456',
    status: 'pending',
    total: 4200,
  };

  return (
    <BoxedSection>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-gray-700 font-semibold">
            Last Order <span className="text-primary">#{order.id}</span>
          </div>
          <div className="text-sm text-gray-500">
            Status: <span className="capitalize">{order.status}</span>
          </div>
        </div>
        <div className="text-primary font-bold text-xl">₦{order.total}</div>
      </div>
    </BoxedSection>
  );
}
