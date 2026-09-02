'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import {
  Shield,
  KeyRound,
  Mail,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lock,
  ShieldCheck,
  Server,
  Fingerprint,
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAs } = useAppStore();

  const [email, setEmail] = useState<string>('admin@eduten.org');
  const [securityKey, setSecurityKey] = useState<string>('ADMIN-CBSE-2026-KEY');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    loginAs('ADMIN', {
      name: 'Dr. Sanjay Gupta (Dean/Admin)',
      email: email,
    });
    router.push('/dashboard/admin');
  };

  const handleQuickAdminDemo = () => {
    setIsLoading(true);
    loginAs('ADMIN');
    router.push('/dashboard/admin');
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-purple-500/5 via-background to-background">
      <div className="w-full max-w-md space-y-6">
        {/* Navigation link */}
        <div className="flex items-center justify-between">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Login Portals
          </Link>

          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 text-[10px] font-extrabold uppercase tracking-wider">
            Admin Master Console
          </span>
        </div>

        {/* Card Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-3xl bg-purple-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-purple-500/25">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Administrator Master Sign In
          </h1>
          <p className="text-xs text-muted-foreground">
            Full root privileges across all student records, parent links, tutor verification, and financial transactions.
          </p>
        </div>

        {/* 1-Click Fast Admin Demo */}
        <div className="p-4 rounded-2xl border border-purple-500/30 bg-purple-500/5 flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-foreground flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Instant Admin Demo:
            </div>
            <div className="text-[11px] text-muted-foreground">Dr. Sanjay Gupta (Superuser)</div>
          </div>
          <button
            onClick={handleQuickAdminDemo}
            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-all shrink-0"
          >
            1-Click Demo &rarr;
          </button>
        </div>

        {/* Admin Login Card */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Admin Account Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@eduten.org"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-foreground">2FA Master Security Key</label>
                <span className="text-[10px] text-purple-500 font-mono">256-Bit SSL</span>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={securityKey}
                  onChange={(e) => setSecurityKey(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticate & Launch Admin Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-800 dark:text-purple-300 flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-purple-600 shrink-0" />
            <span>Root Admin level gives complete read/write access to all platform systems.</span>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-muted-foreground">
          Go back to{' '}
          <Link href="/login" className="font-bold text-primary hover:underline">
            Login Hub &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
