'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';

export default function DashboardRouterPage() {
  const router = useRouter();
  const { currentRole } = useAppStore();

  useEffect(() => {
    if (currentRole === 'STUDENT') {
      router.replace('/dashboard/student');
    } else if (currentRole === 'TUTOR') {
      router.replace('/dashboard/tutor');
    } else {
      router.replace('/dashboard/admin');
    }
  }, [currentRole, router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-2">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-muted-foreground">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
