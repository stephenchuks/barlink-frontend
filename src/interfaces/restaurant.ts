// src/interfaces/restaurant.ts
export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  address: string;
  phone?: string;
  logoUrl?: string;
  openingHours?: string;
  // ...extend as needed
}
