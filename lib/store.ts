import { create } from 'zustand';
import { Role, Board, ChapterStatus, Booking, Doubt, DoubtReply, MockTest, StudyResource, User, InterestedCandidate, RecordedVideoItem } from './types';
import {
  CURRENT_STUDENT,
  CURRENT_TUTOR,
  SUBJECTS,
  CHAPTERS,
  SAMPLE_BOOKINGS,
  SAMPLE_DOUBTS,
  SAMPLE_MOCK_TESTS,
  SAMPLE_RESOURCES,
  SAMPLE_TUTORS,
  SAMPLE_DIRECTORY_USERS,
  SAMPLE_INTERESTED_CANDIDATES,
  SAMPLE_RECORDED_VIDEOS,
  BADGES,
  getChaptersForBoard,
} from './mock-data';

export interface ClassroomMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: Role;
  text: string;
  timestamp: string;
  isMathFormula?: boolean;
}

export const DEMO_USERS: Record<Role, User> = {
  STUDENT: CURRENT_STUDENT,
  PARENT: {
    id: 'user-parent-1',
    email: 'parent.sharma@eduten.org',
    name: 'Rajesh Sharma (Parent)',
    phone: '+91 98765 43210',
    role: 'PARENT',
    board: 'CBSE',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    streakCount: 7,
    points: 1240,
    studyHoursWeekly: 18.5,
    inviteCode: 'AARAV10TH',
    createdAt: '2025-06-15T09:00:00Z',
    parentProfile: {
      id: 'parent-prof-1',
      userId: 'user-parent-1',
      linkedStudentId: 'user-student-1',
      studentName: 'Aarav Sharma',
      studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      studentRollNumber: 'CBSE-2026-X-1048',
      studentSchool: 'Delhi Public School, R.K. Puram',
      studentBoard: 'CBSE',
      relationship: 'Father',
      notifyOnTestScore: true,
      notifyOnAttendance: true,
      whatsappAlerts: true,
      inviteCode: 'AARAV10TH',
    },
  },
  TUTOR: CURRENT_TUTOR,
  ADMIN: {
    id: 'user-admin-1',
    email: 'admin@eduten.org',
    name: 'Dr. Sanjay Gupta (Dean/Admin)',
    role: 'ADMIN',
    board: 'CBSE',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    streakCount: 120,
    points: 9999,
    studyHoursWeekly: 40.0,
    createdAt: '2024-01-01T00:00:00Z',
  },
};

interface AppState {
  // Auth State
  isLoggedIn: boolean;
  currentUser: User;
  currentRole: Role;
  currentBoard: Board;
  studentPoints: number;
  streakCount: number;

  // Subscription State
  hasActiveSubscription: boolean;
  activePassName: string;
  enrolledLiveSessionIds: string[];
  setSubscription: (active: boolean, passName?: string) => void;
  enrollInLiveSession: (sessionId: string) => void;

  loginAs: (role: Role, userOverrides?: Partial<User>) => void;
  logout: () => void;
  setRole: (role: Role) => void;
  setBoard: (board: Board) => void;
  incrementStreak: () => void;
  addPoints: (points: number) => void;

  // Syllabus & Chapters
  chapters: typeof CHAPTERS;
  updateChapterStatus: (chapterId: string, status: ChapterStatus) => void;

  // Bookings
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  cancelBooking: (bookingId: string) => void;

  // Doubts
  doubts: Doubt[];
  addDoubt: (doubt: Omit<Doubt, 'id' | 'createdAt' | 'views' | 'upvotes' | 'replies'>) => void;
  addDoubtReply: (doubtId: string, reply: Omit<DoubtReply, 'id' | 'createdAt' | 'upvotes'>) => void;
  upvoteDoubt: (doubtId: string) => void;
  upvoteReply: (doubtId: string, replyId: string) => void;

  // User Directory & Access Control (Admin Master Access)
  directoryUsers: User[];
  grantUserAccess: (userId: string) => void;
  revokeUserAccess: (userId: string) => void;
  addNewUserWithCredentials: (user: Partial<User>) => void;
  updateUserCredentials: (userId: string, updates: Partial<User>) => void;
  deleteUser: (userId: string) => void;

