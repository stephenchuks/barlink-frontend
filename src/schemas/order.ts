import { z } from 'zod';

export const OrderItemSchema = z.object({
  menuItem: z.string(),
  quantity: z.number(),
  price: z.number(),
});

export const OrderSchema = z.object({
  _id: z.string(),
  restaurant: z.string(),
  user: z.string(),
  items: z.array(OrderItemSchema),
  total: z.number(),
  status: z.enum(['pending', 'served', 'paid']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Order = z.infer<typeof OrderSchema>;
