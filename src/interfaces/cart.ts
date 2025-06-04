// src/interfaces/cart.ts
export interface CartItem {
  itemId: string;
  menuId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (item: any, menuId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}
