'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import {
  UserCheck,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Award,
  Video,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';

export default function TutorLoginPage() {
  const router = useRouter();
  const { loginAs } = useAppStore();

  const [email, setEmail] = useState<string>('priya.raman@eduten.org');
  const [password, setPassword] = useState<string>('••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    loginAs('TUTOR', {
      name: 'Dr. Priya Raman',
      email: email,
    });
    router.push('/dashboard/tutor');
  };

  const handleQuickTutorDemo = () => {
    setIsLoading(true);
    loginAs('TUTOR');
    router.push('/dashboard/tutor');
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-amber-500/5 via-background to-background">
      <div className="w-full max-w-md space-y-6">
        {/* Navigation link */}
        <div className="flex items-center justify-between">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Login Portals
          </Link>

          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-extrabold uppercase tracking-wider">
            Faculty & Tutor Portal
          </span>
        </div>

        {/* Card Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-3xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/25">
            <UserCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Tutor / Faculty Sign In
          </h1>
          <p className="text-xs text-muted-foreground">
            Host live whiteboard classes, triage student doubt feeds, and manage earnings.
          </p>
        </div>

        {/* 1-Click Fast Tutor Demo */}
        <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-foreground flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Instant Tutor Demo:
            </div>
            <div className="text-[11px] text-muted-foreground">Dr. Priya Raman (IIT Delhi Ph.D.)</div>
          </div>
          <button
            onClick={handleQuickTutorDemo}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold shadow-sm transition-all shrink-0"
          >
            1-Click Demo &rarr;
          </button>
        </div>

        {/* Tutor Login Card */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Faculty Mentor Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="faculty@eduten.org"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-foreground">Password</label>
                <a href="#" className="text-amber-600 hover:underline text-[11px]">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In as Faculty Mentor</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Verified tutors receive automatic session recording & payout logs.</span>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-muted-foreground">
          Looking for administrative console?{' '}
          <Link href="/login/admin" className="font-bold text-purple-600 dark:text-purple-400 hover:underline">
            Go to Admin Sign In &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
