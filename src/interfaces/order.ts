
import type { CartItem } from './cart';

export interface OrderItem {
  menuItem: string;
  quantity: number;
  price: number;
}

export interface CreateOrderPayload {
  items: OrderItem[];
}

export interface Order {
  _id: string;
  restaurant: string;
  user: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'served' | 'paid';
  createdAt: string;
  updatedAt: string;
}
