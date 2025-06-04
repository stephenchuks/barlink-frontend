// src/context/CartContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { MenuItem } from '@/interfaces/menu';
import type { CartItem, CartContextType } from '@/interfaces/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(menuItem: MenuItem, menuId: string) {
    setItems((prev) => {
      const existing = prev.find((i) => i.itemId === menuItem._id);
      if (existing) {
        return prev.map((i) =>
          i.itemId === menuItem._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [
        ...prev,
        {
          itemId: menuItem._id,
          menuId,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1,
        },
      ];
    });
  }

  function removeFromCart(itemId: string) {
    setItems((prev) => prev.filter((i) => i.itemId !== itemId));
  }

  function updateQuantity(itemId: string, quantity: number) {
    setItems((prev) =>
      prev.map((i) =>
        i.itemId === itemId ? { ...i, quantity } : i
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
