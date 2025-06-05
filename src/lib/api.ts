// src/lib/api.ts

export async function api<T>(
  path: string,
  options: RequestInit = {},
  withAuth: boolean = true
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('barlink_token') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(withAuth && token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'API error');
  }
  return res.json();
}
