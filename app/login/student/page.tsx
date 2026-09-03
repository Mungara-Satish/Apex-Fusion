'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentLoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login?role=STUDENT');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-xs">
      Redirecting to Student Login...
    </div>
  );
}
