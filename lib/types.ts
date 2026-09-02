export type Role = 'STUDENT' | 'TUTOR' | 'PARENT' | 'ADMIN';
export type Board = 'CBSE' | 'ICSE' | 'STATE';
export type ChapterStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'REVISED';
export type BookingStatus = 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
export type DoubtStatus = 'OPEN' | 'ANSWERED' | 'RESOLVED';
export type ResourceType = 'NOTES' | 'FORMULA_SHEET' | 'PYQ' | 'WORKSHEET';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED';
export type PlanType = 'CRASH_COURSE' | 'MONTHLY_PASS' | 'SESSION_PASS';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: Role;
  board: Board;
  avatar?: string;
  streakCount: number;
  points: number;
  studyHoursWeekly: number;
  inviteCode?: string;
  createdAt: string;
  credentialStatus?: 'APPROVED' | 'PENDING' | 'SUSPENDED';
  username?: string;
  tempPassword?: string;
  schoolName?: string;
  rollNumber?: string;
  subscriptionPass?: string;
  tutorProfile?: TutorProfile;
  parentProfile?: ParentProfile;
}

export interface InterestedCandidate {
  id: string;
  token: string;
  name: string;
  email: string;
  phone: string;
  role: 'STUDENT' | 'PARENT' | 'EDUCATOR' | 'SCHOOL';
  board: Board;
  city?: string;
  interests: string[];
  notes?: string;
  status: 'NEW_LEAD' | 'CONTACTED' | 'ENROLLED';
  createdAt: string;
}

export interface ParentProfile {
  id: string;
  userId: string;
  linkedStudentId: string;
  studentName?: string;
  studentAvatar?: string;
  studentRollNumber?: string;
  studentSchool?: string;
  studentBoard?: Board;
  relationship: string;
  notifyOnTestScore: boolean;
  notifyOnAttendance: boolean;
  whatsappAlerts: boolean;
  inviteCode?: string;
}

export interface TutorProfile {
  id: string;
  userId: string;
  headline: string;
  bio: string;
  qualifications: string;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  subjectsTaught: string[];
  availabilitySlots: string[];
  avatar?: string;
  name?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  slug: string;
  grade: number;
  board?: Board;
  description: string;
  icon: string;
  color: string;
  image?: string;
  category: 'Math' | 'Science' | 'Social Studies' | 'English';
  chaptersCount?: number;
  completedChaptersCount?: number;
}

export interface Chapter {
  id: string;
  subjectId: string;
  board?: Board;
  chapterNumber: number;
  title: string;
  unitName: string;
  description: string;
  estHours: number;
  totalQuestions: number;
  difficulty: Difficulty;
  status?: ChapterStatus;
  score?: number; // 0-100% for weakness heatmap
  keyTopics?: string[];
  formulaList?: string[];
  conceptNotes?: string;
  conceptImage?: string;
  workedExample?: {
    problem: string;
    solution: string;
    boardTip: string;
  };
}

export interface Booking {
  id: string;
  studentId: string;
  studentName?: string;
  tutorId: string;
  tutorName?: string;
  tutorAvatar?: string;
  subjectId: string;
  subjectName?: string;
  topic: string;
  scheduledAt: string;
  durationMinutes: number;
  status: BookingStatus;
  attended?: boolean;
  meetingUrl?: string;
  notes?: string;
  isLiveNow?: boolean;
  isFreeWithSubscription?: boolean;
}

export interface LiveClassSession {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  tutorHeadline: string;
  timingCategory: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';
  timeLabel: string;
  dayLabel: string;
  topic: string;
  chapterName: string;
  status: 'LIVE_NOW' | 'STARTING_SOON' | 'SCHEDULED';
  enrolledStudentsCount: number;
  maxCapacity: number;
  isFreeWithSubscription: boolean;
  meetingUrl: string;
}

export interface DoubtReply {
  id: string;
  doubtId: string;
  authorId: string;
  authorName: string;
  authorRole: Role;
  authorAvatar?: string;
  content: string;
  isAccepted: boolean;
  isTutorVerified: boolean;
  upvotes: number;
  createdAt: string;
}

export interface Doubt {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  studentBoard?: Board;
  subjectId: string;
  subjectName: string;
  chapterId?: string;
  chapterTitle?: string;
  title: string;
  content: string;
  imageUrl?: string;
  status: DoubtStatus;
  views: number;
  upvotes: number;
  createdAt: string;
  replies: DoubtReply[];
}

// Gemini AI Doubt Solver Types
export interface AiDoubtResponse {
  concept: string;
  ncertReference: string;
  stepsWorking: string;
  commonPitfalls: string;
  relatedPyq: string;
  practicePrompt?: string;
}

export interface AiDoubtMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  structured?: AiDoubtResponse;
  imageUrl?: string;
  timestamp: string;
}

// Payment & Razorpay Types
export interface SubscriptionPlan {
  id: string;
  type: PlanType;
  title: string;
  price: number;
  originalPrice: number;
  duration: string;
  popular?: boolean;
  features: string[];
  gstPercentage: number;
}

export interface PaymentTransaction {
  id: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  planType: PlanType;
  planTitle: string;
  invoiceNumber: string;
  gstAmount: number;
  receiptUrl?: string;
  createdAt: string;
}

// CBSE 5-Section Official Board Exam Types
export type CbseSectionKey = 'SECTION_A' | 'SECTION_B' | 'SECTION_C' | 'SECTION_D' | 'SECTION_E';

export interface CbseQuestion {
  id: string;
  section: CbseSectionKey;
  questionNumber: number;
  marks: number;
  questionType: 'MCQ' | 'ASSERTION_REASON' | 'VERY_SHORT' | 'SHORT' | 'LONG' | 'CASE_BASED';
  questionText: string;
  casePassage?: string;
  options?: string[];
  correctOptionIndex?: number;
  markingRubric: string[];
  topperModelAnswer: string;
  explanation: string;
  topic: string;
}

export interface CbseExamPaper {
  id: string;
  title: string;
  subjectName: string;
  code: string;
  year: number;
  totalMarks: number;
  durationMinutes: number;
  instructions: string[];
  questions: CbseQuestion[];
}

export interface TestQuestion {
  id: string;
  mockTestId: string;
  sectionId?: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  marks: number;
  topic: string;
  difficulty: Difficulty;
}

export interface MockTest {
  id: string;
  subjectId: string;
  subjectName?: string;
  board?: Board;
  chapterId?: string;
  chapterTitle?: string;
  title: string;
  description?: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  difficulty: Difficulty;
  questionsCount?: number;
  isOfficialCbsePattern?: boolean;
  sections?: {
    id: string;
    name: string;
    description: string;
    questionCount: number;
    marksPerQuestion: number;
  }[];
  questions?: TestQuestion[];
}

export interface TestAttempt {
  id: string;
  userId: string;
  mockTestId: string;
  mockTestTitle: string;
  subjectName: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  timeSpentSeconds: number;
  answers: Record<string, number>;
  completedAt: string;
}

export interface StudyResource {
  id: string;
  subjectId: string;
  subjectName: string;
  chapterId?: string;
  chapterTitle?: string;
  title: string;
  resourceType: ResourceType;
  fileUrl: string;
  fileFormat: string;
  fileSize: string;
  year?: number;
  downloads: number;
  board: Board;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  pointsReq: number;
  unlocked?: boolean;
  unlockedAt?: string;
}
