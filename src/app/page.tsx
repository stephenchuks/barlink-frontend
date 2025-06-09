// src/app/page.tsx
import React from 'react';

export default function HomePage() {
  // Optionally: check superadmin role from token/cookie here and redirect non-admins
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-4">
        Barlink Platform Admin
      </h1>
      <p className="text-gray-700 max-w-xl mb-8 text-center">
        This dashboard is for superadmins only. All restaurant and customer features are under /r/[slug].
      </p>
      {/* In real world: provide restaurant registration, user management, etc. here */}
    </main>
  );
}