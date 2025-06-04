// src/schemas/menu.ts
import { z } from 'zod';

export const MenuItemSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  available: z.boolean().optional(),
});

export const MenuSchema = z.object({
  _id: z.string(),
  restaurant: z.string(),
  title: z.string(),
  description: z.string().optional(),
  items: z.array(MenuItemSchema),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const MenuArraySchema = z.array(MenuSchema);

export type Menu = z.infer<typeof MenuSchema>;
export type MenuItem = z.infer<typeof MenuItemSchema>;
