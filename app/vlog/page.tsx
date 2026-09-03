'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Bot,
  GraduationCap,
  HeartHandshake,
  Users,
  BookOpen,
  FileCheck2,
  CheckCircle2,
  Send,
  ExternalLink,
  Clock,
  Layers,
  Award,
  ShieldCheck,
  Check,
  Copy,
  ChevronRight,
  ArrowRight,
  Zap,
  HelpCircle,
  Building,
  Target,
  BarChart3,
  Flame,
  Settings,
  Link2,
  Globe,
  RefreshCw,
  Edit3,
} from 'lucide-react';

const THREE_D_CONCEPTS = [
  {
    title: 'Physics: Ray Optics & Focal Reflection',
    subject: 'Physics',
    board: 'CBSE / ICSE / State',
    img: '/concepts/physics_optics_3d.jpg',
    desc: 'Concave and convex mirrors with focal point convergence and ROYGBIV rainbow dispersion.',
    href: '/subjects/physics',
  },
  {
    title: 'Mathematics: Quadratic & Algebraic Graphs',
    subject: 'Mathematics',
    board: 'CBSE / ICSE / State',
    img: '/concepts/math_algebra_3d.jpg',
    desc: 'Coordinate geometry with parabola roots, factorization curves, and animated polynomial axes.',
    href: '/subjects/mathematics',
  },
  {
    title: 'Chemistry: Blast Furnace & Smelting Metallurgy',
    subject: 'Chemistry',
    board: 'State / CBSE / ICSE',
    img: '/concepts/chem_acids_metal_3d.jpg',
    desc: 'Froth floatation froth tanks, electrolytic refining, and molten iron blast furnace extraction.',
    href: '/subjects/chemistry',
  },
  {
    title: 'Biology: Stylized Human Heart Double Circulation',
    subject: 'Biology',
    board: 'CBSE / ICSE / State',
    img: '/concepts/bio_heart_3d.jpg',
    desc: 'Friendly 3D heart character showing pulmonary and systemic circuits with oxygenated blood flow.',
    href: '/subjects/biology',
  },
  {
    title: 'Mathematics: Trigonometry Right-Angle Ratios',
    subject: 'Mathematics',
    board: 'CBSE / ICSE / State',
    img: '/concepts/math_trig_3d.jpg',
    desc: '3D glowing right triangle with sine, cosine, tangent formulas and angle of elevation trees.',
    href: '/subjects/mathematics',
  },
  {
    title: 'Physics: Electric Circuits & Solenoids',
    subject: 'Physics',
    board: 'CBSE / ICSE / State',
    img: '/concepts/physics_elec_3d.jpg',
    desc: 'Resistors, battery cells, ammeters, and glowing coils demonstrating magnetic field lines.',
    href: '/subjects/physics',
  },
];

import { useAppStore } from '@/lib/store';

