'use client';

import { useEffect, useState } from 'react';
import { Card, Button } from '@/components/ui';
import { logout } from '@/lib/auth';
import { api } from '@/lib/api';
import { toast } from 'sonner';

interface User {
  email: string;
  role: string;
  restaurant?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const data = await api<{ user: User }>('/users/me');
        setUser(data.user);
      } catch (e: any) {
        toast.error(e.message || 'Could not load profile');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-6"></div>
        <div className="text-gray-500">Loading profile…</div>
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="max-w-md mx-auto mt-16 text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">Not signed in</h1>
        <p className="mb-6">Please <a href="/auth/Login" className="text-primary underline">login</a> to view your profile.</p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md p-8 rounded-2xl shadow-card">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Profile</h1>
        <div className="mb-4">
          <div className="flex flex-col gap-2 text-lg">
            <span>
              <span className="font-medium text-gray-700">Email:</span> {user.email}
            </span>
            <span>
              <span className="font-medium text-gray-700">Role:</span> {user.role}
            </span>
            {user.restaurant && (
              <span>
                <span className="font-medium text-gray-700">Restaurant:</span> {user.restaurant}
              </span>
            )}
          </div>
        </div>
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="w-full mt-6"
          onClick={logout}
        >
          Logout
        </Button>
      </Card>
    </div>
  );
}
