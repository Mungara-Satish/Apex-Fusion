'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Sparkles,
  Bot,
  GraduationCap,
  HeartHandshake,
  Users,
  Video,
  BookOpen,
  FileCheck2,
  CheckCircle2,
  Send,
  ExternalLink,
  Clock,
  Eye,
  ThumbsUp,
  Share2,
  Calendar,
  Layers,
  Award,
  ShieldCheck,
  Check,
  Copy,
  ChevronRight,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';

interface VlogEpisode {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: string;
  date: string;
  speaker: string;
  speakerRole: string;
  speakerAvatar: string;
  thumbnail: string;
  badge: string;
  topics: string[];
  videoSrc?: string;
  timestamps: { time: string; label: string }[];
}

const VLOG_EPISODES: VlogEpisode[] = [
  {
    id: 'vlog-1',
    title: 'Inside EduTen 2026: How 10th-Graders Score 95%+ in Board Exams',
    description:
      'A complete guided tour of the EduTen ecosystem — from Google Gemini Multimodal AI doubt resolution to 3D Pixar concept visualizations and live multi-slot classrooms.',
    duration: '8:45',
    views: '24.5K views',
    date: 'Sep 2, 2026',
    speaker: 'Dr. Priya Raman & Aarav Sharma',
    speakerRole: 'Ex-IIT Delhi Faculty & Class 10 Topper',
    speakerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    badge: '⭐ Featured Overview',
    topics: ['Full Platform Tour', 'CBSE/ICSE/State', 'Gemini AI', 'Live Classrooms'],
    timestamps: [
      { time: '0:45', label: 'Why 3 Distinct Boards Matter (CBSE, ICSE, State)' },
      { time: '2:15', label: 'Google Gemini Multimodal AI Doubt Solver Live Demo' },
      { time: '4:10', label: '3D Pixar Concept Illustrations & Formulas' },
      { time: '5:50', label: 'Live Whiteboard Classrooms across 4 Timings' },
      { time: '7:20', label: 'Parent Oversight & WhatsApp CCE Reports' },
    ],
  },
  {
    id: 'vlog-2',
    title: 'Google Gemini AI Doubt Solver in Action: Step-by-Step KaTeX Math & Science',
    description:
      'Watch our multimodal AI break down complex quadratic proofs, chemical reaction balancing, and ray optics sign conventions in seconds with formatted LaTeX.',
    duration: '6:15',
    views: '18.2K views',
    date: 'Aug 28, 2026',
    speaker: 'Prof. Rajesh Verma',
    speakerRole: 'Senior Mathematics Mentor (IIT Madras)',
    speakerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    badge: '🤖 AI Technology',
    topics: ['Gemini 1.5 Flash', 'KaTeX Proofs', 'Multimodal Diagrams', '24/7 Assistance'],
    timestamps: [
      { time: '0:30', label: 'Submitting a Doubt via Image & Text' },
      { time: '1:45', label: 'KaTeX Mathematical Notation Rendering' },
      { time: '3:20', label: 'Exam Marking Scheme Tips by AI' },
      { time: '5:00', label: 'Triage to Live IIT Faculty' },
    ],
  },
  {
    id: 'vlog-3',
    title: 'Visualizing Abstract Science: 3D Pixar/Blender Concept Models',
    description:
      'Explore how we turned abstract physics rays, chemical blast furnaces, and biological double circulation into intuitive 3D cartoonish visual infographics.',
    duration: '7:30',
    views: '14.9K views',
    date: 'Aug 24, 2026',
    speaker: 'Ananya Sengupta',
    speakerRole: 'Head of Visual Curriculum & Biology Lead',
    speakerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    badge: '🎨 3D Visual Learning',
    topics: ['3D Graphics', 'Ray Optics', 'DNA Double Helix', 'pH Scales'],
    timestamps: [
      { time: '0:40', label: 'Why Visual Memory Outlasts Rote Memorization' },
      { time: '2:10', label: 'Optics Ray Diagrams with Focal Convergence' },
      { time: '4:15', label: 'Chemical Smelting & Blast Furnace Models' },
      { time: '6:00', label: 'DNA Double Helix & Punnett Square Grids' },
    ],
  },
  {
    id: 'vlog-4',
    title: 'Parent Portal & WhatsApp Alerts: Keeping Parents in the Loop',
    description:
      'A walkthrough for parents showing real-time class attendance logs, chapter weakness heatmaps (Red/Amber/Green), and automated WhatsApp scorecards.',
    duration: '5:20',
    views: '11.4K views',
    date: 'Aug 19, 2026',
    speaker: 'Rajesh Sharma',
    speakerRole: 'Parent Advisory Board Member',
    speakerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80',
    badge: '👨‍👩‍👧 Parent Guide',
    topics: ['CCE Reports', 'WhatsApp Alerts', 'Weakness Heatmaps', 'Attendance Logs'],
    timestamps: [
      { time: '0:35', label: 'Student Data Isolation in Parent Portal' },
      { time: '1:50', label: 'Configuring WhatsApp Score Alerts' },
      { time: '3:10', label: 'Understanding Red/Amber/Green Weakness Heatmap' },
      { time: '4:30', label: 'Downloading Official CBSE CCE Report Card' },
    ],
  },
];

