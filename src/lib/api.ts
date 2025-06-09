// src/lib/api.ts
import { getToken } from './auth';

export async function apiFetch<T>(
  slug: string,
  path: string,
  options: RequestInit = {},
  withAuth: boolean = true
): Promise<T> {
  const token = withAuth ? getToken(slug) : undefined;
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
    ...options,
    headers,
  });
  if (!res.ok) {
    let message = 'API error';
    try {
      const err = await res.json();
      message = err?.message || message;
    } catch {}
    throw new Error(message);
  }
  return res.json();
}
