'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import {
  HeartHandshake,
  Smartphone,
  KeyRound,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Lock,
} from 'lucide-react';

export default function ParentLoginPage() {
  const router = useRouter();
  const { loginAs } = useAppStore();

  const [phone, setPhone] = useState<string>('+91 98765 43210');
  const [inviteCode, setInviteCode] = useState<string>('AARAV10TH');
  const [otpStep, setOtpStep] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('123456');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpStep(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    loginAs('PARENT', {
      name: 'Rajesh Sharma (Parent)',
      phone: phone,
      inviteCode: inviteCode,
    });
    router.push('/dashboard/parent');
  };

  const handleQuickParentDemo = () => {
    setIsLoading(true);
    loginAs('PARENT');
    router.push('/dashboard/parent');
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-emerald-500/5 via-background to-background">
      <div className="w-full max-w-md space-y-6">
        {/* Navigation link */}
        <div className="flex items-center justify-between">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Login Portals
          </Link>

          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider">
            Parent Oversight Portal
          </span>
        </div>

        {/* Card Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-3xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/25">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Parent Control Sign In
          </h1>
          <p className="text-xs text-muted-foreground">
            Monitor real-time live attendance, weakness heatmaps, and CCE report cards.
          </p>
        </div>

        {/* 1-Click Fast Parent Demo */}
        <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-foreground flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Instant Parent Demo:
            </div>
            <div className="text-[11px] text-muted-foreground">Monitoring Aarav Sharma (10th)</div>
          </div>
          <button
            onClick={handleQuickParentDemo}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all shrink-0"
          >
            1-Click Demo &rarr;
          </button>
        </div>

        {/* Parent Login Card */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl space-y-5">
          {!otpStep ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Registered Parent Mobile Number</label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Student Link Invite Code</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    placeholder="e.g. AARAV10TH"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-xs font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Found on your child's student dashboard under Profile settings.
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send SMS & WhatsApp OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300">
                OTP sent successfully to <strong>{phone}</strong>!
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Enter 6-Digit Verification Code</label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  maxLength={6}
                  className="w-full px-4 py-3 rounded-xl border border-emerald-500/40 bg-background text-center text-lg font-mono font-black tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <div className="text-[10px] text-emerald-600 font-semibold text-center">
                  ✓ Demo OTP (123456) pre-filled for testing
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify & Open Parent Portal</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setOtpStep(false)}
                className="w-full text-center text-xs text-muted-foreground hover:underline"
              >
                Edit Mobile Number / Code
              </button>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-muted-foreground">
          Need student access?{' '}
          <Link href="/login/student" className="font-bold text-primary hover:underline">
            Go to Student Sign In &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
