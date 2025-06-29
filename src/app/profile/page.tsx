// src/app/profile/page.tsx
import React from 'react';
import BoxedSection from '@/components/BoxedSection';

export default function ProfilePage() {
  // Dummy profile data for illustration
  const user = {
    name: 'Alice Example',
    email: 'alice@platform.com',
    role: 'customer',
  };

  return (
    <>
      <BoxedSection className="py-12 mt-12 mb-8">
        <h1 className="text-3xl font-extrabold mb-3 text-primary">My Profile</h1>
        <div className="text-lg font-medium mb-4">{user.name}</div>
        <div className="text-gray-700 mb-2">Email: {user.email}</div>
        <div className="text-gray-700 mb-6">Role: {user.role}</div>
        <button className="bg-primary text-white px-6 py-2 rounded-2xl font-bold hover:bg-primary/90 transition">Logout</button>
      </BoxedSection>

      <BoxedSection className="py-6 mb-8">
        <h2 className="text-xl font-bold mb-2">Account Settings</h2>
        <div className="text-gray-700">More settings coming soon…</div>
      </BoxedSection>
    </>
  );
}
