'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ParentLoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login?role=PARENT');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-xs">
      Redirecting to Parent Login...
    </div>
  );
}