export default function PlatformOverviewPage() {
  const { interestedCandidates, addInterestedCandidate, currentRole, googleFormUrl, setGoogleFormUrl } = useAppStore();
  const [activeRoleTab, setActiveRoleTab] = useState<'STUDENT' | 'PARENT' | 'TUTOR' | 'SCHOOL'>('STUDENT');

  // --- Registration / Google Form State ---
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [regId, setRegId] = useState('');
  const [copiedToken, setCopiedToken] = useState(false);

  // Google Form Link & Mode State
  const [activeFormMode, setActiveFormMode] = useState<'SMART' | 'EMBED'>('SMART');
  const [isEditingFormUrl, setIsEditingFormUrl] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState(googleFormUrl || 'https://forms.gle/EduTen2026BoardPrep');
  const [copiedFormUrl, setCopiedFormUrl] = useState(false);
  const [urlSaveMsg, setUrlSaveMsg] = useState(false);

  // Form Fields
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantRole, setApplicantRole] = useState<'STUDENT' | 'PARENT' | 'EDUCATOR' | 'SCHOOL'>('STUDENT');
  const [applicantBoard, setApplicantBoard] = useState('CBSE');
  const [applicantCity, setApplicantCity] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Live Classes (Morning/Evening Slots)',
    'Google Gemini AI Doubt Solver',
  ]);
  const [applicantNotes, setApplicantNotes] = useState('');

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSaveGoogleFormUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrlInput.trim()) return;
    setGoogleFormUrl(customUrlInput.trim());
    setIsEditingFormUrl(false);
    setUrlSaveMsg(true);
    setTimeout(() => setUrlSaveMsg(false), 3000);
  };

  const handleCopyFormLink = () => {
    navigator.clipboard.writeText(googleFormUrl || customUrlInput);
    setCopiedFormUrl(true);
    setTimeout(() => setCopiedFormUrl(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantEmail.trim()) return;

    const token = `EDUTEN-${applicantBoard}-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setRegId(token);

    addInterestedCandidate({
      token,
      name: applicantName.trim(),
      email: applicantEmail.trim(),
      phone: applicantPhone.trim() || '+91 98765 43210',
      role: applicantRole,
      board: applicantBoard as any,
      city: applicantCity.trim(),
      interests: selectedInterests,
      notes: applicantNotes.trim(),
    });

    setFormSubmitted(true);
  };

  const handleCopyRegToken = () => {
    navigator.clipboard.writeText(regId);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-14">
      {/* 1. Hero Title Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-12 border border-border shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/20 text-primary-foreground border border-primary/30 text-xs font-extrabold tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Apex Fusion Platform Overview & Admissions Hub</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              All Details About Apex Fusion — Modern 10th-Grade Board Preparation
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore the complete ecosystem built for Class 10 board toppers: Google Gemini Multimodal AI Doubt Solver, authentic CBSE/ICSE/State Board curricula, 3D Pixar-style concept models, live multi-slot classrooms, parent oversight, and early admission registration.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href="#registration-form"
              className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-primary/25 flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Send className="w-4 h-4" />
              <span>Register Interest</span>
            </a>
            <Link
              href="/directory"
              className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 flex items-center justify-center gap-2 transition-all"
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Interested List ({interestedCandidates.length})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Platform Highlights & Architecture Grid */}
      <div id="platform-pillars" className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" /> Core Platform Pillars
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
            Everything You Need to Master 10th Board Exams
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Built from the ground up for CBSE, ICSE, and State Board curriculum requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Gemini AI */}
          <div className="p-6 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all space-y-4 shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-lg text-foreground">
                Google Gemini Multimodal AI Doubt Solver
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Snap textbook diagrams or type questions. Gemini AI produces step-by-step KaTeX LaTeX formulas, CBSE marking keys, and exam answer tips 24/7.
              </p>
            </div>
            <Link
              href="/ai-doubt-solver"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline pt-2"
            >
              <span>Try Gemini AI Solver</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: 3 Boards */}
          <div className="p-6 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all space-y-4 shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-lg text-foreground">
                Dedicated CBSE, ICSE & State Syllabi
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                21 full subjects populated with at least 5 chapters each — covers ICSE GST & Matrices, State Board Metallurgy & SCERT, and CBSE NCERT core concepts.
              </p>
            </div>
            <Link
              href="/subjects"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline pt-2"
            >
              <span>Explore Subject Syllabi</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 3: 3D Concepts */}
          <div className="p-6 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all space-y-4 shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-lg text-foreground">
                3D Pixar/Blender Concept Graphics
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                10 custom 3D cartoonish illustrations (concave mirrors, Ohm&apos;s circuits, blast furnaces, DNA helices, Shakespeare Forum) to make retention effortless.
              </p>
            </div>
            <Link
              href="/subjects/physics"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline pt-2"
            >
              <span>View Physics 3D Concepts</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 4: Live Classrooms */}
          <div className="p-6 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all space-y-4 shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-lg text-foreground">
                Live Classrooms Across 4 Daily Timings
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Morning (6:30 AM), Afternoon (2:30 PM), Evening (6:00 PM), and Night (8:30 PM) sessions with digital whiteboards, hand raise audio interaction, and free pass access.
              </p>
            </div>
            <Link
              href="/tutors"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline pt-2"
            >
              <span>Meet Live Mentors</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 5: Parent Portal */}
          <div className="p-6 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all space-y-4 shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-lg text-foreground">
                Parent Oversight & WhatsApp CCE Reports
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Parents strictly see their linked child&apos;s data, Red/Amber/Green topic weakness heatmaps, live class attendance logs, and automated WhatsApp scorecard updates.
              </p>
            </div>
            <Link
              href="/dashboard/parent"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline pt-2"
            >
              <span>Open Parent Portal</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 6: Admin Directory */}
          <div className="p-6 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all space-y-4 shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-lg text-foreground">
                Master Admin Credential Authority
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Full control over student, parent, and tutor account provisioning, one-click login access granting, password resets, and user permissions across all boards.
              </p>
            </div>
            <Link
              href="/directory"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline pt-2"
            >
              <span>View Directory Hub</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Role-Tailored Experience Breakdown */}
      <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border space-y-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-primary uppercase tracking-wider">
              Tailored Ecosystem
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-foreground">
              How EduTen Serves Every Stakeholder
            </h3>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-muted/70 border border-border overflow-x-auto">
            {[
              { id: 'STUDENT', label: '🎓 For Students' },
              { id: 'PARENT', label: '👨‍👩‍👧 For Parents' },
              { id: 'TUTOR', label: '👨‍🏫 For Faculty' },
              { id: 'SCHOOL', label: '🏫 For Schools' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveRoleTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeRoleTab === tab.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Panels */}
        {activeRoleTab === 'STUDENT' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-2">
              <div className="font-extrabold text-sm text-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Instant 24/7 AI Doubt Solver</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Never wait until next morning. Upload textbook problems anytime for step-by-step KaTeX LaTeX solutions and exam scoring tips.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-2">
              <div className="font-extrabold text-sm text-foreground flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span>5-Section Timed Board Mocks</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Take authentic 80-mark mock exams with section timers, official marking schemes, and comparison with Topper model answers.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-2">
              <div className="font-extrabold text-sm text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>3D Visual Memory Anchors</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Replace text-heavy memorization with 3D models for ray optics, chemical blast furnaces, Ohm&apos;s circuits, and genetics.
              </p>
            </div>
          </div>
        )}

        {activeRoleTab === 'PARENT' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-2">
              <div className="font-extrabold text-sm text-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-500" />
                <span>Strict Ward Data Isolation</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Complete privacy. Parents only access their linked child&apos;s records, mock scores, and class attendance logs.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-2">
              <div className="font-extrabold text-sm text-foreground flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-500" />
                <span>Red/Amber/Green Weakness Heatmap</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Identify weak chapters before board exams occur. Instantly see which topics need revision and book targeted mentor sessions.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-2">
              <div className="font-extrabold text-sm text-foreground flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-500" />
                <span>Official CCE Report Card Downloads</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Download printable Continuous Comprehensive Evaluation (CCE) report cards and receive automated WhatsApp score digests.
              </p>
            </div>
          </div>
        )}

        {activeRoleTab === 'TUTOR' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-2">
              <div className="font-extrabold text-sm text-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-500" />
                <span>Live Interactive Whiteboard</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Teach with digital drawing tools, equation renderers, real-time student doubt queues, and audio hand-raising.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-2">
              <div className="font-extrabold text-sm text-foreground flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Verified Subject Badges</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Highlight your academic credentials (IIT/NIT alumnus, Certified Board Evaluator) and set transparent hourly rates.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-2">
              <div className="font-extrabold text-sm text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Flexible 4-Slot Scheduling</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Host sessions in Morning (6:30 AM), Afternoon (2:30 PM), Evening (6:00 PM), or Night (8:30 PM) slots.
              </p>
            </div>
          </div>
        )}

        {activeRoleTab === 'SCHOOL' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-2">
              <div className="font-extrabold text-sm text-foreground flex items-center gap-2">
                <Building className="w-4 h-4 text-blue-500" />
                <span>Institutional Bulk Access</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Onboard entire Class 10 cohorts with customized school branding, teacher dashboards, and batch-level CCE analytics.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-2">
              <div className="font-extrabold text-sm text-foreground flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-500" />
                <span>Cohort Weakness Diagnostics</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Principal and HOD dashboards pinpointing class-wide syllabus gaps before pre-board preliminary examinations.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-2">
              <div className="font-extrabold text-sm text-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-500" />
                <span>Dedicated Board Support</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Curriculum alignments tailored for CBSE NCERT, ICSE CISCE, and State SCERT school requirements.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 4. 3D Concept Illustrations Showcase */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-primary uppercase tracking-wider">
              Visual Learning Gallery
            </span>
            <h3 className="text-2xl font-black text-foreground">
              3D Concept Visual Models (Pixar/Blender Style)
            </h3>
          </div>
          <Link
            href="/subjects"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>View All 21 Subjects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {THREE_D_CONCEPTS.map((c, i) => (
            <div
              key={i}
              className="rounded-3xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold">
                  {c.subject}
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-primary/90 text-white text-[10px] font-bold">
                  {c.board}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-sm text-foreground leading-snug">
                    {c.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                <Link
                  href={c.href}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline pt-2"
                >
                  <span>Explore Subject Chapter</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Official Google Form / Registration & Expression of Interest */}
      <div
        id="registration-form"
        className="rounded-3xl border border-border bg-card p-6 sm:p-10 space-y-8 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
              <FileCheck2 className="w-3.5 h-3.5" /> Official 2026 Registration & Expression of Interest
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Register for EduTen Board Tutoring & Early Admission
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Fill out this official form to request enrollment, book a complimentary 1-on-1 mentor session, or enquire about school-wide institutional access.
            </p>
          </div>

          {/* Action Buttons & Google Form Controls */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Direct Open in Google Forms Button */}
            <a
              href={googleFormUrl || 'https://forms.gle/EduTen2026BoardPrep'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all hover:scale-105"
              title="Open the live Google Form in a new tab"
            >
              <Globe className="w-4 h-4 text-amber-300" />
              <span>Open in Google Forms</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Edit / Paste Google Form URL Button */}
            <button
              type="button"
              onClick={() => setIsEditingFormUrl(!isEditingFormUrl)}
              className="px-3.5 py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold border border-border flex items-center gap-1.5 transition-all"
              title="Change or paste your custom Google Form link"
            >
              <Settings className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{isEditingFormUrl ? 'Close URL Settings' : 'Set Form Link'}</span>
            </button>

            {/* Copy Form Link */}
            <button
              type="button"
              onClick={handleCopyFormLink}
              className="p-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold border border-border transition-all"
              title="Copy Google Form Link"
            >
              {copiedFormUrl ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Inline Google Form URL Customizer */}
        {isEditingFormUrl && (
          <div className="p-5 rounded-2xl bg-muted/60 border border-primary/30 space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="text-xs font-extrabold text-foreground flex items-center gap-2">
                <Link2 className="w-4 h-4 text-primary" />
                <span>Configure Your Google Form URL</span>
              </div>
              <span className="text-[11px] text-muted-foreground">
                Paste your custom Google Forms link (forms.gle or docs.google.com/forms/...)
              </span>
            </div>

            <form onSubmit={handleSaveGoogleFormUrl} className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="url"
                required
                placeholder="https://docs.google.com/forms/d/e/.../viewform or https://forms.gle/..."
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                className="w-full sm:flex-1 px-4 py-2.5 rounded-xl bg-card border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 font-mono"
              />

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all shadow"
                >
                  Save URL
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCustomUrlInput('https://forms.gle/EduTen2026BoardPrep');
                    setGoogleFormUrl('https://forms.gle/EduTen2026BoardPrep');
                    setIsEditingFormUrl(false);
                    setUrlSaveMsg(true);
                    setTimeout(() => setUrlSaveMsg(false), 3000);
                  }}
                  className="px-3 py-2.5 rounded-xl bg-card hover:bg-muted text-foreground text-xs font-medium border border-border transition-all whitespace-nowrap"
                >
                  Reset Default
                </button>
              </div>
            </form>

            <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 pt-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>
                Tip: If using Google Forms embed, use the share link from Google Forms: <strong>Send &rarr; Link (🔗) or Embed (&lt;&gt;)</strong>.
              </span>
            </div>
          </div>
        )}

        {/* Success Toast for URL save */}
        {urlSaveMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Google Form URL successfully updated and linked across the website!</span>
          </div>
        )}

        {/* Mode Switcher: Smart Native Form vs Google Form Embed */}
        <div className="flex items-center justify-between flex-wrap gap-3 p-1.5 rounded-2xl bg-muted/70 border border-border">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveFormMode('SMART')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeFormMode === 'SMART'
                  ? 'bg-card text-foreground shadow-md font-extrabold ring-1 ring-border'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>EduTen Instant Smart Form (Auto-Records Leads)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFormMode('EMBED')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeFormMode === 'EMBED'
                  ? 'bg-card text-foreground shadow-md font-extrabold ring-1 ring-border'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>Live Google Form Embed & Direct View</span>
            </button>
          </div>

          <div className="text-[11px] text-muted-foreground px-3">
            {activeFormMode === 'SMART'
              ? '✨ Submissions instantly appear in Directory & Admin Leads Hub'
              : `🔗 Connected URL: ${googleFormUrl.substring(0, 45)}...`}
          </div>
        </div>

        {/* GOOGLE FORM EMBED VIEW */}
        {activeFormMode === 'EMBED' && (
          <div className="space-y-4 rounded-3xl bg-muted/20 border border-border p-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border">
              <div className="space-y-1">
                <div className="text-sm font-extrabold text-foreground flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span>Google Forms Live Session</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  You are connected to <strong>{googleFormUrl}</strong>. Click below to open directly in Google Forms or fill via the frame.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold shadow flex items-center gap-1.5 transition-all"
                >
                  <span>Open Full Form in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Embedded Google Form Frame Container */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-border bg-card shadow-inner min-h-[500px]">
              <iframe
                src={
                  googleFormUrl.includes('viewform')
                    ? googleFormUrl.includes('embedded=true')
                      ? googleFormUrl
                      : `${googleFormUrl}${googleFormUrl.includes('?') ? '&' : '?'}embedded=true`
                    : googleFormUrl
                }
                width="100%"
                height="650"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full min-h-[600px] border-0"
                title="EduTen Google Form Registration"
              >
                Loading Google Form...
              </iframe>
            </div>
          </div>
        )}

        {/* SMART FORM VIEW (Native Interactive Form) */}
        {activeFormMode === 'SMART' && (
          <div>

        {/* Submission State or Form */}
        {formSubmitted ? (
          <div className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-foreground">
                🎉 Registration Submitted Successfully!
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Thank you, <strong>{applicantName}</strong>! Our Academic Admissions team will review your application for the <strong>{applicantBoard} Board</strong> and reach out to <strong>{applicantPhone || applicantEmail}</strong> within 24 hours.
              </p>
            </div>

            {/* Registration Token Box */}
            <div className="inline-flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border shadow-sm">
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                  Application Tracking Token
                </span>
                <span className="font-mono text-sm font-extrabold text-primary">{regId}</span>
              </div>
              <button
                onClick={handleCopyRegToken}
                className="px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 flex items-center gap-1 transition-all"
              >
                {copiedToken ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Token</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/directory"
                className="px-5 py-2.5 rounded-xl bg-primary text-white font-extrabold text-xs hover:bg-primary/90 transition-all shadow flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5" />
                <span>View in Interested Candidates List (Directory) &rarr;</span>
              </Link>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setApplicantName('');
                  setApplicantEmail('');
                  setApplicantPhone('');
                  setApplicantCity('');
                  setApplicantNotes('');
                }}
                className="text-xs text-muted-foreground hover:text-foreground font-semibold underline"
              >
                Submit Another Response
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* 1. Who are you? */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold text-foreground uppercase tracking-wider">
                1. I am registering as: *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'STUDENT', label: '🎓 10th Student', desc: 'Preparing for Boards' },
                  { id: 'PARENT', label: '👨‍👩‍👧 Parent / Guardian', desc: 'Tracking Ward Progress' },
                  { id: 'EDUCATOR', label: '👨‍🏫 Educator / Tutor', desc: 'Seeking Mentor Role' },
                  { id: 'SCHOOL', label: '🏫 School Principal / Rep', desc: 'Bulk Access Inquiry' },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setApplicantRole(r.id as any)}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      applicantRole === r.id
                        ? 'bg-primary text-white border-primary shadow-md font-bold ring-2 ring-primary/30'
                        : 'bg-muted/40 border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className="text-xs font-bold">{r.label}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{r.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Candidate / Applicant Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diya Sharma"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-xs sm:text-sm focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="diya.sharma@gmail.com"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-xs sm:text-sm focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  WhatsApp / Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-xs sm:text-sm focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            {/* 3. Board & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Target Board Curriculum *
                </label>
                <select
                  value={applicantBoard}
                  onChange={(e) => setApplicantBoard(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-xs sm:text-sm font-medium focus:ring-2 focus:ring-primary/40"
                >
                  <option value="CBSE">CBSE Class 10 (NCERT Aligned)</option>
                  <option value="ICSE">ICSE Class 10 (CISCE Council)</option>
                  <option value="STATE">State Board Class 10 (SCERT)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  City & State
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hyderabad, Telangana"
                  value={applicantCity}
                  onChange={(e) => setApplicantCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-xs sm:text-sm focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            {/* 4. What are you most interested in? */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold text-foreground uppercase tracking-wider">
                4. Select Your Key Interests (Choose all that apply):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  'Live Classes (Morning/Evening Slots)',
                  'Google Gemini AI Doubt Solver',
                  'Timed Chapter Mocks & PYQs',
                  '1-on-1 Mentorship with IIT Faculty',
                  'Parent Oversight & WhatsApp CCE Alerts',
                  'School Institutional Bulk Access',
                ].map((item) => {
                  const isChecked = selectedInterests.includes(item);
                  return (
                    <div
                      key={item}
                      onClick={() => toggleInterest(item)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-2.5 text-xs ${
                        isChecked
                          ? 'bg-primary/10 border-primary text-primary font-bold shadow-sm'
                          : 'bg-muted/40 border-border text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked ? 'bg-primary border-primary text-white' : 'border-slate-400'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <span>{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Additional Notes / Queries */}
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Any Specific Questions or Target Goals? (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. I want to improve in Physics Numerical problems and Science Ray Optics before the pre-board exams..."
                value={applicantNotes}
                onChange={(e) => setApplicantNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-xs sm:text-sm focus:ring-2 focus:ring-primary/40"
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Your information is secure. We never share student contact numbers.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-extrabold shadow-xl shadow-primary/25 flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span>Submit Registration & Get Free Diagnostic Test</span>
              </button>
            </div>
          </form>
        )}
          </div>
        )}
      </div>
    </div>
  );
}
