'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { CURRENT_TUTOR } from '@/lib/mock-data';
import { MathRenderer } from '@/components/math-renderer';
import { RoleAccessGuard } from '@/components/role-access-guard';
import { Board, RecordedVideoItem } from '@/lib/types';
import {
  UserCheck,
  Video,
  Calendar,
  Clock,
  HelpCircle,
  Star,
  DollarSign,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Plus,
  Send,
  Film,
  Play,
  Download,
  Trash2,
  Sparkles,
  Eye,
  ThumbsUp,
  X,
  UploadCloud,
  BookOpen,
  Zap,
  HardDrive,
  FolderUp,
  FileVideo,
  Link2,
  ExternalLink,
  Check,
} from 'lucide-react';

// Helper to convert any URL (Direct MP4, Google Drive, YouTube) into streamable/embeddable format
function getEmbeddableVideo(url: string): { type: 'iframe' | 'video'; src: string } {
  if (!url) return { type: 'video', src: '' };

  // Google Drive URLs
  if (url.includes('drive.google.com')) {
    const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return {
        type: 'iframe',
        src: `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`,
      };
    }
  }

  // YouTube URLs
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1]?.split('&')[0] || '';
    }
    if (videoId) {
      return {
        type: 'iframe',
        src: `https://www.youtube.com/embed/${videoId}?autoplay=1`,
      };
    }
  }

  return { type: 'video', src: url };
}