  // Interested Candidates & Registration Leads
  interestedCandidates: InterestedCandidate[];
  googleFormUrl: string;
  setGoogleFormUrl: (url: string) => void;
  addInterestedCandidate: (candidate: Omit<InterestedCandidate, 'id' | 'createdAt' | 'status'>) => void;
  updateCandidateStatus: (id: string, status: 'NEW_LEAD' | 'CONTACTED' | 'ENROLLED') => void;
  enrollCandidateAsUser: (candidateId: string) => void;

  // Classroom Live State
  classroomMessages: Record<string, ClassroomMessage[]>;
  addClassroomMessage: (sessionId: string, message: Omit<ClassroomMessage, 'id' | 'timestamp'>) => void;
  isHandRaised: boolean;
  toggleHandRaised: () => void;
  isMicMuted: boolean;
  isCamMuted: boolean;
  toggleMic: () => void;
  toggleCam: () => void;

  // Recorded Video Masterclasses
  recordedVideos: RecordedVideoItem[];
  addRecordedVideo: (video: Omit<RecordedVideoItem, 'id' | 'viewsCount' | 'likesCount' | 'recordedDate'>) => void;
  deleteRecordedVideo: (videoId: string) => void;
}

// Helper to get initial stored role safely on client
const getInitialStoredState = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('eduten_role');
      if (saved && (saved === 'STUDENT' || saved === 'PARENT' || saved === 'TUTOR' || saved === 'ADMIN')) {
        return saved as Role;
      }
    } catch {}
  }
  return 'STUDENT' as Role;
};

