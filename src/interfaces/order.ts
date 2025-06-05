// src/interfaces/order.ts

export interface OrderItem {
  menuItem: string; // If you expand to object, update this type!
  quantity: number;
  price: number;
}
export type OrderStatus = 'pending' | 'served' | 'paid';

export interface Order {
  _id: string;
  restaurant: string;
  user: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
