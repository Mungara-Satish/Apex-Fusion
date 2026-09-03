import { Subject, Chapter, User, TutorProfile, Booking, Doubt, MockTest, StudyResource, Badge, TestAttempt, LiveClassSession, Board, InterestedCandidate } from './types';

export const CURRENT_STUDENT: User = {
  id: 'user-student-1',
  email: 'aarav.sharma@eduten.org',
  name: 'Aarav Sharma',
  role: 'STUDENT',
  board: 'CBSE',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  streakCount: 1,
  points: 0,
  studyHoursWeekly: 0,
  inviteCode: 'AARAV10TH',
  createdAt: '2026-09-01T09:00:00Z',
};

export const CURRENT_TUTOR: User = {
  id: 'user-tutor-1',
  email: 'priya.raman@eduten.org',
  name: 'Dr. Priya Raman',
  role: 'TUTOR',
  board: 'CBSE',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  streakCount: 45,
  points: 4800,
  studyHoursWeekly: 25.0,
  createdAt: '2024-03-10T09:00:00Z',
  tutorProfile: {
    id: 'tutor-prof-1',
    userId: 'user-tutor-1',
    headline: 'Senior Physics & Chemistry Mentor | Ex-IIT Delhi Researcher',
    bio: 'Over 11 years of experience guiding 10th-grade CBSE and ICSE students to score 95%+ in Science. Specializing in numerical problem-solving, ray optics, and chemical equation balancing.',
    qualifications: 'M.Sc. Physics (IIT Delhi), Ph.D. Applied Optics, Gold Medalist',
    hourlyRate: 650,
    rating: 4.95,
    reviewCount: 128,
    verified: true,
    subjectsTaught: ['Physics', 'Chemistry', 'Science'],
    availabilitySlots: ['Mon 4:00 PM - 8:00 PM', 'Wed 5:00 PM - 9:00 PM', 'Sat 10:00 AM - 4:00 PM', 'Sun 11:00 AM - 5:00 PM'],
  },
};

