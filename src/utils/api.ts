// src/utils/api.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Robust, slug-guarded API fetcher.
 * @param slug Restaurant slug (required for tenant APIs)
 * @param path API path (e.g. /menus)
 * @param options fetch options
 * @param withAuth if token needed (default false for menu/customer endpoints)
 */
export async function apiFetch<T = unknown>(
  slug: string,
  path: string,
  options: RequestInit = {},
  withAuth = false
): Promise<T> {
  if (!slug) throw new Error('Missing restaurant context (slug)');
  const token = withAuth && typeof window !== 'undefined'
    ? localStorage.getItem(`barlink_token_${slug}`) : undefined;
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    let msg = 'API error';
    try {
      const err = await res.json();
      msg = err?.message || msg;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}