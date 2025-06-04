// src/interfaces/menu.ts
export interface MenuItem {
  _id: string;
  name: string;
  description?: string;
  price: number;
  available?: boolean;
}

export interface Menu {
  _id: string;
  restaurant: string;
  title: string;
  description?: string;
  items: MenuItem[];
  createdAt?: string;
  updatedAt?: string;
}
