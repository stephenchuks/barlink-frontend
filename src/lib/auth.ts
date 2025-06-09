// src/lib/auth.ts

export function getTokenKey(slug: string) {
  return `barlink_token_${slug}`;
}
export function saveToken(slug: string, token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(getTokenKey(slug), token);
  }
}
export function getToken(slug: string): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(getTokenKey(slug));
  }
  return null;
}
export function removeToken(slug: string) {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(getTokenKey(slug));
  }
}
export function parseJwt(token: string): any | null {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}