export default function TutorDashboardPage() {
  const {
    currentUser,
    bookings,
    doubts,
    addDoubtReply,
    recordedVideos,
    addRecordedVideo,
    deleteRecordedVideo,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'schedule' | 'doubts' | 'recordings' | 'availability'>('schedule');
  const [quickReplyText, setQuickReplyText] = useState<Record<string, string>>({});

  // Recorded Video States
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [activeVideoPlayer, setActiveVideoPlayer] = useState<RecordedVideoItem | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [tutorToast, setTutorToast] = useState<string | null>(null);

  // Video Source Upload Type: 'computer' | 'drive' | 'url'
  const [videoSourceType, setVideoSourceType] = useState<'computer' | 'drive' | 'url'>('computer');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [uploadedFileSize, setUploadedFileSize] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [googleDriveUrl, setGoogleDriveUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Add Video Form State
  const activeTutorName = currentUser?.name || CURRENT_TUTOR.name;
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoSubject, setNewVideoSubject] = useState('Science: Physics');
  const [newVideoCategory, setNewVideoCategory] = useState('Science');
  const [newVideoBoard, setNewVideoBoard] = useState<Board>('CBSE');
  const [newVideoMentorRole, setNewVideoMentorRole] = useState('Senior Physics Faculty (IIT Delhi)');
  const [newVideoUrl, setNewVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
  const [newVideoThumbnail, setNewVideoThumbnail] = useState('/concepts/physics_optics_3d.jpg');
  const [newVideoDuration, setNewVideoDuration] = useState('55:00 mins');
  const [newVideoDesc, setNewVideoDesc] = useState('');
  const [newVideoTopics, setNewVideoTopics] = useState('');
  const [newVideoPdfNotes, setNewVideoPdfNotes] = useState('/resources/physics-optics-notes.pdf');

  const tutorProfile = currentUser?.tutorProfile || CURRENT_TUTOR.tutorProfile!;
  const upcomingBookings = bookings.filter((b) => b.status === 'CONFIRMED');
  const openDoubts = doubts.filter((d) => d.status === 'OPEN' || d.status === 'ANSWERED');

  const handleSendReply = (doubtId: string) => {
    const text = quickReplyText[doubtId];
    if (!text || !text.trim()) return;

    addDoubtReply(doubtId, {
      doubtId,
      authorId: currentUser?.id || CURRENT_TUTOR.id,
      authorName: activeTutorName,
      authorRole: 'TUTOR',
      authorAvatar: currentUser?.avatar || CURRENT_TUTOR.avatar,
      content: text,
      isAccepted: false,
      isTutorVerified: true,
    });

    setQuickReplyText((prev) => ({ ...prev, [doubtId]: '' }));
    setTutorToast('Verified solution posted to doubt forum!');
    setTimeout(() => setTutorToast(null), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    setUploadedFileSize(`${sizeMb} MB`);
    setIsUploading(true);
    setUploadProgress(0);

    // Auto-create local object URL for preview and playback
    const objectUrl = URL.createObjectURL(file);
    setNewVideoUrl(objectUrl);

    // Auto-fill title if empty
    if (!newVideoTitle) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setNewVideoTitle(cleanName);
    }

    if (!newVideoDuration || newVideoDuration === '55:00 mins') {
      setNewVideoDuration('48:30 mins');
    }

    // Fast simulated upload progress
    let p = 0;
    const timer = setInterval(() => {
      p += 25;
      setUploadProgress(p);
      if (p >= 100) {
        clearInterval(timer);
        setIsUploading(false);
      }
    }, 120);
  };

  const handleGoogleDriveInput = (val: string) => {
    setGoogleDriveUrl(val);
    setNewVideoUrl(val);
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoTitle.trim()) return;

    const topicsArray = newVideoTopics
      ? newVideoTopics.split(',').map((t) => t.trim()).filter(Boolean)
      : ['Interactive Whiteboard Derivation', 'Class 10 Board PYQ Numericals', 'Formula Summary'];

    addRecordedVideo({
      title: newVideoTitle.trim(),
      subjectName: newVideoSubject,
      subjectCategory: newVideoCategory,
      board: newVideoBoard,
      mentorName: activeTutorName,
      mentorRole: newVideoMentorRole,
      mentorAvatar: currentUser?.avatar || CURRENT_TUTOR.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      thumbnail: newVideoThumbnail,
      videoUrl: newVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      duration: newVideoDuration || '50:00 mins',
      description: newVideoDesc || 'Complete high-definition recorded masterclass with step-by-step whiteboard derivations and board exam question solving.',
      keyTopics: topicsArray,
      pdfNotesUrl: newVideoPdfNotes || '/resources/physics-optics-notes.pdf',
      isPopular: true,
    });

    setShowAddVideoModal(false);
    setNewVideoTitle('');
    setNewVideoDesc('');
    setNewVideoTopics('');
    setUploadedFileName('');
    setGoogleDriveUrl('');

    setTutorToast('🎉 Recorded video masterclass published to student portal!');
    setTimeout(() => setTutorToast(null), 4000);
  };

  return (
    <RoleAccessGuard allowedRoles={['TUTOR']} pageTitle="Faculty & Tutor Portal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Toast Notification */}
        {tutorToast && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span>{tutorToast}</span>
          </div>
        )}

        {/* Tutor Profile Header */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <img
                src={currentUser?.avatar || CURRENT_TUTOR.avatar}
                alt={activeTutorName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400/50"
              />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{activeTutorName}</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1 border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Senior Mentor
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-indigo-200">{tutorProfile.headline}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-white/80 pt-1">
                  <span className="flex items-center gap-1 text-amber-300 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-300" /> {tutorProfile.rating} ({tutorProfile.reviewCount} reviews)
                  </span>
                  <span>•</span>
                  <span>₹{tutorProfile.hourlyRate} / hour</span>
                  <span>•</span>
                  <span>{tutorProfile.qualifications}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur border border-white/15 text-center min-w-[110px]">
                <div className="text-xl font-extrabold text-amber-300">₹32,500</div>
                <div className="text-[11px] text-white/80">Monthly Earnings</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur border border-white/15 text-center min-w-[110px]">
                <div className="text-xl font-extrabold text-emerald-300">48 hrs</div>
                <div className="text-[11px] text-white/80">Teaching Hours</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-border pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'schedule'
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Calendar className="w-4 h-4" /> Booked Sessions ({upcomingBookings.length})
          </button>

          <button
            onClick={() => setActiveTab('recordings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'recordings'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Film className="w-4 h-4" /> Recorded Video Masterclasses ({recordedVideos.length})
          </button>

          <button
            onClick={() => setActiveTab('doubts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'doubts'
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <HelpCircle className="w-4 h-4" /> Doubt Clearance Queue ({openDoubts.length})
          </button>

          <button
            onClick={() => setActiveTab('availability')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'availability'
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Clock className="w-4 h-4" /> Weekly Availability
          </button>
        </div>

        {/* ========================================================================= */}
        {/* Tab 1: Booked Live Sessions                                              */}
        {/* ========================================================================= */}
        {activeTab === 'schedule' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Upcoming Student Classes</h2>
              <span className="text-xs text-muted-foreground">Synchronized with Student Calendars</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingBookings.map((session) => (
                <div
                  key={session.id}
                  className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                        {session.subjectName}
                      </span>
                      {session.isLiveNow ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white animate-pulse">
                          READY TO START
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground font-medium">
                          {session.durationMinutes} Mins Session
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-base text-foreground">{session.topic}</h3>
                    <div className="text-xs text-muted-foreground">
                      Student: <span className="font-semibold text-foreground">{session.studentName}</span>
                    </div>
                    {session.notes && (
                      <div className="p-2.5 rounded-xl bg-muted/40 text-xs text-muted-foreground">
                        📝 Student Note: {session.notes}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-border flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Payout: ₹{tutorProfile.hourlyRate}
                    </span>
                    <Link
                      href={session.meetingUrl || '/classroom/session-live-101'}
                      className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-1.5 hover:bg-primary/90 transition-all shadow-sm"
                    >
                      <Video className="w-3.5 h-3.5" /> Start Live Classroom &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* Tab 2: RECORDED VIDEO MASTERCLASSES (TUTOR PUBLISHING & MANAGEMENT)      */}
        {/* ========================================================================= */}
        {activeTab === 'recordings' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
              <div>
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Film className="w-5 h-5 text-sky-500" />
                  Your Published Recorded Masterclasses
                </h2>
                <p className="text-xs text-muted-foreground">
                  Upload recorded whiteboard lectures, formula derivations, and chapter solution sets for Class 10 students.
                </p>
              </div>

              {/* + Add Recorded Video Button (Tutor Only) */}
              <button
                onClick={() => setShowAddVideoModal(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-sky-500/25 transition-all self-start sm:self-auto hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Recorded Video</span>
              </button>
            </div>

            {/* Recorded Videos List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recordedVideos.map((video) => (
                <div
                  key={video.id}
                  className="rounded-3xl border border-border bg-card overflow-hidden hover:border-sky-500/40 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    {/* Video Thumbnail */}
                    <div
                      className="relative h-44 overflow-hidden bg-slate-950 cursor-pointer group"
                      onClick={() => setActiveVideoPlayer(video)}
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-sky-500/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/40">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                      </div>

                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur text-[10px] font-black uppercase text-white border border-white/20">
                          {video.board} 10th
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-sky-500/80 backdrop-blur text-[10px] font-bold text-white">
                          {video.subjectName}
                        </span>
                      </div>

                      <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur text-white text-[11px] font-bold">
                        <Clock className="w-3 h-3 text-sky-400" />
                        <span>{video.duration}</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5 space-y-3">
                      <h3
                        onClick={() => setActiveVideoPlayer(video)}
                        className="font-bold text-sm text-foreground hover:text-sky-500 transition-colors cursor-pointer line-clamp-2"
                      >
                        {video.title}
                      </h3>

                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {video.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {video.keyTopics.slice(0, 2).map((t, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-[10px] font-medium border border-border"
                          >
                            ✓ {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" /> {video.viewsCount} Views
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3.5 h-3.5 text-rose-500" /> {video.likesCount} Likes
                        </span>
                        <span className="text-[10px]">{video.recordedDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0 flex items-center gap-2">
                    <button
                      onClick={() => setActiveVideoPlayer(video)}
                      className="flex-1 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Preview Recording</span>
                    </button>

                    <button
                      onClick={() => {
                        deleteRecordedVideo(video.id);
                        setTutorToast('Recording deleted from library.');
                        setTimeout(() => setTutorToast(null), 3000);
                      }}
                      className="p-2 rounded-xl border border-border hover:bg-rose-500/10 hover:text-rose-500 text-muted-foreground text-xs transition-colors"
                      title="Delete Video"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* Tab 3: Doubt Clearance Queue                                             */}
        {/* ========================================================================= */}
        {activeTab === 'doubts' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Unresolved Student Doubts</h2>
              <span className="text-xs text-muted-foreground">Answered doubts earn +25 Faculty Scholar points</span>
            </div>

            <div className="space-y-4">
              {openDoubts.map((doubt) => (
                <div
                  key={doubt.id}
                  className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                        {doubt.subjectName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Asked by {doubt.studentName} ({doubt.studentBoard})
                      </span>
                    </div>
                    <span className="text-xs font-bold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-md">
                      {doubt.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-foreground text-sm">
                    <MathRenderer math={doubt.title} />
                  </h3>
                  <p className="text-xs text-muted-foreground">{doubt.content}</p>

                  {/* Quick reply box */}
                  <div className="pt-2 border-t border-border space-y-2">
                    <label className="text-xs font-semibold text-foreground">
                      Write Verified Solution (supports LaTeX formulas e.g. <MathRenderer math="\frac{1}{f} = \frac{1}{v} + \frac{1}{u}" />):
                    </label>
                    <textarea
                      rows={3}
                      value={quickReplyText[doubt.id] || ''}
                      onChange={(e) =>
                        setQuickReplyText((prev) => ({ ...prev, [doubt.id]: e.target.value }))
                      }
                      placeholder="Provide step-by-step proof or explanation..."
                      className="w-full p-3 rounded-xl border border-border bg-muted/30 text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                    />
                    <div className="flex justify-between items-center">
                      <Link
                        href={`/doubts/${doubt.id}`}
                        className="text-xs text-primary font-semibold hover:underline"
                      >
                        View full thread & replies &rarr;
                      </Link>
                      <button
                        onClick={() => handleSendReply(doubt.id)}
                        className="px-4 py-2 rounded-xl bg-primary text-white font-semibold text-xs flex items-center gap-1.5 hover:bg-primary/90 transition-all shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5" /> Post Verified Solution
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* Tab 4: Weekly Availability                                               */}
        {/* ========================================================================= */}
        {activeTab === 'availability' && (
          <div className="p-6 rounded-2xl border border-border bg-card space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">Active Hourly Availability Slots</h2>
                <p className="text-xs text-muted-foreground">Students can book 1-on-1 sessions during these open windows.</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add Slot
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tutorProfile.availabilitySlots.map((slot, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-border bg-muted/30 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="font-semibold text-xs text-foreground">{slot}</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: ADD RECORDED VIDEO MASTERCLASS (COMPUTER, GOOGLE DRIVE & URL)      */}
        {/* ========================================================================= */}
        {showAddVideoModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
            <div className="w-full max-w-2xl bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500 border border-sky-500/20">
                    <Film className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-foreground">
                      Publish Recorded Video Masterclass
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Upload video from your computer, link Google Drive, or connect a cloud stream for Class 10 students.
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

              <form onSubmit={handleAddVideo} className="space-y-4 text-xs overflow-y-auto pr-1 flex-1">
                {/* 1. Video Source Mode Selector (Computer vs Google Drive vs Direct URL) */}
                <div className="space-y-2">
                  <label className="font-bold text-foreground flex items-center gap-1.5">
                    <UploadCloud className="w-4 h-4 text-sky-500" />
                    Select Video Upload Method:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setVideoSourceType('computer')}
                      className={`p-3 rounded-2xl border text-left flex flex-col items-center justify-center gap-1.5 transition-all ${
                        videoSourceType === 'computer'
                          ? 'border-sky-500 bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold shadow-sm'
                          : 'border-border bg-background hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      <HardDrive className="w-5 h-5" />
                      <span className="text-[11px]">From Computer</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVideoSourceType('drive')}
                      className={`p-3 rounded-2xl border text-left flex flex-col items-center justify-center gap-1.5 transition-all ${
                        videoSourceType === 'drive'
                          ? 'border-sky-500 bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold shadow-sm'
                          : 'border-border bg-background hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      <FolderUp className="w-5 h-5" />
                      <span className="text-[11px]">Google Drive</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVideoSourceType('url')}
                      className={`p-3 rounded-2xl border text-left flex flex-col items-center justify-center gap-1.5 transition-all ${
                        videoSourceType === 'url'
                          ? 'border-sky-500 bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold shadow-sm'
                          : 'border-border bg-background hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      <Link2 className="w-5 h-5" />
                      <span className="text-[11px]">Stream URL</span>
                    </button>
                  </div>
                </div>

                {/* Option A: Computer File Upload Box */}
                {videoSourceType === 'computer' && (
                  <div className="p-4 rounded-2xl border-2 border-dashed border-sky-500/40 bg-sky-500/5 space-y-3 text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime,video/mkv,.mp4,.webm,.mov,.mkv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    <div className="w-12 h-12 mx-auto rounded-2xl bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                      <FileVideo className="w-6 h-6" />
                    </div>

                    {uploadedFileName ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2 text-foreground font-bold text-xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>{uploadedFileName}</span>
                          <span className="px-2 py-0.5 rounded bg-muted text-[10px] text-muted-foreground">
                            {uploadedFileSize}
                          </span>
                        </div>

                        {isUploading ? (
                          <div className="space-y-1">
                            <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full bg-sky-500 transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-muted-foreground">
                              Processing video from computer... {uploadProgress}%
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-3">
                            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                              ✓ Local Video Ready to Stream & Publish
                            </span>
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="text-xs text-sky-600 hover:underline font-bold"
                            >
                              Choose Different File
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="font-bold text-foreground text-xs">
                          Select high-definition video from your computer
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          Supports MP4, WebM, QuickTime MOV up to 2GB
                        </p>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-2"
                        >
                          <HardDrive className="w-4 h-4" />
                          <span>Browse Files on Computer</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Option B: Google Drive Link Box */}
                {videoSourceType === 'drive' && (
                  <div className="p-4 rounded-2xl border border-sky-500/30 bg-sky-500/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-foreground flex items-center gap-1.5">
                        <FolderUp className="w-4 h-4 text-amber-500" />
                        Google Drive Video Shareable Link *
                      </label>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                        Auto-Converts to Stream Player
                      </span>
                    </div>

                    <input
                      type="url"
                      placeholder="https://drive.google.com/file/d/1A2B3C4D5E.../view?usp=sharing"
                      value={googleDriveUrl}
                      onChange={(e) => handleGoogleDriveInput(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-muted-foreground bg-background p-2.5 rounded-xl border border-border">
                      <span>💡 <strong>Tip:</strong> In Google Drive, click <em>Share &rarr; Anyone with the link</em>.</span>
                      <button
                        type="button"
                        onClick={() => {
                          const sampleDrive = 'https://drive.google.com/file/d/1B2C3D4E5F6G7H8I9J0K/view?usp=sharing';
                          handleGoogleDriveInput(sampleDrive);
                        }}
                        className="text-sky-600 hover:underline font-bold shrink-0"
                      >
                        Paste Sample Drive URL
                      </button>
                    </div>
                  </div>
                )}

                {/* Option C: Direct Stream URL */}
                {videoSourceType === 'url' && (
                  <div className="space-y-1.5">
                    <label className="font-bold text-foreground">Direct Video Stream URL (MP4 / WebM / Cloud)</label>
                    <input
                      type="url"
                      required
                      placeholder="https://commondatastorage.googleapis.com/.../video.mp4"
                      value={newVideoUrl}
                      onChange={(e) => setNewVideoUrl(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                    />
                  </div>
                )}

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

                {/* Mentor Info */}
                <div className="p-3 rounded-2xl bg-muted/40 border border-border flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={currentUser?.avatar || CURRENT_TUTOR.avatar}
                      alt={activeTutorName}
                      className="w-8 h-8 rounded-full object-cover border border-sky-400"
                    />
                    <div>
                      <div className="font-bold text-foreground">{activeTutorName}</div>
                      <div className="text-[10px] text-muted-foreground">{newVideoMentorRole}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    Verified Faculty
                  </span>
                </div>

                {/* Duration & Thumbnail Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-foreground">Video Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. 55:00 mins"
                      value={newVideoDuration}
                      onChange={(e) => setNewVideoDuration(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-foreground">3D Concept Thumbnail</label>
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
                    <span>Publish Masterclass</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: INTERACTIVE VIDEO PLAYER PREVIEW (SUPPORTS DIRECT MP4 & GOOGLE DRIVE)*/}
        {/* ========================================================================= */}
        {activeVideoPlayer && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
            <div className="w-full max-w-4xl bg-card border border-border rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 my-6 max-h-[92vh] flex flex-col">
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

              {/* Video Player Display (Adaptive: iframe for Google Drive / YouTube, video tag for Direct MP4/Blob) */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 shrink-0">
                {(() => {
                  const media = getEmbeddableVideo(activeVideoPlayer.videoUrl);
                  if (media.type === 'iframe') {
                    return (
                      <iframe
                        src={media.src}
                        className="w-full h-full border-0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    );
                  }
                  return (
                    <video
                      ref={(el) => {
                        if (el) el.playbackRate = playbackSpeed;
                      }}
                      src={media.src}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  );
                })()}
              </div>

              <div className="space-y-4 overflow-y-auto pr-1 flex-1 text-xs">
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
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Eye className="w-3.5 h-3.5" /> {activeVideoPlayer.viewsCount} Views
                    </span>
                    <span className="flex items-center gap-1 text-rose-500 font-bold">
                      <ThumbsUp className="w-3.5 h-3.5" /> {activeVideoPlayer.likesCount} Likes
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-foreground flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-sky-500" /> Key Topics & Derivations Covered:
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
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleAccessGuard>
  );
}
