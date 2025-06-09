// src/app/r/[slug]/auth/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';

interface PageParams {
  slug: string | string[];
}

export default function RestaurantLoginPage({ params }: { params: PageParams }) {
  const slugRaw = params.slug;
  const slug = Array.isArray(slugRaw) ? slugRaw[0] : slugRaw;

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!slug) {
    return <div className="text-center py-12 text-red-600">Missing restaurant context.</div>;
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await apiFetch<{ token: string }>(
        slug,
        '/auth/login',
        {
          method: 'POST',
          body: JSON.stringify({ email, password, slug }),
        },
        false
      );
      localStorage.setItem(`barlink_token_${slug}`, res.token);
      toast.success('Login successful!');
      router.push(`/r/${slug}`);
    } catch (err: any) {
      toast.error(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6"
        autoComplete="off"
      >
        <h1 className="text-2xl font-bold text-center">Login to {slug}</h1>
        <div>
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border rounded p-2 focus:ring focus:border-primary"
            autoFocus
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border rounded p-2 focus:ring focus:border-primary"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-teal-700 transition"
          disabled={submitting}
        >
          {submitting ? 'Logging in…' : 'Login'}
        </button>
      </form>
    </div>
  );
}
