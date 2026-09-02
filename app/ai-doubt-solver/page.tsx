'use client';

import React from 'react';
import Link from 'next/link';
import { AiDoubtSolverCard } from '@/components/ai-doubt-solver-card';
import {
  Bot,
  Sparkles,
  ShieldCheck,
  Zap,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  FileCheck2,
} from 'lucide-react';

export default function AiDoubtSolverPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>
      </div>

      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
              Powered by Google Gemini
            </span>
            <span className="px-3 py-0.5 rounded-full bg-purple-500/30 text-purple-300 text-xs font-semibold">
              CBSE Class 10 NCERT Guardrails
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Real-Time AI Board Exam Doubt Solver
          </h1>
          <p className="text-sm text-indigo-200 leading-relaxed">
            Upload textbook photos or type complex LaTeX math formulas. Receive instant step-by-step NCERT solutions, common board marking mistake traps, and similar past-year exam questions.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15 space-y-2 min-w-[220px]">
          <div className="text-xs font-bold text-amber-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Official CBSE Rubric
          </div>
          <div className="text-xs text-white/90">
            ✓ 4-Part Structured Breakdown
          </div>
          <div className="text-xs text-white/90">
            ✓ KaTeX Math & Chemistry Rendering
          </div>
          <div className="text-xs text-white/90">
            ✓ Unlimited Follow-Up Queries
          </div>
        </div>
      </div>

      {/* Main Solver Card */}
      <AiDoubtSolverCard />
    </div>
  );
}
