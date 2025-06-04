// src/lib/api.ts
export async function api<T = any>(
  path: string,
  opts?: RequestInit
): Promise<T> {
  const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include', // send cookies if needed
    headers: {
      'Content-Type': 'application/json',
      ...(opts?.headers || {}),
    },
    ...opts,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `API error: ${res.status}`);
  }
  return res.json();
}
