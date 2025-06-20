'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { CartItem } from '@/interfaces/cart';
import type { MenuItem } from '@/interfaces/menu';
import { toast } from 'sonner';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem, menuId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  slug: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children, slug }: { children: React.ReactNode; slug: string }) {
  const STORAGE_KEY = `barlink_cart_${slug}`;
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Save to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, slug]);

  function addToCart(menuItem: MenuItem, menuId: string) {
    setItems(prev => {
      const found = prev.find(i => i.itemId === menuItem._id);
      if (found) {
        toast.success(`Increased quantity for "${menuItem.name}"`);
        return prev.map(i =>
          i.itemId === menuItem._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      toast.success(`Added "${menuItem.name}" to cart`);
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
    setItems(prev => prev.filter(i => i.itemId !== itemId));
    toast.info('Item removed from cart');
  }

  function updateQuantity(itemId: string, quantity: number) {
    setItems(prev =>
      prev.map(i => (i.itemId === itemId ? { ...i, quantity } : i))
    );
    toast.success('Cart updated');
  }

  function clearCart() {
    setItems([]);
    toast.success('Cart cleared');
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, slug }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(slug: string) {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  if (ctx.slug !== slug) throw new Error(`CartContext slug mismatch: expected "${slug}" but context is "${ctx.slug}"`);
  return ctx;
}
