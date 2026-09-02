'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { CURRENT_STUDENT, SUBJECTS, BADGES } from '@/lib/mock-data';
import { PerformanceChart } from '@/components/charts/performance-chart';
import { SubjectRadarChart } from '@/components/charts/subject-radar';
import { MathRenderer } from '@/components/math-renderer';
import { RoleAccessGuard } from '@/components/role-access-guard';
import {
  Flame,
  Sparkles,
  BookOpen,
  Video,
  FileCheck2,
  HelpCircle,
  Award,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Target,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';

export default function StudentDashboardPage() {
  const { currentBoard, streakCount, studentPoints, bookings, doubts, chapters, incrementStreak } =
    useAppStore();

  const activeBookings = bookings.filter((b) => b.status === 'CONFIRMED');

  const totalChapters = chapters.length;
  const completedChapters = chapters.filter(
    (c) => c.status === 'COMPLETED' || c.status === 'REVISED'
  ).length;
  const progressPercent = Math.round((completedChapters / totalChapters) * 100);

  return (
    <RoleAccessGuard allowedRoles={['STUDENT']} pageTitle="Student Learning Portal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Student Welcome Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-xl overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
                {currentBoard} Board Class 10
              </span>
              <span className="text-xs text-indigo-200">Exam Target: Feb-Mar 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {CURRENT_STUDENT.name}! 🚀
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-xl">
              You are on track for a 95%+ score. Complete today’s Light chapter numerical problems to maintain your study streak!
            </p>
          </div>

          {/* Gamified Metric Badges */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Streak Counter Card */}
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur border border-white/15 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Flame className="w-6 h-6 fill-amber-400 animate-bounce" />
              </div>
              <div>
                <div className="text-lg font-black text-amber-300">{streakCount} Days</div>
                <div className="text-[11px] text-white/80 font-medium">Daily Study Streak</div>
              </div>
              <button
                onClick={incrementStreak}
                className="ml-1 text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-1 rounded-md hover:bg-amber-300 transition-colors"
                title="Check in for today"
              >
                + Check In
              </button>
            </div>

            {/* XP Points */}
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur border border-white/15 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="text-lg font-black text-emerald-300">{studentPoints} XP</div>
                <div className="text-[11px] text-white/80 font-medium">Scholar Points</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Upcoming Live Sessions & Quick Syllabus Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Upcoming Classes & Subject Cards */}
        <div className="lg:col-span-8 space-y-8">
          {/* Upcoming Live Classes */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Video className="w-5 h-5 text-rose-500" />
                Your Live Tutoring Sessions
              </h2>
              <Link href="/tutors" className="text-xs font-semibold text-primary hover:underline">
                Book Another Tutor &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {activeBookings.map((session) => (
                <div
                  key={session.id}
                  className={`p-5 rounded-2xl border bg-card transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    session.isLiveNow
                      ? 'border-rose-500/50 shadow-md shadow-rose-500/5 bg-rose-500/[0.02]'
                      : 'border-border'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={session.tutorAvatar}
                      alt={session.tutorName}
                      className="w-12 h-12 rounded-full object-cover border border-border"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                          {session.subjectName}
                        </span>
                        {session.isLiveNow && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white flex items-center gap-1 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-white" /> LIVE NOW
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-sm text-foreground">{session.topic}</h3>
                      <div className="text-xs text-muted-foreground flex items-center gap-3">
                        <span>Mentor: {session.tutorName}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {session.durationMinutes} Mins
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {session.isLiveNow ? (
                      <Link
                        href={session.meetingUrl || '/classroom/session-live-101'}
                        className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rose-500/25 transition-all"
                      >
                        <Video className="w-4 h-4 animate-pulse" /> Join Whiteboard Class
                      </Link>
                    ) : (
                      <Link
                        href={session.meetingUrl || '/classroom/session-live-101'}
                        className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-foreground font-semibold text-xs transition-colors"
                      >
                        Classroom Link
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enrolled Subjects Syllabus Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                10th-Grade Subject Portals
              </h2>
              <Link href="/subjects" className="text-xs font-semibold text-primary hover:underline">
                View All &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SUBJECTS.slice(0, 4).map((sub) => {
                const subChapters = chapters.filter((c) => c.subjectId === sub.id);
                const subCompleted = subChapters.filter(
                  (c) => c.status === 'COMPLETED' || c.status === 'REVISED'
                ).length;
                const subTotal = subChapters.length || sub.chaptersCount || 1;
                const percent = Math.round((subCompleted / subTotal) * 100);

                return (
                  <Link
                    key={sub.id}
                    href={`/subjects/${sub.slug}`}
                    className="group p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                        {sub.name}
                      </span>
                      <span className="text-xs font-bold text-primary">{percent}%</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="text-[11px] text-muted-foreground flex justify-between">
                        <span>{subCompleted} of {subTotal} Chapters Mastered</span>
                        <span>Open &rarr;</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Weekly Analytics Chart */}
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-foreground">Weekly Study Hours & Daily Target</h3>
                <p className="text-xs text-muted-foreground">Target: 2.5 hours/day (Total this week: 18.5 hours)</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                +14% vs Last Week
              </span>
            </div>
            <PerformanceChart />
          </div>
        </div>

        {/* Right Column (4 cols): Quick Practice, Badges, Radar Mastery */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Mock Test Launch */}
          <div className="p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-indigo-500/5 to-purple-500/5 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <FileCheck2 className="w-4 h-4" /> Timed Practice Test
            </div>
            <h3 className="font-bold text-base text-foreground">
              Ready for a 15-Min Quadratic Equations Mock?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Test your speed on discriminant calculation and nature of roots with instant grading & step-by-step math explanations.
            </p>
            <Link
              href="/tests/test-math-quad"
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
            >
              Start 15-Min Test Now <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Subject Mastery Radar */}
          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-500" /> Subject Mastery Breakdown
            </h3>
            <SubjectRadarChart />
          </div>

          {/* Gamification Badges */}
          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" /> Earned Badges
              </h3>
              <span className="text-[11px] text-muted-foreground">
                {BADGES.filter((b) => b.unlocked).length} / {BADGES.length}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {BADGES.map((b) => (
                <div
                  key={b.id}
                  className={`p-3 rounded-xl border text-center space-y-1 transition-all ${
                    b.unlocked
                      ? 'border-amber-500/30 bg-amber-500/5 text-foreground'
                      : 'border-border bg-muted/40 opacity-50 text-muted-foreground'
                  }`}
                >
                  <div className="text-base">{b.unlocked ? '🏆' : '🔒'}</div>
                  <div className="text-xs font-bold truncate">{b.name}</div>
                  <div className="text-[10px] text-muted-foreground line-clamp-1">{b.category}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Doubt Activity */}
          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-primary" /> Recent Doubts
              </h3>
              <Link href="/doubts/new" className="text-xs text-primary font-semibold hover:underline">
                + Ask
              </Link>
            </div>

            <div className="space-y-2">
              {doubts.slice(0, 2).map((d) => (
                <Link
                  key={d.id}
                  href={`/doubts/${d.id}`}
                  className="block p-3 rounded-xl bg-muted/40 hover:bg-muted border border-border text-xs space-y-1 transition-colors"
                >
                  <div className="font-semibold text-foreground truncate">
                    <MathRenderer math={d.title} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{d.subjectName}</span>
                    <span className="text-emerald-600 font-medium">{d.status}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </RoleAccessGuard>
  );
}