export default function VlogPage() {
  const [activeEpisode, setActiveEpisode] = useState<VlogEpisode>(VLOG_EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(135); // 2:15
  const totalDurationSec = 525; // 8:45
  const [likesCount, setLikesCount] = useState(1284);
  const [hasLiked, setHasLiked] = useState(false);

  // --- Registration / Google Form State ---
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [regId, setRegId] = useState('');
  const [copiedToken, setCopiedToken] = useState(false);

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

  const handleLike = () => {
    if (!hasLiked) {
      setLikesCount((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikesCount((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const handleSeek = (timeStr: string) => {
    const parts = timeStr.split(':');
    const sec = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    setCurrentTimeSec(sec);
    setIsPlaying(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantEmail.trim()) return;

    const token = `EDUTEN-${applicantBoard}-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setRegId(token);
    setFormSubmitted(true);
  };

  const handleCopyRegToken = () => {
    navigator.clipboard.writeText(regId);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* 1. Hero Title Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 border border-border shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground border border-primary/30 text-xs font-bold tracking-wide uppercase">
              <Video className="w-4 h-4 text-emerald-400" />
              <span>EduTen Official Vlog & Platform Showcase</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Experience the Future of 10th-Grade Board Learning
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Watch in-depth video walkthroughs, discover our Google Gemini AI Doubt Solver, explore 3D concept graphics, and register your interest with our official 2026 admission form.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href="#registration-form"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-primary/25 flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Send className="w-4 h-4" />
              <span>Register Interest Form</span>
            </a>
            <a
              href="#vlog-player"
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 flex items-center justify-center gap-2 transition-all"
            >
              <Play className="w-4 h-4" />
              <span>Watch Tour (8 min)</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Interactive Video Player Showcase */}
      <div id="vlog-player" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols: Video Player & Active Video Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Video Player Box */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group aspect-video flex flex-col justify-between">
            {/* Background Thumbnail / Mock Stream */}
            <img
              src={activeEpisode.thumbnail}
              alt={activeEpisode.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Top Bar inside video */}
            <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between text-white">
              <span className="px-3 py-1 rounded-full bg-red-600/90 text-white font-extrabold text-[11px] tracking-wider uppercase flex items-center gap-1.5 shadow">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                EduTen Vlog HD
              </span>

              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/15">
                {activeEpisode.badge}
              </span>
            </div>

            {/* Center Play Button Overlay */}
            <div className="relative z-10 self-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/90 hover:bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/50 hover:scale-110 transition-all border-2 border-white/30"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 sm:w-10 sm:h-10 fill-white" />
                ) : (
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white ml-1" />
                )}
              </button>
            </div>

            {/* Bottom Controls Bar */}
            <div className="relative z-10 p-4 sm:p-6 space-y-3 bg-gradient-to-t from-black via-black/80 to-transparent">
              {/* Scrubber Progress Bar */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newPercent = clickX / rect.width;
                  setCurrentTimeSec(Math.floor(newPercent * totalDurationSec));
                }}
                className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all relative"
              >
                <div
                  className="h-full bg-primary rounded-full relative transition-all"
                  style={{ width: `${(currentTimeSec / totalDurationSec) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-white text-xs font-semibold">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-primary transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:text-primary transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-[11px] text-slate-300">
                    {formatTime(currentTimeSec)} / {activeEpisode.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-mono">1080p 60fps</span>
                  <button className="hover:text-primary transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Metadata & Speaker Card */}
          <div className="p-6 rounded-3xl bg-card border border-border space-y-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {activeEpisode.topics.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary border border-primary/20"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs">
                <button
                  onClick={handleLike}
                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all font-semibold ${
                    hasLiked
                      ? 'bg-primary text-white border-primary'
                      : 'bg-muted hover:bg-muted/80 text-foreground border-border'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-white' : ''}`} />
                  <span>{likesCount}</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Video link copied to clipboard!');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground border border-border flex items-center gap-1.5 transition-all font-semibold"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              {activeEpisode.title}
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {activeEpisode.description}
            </p>

            {/* Speaker Info */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-3">
                <img
                  src={activeEpisode.speakerAvatar}
                  alt={activeEpisode.speaker}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-primary/40 shadow"
                />
                <div>
                  <div className="font-extrabold text-sm text-foreground flex items-center gap-1.5">
                    {activeEpisode.speaker}
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary fill-primary/20" />
                  </div>
                  <div className="text-xs text-muted-foreground">{activeEpisode.speakerRole}</div>
                </div>
              </div>

              <div className="text-right text-xs text-muted-foreground">
                <div className="font-semibold text-foreground">{activeEpisode.views}</div>
                <div>Published {activeEpisode.date}</div>
              </div>
            </div>

            {/* Clickable Timestamps */}
            <div className="pt-3 border-t border-border/60">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Jump to Chapters in this Vlog:
              </div>
              <div className="flex flex-wrap gap-2">
                {activeEpisode.timestamps.map((ts) => (
                  <button
                    key={ts.time}
                    onClick={() => handleSeek(ts.time)}
                    className="px-3 py-1 rounded-xl bg-muted/60 hover:bg-primary/10 hover:text-primary hover:border-primary/40 text-foreground text-xs font-medium border border-border flex items-center gap-1.5 transition-all"
                  >
                    <span className="font-mono font-bold text-primary">{ts.time}</span>
                    <span>{ts.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Vlog Playlist */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <h3 className="font-extrabold text-base text-foreground flex items-center gap-2">
              <Video className="w-4 h-4 text-primary" />
              <span>EduTen Vlog Episodes</span>
            </h3>
            <span className="text-xs font-bold text-muted-foreground">
              {VLOG_EPISODES.length} Videos
            </span>
          </div>

          <div className="space-y-3">
            {VLOG_EPISODES.map((ep) => {
              const isSelected = activeEpisode.id === ep.id;
              return (
                <div
                  key={ep.id}
                  onClick={() => {
                    setActiveEpisode(ep);
                    setCurrentTimeSec(0);
                    setIsPlaying(true);
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                    isSelected
                      ? 'bg-primary/5 border-primary shadow-md ring-1 ring-primary/30'
                      : 'bg-card border-border hover:border-primary/40 hover:bg-muted/30'
                  }`}
                >
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                    <img
                      src={ep.thumbnail}
                      alt={ep.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white font-bold">
                      {ep.duration}
                    </span>
                    {isSelected && (
                      <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-between py-0.5 space-y-1 overflow-hidden">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wide truncate">
                      {ep.badge}
                    </span>
                    <h4 className="text-xs font-extrabold text-foreground line-clamp-2 leading-tight">
                      {ep.title}
                    </h4>
                    <div className="text-[11px] text-muted-foreground flex items-center gap-2">
                      <span>{ep.views}</span>
                      <span>•</span>
                      <span>{ep.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Registration Teaser Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-900 to-purple-950 text-white space-y-3 shadow-lg">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-300" /> Early Admission
            </div>
            <h4 className="font-extrabold text-sm leading-snug">
              Want 1-on-1 Guidance from IIT & CBSE Master Faculty?
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Register your interest today to claim a free diagnostic assessment & scholarship evaluation.
            </p>
            <a
              href="#registration-form"
              className="block w-full text-center py-2.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs hover:bg-slate-100 shadow transition-all"
            >
              Fill Registration Form &darr;
            </a>
          </div>
        </div>
      </div>

      {/* 3. Complete Website Blueprint & Details Grid */}
      <div className="space-y-6 pt-6 border-t border-border">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" /> Platform Architecture & Features
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
            Everything You Need to Know About EduTen
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            A comprehensive, all-in-one learning ecosystem built specifically for 10th-grade exam excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Gemini AI */}
          <div className="p-6 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all space-y-3 shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-foreground">
              Google Gemini Multimodal AI Doubt Solver
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Upload textbook questions, hand-drawn ray diagrams, or chemical equations. Receives instant step-by-step LaTeX formulas, CBSE marking schemes, and exam answer templates 24/7.
            </p>
            <Link
              href="/ai-doubt-solver"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              <span>Try Gemini AI Solver</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: 3 Boards */}
          <div className="p-6 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all space-y-3 shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-foreground">
              Dedicated CBSE, ICSE & State Board Syllabi
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Never mix up curricula. 21 full subjects with minimum 5 chapters each — covers ICSE GST & Matrices, State Board Froth Floatation & SCERT lessons, and CBSE NCERT core concepts.
            </p>
            <Link
              href="/subjects"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              <span>Explore Subject Syllabi</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: 3D Concepts */}
          <div className="p-6 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all space-y-3 shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-foreground">
              3D Pixar/Blender Concept Visuals
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every chapter features custom 3D cartoonish illustrations (concave mirrors, Ohm&apos;s circuits, blast furnaces, DNA helices, Shakespeare Forum) to make retention effortless.
            </p>
            <Link
              href="/subjects/physics"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              <span>View Physics 3D Concepts</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: Live Classrooms */}
          <div className="p-6 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all space-y-3 shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-foreground">
              Live Interactive Classrooms (4 Timings)
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Morning (6:30 AM), Afternoon (2:30 PM), Evening (6:00 PM), and Night (8:30 PM) sessions with digital whiteboards, hand raise audio interaction, and free pass access.
            </p>
            <Link
              href="/tutors"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              <span>Meet Live Mentors</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 5: Parent Portal */}
          <div className="p-6 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all space-y-3 shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-foreground">
              Parent Oversight & CCE Report Cards
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Parents strictly see their linked child&apos;s data, Red/Amber/Green topic weakness heatmaps, live class attendance logs, and automated WhatsApp scorecard updates.
            </p>
            <Link
              href="/dashboard/parent"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              <span>Open Parent Portal</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 6: Admin Directory */}
          <div className="p-6 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all space-y-3 shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-foreground">
              Master Admin Credential Authority
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Full control over student, parent, and tutor account provisioning, one-click login access granting, password resets, and user permissions across all boards.
            </p>
            <Link
              href="/directory"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              <span>View Directory Hub</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Official Google Form / Registration & Expression of Interest */}
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
              Register for EduTen Board Tutoring & Early Access
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Fill out this official form to request enrollment, book a complimentary 1-on-1 mentor session, or enquire about school-wide institutional access.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://docs.google.com/forms"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold border border-border flex items-center gap-1.5 transition-all"
            >
              <span>Open in Google Forms</span>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            </a>
          </div>
        </div>

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

            <div className="pt-3">
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setApplicantName('');
                  setApplicantEmail('');
                  setApplicantPhone('');
                  setApplicantCity('');
                  setApplicantNotes('');
                }}
                className="text-xs text-primary font-bold hover:underline"
              >
                Submit Another Response &rarr;
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
    </div>
  );
}
