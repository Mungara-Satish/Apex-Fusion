'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  BookOpen,
  Sparkles,
  GraduationCap,
  HeartHandshake,
  Users,
  Bot,
  Video,
  Layers,
  Code,
  Laptop,
  Zap,
  Globe,
  ArrowRight,
} from 'lucide-react';

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const slides = [
    {
      id: 1,
      badge: 'EXECUTIVE INTRODUCTION',
      title: 'APEX FUSION',
      subtitle: 'Modern 10th-Grade Board Examination Prep & Multimodal AI Tutoring Platform',
      notes: 'Welcome everyone. Today, we are presenting Apex Fusion — a high-performance, purpose-built educational platform engineered exclusively for 10th-grade students preparing for CBSE, ICSE, and State Board examinations.',
    },
    {
      id: 2,
      badge: 'MARKET OPPORTUNITY',
      title: 'Problem Statement & The 10th-Grade Challenge',
      subtitle: 'Why generic education platforms fail Indian board exam students',
      notes: 'Class 10 is the foundational academic milestone for over 25 million students annually in India. Existing tools fail to deliver board-specific precision and seamless parent-tutor transparency.',
    },
    {
      id: 3,
      badge: 'SYSTEM ARCHITECTURE',
      title: 'The Apex Fusion 4-Pillar Solution',
      subtitle: 'Integrated ecosystem engineered for student success',
      notes: 'Apex Fusion is an integrated platform combining multimodal AI, live digital classrooms, authentic board syllabi, and transparent parental oversight.',
    },
    {
      id: 4,
      badge: 'TECH STACK MATRIX',
      title: 'Modern, High-Performance Technology Stack',
      subtitle: 'Engineered for speed, responsiveness, security, and scale',
      notes: 'Our tech stack was chosen for sub-second page loads, strict TypeScript type safety, responsive design across all devices, and enterprise-grade security.',
    },
    {
      id: 5,
      badge: 'AI INNOVATION',
      title: 'Multimodal Google Gemini AI Doubt Solver',
      subtitle: 'Instant textbook image scanning and step-by-step board proofs',
      notes: 'Unlike generic ChatGPT text responses, Gemini AI on Apex Fusion formats answers exactly like a CBSE/ICSE answer key with step-by-step marking rubrics.',
    },
    {
      id: 6,
      badge: 'FACULTY & VIDEO PIPELINE',
      title: 'Multi-Source Video Masterclasses',
      subtitle: 'Upload local files from computer, embed Google Drive, or stream cloud URLs',
      notes: 'Mentors have complete flexibility. They can upload video files directly from their laptop or paste a Google Drive link, which is automatically converted into an embedded player.',
    },
    {
      id: 7,
      badge: 'STAKEHOLDER WORKSPACES',
      title: 'Role-Based Ecosystem (RBAC)',
      subtitle: 'Tailored workspaces for Students, Parents, Tutors, and Administrators',
      notes: 'Every user is protected by role-based access guards. Parents strictly see their connected child, and tutors retain full pedagogical tools.',
    },
    {
      id: 8,
      badge: 'LIVE DEMO CREDENTIALS',
      title: 'Demo Test Accounts Sheet',
      subtitle: 'Ready-to-test credentials for all 4 platform roles',
      notes: 'These credentials can be used for live demonstrations or evaluated using the 1-click credential buttons inside the login screen.',
    },
    {
      id: 9,
      badge: 'SUMMARY & CONCLUSION',
      title: 'Apex Fusion — Delivering Board Exam Excellence',
      subtitle: 'Production-ready platform built for 10th-grade toppers',
      notes: 'Thank you for your time. Apex Fusion is fully prepared and ready for production deployment.',
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8 font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Header */}
      <header className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-black text-lg text-white hover:text-sky-400 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span>Apex Fusion</span>
          </Link>
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] font-bold text-slate-300">
            Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              showNotes ? 'bg-sky-500 text-white border-sky-400' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            Speaker Notes {showNotes ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                setIsFullscreen(true);
              } else {
                document.exitFullscreen();
                setIsFullscreen(false);
              }
            }}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Slide Stage */}
      <main className="flex-1 flex flex-col justify-center my-6 max-w-5xl mx-auto w-full">
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Slide Header */}
          <div className="space-y-1.5 pb-4 border-b border-white/10 relative z-10">
            <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-[10px] font-extrabold uppercase tracking-wider border border-sky-500/30">
              {slide.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {slide.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              {slide.subtitle}
            </p>
          </div>

          {/* Dynamic Content by Slide ID */}
          <div className="relative z-10 min-h-[300px] flex flex-col justify-center py-4">
            {slide.id === 1 && (
              <div className="space-y-6 text-center max-w-2xl mx-auto">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white mx-auto shadow-2xl shadow-sky-500/30">
                  <GraduationCap className="w-10 h-10" />
                </div>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 font-bold text-xs border border-sky-500/30">CBSE 10</span>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 font-bold text-xs border border-indigo-500/30">ICSE 10</span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 font-bold text-xs border border-purple-500/30">State SSLC</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-xs border border-emerald-500/30">Gemini 2.5 AI</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Enterprise-grade digital learning platform uniting <strong>Students</strong>, <strong>Parents</strong>, <strong>Faculty</strong>, and <strong>Administrators</strong> with authentic curricula, 3D concept graphics, and live multi-slot classes.
                </p>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10"><div className="text-lg font-black text-white">4,820+</div><div className="text-slate-400 text-[10px]">Students</div></div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10"><div className="text-lg font-black text-sky-400">24/7</div><div className="text-slate-400 text-[10px]">AI Solver</div></div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10"><div className="text-lg font-black text-emerald-400">96.8%</div><div className="text-slate-400 text-[10px]">Distinction</div></div>
                </div>
              </div>
            )}

            {slide.id === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1.5">
                  <div className="text-rose-400 font-bold text-xs">1. Curriculum Fragmentation</div>
                  <p className="text-slate-400 text-[11px]">Generic apps merge boards, ignoring ICSE GST/Matrices and State Board SCERT requirements.</p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                  <div className="text-amber-400 font-bold text-xs">2. Late-Night Doubt Bottlenecks</div>
                  <p className="text-slate-400 text-[11px]">Students get stuck late at night with no step-by-step LaTeX formula solutions.</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1.5">
                  <div className="text-purple-400 font-bold text-xs">3. Parental Blind Spots</div>
                  <p className="text-slate-400 text-[11px]">Parents lack granular visibility into chapter weaknesses until school exam report cards.</p>
                </div>
                <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 space-y-1.5">
                  <div className="text-sky-400 font-bold text-xs">4. Tutor Workflow Friction</div>
                  <p className="text-slate-400 text-[11px]">Faculty mentors struggle with fragmented video uploads, live slots, and timetable management.</p>
                </div>
              </div>
            )}

            {slide.id === 3 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <Bot className="w-6 h-6 text-sky-400" />
                  <div className="font-bold text-xs text-white">1. Gemini AI Solver</div>
                  <p className="text-slate-400 text-[10px]">Photo scanning & LaTeX proofs with marking rubrics.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <BookOpen className="w-6 h-6 text-indigo-400" />
                  <div className="font-bold text-xs text-white">2. 3-Board Curricula</div>
                  <p className="text-slate-400 text-[10px]">21 subjects with 5+ chapters & formula sheets.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <Video className="w-6 h-6 text-purple-400" />
                  <div className="font-bold text-xs text-white">3. Live Classrooms</div>
                  <p className="text-slate-400 text-[10px]">4 daily slots with interactive whiteboard.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <HeartHandshake className="w-6 h-6 text-emerald-400" />
                  <div className="font-bold text-xs text-white">4. Parent Portal</div>
                  <p className="text-slate-400 text-[10px]">Weakness heatmaps & WhatsApp score alerts.</p>
                </div>
              </div>
            )}

            {slide.id === 4 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left text-xs">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="font-bold text-sky-400">Next.js 14 & React 18</div>
                  <div className="text-slate-400 text-[10px]">App router, SSR, and zero-latency client navigation.</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="font-bold text-indigo-400">Google Gemini 2.5 API</div>
                  <div className="text-slate-400 text-[10px]">Multimodal vision + heuristic fallback solver.</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="font-bold text-purple-400">KaTeX Math Engine</div>
                  <div className="text-slate-400 text-[10px]">Real-time LaTeX formula typesetting.</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="font-bold text-emerald-400">Zustand 5.0 Store</div>
                  <div className="text-slate-400 text-[10px]">Global state + LocalStorage sync.</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="font-bold text-amber-400">Tailwind CSS 3.4</div>
                  <div className="text-slate-400 text-[10px]">Skyblue #38bdf8 palette & glassmorphism.</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="font-bold text-rose-400">Razorpay Gateway</div>
                  <div className="text-slate-400 text-[10px]">SHA-256 HMAC orders & GST invoices.</div>
                </div>
              </div>
            )}

            {slide.id === 5 && (
              <div className="space-y-3 text-left">
                <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sky-400 text-sm">Google Gemini 2.5 Flash Multimodal Solver</div>
                    <div className="text-slate-400 text-xs">Upload textbook photo or type question prompt &rarr; instant LaTeX proof.</div>
                  </div>
                  <Link href="/ai-doubt-solver" className="px-3.5 py-1.5 rounded-xl bg-sky-500 text-slate-950 font-black text-xs">
                    Try Live AI
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-300">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">📷 Photo & Formula Scanner</div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">📐 Step-by-Step KaTeX Proofs</div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">🎯 CBSE 5-Mark Marking Rubric</div>
                </div>
              </div>
            )}

            {slide.id === 6 && (
              <div className="grid grid-cols-3 gap-3 text-left text-xs">
                <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 space-y-1">
                  <div className="font-bold text-sky-400">💻 From Computer</div>
                  <div className="text-slate-400 text-[10px]">Drag & drop local MP4/WebM files with animated upload progress & instant blob playback.</div>
                </div>
                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
                  <div className="font-bold text-indigo-400">📁 Google Drive</div>
                  <div className="text-slate-400 text-[10px]">Auto-converts /view share links into embedded /preview video player.</div>
                </div>
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1">
                  <div className="font-bold text-purple-400">🔗 Stream URL</div>
                  <div className="text-slate-400 text-[10px]">Cloud CDN & YouTube embeds with 0.75x–2x speed controls.</div>
                </div>
              </div>
            )}

            {slide.id === 7 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left text-xs">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="font-bold text-sky-400">🎓 Student</div>
                  <div className="text-slate-400 text-[10px]">Syllabi, AI solver, tests, daily study streaks.</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="font-bold text-rose-400">👨‍👩‍👧 Parent</div>
                  <div className="text-slate-400 text-[10px]">Child data isolation, weakness heatmap, WhatsApp alerts.</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="font-bold text-emerald-400">👨‍🏫 Tutor</div>
                  <div className="text-slate-400 text-[10px]">Computer/Drive upload, live whiteboard classes.</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="font-bold text-purple-400">🛡️ Admin</div>
                  <div className="text-slate-400 text-[10px]">Directory management, Google Form leads intake.</div>
                </div>
              </div>
            )}

            {slide.id === 8 && (
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-xs">
                  <thead className="bg-white/5 text-white font-bold">
                    <tr>
                      <th className="p-2.5 text-left">Role</th>
                      <th className="p-2.5 text-left">Name</th>
                      <th className="p-2.5 text-left">Email</th>
                      <th className="p-2.5 text-left">Password</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    <tr><td className="p-2.5 font-bold text-sky-400">🎓 Student</td><td className="p-2.5">Aarav Sharma</td><td className="p-2.5 font-mono text-[10px]">aarav.sharma@eduten.org</td><td className="p-2.5 font-mono text-[10px]">Aarav@2026</td></tr>
                    <tr><td className="p-2.5 font-bold text-rose-400">👨‍👩‍👧 Parent</td><td className="p-2.5">Rajesh Sharma</td><td className="p-2.5 font-mono text-[10px]">rajesh.sharma@parent.org</td><td className="p-2.5 font-mono text-[10px]">Parent@2026</td></tr>
                    <tr><td className="p-2.5 font-bold text-emerald-400">👨‍🏫 Tutor</td><td className="p-2.5">Dr. Priya Raman</td><td className="p-2.5 font-mono text-[10px]">priya.raman@eduten.org</td><td className="p-2.5 font-mono text-[10px]">Tutor@Physics10</td></tr>
                    <tr><td className="p-2.5 font-bold text-purple-400">🛡️ Admin</td><td className="p-2.5">Dr. Sanjay Gupta</td><td className="p-2.5 font-mono text-[10px]">admin@eduten.org</td><td className="p-2.5 font-mono text-[10px]">Admin@Master2026</td></tr>
                  </tbody>
                </table>
              </div>
            )}

            {slide.id === 9 && (
              <div className="space-y-4 text-center max-w-lg mx-auto">
                <div className="text-xl font-bold text-white">Apex Fusion — Empowering India's 10th-Grade Toppers</div>
                <p className="text-xs text-slate-400">Production-ready Next.js 14 platform with Multimodal AI, authentic syllabi, and multi-source video vault.</p>
                <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-xs font-mono text-sky-300">
                  github.com/Mungara-Satish/Apex-Fusion
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <Link href="/" className="px-5 py-2 rounded-xl bg-sky-500 text-slate-950 font-black text-xs">
                    Open Home
                  </Link>
                  <Link href="/login" className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs">
                    Sign In
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Speaker Notes */}
          {showNotes && (
            <div className="mt-4 p-3.5 rounded-2xl bg-slate-950 border border-sky-500/30 text-xs text-sky-200 relative z-10 animate-in fade-in">
              <span className="font-bold text-sky-400 uppercase text-[10px] block mb-0.5">Speaker Notes:</span>
              <p className="italic text-[11px]">{slide.notes}</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="flex items-center justify-between pt-4 border-t border-white/10 shrink-0">
        <div className="flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? 'w-8 bg-sky-400' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              title={`Jump to Slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
            disabled={currentSlide === 0}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 text-xs font-bold flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))}
            disabled={currentSlide === slides.length - 1}
            className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-30 text-slate-950 font-black text-xs flex items-center gap-1 shadow-lg shadow-sky-500/25"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