export const DEMO_USERS: Record<string, User> = {
  STUDENT: CURRENT_STUDENT,
  TUTOR: CURRENT_TUTOR,
  PARENT: {
    id: 'user-parent-1',
    email: 'rajesh.sharma@parent.org',
    name: 'Rajesh Sharma',
    role: 'PARENT',
    board: 'CBSE',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    streakCount: 12,
    points: 850,
    studyHoursWeekly: 0,
    inviteCode: 'PARENT-AARAV',
    createdAt: '2025-06-16T10:00:00Z',
    parentProfile: {
      id: 'parent-prof-1',
      userId: 'user-parent-1',
      linkedStudentId: 'user-student-1',
      studentName: 'Aarav Sharma',
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
  ADMIN: {
    id: 'user-admin-1',
    email: 'admin@eduten.org',
    name: 'Dr. Sanjay Gupta (Academic Director)',
    role: 'ADMIN',
    board: 'CBSE',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    streakCount: 99,
    points: 9999,
    studyHoursWeekly: 40,
    createdAt: '2024-01-01T00:00:00Z',
  },
};

export const SAMPLE_DIRECTORY_USERS: User[] = [
  // --- STUDENTS ---
  {
    id: 'user-student-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@eduten.org',
    role: 'STUDENT',
    board: 'CBSE',
    rollNumber: 'CBSE-2026-X-1048',
    schoolName: 'Delhi Public School, R.K. Puram',
    subscriptionPass: 'CBSE 2026 All-Access Super Pass',
    credentialStatus: 'APPROVED',
    username: 'aarav_cbse10',
    tempPassword: 'Password@2026',
    streakCount: 7,
    points: 1240,
    studyHoursWeekly: 18.5,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    inviteCode: 'AARAV10TH',
    createdAt: '2025-06-15T09:00:00Z',
  },
  {
    id: 'user-student-2',
    name: 'Rohan Mukherjee',
    email: 'rohan.mukherjee@eduten.org',
    role: 'STUDENT',
    board: 'ICSE',
    rollNumber: 'ICSE-2026-X-2091',
    schoolName: "St. Xavier's Collegiate School, Kolkata",
    subscriptionPass: 'ICSE 2026 All-Access Super Pass',
    credentialStatus: 'APPROVED',
    username: 'rohan_icse10',
    tempPassword: 'Password@2026',
    streakCount: 14,
    points: 1890,
    studyHoursWeekly: 22.0,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    inviteCode: 'ROHAN10ICSE',
    createdAt: '2025-06-18T11:30:00Z',
  },
  {
    id: 'user-student-3',
    name: 'Kavya Reddy',
    email: 'kavya.reddy@eduten.org',
    role: 'STUDENT',
    board: 'STATE',
    rollNumber: 'STATE-2026-X-3142',
    schoolName: 'Hyderabad Public School, Begumpet',
    subscriptionPass: 'State Board All-Access Pass',
    credentialStatus: 'APPROVED',
    username: 'kavya_state10',
    tempPassword: 'Password@2026',
    streakCount: 9,
    points: 1450,
    studyHoursWeekly: 16.5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    inviteCode: 'KAVYA10STATE',
    createdAt: '2025-07-01T14:15:00Z',
  },
  {
    id: 'user-student-4',
    name: 'Tanvi Deshmukh',
    email: 'tanvi.deshmukh@gmail.com',
    role: 'STUDENT',
    board: 'CBSE',
    rollNumber: 'CBSE-2026-X-4421',
    schoolName: 'National Public School, Indiranagar, Bangalore',
    subscriptionPass: 'CBSE 2026 Board Booster Pass',
    credentialStatus: 'PENDING',
    username: 'tanvi_cbse',
    tempPassword: 'PendingAdminGrant#26',
    streakCount: 0,
    points: 100,
    studyHoursWeekly: 0,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    inviteCode: 'TANVI2026',
    createdAt: '2026-09-01T08:20:00Z',
  },
  {
    id: 'user-student-5',
    name: 'Aditya Verma',
    email: 'aditya.verma@gmail.com',
    role: 'STUDENT',
    board: 'ICSE',
    rollNumber: 'ICSE-2026-X-5512',
    schoolName: 'Bombay Scottish School, Mahim, Mumbai',
    subscriptionPass: 'Free Assessment Tier',
    credentialStatus: 'PENDING',
    username: 'aditya_icse',
    tempPassword: 'PendingAdminGrant#26',
    streakCount: 0,
    points: 50,
    studyHoursWeekly: 0,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    inviteCode: 'ADITYA2026',
    createdAt: '2026-09-02T06:10:00Z',
  },
  {
    id: 'user-student-6',
    name: 'Siddharth Rao',
    email: 'siddharth.rao@yahoo.com',
    role: 'STUDENT',
    board: 'STATE',
    rollNumber: 'STATE-2026-X-6721',
    schoolName: 'Kendriya Vidyalaya, IIT Madras Campus',
    subscriptionPass: 'Suspended Account',
    credentialStatus: 'SUSPENDED',
    username: 'siddharth_rao',
    tempPassword: 'SuspendedByAdmin',
    streakCount: 0,
    points: 300,
    studyHoursWeekly: 0,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    inviteCode: 'SIDDHARTH26',
    createdAt: '2025-08-10T12:00:00Z',
  },

  // --- PARENTS ---
  {
    id: 'user-parent-1',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@parent.org',
    role: 'PARENT',
    board: 'CBSE',
    credentialStatus: 'APPROVED',
    username: 'rajesh_sharma_parent',
    tempPassword: 'Password@2026',
    phone: '+91 98110 44521',
    streakCount: 12,
    points: 850,
    studyHoursWeekly: 0,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    inviteCode: 'PARENT-AARAV',
    createdAt: '2025-06-16T10:00:00Z',
    parentProfile: {
      id: 'parent-prof-1',
      userId: 'user-parent-1',
      linkedStudentId: 'user-student-1',
      studentName: 'Aarav Sharma',
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
  {
    id: 'user-parent-2',
    name: 'Sunita Mukherjee',
    email: 'sunita.mukherjee@parent.org',
    role: 'PARENT',
    board: 'ICSE',
    credentialStatus: 'APPROVED',
    username: 'sunita_mukherjee_parent',
    tempPassword: 'Password@2026',
    phone: '+91 98300 12894',
    streakCount: 18,
    points: 920,
    studyHoursWeekly: 0,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    inviteCode: 'PARENT-ROHAN',
    createdAt: '2025-06-19T09:00:00Z',
    parentProfile: {
      id: 'parent-prof-2',
      userId: 'user-parent-2',
      linkedStudentId: 'user-student-2',
      studentName: 'Rohan Mukherjee',
      studentRollNumber: 'ICSE-2026-X-2091',
      studentSchool: "St. Xavier's Collegiate School, Kolkata",
      studentBoard: 'ICSE',
      relationship: 'Mother',
      notifyOnTestScore: true,
      notifyOnAttendance: true,
      whatsappAlerts: true,
      inviteCode: 'ROHAN10ICSE',
    },
  },
  {
    id: 'user-parent-3',
    name: 'Venkatesh Reddy',
    email: 'venkatesh.reddy@parent.org',
    role: 'PARENT',
    board: 'STATE',
    credentialStatus: 'APPROVED',
    username: 'venkatesh_reddy_parent',
    tempPassword: 'Password@2026',
    phone: '+91 94400 87312',
    streakCount: 10,
    points: 780,
    studyHoursWeekly: 0,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    inviteCode: 'PARENT-KAVYA',
    createdAt: '2025-07-02T11:00:00Z',
    parentProfile: {
      id: 'parent-prof-3',
      userId: 'user-parent-3',
      linkedStudentId: 'user-student-3',
      studentName: 'Kavya Reddy',
      studentRollNumber: 'STATE-2026-X-3142',
      studentSchool: 'Hyderabad Public School, Begumpet',
      studentBoard: 'STATE',
      relationship: 'Father',
      notifyOnTestScore: true,
      notifyOnAttendance: true,
      whatsappAlerts: true,
      inviteCode: 'KAVYA10STATE',
    },
  },
  {
    id: 'user-parent-4',
    name: 'Meera Deshmukh',
    email: 'meera.deshmukh@gmail.com',
    role: 'PARENT',
    board: 'CBSE',
    credentialStatus: 'PENDING',
    username: 'meera_deshmukh_parent',
    tempPassword: 'PendingAdminGrant#26',
    phone: '+91 98450 66723',
    streakCount: 0,
    points: 100,
    studyHoursWeekly: 0,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    inviteCode: 'PARENT-TANVI',
    createdAt: '2026-09-01T09:00:00Z',
    parentProfile: {
      id: 'parent-prof-4',
      userId: 'user-parent-4',
      linkedStudentId: 'user-student-4',
      studentName: 'Tanvi Deshmukh',
      studentRollNumber: 'CBSE-2026-X-4421',
      studentSchool: 'National Public School, Indiranagar, Bangalore',
      studentBoard: 'CBSE',
      relationship: 'Mother',
      notifyOnTestScore: true,
      notifyOnAttendance: true,
      whatsappAlerts: true,
      inviteCode: 'TANVI2026',
    },
  },

  // --- TUTORS ---
  {
    id: 'user-tutor-1',
    name: 'Dr. Priya Raman',
    email: 'priya.raman@eduten.org',
    role: 'TUTOR',
    board: 'CBSE',
    credentialStatus: 'APPROVED',
    username: 'dr_priya_physics',
    tempPassword: 'Password@2026',
    phone: '+91 98200 45612',
    streakCount: 45,
    points: 4800,
    studyHoursWeekly: 25.0,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-03-10T09:00:00Z',
    tutorProfile: {
      id: 'tutor-prof-1',
      userId: 'user-tutor-1',
      headline: 'Senior Physics & Chemistry Mentor | Ex-IIT Delhi Researcher',
      bio: 'Over 11 years of experience guiding 10th-grade CBSE and ICSE students to score 95%+ in Science. Specializing in numerical problem-solving, ray optics, and chemical equation balancing.',
      qualifications: 'M.Sc. Physics (IIT Delhi), Ph.D. Applied Optics, Gold Medalist',
      hourlyRate: 650,
      rating: 4.95,
      reviewCount: 128,
      verified: true,
      subjectsTaught: ['Physics', 'Chemistry', 'Science'],
      availabilitySlots: ['Mon 4:00 PM - 8:00 PM', 'Wed 5:00 PM - 9:00 PM', 'Sat 10:00 AM - 4:00 PM', 'Sun 11:00 AM - 5:00 PM'],
    },
  },
  {
    id: 'user-tutor-2',
    name: 'Prof. Rajesh Verma',
    email: 'rajesh.verma@eduten.org',
    role: 'TUTOR',
    board: 'CBSE',
    credentialStatus: 'APPROVED',
    username: 'prof_rajesh_math',
    tempPassword: 'Password@2026',
    phone: '+91 98100 78214',
    streakCount: 38,
    points: 4200,
    studyHoursWeekly: 20.0,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-04-15T09:00:00Z',
    tutorProfile: {
      id: 'tutor-prof-2',
      userId: 'user-tutor-2',
      headline: '10th Board Mathematics Specialist | 14+ Yrs Teaching Experience',
      bio: 'Master of shortcuts, proofs, and conceptual clarity in Trigonometry, Coordinate Geometry, and Quadratic Equations. Author of 2 Board Exam preparatory books.',
      qualifications: 'B.Tech (IIT Madras), M.Tech, Certified National Math Olympiad Trainer',
      hourlyRate: 700,
      rating: 4.92,
      reviewCount: 215,
      verified: true,
      subjectsTaught: ['Mathematics'],
      availabilitySlots: ['Tue 4:00 PM - 8:00 PM', 'Thu 4:00 PM - 8:00 PM', 'Sat 2:00 PM - 8:00 PM', 'Sun 9:00 AM - 2:00 PM'],
    },
  },
  {
    id: 'user-tutor-6',
    name: 'Dr. Sandeep Kulkarni',
    email: 'sandeep.kulkarni@gmail.com',
    role: 'TUTOR',
    board: 'STATE',
    credentialStatus: 'PENDING',
    username: 'dr_sandeep_state',
    tempPassword: 'PendingAdminGrant#26',
    phone: '+91 97650 33412',
    streakCount: 0,
    points: 200,
    studyHoursWeekly: 0,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-09-02T11:00:00Z',
    tutorProfile: {
      id: 'tutor-prof-6',
      userId: 'user-tutor-6',
      headline: 'State Board Physical Science & Chemistry Specialist',
      bio: 'Expert in State Board SCERT syllabus, metallurgy, heat methods of mixtures, and ray diagrams.',
      qualifications: 'M.Sc. Chemistry (Osmania University), B.Ed, 9 Yrs Teaching',
      hourlyRate: 500,
      rating: 5.0,
      reviewCount: 0,
      verified: false,
      subjectsTaught: ['Physical Science', 'Chemistry'],
      availabilitySlots: ['Mon 5:00 PM - 8:00 PM', 'Fri 5:00 PM - 8:00 PM'],
    },
  },

  // --- ADMINISTRATORS ---
  {
    id: 'user-admin-1',
    name: 'Dr. Sanjay Gupta (Academic Director)',
    email: 'admin@eduten.org',
    role: 'ADMIN',
    board: 'CBSE',
    credentialStatus: 'APPROVED',
    username: 'admin',
    tempPassword: 'Password@2026',
    phone: '+91 98100 00001',
    streakCount: 99,
    points: 9999,
    studyHoursWeekly: 40,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-01-01T00:00:00Z',
    subscriptionPass: 'Master Root Superuser Access',
  },
];

export const SAMPLE_TUTORS: TutorProfile[] = [
  {
    id: 'tutor-prof-1',
    userId: 'user-tutor-1',
    name: 'Dr. Priya Raman',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    headline: 'Senior Physics & Chemistry Mentor | Ex-IIT Delhi Researcher',
    bio: 'Over 11 years of experience guiding 10th-grade CBSE and ICSE students to score 95%+ in Science. Specializing in numerical problem-solving, ray optics, and chemical equation balancing.',
    qualifications: 'M.Sc. Physics (IIT Delhi), Ph.D. Applied Optics, Gold Medalist',
    hourlyRate: 650,
    rating: 4.95,
    reviewCount: 128,
    verified: true,
    subjectsTaught: ['Physics', 'Chemistry', 'Science'],
    availabilitySlots: ['Mon 4:00 PM - 8:00 PM', 'Wed 5:00 PM - 9:00 PM', 'Sat 10:00 AM - 4:00 PM', 'Sun 11:00 AM - 5:00 PM'],
  },
  {
    id: 'tutor-prof-2',
    userId: 'user-tutor-2',
    name: 'Prof. Rajesh Verma',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    headline: '10th Board Mathematics Specialist | 14+ Yrs Teaching Experience',
    bio: 'Master of shortcuts, proofs, and conceptual clarity in Trigonometry, Coordinate Geometry, and Quadratic Equations. Author of 2 Board Exam preparatory books.',
    qualifications: 'B.Tech (IIT Madras), M.Tech, Certified National Math Olympiad Trainer',
    hourlyRate: 700,
    rating: 4.92,
    reviewCount: 215,
    verified: true,
    subjectsTaught: ['Mathematics'],
    availabilitySlots: ['Tue 4:00 PM - 8:00 PM', 'Thu 4:00 PM - 8:00 PM', 'Sat 2:00 PM - 8:00 PM', 'Sun 9:00 AM - 2:00 PM'],
  },
  {
    id: 'tutor-prof-3',
    userId: 'user-tutor-3',
    name: 'Ananya Sengupta',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    headline: 'Biology & Environmental Science Expert | Medical Educator',
    bio: 'Helping students memorize and visually diagram complex biological cycles (Life Processes, Genetics, Reproduction) with ease and high exam retention.',
    qualifications: 'M.Sc. Human Physiology (Calcutta University), B.Ed, NET Qualified',
    hourlyRate: 550,
    rating: 4.88,
    reviewCount: 94,
    verified: true,
    subjectsTaught: ['Biology', 'Science'],
    availabilitySlots: ['Mon 5:00 PM - 7:00 PM', 'Wed 5:00 PM - 8:00 PM', 'Fri 4:00 PM - 8:00 PM', 'Sun 3:00 PM - 7:00 PM'],
  },
  {
    id: 'tutor-prof-4',
    userId: 'user-tutor-4',
    name: 'Vikramaditya Roy',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    headline: 'Social Science & History Storyteller | Civics & Economics Lead',
    bio: 'Making 10th Social Studies unforgettable through timeline maps, case studies, and exam answer-structuring frameworks that secure full 5-mark answers.',
    qualifications: 'M.A. History (JNU), M.Phil, CBSE Board Exam Examiner',
    hourlyRate: 500,
    rating: 4.89,
    reviewCount: 110,
    verified: true,
    subjectsTaught: ['History', 'Geography', 'Civics', 'Economics', 'Social Studies'],
    availabilitySlots: ['Mon 6:00 PM - 9:00 PM', 'Tue 6:00 PM - 9:00 PM', 'Thu 6:00 PM - 9:00 PM', 'Sat 10:00 AM - 1:00 PM'],
  },
  {
    id: 'tutor-prof-5',
    userId: 'user-tutor-5',
    name: 'Elena Gilbert',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    headline: 'English Language & Literature Mentor | Creative Writing Coach',
    bio: 'Board exam answer writing techniques, grammar mastery, and deep thematic analysis for CBSE First Flight & Footprints without Feet / ICSE Julius Caesar.',
    qualifications: 'M.A. English Literature (Delhi University), Cambridge CELTA Certified',
    hourlyRate: 520,
    rating: 4.96,
    reviewCount: 88,
    verified: true,
    subjectsTaught: ['English'],
    availabilitySlots: ['Wed 4:00 PM - 7:00 PM', 'Fri 4:00 PM - 8:00 PM', 'Sat 11:00 AM - 5:00 PM'],
  }
];

export const SAMPLE_LIVE_SESSIONS: LiveClassSession[] = [
  {
    id: 'live-optics-101',
    title: 'Ray Optics, Spherical Mirrors & Lens Numerical Masterclass',
    subjectId: 'sub-physics',
    subjectName: 'Science: Physics',
    tutorId: 'user-tutor-1',
    tutorName: 'Dr. Priya Raman',
    tutorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    tutorHeadline: 'Ph.D. Applied Optics (IIT Delhi) • 11+ Yrs Teaching',
    timingCategory: 'MORNING',
    timeLabel: '11:00 AM - 12:15 PM',
    dayLabel: 'Today (Live Right Now)',
    topic: 'Cartesian Sign Conventions, Mirror Formula Proofs & Lens Power',
    chapterName: 'Light - Reflection and Refraction',
    status: 'LIVE_NOW',
    enrolledStudentsCount: 42,
    maxCapacity: 60,
    isFreeWithSubscription: true,
    meetingUrl: '/classroom/session-live-101',
  },
  {
    id: 'live-math-trig-102',
    title: 'Trigonometric Identities & 4-Mark Board Exam Proofs Drill',
    subjectId: 'sub-math',
    subjectName: 'Mathematics',
    tutorId: 'user-tutor-2',
    tutorName: 'Prof. Rajesh Verma',
    tutorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    tutorHeadline: 'B.Tech/M.Tech (IIT Madras) • National Math Olympiad Trainer',
    timingCategory: 'AFTERNOON',
    timeLabel: '04:00 PM - 05:15 PM',
    dayLabel: 'Today (Starting Soon)',
    topic: 'Proving (cos A - sin A + 1)/(cos A + sin A - 1) = csc A + cot A & Shortcuts',
    chapterName: 'Introduction to Trigonometry',
    status: 'STARTING_SOON',
    enrolledStudentsCount: 56,
    maxCapacity: 75,
    isFreeWithSubscription: true,
    meetingUrl: '/classroom/session-live-102',
  },
  {
    id: 'live-chem-carbon-103',
    title: 'Carbon & Its Compounds: Esterification, Saponification & Micelles',
    subjectId: 'sub-chemistry',
    subjectName: 'Science: Chemistry',
    tutorId: 'user-tutor-1',
    tutorName: 'Dr. Priya Raman',
    tutorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    tutorHeadline: 'Ph.D. Applied Optics (IIT Delhi) • Gold Medalist',
    timingCategory: 'EVENING',
    timeLabel: '06:00 PM - 07:15 PM',
    dayLabel: 'Today (Evening Batch)',
    topic: 'Ethanol & Ethanoic Acid Chemical Properties and Cleansing Action',
    chapterName: 'Carbon and its Compounds',
    status: 'SCHEDULED',
    enrolledStudentsCount: 38,
    maxCapacity: 60,
    isFreeWithSubscription: true,
    meetingUrl: '/classroom/session-live-103',
  },
  {
    id: 'live-bio-circ-104',
    title: 'Human Double Circulation & Heart Working Visual Diagramming',
    subjectId: 'sub-biology',
    subjectName: 'Science: Biology',
    tutorId: 'user-tutor-3',
    tutorName: 'Ananya Sengupta',
    tutorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    tutorHeadline: 'M.Sc. Human Physiology • Medical Entrance Coach',
    timingCategory: 'EVENING',
    timeLabel: '07:30 PM - 08:30 PM',
    dayLabel: 'Today (Dusk Batch)',
    topic: 'Pulmonary vs Systemic Circulation & Valves Working',
    chapterName: 'Life Processes',
    status: 'SCHEDULED',
    enrolledStudentsCount: 49,
    maxCapacity: 70,
    isFreeWithSubscription: true,
    meetingUrl: '/classroom/session-live-104',
  },
  {
    id: 'live-sst-nat-105',
    title: 'Nationalism in India: Timeline Maps & 5-Mark Answer Frameworks',
    subjectId: 'sub-history-civics',
    subjectName: 'Social Studies',
    tutorId: 'user-tutor-4',
    tutorName: 'Vikramaditya Roy',
    tutorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    tutorHeadline: 'M.A. History (JNU) • CBSE Board Exam Examiner',
    timingCategory: 'NIGHT',
    timeLabel: '08:45 PM - 09:45 PM',
    dayLabel: 'Today (Night Doubt Clinic)',
    topic: 'Non-Cooperation vs Civil Disobedience & Map Marking Items',
    chapterName: 'Nationalism in India',
    status: 'SCHEDULED',
    enrolledStudentsCount: 31,
    maxCapacity: 50,
    isFreeWithSubscription: true,
    meetingUrl: '/classroom/session-live-105',
  },
  {
    id: 'live-eng-write-106',
    title: 'CBSE First Flight Literary Themes & Letter to Editor 100/100 Format',
    subjectId: 'sub-english',
    subjectName: 'English Literature',
    tutorId: 'user-tutor-5',
    tutorName: 'Elena Gilbert',
    tutorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    tutorHeadline: 'Cambridge CELTA Certified • English Mentor',
    timingCategory: 'MORNING',
    timeLabel: '07:30 AM - 08:30 AM',
    dayLabel: 'Tomorrow (Early Morning Batch)',
    topic: 'Lencho & Mandela Themes + Formal Writing Rubrics',
    chapterName: 'A Letter to God & Long Walk to Freedom',
    status: 'SCHEDULED',
    enrolledStudentsCount: 27,
    maxCapacity: 50,
    isFreeWithSubscription: true,
    meetingUrl: '/classroom/session-live-106',
  }
];

// ==========================================
// 1. CBSE BOARD SUBJECTS (NCERT ALIGNED)
// ==========================================
export const CBSE_SUBJECTS: Subject[] = [
  {
    id: 'sub-math',
    name: 'Mathematics',
    code: 'MATH-041',
    slug: 'mathematics',
    grade: 10,
    board: 'CBSE',
    category: 'Math',
    description: 'Real numbers, polynomials, linear equations, quadratic formulas, trigonometry, coordinate geometry, surface areas, and statistics.',
    icon: 'Calculator',
    color: 'from-blue-600 to-indigo-700',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  },
  {
    id: 'sub-physics',
    name: 'Science: Physics',
    code: 'PHY-086',
    slug: 'physics',
    grade: 10,
    board: 'CBSE',
    category: 'Science',
    description: 'Ray optics, mirror & lens formulas, human eye & dispersion, electric circuits, Ohm’s law, and electromagnetic effects.',
    icon: 'Zap',
    color: 'from-amber-500 to-orange-600',
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  },
  {
    id: 'sub-chemistry',
    name: 'Science: Chemistry',
    code: 'CHEM-086',
    slug: 'chemistry',
    grade: 10,
    board: 'CBSE',
    category: 'Science',
    description: 'Chemical equations & redox, acid-base pH scales, metals & metallurgy, carbon functional groups, and periodic properties.',
    icon: 'FlaskConical',
    color: 'from-emerald-600 to-teal-700',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  },
  {
    id: 'sub-biology',
    name: 'Science: Biology',
    code: 'BIO-086',
    slug: 'biology',
    grade: 10,
    board: 'CBSE',
    category: 'Science',
    description: 'Double circulation, respiration glucose breakdown, reflex arcs, reproduction mechanisms, Mendelian genetics, and environment.',
    icon: 'Dna',
    color: 'from-green-600 to-emerald-800',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  },
  {
    id: 'sub-history-civics',
    name: 'Social Science: History & Civics',
    code: 'SST-087',
    slug: 'history-civics',
    grade: 10,
    board: 'CBSE',
    category: 'Social Studies',
    description: 'Nationalism in India, Rise of Nationalism in Europe, Power Sharing, Federalism, and Political Parties.',
    icon: 'Landmark',
    color: 'from-purple-600 to-pink-700',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  },
  {
    id: 'sub-geography-economics',
    name: 'Social Science: Geography & Economics',
    code: 'SST-087',
    slug: 'geography-economics',
    grade: 10,
    board: 'CBSE',
    category: 'Social Studies',
    description: 'Resources & soils, agricultural seasons, mineral belts, manufacturing industries, sectors of Indian economy, and money & credit.',
    icon: 'Globe',
    color: 'from-cyan-600 to-blue-700',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  },
  {
    id: 'sub-english',
    name: 'English Language & Literature',
    code: 'ENG-184',
    slug: 'english',
    grade: 10,
    board: 'CBSE',
    category: 'English',
    description: 'First Flight prose & poetry, Nelson Mandela freedom themes, analytical paragraphs, formal letters to the editor, and grammar.',
    icon: 'BookOpen',
    color: 'from-rose-500 to-red-700',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  }
];

// ==========================================
// 2. ICSE BOARD SUBJECTS (CISCE / SELINA)
// ==========================================
export const ICSE_SUBJECTS: Subject[] = [
  {
    id: 'sub-math-icse',
    name: 'ICSE Commercial & Pure Mathematics',
    code: 'ICSE-MATH-51',
    slug: 'mathematics',
    grade: 10,
    board: 'ICSE',
    category: 'Math',
    description: 'GST tax invoices, Banking Recurring Deposits, Linear Inequations, Matrices, Remainder & Factor Theorems, Reflection, and Ogives.',
    icon: 'Calculator',
    color: 'from-blue-600 to-indigo-700',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  },
  {
    id: 'sub-physics-icse',
    name: 'ICSE Physics (Science Paper 1)',
    code: 'ICSE-PHY-52',
    slug: 'physics',
    grade: 10,
    board: 'ICSE',
    category: 'Science',
    description: 'Force, Moment of Couple & Pulleys, Calorimetry & Latent Heat, Sound Echoes & Resonances, Spectrum, and Radioactivity.',
    icon: 'Zap',
    color: 'from-amber-500 to-orange-600',
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  },
  {
    id: 'sub-chemistry-icse',
    name: 'ICSE Chemistry (Science Paper 2)',
    code: 'ICSE-CHEM-52',
    slug: 'chemistry',
    grade: 10,
    board: 'ICSE',
    category: 'Science',
    description: 'Periodic Table properties, Coordinate bonding, Mole Concept & Stoichiometry, Electrolysis (Hall-Héroult), Study of Compounds (HCl, NH3, HNO3, H2SO4), and IUPAC Organic Chemistry.',
    icon: 'FlaskConical',
    color: 'from-emerald-600 to-teal-700',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  },
  {
    id: 'sub-biology-icse',
    name: 'ICSE Biology (Science Paper 3)',
    code: 'ICSE-BIO-52',
    slug: 'biology',
    grade: 10,
    board: 'ICSE',
    category: 'Science',
    description: 'Cell Division (Mitosis & Meiosis), Plant Physiology (Osmosis, Transpiration & Photosynthesis), Human Circulatory & Excretory systems (Nephron & Ultrafiltration), and Endocrine glands.',
    icon: 'Dna',
    color: 'from-green-600 to-emerald-800',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  },
  {
    id: 'sub-history-civics-icse',
    name: 'ICSE History & Civics (H.C.G. Paper 1)',
    code: 'ICSE-HC-50',
    slug: 'history-civics',
    grade: 10,
    board: 'ICSE',
    category: 'Social Studies',
    description: 'The Union Parliament & Supreme Court, Revolt of 1857, Indian National Movement, World War I, Rise of Dictatorships (Fascism & Nazism), and United Nations.',
    icon: 'Landmark',
    color: 'from-purple-600 to-pink-700',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  },
  {
    id: 'sub-geography-icse',
    name: 'ICSE Geography (H.C.G. Paper 2)',
    code: 'ICSE-GEO-50',
    slug: 'geography-economics',
    grade: 10,
    board: 'ICSE',
    category: 'Social Studies',
    description: 'Topographical Maps (6-figure grid & contours), Climate of India (Monsoons), Soil & Water Resources, Mineral & Energy belts, and Agro/Mineral Industries.',
    icon: 'Globe',
    color: 'from-cyan-600 to-blue-700',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  },
  {
    id: 'sub-english-icse',
    name: 'ICSE English: Julius Caesar & Treasure Chest',
    code: 'ICSE-ENG-01',
    slug: 'english',
    grade: 10,
    board: 'ICSE',
    category: 'English',
    description: 'William Shakespeare Julius Caesar (Act III & IV), Treasure Chest poems and short stories, Notice & Email writing, and Functional Grammar synthesis.',
    icon: 'BookOpen',
    color: 'from-rose-500 to-red-700',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  }
];

// ==========================================
// 3. STATE BOARD SUBJECTS (SCERT ALIGNED)
// ==========================================
export const STATE_SUBJECTS: Subject[] = [
  {
    id: 'sub-math-state',
    name: 'State Board Mathematics & Sets',
    code: 'STATE-MATH-10',
    slug: 'mathematics',
    grade: 10,
    board: 'STATE',
    category: 'Math',
    description: 'Real Numbers & Sets, Progressions (AP & GP), Coordinate Geometry Area of Triangles, Similar Triangles, and Statistics grouped data.',
    icon: 'Calculator',
    color: 'from-blue-600 to-indigo-700',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  },
  {
    id: 'sub-physical-science-state',
    name: 'State Board Physical Science (Physics & Chem)',
    code: 'STATE-PS-10',
    slug: 'physics',
    grade: 10,
    board: 'STATE',
    category: 'Science',
    description: 'Heat & Thermodynamics, Atomic Structure (Quantum numbers), Periodic Classification, Kirchhoff’s Laws & Electromagnetism, and Principles of Metallurgy.',
    icon: 'Zap',
    color: 'from-amber-500 to-orange-600',
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  },
  {
    id: 'sub-chemistry-state',
    name: 'State Board Chemical Sciences & Metallurgy',
    code: 'STATE-CHEM-10',
    slug: 'chemistry',
    grade: 10,
    board: 'STATE',
    category: 'Science',
    description: 'Chemical Equations, Acids, Bases & Salts, Structure of Atom, Chemical Bonding, Principles of Metallurgy (Roasting & Calcination), and Carbon Compounds.',
    icon: 'FlaskConical',
    color: 'from-emerald-600 to-teal-700',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  },
  {
    id: 'sub-biological-science-state',
    name: 'State Board Biological Science',
    code: 'STATE-BS-10',
    slug: 'biology',
    grade: 10,
    board: 'STATE',
    category: 'Science',
    description: 'Nutrition (Autotrophic & Heterotrophic), Respiration (Cellular glycolysis), Transport (Blood & Lymph), Excretion (Nephron & Dialysis), and Coordination in Life Processes.',
    icon: 'Dna',
    color: 'from-green-600 to-emerald-800',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  },
  {
    id: 'sub-social-studies-state',
    name: 'State Board Social Studies (History & Civics)',
    code: 'STATE-SS-10',
    slug: 'history-civics',
    grade: 10,
    board: 'STATE',
    category: 'Social Studies',
    description: 'India: Relief Features & Rivers, World Between Wars 1900-1950, National Movement in India & Partition, The Making of India’s Constitution, and Social Movements.',
    icon: 'Landmark',
    color: 'from-purple-600 to-pink-700',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  },
  {
    id: 'sub-geography-state',
    name: 'State Board Geography & Economics',
    code: 'STATE-GEO-10',
    slug: 'geography-economics',
    grade: 10,
    board: 'STATE',
    category: 'Social Studies',
    description: 'Relief Features of India, Climate, People & Migration, Rampur Village Economy, National Income, and Public Distribution System Food Security.',
    icon: 'Globe',
    color: 'from-cyan-600 to-blue-700',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  },
  {
    id: 'sub-english-state',
    name: 'State Board English & Personality Development',
    code: 'STATE-ENG-10',
    slug: 'english',
    grade: 10,
    board: 'STATE',
    category: 'English',
    description: 'Attitude is Altitude (Nick Vujicic), Human Relations & Heritage, Active/Passive Voice, Reported Speech, Diary Entries, and Biographical Sketches.',
    icon: 'BookOpen',
    color: 'from-rose-500 to-red-700',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&auto=format&fit=crop&q=80',
    chaptersCount: 5,
    completedChaptersCount: 0,
  }
];

export const SUBJECTS: Subject[] = CBSE_SUBJECTS;

export const getSubjectsForBoard = (board: Board = 'CBSE'): Subject[] => {
  if (board === 'ICSE') return ICSE_SUBJECTS;
  if (board === 'STATE') return STATE_SUBJECTS;
  return CBSE_SUBJECTS;
};

// ==========================================
// ALL CHAPTERS DATASET (5+ CHAPTERS PER SUBJECT)
// ==========================================
export const CHAPTERS: Chapter[] = [
  // =============================================================
  // 1. CBSE CHAPTERS (7 SUBJECTS X 5 CHAPTERS = 35 CHAPTERS)
  // =============================================================

  // --- CBSE MATHEMATICS ---
  {
    id: 'chap-math-1',
    subjectId: 'sub-math',
    board: 'CBSE',
    chapterNumber: 1,
    unitName: 'Unit 1: Number Systems',
    title: 'Real Numbers & Fundamental Theorem',
    description: 'Fundamental Theorem of Arithmetic, proving irrationality of √2, √3, √5, and prime factorisation HCF/LCM.',
    estHours: 4.5,
    totalQuestions: 24,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['Fundamental Theorem of Arithmetic', 'Irrationality Proofs (√p)', 'HCF & LCM Prime Factorisation'],
    formulaList: [
      '\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b',
      '\\text{If } p \\text{ divides } a^2, \\text{ then } p \\text{ divides } a'
    ],
    conceptImage: '/concepts/math_trig_3d.jpg',
    conceptNotes: 'Every composite number can be uniquely factored as a product of primes. To prove that √5 is irrational, assume on the contrary that √5 = a/b (co-prime integers), square both sides to show 5 divides both a and b, which contradicts the co-prime assumption.',
    workedExample: {
      problem: 'Prove that \\sqrt{5} is an irrational number (CBSE 3-Mark Question).',
      solution: '1. Assume on the contrary that $\\sqrt{5}$ is rational: $\\sqrt{5} = \\frac{a}{b}$ where $a, b$ are co-prime integers.\n2. $5 = \\frac{a^2}{b^2} \\implies a^2 = 5b^2$. Since 5 divides $a^2$, 5 divides $a$. Let $a = 5c$.\n3. Substitute: $(5c)^2 = 5b^2 \\implies 25c^2 = 5b^2 \\implies b^2 = 5c^2$. So 5 divides $b$.\n4. 5 divides both $a$ and $b$, contradicting co-primality. Therefore, $\\sqrt{5}$ is irrational. [Q.E.D.]',
      boardTip: 'State the co-prime assumption clearly in line 1 to get full step marks.'
    }
  },
  {
    id: 'chap-math-2',
    subjectId: 'sub-math',
    board: 'CBSE',
    chapterNumber: 2,
    unitName: 'Unit 2: Algebra',
    title: 'Polynomials & Relations of Zeroes',
    description: 'Zeroes of quadratic polynomials, sum and product of zeroes, and forming quadratic equations.',
    estHours: 5.0,
    totalQuestions: 28,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Zeroes of Quadratic Polynomials', 'Relationship Between Zeroes & Coefficients', 'Forming Quadratic Polynomials'],
    formulaList: [
      '\\alpha + \\beta = -\\frac{b}{a}',
      '\\alpha \\cdot \\beta = \\frac{c}{a}',
      'p(x) = k [x^2 - (\\alpha + \\beta)x + \\alpha \\beta]'
    ],
    conceptImage: '/concepts/math_algebra_3d.jpg',
    conceptNotes: 'For a quadratic polynomial ax² + bx + c (a ≠ 0), the sum of zeroes is α + β = -b/a and product of zeroes is αβ = c/a. To form a quadratic polynomial with roots α, β: p(x) = k[x² - (α+β)x + αβ].',
    workedExample: {
      problem: 'Find the zeroes of $p(x) = 6x^2 - 7x - 3$ and verify the zeroes-coefficients relationship.',
      solution: '1. Factorise: $6x^2 - 9x + 2x - 3 = 3x(2x - 3) + 1(2x - 3) = (2x - 3)(3x + 1) = 0$.\n2. Zeroes: $\\alpha = \\frac{3}{2}$ and $\\beta = -\\frac{1}{3}$.\n3. Verification:\n   - $\\alpha + \\beta = \\frac{3}{2} - \\frac{1}{3} = \\frac{7}{6} = -\\frac{b}{a}$. (Verified)\n   - $\\alpha \\beta = \\frac{3}{2} \\times \\left(-\\frac{1}{3}\\right) = -\\frac{1}{2} = \\frac{c}{a}$. (Verified)',
      boardTip: 'Always rearrange terms in standard form ax² + bx + c before splitting the middle term.'
    }
  },
  {
    id: 'chap-math-3',
    subjectId: 'sub-math',
    board: 'CBSE',
    chapterNumber: 3,
    unitName: 'Unit 2: Algebra',
    title: 'Pair of Linear Equations in Two Variables',
    description: 'Graphical solution, substitution and elimination methods, and consistent/inconsistent conditions.',
    estHours: 6.0,
    totalQuestions: 30,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Consistent & Inconsistent Systems', 'Elimination & Substitution Methods', 'Upstream/Downstream Word Problems'],
    formulaList: [
      '\\text{Unique Solution}: \\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}',
      '\\text{Infinite Solutions}: \\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}',
      '\\text{No Solution (Parallel)}: \\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}'
    ],
    conceptImage: '/concepts/math_algebra_3d.jpg',
    conceptNotes: 'Two linear equations represent intersecting lines (unique solution), coincident lines (infinite solutions), or parallel lines (no solution). For speed problems: Downstream Speed = x + y, Upstream Speed = x - y.',
    workedExample: {
      problem: 'A boat goes 30 km upstream and 44 km downstream in 10 hours. Find speed of boat in still water (x) and stream (y).',
      solution: '1. Let boat speed = x km/h, stream speed = y km/h. Let 1/(x-y) = u and 1/(x+y) = v.\n2. Equations: 30u + 44v = 10 and 40u + 55v = 13.\n3. Solving gives u = 1/5 and v = 1/11.\n4. Therefore x - y = 5 and x + y = 11. Adding gives 2x = 16 => x = 8 km/h, y = 3 km/h.',
      boardTip: 'Substitute u = 1/(x-y) and v = 1/(x+y) first to avoid complicated fraction solving.'
    }
  },
  {
    id: 'chap-math-4',
    subjectId: 'sub-math',
    board: 'CBSE',
    chapterNumber: 4,
    unitName: 'Unit 2: Algebra',
    title: 'Quadratic Equations & Discriminant',
    description: 'Standard form ax² + bx + c = 0, quadratic formula, nature of roots via Discriminant D = b² - 4ac.',
    estHours: 6.5,
    totalQuestions: 32,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Discriminant (D = b² - 4ac)', 'Nature of Roots (Real & Equal, Distinct, No Real Roots)', 'Quadratic Formula'],
    formulaList: [
      'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      'D > 0 \\implies \\text{Two distinct real roots}',
      'D = 0 \\implies \\text{Two equal real roots}'
    ],
    conceptImage: '/concepts/math_algebra_3d.jpg',
    conceptNotes: 'The nature of roots is determined by the discriminant D = b² - 4ac. If D = 0, the equation has real and equal roots x = -b/(2a). If D < 0, no real roots exist.',
    workedExample: {
      problem: 'Find the values of k for which 2x² + kx + 3 = 0 has two equal real roots.',
      solution: '1. For equal roots: D = b² - 4ac = 0.\n2. Here a = 2, b = k, c = 3.\n3. k² - 4(2)(3) = 0 => k² - 24 = 0 => k = ±√24 = ±2√6.',
      boardTip: 'Remember to write both + and - values for square roots.'
    }
  },
  {
    id: 'chap-math-5',
    subjectId: 'sub-math',
    board: 'CBSE',
    chapterNumber: 5,
    unitName: 'Unit 4: Geometry & Trigonometry',
    title: 'Introduction to Trigonometry & Identities',
    description: 'Trigonometric ratios of acute angles, standard angles (0°, 30°, 45°, 60°, 90°), and Pythagorean trig identities.',
    estHours: 7.0,
    totalQuestions: 35,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Trigonometric Ratios (sin, cos, tan, csc, sec, cot)', 'Standard Angle Table', 'Core Identities Proofs'],
    formulaList: [
      '\\sin^2\\theta + \\cos^2\\theta = 1',
      '1 + \\tan^2\\theta = \\sec^2\\theta',
      '1 + \\cot^2\\theta = \\csc^2\\theta'
    ],
    conceptImage: '/concepts/math_trig_3d.jpg',
    conceptNotes: 'In a right-angled triangle: sin θ = Opposite / Hypotenuse, cos θ = Adjacent / Hypotenuse, tan θ = Opposite / Adjacent. Key Pythagorean identity: sin²θ + cos²θ = 1.',
    workedExample: {
      problem: 'Prove that (sin A + csc A)² + (cos A + sec A)² = 7 + tan²A + cot²A (CBSE 4-Mark Question).',
      solution: '1. Expand LHS: sin²A + csc²A + 2 sin A csc A + cos²A + sec²A + 2 cos A sec A.\n2. Group: (sin²A + cos²A) + 2(1) + 2(1) + csc²A + sec²A = 1 + 4 + csc²A + sec²A = 5 + csc²A + sec²A.\n3. Replace: csc²A = 1 + cot²A and sec²A = 1 + tan²A.\n4. LHS = 5 + (1 + cot²A) + (1 + tan²A) = 7 + tan²A + cot²A = RHS. [Hence Proved]',
      boardTip: 'Substitute 2 sin A csc A = 2 immediately since sin A and csc A are reciprocals.'
    }
  },

  // --- CBSE PHYSICS ---
  {
    id: 'chap-phy-1',
    subjectId: 'sub-physics',
    board: 'CBSE',
    chapterNumber: 1,
    unitName: 'Theme: Natural Phenomena',
    title: 'Light – Reflection and Refraction',
    description: 'Spherical mirrors, Cartesian sign conventions, mirror formula, magnification, refraction laws, and lens formula.',
    estHours: 7.5,
    totalQuestions: 38,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Mirror Formula & Magnification', 'Refraction & Snell’s Law', 'Lens Formula & Power of Lens'],
    formulaList: [
      '\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}',
      'm = -\\frac{v}{u} = \\frac{h\'}{h}',
      'P = \\frac{1}{f\\text{ (in metres)}}'
    ],
    conceptImage: '/concepts/physics_optics_3d.jpg',
    conceptNotes: 'By Cartesian sign convention: object distance u is always negative; concave mirror focal length is negative, convex mirror focal length is positive. Power of lens P = 1/f (in metres) with unit Dioptre (D).',
    workedExample: {
      problem: 'A concave mirror produces a 3 times magnified real image of an object at 10 cm in front of it. Find image distance and focal length.',
      solution: '1. $u = -10\\text{ cm}$, real image $\\implies m = -3$.\n2. $m = -\\frac{v}{u} \\implies -3 = -\\frac{v}{-10} \\implies v = -30\\text{ cm}$.\n3. Mirror formula: $\\frac{1}{f} = \\frac{1}{-30} + \\frac{1}{-10} = \\frac{-4}{30} \\implies f = -7.5\\text{ cm}$.',
      boardTip: 'For real inverted images, magnification m must be taken negative.'
    }
  },
  {
    id: 'chap-phy-2',
    subjectId: 'sub-physics',
    board: 'CBSE',
    chapterNumber: 2,
    unitName: 'Theme: Natural Phenomena',
    title: 'The Human Eye & The Colourful World',
    description: 'Refraction through a prism, dispersion of white light, atmospheric refraction (twinkling of stars), and scattering of light (Tyndall effect).',
    estHours: 6.0,
    totalQuestions: 30,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Prism Dispersion (VIBGYOR)', 'Atmospheric Refraction (Advance Sunrise)', 'Tyndall Effect & Blue Sky'],
    formulaList: [
      '\\text{Scattering Intensity } I \\propto \\frac{1}{\\lambda^4} \\quad (\\text{Rayleigh\'s Law})',
      '\\text{Angle of Deviation } \\delta = i + e - A'
    ],
    conceptImage: '/concepts/physics_optics_3d.jpg',
    conceptNotes: 'Prism splits white light into 7 colors because red light has longest wavelength (deviates least) and violet light has shortest wavelength (deviates most). Rayleigh scattering explains why sky is blue (short blue wavelengths scatter most).',
    workedExample: {
      problem: 'Why do stars twinkle while planets do not? (CBSE 3-Mark Question).',
      solution: '1. Stars are point-sized distant light sources. As light travels through turbulent atmospheric layers of varying refractive index, the apparent position and brightness fluctuate continuously, causing twinkling.\n2. Planets are much closer and act as extended sources (collection of point sources). Fluctuations from different points average out to zero, so planets do not twinkle.',
      boardTip: 'Use the phrase "extended source vs point-sized source" in your answer.'
    }
  },
  {
    id: 'chap-phy-3',
    subjectId: 'sub-physics',
    board: 'CBSE',
    chapterNumber: 3,
    unitName: 'Theme: How Things Work',
    title: 'Electricity & Joule’s Heating Effect',
    description: 'Ohm’s law, factors affecting resistance, series and parallel resistor circuits, and electric power & energy.',
    estHours: 8.0,
    totalQuestions: 42,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Ohm’s Law (V = IR)', 'Series & Parallel Combinations', 'Joule’s Law of Heating (H = I²Rt)'],
    formulaList: [
      'V = IR',
      'R = \\rho \\frac{l}{A}',
      'H = I^2 R t',
      'P = VI = I^2 R = \\frac{V^2}{R}'
    ],
    conceptImage: '/concepts/physics_elec_3d.jpg',
    conceptNotes: 'Ohm’s Law states that current through a conductor is directly proportional to the potential difference across its ends at constant temperature: V = IR. Resistance R = ρ(l/A). Joule’s heating law gives heat produced as H = I²Rt.',
    workedExample: {
      problem: 'An electric heater of resistance 20 Ω takes a current of 5 A from the mains supply. Calculate the heat developed in 30 seconds.',
      solution: '1. Given: $R = 20\\,\\Omega$, $I = 5\\text{ A}$, $t = 30\\text{ s}$.\n2. By Joule’s heating law: $H = I^2 R t = (5)^2 \\times 20 \\times 30 = 25 \\times 600 = 15,000\\text{ Joules} = 15\\text{ kJ}$.',
      boardTip: 'Always convert time to seconds and express final energy in Joules or kJ with units.'
    }
  },
  {
    id: 'chap-phy-4',
    subjectId: 'sub-physics',
    board: 'CBSE',
    chapterNumber: 4,
    unitName: 'Theme: How Things Work',
    title: 'Magnetic Effects of Electric Current',
    description: 'Magnetic field around straight wire, circular loop, and solenoid; Fleming’s Left-Hand Rule; electric motor and electromagnetic induction.',
    estHours: 7.0,
    totalQuestions: 34,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Right-Hand Thumb Rule', 'Magnetic Field in a Solenoid', 'Fleming’s Left-Hand Rule'],
    formulaList: [
      '\\text{Force on Current-Carrying Conductor}: F = B I l \\sin\\theta',
      '\\text{Thumb = Motion, Forefinger = Field, Center Finger = Current (FBI)}'
    ],
    conceptImage: '/concepts/physics_elec_3d.jpg',
    conceptNotes: 'A current-carrying solenoid produces a uniform magnetic field inside identical to a bar magnet. Fleming’s Left-Hand Rule gives force direction: Forefinger = Field, Middle = Current, Thumb = Force/Thrust.',
    workedExample: {
      problem: 'State Fleming’s Left-Hand Rule and mention one device based on it.',
      solution: '1. Stretch thumb, forefinger, and middle finger of left hand mutually perpendicular. If forefinger points in direction of magnetic field and middle finger in direction of current, thumb points in direction of motion/force.\n2. Device: Electric Motor.',
      boardTip: 'Remember: Fleming’s Left-Hand Rule is for motors, Right-Hand Rule is for generators/induction.'
    }
  },
  {
    id: 'chap-phy-5',
    subjectId: 'sub-physics',
    board: 'CBSE',
    chapterNumber: 5,
    unitName: 'Theme: Natural Resources',
    title: 'Sources of Energy & Sustainable Power',
    description: 'Conventional sources (fossil fuels, thermal, hydro) vs non-conventional sources (solar, wind, biogas, nuclear).',
    estHours: 5.0,
    totalQuestions: 25,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['Solar Cells & Photovoltaic Effect', 'Biogas Plant Working', 'Nuclear Fission & Safety'],
    formulaList: [
      '\\text{Efficiency} = \\frac{\\text{Useful Energy Output}}{\\text{Total Energy Input}} \\times 100\\%'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'Biogas (primarily methane 75%) is generated by anaerobic decomposition of animal dung and organic slurry in a dome-type plant, leaving nutrient-rich manure.',
    workedExample: {
      problem: 'What are the advantages of using a biogas plant in rural communities?',
      solution: '1. Clean burning fuel without smoke or residue.\n2. Produces high calorific value methane gas for cooking.\n3. Slurry left behind is rich in nitrogen and phosphorus, acting as organic fertilizer.',
      boardTip: 'Highlight methane composition (up to 75%) and organic manure byproduct.'
    }
  },

  // --- CBSE CHEMISTRY ---
  {
    id: 'chap-chem-1',
    subjectId: 'sub-chemistry',
    board: 'CBSE',
    chapterNumber: 1,
    unitName: 'Theme: Chemical Substances',
    title: 'Chemical Reactions and Equations',
    description: 'Balancing chemical equations, types of chemical reactions (Combination, Decomposition, Displacement, Redox).',
    estHours: 6.0,
    totalQuestions: 32,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Balancing Redox Reactions', 'Oxidising & Reducing Agents', 'Precipitation & Corrosion'],
    formulaList: [
      '\\text{Oxidation} = \\text{Gain of } \\text{O}_2 \\text{ / Loss of } \\text{H}_2',
      '\\text{Reduction} = \\text{Loss of } \\text{O}_2 \\text{ / Gain of } \\text{H}_2'
    ],
    conceptImage: '/concepts/chem_molecules_3d.jpg',
    conceptNotes: 'In a redox reaction: the substance that gains oxygen/loses hydrogen is oxidised; the substance that loses oxygen/gains hydrogen is reduced. The oxidising agent provides oxygen or removes hydrogen.',
    workedExample: {
      problem: 'In $\\text{MnO}_2 + 4\\text{HCl} \\rightarrow \\text{MnCl}_2 + 2\\text{H}_2\\text{O} + \\text{Cl}_2$, identify substance oxidised and reducing agent.',
      solution: '1. $\\text{HCl}$ loses hydrogen to form $\\text{Cl}_2 \\implies \\text{HCl}$ is oxidised.\n2. The substance oxidised is the reducing agent $\\implies \\text{HCl}$ is the reducing agent.\n3. $\\text{MnO}_2$ is reduced and acts as the oxidising agent.',
      boardTip: 'Identify oxidising/reducing agents strictly from the reactant side.'
    }
  },
  {
    id: 'chap-chem-2',
    subjectId: 'sub-chemistry',
    board: 'CBSE',
    chapterNumber: 2,
    unitName: 'Theme: Chemical Substances',
    title: 'Acids, Bases and Salts & pH Scale',
    description: 'pH scale, universal indicator, Chlor-alkali process, Bleaching powder, Baking soda, and Plaster of Paris.',
    estHours: 7.0,
    totalQuestions: 36,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['pH Scale (0 to 14)', 'Chlor-Alkali Process (NaOH, Cl₂, H₂)', 'Plaster of Paris & Gypsum'],
    formulaList: [
      '\\text{pH} = -\\log[\\text{H}^+]',
      '\\text{CaSO}_4 \\cdot \\frac{1}{2}\\text{H}_2\\text{O} + 1\\frac{1}{2}\\text{H}_2\\text{O} \\rightarrow \\text{CaSO}_4 \\cdot 2\\text{H}_2\\text{O}'
    ],
    conceptImage: '/concepts/chem_acids_metal_3d.jpg',
    conceptNotes: 'pH < 7 indicates acidic solutions, pH = 7 neutral, and pH > 7 basic. In the Chlor-alkali electrolysis of brine: Chlorine gas forms at anode, Hydrogen gas at cathode, and Sodium Hydroxide in solution.',
    workedExample: {
      problem: 'Explain the preparation of Plaster of Paris from Gypsum and write the balanced equation.',
      solution: '1. Preparation: Gypsum is heated carefully at 373 K (100°C) where it loses water of crystallisation.\n2. Reaction: $\\text{CaSO}_4 \\cdot 2\\text{H}_2\\text{O} \\xrightarrow{373\\text{ K}} \\text{CaSO}_4 \\cdot \\frac{1}{2}\\text{H}_2\\text{O} + 1\\frac{1}{2}\\text{H}_2\\text{O}$.\n3. Precaution: Temperature must not exceed 373 K, otherwise anhydrous dead burnt plaster is formed.',
      boardTip: 'Specify 373 K temperature condition to get full step credit.'
    }
  },
  {
    id: 'chap-chem-3',
    subjectId: 'sub-chemistry',
    board: 'CBSE',
    chapterNumber: 3,
    unitName: 'Theme: Chemical Substances',
    title: 'Metals and Non-metals & Metallurgy',
    description: 'Reactivity series, ionic bonding properties, metallurgy extraction (Roasting, Calcination), and corrosion prevention.',
    estHours: 7.5,
    totalQuestions: 38,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Reactivity Series of Metals', 'Calcination vs Roasting', 'Ionic Bond Formation (NaCl, MgCl₂)'],
    formulaList: [
      '\\text{Roasting (Sulphide Ores)}: 2\\text{ZnS} + 3\\text{O}_2 \\xrightarrow{\\Delta} 2\\text{ZnO} + 2\\text{SO}_2',
      '\\text{Calcination (Carbonate Ores)}: \\text{ZnCO}_3 \\xrightarrow{\\Delta} \\text{ZnO} + \\text{CO}_2'
    ],
    conceptImage: '/concepts/chem_acids_metal_3d.jpg',
    conceptNotes: 'Roasting heats sulphide ores in excess air; Calcination heats carbonate ores in limited air. Ionic compounds have high melting points due to strong electrostatic attraction between opposite ions.',
    workedExample: {
      problem: 'Differentiate between Roasting and Calcination with balanced chemical equations for Zinc ores.',
      solution: '1. Roasting: Sulphide ore heated strongly in presence of excess air: $2\\text{ZnS} + 3\\text{O}_2 \\xrightarrow{\\Delta} 2\\text{ZnO} + 2\\text{SO}_2$.\n2. Calcination: Carbonate ore heated in limited air: $\\text{ZnCO}_3 \\xrightarrow{\\Delta} \\text{ZnO} + \\text{CO}_2$.\n3. Zinc oxide is subsequently reduced using coke carbon.',
      boardTip: 'Always mention "excess air" for roasting and "limited/absence of air" for calcination.'
    }
  },
  {
    id: 'chap-chem-4',
    subjectId: 'sub-chemistry',
    board: 'CBSE',
    chapterNumber: 4,
    unitName: 'Theme: Chemical Substances',
    title: 'Carbon and its Compounds & Soaps',
    description: 'Covalent bonding, homologous series, functional groups, esterification, saponification, and cleansing action of soaps.',
    estHours: 8.5,
    totalQuestions: 44,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Esterification & Saponification', 'Functional Groups IUPAC', 'Micelle Cleansing Action'],
    formulaList: [
      '\\text{CH}_3\\text{COOH} + \\text{C}_2\\text{H}_5\\text{OH} \\xrightarrow{\\text{conc. } \\text{H}_2\\text{SO}_4} \\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{H}_2\\text{O}',
      '\\text{Soap} = \\text{R-COO}^- \\text{Na}^+'
    ],
    conceptImage: '/concepts/chem_molecules_3d.jpg',
    conceptNotes: 'Ethanol reacts with ethanoic acid in the presence of conc. H₂SO₄ catalyst to form sweet-smelling Ethyl Ethanoate ester. Alkaline hydrolysis of esters produces soap in a reaction called saponification. Soap molecules form spherical micelles with hydrophobic tails in oil droplets and hydrophilic ionic heads in water.',
    workedExample: {
      problem: 'Write chemical equation for the reaction of Ethanoic acid with Ethanol. What is the role of concentrated sulphuric acid?',
      solution: '1. Equation: $\\text{CH}_3\\text{COOH} + \\text{C}_2\\text{H}_5\\text{OH} \\xrightarrow{\\text{conc. } \\text{H}_2\\text{SO}_4} \\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{H}_2\\text{O}$.\n2. Role of conc. $\\text{H}_2\\text{SO}_4$: Acts as an acidic catalyst and a dehydrating agent that absorbs water, driving the equilibrium forward.',
      boardTip: 'Mentioning that concentrated sulphuric acid acts as a dehydrating agent secures full marks.'
    }
  },
  {
    id: 'chap-chem-5',
    subjectId: 'sub-chemistry',
    board: 'CBSE',
    chapterNumber: 5,
    unitName: 'Theme: Chemical Substances',
    title: 'Periodic Classification & Atomic Trends',
    description: 'Modern Periodic Table, Moseley’s law, periodic trends in atomic radius, valency, metallic and non-metallic character.',
    estHours: 6.0,
    totalQuestions: 30,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Modern Periodic Law (Atomic Number)', 'Atomic Radius Trends across Period/Group', 'Metallic & Non-Metallic Character'],
    formulaList: [
      '\\text{Across a Period (Left to Right)}: \\text{Atomic Radius Decreases, Electronegativity Increases}',
      '\\text{Down a Group}: \\text{Atomic Radius Increases, Metallic Character Increases}'
    ],
    conceptImage: '/concepts/chem_molecules_3d.jpg',
    conceptNotes: 'Modern Periodic Law states that properties of elements are periodic functions of their atomic numbers. Atomic size decreases across a period due to increased effective nuclear charge pulling electrons closer.',
    workedExample: {
      problem: 'Why does atomic radius decrease across a period from left to right?',
      solution: '1. Number of electron shells remains the same across a period.\n2. Nuclear charge (number of protons) increases by +1 unit at each successive element.\n3. Increased effective nuclear pull attracts valence electrons closer to the nucleus, reducing atomic size.',
      boardTip: 'State that electron shell number remains constant while nuclear charge increases.'
    }
  },

  // --- CBSE BIOLOGY ---
  {
    id: 'chap-bio-1',
    subjectId: 'sub-biology',
    board: 'CBSE',
    chapterNumber: 1,
    unitName: 'Theme: World of Living',
    title: 'Life Processes: Respiration & Double Circulation',
    description: 'Autotrophic/heterotrophic nutrition, 3-pathway breakdown of glucose in mitochondria, double circulation in human heart, and nephron filtration.',
    estHours: 8.0,
    totalQuestions: 40,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Double Circulation & Heart Valves', '3 Pathways of Glucose Breakdown', 'Structure & Function of Nephron'],
    formulaList: [
      '\\text{Glucose (6C)} \\xrightarrow{\\text{Cytoplasm}} 2 \\times \\text{Pyruvate (3C)} + \\text{Energy}',
      '\\text{Aerobic (Mitochondria)} \\rightarrow 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + 38\\text{ ATP}'
    ],
    conceptImage: '/concepts/bio_heart_3d.jpg',
    conceptNotes: 'Glucose is converted to pyruvate in the cytoplasm. In the presence of oxygen (aerobic respiration in mitochondria), pyruvate breaks down into carbon dioxide, water, and ATP. In lack of oxygen in human muscles during vigorous exercise, pyruvate produces lactic acid, causing cramps. The human heart exhibits double circulation (pulmonary and systemic) preventing mixing of oxygenated and deoxygenated blood.',
    workedExample: {
      problem: 'Explain the 3 pathways of glucose breakdown in living organisms (CBSE 5-Mark Question).',
      solution: '1. In cytoplasm: Glucose (6-carbon) breaks down into Pyruvate (3-carbon) + Energy.\n2. Pathway 1 (Anaerobic in Yeast): Pyruvate $\\rightarrow$ Ethanol + $\\text{CO}_2$ + Energy (Fermentation).\n3. Pathway 2 (Lack of $\\text{O}_2$ in Muscle Cells): Pyruvate $\\rightarrow$ Lactic acid + Energy (causes muscle cramps).\n4. Pathway 3 (Aerobic in Mitochondria): Pyruvate $+ \\text{O}_2 \\rightarrow \\text{CO}_2 + \\text{H}_2\\text{O} +$ 38 ATP energy.',
      boardTip: 'Always draw the flowchart showing Cytoplasm $\\rightarrow$ Pyruvate branching into the 3 conditions.'
    }
  },
  {
    id: 'chap-bio-2',
    subjectId: 'sub-biology',
    board: 'CBSE',
    chapterNumber: 2,
    unitName: 'Theme: World of Living',
    title: 'Control and Coordination & Plant Hormones',
    description: 'Human nervous system, reflex arcs, brain anatomy, plant phytohormones (Auxin, Cytokinin, ABA), and tropisms.',
    estHours: 7.0,
    totalQuestions: 34,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Reflex Arc Pathway', 'Plant Hormones (Auxin, Cytokinin, ABA)', 'Phototropism & Geotropism'],
    formulaList: [
      '\\text{Reflex Arc}: \\text{Receptor} \\rightarrow \\text{Sensory Neuron} \\rightarrow \\text{Spinal Cord} \\rightarrow \\text{Motor Neuron} \\rightarrow \\text{Effector}'
    ],
    conceptImage: '/concepts/bio_genetics_3d.jpg',
    conceptNotes: 'A reflex arc is the nerve pathway involved in rapid automatic reflex actions. Auxin stimulates cell elongation towards sunlight; Cytokinins promote rapid cell division in fruits/seeds; Abscisic acid (ABA) promotes leaf fall and stomatal closure.',
    workedExample: {
      problem: 'Trace the sequence of events when your hand accidentally touches a hot object.',
      solution: '1. Receptors in skin detect heat stimulus.\n2. Sensory neuron carries electrical impulse to spinal cord.\n3. Relay neuron transfers signal to motor neuron.\n4. Motor neuron stimulates effector muscle in arm to contract instantly.',
      boardTip: 'Highlight that reflex actions are processed in the spinal cord before reaching the brain.'
    }
  },
  {
    id: 'chap-bio-3',
    subjectId: 'sub-biology',
    board: 'CBSE',
    chapterNumber: 3,
    unitName: 'Theme: World of Living',
    title: 'How do Organisms Reproduce & Flower Anatomy',
    description: 'Asexual reproduction (binary fission, budding, spore formation), sexual reproduction in flowering plants, and human reproductive health.',
    estHours: 7.5,
    totalQuestions: 36,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Flower Anatomy (Stamen & Carpel)', 'Double Fertilization & Pollination', 'Contraceptive Methods & Health'],
    formulaList: [
      '\\text{Double Fertilization} = (\\text{Egg} + \\text{Sperm} \\rightarrow \\text{Zygote}) + (\\text{Polar Nuclei} + \\text{Sperm} \\rightarrow \\text{Endosperm})'
    ],
    conceptImage: '/concepts/bio_genetics_3d.jpg',
    conceptNotes: 'Pollen grains germinate on the sticky stigma, sending pollen tubes down the style to the ovary. One male gamete fertilizes the female egg cell (syngamy forming 2n zygote) while the other fuses with secondary polar nuclei forming 3n endosperm.',
    workedExample: {
      problem: 'What is pollination? Differentiate between self-pollination and cross-pollination.',
      solution: '1. Pollination is the transfer of pollen grains from the anther to the stigma of a flower.\n2. Self-pollination: Transfer occurs within the same flower or another flower of the same plant.\n3. Cross-pollination: Transfer occurs between flowers on different plants of the same species, requiring external agents (wind, bees, water).',
      boardTip: 'Mention pollinators (wind, insects) for cross-pollination.'
    }
  },
  {
    id: 'chap-bio-4',
    subjectId: 'sub-biology',
    board: 'CBSE',
    chapterNumber: 4,
    unitName: 'Theme: World of Living',
    title: 'Heredity & Mendel’s Laws of Inheritance',
    description: 'Mendel’s monohybrid and dihybrid crosses, dominant and recessive alleles, and chromosomal sex determination in humans (XX/XY).',
    estHours: 7.5,
    totalQuestions: 35,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Mendel’s Monohybrid Cross (3:1)', 'Dihybrid Cross (9:3:3:1)', 'Human Sex Determination (XX vs XY)'],
    formulaList: [
      '\\text{Monohybrid Phenotypic Ratio} = 3 : 1, \\quad \\text{Genotypic Ratio} = 1 : 2 : 1',
      '\\text{Dihybrid Phenotypic Ratio} = 9 : 3 : 3 : 1',
      '\\text{Male Gametes}: 50\\% \\text{ X} + 50\\% \\text{ Y} \\implies 1:1 \\text{ Sex Ratio}'
    ],
    conceptImage: '/concepts/bio_genetics_3d.jpg',
    conceptNotes: 'Mendel crossed pure tall (TT) and dwarf (tt) pea plants; all F1 were tall (Tt), and F2 produced 3 tall : 1 dwarf. Sex determination in humans is determined entirely by the father’s sperm (carrying either X or Y chromosome).',
    workedExample: {
      problem: 'Explain with a cross how sex is determined in human beings (CBSE 3-Mark Question).',
      solution: '1. Females have XX sex chromosomes producing only X-carrying ova.\n2. Males have XY sex chromosomes producing 50% X-carrying and 50% Y-carrying sperm.\n3. If X-sperm fertilizes X-ovum -> XX (Female child).\n4. If Y-sperm fertilizes X-ovum -> XY (Male child).\n5. The probability of having a boy or girl is exactly 50% (1:1).',
      boardTip: 'Draw the genetic cross diagram with X and Y gamete branches.'
    }
  },
  {
    id: 'chap-bio-5',
    subjectId: 'sub-biology',
    board: 'CBSE',
    chapterNumber: 5,
    unitName: 'Theme: Natural Resources',
    title: 'Our Environment & Ecosystem Energy Flow',
    description: 'Trophic levels, 10% energy transfer law, biological magnification, and ozone layer depletion by CFCs.',
    estHours: 5.0,
    totalQuestions: 26,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['10% Energy Transfer Law (Lindeman)', 'Biological Magnification (Pesticide Accumulation)', 'Ozone Depletion by CFCs'],
    formulaList: [
      '\\text{Energy at Level } (n+1) = 10\\% \\times \\text{Energy at Level } n',
      '\\text{UV} + \\text{O}_2 \\rightarrow \\text{O} + \\text{O}; \\quad \\text{O} + \\text{O}_2 \\rightarrow \\text{O}_3 \\text{ (Ozone)}'
    ],
    conceptImage: '/concepts/bio_heart_3d.jpg',
    conceptNotes: 'According to Lindeman’s 10% law, only 10% of energy is transferred to the next higher trophic level. Non-biodegradable chemicals like DDT accumulate progressively at higher trophic levels (Biological Magnification), affecting top carnivores most.',
    workedExample: {
      problem: 'If 10,000 J of energy is available to producers, how much energy will be available to tertiary consumers in a 4-tier food chain?',
      solution: '1. Producers (Level 1) = 10,000 Joules.\n2. Primary Consumers (Herbivores) = 10% of 10,000 = 1,000 Joules.\n3. Secondary Consumers (Carnivores) = 10% of 1,000 = 100 Joules.\n4. Tertiary Consumers (Top Carnivores) = 10% of 100 = 10 Joules.',
      boardTip: 'Show energy calculations step by step for each trophic level.'
    }
  },

  // --- CBSE HISTORY & CIVICS ---
  {
    id: 'chap-hist-1',
    subjectId: 'sub-history-civics',
    board: 'CBSE',
    chapterNumber: 1,
    unitName: 'India and the Contemporary World - II',
    title: 'Nationalism in India & Dandi March',
    description: 'Rowlatt Act, Non-Cooperation Movement, Khilafat issue, Civil Disobedience Movement, and the sense of collective belonging.',
    estHours: 7.0,
    totalQuestions: 35,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Non-Cooperation vs Civil Disobedience', 'Salt March & Dandi Satyagraha', 'Simon Commission & Poona Pact 1932'],
    formulaList: [
      '\\text{Non-Cooperation (1920-22)}: \\text{Refusal to cooperate with colonial laws}',
      '\\text{Civil Disobedience (1930-34)}: \\text{Actively breaking unjust colonial laws (Salt Law)}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'Mahatma Gandhi launched the Non-Cooperation Movement (1920) advocating surrender of titles, boycott of civil services, army, police, foreign goods, and schools. Civil Disobedience (1930) began with the 240-mile Salt March from Sabarmati to Dandi, breaking the British salt monopoly. The movement mobilized peasants, industrialists, and women across India.',
    workedExample: {
      problem: 'Explain how the Civil Disobedience Movement was different from the Non-Cooperation Movement (CBSE 5-Mark Question).',
      solution: '1. Scope of Action: Non-Cooperation (1920) aimed at non-participation and boycotting British institutions, whereas Civil Disobedience (1930) involved deliberately breaking colonial laws (e.g. Salt Law, forest laws).\n2. Participation: Civil Disobedience saw unprecedented mass participation of women, merchant industrialists (GD Birla), and rich peasants (Patidars), but had lower Muslim participation compared to the Khilafat-backed 1920 movement.\n3. Goal: 1920 aimed at Swaraj, whereas 1930 explicitly demanded Purna Swaraj (Complete Independence).',
      boardTip: 'Structure comparative 5-mark history answers into bullet points with clear headings.'
    }
  },
  {
    id: 'chap-hist-2',
    subjectId: 'sub-history-civics',
    board: 'CBSE',
    chapterNumber: 2,
    unitName: 'India and the Contemporary World - II',
    title: 'The Rise of Nationalism in Europe',
    description: 'Frederic Sorrieu vision, Napoleonic Code 1804, Liberal Nationalism, Unification of Germany (Bismarck) and Italy (Cavour/Garibaldi).',
    estHours: 7.5,
    totalQuestions: 36,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Napoleonic Code (Civil Code 1804)', 'Unification of Germany (Otto von Bismarck)', 'Unification of Italy (Mazzini, Cavour, Garibaldi)'],
    formulaList: [
      '\\text{Civil Code 1804}: \\text{Abolished privileges based on birth, equality before law, secured property rights}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'The Civil Code of 1804 (Napoleonic Code) established legal equality and uniform weights/measures across French-ruled territories. Bismarck used Prussian military strength in three wars against Denmark, Austria, and France to unify Germany under Kaiser William I.',
    workedExample: {
      problem: 'What were the main provisions of the Napoleonic Code of 1804?',
      solution: '1. Abolished all feudal privileges based on birth.\n2. Established equality of all citizens before the law.\n3. Secured the fundamental right to private property.\n4. Simplified administrative divisions and abolished the guild restrictions in towns.\n5. Standardized weights, measures, and currency.',
      boardTip: 'List the 5 provisions under separate numbered bullet points.'
    }
  },
  {
    id: 'chap-hist-3',
    subjectId: 'sub-history-civics',
    board: 'CBSE',
    chapterNumber: 3,
    unitName: 'Democratic Politics - II',
    title: 'Power Sharing in Democracies',
    description: 'Belgium vs Sri Lanka power-sharing models, horizontal vs vertical power sharing, and linguistic accommodations.',
    estHours: 5.5,
    totalQuestions: 28,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['Belgium Model vs Sri Lanka Majoritarianism', 'Horizontal Power Sharing (Organs of Govt)', 'Vertical Power Sharing (Federal Levels)'],
    formulaList: [
      '\\text{Horizontal}: \\text{Legislature} \\leftrightarrow \\text{Executive} \\leftrightarrow \\text{Judiciary}',
      '\\text{Vertical}: \\text{Central Govt} \\rightarrow \\text{State Govt} \\rightarrow \\text{Local Panchayats}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'Power sharing is essential to democracy. Belgium accommodated Dutch and French speakers by equal ministerial representation, whereas Sri Lanka’s 1956 Sinhala Only Act alienated Tamil minorities, causing civil war.',
    workedExample: {
      problem: 'Why is power sharing desirable in democracies? Give prudential and moral reasons.',
      solution: '1. Prudential Reason: Reduces possibility of conflict and violence between diverse social groups, ensuring political stability.\n2. Moral Reason: Power sharing is the very spirit of democracy; citizens have a legitimate right to be consulted on how they are governed.',
      boardTip: 'Distinguish clearly between "Prudential" (outcome-based) and "Moral" (value-based) reasons.'
    }
  },
  {
    id: 'chap-hist-4',
    subjectId: 'sub-history-civics',
    board: 'CBSE',
    chapterNumber: 4,
    unitName: 'Democratic Politics - II',
    title: 'Federalism & Decentralisation',
    description: '3-fold legislative distribution (Union, State, Concurrent Lists), coalition politics, and the 1992 Local Self-Government Amendment.',
    estHours: 6.0,
    totalQuestions: 30,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Union, State & Concurrent Lists', 'Decentralisation Act 1992', 'Linguistic States & Language Policy'],
    formulaList: [
      '\\text{Union List (Defence, Foreign)} + \\text{State List (Police, Agri)} + \\text{Concurrent List (Education)}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'In India, the Constitution distributes power into Union List (Central Parliament), State List (State Assemblies), and Concurrent List (Both). The 1992 Amendment reserved 1/3rd of all local seats for women and established State Election Commissions.',
    workedExample: {
      problem: 'What are the key features of the 1992 Constitutional Amendment on Decentralisation in India?',
      solution: '1. Mandatory regular elections to local government bodies (Panchayats and Municipalities).\n2. Reservation of at least one-third (33%) of all seats for women.\n3. Reservation of seats for Scheduled Castes (SC), Scheduled Tribes (ST), and OBCs.\n4. Creation of an independent State Election Commission in each state to conduct local elections.\n5. State governments must share revenue and powers with local bodies.',
      boardTip: 'State the mandatory 1/3rd women reservation and State Election Commission points explicitly.'
    }
  },
  {
    id: 'chap-hist-5',
    subjectId: 'sub-history-civics',
    board: 'CBSE',
    chapterNumber: 5,
    unitName: 'Democratic Politics - II',
    title: 'Political Parties & Election Dynamics',
    description: 'Functions of political parties, national vs state party criteria by Election Commission, and internal democracy challenges.',
    estHours: 6.0,
    totalQuestions: 30,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['Criteria for National Party (6% votes + 4 Lok Sabha seats)', 'Challenges to Political Parties (Dynastic, Money Power)', 'Reforming Political Parties'],
    formulaList: [
      '\\text{National Party Criteria}: 6\\% \\text{ votes in 4 states} + 4 \\text{ Lok Sabha seats}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'Political parties contest elections, shape public opinion, and form policies. Major challenges include lack of internal democracy, dynastic succession, role of money and muscle power, and lack of meaningful choice for voters.',
    workedExample: {
      problem: 'Examine any three challenges faced by political parties in India.',
      solution: '1. Lack of Internal Democracy: Concentration of power in top leaders without regular internal organizational elections or membership registers.\n2. Dynastic Succession: Unfair advantage given to family members of top leaders over meritorious grassroots workers.\n3. Influence of Money and Muscle Power: Parties nominate rich candidates or criminals who can fund expensive election campaigns.',
      boardTip: 'Highlight dynastic succession and money power as distinct challenges.'
    }
  },

  // --- CBSE GEOGRAPHY & ECONOMICS ---
  {
    id: 'chap-geo-1',
    subjectId: 'sub-geography-economics',
    board: 'CBSE',
    chapterNumber: 1,
    unitName: 'Contemporary India - II',
    title: 'Resources and Development & Soil Types',
    description: 'Classification of soils (Alluvial, Black, Red, Laterite), soil erosion control, and major crop seasons (Kharif, Rabi, Zaid).',
    estHours: 6.5,
    totalQuestions: 32,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Bangar vs Khadar Alluvial Soils', 'Black Soil & Cotton Cultivation', 'Soil Conservation (Contour Ploughing, Shelter Belts)'],
    formulaList: [
      '\\text{Kharif (Monsoon)}: \\text{Sown: June-July, Harvest: Sept-Oct (Rice, Maize, Cotton)}',
      '\\text{Rabi (Winter)}: \\text{Sown: Oct-Dec, Harvest: April-June (Wheat, Mustard, Gram)}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'Alluvial soil is divided into Bangar (older, less fertile, contains kankar nodules) and Khadar (newer, highly fertile flood plains). Black soil (Regur) is ideal for cotton. Rice requires high temperature (>25°C), high humidity, and rainfall above 100 cm.',
    workedExample: {
      problem: 'Differentiate between Bangar and Khadar soils (CBSE 3-Mark Question).',
      solution: '1. Age: Bangar is old alluvial soil deposited away from river valleys; Khadar is new alluvial soil deposited by annual river floods.\n2. Fertility: Khadar is much more fertile with finer soil particles; Bangar has higher concentration of calcareous kankar nodules.\n3. Location: Bangar is found on higher river terraces; Khadar is found in low-lying active flood plains.',
      boardTip: 'Tabulate the differences under Age, Fertility, and Texture.'
    }
  },
  {
    id: 'chap-geo-2',
    subjectId: 'sub-geography-economics',
    board: 'CBSE',
    chapterNumber: 2,
    unitName: 'Contemporary India - II',
    title: 'Agriculture: Crops & Cropping Patterns',
    description: 'Food crops (Rice, Wheat, Millets), cash crops (Cotton, Jute, Sugarcane), Green Revolution, and institutional reforms.',
    estHours: 6.0,
    totalQuestions: 30,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Rice vs Wheat Growing Conditions', 'Kharif, Rabi and Zaid Seasons', 'Institutional Reforms (Kisan Credit Card, MSP)'],
    formulaList: [
      '\\text{Rice}: \\text{Temp } > 25^\\circ\\text{C}, \\text{Rainfall } > 100\\text{ cm}',
      '\\text{Wheat}: \\text{Cool growing season, Bright sunshine at ripening, 50-75 cm rainfall}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'Rice is the staple food crop of majority people in India, grown in Kharif season in coastal deltas. Wheat is the second most important cereal crop, grown in Rabi season in north-western plains.',
    workedExample: {
      problem: 'Describe the geographical conditions required for the growth of Rice in India.',
      solution: '1. Temperature: High temperature (above 25°C).\n2. Rainfall & Humidity: High humidity with annual rainfall above 100 cm (irrigation needed in dry regions like Punjab).\n3. Soil: Deep clayey and loamy alluvial soils capable of retaining standing water.\n4. Major producing states: West Bengal, Uttar Pradesh, Punjab, Andhra Pradesh.',
      boardTip: 'State temperature (>25°C) and rainfall (>100 cm) exact numbers.'
    }
  },
  {
    id: 'chap-geo-3',
    subjectId: 'sub-geography-economics',
    board: 'CBSE',
    chapterNumber: 3,
    unitName: 'Contemporary India - II',
    title: 'Minerals and Energy Resources',
    description: 'Ferrous vs non-ferrous minerals, conventional energy (Coal, Petroleum) vs renewable energy (Solar, Wind, Nuclear).',
    estHours: 6.5,
    totalQuestions: 30,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Ferrous (Iron Ore, Manganese) vs Non-Ferrous', 'Coal Varieties (Anthracite, Bituminous, Lignite)', 'Solar & Wind Energy Hubs'],
    formulaList: [
      '\\text{Anthracite (Highest Carbon > 80\\%)} \\rightarrow \\text{Bituminous} \\rightarrow \\text{Lignite (Brown Coal)} \\rightarrow \\text{Peat}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'Iron ore is the basic mineral backbone of industrial development (Magnetite contains up to 70% iron with magnetic properties; Hematite is most important industrial ore with 50-60% iron).',
    workedExample: {
      problem: 'Why is solar energy considered to have a bright future in India?',
      solution: '1. India is a tropical country receiving nearly 300 clear sunny days and 5,000 trillion kWh energy annually.\n2. Photovoltaic technology converts sunlight directly into electricity.\n3. Solar power reduces dependence of rural households on firewood and dung cakes, conserving forests.',
      boardTip: 'Mention tropical location and reduction of firewood dependency.'
    }
  },
  {
    id: 'chap-geo-4',
    subjectId: 'sub-geography-economics',
    board: 'CBSE',
    chapterNumber: 4,
    unitName: 'Understanding Economic Development',
    title: 'Sectors of the Indian Economy',
    description: 'Primary, Secondary, Tertiary sectors, disguised unemployment, and public vs private sector contributions to GDP.',
    estHours: 6.0,
    totalQuestions: 30,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['Primary, Secondary & Tertiary Sectors', 'Disguised Unemployment in Agriculture', 'MGNREGA 2005 (100 Days Guaranteed Work)'],
    formulaList: [
      '\\text{GDP} = \\sum \\text{Value of final goods and services produced in 3 sectors in 1 year}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'Primary sector extracts natural goods; Secondary sector processes them in manufacturing; Tertiary provides banking, transport, and IT services. Disguised unemployment occurs when marginal productivity of labor is zero.',
    workedExample: {
      problem: 'What is disguised unemployment? Explain with an agricultural example.',
      solution: '1. Definition: A situation where more people are engaged in an activity than required. If surplus workers are removed, total output remains unaffected.\n2. Example: A farming family where 5 members cultivate a 2-hectare plot where 3 workers are sufficient.\n3. Solution: Promoting agro-processing industries and MGNREGA 100-day guaranteed employment.',
      boardTip: 'State that marginal productivity of disguised laborers is zero.'
    }
  },
  {
    id: 'chap-geo-5',
    subjectId: 'sub-geography-economics',
    board: 'CBSE',
    chapterNumber: 5,
    unitName: 'Understanding Economic Development',
    title: 'Money and Credit & Self Help Groups',
    description: 'Functions of money, formal vs informal credit sources, terms of credit (collateral), and Self Help Groups (SHGs) for rural poor.',
    estHours: 6.0,
    totalQuestions: 28,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['Double Coincidence of Wants', 'Formal vs Informal Sources of Credit', 'Role of RBI in Banking', 'Self Help Groups (SHGs)'],
    formulaList: [
      '\\text{Formal Credit}: \\text{Banks & Cooperatives (Supervised by RBI, Low Interest)}',
      '\\text{Informal Credit}: \\text{Moneylenders, Traders (High Interest, Debt Trap)}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'RBI supervises formal credit institutions to ensure lending to small farmers, not just profit businesses. SHGs pool small savings of 15-20 women to provide collateral-free loans, breaking moneylender debt traps.',
    workedExample: {
      problem: 'Why do formal credit sources need to be expanded in rural India?',
      solution: '1. Informal moneylenders charge exorbitantly high interest rates (up to 36-60% p.a.), leading borrowers into debt traps.\n2. Cheap and affordable credit is essential for purchasing seeds, fertilizer, and setting up small enterprises.\n3. Expansion of bank branches ensures equal credit access to poor farmers and artisans.',
      boardTip: 'Mention the role of affordable credit in preventing rural debt traps.'
    }
  },

  // --- CBSE ENGLISH ---
  {
    id: 'chap-eng-1',
    subjectId: 'sub-english',
    board: 'CBSE',
    chapterNumber: 1,
    unitName: 'First Flight: Prose & Poetry',
    title: 'A Letter to God & Faith Irony',
    description: 'Prose analysis, ironical elements in Lencho’s unshakable faith, character sketches, and thematic study of faith vs suspicion.',
    estHours: 5.5,
    totalQuestions: 26,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['Irony in Lencho’s Story (Crooks of Post Office)', 'Postmaster’s Benevolence', 'Themes of Unshakable Faith vs Suspicion'],
    formulaList: [
      '\\text{Situational Irony}: \\text{The post office employees who helped Lencho were called "a bunch of crooks"}'
    ],
    conceptImage: '/concepts/eng_lit_3d.jpg',
    conceptNotes: 'In "A Letter to God" by G.L. Fuentes, Lencho exhibits innocent, extreme faith in God by requesting 100 pesos after hailstorms destroy his ripe corn. The postmaster collects 70 pesos out of charity. Lencho receives the money and writes back suspecting the post office clerks of stealing the remaining 30 pesos, producing dramatic situational irony.',
    workedExample: {
      problem: 'Why did Lencho write a second letter to God, and what irony lies in his request?',
      solution: '1. Lencho wrote the second letter because he received only 70 pesos instead of the 100 pesos he asked for.\n2. He believed God could not have made a mistake and that post office employees stole the 30 pesos.\n3. Irony: The very post office workers who contributed their own salaries to help Lencho were labeled by him as "a bunch of crooks."',
      boardTip: 'Define the situational irony clearly to secure full 3 marks.'
    }
  },
  {
    id: 'chap-eng-2',
    subjectId: 'sub-english',
    board: 'CBSE',
    chapterNumber: 2,
    unitName: 'First Flight: Prose & Poetry',
    title: 'Nelson Mandela: Long Walk to Freedom',
    description: 'Historical inauguration of democratic South Africa, Mandela’s concept of courage, twin obligations, and dismantling apartheid.',
    estHours: 6.0,
    totalQuestions: 28,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Mandela’s Twin Obligations', 'Definition of Courage (Triumph over Fear)', 'Oppressor and Oppressed Humanity'],
    formulaList: [
      '\\text{Mandela’s Twin Obligations}: \\text{Obligation to Family} + \\text{Obligation to People & Country}'
    ],
    conceptImage: '/concepts/eng_lit_3d.jpg',
    conceptNotes: 'Mandela defines courage not as the absence of fear, but the triumph over it. Every man has twin obligations: to his family and to his community. Apartheid robbed both the oppressed and the oppressor of their humanity.',
    workedExample: {
      problem: 'What does Nelson Mandela mean when he says courage is "not the absence of fear, but the triumph over it"?',
      solution: '1. A brave man is not someone who never feels fear, but one who conquers that fear.\n2. During the struggle against apartheid, freedom fighters faced torture and imprisonment without giving up their conviction.\n3. Real courage shines when an individual stands up against injustice despite grave personal danger.',
      boardTip: 'Quote Mandela’s words accurately in your answer.'
    }
  },
  {
    id: 'chap-eng-3',
    subjectId: 'sub-english',
    board: 'CBSE',
    chapterNumber: 3,
    unitName: 'First Flight: Prose & Poetry',
    title: 'Two Stories about Flying & Courage',
    description: 'His First Flight (young seagull overcoming fear) and The Black Aeroplane (mysterious pilot guiding Dakota through storm).',
    estHours: 5.5,
    totalQuestions: 25,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['Young Seagull’s Fear of Flying', 'Parental Motivation through Hunger', 'Mystery of the Black Aeroplane Pilot'],
    formulaList: [
      '\\text{Theme}: \\text{Self-reliance, conquering self-doubt, and the instinct of survival}'
    ],
    conceptImage: '/concepts/eng_lit_3d.jpg',
    conceptNotes: 'The young seagull was afraid to fly because he lacked confidence in his wings. When his mother tempted him with a piece of fish, hunger drove him to dive, triggering his natural instinct to spread his wings and fly.',
    workedExample: {
      problem: 'How did the young seagull’s mother compel him to take his first flight?',
      solution: '1. The young seagull was starved for 24 hours on his ledge.\n2. His mother flew near him carrying a piece of fish in her beak and halted just out of reach.\n3. Maddened by hunger, the seagull dived forward, lost his balance, and fell outward, forcing him to flap his wings.',
      boardTip: 'Use the phrase "maddened by hunger" from the NCERT text.'
    }
  },
  {
    id: 'chap-eng-4',
    subjectId: 'sub-english',
    board: 'CBSE',
    chapterNumber: 4,
    unitName: 'CBSE Writing Skills & Formats',
    title: 'Formal Letter to the Editor Format & Rubrics',
    description: 'Official CBSE format for Formal Letters, addressing civic issues, tone management, and scoring rubrics (Format, Content, Expression).',
    estHours: 6.0,
    totalQuestions: 28,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Formal Letter Layout', '3-Paragraph Content Structure', 'Tone & Expression Scoring Rubrics'],
    formulaList: [
      '\\text{Letter Format Marks (5M)}: \\text{Format (1M)} + \\text{Content (2M)} + \\text{Accuracy & Fluency (2M)}'
    ],
    conceptImage: '/concepts/eng_lit_3d.jpg',
    conceptNotes: 'CBSE Formal Letters require: Sender Address, Date (e.g. 2nd September 2026), Receiver Designation, Subject (concise, underlined), Salutation (Sir/Madam), 3-paragraph Body (Issue introduction, Causes/Effects, Suggestions to Authorities), Complimentary Close (Yours sincerely).',
    workedExample: {
      problem: 'Write the opening sentence for a Letter to the Editor regarding frequent electricity blackouts during exam season.',
      solution: '"Through the columns of your esteemed and widely circulated daily, I wish to draw the immediate attention of the concerned authorities and the electricity department towards the frequent and unscheduled power outages in our locality during the ongoing board exam preparation season."',
      boardTip: 'Use formal opening phrases and avoid demanding the editor fix the problem directly.'
    }
  },
  {
    id: 'chap-eng-5',
    subjectId: 'sub-english',
    board: 'CBSE',
    chapterNumber: 5,
    unitName: 'CBSE Writing Skills & Formats',
    title: 'Analytical Paragraph Writing from Data/Charts',
    description: 'Data interpretation, comparative vocabulary (surged, plummeted, plateaued), structuring trends without personal biases.',
    estHours: 6.0,
    totalQuestions: 25,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Introductory Trend Statement', 'Comparative Body Paragraphs', 'Concluding Summary Overview'],
    formulaList: [
      '\\text{Analytical Paragraph}: \\text{Introductory Line} + \\text{Key Comparisons} + \\text{Overall Concluding Trend}'
    ],
    conceptImage: '/concepts/eng_lit_3d.jpg',
    conceptNotes: 'Analytical Paragraphs require objective comparison of charts, bar graphs, or survey data in 100-120 words. No personal pronouns (I/we) or unsubstantiated opinions should be used.',
    workedExample: {
      problem: 'What are the three essential components of a high-scoring Analytical Paragraph in CBSE Board Exams?',
      solution: '1. Introduction: Rephrase the prompt clearly stating what the chart/graph represents.\n2. Body Paragraph(s): Highlight significant highs, lows, anomalies, and comparisons using varied trend vocabulary.\n3. Conclusion: Provide an overall summary highlighting the main takeaway from the dataset.',
      boardTip: 'Never give your personal opinion in an analytical paragraph; report strictly what the data states.'
    }
  },

  // =============================================================
  // 2. ICSE CHAPTERS (7 SUBJECTS X 5 CHAPTERS = 35 CHAPTERS)
  // =============================================================

  // --- ICSE MATHEMATICS ---
  {
    id: 'chap-icse-math-1',
    subjectId: 'sub-math-icse',
    board: 'ICSE',
    chapterNumber: 1,
    unitName: 'Commercial Mathematics',
    title: 'Goods and Services Tax (GST) & Invoicing',
    description: 'Intra-state (CGST + SGST) vs Inter-state (IGST) tax invoices, input tax credit (ITC), and calculating net tax liability.',
    estHours: 6.0,
    totalQuestions: 30,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Intra-State (CGST + SGST) vs Inter-State (IGST)', 'Input Tax Credit (ITC)', 'Tax Payable to Government'],
    formulaList: [
      '\\text{CGST} = \\text{SGST} = \\frac{\\text{GST Rate}}{2}',
      '\\text{Net Tax Payable} = \\text{Output GST} - \\text{Input Tax Credit (ITC)}'
    ],
    conceptImage: '/concepts/math_algebra_3d.jpg',
    conceptNotes: 'For Intra-State supply within the same state, GST is equally divided between Central Govt (CGST) and State Govt (SGST). For Inter-State supply, IGST is charged at full rate. Net tax paid by dealer = Tax on Selling Price - Tax on Cost Price.',
    workedExample: {
      problem: 'A dealer buys an article for ₹8,000 and sells to a customer at ₹10,000 within the same state. If GST is 18%, find CGST and SGST paid by customer and net tax paid by dealer.',
      solution: '1. Selling Price = ₹10,000. GST rate = 18% (CGST = 9%, SGST = 9%).\n2. Customer pays: CGST = 9% of 10000 = ₹900; SGST = 9% of 10000 = ₹900.\n3. Dealer’s Input Tax Credit: 18% of 8000 = ₹1,440.\n4. Dealer’s Output Tax: 18% of 10000 = ₹1,800.\n5. Net Tax paid by dealer = 1800 - 1440 = ₹360 (or 18% of ₹2,000 profit).',
      boardTip: 'Show CGST and SGST separately for intra-state transactions.'
    }
  },
  {
    id: 'chap-icse-math-2',
    subjectId: 'sub-math-icse',
    board: 'ICSE',
    chapterNumber: 2,
    unitName: 'Commercial Mathematics',
    title: 'Banking: Recurring Deposit Accounts',
    description: 'Monthly deposits, qualifying time in months, interest calculation using arithmetic progression formula, and Maturity Value.',
    estHours: 5.5,
    totalQuestions: 28,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['Monthly Principal Deposit (P)', 'Number of Months (n)', 'Recurring Deposit Interest Formula'],
    formulaList: [
      'I = P \\times \\frac{n(n+1)}{2 \\times 12} \\times \\frac{r}{100}',
      '\\text{Maturity Value} = (P \\times n) + I'
    ],
    conceptImage: '/concepts/math_algebra_3d.jpg',
    conceptNotes: 'For a Recurring Deposit (RD) of ₹P per month for n months at r% p.a.: Total Interest I = P × [n(n+1)/24] × (r/100). Maturity Value MV = (P × n) + I.',
    workedExample: {
      problem: 'Mrs. Mathew opened an RD Account depositing ₹2,500/month for 2 years (24 months) at 8% p.a. Find the maturity amount (ICSE 4-Mark Problem).',
      solution: '1. $P = ₹2,500$, $n = 24$, $r = 8\\%$.\n2. $I = 2500 \\times \\frac{24 \\times 25}{24} \\times \\frac{8}{100} = 2500 \\times 25 \\times \\frac{8}{100} = ₹5,000$.\n3. Total deposited: $2500 \\times 24 = ₹60,000$.\n4. Maturity Value: $MV = 60000 + 5000 = ₹65,000$.',
      boardTip: 'Express time in months (2 years = 24 months) and use 24 directly in the denominator.'
    }
  },
  {
    id: 'chap-icse-math-3',
    subjectId: 'sub-math-icse',
    board: 'ICSE',
    chapterNumber: 3,
    unitName: 'Algebra',
    title: 'Linear Inequations in One Variable',
    description: 'Solving linear inequalities on Real Numbers (R), Integers (Z/I), and Natural Numbers (W/N), and plotting solution sets on number lines.',
    estHours: 5.5,
    totalQuestions: 26,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Properties of Inequations', 'Reversing Inequality on Negative Multiplication', 'Number Line Representation (Hollow vs Solid Dots)'],
    formulaList: [
      '\\text{If } a < b \\implies -a > -b',
      'x \\in \\mathbb{R} \\implies \\text{Thick continuous line}; \\quad x \\in \\mathbb{Z} \\implies \\text{Discrete solid dots}'
    ],
    conceptImage: '/concepts/math_algebra_3d.jpg',
    conceptNotes: 'Multiplying or dividing both sides of an inequality by a negative number reverses the inequality sign (< becomes >). For Real numbers R, draw a continuous dark line with solid/hollow dots.',
    workedExample: {
      problem: 'Solve $2x - 5 \\le 5x + 4 < 11$, where $x \\in \\mathbb{I}$ (Integers), and graph the solution set.',
      solution: '1. Split into two inequalities: (a) $2x - 5 \\le 5x + 4$ and (b) $5x + 4 < 11$.\n2. (a) $-3x \\le 9 \\implies x \\ge -3$.\n3. (b) $5x < 7 \\implies x < 1.4$.\n4. Combined: $-3 \\le x < 1.4$. Since $x \\in \\mathbb{I}$, Solution Set $= \\{-3, -2, -1, 0, 1\\}$.\n5. Graph: Mark thick dark dots at -3, -2, -1, 0, and 1 on the integer number line.',
      boardTip: 'Always check replacement set (R, Z, W, N) carefully before listing elements.'
    }
  },
  {
    id: 'chap-icse-math-4',
    subjectId: 'sub-math-icse',
    board: 'ICSE',
    chapterNumber: 4,
    unitName: 'Algebra',
    title: 'Remainder and Factor Theorems',
    description: 'Polynomial division theorem, finding remainder without long division, and factorising cubic polynomials completely.',
    estHours: 6.5,
    totalQuestions: 30,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Remainder Theorem f(a) = R', 'Factor Theorem (f(a) = 0 implies (x-a) is factor)', 'Complete Factorisation of Cubic Polynomials'],
    formulaList: [
      'f(x) = (x - a) q(x) + R \\implies f(a) = R',
      '\\text{If } f(a) = 0 \\implies (x - a) \\text{ is a factor of } f(x)'
    ],
    conceptImage: '/concepts/math_algebra_3d.jpg',
    conceptNotes: 'If polynomial f(x) is divided by (x - a), the remainder is f(a). If f(a) = 0, then (x - a) is a factor. To factorise a cubic polynomial, use trial-and-error to find first root, divide synthetically, and factorise the remaining quadratic.',
    workedExample: {
      problem: 'Using Factor Theorem, show that (x - 2) is a factor of f(x) = x³ - 7x + 6, and factorise it completely.',
      solution: '1. $f(2) = (2)^3 - 7(2) + 6 = 8 - 14 + 6 = 0 \\implies (x - 2)$ is a factor.\n2. Divide $x^3 - 7x + 6$ by $(x - 2)$ to get quotient $q(x) = x^2 + 2x - 3$.\n3. Factorise quadratic: $x^2 + 3x - x - 3 = (x + 3)(x - 1)$.\n4. Complete factorisation: $f(x) = (x - 2)(x - 1)(x + 3)$.',
      boardTip: 'Write all 3 linear factors clearly at the final step.'
    }
  },
  {
    id: 'chap-icse-math-5',
    subjectId: 'sub-math-icse',
    board: 'ICSE',
    chapterNumber: 5,
    unitName: 'Algebra',
    title: 'Matrices: Operations & Determinants',
    description: 'Order of matrices, row and column operations, scalar multiplication, matrix multiplication compatibility, and solving 2x2 matrix equations.',
    estHours: 6.0,
    totalQuestions: 28,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Order of Matrix (m × n)', 'Matrix Addition & Scalar Multiplication', 'Matrix Multiplication Compatibility (n = p)', 'Identity & Null Matrices'],
    formulaList: [
      'A_{m \\times n} \\times B_{n \\times p} = C_{m \\times p}',
      'I = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}, \\quad A + Null = A'
    ],
    conceptImage: '/concepts/math_algebra_3d.jpg',
    conceptNotes: 'Two matrices can be multiplied only if columns of first matrix equal rows of second matrix: A(m×n) × B(n×p) = C(m×p). Matrix multiplication is non-commutative in general (AB ≠ BA).',
    workedExample: {
      problem: 'If $A = \\begin{pmatrix} 2 & -1 \\\\ 0 & 3 \\end{pmatrix}$ and $B = \\begin{pmatrix} 1 & 4 \\\\ -2 & 0 \\end{pmatrix}$, find $A^2 - 2AB$.',
      solution: '1. $A^2 = \\begin{pmatrix} 2 & -1 \\\\ 0 & 3 \\end{pmatrix} \\begin{pmatrix} 2 & -1 \\\\ 0 & 3 \\end{pmatrix} = \\begin{pmatrix} 4+0 & -2-3 \\\\ 0+0 & 0+9 \\end{pmatrix} = \\begin{pmatrix} 4 & -5 \\\\ 0 & 9 \\end{pmatrix}$.\n2. $AB = \\begin{pmatrix} 2+2 & 8+0 \\\\ 0-6 & 0+0 \\end{pmatrix} = \\begin{pmatrix} 4 & 8 \\\\ -6 & 0 \\end{pmatrix} \\implies 2AB = \\begin{pmatrix} 8 & 16 \\\\ -12 & 0 \\end{pmatrix}$.\n3. $A^2 - 2AB = \\begin{pmatrix} 4-8 & -5-16 \\\\ 0-(-12) & 9-0 \\end{pmatrix} = \\begin{pmatrix} -4 & -21 \\\\ 12 & 9 \\end{pmatrix}$.',
      boardTip: 'Be very careful with row × column element multiplication signs.'
    }
  },

  // --- ICSE PHYSICS ---
  {
    id: 'chap-icse-phy-1',
    subjectId: 'sub-physics-icse',
    board: 'ICSE',
    chapterNumber: 1,
    unitName: 'Classical Mechanics',
    title: 'Force, Work, Power & Principle of Moments',
    description: 'Turning effect of force, moment of couple, equilibrium of bodies, Principle of Moments, and mechanical advantage of pulley systems.',
    estHours: 6.5,
    totalQuestions: 32,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Moment of Force (τ = F × d)', 'Principle of Moments (Clockwise = Anticlockwise)', 'Velocity Ratio (VR) of Block & Tackle'],
    formulaList: [
      '\\text{Moment of Force} = F \\times d_\\perp',
      '\\sum \\text{Anticlockwise Moments} = \\sum \\text{Clockwise Moments}',
      '\\text{MA} = \\frac{\\text{Load}}{\\text{Effort}}, \\quad \\text{Efficiency } \\eta = \\frac{\\text{MA}}{\\text{VR}} \\times 100\\%'
    ],
    conceptImage: '/concepts/physics_optics_3d.jpg',
    conceptNotes: 'The turning effect of a force is measured by Moment = Force × Perpendicular distance from pivot. Rotational equilibrium requires Sum of Clockwise Moments = Sum of Anticlockwise Moments. In a block and tackle with n pulleys: VR = n; MA = Load / Effort.',
    workedExample: {
      problem: 'A uniform half-metre rule of mass 60g is balanced horizontally on a knife-edge at 29 cm mark when 20gf is suspended at 45 cm. Explain the balance condition.',
      solution: '1. Center of gravity of rule is at 25 cm. Weight 60gf acts downwards at 25 cm.\n2. Pivot at 29 cm: Anticlockwise moment $= 60\\text{ gf} \\times (29 - 25)\\text{ cm} = 240\\text{ gf}\\cdot\\text{cm}$.\n3. 20gf at 45 cm: Clockwise moment $= 20\\text{ gf} \\times (45 - 29)\\text{ cm} = 320\\text{ gf}\\cdot\\text{cm}$.\n4. Add extra weight $w$ at 0 cm mark: $29w + 240 = 320 \\implies w = 2.76\\text{ gf}$.',
      boardTip: 'Mark rule’s self-weight at geometric midpoint (25 cm for half-metre rule).'
    }
  },
  {
    id: 'chap-icse-phy-2',
    subjectId: 'sub-physics-icse',
    board: 'ICSE',
    chapterNumber: 2,
    unitName: 'Light & Optics',
    title: 'Refraction of Light at Plane Surfaces & Prisms',
    description: 'Refraction through glass block, lateral displacement, refraction through triangular prism, total internal reflection, and critical angle.',
    estHours: 7.0,
    totalQuestions: 34,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Snell’s Law of Refraction', 'Total Internal Reflection (TIR) & Critical Angle', 'Prisms & Angle of Minimum Deviation'],
    formulaList: [
      '\\mu = \\frac{\\sin i}{\\sin r} = \\frac{c}{v}',
      '\\sin C = \\frac{1}{\\mu}',
      'A + \\delta = i + e'
    ],
    conceptImage: '/concepts/physics_optics_3d.jpg',
    conceptNotes: 'Total Internal Reflection occurs when light travels from a denser to a rarer medium at an angle of incidence greater than critical angle C (sin C = 1/μ). Totally reflecting 45°-90°-45° prisms turn light through 90° or 180° without chromatic aberration.',
    workedExample: {
      problem: 'State the two essential conditions for Total Internal Reflection to take place.',
      solution: '1. Light must travel from an optically denser medium to an optically rarer medium.\n2. The angle of incidence in the denser medium must be strictly greater than the critical angle for the pair of media ($i > C$).',
      boardTip: 'State both conditions with exact optical terminology.'
    }
  },
  {
    id: 'chap-icse-phy-3',
    subjectId: 'sub-physics-icse',
    board: 'ICSE',
    chapterNumber: 3,
    unitName: 'Sound',
    title: 'Echoes, Resonances & Vibrations',
    description: 'Reflection of sound waves, conditions for echo formation (d ≥ 17 m), SONAR, and natural vs damped vs forced resonance.',
    estHours: 6.0,
    totalQuestions: 28,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Echo Distance Formula (v = 2d/t)', 'Minimum Distance for Echo in Air (17.2 m)', 'Resonance Conditions'],
    formulaList: [
      'v = \\frac{2d}{t} \\implies d = \\frac{v \\times t}{2}'
    ],
    conceptImage: '/concepts/physics_elec_3d.jpg',
    conceptNotes: 'For distinct echo hearing, reflected sound must reach ear at least 0.1 s after direct sound. At speed of sound v = 344 m/s in air: minimum distance d = (344 × 0.1)/2 = 17.2 metres.',
    workedExample: {
      problem: 'A ship sends a SONAR signal and receives the echo from the seabed after 1.6 seconds. If sound speed in seawater is 1500 m/s, find depth of sea.',
      solution: '1. Given: $t = 1.6\\text{ s}$, $v = 1500\\text{ m/s}$.\n2. Formula: $d = \\frac{v \\times t}{2} = \\frac{1500 \\times 1.6}{2} = 1500 \\times 0.8 = 1,200\\text{ metres}$.',
      boardTip: 'Remember to divide by 2 for echo / SONAR return paths.'
    }
  },
  {
    id: 'chap-icse-phy-4',
    subjectId: 'sub-physics-icse',
    board: 'ICSE',
    chapterNumber: 4,
    unitName: 'Electricity & Magnetism',
    title: 'EMF, Terminal Voltage & Household Circuits',
    description: 'Electromotive force vs Terminal voltage, internal resistance of cell, ring system of wiring, fuses, switches, and 3-pin plug earth wiring.',
    estHours: 7.5,
    totalQuestions: 38,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['EMF vs Terminal Voltage (V = E - Ir)', 'Ring Main Wiring System', 'Three-Pin Plug (Live, Neutral, Earth)'],
    formulaList: [
      'E = V + I r = I (R + r)',
      'r = \\left(\\frac{E - V}{V}\\right) R'
    ],
    conceptImage: '/concepts/physics_elec_3d.jpg',
    conceptNotes: 'EMF (E) is the terminal potential difference when no current is drawn (open circuit). In closed circuit, Terminal Voltage V = E - Ir due to internal resistance r. In household wiring: appliances are connected in parallel; fuse is always inserted in the Live wire.',
    workedExample: {
      problem: 'A cell of EMF 2.0 V and internal resistance 1.5 Ω is connected to an external resistor of 8.5 Ω. Find current and terminal voltage.',
      solution: '1. Total resistance: $R_{\\text{total}} = R + r = 8.5 + 1.5 = 10.0\\,\\Omega$.\n2. Current: $I = \\frac{E}{R_{\\text{total}}} = \\frac{2.0}{10.0} = 0.2\\text{ A}$.\n3. Terminal Voltage: $V = IR = 0.2 \\times 8.5 = 1.70\\text{ V}$ (or $V = E - Ir = 2.0 - 0.2(1.5) = 1.70\\text{ V}$).',
      boardTip: 'Terminal voltage V is always less than EMF E when drawing current.'
    }
  },
  {
    id: 'chap-icse-phy-5',
    subjectId: 'sub-physics-icse',
    board: 'ICSE',
    chapterNumber: 5,
    unitName: 'Heat & Thermodynamics',
    title: 'Calorimetry & Latent Heat of Ice',
    description: 'Specific heat capacity, heat capacity, principle of method of mixtures, specific latent heat of fusion of ice, and steam heating effects.',
    estHours: 7.0,
    totalQuestions: 35,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Specific Heat Capacity (Q = mcΔT)', 'Specific Latent Heat of Fusion (Q = mL)', 'Principle of Calorimetry'],
    formulaList: [
      'Q = m c \\Delta T',
      'Q = m L_f \\quad (L_f \\text{ of ice} = 336\\text{ J/g} = 3.36 \\times 10^5\\text{ J/kg})',
      '\\text{Heat Lost} = \\text{Heat Gained}'
    ],
    conceptImage: '/concepts/chem_acids_metal_3d.jpg',
    conceptNotes: 'High specific heat capacity of water (4200 J/kg·K) makes it an ideal coolant and climate moderator. Latent heat is heat absorbed or released during phase change without temperature change (Q = mL).',
    workedExample: {
      problem: 'Calculate the mass of ice at 0°C required to cool 100g of water at 30°C to 10°C (L_ice = 336 J/g, c_water = 4.2 J/g·°C).',
      solution: '1. Heat lost by warm water: $Q_{\\text{lost}} = m_w c_w (30 - 10) = 100 \\times 4.2 \\times 20 = 8,400\\text{ J}$.\n2. Heat gained by ice: Melts at 0°C ($m L = 336m$) + melted water warms to 10°C ($m \\times 4.2 \\times 10 = 42m$).\n3. Total heat gained: $336m + 42m = 378m$.\n4. $378m = 8400 \\implies m = \\frac{8400}{378} \\approx 22.22\\text{ grams}$.',
      boardTip: 'Include the heat required to warm the melted ice water up to the final temperature.'
    }
  },

  // --- ICSE CHEMISTRY ---
  {
    id: 'chap-icse-chem-1',
    subjectId: 'sub-chemistry-icse',
    board: 'ICSE',
    chapterNumber: 1,
    unitName: 'Inorganic & Physical Chemistry',
    title: 'Mole Concept & Stoichiometry',
    description: 'Gay-Lussac’s Law of Combining Volumes, Avogadro’s Law, Vapour Density relationship, and empirical/molecular formula determination.',
    estHours: 8.0,
    totalQuestions: 40,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Gay-Lussac’s Law of Combining Volumes', 'Empirical vs Molecular Formula', 'Vapour Density (VD = Molecular Mass / 2)'],
    formulaList: [
      '\\text{Molecular Mass} = 2 \\times \\text{Vapour Density}',
      'n = \\frac{\\text{Molecular Mass}}{\\text{Empirical Formula Mass}}',
      '\\text{Molecular Formula} = (\\text{Empirical Formula})_n'
    ],
    conceptImage: '/concepts/chem_molecules_3d.jpg',
    conceptNotes: 'Gay-Lussac’s Law: Reacting gases combine in simple integer volume ratios at constant T and P. Relative Molecular Mass = 2 × Vapour Density. Empirical formula is the simplest integer ratio of atoms.',
    workedExample: {
      problem: 'A compound has 40.0% C, 6.7% H, and 53.3% O with Vapour Density = 30. Find its Molecular Formula.',
      solution: '1. Atomic ratios: C $= \\frac{40}{12} = 3.33 \\implies 1$, H $= \\frac{6.7}{1} = 6.7 \\implies 2$, O $= \\frac{53.3}{16} = 3.33 \\implies 1$.\n2. Empirical Formula $= \\text{CH}_2\\text{O}$ (Empirical Mass $= 30$).\n3. Molecular Mass $= 2 \\times 30 = 60$.\n4. $n = \\frac{60}{30} = 2 \\implies$ Molecular Formula $= \\text{C}_2\\text{H}_4\\text{O}_2$ (Ethanoic acid).',
      boardTip: 'Show full calculation table with atomic ratios and whole numbers.'
    }
  },
  {
    id: 'chap-icse-chem-2',
    subjectId: 'sub-chemistry-icse',
    board: 'ICSE',
    chapterNumber: 2,
    unitName: 'Inorganic Chemistry',
    title: 'Periodic Properties & Chemical Bonding',
    description: 'Periodic properties (Ionisation potential, Electron affinity, Electronegativity) and Coordinate covalent bonding in NH₄⁺ and H₃O⁺.',
    estHours: 6.5,
    totalQuestions: 32,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Ionisation Potential & Electron Affinity', 'Coordinate Covalent Bond (Hydronium & Ammonium)', 'Ionic vs Covalent Properties'],
    formulaList: [
      '\\text{Coordinate Bond in } \\text{H}_3\\text{O}^+: \\text{H}_2\\text{O}: + \\text{H}^+ \\rightarrow [\\text{H}_2\\text{O} \\rightarrow \\text{H}]^+'
    ],
    conceptImage: '/concepts/chem_molecules_3d.jpg',
    conceptNotes: 'A coordinate covalent bond is formed when one atom supplies both shared electrons (lone pair donor). Hydronium ion (H₃O⁺) has 2 single covalent bonds and 1 coordinate bond.',
    workedExample: {
      problem: 'Draw the electron dot diagram for the formation of Ammonium ion (NH₄⁺) from Ammonia and Hydrogen ion.',
      solution: '1. Ammonia (:NH₃) has 3 single N-H covalent bonds and 1 lone pair of electrons on Nitrogen.\n2. Hydrogen ion (H⁺) has no electrons (empty 1s orbital).\n3. Nitrogen donates its lone pair to H⁺ forming a coordinate bond: $\\text{H}_3\\text{N}: + \\text{H}^+ \\rightarrow [\\text{H}_3\\text{N} \\rightarrow \\text{H}]^+$.',
      boardTip: 'Show lone pair on Nitrogen clearly before showing the coordinate arrow bond.'
    }
  },
  {
    id: 'chap-icse-chem-3',
    subjectId: 'sub-chemistry-icse',
    board: 'ICSE',
    chapterNumber: 3,
    unitName: 'Physical & Applied Chemistry',
    title: 'Electrolysis & Aluminium Metallurgy',
    description: 'Electrolytes vs non-electrolytes, selective discharge of ions, Hall-Héroult process for extraction of aluminium, and electroplating with silver.',
    estHours: 7.5,
    totalQuestions: 36,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Selective Discharge Series', 'Hall-Héroult Electrolytic Extraction of Al', 'Electroplating with Nickel/Silver'],
    formulaList: [
      '\\text{At Cathode (Reduction)}: \\text{Al}^{3+} + 3e^- \\rightarrow \\text{Al}',
      '\\text{At Anode (Oxidation)}: 2\\text{O}^{2-} - 4e^- \\rightarrow \\text{O}_2'
    ],
    conceptImage: '/concepts/chem_acids_metal_3d.jpg',
    conceptNotes: 'In Hall-Héroult extraction: Pure alumina (Al₂O₃) is dissolved in molten cryolite (Na₃AlF₆) and fluorspar (CaF₂) which lower the melting point to 950°C and enhance electrical conductivity.',
    workedExample: {
      problem: 'What is the role of Cryolite (Na₃AlF₆) and Fluorspar in the electrolytic reduction of Alumina?',
      solution: '1. Pure Alumina melts at an excessively high temperature (2050°C) and is a poor electrical conductor.\n2. Cryolite and Fluorspar lower the fusion mixture melting point from 2050°C to ~950°C.\n3. They significantly increase the electrical conductivity of the electrolyte.',
      boardTip: 'State both: lowering melting point and increasing electrical conductivity.'
    }
  },
  {
    id: 'chap-icse-chem-4',
    subjectId: 'sub-chemistry-icse',
    board: 'ICSE',
    chapterNumber: 4,
    unitName: 'Study of Compounds',
    title: 'Study of Compounds: HCl, NH₃, HNO₃ & H₂SO₄',
    description: 'Fountain experiment for HCl/NH₃ solubility, Contact Process for Sulphuric acid, Ostwald Process for Nitric acid, and catalytic oxidation.',
    estHours: 8.0,
    totalQuestions: 40,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Fountain Experiment (Extreme Solubility)', 'Contact Process for H₂SO₄ (V₂O₅ Catalyst)', 'Ostwald Process for HNO₃ (Pt Catalyst)'],
    formulaList: [
      '2\\text{SO}_2 + \\text{O}_2 \\xrightarrow[450^\\circ\\text{C}]{\\text{V}_2\\text{O}_5} 2\\text{SO}_3 \\quad (\\Delta H = -196\\text{ kJ})',
      '4\\text{NH}_3 + 5\\text{O}_2 \\xrightarrow[800^\\circ\\text{C}]{\\text{Pt}} 4\\text{NO} + 6\\text{H}_2\\text{O} + \\text{Heat}'
    ],
    conceptImage: '/concepts/chem_acids_metal_3d.jpg',
    conceptNotes: 'The Fountain Experiment demonstrates the extreme solubility and acidic/basic nature of HCl (red fountain) and NH₃ (blue fountain) gases. Sulphuric acid acts as a non-volatile acid and a powerful dehydrating agent.',
    workedExample: {
      problem: 'What observation and chemical property is demonstrated by the Fountain Experiment using Hydrogen Chloride gas?',
      solution: '1. Observation: A high-pressure red fountain erupts inside the round-bottom flask when water reaches the dropper.\n2. Property Demonstrated: Hydrogen Chloride gas is extremely soluble in water (1 volume water dissolves ~450 volumes HCl) and forms an acidic solution (turning blue litmus red).',
      boardTip: 'Mention extreme solubility first, then the acidic nature.'
    }
  },
  {
    id: 'chap-icse-chem-5',
    subjectId: 'sub-chemistry-icse',
    board: 'ICSE',
    chapterNumber: 5,
    unitName: 'Organic Chemistry',
    title: 'Organic Chemistry: Hydrocarbons & Functional Groups',
    description: 'IUPAC nomenclature of Alkanes, Alkenes, Alkynes, Alcohols, and Carboxylic acids; preparation of Methane, Ethene, and Ethyne.',
    estHours: 8.5,
    totalQuestions: 42,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['IUPAC Naming of Hydrocarbons', 'Addition Reactions of Ethene/Ethyne with Bromine', 'Cleansing Action & Micelles'],
    formulaList: [
      '\\text{Alkane: } \\text{C}_n\\text{H}_{2n+2}, \\quad \\text{Alkene: } \\text{C}_n\\text{H}_{2n}, \\quad \\text{Alkyne: } \\text{C}_n\\text{H}_{2n-2}',
      '\\text{C}_2\\text{H}_4 + \\text{Br}_2 \\rightarrow \\text{CH}_2\\text{Br}-\\text{CH}_2\\text{Br} \\quad (\\text{Decolourises Brown } \\text{Br}_2)'
    ],
    conceptImage: '/concepts/chem_molecules_3d.jpg',
    conceptNotes: 'Unsaturated hydrocarbons (Alkenes & Alkynes) undergo addition reactions and decolourise reddish-brown bromine water and alkaline KMnO₄. Saturated Alkanes undergo substitution reactions under sunlight.',
    workedExample: {
      problem: 'How will you chemically distinguish between Ethane gas and Ethene gas?',
      solution: '1. Pass both gases separately through reddish-brown Bromine water in $\\text{CCl}_4$.\n2. Ethene (unsaturated) undergoes addition and rapidly decolourises brown Bromine solution to colourless 1,2-dibromoethane.\n3. Ethane (saturated) does not react in the dark and the solution remains reddish-brown.',
      boardTip: 'State the reagent (Bromine water) and the clear colour change observation.'
    }
  },

  // --- ICSE BIOLOGY ---
  {
    id: 'chap-icse-bio-1',
    subjectId: 'sub-biology-icse',
    board: 'ICSE',
    chapterNumber: 1,
    unitName: 'Cell Biology & Genetics',
    title: 'Structure of Chromosomes, Cell Division & Genetics',
    description: 'Mitosis stages (Prophase, Metaphase, Anaphase, Telophase), Mendel’s Monohybrid and Dihybrid crosses with 16-box Punnett squares.',
    estHours: 7.5,
    totalQuestions: 35,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Stages of Mitosis', 'Punnett Square Dihybrid Cross (9:3:3:1)', 'Law of Segregation & Independent Assortment'],
    formulaList: [
      '\\text{Dihybrid Phenotype} = 9 \\text{ Round Yellow} : 3 \\text{ Round Green} : 3 \\text{ Wrinkled Yellow} : 1 \\text{ Wrinkled Green}',
      '\\text{Chromatin Fiber} = \\text{DNA} + \\text{Histone Octamer Core}'
    ],
    conceptImage: '/concepts/bio_genetics_3d.jpg',
    conceptNotes: 'Mitosis produces two genetically identical diploid daughter cells for growth and tissue repair. Mendel’s Law of Independent Assortment states that alleles of different gene pairs assort independently during gamete formation, resulting in the 9:3:3:1 phenotypic ratio in F2 dihybrid generation.',
    workedExample: {
      problem: 'Write the phenotypic and genotypic ratio of a cross between heterozygous tall plant (Tt) and dwarf plant (tt).',
      solution: '1. Parents: $Tt \\times tt$.\n2. Gametes: $T, t$ and $t, t$.\n3. Offspring: $50\\%\\, Tt$ (Tall) and $50\\%\\, tt$ (Dwarf).\n4. Phenotypic Ratio $= 1 \\text{ Tall} : 1 \\text{ Dwarf}$ (Test Cross Ratio $1:1$).\n5. Genotypic Ratio $= 1\\, Tt : 1\\, tt$.',
      boardTip: 'In ICSE biology, always draw the complete Punnett square with gametes labeled.'
    }
  },
  {
    id: 'chap-icse-bio-2',
    subjectId: 'sub-biology-icse',
    board: 'ICSE',
    chapterNumber: 2,
    unitName: 'Plant Physiology',
    title: 'Absorption by Roots & Transpiration',
    description: 'Osmosis, diffusion, turgidity, plasmolysis, root pressure, guttation, and Ganong’s potometer transpiration measurement.',
    estHours: 7.0,
    totalQuestions: 32,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Endosmosis vs Exosmosis (Turgidity vs Plasmolysis)', 'Ganong’s Potometer Working', 'Transpiration Pull & Cooling Effect'],
    formulaList: [
      '\\text{Rate of Transpiration} = \\frac{\\text{Distance travelled by air bubble (cm)}}{\\text{Time (minutes)}}'
    ],
    conceptImage: '/concepts/bio_heart_3d.jpg',
    conceptNotes: 'Root hair cells absorb water by endosmosis due to higher solute concentration in root cell sap compared to soil water. Transpiration through stomata creates a negative suction pressure (transpiration pull) that elevates water columns in xylem.',
    workedExample: {
      problem: 'What happens when a plant cell is placed in a hypertonic solution? Explain the phenomenon.',
      solution: '1. Water moves out of the cell vacuole into the hypertonic solution by exosmosis.\n2. The protoplasm shrinks away from the cell wall, causing the cell to lose turgor.\n3. Phenomenon: Plasmolysis (the cell is called flaccid/plasmolysed).',
      boardTip: 'Use exact terms: "Exosmosis" and "Plasmolysis".'
    }
  },
  {
    id: 'chap-icse-bio-3',
    subjectId: 'sub-biology-icse',
    board: 'ICSE',
    chapterNumber: 3,
    unitName: 'Plant Physiology',
    title: 'Photosynthesis: Light & Dark Reactions',
    description: 'Chloroplast structure, photolysis of water in grana thylakoids, Calvin cycle in stroma, and destarching experiments.',
    estHours: 7.5,
    totalQuestions: 34,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Photolysis of Water in Grana (Light Reaction)', 'Calvin Cycle in Stroma (Dark Reaction)', 'Mohl’s Half-Leaf CO₂ Experiment'],
    formulaList: [
      '2\\text{H}_2\\text{O} \\xrightarrow[\\text{Chlorophyll}]{\\text{Photons}} 4\\text{H}^+ + 4e^- + \\text{O}_2 \\uparrow \\quad (\\text{Photolysis})'
    ],
    conceptImage: '/concepts/bio_heart_3d.jpg',
    conceptNotes: 'Light reaction occurs in grana thylakoids where sunlight splits water into protons, electrons, and oxygen (photolysis), generating ATP and NADPH. Dark reaction occurs in stroma where CO₂ is reduced to glucose.',
    workedExample: {
      problem: 'Why is it necessary to destarch a potted plant before conducting any photosynthesis experiment?',
      solution: '1. Destarching removes all pre-existing starch stored in the leaves by keeping the plant in dark for 24-48 hours.\n2. This ensures that any starch detected by iodine testing at the end of the experiment was synthesized strictly during the experimental exposure period.',
      boardTip: 'State that pre-existing starch is used up by respiration in the dark.'
    }
  },
  {
    id: 'chap-icse-bio-4',
    subjectId: 'sub-biology-icse',
    board: 'ICSE',
    chapterNumber: 4,
    unitName: 'Human Anatomy & Physiology',
    title: 'Human Circulatory System & Heart Working',
    description: 'Blood composition (RBCs, WBCs, Platelets), blood groups (ABO, Rh factor), structure of heart, cardiac cycle, and hepatic portal system.',
    estHours: 8.0,
    totalQuestions: 38,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Structure of Human Heart & Valves', 'Double Circulation (Pulmonary & Systemic)', 'Cardiac Cycle & Blood Pressure (120/80 mmHg)'],
    formulaList: [
      '\\text{Cardiac Output} = \\text{Stroke Volume (70 mL)} \\times \\text{Heart Rate (72 bpm)} = 5.04\\text{ L/min}'
    ],
    conceptImage: '/concepts/bio_heart_3d.jpg',
    conceptNotes: 'The bicuspid (mitral) valve guards left atrioventricular aperture, and tricuspid valve guards right atrioventricular aperture. Double circulation prevents mixing of oxygenated and deoxygenated blood, ensuring high metabolic efficiency in mammals.',
    workedExample: {
      problem: 'Differentiate between an Artery and a Vein with three structural differences.',
      solution: '1. Lumen: Arteries have narrow lumens; Veins have wide lumens.\n2. Wall Thickness: Arteries have thick, highly muscular elastic walls; Veins have thin, less muscular walls.\n3. Valves: Arteries have no internal valves (except at heart exits); Veins have internal semilunar valves to prevent backflow of blood.',
      boardTip: 'Tabulate under Lumen, Wall Thickness, and Internal Valves.'
    }
  },
  {
    id: 'chap-icse-bio-5',
    subjectId: 'sub-biology-icse',
    board: 'ICSE',
    chapterNumber: 5,
    unitName: 'Human Anatomy & Physiology',
    title: 'The Excretory System: Nephron & Ultrafiltration',
    description: 'Structure of kidney, Malpighian capsule, Bowman’s capsule, glomerulus, ultrafiltration under hydrostatic pressure, and selective reabsorption.',
    estHours: 7.5,
    totalQuestions: 35,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Nephron Anatomy (Bowman’s Capsule, PCT, Henle’s Loop, DCT)', 'Ultrafiltration under High Hydrostatic Pressure', 'Selective Reabsorption of Glucose'],
    formulaList: [
      '\\text{Urine Formation} = \\text{Ultrafiltration} + \\text{Selective Reabsorption} + \\text{Tubular Secretion}'
    ],
    conceptImage: '/concepts/bio_heart_3d.jpg',
    conceptNotes: 'Ultrafiltration occurs in the glomerulus because afferent arteriole is wider than efferent arteriole, generating high hydrostatic pressure (~10 mmHg) that forces water, glucose, and urea into Bowman’s capsule as glomerular filtrate. Useful glucose and amino acids are 100% reabsorbed in the PCT.',
    workedExample: {
      problem: 'Why is the diameter of the afferent arteriole wider than that of the efferent arteriole in a nephron?',
      solution: '1. The wider incoming afferent arteriole and narrower outgoing efferent arteriole create high hydrostatic pressure in the glomerular capillaries.\n2. This high pressure forces the liquid part of blood (water, salts, glucose, urea) to filter across the capillary walls into Bowman’s capsule as glomerular filtrate.',
      boardTip: 'Explain that the difference in diameter generates the hydrostatic filtration pressure.'
    }
  },

  // --- ICSE HISTORY & CIVICS ---
  {
    id: 'chap-icse-hist-1',
    subjectId: 'sub-history-civics-icse',
    board: 'ICSE',
    chapterNumber: 1,
    unitName: 'Civics & Indian Constitution',
    title: 'The Union Parliament & The Supreme Court',
    description: 'Lok Sabha & Rajya Sabha composition, Money Bills, powers of the Speaker, and Original vs Appellate jurisdiction of Supreme Court.',
    estHours: 6.5,
    totalQuestions: 30,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Lok Sabha vs Rajya Sabha Powers', 'Money Bill Procedure', 'Supreme Court Writ Jurisdiction'],
    formulaList: [
      '\\text{Qualifications}: \\text{Lok Sabha (25 yrs), Rajya Sabha (30 yrs), Supreme Court Judge (5 yrs HC Judge)}',
      '\\text{Writs}: \\text{Habeas Corpus, Mandamus, Prohibition, Quo Warranto, Certiorari}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'The Lok Sabha is the House of the People (max 550 members) with special powers over Money Bills. The Rajya Sabha represents states (250 members, permanent house). The Supreme Court has Original Jurisdiction over inter-state disputes and Appellate Jurisdiction over civil/criminal appeals.',
    workedExample: {
      problem: 'Mention three exclusive powers of the Lok Sabha over the Rajya Sabha (ICSE 3-Mark Question).',
      solution: '1. Money Bills can only be introduced in the Lok Sabha.\n2. In case of a deadlock in joint session, the Lok Sabha prevails due to greater numerical strength.\n3. The Council of Ministers is collectively responsible only to the Lok Sabha; passing a No-Confidence Motion forces the government to resign.',
      boardTip: 'Mention the No-Confidence Motion privilege to secure maximum marks.'
    }
  },
  {
    id: 'chap-icse-hist-2',
    subjectId: 'sub-history-civics-icse',
    board: 'ICSE',
    chapterNumber: 2,
    unitName: 'Civics & Indian Constitution',
    title: 'The President and the Prime Minister',
    description: 'Qualifications and election of President (Electoral College), emergency powers (National, Financial, President’s Rule), and PM’s cabinet role.',
    estHours: 6.0,
    totalQuestions: 28,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['President’s Electoral College', 'Emergency Powers (Article 352, 356, 360)', 'Prime Minister as Keystone of Cabinet Arch'],
    formulaList: [
      '\\text{Emergency Powers}: \\text{Art 352 (National Emergency)}, \\text{Art 356 (State Breakdown)}, \\text{Art 360 (Financial)}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'The President is the constitutional nominal executive head, elected by an Electoral College consisting of elected members of both Houses of Parliament and Legislative Assemblies. The Prime Minister is the real executive head and key advisor.',
    workedExample: {
      problem: 'What constitutes the Electoral College for the election of the President of India?',
      solution: '1. Elected members of both Houses of Parliament (Lok Sabha and Rajya Sabha).\n2. Elected members of the Legislative Assemblies of the States (MLAs).\n3. Elected members of Legislative Assemblies of Union Territories (Delhi and Puducherry).\n4. Note: Nominated members do not participate.',
      boardTip: 'Emphasize that ONLY elected members participate (no nominated members).'
    }
  },
  {
    id: 'chap-icse-hist-3',
    subjectId: 'sub-history-civics-icse',
    board: 'ICSE',
    chapterNumber: 3,
    unitName: 'Indian National Movement',
    title: 'First War of Independence (Revolt of 1857)',
    description: 'Political causes (Doctrine of Lapse), economic exploitation, socio-religious causes, military discontent, greased cartridges, and Queen’s Proclamation 1858.',
    estHours: 7.0,
    totalQuestions: 32,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Doctrine of Lapse (Lord Dalhousie)', 'Enfield Rifle Greased Cartridges', 'Queen Victoria’s Proclamation 1858 End of Company Rule'],
    formulaList: [
      '\\text{Queen’s Proclamation 1858}: \\text{East India Company rule transferred to British Crown}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'Lord Dalhousie’s Doctrine of Lapse annexed Satara, Jhansi, and Nagpur when rulers died without natural heirs. The introduction of greased cartridges containing cow and pig fat sparked immediate mutiny among Hindu and Muslim sepoys at Meerut.',
    workedExample: {
      problem: 'Explain the military causes of the Revolt of 1857.',
      solution: '1. Low salary and poor prospects of promotion for Indian soldiers compared to British soldiers.\n2. General Service Enlistment Act (1856) required soldiers to serve overseas, which violated caste traditions (crossing sea led to loss of caste).\n3. Immediate trigger: Rumor that new Enfield rifle cartridges were greased with cow and pig fat.',
      boardTip: 'Mention General Service Enlistment Act 1856 by name.'
    }
  },
  {
    id: 'chap-icse-hist-4',
    subjectId: 'sub-history-civics-icse',
    board: 'ICSE',
    chapterNumber: 4,
    unitName: 'Contemporary World History',
    title: 'First World War & Rise of Dictatorships',
    description: 'Causes of WWI (Militarism, Alliances, Imperialism, Sarajevo assassination), Treaty of Versailles, and Rise of Fascism (Mussolini) & Nazism (Hitler).',
    estHours: 7.5,
    totalQuestions: 35,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Sarajevo Crisis (Assassination of Archduke Franz Ferdinand)', 'Treaty of Versailles Humiliation', 'Fascism in Italy & Nazism in Germany'],
    formulaList: [
      '\\text{Triple Entente (Britain, France, Russia)} \\leftrightarrow \\text{Triple Alliance (Germany, Austria-Hungary, Italy)}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'Archduke Franz Ferdinand was assassinated at Sarajevo on 28 June 1914 by Gavrilo Princip (Black Hand), triggering WWI. The harsh Treaty of Versailles (1919) imposed war guilt clause 231, heavy reparations (£6.6 billion), and demilitarisation on Germany, leading to Hitler’s rise.',
    workedExample: {
      problem: 'What was the immediate cause of the First World War?',
      solution: '1. The assassination of Archduke Franz Ferdinand (heir to the Austrian throne) and his wife Sophie at Sarajevo on 28 June 1914.\n2. Perpetrated by Gavrilo Princip, a member of the Serbian nationalist secret society Black Hand.\n3. Austria delivered an ultimatum to Serbia and declared war on 28 July 1914, bringing alliance partners into general war.',
      boardTip: 'Mention Archduke Franz Ferdinand, Sarajevo, and the Black Hand group.'
    }
  },
  {
    id: 'chap-icse-hist-5',
    subjectId: 'sub-history-civics-icse',
    board: 'ICSE',
    chapterNumber: 5,
    unitName: 'Contemporary World History',
    title: 'The United Nations & Non-Aligned Movement',
    description: 'Origin and objectives of the UN, General Assembly, Security Council (Veto power), UNESCO, WHO, UNICEF, and Panchsheel principles of NAM.',
    estHours: 6.5,
    totalQuestions: 30,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Security Council Composition (5 Permanent + 10 Non-Permanent)', 'Veto Power of Big 5', 'Specialised Agencies (WHO, UNICEF, UNESCO)', 'Panchsheel & NAM Architecture'],
    formulaList: [
      '\\text{Permanent 5 (P5)}: \\text{USA, UK, France, Russia, China (Hold Veto Power)}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'The UN was founded on 24 October 1945 to maintain international peace and security. The Security Council has 5 permanent veto-wielding members (USA, UK, France, Russia, China). NAM was founded at Bandung (1955) by Nehru, Tito, and Nasser to remain neutral during the Cold War.',
    workedExample: {
      problem: 'What is the composition and Veto power of the UN Security Council?',
      solution: '1. Composition: 15 members in total — 5 Permanent members (USA, UK, Russia, France, China) and 10 Non-permanent members elected for 2-year terms by General Assembly.\n2. Veto Power: A negative vote cast by any single permanent member invalidates a substantive resolution, even if all other 14 members vote in favor.',
      boardTip: 'Name all 5 permanent members explicitly in your answer.'
    }
  },

  // --- ICSE GEOGRAPHY ---
  {
    id: 'chap-icse-geo-1',
    subjectId: 'sub-geography-icse',
    board: 'ICSE',
    chapterNumber: 1,
    unitName: 'Topographical Map Work',
    title: 'Topographical Maps: Grid References & Contours',
    description: '4-figure and 6-figure grid references, contour intervals, conventional symbols, calculating distance, area, and settlement drainage patterns.',
    estHours: 7.0,
    totalQuestions: 30,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['4-Figure & 6-Figure Grid References', 'Contour Patterns (Steep vs Gentle Slope)', 'Drainage Patterns (Dendritic, Trellis, Radial)'],
    formulaList: [
      '\\text{Scale}: 2\\text{ cm} = 1\\text{ km} \\implies \\text{Representative Fraction (RF)} = 1 : 50,000'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'Eastings are vertical grid lines numbered west to east; Northings are horizontal grid lines numbered south to north. Always write Eastings first, then Northings (E before N). Contours close together indicate steep slopes; far apart indicate gentle slopes.',
    workedExample: {
      problem: 'Explain how to determine a 6-figure grid reference for a spot height on a Survey of India 1:50,000 toposheet.',
      solution: '1. Locate the 4-figure square: Find the Easting line to the left (e.g. 24) and Northing line below (e.g. 86) -> Grid square 2486.\n2. Divide the square into 10 tenths from west to east; count tenths to spot height (e.g. 4 tenths) -> Easting is 244.\n3. Divide from south to north; count tenths (e.g. 7 tenths) -> Northing is 867.\n4. Combined 6-figure reference: 244867.',
      boardTip: 'Rule of thumb: Eastings before Northings (E comes before N in alphabet).'
    }
  },
  {
    id: 'chap-icse-geo-2',
    subjectId: 'sub-geography-icse',
    board: 'ICSE',
    chapterNumber: 2,
    unitName: 'Physical Geography of India',
    title: 'Climate of India & Monsoon Mechanisms',
    description: 'South-West Monsoon (Arabian Sea and Bay of Bengal branches), Retreating monsoon, Western disturbances, and climatic data interpretation.',
    estHours: 6.5,
    totalQuestions: 30,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Arabian Sea vs Bay of Bengal Monsoon Branches', 'Western Disturbances & Winter Rain in Punjab', 'Annual Temperature Range Calculation'],
    formulaList: [
      '\\text{Annual Range of Temperature} = \\text{Maximum Mean Monthly Temp} - \\text{Minimum Mean Monthly Temp}',
      '\\text{Annual Rainfall} = \\sum \\text{Rainfall of 12 months}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'South-West Monsoon arrives in June split into Arabian Sea branch (strikes Western Ghats causing heavy orographic rain on windward side) and Bay of Bengal branch (strikes Garo-Khasi hills in Meghalaya). Tamil Nadu receives winter rain from North-East retreating monsoon.',
    workedExample: {
      problem: 'Why does Mumbai receive more rainfall than Pune, although both lie in the state of Maharashtra?',
      solution: '1. Mumbai lies on the windward side of the Western Ghats facing the moisture-laden Arabian Sea monsoon branch, resulting in heavy orographic precipitation (>200 cm).\n2. Pune lies on the leeward (rain-shadow) side where air descends and warms, yielding significantly lower rainfall (~70 cm).',
      boardTip: 'Use terms "windward side" and "rain-shadow / leeward side".'
    }
  },
  {
    id: 'chap-icse-geo-3',
    subjectId: 'sub-geography-icse',
    board: 'ICSE',
    chapterNumber: 3,
    unitName: 'Resources of India',
    title: 'Soils of India: Types & Conservation',
    description: 'Alluvial soil (In situ vs transported), Black lava soil (Regur), Red soil, Laterite soil, soil erosion mechanisms, and conservation measures.',
    estHours: 6.0,
    totalQuestions: 28,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Alluvial (Bangar/Khadar)', 'Black Soil (Self-Ploughing & Cotton)', 'Laterite Soil Leaching', 'Terrace Farming & Strip Cropping'],
    formulaList: [
      '\\text{Leaching}: \\text{Heavy rainfall washes silica and lime away, leaving iron and aluminium oxides}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'Black soil is formed by weathering of Deccan basaltic lava rocks, is rich in clay, develops deep cracks during summer (self-ploughing), and is ideal for cotton. Laterite soil is formed by intense leaching under high temperature and alternating wet/dry seasons.',
    workedExample: {
      problem: 'Name the soil formed by leaching. Mention two crops grown on it.',
      solution: '1. Soil formed by leaching: Laterite Soil.\n2. Crops grown: Tea, Coffee, Cashew nuts, and Rubber (when treated with fertilizers).',
      boardTip: 'State plantation crops (tea, coffee, cashew nut) for laterite soil.'
    }
  },
  {
    id: 'chap-icse-geo-4',
    subjectId: 'sub-geography-icse',
    board: 'ICSE',
    chapterNumber: 4,
    unitName: 'Resources of India',
    title: 'Water Resources & Irrigation Methods',
    description: 'Need for water conservation, conventional irrigation (Wells, Inundation canals, Tanks) vs modern irrigation (Drip, Sprinkler, Perennial canals), and Rainwater Harvesting.',
    estHours: 6.0,
    totalQuestions: 26,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['Well & Tube-well Irrigation', 'Tank Irrigation in South India', 'Drip & Sprinkler Micro-irrigation', 'Rooftop Rainwater Harvesting'],
    formulaList: [
      '\\text{Rainwater Harvest Volume} = \\text{Catchment Area } (m^2) \\times \\text{Annual Rainfall } (m) \\times \\text{Runoff Coefficient (0.8)}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'Tank irrigation is popular in the Deccan plateau because hard impermeable granite rocks prevent water percolation and canal excavation. Drip irrigation delivers water drop-by-drop directly to plant root zones, eliminating evaporation loss.',
    workedExample: {
      problem: 'Give two reasons why tank irrigation is popular in Southern India.',
      solution: '1. The undulating relief and impermeable crystalline hard rock terrain prevent underground seepage and make well/canal digging difficult.\n2. Natural depressions in the terrain can be easily dammed with earthen bunds to collect monsoon rainwater.',
      boardTip: 'Mention impermeable rocky terrain and hard-to-dig canals.'
    }
  },
  {
    id: 'chap-icse-geo-5',
    subjectId: 'sub-geography-icse',
    board: 'ICSE',
    chapterNumber: 5,
    unitName: 'Resources & Industries',
    title: 'Mineral and Energy Resources & Industries',
    description: 'Iron ore, Bauxite, Coal (Jharia, Raniganj), Petroleum (Mumbai High, Digboi), Non-conventional energy, and Agro vs Mineral-based industries (Tata Steel, Cotton).',
    estHours: 7.0,
    totalQuestions: 32,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Iron Ore Belts (Odisha-Jharkhand)', 'Coal Fields (Gondwana vs Tertiary)', 'Tata Iron & Steel Company (TISCO) Jamshedpur Location Advantages'],
    formulaList: [
      '\\text{TISCO Advantages}: \\text{Iron (Noamundi)} + \\text{Coal (Jharia)} + \\text{Water (Subarnarekha)} + \\text{Railway (Kolkata-Mumbai line)}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'Jamshedpur (TISCO) was chosen because of proximity to iron ore mines of Gurumahisani/Noamundi, coking coal from Jharia/Bokaro, uninterrupted water from Subarnarekha and Kharkai rivers, and proximity to Kolkata port.',
    workedExample: {
      problem: 'Mention three geographical advantages for the location of Tata Steel Plant at Jamshedpur.',
      solution: '1. Proximity to raw materials: Iron ore from Noamundi/Gurumahisani (70 km) and Coking Coal from Jharia/Bokaro (180 km).\n2. Abundant water supply: Perennial rivers Subarnarekha and Kharkai provide required cooling water.\n3. Transportation & Market: Located on Main Howrah-Mumbai railway line with access to Kolkata port and export markets.',
      boardTip: 'Name the specific coal (Jharia) and iron ore (Noamundi) sources.'
    }
  },

  // --- ICSE ENGLISH ---
  {
    id: 'chap-icse-eng-1',
    subjectId: 'sub-english-icse',
    board: 'ICSE',
    chapterNumber: 1,
    unitName: 'Drama: Julius Caesar by Shakespeare',
    title: 'Julius Caesar: Act III Forum Speeches & Assassination',
    description: 'The assassination of Caesar at the Senate House, Brutus’ prose speech on patriotism, and Antony’s powerful rhetorical funeral oration ("Friends, Romans, countrymen").',
    estHours: 7.5,
    totalQuestions: 35,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Antony’s Funeral Oration Rhetoric', 'Brutus’ Justification of Tyranny vs Freedom', 'Mob Psychology & Caesar’s Will'],
    formulaList: [
      '\\text{"Et tu, Brute? — Then fall, Caesar!"}',
      '\\text{"Cry \'Havoc!\' and let slip the dogs of war"}'
    ],
    conceptImage: '/concepts/eng_lit_3d.jpg',
    conceptNotes: 'In Act III Scene 2, Mark Antony masterfully manipulates Roman plebeians using irony: repeatedly calling Brutus and Cassius "honourable men" while displaying Caesar’s stabbed mantle and reading his generous will bequeathing 75 drachmas and private gardens to every Roman.',
    workedExample: {
      problem: 'How does Antony use irony in his funeral speech to incite the Roman crowd against the conspirators?',
      solution: '1. Antony repeatedly refers to Brutus as an "honourable man" while systematically refuting Brutus’ charge that Caesar was ambitious.\n2. He reminds the mob that Caesar refused the crown thrice at Lupercal and wept when the poor cried.\n3. By contrasting Caesar’s generosity with the brutal wounds on his body, the phrase "honourable men" becomes stinging sarcasm, transforming the mob into a raging riot.',
      boardTip: 'Cite the Lupercal crown refusal and Caesar’s will bequest.'
    }
  },
  {
    id: 'chap-icse-eng-2',
    subjectId: 'sub-english-icse',
    board: 'ICSE',
    chapterNumber: 2,
    unitName: 'Drama: Julius Caesar by Shakespeare',
    title: 'Julius Caesar: Act IV & V Sardis Quarrel & Philippi',
    description: 'The quarrel between Brutus and Cassius in the tent at Sardis, Portia’s suicide, Caesar’s ghost warning, and the Battle of Philippi.',
    estHours: 7.0,
    totalQuestions: 30,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Brutus and Cassius Tent Dispute (Bribery Charges)', 'Caesar’s Ghost Apparition', 'Noble Character of Brutus in Defeat'],
    formulaList: [
      '\\text{"There is a tide in the affairs of men, which, taken at the flood, leads on to fortune."}'
    ],
    conceptImage: '/concepts/eng_lit_3d.jpg',
    conceptNotes: 'In Act IV Scene 3, Brutus condemns Lucius Pella for bribery while Cassius accuses Brutus of being too rigid. Brutus reveals that his wife Portia committed suicide by swallowing burning coals. Caesar’s ghost appears to Brutus at night, proclaiming "Thou shalt see me at Philippi."',
    workedExample: {
      problem: 'What causes the bitter quarrel between Brutus and Cassius in Act IV Scene 3, and how is it resolved?',
      solution: '1. Brutus accuses Cassius of having an "itching palm" (taking bribes) and refusing funds to pay soldiers.\n2. Cassius feels offended that his loyalty is questioned by his closest friend.\n3. The quarrel subsides when Brutus reveals his deep sorrow over Portia’s tragic suicide, moving Cassius to offer heartfelt reconciliation.',
      boardTip: 'Use Shakespearean metaphors like "itching palm".'
    }
  },
  {
    id: 'chap-icse-eng-3',
    subjectId: 'sub-english-icse',
    board: 'ICSE',
    chapterNumber: 3,
    unitName: 'Treasure Chest: Poetry',
    title: 'The Patriot by Robert Browning & Nine Gold Medals',
    description: 'Browning’s dramatic monologue on fickle public adoration vs public execution, and David Roth’s poem celebrating empathy and true sportsmanship.',
    estHours: 6.0,
    totalQuestions: 28,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Fickle Public Acclaim in "The Patriot"', 'Religious Faith & Salvation in Browning', 'Empathy & Joint Victory in "Nine Gold Medals"'],
    formulaList: [
      '\\text{"It was roses, roses, all the way"} \\rightarrow \\text{"A rope cuts both my wrists behind"}'
    ],
    conceptImage: '/concepts/eng_lit_3d.jpg',
    conceptNotes: 'In "The Patriot", Browning highlights the transitiveness of political glory: a year ago the crowds threw roses and path flags; today he is led to the gallows with tied wrists in the rain, finding solace that God will reward him in heaven. "Nine Gold Medals" tells the inspiring story of Special Olympic runners stopping to lift a fallen contestant.',
    workedExample: {
      problem: 'Contrast the welcome the Patriot received one year ago with his current plight.',
      solution: '1. One year ago: Roofs were heaving with cheering crowds, path strewn with roses and myrtle, church steeples flamed with flags.\n2. Present day: Nobody is on the roofs; he is led to Shambles’ Gate in rain with bleeding wrists tied with tight rope while people throw stones at him.',
      boardTip: 'Contrast the imagery: "roses and myrtle" vs "stones and tight rope".'
    }
  },
  {
    id: 'chap-icse-eng-4',
    subjectId: 'sub-english-icse',
    board: 'ICSE',
    chapterNumber: 4,
    unitName: 'Treasure Chest: Short Stories',
    title: 'With the Photographer & An Angel in Disguise',
    description: 'Stephen Leacock’s humor on vanity and distorted portraits, and T.S. Arthur’s touching tale of love transforming bedridden orphan Maggie and Joe Thompson.',
    estHours: 6.0,
    totalQuestions: 26,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['Leacock’s Satire on Photographer’s Artificial Retouching', 'Maggie as the "Angel in Disguise"', 'Softening of Mrs. Thompson’s Bitter Heart'],
    formulaList: [
      '\\text{Theme}: \\text{Human warmth and compassion breathe life into cold, bitter domestic spaces}'
    ],
    conceptImage: '/concepts/eng_lit_3d.jpg',
    conceptNotes: 'In "With the Photographer", Leacock satirizes modern photographers who retouch and alter human facial features so drastically that the portrait no longer resembles the actual person. In "An Angel in Disguise", invalid orphan Maggie brings joy and unconditional love into the childless, unhappy home of Joe Thompson.',
    workedExample: {
      problem: 'Why is bedridden little Maggie called an "Angel in Disguise"?',
      solution: '1. Maggie was a lonely, crippled orphan whom no one in the village wanted to adopt.\n2. When Joe Thompson brought her home, her sweetness, patience, and vulnerability melted the cold, angry heart of Mrs. Thompson.\n3. She transformed a bitter, lonely household into a loving home, acting as a disguised blessing / angel.',
      boardTip: 'Highlight the transformation in Mrs. Thompson’s temperament.'
    }
  },
  {
    id: 'chap-icse-eng-5',
    subjectId: 'sub-english-icse',
    board: 'ICSE',
    chapterNumber: 5,
    unitName: 'Language Skills & Functional Writing',
    title: 'ICSE Notice, Email Writing & Grammar Synthesis',
    description: 'Official ICSE format for Notice & Email writing (Creative Title, Target Audience, Registration details), and combining sentences without using and/but/so.',
    estHours: 6.0,
    totalQuestions: 28,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Notice Writing Layout (Catchy Heading, Date, Time, Venue)', 'Formal Email to External Chief Guest / Principal', 'Synthesis of Sentences & Preposition Fillers'],
    formulaList: [
      '\\text{Notice Marks (5M)}: \\text{Heading (1M)} + \\text{Event (1M)} + \\text{Date/Time/Venue (2M)} + \\text{Target Group (1M)}',
      '\\text{Email Marks (5M)}: \\text{Email ID (0.5M)} + \\text{Subject (0.5M)} + \\text{Salutation (0.5M)} + \\text{Body (2.5M)} + \\text{Close (1M)}'
    ],
    conceptImage: '/concepts/eng_lit_3d.jpg',
    conceptNotes: 'ICSE Notice writing requires a creative, catchy title (e.g. "War of Words" for a debate competition) followed by the formal event name, date, time, venue, and target class eligibility. The accompanying email sends an official invitation to a school principal or judge.',
    workedExample: {
      problem: 'Provide a creative heading and notice draft for an Inter-School Debate Competition in ICSE Format.',
      solution: 'Heading: "WAR OF WORDS!"\nEvent: Inter-School English Debate Competition 2026\nDate: 25th September 2026\nTime: 09:30 AM to 01:30 PM\nVenue: School Auditorium, St. Xavier’s High School\nTarget Group: Students of Classes IX and X wishing to participate must register their names with the English Department by 18th September 2026.',
      boardTip: 'Always include a creative catchy title on top of the notice.'
    }
  },

  // =============================================================
  // 3. STATE BOARD CHAPTERS (7 SUBJECTS X 5 CHAPTERS = 35 CHAPTERS)
  // =============================================================

  // --- STATE BOARD MATHEMATICS ---
  {
    id: 'chap-state-math-1',
    subjectId: 'sub-math-state',
    board: 'STATE',
    chapterNumber: 1,
    unitName: 'Number Systems & Sets',
    title: 'Real Numbers & Sets Operations',
    description: 'Euclid’s division lemma, Venn diagrams, Set Union, Intersection, Difference, and proofs of irrationality of (√2 + √3).',
    estHours: 5.5,
    totalQuestions: 28,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Venn Diagram Representations', 'Set Operations (A ∪ B, A ∩ B, A \\ B)', 'Euclid’s Division Lemma'],
    formulaList: [
      'a = bq + r \\quad (0 \\le r < b)',
      'n(A \\cup B) = n(A) + n(B) - n(A \\cap B)',
      'A - B = \\{x : x \\in A \\text{ and } x \\notin B\\}'
    ],
    conceptImage: '/concepts/math_algebra_3d.jpg',
    conceptNotes: 'State Board Mathematics introduces formal Set Theory alongside Real Numbers. Union A ∪ B is all elements in A or B; Intersection A ∩ B is common elements; Difference A - B is elements in A but not in B. Venn diagrams provide visual representation.',
    workedExample: {
      problem: 'If $A = \\{1, 2, 3, 4, 5\\}$ and $B = \\{2, 3, 4, 5, 6, 7, 8\\}$, find $A \\cup B$, $A \\cap B$, and $(A - B)$.',
      solution: '1. $A \\cup B = \\{1, 2, 3, 4, 5, 6, 7, 8\\}$.\n2. $A \\cap B = \\{2, 3, 4, 5\\}$.\n3. $A - B = \\{1\\}$ (elements in A but not in B).\n4. Verification: $n(A \\cup B) = 8 = 5 + 7 - 4 = n(A) + n(B) - n(A \\cap B)$.',
      boardTip: 'Draw shaded Venn diagram circles for full presentation marks.'
    }
  },
  {
    id: 'chap-state-math-2',
    subjectId: 'sub-math-state',
    board: 'STATE',
    chapterNumber: 2,
    unitName: 'Algebra & Functions',
    title: 'Polynomials & Linear Equations System',
    description: 'Geometric meaning of zeroes of cubic/quadratic polynomials, division algorithm for polynomials, and graphical solutions of linear equations.',
    estHours: 6.0,
    totalQuestions: 30,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Zeroes of Cubic Polynomials', 'Division Algorithm p(x) = g(x)q(x) + r(x)', 'Graphical Method of Solving Linear Equations'],
    formulaList: [
      'p(x) = g(x) \\cdot q(x) + r(x) \\quad (\\text{deg } r(x) < \\text{deg } g(x))',
      '\\text{Cubic Zeroes}: \\alpha + \\beta + \\gamma = -\\frac{b}{a}, \\quad \\alpha\\beta\\gamma = -\\frac{d}{a}'
    ],
    conceptImage: '/concepts/math_algebra_3d.jpg',
    conceptNotes: 'The degree of the remainder polynomial r(x) must be strictly less than the degree of divisor g(x). Number of zeroes of polynomial p(x) equals number of points where graph intersects the X-axis.',
    workedExample: {
      problem: 'Verify that 3, -1, and -1/3 are zeroes of cubic polynomial p(x) = 3x³ - 5x² - 11x - 3.',
      solution: '1. $p(3) = 3(27) - 5(9) - 11(3) - 3 = 81 - 45 - 33 - 3 = 0$.\n2. $p(-1) = 3(-1) - 5(1) - 11(-1) - 3 = -3 - 5 + 11 - 3 = 0$.\n3. $p(-1/3) = 3(-1/27) - 5(1/9) - 11(-1/3) - 3 = -1/9 - 5/9 + 33/9 - 27/9 = 0$.\n4. All 3 values evaluate to zero; hence they are roots.',
      boardTip: 'Calculate each p(x) value with explicit line-by-line substitutions.'
    }
  },
  {
    id: 'chap-state-math-3',
    subjectId: 'sub-math-state',
    board: 'STATE',
    chapterNumber: 3,
    unitName: 'Sequences & Series',
    title: 'Progressions: Arithmetic & Geometric Progressions',
    description: 'nth term of AP and GP, sum of first n terms of AP (S_n), finding common difference and common ratio, and word problems.',
    estHours: 6.5,
    totalQuestions: 32,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['nth term of AP (a_n = a + (n-1)d)', 'Sum of n terms AP (S_n)', 'nth term of GP (a_n = a r^{n-1})'],
    formulaList: [
      'a_n = a + (n-1)d, \\quad S_n = \\frac{n}{2}[2a + (n-1)d] = \\frac{n}{2}(a + l)',
      '\\text{GP nth term}: a_n = a r^{n-1}, \\quad S_n = \\frac{a(r^n - 1)}{r - 1}'
    ],
    conceptImage: '/concepts/math_algebra_3d.jpg',
    conceptNotes: 'State Board Class 10 uniquely includes both Arithmetic Progressions (AP, constant difference d) and Geometric Progressions (GP, constant ratio r). Sum of n terms S_n = n/2(a + l).',
    workedExample: {
      problem: 'Find the sum of all 3-digit natural numbers which are divisible by 7.',
      solution: '1. First 3-digit number divisible by 7 is 105; last is 994.\n2. AP: 105, 112, 119, ..., 994 ($a = 105, d = 7, a_n = 994$).\n3. $994 = 105 + (n - 1)7 \\implies 889 = 7(n - 1) \\implies n - 1 = 127 \\implies n = 128$.\n4. $S_{128} = \\frac{128}{2}(105 + 994) = 64 \\times 1099 = 70,336$.',
      boardTip: 'Find the exact count n first before applying the sum formula.'
    }
  },
  {
    id: 'chap-state-math-4',
    subjectId: 'sub-math-state',
    board: 'STATE',
    chapterNumber: 4,
    unitName: 'Coordinate Geometry',
    title: 'Coordinate Geometry: Distance, Section & Area',
    description: 'Distance between two points, Section formula (internal division), Midpoint formula, and Area of triangle using coordinates.',
    estHours: 6.5,
    totalQuestions: 30,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Distance Formula', 'Section Formula (m₁x₂ + m₂x₁)/(m₁+m₂)', 'Area of Triangle with Coordinates'],
    formulaList: [
      'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}',
      'P(x, y) = \\left(\\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}, \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2}\\right)',
      '\\text{Area} = \\frac{1}{2} |x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)|'
    ],
    conceptImage: '/concepts/math_trig_3d.jpg',
    conceptNotes: 'If three points are collinear, the area of the triangle formed by them is zero. Section formula finds the coordinates of a point dividing a line segment in ratio m₁:m₂.',
    workedExample: {
      problem: 'Find the value of k for which the points A(2, 3), B(4, k), and C(6, -3) are collinear.',
      solution: '1. Collinear points have Triangle Area = 0.\n2. $\\frac{1}{2}|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)| = 0$.\n3. $|2(k - (-3)) + 4(-3 - 3) + 6(3 - k)| = 0$.\n4. $|2k + 6 - 24 + 18 - 6k| = 0 \\implies |-4k| = 0 \\implies k = 0$.',
      boardTip: 'Set area = 0 directly when solving collinearity questions.'
    }
  },
  {
    id: 'chap-state-math-5',
    subjectId: 'sub-math-state',
    board: 'STATE',
    chapterNumber: 5,
    unitName: 'Trigonometry & Statistics',
    title: 'Trigonometry Ratios & Grouped Statistics',
    description: 'Trigonometric identities, angle of elevation/depression heights & distances, and calculating Mean, Median, Mode for grouped frequency data.',
    estHours: 7.0,
    totalQuestions: 35,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Trigonometry Heights & Distances', 'Assumed Mean & Step Deviation Method', 'Mode of Grouped Data (Modal Class Formula)'],
    formulaList: [
      '\\text{Mean } \\bar{x} = a + \\frac{\\sum f_i u_i}{\\sum f_i} \\times h',
      '\\text{Mode} = l + \\left(\\frac{f_1 - f_0}{2f_1 - f_0 - f_2}\\right) \\times h'
    ],
    conceptImage: '/concepts/math_trig_3d.jpg',
    conceptNotes: 'In grouped statistics: Modal class is the interval with highest frequency f₁. Mode formula: l + [(f₁ - f₀)/(2f₁ - f₀ - f₂)] × h where l is lower limit of modal class.',
    workedExample: {
      problem: 'From the top of a 75m high lighthouse, the angles of depression of two ships are 30° and 45°. Find distance between the two ships.',
      solution: '1. Let height $AB = 75\\text{ m}$. In $\\triangle ABC$, $\\tan 45^\\circ = \\frac{75}{BC} \\implies BC = 75\\text{ m}$.\n2. In $\\triangle ABD$, $\\tan 30^\\circ = \\frac{75}{BD} \\implies \\frac{1}{\\sqrt{3}} = \\frac{75}{BD} \\implies BD = 75\\sqrt{3}\\text{ m}$.\n3. Distance between ships $CD = BD - BC = 75\\sqrt{3} - 75 = 75(\\sqrt{3} - 1) = 75(1.732 - 1) = 54.9\\text{ metres}$.',
      boardTip: 'Draw a neat right-angled triangle diagram and label all angles of depression.'
    }
  },

  // --- STATE BOARD PHYSICAL SCIENCE ---
  {
    id: 'chap-state-ps-1',
    subjectId: 'sub-physical-science-state',
    board: 'STATE',
    chapterNumber: 1,
    unitName: 'Thermal Physics',
    title: 'Heat & Principle of Method of Mixtures',
    description: 'Specific heat, thermal equilibrium, latent heat of vaporization, and experimental determination of specific heat of a solid using calorimeter.',
    estHours: 6.0,
    totalQuestions: 30,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Specific Heat (Q = msΔT)', 'Calorimeter Method of Mixtures', 'Evaporation vs Boiling'],
    formulaList: [
      'Q = m \\cdot s \\cdot \\Delta T',
      's = \\frac{Q}{m \\cdot \\Delta T} \\quad (\\text{cal/g}^\\circ\\text{C} \\text{ or } \\text{J/kg}\\cdot\\text{K})',
      '\\text{Heat Lost by Hot Body} = \\text{Heat Gained by Cold Body + Calorimeter}'
    ],
    conceptImage: '/concepts/physics_optics_3d.jpg',
    conceptNotes: 'Specific heat s is the amount of heat required to raise the temperature of unit mass of substance by 1°C: Q = msΔT. In thermal equilibrium, Heat Lost = Heat Gained.',
    workedExample: {
      problem: 'An iron shot of mass 100g at 100°C is dropped into 200g of water at 20°C. If calorimeter water equivalent is 10g, find final mixture temperature (s_iron = 0.11 cal/g°C).',
      solution: '1. Heat lost by iron: $100 \\times 0.11 \\times (100 - T) = 11(100 - T)$.\n2. Heat gained by water + calorimeter: $(200 + 10) \\times 1 \\times (T - 20) = 210(T - 20)$.\n3. $1100 - 11T = 210T - 4200 \\implies 221T = 5300 \\implies T \\approx 23.98^\\circ\\text{C}$.',
      boardTip: 'Add the calorimeter water equivalent to water mass before multiplying by specific heat.'
    }
  },
  {
    id: 'chap-state-ps-2',
    subjectId: 'sub-physical-science-state',
    board: 'STATE',
    chapterNumber: 2,
    unitName: 'Atomic Physics & Quantum Theory',
    title: 'Structure of Atom & Quantum Numbers',
    description: 'Bohr-Sommerfeld model, electromagnetic spectrum, Planck’s quantum theory, four quantum numbers (n, l, m_l, m_s), and Aufbau principle.',
    estHours: 6.5,
    totalQuestions: 32,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Four Quantum Numbers (n, l, m_l, m_s)', 'Aufbau Principle & (n + l) Rule', 'Hund’s Rule & Pauli’s Exclusion Principle'],
    formulaList: [
      'E = h \\nu = \\frac{hc}{\\lambda}',
      'l = 0\\, (s), 1\\, (p), 2\\, (d), 3\\, (f); \\quad m_l = -l \\dots 0 \\dots +l'
    ],
    conceptImage: '/concepts/chem_molecules_3d.jpg',
    conceptNotes: 'The state of an electron is uniquely defined by 4 quantum numbers: Principal (n), Azimuthal (l), Magnetic (m_l), and Spin (m_s). Aufbau Principle states that electrons fill lowest energy orbitals first following the (n + l) rule.',
    workedExample: {
      problem: 'Write all four quantum numbers for the outermost 11th electron of Sodium (Na).',
      solution: '1. Sodium ($Z = 11$): Electronic configuration is $1s^2 2s^2 2p^6 3s^1$.\n2. Outermost electron is in $3s^1$ subshell.\n3. Principal quantum number $n = 3$.\n4. Azimuthal quantum number $l = 0$ (for s orbital).\n5. Magnetic quantum number $m_l = 0$.\n6. Spin quantum number $m_s = +1/2$ (or $-1/2$).',
      boardTip: 'For s-orbitals, azimuthal l and magnetic m_l are always 0.'
    }
  },
  {
    id: 'chap-state-ps-3',
    subjectId: 'sub-physical-science-state',
    board: 'STATE',
    chapterNumber: 3,
    unitName: 'Inorganic Chemistry & Classification',
    title: 'Periodic Classification of Elements',
    description: 'Dobereiner’s triads, Newlands’ law of octaves, Mendeleev’s table, Modern Periodic Table, and periodic trends in ionization energy and electronegativity.',
    estHours: 6.0,
    totalQuestions: 28,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Mendeleev’s Periodic Law vs Modern Law', 'Ionization Energy Trends', 'Electronegativity (Pauling Scale)'],
    formulaList: [
      '\\text{Ionization Energy}: \\text{Increases across a period (left to right), Decreases down a group}'
    ],
    conceptImage: '/concepts/chem_molecules_3d.jpg',
    conceptNotes: 'Ionization energy is the energy required to remove the outermost electron from an isolated gaseous atom. It increases across a period due to higher nuclear charge and decreases down a group due to screening effect and larger radius.',
    workedExample: {
      problem: 'Why is the second ionization energy of Sodium (Na) exceptionally higher than its first ionization energy?',
      solution: '1. First electron removal from Sodium ($1s^2 2s^2 2p^6 3s^1$) leaves a stable noble gas octet configuration ($1s^2 2s^2 2p^6$).\n2. Removing a second electron requires disrupting this stable complete octet shell and overcoming very strong nuclear attraction.',
      boardTip: 'Mention the stable noble gas octet electronic configuration of Na⁺.'
    }
  },
  {
    id: 'chap-state-ps-4',
    subjectId: 'sub-physical-science-state',
    board: 'STATE',
    chapterNumber: 4,
    unitName: 'Current Electricity & Electromagnetism',
    title: 'Electric Current & Kirchhoff’s Laws',
    description: 'Drift velocity, Ohm’s law, Kirchhoff’s Current Law (Junction rule), Kirchhoff’s Voltage Law (Loop rule), and Faraday’s law of induction.',
    estHours: 7.5,
    totalQuestions: 38,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Drift Velocity (I = n A e v_d)', 'Kirchhoff’s Current Law (KCL)', 'Kirchhoff’s Voltage Law (KVL Loop Rule)'],
    formulaList: [
      'I = n A e v_d',
      '\\sum I_{\\text{in}} = \\sum I_{\\text{out}} \\quad (\\text{Conservation of Charge})',
      '\\sum \\Delta V = 0 \\quad (\\text{Conservation of Energy})'
    ],
    conceptImage: '/concepts/physics_elec_3d.jpg',
    conceptNotes: 'Kirchhoff’s First Law (Junction Rule) is based on Conservation of Electric Charge: Sum of currents entering a junction equals sum of currents leaving. Kirchhoff’s Second Law (Loop Rule) is based on Conservation of Energy: Algebraic sum of potential changes around any closed loop is zero.',
    workedExample: {
      problem: 'State Kirchhoff’s Junction Rule and Loop Rule and mention their underlying conservation laws.',
      solution: '1. Junction Rule (KCL): At any junction in an electric circuit, the sum of currents entering equals sum of currents leaving (based on Conservation of Charge).\n2. Loop Rule (KVL): In any closed loop, the algebraic sum of all EMFs and voltage drops ($IR$) is zero (based on Conservation of Energy).',
      boardTip: 'Name Conservation of Charge and Conservation of Energy explicitly.'
    }
  },
  {
    id: 'chap-state-ps-5',
    subjectId: 'sub-physical-science-state',
    board: 'STATE',
    chapterNumber: 5,
    unitName: 'Applied Chemistry & Metallurgy',
    title: 'Principles of Metallurgy & Carbon Compounds',
    description: 'Extraction of metals from ores (Concentration, Roasting, Calcination, Smelting with flux), and allotropes of carbon (Diamond, Graphite, Graphene, Nanotubes).',
    estHours: 7.0,
    totalQuestions: 34,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Froth Floatation Process for Sulphide Ores', 'Smelting & Role of Flux (Gangue + Flux = Slag)', 'Carbon Allotropes (Diamond vs Graphite)'],
    formulaList: [
      '\\text{Gangue (Impurity)} + \\text{Flux} \\rightarrow \\text{Slag (Fusible Waste)}',
      '\\text{CaO (Basic Flux)} + \\text{SiO}_2 \\text{ (Acidic Gangue)} \\rightarrow \\text{CaSiO}_3 \\text{ (Slag)}'
    ],
    conceptImage: '/concepts/chem_acids_metal_3d.jpg',
    conceptNotes: 'Froth Floatation separates sulphide ores using pine oil (ore particles are wetted by oil, gangue by water). Smelting uses a flux to react with gangue forming easily removable molten slag. Graphite conducts electricity because each carbon atom has one delocalised free electron.',
    workedExample: {
      problem: 'What is a flux? Give an example of an acidic and basic flux and explain the formation of slag.',
      solution: '1. Flux is a substance added during smelting to react with infusible impurities (gangue) and convert them into a fusible mass called slag.\n2. Basic Flux: $\\text{CaO}$ or $\\text{CaCO}_3$ (used for acidic gangue like $\\text{SiO}_2$): $\\text{CaO} + \\text{SiO}_2 \\rightarrow \\text{CaSiO}_3$ (Slag).\n3. Acidic Flux: $\\text{SiO}_2$ (used for basic gangue like $\\text{FeO}$): $\\text{FeO} + \\text{SiO}_2 \\rightarrow \\text{FeSiO}_3$ (Slag).',
      boardTip: 'Write the word equation Gangue + Flux = Slag.'
    }
  },

  // --- STATE BOARD CHEMISTRY ---
  {
    id: 'chap-state-chem-1',
    subjectId: 'sub-chemistry-state',
    board: 'STATE',
    chapterNumber: 1,
    unitName: 'Chemical Foundations',
    title: 'Chemical Reactions & Balanced Equations',
    description: 'Types of chemical reactions, combination, decomposition, displacement, double displacement, redox, and balancing by hit-and-trial method.',
    estHours: 6.0,
    totalQuestions: 30,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['Balancing Chemical Reactions', 'Exothermic vs Endothermic Reactions', 'Precipitation and Gas Evolution'],
    formulaList: [
      '2\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O} + \\text{Heat (Exothermic)}',
      '\\text{CaCO}_3 \\xrightarrow{\\Delta} \\text{CaO} + \\text{CO}_2 \\uparrow \\text{ (Decomposition)}'
    ],
    conceptImage: '/concepts/chem_molecules_3d.jpg',
    conceptNotes: 'A balanced chemical equation obeys the Law of Conservation of Mass: total mass of reactants equals total mass of products. Decomposition reactions require energy input in form of heat, light, or electricity.',
    workedExample: {
      problem: 'Balance the following equation: $\\text{Fe} + \\text{H}_2\\text{O} \\rightarrow \\text{Fe}_3\\text{O}_4 + \\text{H}_2$.',
      solution: '1. Count atoms: Fe (1 vs 3), H (2 vs 2), O (1 vs 4).\n2. Balance Oxygen: Multiply $\\text{H}_2\\text{O}$ by 4 $\\implies \\text{Fe} + 4\\text{H}_2\\text{O} \\rightarrow \\text{Fe}_3\\text{O}_4 + \\text{H}_2$.\n3. Balance Hydrogen: Multiply $\\text{H}_2$ by 4 $\\implies \\text{Fe} + 4\\text{H}_2\\text{O} \\rightarrow \\text{Fe}_3\\text{O}_4 + 4\\text{H}_2$.\n4. Balance Iron: Multiply $\\text{Fe}$ by 3 $\\implies 3\\text{Fe} + 4\\text{H}_2\\text{O} \\rightarrow \\text{Fe}_3\\text{O}_4 + 4\\text{H}_2$.',
      boardTip: 'Balance elements occurring in highest number of atoms first (Oxygen in this case).'
    }
  },
  {
    id: 'chap-state-chem-2',
    subjectId: 'sub-chemistry-state',
    board: 'STATE',
    chapterNumber: 2,
    unitName: 'Inorganic Chemistry',
    title: 'Acids, Bases and Salts & pH Indicators',
    description: 'Reaction of acids with metals and carbonates, neutralization, strength of acids/bases, pH scale, and domestic chemicals (Washing soda, Baking soda).',
    estHours: 6.5,
    totalQuestions: 32,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Reaction of Acids with Active Metals (H₂ Gas)', 'Neutralization Reactions', 'Baking Soda Preparation (Solvay Process)'],
    formulaList: [
      '\\text{Acid} + \\text{Base} \\rightarrow \\text{Salt} + \\text{Water}',
      '\\text{NaCl} + \\text{H}_2\\text{O} + \\text{CO}_2 + \\text{NH}_3 \\rightarrow \\text{NH}_4\\text{Cl} + \\text{NaHCO}_3'
    ],
    conceptImage: '/concepts/chem_acids_metal_3d.jpg',
    conceptNotes: 'Acids react with active metals to liberate Hydrogen gas which burns with a characteristic pop sound. Sodium Hydrogen Carbonate (Baking soda, NaHCO₃) produces CO₂ on heating, causing cakes to rise.',
    workedExample: {
      problem: 'How is Baking Soda prepared industrially? Write the balanced chemical equation.',
      solution: '1. Industrial Preparation: Solvay Process using cold concentrated brine ($\\text{NaCl}$), ammonia, and carbon dioxide.\n2. Chemical Reaction: $\\text{NaCl} + \\text{H}_2\\text{O} + \\text{CO}_2 + \\text{NH}_3 \\rightarrow \\text{NH}_4\\text{Cl} + \\text{NaHCO}_3$.\n3. Sodium hydrogen carbonate separates out as solid precipitate due to low solubility.',
      boardTip: 'Write the Solvay process chemical equation with all 4 reactants.'
    }
  },
  {
    id: 'chap-state-chem-3',
    subjectId: 'sub-chemistry-state',
    board: 'STATE',
    chapterNumber: 3,
    unitName: 'Metallurgy & Ores',
    title: 'Principles of Metallurgy & Ore Refining',
    description: 'Occurrence of metals in nature, extraction techniques based on reactivity series, smelting, roasting, calcination, and electrolytic refining of copper.',
    estHours: 7.0,
    totalQuestions: 34,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Electrolytic Refining of Copper (Anode Mud)', 'Thermite Process for Railway Track Welding', 'Corrosion Prevention (Galvanization)'],
    formulaList: [
      '\\text{Thermite Reaction}: \\text{Fe}_2\\text{O}_3 + 2\\text{Al} \\rightarrow 2\\text{Fe (molten)} + \\text{Al}_2\\text{O}_3 + \\text{Heat}',
      '\\text{At Anode: } \\text{Cu} - 2e^- \\rightarrow \\text{Cu}^{2+}, \\quad \\text{At Cathode: } \\text{Cu}^{2+} + 2e^- \\rightarrow \\text{Cu}'
    ],
    conceptImage: '/concepts/chem_acids_metal_3d.jpg',
    conceptNotes: 'In electrolytic refining of copper: impure copper is made the anode, thin pure copper strip is the cathode, and acidified CuSO₄ is the electrolyte. Pure copper deposits on cathode while noble metals settle as anode mud.',
    workedExample: {
      problem: 'Explain the Thermite process and mention its industrial application.',
      solution: '1. The Thermite reaction is the highly exothermic reduction of Iron(III) oxide using Aluminium powder.\n2. Equation: $\\text{Fe}_2\\text{O}_3 + 2\\text{Al} \\rightarrow 2\\text{Fe (molten)} + \\text{Al}_2\\text{O}_3 + \\text{Heat}$.\n3. Application: The molten iron produced is directly poured to weld cracked railway tracks and heavy machine parts in situ.',
      boardTip: 'State the railway track welding application.'
    }
  },
  {
    id: 'chap-state-chem-4',
    subjectId: 'sub-chemistry-state',
    board: 'STATE',
    chapterNumber: 4,
    unitName: 'Organic Chemistry',
    title: 'Carbon and its Compounds & Allotropes',
    description: 'Catenation and tetravalency of carbon, hydrocarbons, homologous series, functional groups, and soaps/detergents.',
    estHours: 8.0,
    totalQuestions: 40,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Catenation and Tetravalency', 'Homologous Series Characteristics', 'Soaps vs Synthetic Detergents in Hard Water'],
    formulaList: [
      '\\text{Catenation}: \\text{Ability of carbon atoms to form strong stable C-C covalent bonds}',
      '\\text{Detergent} = \\text{Sodium alkyl benzene sulphonate (works in hard water)}'
    ],
    conceptImage: '/concepts/chem_molecules_3d.jpg',
    conceptNotes: 'Carbon forms millions of compounds due to two unique properties: Tetravalency (4 valence electrons) and Catenation (self-linking ability). Synthetic detergents do not form insoluble scum with calcium and magnesium ions in hard water.',
    workedExample: {
      problem: 'Why do synthetic detergents lather easily in hard water while soaps form scum?',
      solution: '1. Soaps contain carboxylate ions ($\\text{R-COO}^-\\text{Na}^+$) which react with $\\text{Ca}^{2+}$ and $\\text{Mg}^{2+}$ ions in hard water to precipitate insoluble sticky scum (calcium/magnesium soaps).\n2. Synthetic detergents have sulphonate or sulphate groups ($\\text{R-SO}_3^-\\text{Na}^+$) whose calcium and magnesium salts are soluble in water, forming rich lather without scum.',
      boardTip: 'Mention the formation of soluble calcium sulphonate salts.'
    }
  },
  {
    id: 'chap-state-chem-5',
    subjectId: 'sub-chemistry-state',
    board: 'STATE',
    chapterNumber: 5,
    unitName: 'Atomic Structure & Bonding',
    title: 'Structure of Atom & Chemical Bonding',
    description: 'Orbital electronic configuration, Lewis dot symbols, ionic bonding in NaCl/MgCl₂, and covalent bonding in O₂, N₂, CH₄.',
    estHours: 6.5,
    totalQuestions: 30,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Lewis Electron Dot Structures', 'Electrovalent (Ionic) Bonding', 'Covalent C-H, O=O, and N≡N Bonds'],
    formulaList: [
      '\\text{Octet Rule}: \\text{Atoms gain, lose or share electrons to attain 8 valence electrons}'
    ],
    conceptImage: '/concepts/chem_molecules_3d.jpg',
    conceptNotes: 'Ionic bonding involves complete transfer of electrons from a metal to a non-metal (forming electrostatic lattice). Covalent bonding involves mutual sharing of electron pairs.',
    workedExample: {
      problem: 'Draw the electron dot transfer diagram for the formation of Magnesium Chloride (MgCl₂).',
      solution: '1. Magnesium ($Z=12$: $2, 8, 2$) loses 2 valence electrons $\\implies \\text{Mg} \\rightarrow \\text{Mg}^{2+} + 2e^-$.\n2. Two Chlorine atoms ($Z=17$: $2, 8, 7$) each gain 1 electron $\\implies 2\\text{Cl} + 2e^- \\rightarrow 2\\text{Cl}^-$.\n3. Strong electrostatic attraction forms ionic compound: $\\text{Mg}^{2+}[\\text{:}\\ddot{\\text{Cl}}\\text{:}^-] _2$.',
      boardTip: 'Show both chlorine atoms receiving one electron each from magnesium.'
    }
  },

  // --- STATE BOARD BIOLOGICAL SCIENCE ---
  {
    id: 'chap-state-bs-1',
    subjectId: 'sub-biological-science-state',
    board: 'STATE',
    chapterNumber: 1,
    unitName: 'Life Processes',
    title: 'Nutrition: Autotrophic & Heterotrophic',
    description: 'Autotrophic photosynthesis in grana/stroma, Mohl’s half-leaf experiment, human digestive system, and digestive enzymes action.',
    estHours: 6.5,
    totalQuestions: 32,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Mohl’s Half-Leaf CO₂ Experiment', 'Light Reaction (Grana) vs Dark Reaction (Stroma)', 'Digestive Enzymes (Pepsin, Trypsin, Lipase)'],
    formulaList: [
      '6\\text{CO}_2 + 12\\text{H}_2\\text{O} \\xrightarrow[\\text{Chlorophyll}]{\\text{Light}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 + 6\\text{H}_2\\text{O}',
      '\\text{ATP Yield} = 38\\text{ ATP per Glucose}'
    ],
    conceptImage: '/concepts/bio_heart_3d.jpg',
    conceptNotes: 'Photosynthesis occurs in chloroplasts: Light reaction takes place in grana thylakoids (photolysis of water produces ATP and NADPH), and Dark reaction takes place in stroma (fixing CO₂ into glucose via Calvin cycle). Mohl’s half-leaf experiment uses KOH to absorb CO₂ and proves carbon dioxide is essential.',
    workedExample: {
      problem: 'Describe Mohl’s half-leaf experiment to prove that carbon dioxide is necessary for photosynthesis (State Board 4-Mark Question).',
      solution: '1. Destarch a potted plant by keeping it in darkness for 48 hours.\n2. Insert half of a leaf into a wide-mouthed bottle containing $\\text{KOH}$ solution (which absorbs $\\text{CO}_2$) through a split cork.\n3. Keep the setup in sunlight for 4-5 hours.\n4. Test the leaf for starch with iodine solution:\n   - The portion inside bottle ($\text{no } \\text{CO}_2$) remains colorless/brown (negative test).\n   - The portion exposed to air turns blue-black (positive test).\n5. Conclusion: Carbon dioxide is essential for photosynthesis.',
      boardTip: 'Mention destarching the plant first and the specific role of KOH in absorbing carbon dioxide.'
    }
  },
  {
    id: 'chap-state-bs-2',
    subjectId: 'sub-biological-science-state',
    board: 'STATE',
    chapterNumber: 2,
    unitName: 'Life Processes',
    title: 'Respiration: The Energy Producing System',
    description: 'Cellular respiration, glycolysis in cytoplasm, Krebs cycle in mitochondria, anaerobic fermentation in yeast, and human respiratory system.',
    estHours: 6.5,
    totalQuestions: 30,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Glycolysis (Glucose to Pyruvate)', 'Aerobic vs Anaerobic Respiration', 'Alveoli Gaseous Exchange'],
    formulaList: [
      '\\text{Anaerobic Respiration}: \\text{Pyruvate} \\rightarrow 2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{CO}_2 + 2\\text{ ATP}',
      '\\text{Aerobic Respiration}: \\text{Pyruvate} + \\text{O}_2 \\rightarrow 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + 38\\text{ ATP}'
    ],
    conceptImage: '/concepts/bio_heart_3d.jpg',
    conceptNotes: 'Cellular respiration releases energy in the form of ATP. Glycolysis breaks 6-carbon glucose into two 3-carbon pyruvate molecules in the cytoplasm without oxygen. In mitochondria, pyruvate is completely oxidised to CO₂ and H₂O with 38 ATP molecules produced.',
    workedExample: {
      problem: 'Differentiate between Aerobic and Anaerobic respiration.',
      solution: '1. Oxygen: Aerobic requires oxygen; Anaerobic occurs in absence of oxygen.\n2. Site: Aerobic occurs in cytoplasm and mitochondria; Anaerobic occurs only in cytoplasm.\n3. End Products: Aerobic yields $\\text{CO}_2$ and $\\text{H}_2\\text{O}$; Anaerobic yields ethanol/lactic acid and $\\text{CO}_2$.\n4. Energy: Aerobic yields 38 ATP per glucose; Anaerobic yields only 2 ATP.',
      boardTip: 'Highlight the difference in ATP yield (38 ATP vs 2 ATP).'
    }
  },
  {
    id: 'chap-state-bs-3',
    subjectId: 'sub-biological-science-state',
    board: 'STATE',
    chapterNumber: 3,
    unitName: 'Life Processes',
    title: 'Transportation: The Circulatory System',
    description: 'Internal structure of human heart, cardiac valves, single vs double circulation, lymphatic system, and xylem/phloem transport in plants.',
    estHours: 7.0,
    totalQuestions: 34,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Structure of Heart & Cardiac Cycle', 'Double Circulation in Humans', 'Xylem (Water) vs Phloem (Translocation)'],
    formulaList: [
      '\\text{Blood} = \\text{Plasma} + \\text{Corpuscles (RBC, WBC, Platelets)}',
      '\\text{Lymph} = \\text{Blood without RBCs and large plasma proteins}'
    ],
    conceptImage: '/concepts/bio_heart_3d.jpg',
    conceptNotes: 'The human heart pumps oxygenated blood from lungs to body tissues via aorta, and returns deoxygenated blood to lungs via pulmonary artery. Lymph is tissue fluid drained back into venous system.',
    workedExample: {
      problem: 'What is double circulation? Why is it necessary in human beings?',
      solution: '1. Double circulation means blood passes through the heart twice during one complete circuit: Pulmonary circulation (Heart -> Lungs -> Heart) and Systemic circulation (Heart -> Body tissues -> Heart).\n2. Necessity: It completely separates oxygenated and deoxygenated blood, maintaining high oxygen delivery to meet high energy requirements for constant body temperature (warm-blooded).',
      boardTip: 'Explain that it maintains high metabolic efficiency for endothermic warm-blooded mammals.'
    }
  },
  {
    id: 'chap-state-bs-4',
    subjectId: 'sub-biological-science-state',
    board: 'STATE',
    chapterNumber: 4,
    unitName: 'Life Processes',
    title: 'Excretion: The Wastage Disposing System',
    description: 'Structure of kidney, L.S. of kidney, nephron anatomy, formation of urine (Glomerular filtration, Tubular reabsorption), and Hemodialysis.',
    estHours: 7.0,
    totalQuestions: 32,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Structure of Nephron', 'Urine Formation Stages', 'Dialysis (Artificial Kidney)'],
    formulaList: [
      '\\text{Filtration Pressure} = \\text{Glomerular Hydrostatic Pressure} - (\\text{Osmotic} + \\text{Capsular Pressure})'
    ],
    conceptImage: '/concepts/bio_heart_3d.jpg',
    conceptNotes: 'Each human kidney contains ~1.2 million nephrons. In hemodialysis (artificial kidney), patient’s blood is passed through cellophane tubes bathed in dialysing fluid with same osmotic pressure as normal blood but lacking nitrogenous wastes.',
    workedExample: {
      problem: 'Explain the working principle of an artificial kidney (Hemodialysis machine).',
      solution: '1. Patient’s blood is drawn from an artery, mixed with anticoagulant heparin, and pumped through semi-permeable cellophane tubes.\n2. The tubes are immersed in a dialysing fluid that has the same osmotic concentration as blood except it contains no nitrogenous wastes.\n3. Wastes (urea, uric acid) diffuse out of blood into the dialysing fluid across the concentration gradient.\n4. Purified blood is mixed with anti-heparin and pumped back into a vein.',
      boardTip: 'Mention heparin addition and return of blood into a vein.'
    }
  },
  {
    id: 'chap-state-bs-5',
    subjectId: 'sub-biological-science-state',
    board: 'STATE',
    chapterNumber: 5,
    unitName: 'Coordination & Genetics',
    title: 'Control, Coordination & Heredity',
    description: 'Human nervous system, reflex arc, brain parts (Cerebrum, Cerebellum, Medulla), phytohormones, and Mendel’s laws of inheritance.',
    estHours: 7.5,
    totalQuestions: 35,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Functions of Cerebrum, Cerebellum & Medulla', 'Phytohormones (Auxins, Gibberellins, Cytokinins, ABA, Ethylene)', 'Mendelian Genetics Monohybrid Cross'],
    formulaList: [
      '\\text{Cerebrum}: \\text{Seat of Intelligence and Memory}',
      '\\text{Cerebellum}: \\text{Body Balance and Posture}',
      '\\text{Medulla Oblongata}: \\text{Involuntary Actions (Heartbeat, Breathing)}'
    ],
    conceptImage: '/concepts/bio_genetics_3d.jpg',
    conceptNotes: 'The brain is divided into Forebrain (Cerebrum for thinking), Midbrain, and Hindbrain (Cerebellum for balance, Medulla for involuntary functions like respiration and peristalsis). Phytohormone Ethylene promotes fruit ripening.',
    workedExample: {
      problem: 'Which parts of the human brain control: (a) Body posture and balance during walking, (b) Heartbeat and breathing, (c) Thinking and memory?',
      solution: '1. (a) Body posture and balance: Cerebellum (Hindbrain).\n2. (b) Involuntary heartbeat and breathing: Medulla Oblongata (Hindbrain).\n3. (c) Thinking and memory: Cerebrum (Forebrain).',
      boardTip: 'Spell Cerebrum and Cerebellum accurately without confusion.'
    }
  },

  // --- STATE BOARD SOCIAL STUDIES ---
  {
    id: 'chap-state-ss-1',
    subjectId: 'sub-social-studies-state',
    board: 'STATE',
    chapterNumber: 1,
    unitName: 'Resources & Development',
    title: 'India: Relief Features & Water Resources',
    description: 'Major physiographic divisions (Himalayas, Indo-Gangetic Plains, Peninsular Plateau, Western/Eastern Ghats) and river systems.',
    estHours: 6.0,
    totalQuestions: 28,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['Himalayan vs Peninsular Rivers', 'Western Ghats vs Eastern Ghats', 'Per Capita Income & HDI'],
    formulaList: [
      '\\text{Per Capita Income} = \\frac{\\text{Total National Income}}{\\text{Total Population}}',
      '\\text{Himalayan Rivers} = \\text{Perennial (Glacier-fed)}, \\quad \\text{Peninsular Rivers} = \\text{Rain-fed (Seasonal)}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'India comprises 6 physiographic divisions: Himalayas, Indo-Gangetic Plains, Peninsular Plateau, Coastal Plains, Thar Desert, and Islands. Himalayan rivers (Indus, Ganga, Brahmaputra) are perennial and form fertile plains; Peninsular rivers (Godavari, Krishna, Cauvery) are seasonal with steep gradients.',
    workedExample: {
      problem: 'Compare Himalayan Rivers and Peninsular Rivers with three key differences.',
      solution: '1. Origin & Nature: Himalayan rivers originate in snow-clad glaciers and are perennial (flow year-round); Peninsular rivers originate in Western Ghats/plateaus and are seasonal (rain-fed).\n2. Course & Drainage: Himalayan rivers have long courses with intense erosion forming deep gorges and meanders; Peninsular rivers have shorter, shallower valleys.\n3. Deltas & Utility: Himalayan rivers form large fertile deltas (Sundarbans) and are ideal for irrigation; Peninsular rivers have rocky beds suitable for hydroelectric generation.',
      boardTip: 'Structure into a neat comparison table under Origin, Flow Nature, and Economic Use.'
    }
  },
  {
    id: 'chap-state-ss-2',
    subjectId: 'sub-social-studies-state',
    board: 'STATE',
    chapterNumber: 2,
    unitName: 'Contemporary World History',
    title: 'The World Between the Wars (1900-1950)',
    description: 'Causes and consequences of World War I and II, League of Nations, Russian Revolution 1917, Great Depression 1929, and Rise of Nazism.',
    estHours: 7.5,
    totalQuestions: 35,
    difficulty: 'HARD',
    status: 'NOT_STARTED',
    keyTopics: ['Russian Revolution & Lenin’s April Theses', 'The Great Depression of 1929', 'Holocaust & Formation of UNO (1945)'],
    formulaList: [
      '\\text{Russian Revolution (1917)}: \\text{Bolsheviks under Lenin overthrew Tsar Nicholas II (Peace, Land, Bread)}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'The first half of the 20th century witnessed unprecedented global turmoil: World War I (1914-1918), the Russian Revolution (1917) establishing the first communist socialist state, the Wall Street Crash (1929) triggering widespread unemployment, and World War II ending with nuclear destruction at Hiroshima and Nagasaki.',
    workedExample: {
      problem: 'What were the main causes of the Great Economic Depression of 1929?',
      solution: '1. Agricultural Overproduction: Excess grain production led to falling agricultural prices and bankrupt farmers.\n2. Wall Street Crash (October 1929): Collapse of the US Stock Market caused massive bank failures and loan recalls.\n3. Decline in International Trade: Countries imposed high import tariffs, collapsing worldwide industrial output and creating massive unemployment.',
      boardTip: 'Mention the Wall Street stock crash of October 1929.'
    }
  },
  {
    id: 'chap-state-ss-3',
    subjectId: 'sub-social-studies-state',
    board: 'STATE',
    chapterNumber: 3,
    unitName: 'Indian National Movement',
    title: 'National Movement in India & Partition',
    description: 'Early national movement, Gandhian era mass struggles, Quit India Movement 1942, Subhas Chandra Bose and INA, and Partition of India.',
    estHours: 7.0,
    totalQuestions: 32,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Quit India Movement 1942 ("Do or Die")', 'Subhas Chandra Bose & Indian National Army (INA)', 'Cabinet Mission & Mountbatten Plan 1947'],
    formulaList: [
      '\\text{Quit India Slogan}: \\text{"Do or Die" (Karo ya Maro) — Mahatma Gandhi, August 1942}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'In August 1942, Mahatma Gandhi launched the Quit India Movement with the clarion call "Do or Die", demanding immediate British departure. Subhas Chandra Bose organised the Indian National Army (INA) in Singapore to liberate India militarily with slogans like "Jai Hind" and "Dilli Chalo".',
    workedExample: {
      problem: 'Examine the role of Subhas Chandra Bose and the Indian National Army (INA) in the freedom struggle.',
      solution: '1. Netaji Subhas Chandra Bose escaped British surveillance in 1941 and reached Southeast Asia to organize the Indian National Army (Azad Hind Fauj).\n2. Formed the Provisional Government of Free India in Singapore with slogans "Give me blood, and I shall give you freedom" and "Dilli Chalo".\n3. The INA advanced up to Kohima and Imphal, inspiring deep nationalistic pride among Indian armed forces and triggering the 1946 Royal Indian Navy mutiny.',
      boardTip: 'Mention the Provisional Government of Free India in Singapore.'
    }
  },
  {
    id: 'chap-state-ss-4',
    subjectId: 'sub-social-studies-state',
    board: 'STATE',
    chapterNumber: 4,
    unitName: 'Political Systems & Constitution',
    title: 'The Making of India’s Independent Constitution',
    description: 'Constituent Assembly debates, role of Dr. B.R. Ambedkar, Preamble values (Sovereign, Socialist, Secular, Democratic Republic), and Basic Structure.',
    estHours: 6.5,
    totalQuestions: 30,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Constituent Assembly & Drafting Committee', 'Preamble Philosophy', 'Federal vs Unitary Features of Indian Constitution'],
    formulaList: [
      '\\text{Preamble}: \\text{Sovereign, Socialist, Secular, Democratic Republic + Justice, Liberty, Equality, Fraternity}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'The Constituent Assembly took 2 years, 11 months, and 18 days to draft the Indian Constitution under the chairmanship of Dr. B.R. Ambedkar. The Constitution came into effect on 26 January 1950, establishing adult universal franchise.',
    workedExample: {
      problem: 'Explain the significance of the Preamble to the Constitution of India.',
      solution: '1. The Preamble is the key and soul of the Constitution, outlining its core philosophy and guiding objectives.\n2. Declares India as a Sovereign, Socialist, Secular, Democratic Republic.\n3. Guarantees Justice (social, economic, political), Liberty of thought and expression, Equality of status, and promotes Fraternity assuring the dignity of the individual.',
      boardTip: 'Quote the four key pillars: Justice, Liberty, Equality, Fraternity.'
    }
  },
  {
    id: 'chap-state-ss-5',
    subjectId: 'sub-social-studies-state',
    board: 'STATE',
    chapterNumber: 5,
    unitName: 'Social Movements & Contemporary India',
    title: 'Social Movements & Contemporary Challenges',
    description: 'Civil Rights Movement in USA, Anti-apartheid struggle, environmental movements (Chipko, Narmada Bachao Andolan), and Right to Information (RTI).',
    estHours: 6.0,
    totalQuestions: 28,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['Chipko Movement (Forest Conservation)', 'Narmada Bachao Andolan (Medha Patkar)', 'Right to Information Act (RTI 2005)'],
    formulaList: [
      '\\text{RTI Act 2005}: \\text{Mandates public authorities to provide government information within 30 days}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'The Chipko movement in Uttarakhand involved villagers hugging trees to prevent commercial logging. The Right to Information Act (2005) empowered citizens to seek transparent administrative records, promoting accountability.',
    workedExample: {
      problem: 'What is the significance of the Right to Information (RTI) Act 2005 in empowering citizens?',
      solution: '1. Promotes transparency and accountability in government functioning.\n2. Citizens can request copies of official documents, inspect public works, and audit fund expenditures.\n3. Mandates designated Public Information Officers (PIOs) to provide replies within 30 days or face legal penalties.',
      boardTip: 'State the 30-day statutory response deadline.'
    }
  },

  // --- STATE BOARD GEOGRAPHY & ECONOMICS ---
  {
    id: 'chap-state-geo-1',
    subjectId: 'sub-geography-state',
    board: 'STATE',
    chapterNumber: 1,
    unitName: 'Physical Geography & Environment',
    title: 'Relief Features & Drainage Systems of India',
    description: 'Physiographic divisions of India, major river basins (Ganga, Godavari, Krishna), climate zones, and annual precipitation distribution.',
    estHours: 6.0,
    totalQuestions: 28,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['6 Physiographic Divisions of India', 'Peninsular Rivers Drainage (Godavari & Krishna)', 'Monsoon Dynamics & Annual Rainfall Isohyets'],
    formulaList: [
      '\\text{Godavari Basin}: \\text{Largest Peninsular River (Dakshin Ganga), Originates at Trimbak (Nashik)}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'The Godavari is known as the Dakshin Ganga; it rises at Trimbakeshwar in Western Ghats and flows through Maharashtra, Telangana, and Andhra Pradesh into the Bay of Bengal.',
    workedExample: {
      problem: 'Why is River Godavari called "Dakshin Ganga"?',
      solution: '1. The Godavari is the largest and longest river in Peninsular India (1,465 km long) with the largest river basin.\n2. It holds immense religious, cultural, and agricultural significance for Southern India, similar to the Ganga in Northern India.',
      boardTip: 'Mention its length (1465 km) and title Dakshin Ganga.'
    }
  },
  {
    id: 'chap-state-geo-2',
    subjectId: 'sub-geography-state',
    board: 'STATE',
    chapterNumber: 2,
    unitName: 'Population & Human Geography',
    title: 'People, Population & Migration Patterns',
    description: 'Census data, population density, sex ratio, age composition, literacy rates, and internal rural-to-urban migration patterns.',
    estHours: 6.0,
    totalQuestions: 26,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['Sex Ratio (Females per 1000 Males)', 'Population Density Formula', 'Push and Pull Factors of Migration'],
    formulaList: [
      '\\text{Population Density} = \\frac{\\text{Total Population}}{\\text{Total Land Area } (\\text{km}^2)}',
      '\\text{Sex Ratio} = \\frac{\\text{Number of Females}}{\\text{1000 Males}}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'Push factors (poverty, lack of irrigation, crop failure) drive rural people out of villages; Pull factors (better employment, higher wages, healthcare, education) attract them to urban metropolises.',
    workedExample: {
      problem: 'Differentiate between Push and Pull factors of migration with two examples each.',
      solution: '1. Push Factors: Negative conditions at origin that force people to leave (e.g. Drought/famine, severe rural unemployment, lack of healthcare).\n2. Pull Factors: Positive opportunities at destination that attract migrants (e.g. Higher industrial wages, quality schooling, modern urban amenities).',
      boardTip: 'Give clear examples for both push and pull factors.'
    }
  },
  {
    id: 'chap-state-geo-3',
    subjectId: 'sub-geography-state',
    board: 'STATE',
    chapterNumber: 3,
    unitName: 'Rural Economy & Development',
    title: 'Rampur Village Economy & Agricultural Production',
    description: 'Factors of production (Land, Labour, Physical Capital, Human Capital), farming and non-farming activities in Indian villages, and rural credit.',
    estHours: 5.5,
    totalQuestions: 25,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['4 Factors of Production (Land, Labour, Capital, Enterprise)', 'Fixed vs Working Capital', 'Green Revolution Impact on Small Farmers'],
    formulaList: [
      '\\text{Factors of Production}: \\text{Land} + \\text{Labour} + \\text{Fixed Capital (Tools)} + \\text{Working Capital (Raw materials)}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'Land is fixed in agriculture. Multiple cropping and modern agricultural methods (HYV seeds, tube wells, chemical fertilizers) increase crop yield from the same land parcel.',
    workedExample: {
      problem: 'What are the four essential requirements (factors) for the production of goods and services in an economy?',
      solution: '1. Land: Natural resources like water, forests, and minerals.\n2. Labour: People who perform the physical and mental work.\n3. Physical Capital: Fixed capital (tools, machinery, buildings) and Working capital (raw materials and cash in hand).\n4. Human Capital: Knowledge and enterprise required to combine land, labour, and physical capital.',
      boardTip: 'Name Human Capital / Enterprise as the fourth essential factor.'
    }
  },
  {
    id: 'chap-state-geo-4',
    subjectId: 'sub-geography-state',
    board: 'STATE',
    chapterNumber: 4,
    unitName: 'Development & Welfare',
    title: 'Food Security & Public Distribution System (PDS)',
    description: 'Food security dimensions (Availability, Accessibility, Affordability), Buffer stock operations by FCI, Fair Price Shops, and Mid-Day Meal scheme.',
    estHours: 6.0,
    totalQuestions: 28,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['3 Dimensions of Food Security', 'Food Corporation of India (FCI) & Buffer Stock', 'Public Distribution System (PDS) Fair Price Shops'],
    formulaList: [
      '\\text{Food Security} = \\text{Availability} + \\text{Accessibility} + \\text{Affordability}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'Food Corporation of India (FCI) purchases foodgrains (wheat and rice) from farmers at Minimum Support Price (MSP) to maintain buffer stock for emergencies and distribution through PDS ration shops at subsidized rates.',
    workedExample: {
      problem: 'What is Buffer Stock and why is it created by the government?',
      solution: '1. Buffer Stock is the reserve stock of foodgrains (wheat and rice) procured by the government through the Food Corporation of India (FCI).\n2. Purpose: To distribute foodgrains in deficit areas and among poorer strata of society at subsidized prices, and to resolve food shortages during droughts and natural calamities.',
      boardTip: 'Mention Food Corporation of India (FCI) and Minimum Support Price (MSP).'
    }
  },
  {
    id: 'chap-state-geo-5',
    subjectId: 'sub-geography-state',
    board: 'STATE',
    chapterNumber: 5,
    unitName: 'Environment & Sustainable Development',
    title: 'Sustainable Development & Natural Resources',
    description: 'Renewable vs non-renewable resource depletion, groundwater over-extraction, ecological footprint, and Brundtland Report sustainable principles.',
    estHours: 6.0,
    totalQuestions: 26,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['Groundwater Depletion Crisis', 'Brundtland Commission Definition of Sustainability', 'Organic Farming vs Chemical Agriculture'],
    formulaList: [
      '\\text{Sustainable Development}: \\text{Development that meets present needs without compromising future generations}'
    ],
    conceptImage: '/concepts/sst_history_geo_3d.jpg',
    conceptNotes: 'Sustainable development ensures economic progress without causing environmental degradation or exhausting non-renewable resources for future generations.',
    workedExample: {
      problem: 'Define Sustainable Development according to the Brundtland Commission Report.',
      solution: 'Sustainable development is development that meets the needs of the present generation without compromising the ability of future generations to meet their own needs.',
      boardTip: 'Memorize and write the exact Brundtland definition.'
    }
  },

  // --- STATE BOARD ENGLISH ---
  {
    id: 'chap-state-eng-1',
    subjectId: 'sub-english-state',
    board: 'STATE',
    chapterNumber: 1,
    unitName: 'Personality Development',
    title: 'Attitude is Altitude (Nick Vujicic)',
    description: 'Inspirational biography of Nick Vujicic (born without limbs), overcoming physical disability, surfing with Bethany Hamilton, and spreading hope globally.',
    estHours: 5.5,
    totalQuestions: 26,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['Nick Vujicic’s Torso & Little Foot', 'Overcoming Bullying & Suicide Attempt at Age 10', 'Surfing & Spreading Global Inspiration'],
    formulaList: [
      '\\text{Key Message}: \\text{"If I fail, I try again, and again, and again. If you fail, are you going to try again?"}'
    ],
    conceptImage: '/concepts/eng_lit_3d.jpg',
    conceptNotes: 'Nick Vujicic was born with phocomelia (no arms and no legs), having only a small foot on his left hip. With encouragement from his parents and personal grit, he learned to type, swim, and become a world-renowned motivational speaker.',
    workedExample: {
      problem: 'How did Nick Vujicic overcome his disability and become an international inspiration?',
      solution: '1. Despite being born with tetra-amelia (no limbs), Nick learned to use his small foot on his left hip to type 43 words a minute and write.\n2. His parents sent him to a mainstream school where he overcame severe bullying and suicidal thoughts.\n3. He realized his purpose was to give hope to others, traveling to over 44 countries as a motivational speaker.',
      boardTip: 'Mention the small foot on his left hip which he calls his "chicken drumstick".'
    }
  },
  {
    id: 'chap-state-eng-2',
    subjectId: 'sub-english-state',
    board: 'STATE',
    chapterNumber: 2,
    unitName: 'Personality Development',
    title: 'Every Success Story is a Story of Great Failures',
    description: 'Biographical vignettes of Abraham Lincoln, Wright brothers, Colonel Sanders (KFC), and Thomas Edison turning failures into monumental triumphs.',
    estHours: 5.5,
    totalQuestions: 25,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['Abraham Lincoln’s Repeated Electoral Defeats before Presidency', 'Colonel Sanders Knocking on 1009 Doors for KFC Recipe', 'Thomas Edison’s 10,000 Failed Experiments'],
    formulaList: [
      '\\text{Principle}: \\text{"Failure is the highway to success. Tom Watson Sr. said: If you want to succeed, double your failure rate."}'
    ],
    conceptImage: '/concepts/eng_lit_3d.jpg',
    conceptNotes: 'Failure is an opportunity to begin again with greater wisdom. Lincoln failed in business and lost eight elections before being elected President of the United States. Edison tried 10,000 times before inventing the light bulb.',
    workedExample: {
      problem: 'How does the story of Abraham Lincoln illustrate that "failure is a stepping stone to success"?',
      solution: '1. Lincoln failed in business at age 21, suffered nervous breakdown at 27, and was defeated in eight political elections for legislature and Senate.\n2. He never quit his moral conviction and was ultimately elected the 16th President of the United States at age 52, successfully abolishing slavery.',
      boardTip: 'Highlight that persistence in the face of repeated defeat leads to greatness.'
    }
  },
  {
    id: 'chap-state-eng-3',
    subjectId: 'sub-english-state',
    board: 'STATE',
    chapterNumber: 3,
    unitName: 'Personality Development',
    title: 'I Will Do It (N.R. Narayana Murthy)',
    description: 'Inspiring story of N.R. Narayana Murthy clearing IIT entrance, facing poverty unable to afford fees, and persevering to build Infosys.',
    estHours: 5.5,
    totalQuestions: 25,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['Narayana Murthy’s IIT-JEE Success', 'Father’s Inability to Pay IIT Fees', 'Perseverance at Mysore Engineering College and Founding Infosys'],
    formulaList: [
      '\\text{Core Value}: \\text{"It is not the institution, but your dedication and hard work that shapes your destiny."}'
    ],
    conceptImage: '/concepts/eng_lit_3d.jpg',
    conceptNotes: 'Narayana Murthy secured a high rank in the IIT-JEE entrance examination. However, his father, a poor school teacher, could not afford the fees. Murthy gracefully accepted the situation without bitterness, studied at local college, and eventually founded Infosys.',
    workedExample: {
      problem: 'How did Narayana Murthy react when his father told him he could not afford to send him to IIT?',
      solution: '1. Murthy was heartbroken and disappointed as his dreams of joining IIT were shattered.\n2. However, understanding his father’s financial limitations with a large family, he did not utter a single word of complaint or anger.\n3. He went to the railway station to see off his friends with a warm smile, determined to excel wherever he studied.',
      boardTip: 'Mention his graceful reaction at the railway station seeing off his friends.'
    }
  },
  {
    id: 'chap-state-eng-4',
    subjectId: 'sub-english-state',
    board: 'STATE',
    chapterNumber: 4,
    unitName: 'Human Relations',
    title: 'The Journey by Yeshe Dorjee Thongchi',
    description: 'Reflective story of an educated son returning to his government job in city while his aging father carries his heavy trunk up the mountain path.',
    estHours: 6.0,
    totalQuestions: 26,
    difficulty: 'EASY',
    status: 'NOT_STARTED',
    keyTopics: ['False Pride and Guilt of the Educated Son', 'Father’s Selfless Love Carrying the Heavy Trunk', 'Old Pair of Canvas Shoes Symbolism'],
    formulaList: [
      '\\text{Theme}: \\text{Generational sacrifice, filial guilt, and traditional filial dignity}'
    ],
    conceptImage: '/concepts/eng_lit_3d.jpg',
    conceptNotes: 'The narrator feels ashamed that his white-collar education makes him hesitant to carry his own luggage on rugged mountain roads, letting his aging barefoot father carry it. At the bus station, the father asks for the son’s old hunting boots, leaving the son filled with deep shame and reverence.',
    workedExample: {
      problem: 'What symbolic message is conveyed by the father wearing his son’s discarded old shoes at the end of "The Journey"?',
      solution: '1. The father had walked barefoot on pebble-strewn mountain tracks his entire life, bearing physical hardships so his son could become an educated officer.\n2. Wearing the son’s discarded shoes symbolizes the father’s immense pride in his son’s achievements despite the son’s inward guilt.\n3. It highlights the vast emotional debt the son can never repay.',
      boardTip: 'Highlight the contrast between the son’s luxurious boots and father’s cracked barefoot heels.'
    }
  },
  {
    id: 'chap-state-eng-5',
    subjectId: 'sub-english-state',
    board: 'STATE',
    chapterNumber: 5,
    unitName: 'Creative Writing & Minor Discourses',
    title: 'Diary Entries, Biographical Sketches & Speeches',
    description: 'State Board Major and Minor discourses: Diary Entry expressing deep emotions, Biographical Sketch structuring, and Formal Speeches.',
    estHours: 6.0,
    totalQuestions: 28,
    difficulty: 'MEDIUM',
    status: 'NOT_STARTED',
    keyTopics: ['Diary Entry Format (Day, Date, Time, Emotional Reflections)', 'Biographical Sketch Structuring', 'Notice and Invitation Layouts'],
    formulaList: [
      '\\text{Diary Entry Layout}: \\text{Day & Date} \\rightarrow \\text{Time} \\rightarrow \\text{Emotional Reflection} \\rightarrow \\text{Sign-off}'
    ],
    conceptImage: '/concepts/eng_lit_3d.jpg',
    conceptNotes: 'State Board English places strong emphasis on creative Discourses. A Diary Entry records personal emotions, introspection, and future resolutions in first-person tone.',
    workedExample: {
      problem: 'Write a diary entry expressing the son’s feelings of remorse after seeing his barefoot father walk away in "The Journey".',
      solution: 'Wednesday, 2nd September 2026, 9:00 PM\n\nDear Diary,\nToday, as the bus pulled away from Dirang, I watched my father walking back on the pebbled mountain path wearing my old hunting boots. A wave of profound guilt washed over me. All my university degrees and government officer status could not mask my cowardice and false pride. My father carried my heavy trunk without complaint, while I worried about what people would think if I carried my own bag! I am forever indebted to his silent sacrifices.\n\n— Author',
      boardTip: 'Include Day, Date, Time, and deep emotional introspection.'
    }
  }
];

export const getChaptersForBoard = (board: Board = 'CBSE'): Chapter[] => {
  return CHAPTERS.filter((c) => c.board === board);
};

export const SAMPLE_BOOKINGS: Booking[] = [
  {
    id: 'book-1',
    studentId: 'user-student-1',
    studentName: 'Aarav Sharma',
    tutorId: 'user-tutor-1',
    tutorName: 'Dr. Priya Raman',
    tutorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    subjectId: 'sub-physics',
    subjectName: 'Science: Physics',
    topic: 'Light - Mirror and Lens Numerical Problems with Sign Conventions',
    scheduledAt: '2025-09-02T16:00:00Z',
    durationMinutes: 60,
    status: 'CONFIRMED',
    attended: true,
    meetingUrl: '/classroom/session-live-101',
    notes: 'Please review Cartesian sign conventions for concave mirrors.',
    isLiveNow: true,
  },
  {
    id: 'book-2',
    studentId: 'user-student-1',
    studentName: 'Aarav Sharma',
    tutorId: 'user-tutor-2',
    tutorName: 'Prof. Rajesh Verma',
    tutorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    subjectId: 'sub-math',
    subjectName: 'Mathematics',
    topic: 'Trigonometric Identities 4-Mark Board Exam Proofs Drill',
    scheduledAt: '2025-09-04T17:30:00Z',
    durationMinutes: 45,
    status: 'CONFIRMED',
    attended: false,
    meetingUrl: '/classroom/session-live-102',
    notes: 'Focus on (1 + cot A - csc A)(1 + tan A + sec A) proof shortcut.',
    isLiveNow: false,
  }
];

export const SAMPLE_DOUBTS: Doubt[] = [
  {
    id: 'doubt-1',
    studentId: 'user-student-1',
    studentName: 'Aarav Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    studentBoard: 'CBSE',
    subjectId: 'sub-physics',
    subjectName: 'Science: Physics',
    chapterId: 'chap-phy-1',
    chapterTitle: 'Light - Reflection and Refraction',
    title: 'Why is focal length of convex mirror considered positive and concave negative?',
    content: 'I understand Cartesian coordinates from pole, but why does reflection happen differently? Is focus always virtual for convex mirror in board exams?',
    status: 'RESOLVED',
    views: 142,
    upvotes: 18,
    createdAt: '2025-09-01T14:20:00Z',
    replies: [
      {
        id: 'rep-1',
        doubtId: 'doubt-1',
        authorId: 'user-tutor-1',
        authorName: 'Dr. Priya Raman',
        authorRole: 'TUTOR',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        content: 'By international sign conventions: All measurements are taken from the Pole (0,0). For a concave mirror, the centre of curvature and focus lie in front of the reflecting surface on the left (-X axis), hence f < 0. For a convex mirror, the reflecting surface curves outward, so parallel rays diverge as if coming from behind the mirror on the right (+X axis), making f > 0.',
        isAccepted: true,
        isTutorVerified: true,
        upvotes: 14,
        createdAt: '2025-09-01T14:45:00Z',
      }
    ]
  }
];

export const MOCK_TESTS: MockTest[] = [
  {
    id: 'test-cbse-full-mock-1',
    title: 'CBSE Class 10 All-India Full Board Mock Assessment (Science 086)',
    subjectId: 'sub-physics',
    subjectName: 'Science (CBSE Standard)',
    board: 'CBSE',
    durationMinutes: 180,
    totalMarks: 80,
    passingMarks: 27,
    difficulty: 'HARD',
    isOfficialCbsePattern: true,
    sections: [
      { id: 'sec-a', name: 'Section A', description: '20 Multiple Choice Questions (including Assertion-Reason)', questionCount: 20, marksPerQuestion: 1 },
      { id: 'sec-b', name: 'Section B', description: '6 Very Short Answer Questions (30-50 words)', questionCount: 6, marksPerQuestion: 2 },
      { id: 'sec-c', name: 'Section C', description: '7 Short Answer Questions (50-80 words)', questionCount: 7, marksPerQuestion: 3 },
      { id: 'sec-d', name: 'Section D', description: '3 Long Answer Questions (80-120 words)', questionCount: 3, marksPerQuestion: 5 },
      { id: 'sec-e', name: 'Section E', description: '3 Source-based / Case-based Assessment Units', questionCount: 3, marksPerQuestion: 4 }
    ],
    questions: [
      {
        id: 'q-cbse-1',
        mockTestId: 'test-cbse-full-mock-1',
        sectionId: 'sec-a',
        questionText: 'An object is placed at a distance of 12 cm in front of a concave mirror of focal length 15 cm. The nature and position of the image formed is:',
        options: [
          'Real, inverted and in front of the mirror',
          'Virtual, erect and behind the mirror',
          'Real, erect and at the centre of curvature',
          'Virtual, inverted and at focus'
        ],
        correctOptionIndex: 1,
        explanation: 'When an object is placed between the Focus ($F = 15\\text{ cm}$) and Pole of a concave mirror ($u = 12\\text{ cm} < f$), the reflected rays diverge, producing an enlarged, virtual and erect image behind the mirror.',
        marks: 1,
        topic: 'Spherical Mirrors Ray Optics',
        difficulty: 'MEDIUM'
      }
    ]
  }
];

export const SAMPLE_MOCK_TESTS: MockTest[] = MOCK_TESTS;

export const SAMPLE_RESOURCES: StudyResource[] = [
  {
    id: 'res-1',
    subjectId: 'sub-math',
    subjectName: 'Mathematics',
    chapterId: 'chap-math-5',
    chapterTitle: 'Introduction to Trigonometry',
    title: '10th Board Complete Trigonometry Formula Sheet & Identity Cheatcard',
    resourceType: 'FORMULA_SHEET',
    fileUrl: '/resources/math-trig-formula-sheet.pdf',
    fileFormat: 'PDF',
    fileSize: '1.2 MB',
    year: 2025,
    downloads: 1420,
    board: 'CBSE'
  }
];

export const BADGES: Badge[] = [
  {
    id: 'badge-0',
    name: 'Class of 2026 Board Aspirant',
    description: 'Enrolled and initialized Class 10 Board preparation',
    icon: 'GraduationCap',
    category: 'Welcome',
    pointsReq: 0,
    unlocked: true,
    unlockedAt: '2026-09-01',
  },
  {
    id: 'badge-1',
    name: '7-Day Streak Warrior',
    description: 'Study consecutively for 7 days',
    icon: 'Flame',
    category: 'Streak',
    pointsReq: 100,
    unlocked: false,
  },
  {
    id: 'badge-2',
    name: 'Chapter 1 Master',
    description: 'Complete all Chapter 1 exercises and worked examples',
    icon: 'BookOpen',
    category: 'Syllabus',
    pointsReq: 250,
    unlocked: false,
  },
  {
    id: 'badge-3',
    name: 'Mock Exam Distinction',
    description: 'Score 90%+ on any 5-section timed board mock test',
    icon: 'Award',
    category: 'Assessment',
    pointsReq: 500,
    unlocked: false,
  },
];

export const WEEKLY_STUDY_ANALYTICS = [
  { day: 'Mon', hours: 0, target: 2.5, testsTaken: 0 },
  { day: 'Tue', hours: 0, target: 2.5, testsTaken: 0 },
  { day: 'Wed', hours: 0, target: 2.5, testsTaken: 0 },
  { day: 'Thu', hours: 0, target: 2.5, testsTaken: 0 },
  { day: 'Fri', hours: 0, target: 2.5, testsTaken: 0 },
  { day: 'Sat', hours: 0, target: 3.5, testsTaken: 0 },
  { day: 'Sun', hours: 0, target: 3.5, testsTaken: 0 },
];

export const SUBJECT_PERFORMANCE_METRICS = [
  { subject: 'Math', score: 0, syllabusProgress: 0, targetScore: 95 },
  { subject: 'Physics', score: 0, syllabusProgress: 0, targetScore: 95 },
  { subject: 'Chemistry', score: 0, syllabusProgress: 0, targetScore: 90 },
  { subject: 'Biology', score: 0, syllabusProgress: 0, targetScore: 90 },
  { subject: 'Social Studies', score: 0, syllabusProgress: 0, targetScore: 90 },
  { subject: 'English', score: 0, syllabusProgress: 0, targetScore: 95 },
];

export const SAMPLE_INTERESTED_CANDIDATES: InterestedCandidate[] = [
  {
    id: 'cand-1',
    token: 'EDUTEN-CBSE-2026-894120',
    name: 'Diya Sharma',
    email: 'diya.sharma@gmail.com',
    phone: '+91 98450 11223',
    role: 'STUDENT',
    board: 'CBSE',
    city: 'Hyderabad, Telangana',
    interests: ['Live Classes (Morning/Evening Slots)', 'Google Gemini AI Doubt Solver', 'Timed Chapter Mocks & PYQs'],
    notes: 'Aiming for 95%+ in Science and Mathematics. Need guidance on Ray Optics numericals and Coordinate Geometry proofs.',
    status: 'NEW_LEAD',
    createdAt: '2026-09-02T14:30:00Z',
  },
  {
    id: 'cand-2',
    token: 'EDUTEN-ICSE-2026-673412',
    name: 'Vikramaditya Roy (Parent)',
    email: 'vikram.roy@corporate.in',
    phone: '+91 98112 44556',
    role: 'PARENT',
    board: 'ICSE',
    city: 'Kolkata, West Bengal',
    interests: ['Parent Oversight & WhatsApp CCE Alerts', '1-on-1 Mentorship with IIT Faculty'],
    notes: 'Ward studying in Class 10 ICSE. Need weekly WhatsApp attendance logs and weakness heatmap updates.',
    status: 'CONTACTED',
    createdAt: '2026-09-01T18:15:00Z',
  },
  {
    id: 'cand-3',
    token: 'EDUTEN-STATE-2026-441982',
    name: 'Suresh Babu M.Sc.',
    email: 'suresh.babu.physics@gmail.com',
    phone: '+91 97012 88990',
    role: 'EDUCATOR',
    board: 'STATE',
    city: 'Vijayawada, Andhra Pradesh',
    interests: ['Live Classes (Morning/Evening Slots)', '1-on-1 Mentorship with IIT Faculty'],
    notes: '12 years experience in State Board Class 10 Physical Science. Interested in conducting evening live whiteboard problem-solving batches.',
    status: 'NEW_LEAD',
    createdAt: '2026-08-31T11:45:00Z',
  },
  {
    id: 'cand-4',
    token: 'EDUTEN-CBSE-2026-129045',
    name: 'St. Xavier Public School (Principal Office)',
    email: 'principal@stxaviers-school.edu.in',
    phone: '+91 94401 77665',
    role: 'SCHOOL',
    board: 'CBSE',
    city: 'Bengaluru, Karnataka',
    interests: ['School Institutional Bulk Access', 'Timed Chapter Mocks & PYQs'],
    notes: 'Inquiry for bulk licensing for 180 Class 10 board candidates. Need cohort diagnostics and mock test engine access.',
    status: 'ENROLLED',
    createdAt: '2026-08-30T09:00:00Z',
  },
];
