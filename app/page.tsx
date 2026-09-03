'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import LoginHubPage from './login/page';

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn, currentRole } = useAppStore();

  useEffect(() => {
    if (isLoggedIn) {
      const target =
        currentRole === 'STUDENT'
          ? '/dashboard/student'
          : currentRole === 'PARENT'
          ? '/dashboard/parent'
          : currentRole === 'TUTOR'
          ? '/dashboard/tutor'
          : '/dashboard/admin';
      router.replace(target);
    }
  }, [isLoggedIn, currentRole, router]);

  return <LoginHubPage />;
}
