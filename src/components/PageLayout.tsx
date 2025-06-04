import type { ReactNode } from 'react';

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      {children}
    </div>
  );
}
