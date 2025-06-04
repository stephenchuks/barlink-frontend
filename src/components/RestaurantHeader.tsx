// src/components/RestaurantHeader.tsx
import type { Restaurant } from '@/interfaces/restaurant';

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantHeader({ restaurant }: Props) {
  return (
    <section className="bg-white rounded-2xl shadow-card px-6 py-6 mb-6">
      <div className="flex items-center gap-4">
        {restaurant.logoUrl && (
          <img
            src={restaurant.logoUrl}
            alt={`${restaurant.name} logo`}
            className="w-16 h-16 rounded-full object-cover border border-primary"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold text-primary">{restaurant.name}</h1>
          <p className="text-gray-600 text-sm">{restaurant.address}</p>
          {restaurant.operatingHours && (
            <div className="text-xs text-gray-500 mt-1">
              Hours:&nbsp;
              {restaurant.operatingHours
                .map((h) => `${h.open}–${h.close}`)
                .join(', ')}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
