import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'block w-full border border-gray-200 rounded-2xl px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary bg-white transition text-base shadow-sm',
        className
      )}
      {...props}
    />
  )
);

Input.displayName = 'Input';
