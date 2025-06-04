// src/app/layout.tsx
import type { ReactNode } from 'react';
import '../app/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Meta tags for security and mobile */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Barlink</title>
      </head>
      <body className="bg-neutral-100 text-gray-900 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}