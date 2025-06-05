
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Redirects to /auth/login if there is no JWT in localStorage.
 * Use in any client component or page that requires authentication.
 */
export function useRequireAuth() {
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('barlink_token') : null;
    if (!token) {
      router.replace('/auth/login');
    }
    // Optionally: parse token for expiration, roles, etc.
  }, [router]);
}
