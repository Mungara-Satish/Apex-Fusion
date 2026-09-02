'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { SUBJECTS, SAMPLE_TUTORS, SAMPLE_DOUBTS, BADGES } from '@/lib/mock-data';
import { MathRenderer } from '@/components/math-renderer';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  HelpCircle,
  FileCheck2,
  Video,
  Flame,
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  Award,
  Zap,
  ShieldCheck,
  Calculator,
  FlaskConical,
  Dna,
  Landmark,
  Globe,
  Clock,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Calculator,
  Zap,
  FlaskConical,
  Dna,
  Landmark,
  Globe,
  BookOpen,
};

export default function HomePage() {
  const { currentBoard, setBoard, streakCount, studentPoints } = useAppStore();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
            {/* Board Selector Pill */}
            <div className="inline-flex items-center gap-2 p-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold">
              <span className="bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
                10th Grade Specialization
              </span>
              <span className="pr-2 text-foreground font-medium">
                Tailored for {currentBoard} Board Exam Prep 2025-26
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Master Every 10th-Grade Subject with{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-600 to-purple-600">
                Top Mentors & Real-Time Whiteboard
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Mathematics proofs, Physics ray optics, Chemistry reactions, and Social Science answer writing.
              Experience 1-on-1 live classes, instant LaTeX doubt clearance, and auto-graded mock board exams.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/ai-doubt-solver"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" /> Gemini AI Doubt Solver
              </Link>
              <Link
                href="/tests/cbse-full-mock"
                className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <FileCheck2 className="w-4 h-4" /> CBSE 5-Section Board Mock
              </Link>
              <Link
                href="/classroom/session-live-101"
                className="px-5 py-3 rounded-2xl border border-border bg-card hover:bg-muted text-foreground font-semibold text-sm transition-all flex items-center gap-2 shadow-sm"
              >
                <Video className="w-4 h-4 text-rose-500" /> Live Classroom Demo
              </Link>
              <Link
                href="/dashboard/parent"
                className="px-5 py-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Parent Portal
              </Link>
            </div>

            {/* Key Trust Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-border/80 w-full text-left">
              <div className="p-3 rounded-xl bg-card border border-border">
                <div className="text-2xl font-bold text-foreground">98.4%</div>
                <div className="text-xs text-muted-foreground">Board Exam Pass Rate</div>
              </div>
              <div className="p-3 rounded-xl bg-card border border-border">
                <div className="text-2xl font-bold text-foreground">100% Verified</div>
                <div className="text-xs text-muted-foreground">IIT & Master Tutors</div>
              </div>
              <div className="p-3 rounded-xl bg-card border border-border">
                <div className="text-2xl font-bold text-foreground">&lt; 15 Mins</div>
                <div className="text-xs text-muted-foreground">Doubt Resolution Time</div>
              </div>
              <div className="p-3 rounded-xl bg-card border border-border">
                <div className="text-2xl font-bold text-foreground">1,200+</div>
                <div className="text-xs text-muted-foreground">PYQ & Solved Answers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10th Grade Core Subjects Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                Curriculum Hub
              </div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">
                Complete 10th-Grade Subject Catalog
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Full syllabus breakdown into chapters, formula sheets, NCERT solutions, and timed practice.
              </p>
            </div>
            <Link
              href="/subjects"
              className="text-primary hover:underline text-sm font-semibold flex items-center gap-1 self-start md:self-auto"
            >
              View Full Syllabus & Tracker &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUBJECTS.map((sub) => {
              const Icon = iconMap[sub.icon] || BookOpen;
              return (
                <Link
                  key={sub.id}
                  href={`/subjects/${sub.slug}`}
                  className="group relative flex flex-col p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${sub.color} text-white shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {sub.chaptersCount} Chapters
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-4 line-clamp-3">
                    {sub.description}
                  </p>

                  <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-medium text-muted-foreground">
                    <span className="flex items-center gap-1.5 text-foreground font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {sub.completedChaptersCount} Completed
                    </span>
                    <span className="text-primary font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      Open Portal &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Showcase: Interactive Live Classroom & Whiteboard */}
      <section className="py-16 md:py-24 bg-muted/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold">
                <Video className="w-3.5 h-3.5" /> Next-Gen Live Classroom
              </div>
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight leading-snug">
                Draw Ray Diagrams & Solve Quadratic Proofs in Real-Time
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Tired of static video calls? EduTen features an interactive STEM virtual whiteboard with geometric shapes, formula stamps, LaTeX rendering, and dual-way live chat.
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Interactive Geometric Canvas:</span> Draw circles, right triangles, and concave mirror optics diagrams with precision.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">KaTeX Formula Support:</span> Render complex fractional equations like <MathRenderer math="\frac{-b \pm \sqrt{b^2-4ac}}{2a}" /> directly in chat and notes.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">One-Click Snapshot Export:</span> Save all whiteboard teacher annotations as high-res PNG for revision.
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/classroom/session-live-101"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                >
                  <Video className="w-4 h-4" /> Launch Interactive Whiteboard Demo
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-2xl border border-border bg-card p-4 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-border text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500 animate-pulse" />
                    <span className="font-bold text-foreground">Live Physics Class: Ray Optics & Mirror Formula</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-semibold">
                    Dr. Priya Raman (IIT-D)
                  </span>
                </div>

                <div className="mt-3 p-4 rounded-xl bg-slate-950 text-white font-mono text-xs overflow-x-auto space-y-2">
                  <div className="text-slate-400 font-sans text-[11px]">Teacher Annotation Preview:</div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <MathRenderer math="\frac{1}{f} = \frac{1}{v} + \frac{1}{u} \implies \frac{1}{v} = \frac{1}{f} - \frac{1}{u}" block={true} />
                  </div>
                  <div className="text-emerald-400 text-[11px]">
                    ✓ Ray drawn from object through Focus reflects parallel to Principal Axis
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground pt-2">
                  <span>Canvas Tools: Freehand, Shapes, Eraser, KaTeX Stamp, PNG Export</span>
                  <Link href="/classroom/session-live-101" className="text-primary font-semibold hover:underline">
                    Open Full Classroom &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Tutors Showcase */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="text-xs font-bold text-primary uppercase tracking-wider">
              Expert Mentors
            </div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              Learn from 10th-Grade Board Exam Specialists
            </h2>
            <p className="text-muted-foreground text-sm">
              All tutors are credential-verified with proven track records of producing 95%+ board toppers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAMPLE_TUTORS.slice(0, 3).map((tutor) => (
              <div
                key={tutor.id}
                className="flex flex-col p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-foreground text-base">{tutor.name}</h3>
                      <ShieldCheck className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{tutor.rating}</span>
                      <span className="text-muted-foreground font-normal">({tutor.reviewCount} reviews)</span>
                    </div>
                    <div className="text-xs text-primary font-medium mt-1">
                      ₹{tutor.hourlyRate} / hour
                    </div>
                  </div>
                </div>

                <div className="text-xs font-semibold text-foreground mb-1">
                  {tutor.headline}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-4 line-clamp-3">
                  {tutor.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tutor.subjectsTaught.map((sub) => (
                    <span
                      key={sub}
                      className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-[11px] font-medium"
                    >
                      {sub}
                    </span>
                  ))}
                </div>

                <Link
                  href="/tutors"
                  className="w-full py-2.5 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white font-semibold text-xs text-center transition-all"
                >
                  Book 1-on-1 Session
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/tutors"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Browse all 10th-grade subject tutors & schedules &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Doubt Clearance Highlight with KaTeX Math */}
      <section className="py-16 md:py-24 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                24/7 Community Support
              </div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">
                Doubt Clearance Forum with LaTeX Math
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Post questions with math formulas or textbook photos. Get verified step-by-step solutions from tutors.
              </p>
            </div>
            <Link
              href="/doubts/new"
              className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all flex items-center gap-1.5 self-start md:self-auto shadow-sm"
            >
              <HelpCircle className="w-4 h-4" /> Ask a Doubt Now
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SAMPLE_DOUBTS.map((doubt) => (
              <Link
                key={doubt.id}
                href={`/doubts/${doubt.id}`}
                className="group flex flex-col p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary">
                    {doubt.subjectName}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      doubt.status === 'RESOLVED'
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : doubt.status === 'ANSWERED'
                        ? 'bg-blue-500/10 text-blue-600'
                        : 'bg-amber-500/10 text-amber-600'
                    }`}
                  >
                    {doubt.status}
                  </span>
                </div>

                <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors mb-2">
                  <MathRenderer math={doubt.title} />
                </h3>

                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">
                  {doubt.content}
                </p>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <img
                      src={doubt.studentAvatar}
                      alt={doubt.studentName}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span>{doubt.studentName} ({doubt.studentBoard})</span>
                  </div>
                  <div className="flex items-center gap-3 font-medium">
                    <span>{doubt.replies.length} Replies</span>
                    <span>👍 {doubt.upvotes}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gamification Badges & CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-tr from-indigo-950 via-primary/95 to-purple-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold backdrop-blur">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Daily Study Streaks & Board Exam Badges</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Score 95%+ in your 10th Board Exams?
            </h2>
            <p className="text-indigo-200 text-sm sm:text-base leading-relaxed">
              Join thousands of 10th-grade students preparing systematically with live interactive tutoring, formula sheet cheatcards, and timed mock tests.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/dashboard/student"
              className="px-8 py-3.5 rounded-xl bg-white text-indigo-950 font-bold text-sm hover:bg-indigo-50 transition-all shadow-xl shadow-black/20"
            >
              Start Free Board Prep Now
            </Link>
            <Link
              href="/tests"
              className="px-8 py-3.5 rounded-xl border border-white/30 hover:bg-white/10 text-white font-bold text-sm transition-all"
            >
              Take 15-Min Mock Test
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
