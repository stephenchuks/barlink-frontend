'use client';

import React from 'react';
import { Button, Input } from '@/components/ui';

interface OrdersFilterBarProps {
  status: string;
  setStatus: (status: string) => void;
  search: string;
  setSearch: (v: string) => void;
}

const statuses = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'served', label: 'Served' },
  { value: 'paid', label: 'Paid' },
];

export default function OrdersFilterBar({
  status,
  setStatus,
  search,
  setSearch,
}: OrdersFilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-4 items-center">
      <div className="flex flex-row gap-2">
        {statuses.map((s) => (
          <Button
            key={s.value}
            variant={status === s.value ? 'primary' : 'outline'}
            size="sm"
            className="capitalize"
            onClick={() => setStatus(s.value)}
            type="button"
          >
            {s.label}
          </Button>
        ))}
      </div>
      <div className="flex-1 w-full md:max-w-xs mt-2 md:mt-0">
        <Input
          type="search"
          placeholder="Search order #"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
}
