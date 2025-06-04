// src/schemas/restaurant.ts
import { z } from 'zod';

export const RestaurantSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  address: z.string(),
  phone: z.string().optional(),
  logoUrl: z.string().url().optional(),
  openingHours: z.string().optional(),
});

export type Restaurant = z.infer<typeof RestaurantSchema>;
