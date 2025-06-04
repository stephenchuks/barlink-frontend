'use client';

import { useCart } from '@/context/CartContext';
import CartItemRow from './CartItemRow';

export default function CartSummary() {
  const { items, clearCart } = useCart();
  const subtotal = items.reduce((sum: number, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0)
    return (
      <div className="max-w-md mx-auto mt-12 text-center text-gray-500">
        <div className="text-2xl mb-3">🛒</div>
        <div>Your cart is empty.</div>
      </div>
    );

  return (
    <div className="max-w-md mx-auto mt-6 bg-white p-6 rounded-2xl shadow-card">
      <h2 className="text-xl font-bold mb-3">Your Order</h2>
      <div>
        {items.map((item) => (
          <CartItemRow key={item.itemId} item={item} />
        ))}
      </div>
      <div className="flex justify-between font-semibold mt-4">
        <span>Subtotal</span>
        <span>₦{subtotal.toLocaleString()}</span>
      </div>
      <div className="flex gap-2 mt-6">
        <button
          className="flex-1 bg-gray-200 text-gray-700 rounded-xl py-2 font-semibold hover:bg-gray-300 transition"
          onClick={clearCart}
        >
          Clear Cart
        </button>
        <button
          className="flex-1 bg-primary text-white rounded-xl py-2 font-semibold hover:bg-primary/90 transition"
          // Next: connect to API and/or go to /checkout
          onClick={() => alert('Checkout coming soon!')}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
