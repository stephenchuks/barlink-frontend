// src/utils/api.ts
import { z } from 'zod';
import { RestaurantSchema } from '@/schemas/restaurant';
import { MenuArraySchema } from '@/schemas/menu';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export const endpoints = {
  getRestaurantBySlug: (slug: string) => `${API_BASE_URL}/restaurants/slug/${slug}`,
  getMenusByRestaurant: (restaurantId: string) => `${API_BASE_URL}/menus?restaurant=${restaurantId}`,
};

export async function fetchAndValidate<T>(
  url: string,
  schema: z.ZodType<T>
): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  const result = schema.safeParse(data);
  if (!result.success) throw new Error('Invalid API response');
  return result.data;
}
