'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { Board } from '@/lib/types';
import {
  GraduationCap,
  Sparkles,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Flame,
  BookOpen,
  Eye,
  EyeOff,
  Crown,
  Zap,
  ShieldCheck,
  Check,
  Radio,
  Bot,
  School,
} from 'lucide-react';

export default function StudentLoginPage() {
  const router = useRouter();
  const { loginAs, setBoard, currentBoard, setSubscription } = useAppStore();

  const [selectedBoard, setSelectedBoard] = useState<Board>(currentBoard || 'CBSE');
  const [selectedPlanType, setSelectedPlanType] = useState<'all-access' | 'booster' | 'free'>('all-access');
  const [email, setEmail] = useState<string>('student@eduten.org');
  const [password, setPassword] = useState<string>('••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Dynamically generate subscription options based on the chosen board
  const subscriptionOptions = [
    {
      id: 'all-access' as const,
      name: `${selectedBoard} 2026 All-Access Super Pass`,
      badge: '👑 All Features Unlocked',
      priceLabel: 'Included with Enrolled Account',
      perks: [
        `100% Free Live Classes for ${selectedBoard} across All Timings (Morning, Afternoon, Evening, Night)`,
        `Unlimited Google Gemini Multimodal AI Doubt Solver with step-by-step KaTeX`,
        `Official ${selectedBoard} 10th Board Mock Exam Engine with Topper Answer Keys`,
        `Interactive Whiteboard Classroom with verified ${selectedBoard} IIT & Master Faculty`,
      ],
    },
    {
      id: 'booster' as const,
      name: `${selectedBoard} Board Booster Fast-Track Pass`,
      badge: '⚡ Exam Focused',
      priceLabel: 'Active Access',
      perks: [
        `Google Gemini AI Doubt Solver trained on ${selectedBoard} curriculum & PYQs`,
        `${selectedBoard} Full Mock Assessment Engine`,
        `Chapter-wise ${selectedBoard} Syllabus Mastery Trackers`,
      ],
    },
    {
      id: 'free' as const,
      name: `${selectedBoard} Standard Free Tier`,
      badge: 'Basic',
      priceLabel: 'Free Forever',
      perks: [
        `Core ${selectedBoard} 10th Syllabus Tracker`,
        `Formula Cheat Sheets & Concept Notes`,
      ],
    },
  ];

  const selectedPlanObj =
    subscriptionOptions.find((s) => s.id === selectedPlanType) || subscriptionOptions[0];

  const handleBoardChange = (board: Board) => {
    setSelectedBoard(board);
    setBoard(board);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setBoard(selectedBoard);

    const isSubActive = selectedPlanType !== 'free';
    setSubscription(isSubActive, selectedPlanObj.name);

    loginAs('STUDENT', {
      name:
        selectedBoard === 'ICSE'
          ? 'Rohan Mukherjee'
          : selectedBoard === 'STATE'
          ? 'Kavya Reddy'
          : 'Aarav Sharma',
      email: email,
      board: selectedBoard,
    });
    router.push('/dashboard/student');
  };

  const handleQuickStudentDemo = (board: Board) => {
    setIsLoading(true);
    setSelectedBoard(board);
    setBoard(board);
    const planName = `${board} 2026 All-Access Super Pass`;
    setSubscription(true, planName);

    const studentName =
      board === 'ICSE'
        ? 'Rohan Mukherjee (ICSE Class 10)'
        : board === 'STATE'
        ? 'Kavya Reddy (State Board Class 10)'
        : 'Aarav Sharma (CBSE Class 10)';

    loginAs('STUDENT', {
      name: studentName,
      board: board,
      email: `${board.toLowerCase()}.student@eduten.org`,
    });
    router.push('/dashboard/student');
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-indigo-500/5 via-background to-background">
      <div className="w-full max-w-lg space-y-6">
        {/* Navigation link */}
        <div className="flex items-center justify-between">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Login Portals
          </Link>

          <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-wider">
            Student Portal
          </span>
        </div>

        {/* Card Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-3xl bg-primary text-primary-foreground flex items-center justify-center mx-auto shadow-xl shadow-primary/25">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            10th Grade Student Sign In
          </h1>
          <p className="text-xs text-muted-foreground">
            Select your board (CBSE, ICSE, State Board) & active subscription plan.
          </p>
        </div>

        {/* 1-Click Fast Student Demo Buttons by Board */}
        <div className="p-4 rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/10 via-indigo-500/10 to-purple-500/10 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Instant 1-Click Demo by Board Exam:</span>
            </div>
            <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
              Super Pass Active
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickStudentDemo('CBSE')}
              className="px-2.5 py-2 rounded-2xl bg-card border border-border hover:border-primary text-foreground text-[11px] font-bold shadow-xs hover:bg-primary/5 transition-all text-center flex flex-col items-center gap-0.5"
            >
              <span className="text-primary font-black">CBSE Board</span>
              <span className="text-[9px] text-muted-foreground font-medium">Aarav Sharma</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickStudentDemo('ICSE')}
              className="px-2.5 py-2 rounded-2xl bg-card border border-border hover:border-indigo-500 text-foreground text-[11px] font-bold shadow-xs hover:bg-indigo-500/5 transition-all text-center flex flex-col items-center gap-0.5"
            >
              <span className="text-indigo-600 dark:text-indigo-400 font-black">ICSE Board</span>
              <span className="text-[9px] text-muted-foreground font-medium">Rohan Mukherjee</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickStudentDemo('STATE')}
              className="px-2.5 py-2 rounded-2xl bg-card border border-border hover:border-purple-500 text-foreground text-[11px] font-bold shadow-xs hover:bg-purple-500/5 transition-all text-center flex flex-col items-center gap-0.5"
            >
              <span className="text-purple-600 dark:text-purple-400 font-black">STATE Board</span>
              <span className="text-[9px] text-muted-foreground font-medium">Kavya Reddy</span>
            </button>
          </div>
        </div>

        {/* Student Login Form */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Board Selector */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5 text-primary" />
                  <span>1. Select 10th Board Exam</span>
                </label>
                <span className="text-[10px] font-extrabold text-primary uppercase">
                  Active: {selectedBoard}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(['CBSE', 'ICSE', 'STATE'] as Board[]).map((b) => {
                  const isSelected = selectedBoard === b;
                  return (
                    <button
                      type="button"
                      key={b}
                      onClick={() => handleBoardChange(b)}
                      className={`py-2.5 px-3 rounded-2xl text-xs font-black border transition-all flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-[1.02]'
                          : 'border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/60'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      <span>{b} Board</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SUBSCRIPTION OPTION SELECTOR (DYNAMIC FOR SELECTED BOARD) */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-500" />
                  <span>2. Choose {selectedBoard} Subscription Plan</span>
                </label>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold">
                  {selectedPlanObj.priceLabel}
                </span>
              </div>

              <div className="space-y-2">
                {subscriptionOptions.map((plan) => {
                  const isSelected = selectedPlanType === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlanType(plan.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all text-xs flex flex-col gap-1.5 ${
                        isSelected
                          ? 'border-primary bg-primary/5 ring-1 ring-primary/40 shadow-xs'
                          : 'border-border bg-muted/20 hover:bg-muted/40 text-muted-foreground'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? 'border-primary bg-primary text-white'
                                : 'border-muted-foreground/40'
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5" />}
                          </div>
                          <span
                            className={`font-bold ${
                              isSelected ? 'text-foreground' : 'text-muted-foreground'
                            }`}
                          >
                            {plan.name}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {plan.badge}
                        </span>
                      </div>

                      {isSelected && (
                        <div className="pl-6 pt-1 space-y-1 text-[11px] text-muted-foreground animate-in fade-in">
                          {plan.perks.map((perk, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                              <span>{perk}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-bold text-foreground">3. Student Email ID</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={`${selectedBoard.toLowerCase()}.student@eduten.org`}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-foreground">4. Password</label>
                <a href="#" className="text-[11px] text-primary hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-extrabold text-xs hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-50"
            >
              <span>Sign In with {selectedPlanObj.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Sign In */}
          <div className="space-y-3 pt-2">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-border w-full"></div>
              <span className="bg-card px-3 text-[11px] text-muted-foreground uppercase tracking-wider relative">
                Or Sign In With
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleQuickStudentDemo(selectedBoard)}
              className="w-full py-2.5 rounded-xl border border-border hover:bg-muted font-bold text-xs text-foreground transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google School Account ({selectedBoard} Board)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