export const useAppStore = create<AppState>((set, get) => ({
  isLoggedIn: true,
  currentUser: CURRENT_STUDENT,
  currentRole: 'STUDENT',
  currentBoard: 'CBSE',
  studentPoints: CURRENT_STUDENT.points,
  streakCount: CURRENT_STUDENT.streakCount,
  hasActiveSubscription: true,
  activePassName: 'CBSE 2026 All-Access Super Pass',
  enrolledLiveSessionIds: ['live-optics-101'],

  setSubscription: (active: boolean, passName = 'CBSE 2026 All-Access Super Pass') =>
    set({ hasActiveSubscription: active, activePassName: passName }),

  enrollInLiveSession: (sessionId: string) =>
    set((state) => ({
      enrolledLiveSessionIds: state.enrolledLiveSessionIds.includes(sessionId)
        ? state.enrolledLiveSessionIds
        : [...state.enrolledLiveSessionIds, sessionId],
    })),

  loginAs: (role: Role, userOverrides?: Partial<User>) => {
    const baseUser = DEMO_USERS[role] || CURRENT_STUDENT;
    const user: User = { ...baseUser, ...userOverrides, role };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('eduten_role', role);
      } catch {}
    }
    const activeBoard = user.board || 'CBSE';
    const boardChapters = getChaptersForBoard(activeBoard).map((c) => ({
      ...c,
      status: 'NOT_STARTED' as ChapterStatus,
    }));
    set({
      isLoggedIn: true,
      currentUser: user,
      currentRole: role,
      currentBoard: activeBoard,
      studentPoints: user.points ?? 0,
      streakCount: user.streakCount ?? 1,
      chapters: role === 'STUDENT' ? boardChapters : getChaptersForBoard(activeBoard),
    });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('eduten_role');
      } catch {}
    }
    set({
      isLoggedIn: false,
      currentUser: CURRENT_STUDENT,
      currentRole: 'STUDENT',
      currentBoard: 'CBSE',
      chapters: getChaptersForBoard('CBSE'),
    });
  },

  setRole: (role: Role) => {
    const baseUser = DEMO_USERS[role] || CURRENT_STUDENT;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('eduten_role', role);
      } catch {}
    }
    set({
      currentRole: role,
      currentUser: baseUser,
    });
  },

  setBoard: (board: Board) => set({ currentBoard: board, chapters: getChaptersForBoard(board) }),
  incrementStreak: () => set((state) => ({ streakCount: state.streakCount + 1 })),
  addPoints: (pts: number) => set((state) => ({ studentPoints: state.studentPoints + pts })),

  // Chapters
  chapters: getChaptersForBoard('CBSE'),
  updateChapterStatus: (chapterId: string, status: ChapterStatus) =>
    set((state) => ({
      chapters: state.chapters.map((ch) =>
        ch.id === chapterId ? { ...ch, status } : ch
      ),
    })),

  // Bookings
  bookings: SAMPLE_BOOKINGS,
  addBooking: (bookingData) =>
    set((state) => {
      const newBooking: Booking = {
        ...bookingData,
        id: `book-${Date.now()}`,
      };
      return { bookings: [newBooking, ...state.bookings] };
    }),
  cancelBooking: (bookingId) =>
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === bookingId ? { ...b, status: 'CANCELLED' } : b
      ),
    })),

  // Doubts
  doubts: SAMPLE_DOUBTS,
  addDoubt: (doubtData) =>
    set((state) => {
      const newDoubt: Doubt = {
        ...doubtData,
        id: `doubt-${Date.now()}`,
        createdAt: new Date().toISOString(),
        views: 1,
        upvotes: 0,
        replies: [],
      };
      return { doubts: [newDoubt, ...state.doubts] };
    }),
  addDoubtReply: (doubtId, replyData) =>
    set((state) => ({
      doubts: state.doubts.map((d) => {
        if (d.id !== doubtId) return d;
        const newReply: DoubtReply = {
          ...replyData,
          id: `reply-${Date.now()}`,
          createdAt: new Date().toISOString(),
          upvotes: 0,
        };
        return {
          ...d,
          status: 'ANSWERED',
          replies: [...d.replies, newReply],
        };
      }),
    })),
  upvoteDoubt: (doubtId) =>
    set((state) => ({
      doubts: state.doubts.map((d) =>
        d.id === doubtId ? { ...d, upvotes: d.upvotes + 1 } : d
      ),
    })),
  upvoteReply: (doubtId, replyId) =>
    set((state) => ({
      doubts: state.doubts.map((d) => {
        if (d.id !== doubtId) return d;
        return {
          ...d,
          replies: d.replies.map((r) =>
            r.id === replyId ? { ...r, upvotes: r.upvotes + 1 } : r
          ),
        };
      }),
    })),

  // Directory Users & Credential Access Control
  directoryUsers: SAMPLE_DIRECTORY_USERS,
  grantUserAccess: (userId: string) =>
    set((state) => ({
      directoryUsers: state.directoryUsers.map((u) =>
        u.id === userId
          ? {
              ...u,
              credentialStatus: 'APPROVED',
              tempPassword: u.tempPassword?.includes('Pending') ? 'Granted@2026' : u.tempPassword,
            }
          : u
      ),
    })),
  revokeUserAccess: (userId: string) =>
    set((state) => ({
      directoryUsers: state.directoryUsers.map((u) =>
        u.id === userId ? { ...u, credentialStatus: 'SUSPENDED' } : u
      ),
    })),
  addNewUserWithCredentials: (userData: Partial<User>) =>
    set((state) => {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: userData.name || 'New Registered User',
        email: userData.email || `user.${Date.now()}@eduten.org`,
        role: userData.role || 'STUDENT',
        board: userData.board || 'CBSE',
        credentialStatus: 'APPROVED',
        username: userData.username || `${userData.name?.toLowerCase().replace(/\s+/g, '_') || 'user'}_${Date.now().toString().slice(-4)}`,
        tempPassword: userData.tempPassword || 'Pass@2026!',
        rollNumber: userData.rollNumber || `CBSE-2026-X-${Math.floor(1000 + Math.random() * 9000)}`,
        schoolName: userData.schoolName || 'National Model School',
        subscriptionPass: userData.subscriptionPass || 'CBSE 2026 All-Access Super Pass',
        streakCount: 0,
        points: 100,
        studyHoursWeekly: 0,
        avatar: userData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString(),
        parentProfile: userData.parentProfile,
        tutorProfile: userData.tutorProfile,
      };
      return { directoryUsers: [newUser, ...state.directoryUsers] };
    }),
  updateUserCredentials: (userId: string, updates: Partial<User>) =>
    set((state) => ({
      directoryUsers: state.directoryUsers.map((u) => {
        if (u.id !== userId) return u;
        return {
          ...u,
          ...updates,
          parentProfile: updates.parentProfile
            ? { ...u.parentProfile, ...updates.parentProfile }
            : u.parentProfile,
          tutorProfile: updates.tutorProfile
            ? { ...u.tutorProfile, ...updates.tutorProfile }
            : u.tutorProfile,
        };
      }),
    })),
  deleteUser: (userId: string) =>
    set((state) => ({
      directoryUsers: state.directoryUsers.filter((u) => u.id !== userId),
    })),

  // Interested Candidates & Registration Leads
  interestedCandidates: SAMPLE_INTERESTED_CANDIDATES,
  googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe_EduTenRegistration2026/viewform',
  setGoogleFormUrl: (url: string) => set({ googleFormUrl: url }),
  addInterestedCandidate: (candData) =>
    set((state) => {
      const newCand: InterestedCandidate = {
        ...candData,
        id: `cand-${Date.now()}`,
        status: 'NEW_LEAD',
        createdAt: new Date().toISOString(),
      };
      return { interestedCandidates: [newCand, ...state.interestedCandidates] };
    }),
  updateCandidateStatus: (id, status) =>
    set((state) => ({
      interestedCandidates: state.interestedCandidates.map((c) =>
        c.id === id ? { ...c, status } : c
      ),
    })),
  enrollCandidateAsUser: (candidateId: string) =>
    set((state) => {
      const cand = state.interestedCandidates.find((c) => c.id === candidateId);
      if (!cand) return state;

      const role: Role =
        cand.role === 'PARENT' ? 'PARENT' : cand.role === 'EDUCATOR' ? 'TUTOR' : 'STUDENT';

      const newUser: User = {
        id: `user-enrolled-${Date.now()}`,
        name: cand.name,
        email: cand.email,
        phone: cand.phone,
        role,
        board: cand.board,
        credentialStatus: 'APPROVED',
        username: `${cand.name.toLowerCase().replace(/\s+/g, '_')}_${cand.board.toLowerCase()}`,
        tempPassword: 'Pass@' + Math.floor(1000 + Math.random() * 9000),
        rollNumber: `${cand.board}-2026-X-${Math.floor(1000 + Math.random() * 9000)}`,
        schoolName: cand.city || 'State Model High School',
        subscriptionPass: `${cand.board} 2026 All-Access Super Pass`,
        streakCount: 1,
        points: 250,
        studyHoursWeekly: 5,
        avatar:
          role === 'STUDENT'
            ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
            : role === 'PARENT'
            ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
            : 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString(),
      };

      return {
        directoryUsers: [newUser, ...state.directoryUsers],
        interestedCandidates: state.interestedCandidates.map((c) =>
          c.id === candidateId ? { ...c, status: 'ENROLLED' } : c
        ),
      };
    }),

  // Live Classroom
  classroomMessages: {
    'session-live-101': [
      {
        id: 'msg-1',
        senderId: 'user-tutor-1',
        senderName: 'Dr. Priya Raman',
        senderRole: 'TUTOR',
        text: 'Welcome to today’s live class on Ray Optics and Spherical Mirrors! Let’s begin with the sign convention table.',
        timestamp: '11:00 AM',
      },
      {
        id: 'msg-2',
        senderId: 'user-student-1',
        senderName: 'Aarav Sharma',
        senderRole: 'STUDENT',
        text: 'Hello Ma’am! Ready for the numerical problem set.',
        timestamp: '11:02 AM',
      },
      {
        id: 'msg-3',
        senderId: 'user-tutor-1',
        senderName: 'Dr. Priya Raman',
        senderRole: 'TUTOR',
        text: 'Remember the formula: $\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}$ where focal length $f$ is negative for concave mirror.',
        timestamp: '11:05 AM',
        isMathFormula: true,
      },
    ],
  },
  addClassroomMessage: (sessionId, msgData) =>
    set((state) => {
      const currentList = state.classroomMessages[sessionId] || [];
      const newMsg: ClassroomMessage = {
        ...msgData,
        id: `msg-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      return {
        classroomMessages: {
          ...state.classroomMessages,
          [sessionId]: [...currentList, newMsg],
        },
      };
    }),
  isHandRaised: false,
  toggleHandRaised: () => set((state) => ({ isHandRaised: !state.isHandRaised })),
  isMicMuted: false,
  isCamMuted: false,
  toggleMic: () => set((state) => ({ isMicMuted: !state.isMicMuted })),
  toggleCam: () => set((state) => ({ isCamMuted: !state.isCamMuted })),

  // Recorded Video Masterclasses
  recordedVideos: SAMPLE_RECORDED_VIDEOS,
  addRecordedVideo: (videoData) =>
    set((state) => ({
      recordedVideos: [
        {
          ...videoData,
          id: `rec-${Date.now()}`,
          viewsCount: 1,
          likesCount: 1,
          recordedDate: 'Just now',
          isPopular: true,
        },
        ...state.recordedVideos,
      ],
    })),
  deleteRecordedVideo: (videoId) =>
    set((state) => ({
      recordedVideos: state.recordedVideos.filter((v) => v.id !== videoId),
    })),
}));
