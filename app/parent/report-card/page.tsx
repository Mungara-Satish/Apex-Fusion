'use client';

import React from 'react';
import Link from 'next/link';
import { CbseReportCard } from '@/components/cbse-report-card';
import { ArrowLeft } from 'lucide-react';

export default function ParentReportCardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      <div className="print:hidden">
        <Link
          href="/dashboard/parent"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Parent Portal
        </Link>
      </div>

      <CbseReportCard />
    </div>
  );
}
