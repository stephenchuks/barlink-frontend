// src/app/auth/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // Platform-wide registration (no slug)
      await apiFetch(
        '',
        '/auth/register',
        {
          method: 'POST',
          body: JSON.stringify({ email, password, role }),
        },
        false
      );
      toast.success('Registration successful! Please log in.');
      router.push('/auth/login');
    } catch (err: any) {
      toast.error(err.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-card w-full max-w-md space-y-6 border border-neutral-200"
        autoComplete="off"
      >
        <h1 className="text-2xl font-bold text-primary text-center">Create your Barlink account</h1>
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-neutral-300 rounded-xl p-3 focus:ring focus:border-primary bg-neutral-50"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Password</label>
          <input
            type="password"
            required
            autoComplete="new-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-neutral-300 rounded-xl p-3 focus:ring focus:border-primary bg-neutral-50"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Role</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full border border-neutral-300 rounded-xl p-3 focus:ring focus:border-primary bg-neutral-50"
          >
            <option value="customer">Customer</option>
            <option value="superadmin">Superadmin</option>
            {/* Add other roles as needed */}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-2xl font-semibold hover:bg-primary/90 transition text-lg shadow"
          disabled={loading}
        >
          {loading ? 'Registering…' : 'Create Account'}
        </button>
        <div className="text-center text-sm text-gray-500 pt-2">
          Already have an account?{' '}
          <a href="/auth/login" className="text-primary underline font-semibold">
            Log in
          </a>
        </div>
      </form>
    </div>
  );
}
