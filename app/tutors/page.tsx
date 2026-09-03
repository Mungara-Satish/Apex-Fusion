'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { SAMPLE_TUTORS, SAMPLE_LIVE_SESSIONS, SUBJECTS, CURRENT_STUDENT } from '@/lib/mock-data';
import { TutorProfile, LiveClassSession, Board } from '@/lib/types';
import {
  Users,
  Star,
  ShieldCheck,
  Calendar,
  Clock,
  CheckCircle2,
  Filter,
  X,
  Sparkles,
  ArrowRight,
  Radio,
  Video,
  Zap,
  BookOpen,
  Award,
  Crown,
  Check,
  AlertCircle,
  Sun,
  Sunset,
  Moon,
  Sunrise,
  Play,
  Plus,
  Film,
  Download,
  Share2,
  ThumbsUp,
  Eye,
  FileText,
  Volume2,
  Maximize2,
  RotateCcw,
  UploadCloud,
  CheckCheck,
} from 'lucide-react';

export interface RecordedVideoItem {
  id: string;
  title: string;
  subjectName: string;
  subjectCategory: string;
  board: Board;
  mentorName: string;
  mentorRole: string;
  mentorAvatar: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  recordedDate: string;
  viewsCount: number;
  likesCount: number;
  description: string;
  keyTopics: string[];
  pdfNotesUrl?: string;
  isPopular?: boolean;
}

const INITIAL_RECORDED_VIDEOS: RecordedVideoItem[] = [
  {
    id: 'rec-1',
    title: 'Light: Ray Optics, Sign Conventions & 5-Mark Mirror Formula Proofs',
    subjectName: 'Science: Physics',
    subjectCategory: 'Science',
    board: 'CBSE',
    mentorName: 'Dr. Priya Raman',
    mentorRole: 'Senior Physics Faculty (IIT Delhi)',
    mentorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    thumbnail: '/concepts/physics_optics_3d.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '58:30 mins',
    recordedDate: '2nd Sep 2026',
    viewsCount: 1420,
    likesCount: 384,
    description: 'Complete interactive whiteboard breakdown of Cartesian sign conventions, focal length proofs, and magnification formulas with CBSE 2024-2025 PYQ numerical step-by-step solving.',
    keyTopics: ['Cartesian Sign Conventions for Mirrors', '1/f = 1/v + 1/u Derivation', 'Magnification m = -v/u', '3 Step Ray Diagram Rules'],
    pdfNotesUrl: '/resources/physics-optics-notes.pdf',
    isPopular: true,
  },
  {
    id: 'rec-2',
    title: 'Trigonometric Identities & 4-Mark Proofs (Selina & NCERT Exemplar)',
    subjectName: 'Mathematics',
    subjectCategory: 'Math',
    board: 'CBSE',
    mentorName: 'Prof. Rajesh Verma',
    mentorRole: '15+ Years Board Exam Master Faculty',
    mentorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    thumbnail: '/concepts/math_trig_3d.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '64:15 mins',
    recordedDate: '1st Sep 2026',
    viewsCount: 2180,
    likesCount: 612,
    description: 'Master the top 10 most frequently asked 4-mark Trigonometric Identity proofs in CBSE and ICSE exams, including LCM conversion shortcuts and conjugates.',
    keyTopics: ['sin²θ + cos²θ = 1 Applications', 'LHS to RHS Conjugate Multiplication', 'Height & Distance Double Angle Proofs'],
    pdfNotesUrl: '/resources/math-trig-formula-sheet.pdf',
    isPopular: true,
  },
  {
    id: 'rec-3',
    title: 'Carbon and its Compounds: IUPAC Naming & Homologous Series',
    subjectName: 'Science: Chemistry',
    subjectCategory: 'Science',
    board: 'CBSE',
    mentorName: 'Dr. Priya Raman',
    mentorRole: 'Senior Chemistry Mentor',
    mentorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    thumbnail: '/concepts/chem_molecules_3d.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '52:00 mins',
    recordedDate: '30th Aug 2026',
    viewsCount: 980,
    likesCount: 245,
    description: 'Structural isomerism of Pentane and Hexane, functional group identification (Aldehydes, Ketones, Carboxylic acids), and Saponification reaction mechanisms.',
    keyTopics: ['Tetravalency & Catenation', 'IUPAC Naming Rules', 'Esterification vs Saponification'],
    pdfNotesUrl: '/resources/chem-carbon-reactions.pdf',
  },
  {
    id: 'rec-4',
    title: 'Life Processes: Double Circulation & Nephron Filtration Architecture',
    subjectName: 'Science: Biology',
    subjectCategory: 'Science',
    board: 'CBSE',
    mentorName: 'Dr. Ananya Mukherjee',
    mentorRole: 'Biology Lead Mentor (Ex-AIIMS Researcher)',
    mentorAvatar: 'https://images.unsplash.com/photo-1594824813511-78c7b8971f4b?w=150&auto=format&fit=crop&q=80',
    thumbnail: '/concepts/bio_heart_3d.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '47:45 mins',
    recordedDate: '28th Aug 2026',
    viewsCount: 1650,
    likesCount: 420,
    description: 'High-scoring 5-mark board exam diagram techniques: Drawing human heart internal valves and Bowman capsule filtration pathways with precision.',
    keyTopics: ['Systemic vs Pulmonary Circulation', 'Nephron Ultrafiltration & Reabsorption', 'Respiration ATP Energy Balance'],
    pdfNotesUrl: '/resources/bio-life-processes.pdf',
    isPopular: true,
  },
  {
    id: 'rec-5',
    title: 'State Board Physical Science: Chemical Reactions & Speed Equation Balancing',
    subjectName: 'Physical Science',
    subjectCategory: 'Science',
    board: 'STATE',
    mentorName: 'Suresh Babu M.Sc.',
    mentorRole: '12+ Years State Board Faculty',
    mentorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    thumbnail: '/concepts/chem_acids_metal_3d.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: '50:30 mins',
    recordedDate: '25th Aug 2026',
    viewsCount: 890,
    likesCount: 195,
    description: 'Algebraic method for quick chemical equation balancing, displacement series reactivity tricks, and redox identification for State Board candidates.',
    keyTopics: ['Algebraic Balancing Method', 'Exothermic vs Endothermic Graphs', 'Redox Reactions'],
    pdfNotesUrl: '/resources/state-ps-reactions.pdf',
  },
  {
    id: 'rec-6',
    title: 'Social Science: Nationalism in India — Map Pointing & 5-Mark Analysis',
    subjectName: 'Social Studies: History',
    subjectCategory: 'Social Studies',
    board: 'CBSE',
    mentorName: 'Vikram Sengupta M.A.',
    mentorRole: 'Senior Humanities Educator',
    mentorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    thumbnail: '/concepts/sst_history_geo_3d.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    duration: '45:10 mins',
    recordedDate: '22nd Aug 2026',
    viewsCount: 1120,
    likesCount: 310,
    description: 'Chronological roadmap of Non-Cooperation Movement, Civil Disobedience, Salt Satyagraha, and essential board map locations (Champaran, Kheda, Dandi, Amritsar).',
    keyTopics: ['Non-Cooperation Movement Stages', 'Poona Pact 1932', 'Compulsory Board Map Items'],
    pdfNotesUrl: '/resources/sst-nationalism-maps.pdf',
  },
];

