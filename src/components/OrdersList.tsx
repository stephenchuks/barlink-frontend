import React from 'react';
import Link from 'next/link';
import type { Order } from '@/interfaces/order';

interface Props {
  orders: Order[];
}

export default function OrdersList({ orders }: Props) {
  if (!orders.length) {
    return (
      <div className="text-center text-gray-600 py-8">
        No orders found matching your criteria.
      </div>
    );
  }
  return (
    <ul className="space-y-4">
      {orders.map(order => (
        <li
          key={order._id}
          className="border rounded-lg p-4 shadow-card hover:shadow transition"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">
              Order #
              <Link href={`/orders/${order._id}`} className="text-primary underline">
                {order._id.slice(-6).toUpperCase()}
              </Link>
            </span>
            <span
              className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
                order.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : order.status === 'served'
                  ? 'bg-blue-100 text-blue-700'
                  : order.status === 'paid'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {order.status}
            </span>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            {new Date(order.createdAt).toLocaleString()}
          </div>
          <ul className="text-sm mb-2">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.quantity} × {item.menuItem} &mdash; ₦{item.price}
              </li>
            ))}
          </ul>
          <div className="text-right font-bold">
            Total: ₦{order.total}
          </div>
        </li>
      ))}
    </ul>
  );
}
