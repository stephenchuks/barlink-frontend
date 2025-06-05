
export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('barlink_token');
    window.location.href = '/auth/login';
  }
}