export default function TutorsPage() {
  const {
    currentRole,
    currentUser,
    addBooking,
    currentBoard,
    hasActiveSubscription,
    activePassName,
    setSubscription,
    enrolledLiveSessionIds,
    enrollInLiveSession,
    recordedVideos,
    addRecordedVideo,
  } = useAppStore();

  const isTutorOrAdmin = currentRole === 'TUTOR' || currentRole === 'ADMIN';

  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedTiming, setSelectedTiming] = useState<string>('ALL');
  const [bookingModalTutor, setBookingModalTutor] = useState<TutorProfile | null>(null);

  // Modal form state for 1-on-1 booking
  const [bookingTopic, setBookingTopic] = useState<string>('');
  const [bookingSubjectId, setBookingSubjectId] = useState<string>(SUBJECTS[0].id);
  const [bookingSlot, setBookingSlot] = useState<string>('');
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [enrollToast, setEnrollToast] = useState<string | null>(null);

  // --- RECORDED VIDEOS STATE ---
  const [selectedVideoSubject, setSelectedVideoSubject] = useState<string>('ALL');
  const [selectedVideoBoard, setSelectedVideoBoard] = useState<string>('ALL');
  const [showAddVideoModal, setShowAddVideoModal] = useState<boolean>(false);
  const [activeVideoPlayer, setActiveVideoPlayer] = useState<RecordedVideoItem | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [likedVideoIds, setLikedVideoIds] = useState<Record<string, boolean>>({});

  // Add Video Form State
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoSubject, setNewVideoSubject] = useState('Science: Physics');
  const [newVideoCategory, setNewVideoCategory] = useState('Science');
  const [newVideoBoard, setNewVideoBoard] = useState<Board>(currentBoard || 'CBSE');
  const [newVideoMentor, setNewVideoMentor] = useState('Dr. Priya Raman');
  const [newVideoMentorRole, setNewVideoMentorRole] = useState('Senior Physics Faculty');
  const [newVideoUrl, setNewVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
  const [newVideoThumbnail, setNewVideoThumbnail] = useState('/concepts/physics_optics_3d.jpg');
  const [newVideoDuration, setNewVideoDuration] = useState('55:00 mins');
  const [newVideoDesc, setNewVideoDesc] = useState('');
  const [newVideoTopics, setNewVideoTopics] = useState('');
  const [newVideoPdfNotes, setNewVideoPdfNotes] = useState('');

  // Filter Live Sessions
  const filteredLiveSessions = SAMPLE_LIVE_SESSIONS.filter((session) => {
    const matchesSubject =
      selectedSubject === 'ALL' ||
      session.subjectName.toLowerCase().includes(selectedSubject.toLowerCase()) ||
      session.topic.toLowerCase().includes(selectedSubject.toLowerCase());

    const matchesTiming =
      selectedTiming === 'ALL' || session.timingCategory === selectedTiming;

    return matchesSubject && matchesTiming;
  });

  // Filter 1-on-1 Tutors
  const filteredTutors =
    selectedSubject === 'ALL'
      ? SAMPLE_TUTORS
      : SAMPLE_TUTORS.filter((t) =>
          t.subjectsTaught.some((s) => s.toLowerCase().includes(selectedSubject.toLowerCase()))
        );

  // Filter Recorded Videos
  const filteredRecordedVideos = recordedVideos.filter((v) => {
    const matchesSub =
      selectedVideoSubject === 'ALL' ||
      v.subjectCategory.toLowerCase() === selectedVideoSubject.toLowerCase() ||
      v.subjectName.toLowerCase().includes(selectedVideoSubject.toLowerCase());

    const matchesBoard =
      selectedVideoBoard === 'ALL' || v.board === selectedVideoBoard;

    return matchesSub && matchesBoard;
  });

  const handleOpenBooking = (tutor: TutorProfile) => {
    setBookingModalTutor(tutor);
    setBookingSlot(tutor.availabilitySlots[0] || 'Today 5:00 PM - 6:00 PM');
    setBookingSuccess(false);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingModalTutor || !bookingTopic) return;

    const sub = SUBJECTS.find((s) => s.id === bookingSubjectId);

    addBooking({
      studentId: CURRENT_STUDENT.id,
      studentName: CURRENT_STUDENT.name,
      tutorId: bookingModalTutor.userId,
      tutorName: bookingModalTutor.name,
      tutorAvatar: bookingModalTutor.avatar,
      subjectId: bookingSubjectId,
      subjectName: sub?.name || 'Science',
      topic: bookingTopic,
      scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
      durationMinutes: 60,
      status: 'CONFIRMED',
      meetingUrl: '/classroom/session-live-101',
      notes: bookingNotes,
      isLiveNow: true,
      isFreeWithSubscription: hasActiveSubscription,
    });

    setBookingSuccess(true);
  };

  const handleInstantLiveEnroll = (session: LiveClassSession) => {
    enrollInLiveSession(session.id);
    setEnrollToast(`Seat Reserved for "${session.title}" (100% Free with Active Subscription)!`);
    setTimeout(() => setEnrollToast(null), 4000);
  };

  const handleToggleLike = (videoId: string) => {
    const isLiked = likedVideoIds[videoId];
    setLikedVideoIds((prev) => ({ ...prev, [videoId]: !isLiked }));
  };

  const handleAddRecordedVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoTitle.trim()) return;

    const topicsArray = newVideoTopics
      ? newVideoTopics.split(',').map((t) => t.trim()).filter(Boolean)
      : ['Comprehensive Chapter Walkthrough', 'Board Exam PYQ Solving', 'Formula Application'];

    addRecordedVideo({
      title: newVideoTitle.trim(),
      subjectName: newVideoSubject,
      subjectCategory: newVideoCategory,
      board: newVideoBoard,
      mentorName: newVideoMentor,
      mentorRole: newVideoMentorRole,
      mentorAvatar:
        newVideoMentor.includes('Priya')
          ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
          : newVideoMentor.includes('Rajesh')
          ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
          : currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      thumbnail: newVideoThumbnail,
      videoUrl: newVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      duration: newVideoDuration || '45:00 mins',
      description: newVideoDesc || 'Complete high-definition recorded masterclass with step-by-step whiteboard derivations and board exam question solving.',
      keyTopics: topicsArray,
      pdfNotesUrl: newVideoPdfNotes || '/resources/physics-optics-notes.pdf',
      isPopular: true,
    });

    setShowAddVideoModal(false);

    // Reset Form
    setNewVideoTitle('');
    setNewVideoDesc('');
    setNewVideoTopics('');

    setEnrollToast(`🎉 Recorded video "${newVideoTitle.trim()}" successfully published to Masterclass Vault!`);
    setTimeout(() => setEnrollToast(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Toast Notification */}
      {enrollToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span>{enrollToast}</span>
        </div>
      )}

      {/* Subscription Privilege Banner */}
      <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 border border-purple-500/30 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 shrink-0">
            <Crown className="w-6 h-6 fill-slate-950" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-[11px] uppercase tracking-wider border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> All-Access Subscription Active
              </span>
              <span className="hidden sm:inline text-xs text-purple-200">• {activePassName}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              All Live Classes & Timings are 100% Free with Your Subscription
            </h2>
            <p className="text-xs text-purple-200/90 leading-relaxed max-w-2xl">
              As an enrolled subscription holder, you get unlimited free access (₹0 fee) to all morning, afternoon, evening, and night live whiteboard classes, recorded video masterclasses, and doubt clinics!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/pricing"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-colors"
          >
            Manage Passes
          </Link>
          <Link
            href="/classroom/session-live-101"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-rose-500/30 transition-all animate-pulse"
          >
            <Radio className="w-4 h-4" /> Enter Live Class &rarr;
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: RECORDED VIDEO MASTERCLASSES & VAULT (NEW FEATURE)            */}
      {/* ========================================================================= */}
      <div id="recorded-classes" className="space-y-6 pt-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
              <Film className="w-4 h-4" /> On-Demand Masterclass Library & Replays
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Recorded Video Lectures & Whiteboard Masterclasses
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Missed a live session? Stream full recorded masterclasses, formula derivations, and PYQ solving drills anytime.
            </p>
          </div>

          {/* + Add Recorded Video Button (Only visible for Tutors & Admins, removed for Students) */}
          {isTutorOrAdmin && (
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => setShowAddVideoModal(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-sky-500/25 transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Recorded Video</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter Pills for Recorded Videos */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-muted-foreground mr-1 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Subject:
            </span>
            {['ALL', 'Math', 'Science', 'Social Studies'].map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedVideoSubject(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedVideoSubject === sub
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {sub === 'ALL' ? 'All Subjects' : sub}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-muted-foreground mr-1 shrink-0">Board:</span>
            {['ALL', 'CBSE', 'ICSE', 'STATE'].map((b) => (
              <button
                key={b}
                onClick={() => setSelectedVideoBoard(b)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedVideoBoard === b
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {b === 'ALL' ? 'All Boards' : b}
              </button>
            ))}
          </div>
        </div>

        {/* Recorded Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecordedVideos.map((video) => (
            <div
              key={video.id}
              className="rounded-3xl border border-border bg-card overflow-hidden hover:border-sky-500/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Video Thumbnail & Play Button Overlay */}
                <div className="relative h-48 overflow-hidden bg-slate-950 cursor-pointer" onClick={() => setActiveVideoPlayer(video)}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-13 h-13 rounded-full bg-sky-500/90 text-white flex items-center justify-center shadow-lg shadow-sky-500/50 group-hover:scale-110 transition-transform duration-300 border-2 border-white/40">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur text-[10px] font-black uppercase text-white border border-white/20">
                      {video.board} 10th
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-sky-500/80 backdrop-blur text-[10px] font-bold text-white">
                      {video.subjectName}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/70 backdrop-blur text-white text-[11px] font-bold">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    <span>{video.duration}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-3">
                  <h3
                    onClick={() => setActiveVideoPlayer(video)}
                    className="font-bold text-base text-foreground leading-snug hover:text-sky-500 transition-colors cursor-pointer line-clamp-2"
                  >
                    {video.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {video.description}
                  </p>

                  {/* Key Topics Covered Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {video.keyTopics.slice(0, 2).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-[10px] font-medium border border-border"
                      >
                        ✓ {t}
                      </span>
                    ))}
                    {video.keyTopics.length > 2 && (
                      <span className="text-[10px] text-muted-foreground self-center font-bold">
                        +{video.keyTopics.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Mentor Info */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/60">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={video.mentorAvatar}
                        alt={video.mentorName}
                        className="w-8 h-8 rounded-full object-cover border border-sky-400/40"
                      />
                      <div className="text-xs">
                        <div className="font-bold text-foreground">{video.mentorName}</div>
                        <div className="text-[10px] text-muted-foreground">{video.mentorRole}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-muted-foreground" /> {video.viewsCount}
                      </span>
                      <button
                        onClick={() => handleToggleLike(video.id)}
                        className={`flex items-center gap-1 hover:text-rose-500 transition-colors ${
                          likedVideoIds[video.id] ? 'text-rose-500 font-bold' : ''
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" /> {video.likesCount}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <button
                  onClick={() => setActiveVideoPlayer(video)}
                  className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-sky-500/20 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Watch Recording</span>
                </button>

                {video.pdfNotesUrl && (
                  <button
                    onClick={() => {
                      setEnrollToast(`📥 PDF Formula Notes & Board Solutions downloaded for "${video.title}"`);
                      setTimeout(() => setEnrollToast(null), 3000);
                    }}
                    className="p-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground text-xs font-semibold transition-colors"
                    title="Download Lecture Notes PDF"
                  >
                    <Download className="w-4 h-4 text-sky-500" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: LIVE CLASSES TIMETABLE & SCHEDULE                              */}
      {/* ========================================================================= */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              <Radio className="w-4 h-4 animate-ping" /> Daily Live Classes & Masterclass Batches
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Live Classes Across Morning, Afternoon, Evening & Night Timings
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Choose the batch timing that fits your schedule. Free access unlocked with any subscription pass.
            </p>
          </div>

          {/* Timing Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {[
              { label: 'All Timings', value: 'ALL', icon: Clock },
              { label: 'Morning (7-12 AM)', value: 'MORNING', icon: Sunrise },
              { label: 'Afternoon (12-5 PM)', value: 'AFTERNOON', icon: Sun },
              { label: 'Evening (5-8 PM)', value: 'EVENING', icon: Sunset },
              { label: 'Night (8-10 PM)', value: 'NIGHT', icon: Moon },
            ].map((timing) => {
              const Icon = timing.icon;
              return (
                <button
                  key={timing.value}
                  onClick={() => setSelectedTiming(timing.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    selectedTiming === timing.value
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{timing.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLiveSessions.map((session) => {
            const isEnrolled = enrolledLiveSessionIds.includes(session.id);
            const isLive = session.status === 'LIVE_NOW';

            return (
              <div
                key={session.id}
                className={`rounded-3xl border bg-card transition-all duration-300 hover:shadow-xl flex flex-col justify-between overflow-hidden ${
                  isLive
                    ? 'border-rose-500/60 shadow-lg shadow-rose-500/10 ring-1 ring-rose-500/30'
                    : 'border-border'
                }`}
              >
                <div className="p-6 space-y-4">
                  {/* Top Status & Timing Row */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                      {session.subjectName}
                    </span>

                    {isLive ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black tracking-wider uppercase flex items-center gap-1.5 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" /> LIVE RIGHT NOW
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-bold">
                        Upcoming {session.timingCategory} Batch
                      </span>
                    )}
                  </div>

                  {/* Timing & Day Pill */}
                  <div className="p-3 rounded-2xl bg-muted/40 border border-border/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{session.timeLabel}</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground font-semibold">
                      {session.dayLabel}
                    </span>
                  </div>

                  {/* Title & Topic */}
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-foreground text-base leading-snug line-clamp-2">
                      {session.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      <span className="font-semibold text-foreground">Topic: </span>
                      {session.topic}
                    </p>
                  </div>

                  {/* Tutor Details */}
                  <div className="flex items-center gap-3 pt-2 border-t border-border/60">
                    <img
                      src={session.tutorAvatar}
                      alt={session.tutorName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary/40 shadow-xs"
                    />
                    <div className="text-xs space-y-0.5">
                      <div className="font-bold text-foreground flex items-center gap-1">
                        <span>{session.tutorName}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <div className="text-[11px] text-muted-foreground line-clamp-1">
                        {session.tutorHeadline}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>👥 {session.enrolledStudentsCount}/{session.maxCapacity} Students Enrolled</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Free with Pass</span>
                  </div>

                  {isLive ? (
                    <Link
                      href={session.meetingUrl}
                      className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-rose-600/25 transition-all"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Live Whiteboard Class (Free) &rarr;</span>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleInstantLiveEnroll(session)}
                        className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                          isEnrolled
                            ? 'bg-emerald-600 text-white'
                            : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
                        }`}
                      >
                        {isEnrolled ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Reserved (Free Pass)</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Reserve Free Seat</span>
                          </>
                        )}
                      </button>

                      <Link
                        href={session.meetingUrl}
                        className="px-3.5 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-xs font-semibold text-foreground transition-colors"
                        title="Enter Classroom Preview"
                      >
                        Preview
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: 1-ON-1 SPECIALIST TUTORS WITH CUSTOM TIMINGS                   */}
      {/* ========================================================================= */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> 1-on-1 Personal Whiteboard Mentorship
            </div>
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
              Verified IIT & 10th Board Specialist Tutors
            </h2>
            <p className="text-xs text-muted-foreground">
              Select your preferred time slot for 1-on-1 personalized doubt solving. Unlocked free with subscription.
            </p>
          </div>

          {/* Subject Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {['ALL', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'English'].map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedSubject === sub
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {sub === 'ALL' ? 'All Mentors' : sub}
              </button>
            ))}
          </div>
        </div>

        {/* Tutor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map((tutor) => (
            <div
              key={tutor.id}
              className="rounded-3xl border border-border bg-card p-6 shadow-sm hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Tutor Header */}
                <div className="flex items-start gap-4">
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/20 shadow-sm"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-base text-foreground">{tutor.name}</h3>
                      {tutor.verified && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-1 font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {tutor.rating}
                      </span>
                      <span className="text-muted-foreground">({tutor.reviewCount} reviews)</span>
                    </div>
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <span className="line-through text-muted-foreground font-normal">₹{tutor.hourlyRate}/hr</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 font-black text-[11px]">₹0 Free with Pass</span>
                    </div>
                  </div>
                </div>

                {/* Headline & Bio */}
                <div className="space-y-1">
                  <div className="text-xs font-bold text-foreground">{tutor.headline}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {tutor.bio}
                  </p>
                </div>

                {/* Qualifications */}
                <div className="p-3 rounded-2xl bg-muted/30 border border-border/70 text-xs space-y-1">
                  <div className="text-[11px] font-bold text-foreground flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-primary" /> Credentials:
                  </div>
                  <div className="text-muted-foreground text-[11px] leading-relaxed">
                    {tutor.qualifications}
                  </div>
                </div>

                {/* Subjects Taught */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Subjects Taught:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tutor.subjectsTaught.map((sub, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg bg-muted text-foreground text-[11px] font-medium border border-border"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Timing Slots */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Available Batch Timings:
                  </div>
                  <div className="space-y-1 text-xs">
                    {tutor.availabilitySlots.map((slot, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-1.5 rounded-xl bg-muted/20 text-muted-foreground text-[11px]"
                      >
                        <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{slot}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking CTA Button */}
              <button
                onClick={() => handleOpenBooking(tutor)}
                className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-primary/25"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book 1-on-1 Class (Free with Pass)</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: ADD RECORDED VIDEO MASTERCLASS MODAL                            */}
      {/* ========================================================================= */}
      {showAddVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-xl bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-border shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500 border border-sky-500/20">
                  <Film className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-foreground">
                    Add Recorded Video Lecture
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Link or upload on-demand whiteboard masterclass recordings for students.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAddVideoModal(false)}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRecordedVideo} className="space-y-4 text-xs overflow-y-auto pr-1 flex-1">
              {/* Video Title */}
              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Lecture / Masterclass Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ray Optics - Complete Mirror Formula & 5-Mark Numerical Proofs"
                  value={newVideoTitle}
                  onChange={(e) => setNewVideoTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Subject & Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Subject Name</label>
                  <select
                    value={newVideoSubject}
                    onChange={(e) => {
                      setNewVideoSubject(e.target.value);
                      if (e.target.value.includes('Math')) setNewVideoCategory('Math');
                      else if (e.target.value.includes('Social') || e.target.value.includes('History')) setNewVideoCategory('Social Studies');
                      else setNewVideoCategory('Science');
                    }}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Science: Physics">Science: Physics (Optics & Electricity)</option>
                    <option value="Science: Chemistry">Science: Chemistry (Carbon & Reactions)</option>
                    <option value="Science: Biology">Science: Biology (Life Processes & Genetics)</option>
                    <option value="Mathematics">Mathematics (Trig, Algebra & Geometry)</option>
                    <option value="Physical Science">State Board Physical Science</option>
                    <option value="Social Studies: History">Social Studies: History & Civics</option>
                    <option value="English Literature">English Language & Literature</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Target Board</label>
                  <select
                    value={newVideoBoard}
                    onChange={(e) => setNewVideoBoard(e.target.value as Board)}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="CBSE">CBSE Class 10</option>
                    <option value="ICSE">ICSE Class 10</option>
                    <option value="STATE">State Board Class 10</option>
                  </select>
                </div>
              </div>

              {/* Mentor Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Faculty / Mentor Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Priya Raman"
                    value={newVideoMentor}
                    onChange={(e) => setNewVideoMentor(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Mentor Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Physics Faculty (IIT Delhi)"
                    value={newVideoMentorRole}
                    onChange={(e) => setNewVideoMentorRole(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Video Stream URL & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-bold text-foreground">Video Stream URL (MP4 / WebM / Cloud)</label>
                  <input
                    type="url"
                    required
                    placeholder="https://.../lecture-video.mp4"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 55:00 mins"
                    value={newVideoDuration}
                    onChange={(e) => setNewVideoDuration(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* 3D Concept Thumbnail Preset */}
              <div className="space-y-1.5">
                <label className="font-bold text-foreground">3D Concept Artwork Thumbnail</label>
                <select
                  value={newVideoThumbnail}
                  onChange={(e) => setNewVideoThumbnail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="/concepts/physics_optics_3d.jpg">Physics: Ray Optics & Prisms (3D)</option>
                  <option value="/concepts/physics_elec_3d.jpg">Physics: Electric Circuits & Magnetic Coils (3D)</option>
                  <option value="/concepts/math_trig_3d.jpg">Math: Trigonometry & Heights (3D)</option>
                  <option value="/concepts/math_algebra_3d.jpg">Math: Quadratic & Algebraic Graphs (3D)</option>
                  <option value="/concepts/chem_molecules_3d.jpg">Chemistry: Carbon & Hydrocarbons (3D)</option>
                  <option value="/concepts/chem_acids_metal_3d.jpg">Chemistry: Acids & Metallurgy (3D)</option>
                  <option value="/concepts/bio_heart_3d.jpg">Biology: Human Heart & Nephron (3D)</option>
                  <option value="/concepts/bio_genetics_3d.jpg">Biology: DNA & Heredity (3D)</option>
                  <option value="/concepts/sst_history_geo_3d.jpg">Social Studies: History & Indian Soil Maps (3D)</option>
                  <option value="/concepts/eng_lit_3d.jpg">English: Prose & Grammar (3D)</option>
                </select>
              </div>

              {/* Key Topics */}
              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Key Topics Covered (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Mirror formula derivation, Cartesian sign rules, 5-Mark PYQ solving"
                  value={newVideoTopics}
                  onChange={(e) => setNewVideoTopics(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Masterclass Description</label>
                <textarea
                  rows={2}
                  placeholder="Write key takeaways, board exam marking schemes, and worked examples covered..."
                  value={newVideoDesc}
                  onChange={(e) => setNewVideoDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                />
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowAddVideoModal(false)}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-foreground text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-extrabold text-xs shadow-md shadow-sky-500/25 flex items-center gap-1.5 transition-all"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Publish Recorded Video</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: INTERACTIVE VIDEO PLAYER MODAL                                   */}
      {/* ========================================================================= */}
      {activeVideoPlayer && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-4xl bg-card border border-border rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 my-6 max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500">
                  <Play className="w-5 h-5 fill-sky-500" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-foreground line-clamp-1">
                    {activeVideoPlayer.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-bold text-sky-600 dark:text-sky-400">{activeVideoPlayer.board} 10th</span>
                    <span>•</span>
                    <span>Mentor: {activeVideoPlayer.mentorName}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {activeVideoPlayer.duration}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveVideoPlayer(null)}
                className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Box */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 shrink-0">
              <video
                ref={(el) => {
                  if (el) el.playbackRate = playbackSpeed;
                }}
                src={activeVideoPlayer.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            {/* Video Controls & Chapter Timestamps */}
            <div className="space-y-4 overflow-y-auto pr-1 flex-1 text-xs">
              {/* Playback Speed & Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-muted/40 border border-border">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground flex items-center gap-1 text-[11px]">
                    <Zap className="w-3.5 h-3.5 text-amber-500" /> Speed:
                  </span>
                  {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        playbackSpeed === spd
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'bg-background hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleLike(activeVideoPlayer.id)}
                    className={`px-3 py-1.5 rounded-xl border border-border hover:bg-muted flex items-center gap-1.5 transition-colors ${
                      likedVideoIds[activeVideoPlayer.id] ? 'bg-rose-500/10 text-rose-500 border-rose-500/30' : 'text-foreground'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span className="font-bold">{activeVideoPlayer.likesCount}</span>
                  </button>

                  {activeVideoPlayer.pdfNotesUrl && (
                    <button
                      onClick={() => {
                        setEnrollToast(`📥 Downloaded Lecture Formula PDF for "${activeVideoPlayer.title}"!`);
                        setTimeout(() => setEnrollToast(null), 3000);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF Notes</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Key Topics & Chapter Markers */}
              <div className="space-y-2">
                <h4 className="font-bold text-foreground flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-sky-500" /> Chapter Highlights & Topics Covered:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeVideoPlayer.keyTopics.map((topic, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-card border border-border flex items-center gap-2 text-foreground font-medium"
                    >
                      <span className="w-5 h-5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-black text-[10px] flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="line-clamp-1">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentor Contact Strip */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-500/5 via-primary/5 to-purple-500/5 border border-sky-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={activeVideoPlayer.mentorAvatar}
                    alt={activeVideoPlayer.mentorName}
                    className="w-12 h-12 rounded-2xl object-cover border border-sky-500/40"
                  />
                  <div>
                    <div className="font-bold text-foreground text-sm flex items-center gap-1">
                      {activeVideoPlayer.mentorName}
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <div className="text-xs text-muted-foreground">{activeVideoPlayer.mentorRole}</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const tutor = SAMPLE_TUTORS.find((t) => t.name?.includes(activeVideoPlayer.mentorName)) || SAMPLE_TUTORS[0];
                    setActiveVideoPlayer(null);
                    handleOpenBooking(tutor);
                  }}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book 1-on-1 Class with Mentor (₹0 Free)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: 1-ON-1 LIVE CLASS BOOKING MODAL                                  */}
      {/* ========================================================================= */}
      {bookingModalTutor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <img
                  src={bookingModalTutor.avatar}
                  alt={bookingModalTutor.name}
                  className="w-12 h-12 rounded-xl object-cover border border-primary/40"
                />
                <div>
                  <h3 className="text-base font-extrabold text-foreground">
                    Book Live Class with {bookingModalTutor.name}
                  </h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                    ✨ 100% Free Entry Unlocked (Active Subscription Pass)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setBookingModalTutor(null)}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-6 text-center space-y-4 animate-in zoom-in-95">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-foreground">Live Class Confirmed!</h4>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                    Your 1-on-1 session on &quot;{bookingTopic}&quot; is scheduled. Access link is active.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <Link
                    href="/classroom/session-live-101"
                    className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition-all flex items-center gap-1.5"
                  >
                    <span>Enter Live Classroom</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => setBookingModalTutor(null)}
                    className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-foreground"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Subject:</label>
                  <select
                    value={bookingSubjectId}
                    onChange={(e) => setBookingSubjectId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  >
                    {SUBJECTS.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name} (Grade 10 {currentBoard})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Topic / Doubt to Solve:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ray Optics sign conventions, Quadratic word problems"
                    value={bookingTopic}
                    onChange={(e) => setBookingTopic(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Select Batch Timing Slot:</label>
                  <select
                    value={bookingSlot}
                    onChange={(e) => setBookingSlot(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  >
                    {bookingModalTutor.availabilitySlots.map((slot, i) => (
                      <option key={i} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Student Notes / Question Context (Optional):</label>
                  <textarea
                    rows={2}
                    placeholder="Mention specific NCERT textbook exercises or previous year board questions..."
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span className="font-bold">Total Booking Fee:</span>
                  </div>
                  <div className="text-right">
                    <span className="line-through text-muted-foreground mr-1">₹{bookingModalTutor.hourlyRate}</span>
                    <span className="font-black text-sm text-emerald-600 dark:text-emerald-400">₹0 (Free Pass)</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setBookingModalTutor(null)}
                    className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-foreground text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-sm shadow-primary/25"
                  >
                    <span>Confirm Booking (₹0 Free)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
