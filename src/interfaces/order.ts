export interface OrderItem {
  menuItem: string;
  quantity: number;
  price: number;
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
