// src/components/BoxedSection.tsx
import React from 'react';
import clsx from 'clsx';

type BoxedSectionProps<E extends React.ElementType = 'section'> = {
  as?: E;
  className?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<E>;

export default function BoxedSection<E extends React.ElementType = 'section'>({
  as,
  className = '',
  children,
  ...rest
}: BoxedSectionProps<E>) {
  const Component = as || 'section';
  return (
    <Component
      className={clsx(
        'w-full max-w-5xl mx-auto px-6 py-5 bg-white rounded-2xl shadow-card border border-[#eef1f4] boxed-bg',
        className
      )}
      data-barlink="boxed"
      {...rest}
    >
      {children}
    </Component>
  );
}
