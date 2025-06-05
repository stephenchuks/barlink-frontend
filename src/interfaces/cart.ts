
export interface CartItem {
  itemId: string;
  menuId: string;
  name: string;
  price: number;
  quantity: number;
  modifiers?: { label: string; additionalPrice: number }[];
}
