'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  ChevronLeft,
  MessageSquare,
  HelpCircle,
  Tv,
  Film,
  Compass,
  ArrowRight,
  MonitorPlay,
  Radio,
  Zap,
} from 'lucide-react';

interface VlogSlide {
  id: string;
  timestamp: string;
  seconds: number;
  title: string;
  subtitle: string;
  description: string;
  featureTag: string;
  badgeColor: string;
  image: string;
  ctaText: string;
  ctaHref: string;
  keyPoints: string[];
}

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
  slides: VlogSlide[];
  youtubeId?: string;
}

const VLOG_EPISODES: VlogEpisode[] = [
  {
    id: 'vlog-1',
    title: 'Inside EduTen: Complete Platform Tour & 10th Board Exam Mastery',
    description:
      'A comprehensive video tour of EduTen — discover how we combine Google Gemini Multimodal AI, authentic multi-board syllabi (CBSE, ICSE, State), 3D concept models, live classrooms, and parent oversight.',
    duration: '8:45',
    views: '24.8K views',
    date: 'Sep 2, 2026',
    speaker: 'Dr. Priya Raman & Aarav Sharma',
    speakerRole: 'Ex-IIT Delhi Faculty & Class 10 Topper',
    speakerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    thumbnail: '/concepts/physics_optics_3d.jpg',
    badge: '⭐ Platform Walkthrough',
    topics: ['Full Platform Tour', 'CBSE/ICSE/State', 'Gemini AI', 'Live Classrooms', 'Parent Portal'],
    youtubeId: 'PkZNo7MFNFg',
    slides: [
      {
        id: 's1',
        timestamp: '0:00',
        seconds: 0,
        title: '1. Multi-Board Curriculum Hub (CBSE, ICSE & State)',
        subtitle: 'Authentic 10th-Grade Syllabi with Minimum 5 Chapters per Subject',
        description:
          'EduTen never mixes up curricula. Switch seamlessly between CBSE (NCERT core), ICSE (GST, Banking & Matrices), and State Board (Metallurgy & SCERT) with dedicated chapter notes, formulas, and worked examples.',
        featureTag: 'Multi-Board Architecture',
        badgeColor: 'bg-blue-600',
        image: '/concepts/math_algebra_3d.jpg',
        ctaText: 'Explore Subject Catalog',
        ctaHref: '/subjects',
        keyPoints: [
          '21 full subjects populated across CBSE, ICSE, and State Board',
          'Step-by-step worked board solutions for every chapter',
          'Downloadable formula cheatcards & PYQ question banks',
        ],
      },
      {
        id: 's2',
        timestamp: '1:45',
        seconds: 105,
        title: '2. Google Gemini Multimodal AI Doubt Solver',
        subtitle: '24/7 Instant KaTeX Mathematical & Scientific Solutions',
        description:
          'Upload textbook snapshots, hand-drawn ray diagrams, or quadratic proofs. Gemini AI breaks down the concept step-by-step with LaTeX equations, exam tips, and marking scheme insights.',
        featureTag: 'Multimodal AI Engine',
        badgeColor: 'bg-indigo-600',
        image: '/concepts/physics_elec_3d.jpg',
        ctaText: 'Try Gemini AI Solver Live',
        ctaHref: '/ai-doubt-solver',
        keyPoints: [
          'Instant OCR & mathematical formula rendering with KaTeX',
          'Exam marking scheme tips to secure maximum step marks',
          'Automatic triage to live IIT mentors for deep doubts',
        ],
      },
      {
        id: 's3',
        timestamp: '3:30',
        seconds: 210,
        title: '3. 3D Pixar-Style Visual Concept Models',
        subtitle: 'Turning Abstract Science into Intuitive 3D Graphics',
        description:
          'Explore custom 3D cartoonish illustrations across Optics (concave/convex mirror rays), Electricity (circuits & solenoids), Acids & Metallurgy (blast furnace smelting), and Biology (DNA & double circulation).',
        featureTag: '3D Visual Learning',
        badgeColor: 'bg-emerald-600',
        image: '/concepts/chem_acids_metal_3d.jpg',
        ctaText: 'View 3D Concepts in Physics',
        ctaHref: '/subjects/physics',
        keyPoints: [
          '10 dedicated 3D visual concept models tailored to each topic',
          'Proven visual memory retention over rote memorization',
          'Interactive zoom, hover badges, and chapter breakdown',
        ],
      },
      {
        id: 's4',
        timestamp: '5:15',
        seconds: 315,
        title: '4. Live Interactive Classrooms across 4 Timings',
        subtitle: 'Morning, Afternoon, Evening & Night Live Sessions',
        description:
          'Attend live sessions at 6:30 AM (Morning), 2:30 PM (Afternoon), 6:00 PM (Evening), and 8:30 PM (Night). Features real-time whiteboard canvas, audio hand-raising, and free pass access.',
        featureTag: 'Live Classrooms',
        badgeColor: 'bg-amber-600',
        image: '/concepts/sst_history_geo_3d.jpg',
        ctaText: 'Meet Verified Live Mentors',
        ctaHref: '/tutors',
        keyPoints: [
          '100% Free Live Class Access for Super Pass holders',
          'Real-time interactive digital whiteboard & math equations',
          'Session recordings available for 24/7 revision',
        ],
      },
      {
        id: 's5',
        timestamp: '7:00',
        seconds: 420,
        title: '5. Parent Oversight & Automated WhatsApp Alerts',
        subtitle: 'Real-Time Attendance Audits & CCE Weakness Heatmaps',
        description:
          'Parents strictly view their linked child’s performance, Red/Amber/Green chapter weakness heatmaps, live class attendance logs, and receive automated WhatsApp score updates.',
        featureTag: 'Parent Control Portal',
        badgeColor: 'bg-rose-600',
        image: '/concepts/bio_heart_3d.jpg',
        ctaText: 'Open Parent Oversight Portal',
        ctaHref: '/dashboard/parent',
        keyPoints: [
          'Strict student data isolation in parent view',
          'Red/Amber/Green chapter weakness diagnostic heatmaps',
          'Printable official CBSE/ICSE CCE performance report cards',
        ],
      },
      {
        id: 's6',
        timestamp: '8:00',
        seconds: 480,
        title: '6. Master Admin Credential & Access Control',
        subtitle: 'Centralized User Provisioning & Password Authority',
        description:
          'Academic Master Admin has full control to + add students, parents, and tutors, grant or suspend login access, and change credentials with an instant strong password generator.',
        featureTag: 'Admin Access Control',
        badgeColor: 'bg-purple-600',
        image: '/concepts/eng_lit_3d.jpg',
        ctaText: 'View Directory & Credentials Hub',
        ctaHref: '/directory',
        keyPoints: [
          'Instant 1-click login access granting & suspension',
          'Comprehensive credential editor (username & password generator)',
          'Provisioning options for goals, pass tiers, and alert channels',
        ],
      },
    ],
  },
  {
    id: 'vlog-2',
    title: 'Google Gemini Multimodal AI Doubt Solver: Deep-Dive Demo',
    description:
      'See how our AI assistant processes 10th-grade Board questions, generates step-by-step LaTeX math proofs, and advises on exam answer phrasing.',
    duration: '6:15',
    views: '18.4K views',
    date: 'Aug 28, 2026',
    speaker: 'Prof. Rajesh Verma',
    speakerRole: 'Senior Mathematics Faculty (IIT Madras)',
    speakerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    thumbnail: '/concepts/math_trig_3d.jpg',
    badge: '🤖 AI Feature Focus',
    topics: ['Gemini 1.5 Flash', 'KaTeX Math', 'Exam Scoring Tips', 'Diagram OCR'],
    youtubeId: 'Z1BCujX3pw8',
    slides: [
      {
        id: 's2-1',
        timestamp: '0:00',
        seconds: 0,
        title: 'Step 1: Submitting Any 10th Doubt with Text or Diagram',
        subtitle: 'Physics Ray Diagrams, Math Trigonometry, or Chemistry Equations',
        description:
          'Simply type your query or upload an image from your textbook or handwritten notes. Gemini AI immediately parses formulas and diagrams.',
        featureTag: 'Multimodal Input',
        badgeColor: 'bg-indigo-600',
        image: '/concepts/math_trig_3d.jpg',
        ctaText: 'Test Doubt Solver',
        ctaHref: '/ai-doubt-solver',
        keyPoints: ['Supports image OCR and text input', 'Covers CBSE, ICSE, and State syllabi'],
      },
      {
        id: 's2-2',
        timestamp: '3:00',
        seconds: 180,
        title: 'Step 2: Step-by-Step KaTeX LaTeX Solution Rendering',
        subtitle: 'Clear Mathematical Formatting with Board Marking Keys',
        description:
          'Solutions are formatted with high-clarity KaTeX math notation so students learn the exact layout required for 100/100 board scores.',
        featureTag: 'LaTeX Rendering',
        badgeColor: 'bg-indigo-600',
        image: '/concepts/physics_optics_3d.jpg',
        ctaText: 'View Sample Doubts',
        ctaHref: '/doubts',
        keyPoints: ['Step-by-step formula breakdown', 'Highlighting key scoring keywords'],
      },
    ],
  },
  {
    id: 'vlog-3',
    title: '3D Visual Science & Mathematics: Concept Gallery Walkthrough',
    description:
      'A visual tour of how abstract ray optics, chemical metallurgy smelting, and biological double circulation are rendered into memorable 3D models.',
    duration: '7:30',
    views: '15.1K views',
    date: 'Aug 24, 2026',
    speaker: 'Ananya Sengupta',
    speakerRole: 'Visual Learning Director & Biology Lead',
    speakerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    thumbnail: '/concepts/bio_genetics_3d.jpg',
    badge: '🎨 3D Concept Art',
    topics: ['Ray Optics 3D', 'Blast Furnace 3D', 'DNA Helix 3D', 'Trigonometry 3D'],
    youtubeId: '2_c_g5qE4Xg',
    slides: [
      {
        id: 's3-1',
        timestamp: '0:00',
        seconds: 0,
        title: 'Physics Optics & Electric Circuits in 3D',
        subtitle: 'Laser Convergence at Focus F & Solenoid Magnetic Lines',
        description:
          'Concave and convex mirrors with focal point convergence and ROYGBIV rainbow dispersion make optical sign conventions unforgettable.',
        featureTag: 'Physics 3D',
        badgeColor: 'bg-blue-600',
        image: '/concepts/physics_optics_3d.jpg',
        ctaText: 'Explore Physics Chapters',
        ctaHref: '/subjects/physics',
        keyPoints: ['Light reflection & refraction in 3D', 'Electric circuit battery cells & resistors'],
      },
      {
        id: 's3-2',
        timestamp: '3:45',
        seconds: 225,
        title: 'Biology Circulation & Genetics in 3D',
        subtitle: 'Stylized Human Heart & Glowing DNA Double Helix',
        description:
          'Friendly heart characters showing pulmonary and systemic circuits alongside 4-box Punnett squares with Mendel pea pods.',
        featureTag: 'Biology 3D',
        badgeColor: 'bg-emerald-600',
        image: '/concepts/bio_genetics_3d.jpg',
        ctaText: 'Explore Biology Chapters',
        ctaHref: '/subjects/biology',
        keyPoints: ['Double circulation pathways', 'Mitosis stages & Punnett 3:1 ratio'],
      },
    ],
  },
  {
    id: 'vlog-4',
    title: 'Parent Oversight & CCE Report Cards: Ensuring Student Growth',
    description:
      'Learn how parents monitor daily live class attendance, review Red/Amber/Green topic weakness heatmaps, and download printable CCE reports.',
    duration: '5:20',
    views: '11.9K views',
    date: 'Aug 19, 2026',
    speaker: 'Rajesh Sharma',
    speakerRole: 'Parent Advisory Board Member',
    speakerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    thumbnail: '/concepts/chem_molecules_3d.jpg',
    badge: '👨‍👩‍👧 Parent Portal',
    topics: ['CCE Reports', 'WhatsApp Alerts', 'Weakness Heatmaps', 'Attendance Logs'],
    youtubeId: 'XqZsoesa55w',
    slides: [
      {
        id: 's4-1',
        timestamp: '0:00',
        seconds: 0,
        title: 'Private Ward Data Isolation & Real-Time Logs',
        subtitle: 'Parents Only See Their Linked Child’s Academic Records',
        description:
          'Every parent account is securely linked to their ward. View exact live class join times, quiz scores, and subject strengths.',
        featureTag: 'Data Privacy',
        badgeColor: 'bg-rose-600',
        image: '/concepts/sst_history_geo_3d.jpg',
        ctaText: 'Inspect Parent Portal',
        ctaHref: '/dashboard/parent',
        keyPoints: ['Strict ward isolation', 'Automatic WhatsApp score notifications'],
      },
    ],
  },
];

