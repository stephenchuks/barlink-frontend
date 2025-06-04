// src/schemas/restaurant.ts
import { z } from 'zod';

export const RestaurantSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string().optional(),
  address: z.string(),
  phone: z.string().optional(),
  logoUrl: z.string().url().optional(),
  operatingHours: z.array(
    z.object({
      open: z.string(),
      close: z.string(),
    })
  ).optional(),
  domainSlug: z.string().optional(),
});

export type Restaurant = z.infer<typeof RestaurantSchema>;
