// src/interfaces/restaurant.ts
export interface Restaurant {
  _id: string;
  name: string;
  slug?: string;
  address: string;
  phone?: string;
  logoUrl?: string;
  operatingHours?: { open: string; close: string }[];
  domainSlug?: string;
}