export default function VlogPage() {
  const [activeEpisode, setActiveEpisode] = useState<VlogEpisode>(VLOG_EPISODES[0]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<'INTERACTIVE_TOUR' | 'YOUTUBE_MASTERCLASS'>('INTERACTIVE_TOUR');
  const [likesCount, setLikesCount] = useState(1420);
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

  const currentSlide =
    activeEpisode.slides[currentSlideIndex] || activeEpisode.slides[0];

  // Auto-advance interactive tour slides when playing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && viewMode === 'INTERACTIVE_TOUR') {
      timer = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % activeEpisode.slides.length);
      }, 7000); // 7 seconds per visual scene
    }
    return () => clearInterval(timer);
  }, [isPlaying, viewMode, activeEpisode]);

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

  const handleSelectEpisode = (ep: VlogEpisode) => {
    setActiveEpisode(ep);
    setCurrentSlideIndex(0);
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* 1. Hero Title Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 border border-border shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground border border-primary/30 text-xs font-bold tracking-wide uppercase">
              <Video className="w-4 h-4 text-emerald-400" />
              <span>EduTen Official Platform Tour & Video Showcase</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Experience the Future of 10th-Grade Board Learning
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Watch the interactive video walkthrough of the EduTen ecosystem — from Google Gemini Multimodal AI to 3D concept models, multi-board syllabi, live classrooms, and parent oversight.
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
            <button
              onClick={() => {
                setIsPlaying(true);
                const el = document.getElementById('vlog-player');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 flex items-center justify-center gap-2 transition-all"
            >
              <Play className="w-4 h-4" />
              <span>Watch Website Tour</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. AUTHENTIC EDUTEN PLATFORM VIDEO WALKTHROUGH ENGINE */}
      <div id="vlog-player" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols: Real EduTen Video Presentation Player */}
        <div className="lg:col-span-8 space-y-6">
          {/* Player Mode Switcher */}
          <div className="flex items-center justify-between bg-muted/70 p-2 rounded-2xl border border-border">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('INTERACTIVE_TOUR')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  viewMode === 'INTERACTIVE_TOUR'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <MonitorPlay className="w-3.5 h-3.5" />
                <span>🎬 EduTen Platform Video Tour</span>
              </button>

              <button
                onClick={() => setViewMode('YOUTUBE_MASTERCLASS')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  viewMode === 'YOUTUBE_MASTERCLASS'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Tv className="w-3.5 h-3.5" />
                <span>📺 10th Board Prep Masterclass</span>
              </button>
            </div>

            <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 hidden sm:flex">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>100% Platform Verified Tour</span>
            </div>
          </div>

          {/* MAIN PLAYER VIEW */}
          {viewMode === 'INTERACTIVE_TOUR' ? (
            /* --- 100% AUTHENTIC EDUTEN INTERACTIVE PLATFORM VIDEO TOUR --- */
            <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl aspect-video w-full flex flex-col justify-between group">
              {/* Background 3D Concept / Screen Image with Cinematic Zoom */}
              <img
                key={currentSlide.image}
                src={currentSlide.image}
                alt={currentSlide.title}
                className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105 group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />

              {/* Top Header inside Video */}
              <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-primary text-white font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    EduTen Live Tour HD
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white ${currentSlide.badgeColor}`}>
                    {currentSlide.featureTag}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                    Scene {currentSlideIndex + 1} of {activeEpisode.slides.length}
                  </span>
                </div>
              </div>

              {/* Center Content Slide */}
              <div className="relative z-10 px-6 sm:px-10 py-4 text-white space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentSlide.subtitle}</span>
                </div>

                <h3 className="text-xl sm:text-3xl font-black tracking-tight leading-tight drop-shadow-md">
                  {currentSlide.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed drop-shadow line-clamp-3 sm:line-clamp-none">
                  {currentSlide.description}
                </p>

                {/* Key Points Checklist */}
                <div className="hidden sm:flex flex-wrap gap-2 pt-2">
                  {currentSlide.keyPoints.map((pt, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md text-[11px] font-medium border border-white/15 flex items-center gap-1.5 text-emerald-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{pt}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Video Controls & Navigation Bar */}
              <div className="relative z-10 p-4 sm:p-6 space-y-3 bg-gradient-to-t from-black via-black/90 to-transparent">
                {/* Visual Scene Progress Bar */}
                <div className="grid grid-cols-6 gap-1.5">
                  {activeEpisode.slides.map((s, idx) => (
                    <div
                      key={s.id}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`h-1.5 rounded-full cursor-pointer transition-all ${
                        idx === currentSlideIndex
                          ? 'bg-primary h-2 shadow-lg shadow-primary/50'
                          : idx < currentSlideIndex
                          ? 'bg-primary/60'
                          : 'bg-white/20 hover:bg-white/40'
                      }`}
                      title={s.title}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-white text-xs font-semibold">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                    </button>

                    <button
                      onClick={() =>
                        setCurrentSlideIndex((prev) =>
                          prev === 0 ? activeEpisode.slides.length - 1 : prev - 1
                        )
                      }
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                      title="Previous Scene"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() =>
                        setCurrentSlideIndex((prev) => (prev + 1) % activeEpisode.slides.length)
                      }
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                      title="Next Scene"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <span className="font-mono text-[11px] text-slate-300">
                      {currentSlide.timestamp} / {activeEpisode.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={currentSlide.ctaHref}
                      className="px-3 py-1.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow flex items-center gap-1.5 transition-all"
                    >
                      <span>{currentSlide.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* --- YOUTUBE MASTERCLASS PLAYER --- */
            <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl aspect-video w-full">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeEpisode.youtubeId || 'PkZNo7MFNFg'}?autoplay=1&rel=0&modestbranding=1`}
                title={activeEpisode.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0 absolute inset-0 z-10"
              />
            </div>
          )}

          {/* Interactive Scene Jumper Buttons */}
          <div className="p-4 rounded-3xl bg-card border border-border space-y-2.5 shadow-sm">
            <div className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-primary" />
                Jump to Platform Tour Chapters:
              </span>
              <span className="text-[11px] font-normal">Click any chapter to view UI walkthrough</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeEpisode.slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setViewMode('INTERACTIVE_TOUR');
                    setCurrentSlideIndex(idx);
                    setIsPlaying(true);
                  }}
                  className={`p-2.5 rounded-2xl text-left border transition-all text-xs flex items-start gap-2.5 ${
                    currentSlideIndex === idx && viewMode === 'INTERACTIVE_TOUR'
                      ? 'bg-primary/10 border-primary text-primary font-bold shadow-sm'
                      : 'bg-muted/40 border-border text-foreground hover:bg-muted'
                  }`}
                >
                  <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-card border border-border font-bold text-primary shrink-0">
                    {slide.timestamp}
                  </span>
                  <div className="overflow-hidden">
                    <div className="font-bold truncate">{slide.title}</div>
                    <div className="text-[10px] text-muted-foreground truncate">{slide.subtitle}</div>
                  </div>
                </button>
              ))}
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
          </div>
        </div>

        {/* Right 4 Cols: Vlog Playlist */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <h3 className="font-extrabold text-base text-foreground flex items-center gap-2">
              <Video className="w-4 h-4 text-primary" />
              <span>EduTen Video Episodes</span>
            </h3>
            <span className="text-xs font-bold text-muted-foreground">
              {VLOG_EPISODES.length} Tours
            </span>
          </div>

          <div className="space-y-3">
            {VLOG_EPISODES.map((ep) => {
              const isSelected = activeEpisode.id === ep.id;
              return (
                <div
                  key={ep.id}
                  onClick={() => handleSelectEpisode(ep)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                    isSelected
                      ? 'bg-primary/5 border-primary shadow-md ring-1 ring-primary/30'
                      : 'bg-card border-border hover:border-primary/40 hover:bg-muted/30'
                  }`}
                >
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-border">
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
