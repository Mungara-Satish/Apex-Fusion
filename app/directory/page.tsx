'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { Board, Role, User } from '@/lib/types';
import {
  Users,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  ShieldAlert,
  Key,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  UserPlus,
  Copy,
  Check,
  Phone,
  Mail,
  School,
  BookOpen,
  Award,
  Sparkles,
  Clock,
  Send,
  X,
  RefreshCw,
  Star,
  ExternalLink,
  Edit3,
  Trash2,
  KeyRound,
  Shield,
  Plus,
  Zap,
  CheckSquare,
  Square,
  MessageSquare,
  Bell,
  Crown,
  Layers,
  FileSpreadsheet,
} from 'lucide-react';

export default function DirectoryPage() {
  const {
    currentRole,
    currentUser,
    currentBoard,
    directoryUsers,
    grantUserAccess,
    revokeUserAccess,
    addNewUserWithCredentials,
    updateUserCredentials,
    deleteUser,
    interestedCandidates,
    updateCandidateStatus,
    enrollCandidateAsUser,
    setRole,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'STUDENTS' | 'PARENTS' | 'TUTORS' | 'INTERESTED_LEADS'>('STUDENTS');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBoard, setSelectedBoard] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // --- Modal State for Adding New User (+ Add Student / Parent / Tutor) with Rich Options ---
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRole, setNewRole] = useState<Role>('STUDENT');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newBoard, setNewBoard] = useState<Board>('CBSE');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Extended Options for Student
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newRollNumber, setNewRollNumber] = useState('');
  const [newSection, setNewSection] = useState('A');
  const [newPassTier, setNewPassTier] = useState<'SUPER' | 'BOOSTER' | 'FREE'>('SUPER');
  const [newTargetGoal, setNewTargetGoal] = useState('95%+ Distinction');
  const [newLinkedParentName, setNewLinkedParentName] = useState('');

  // Extended Options for Parent
  const [newLinkedStudent, setNewLinkedStudent] = useState('');
  const [newRelationship, setNewRelationship] = useState('Father');
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);
  const [notifyTestScores, setNotifyTestScores] = useState(true);
  const [notifyAttendance, setNotifyAttendance] = useState(true);

  // Extended Options for Tutor
  const [newQualifications, setNewQualifications] = useState('M.Sc. Physics (IIT), 8+ Yrs Exp');
  const [newHourlyRate, setNewHourlyRate] = useState(650);
  const [newDesignation, setNewDesignation] = useState('Senior Board Mentor');
  const [newTutorSubjects, setNewTutorSubjects] = useState<string[]>(['Physics', 'Chemistry']);
  const [isPreVerified, setIsPreVerified] = useState(true);

  // General Access & Delivery Options
  const [newAccessStatus, setNewAccessStatus] = useState<'APPROVED' | 'PENDING'>('APPROVED');
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);
  const [sendSmsCredentials, setSendSmsCredentials] = useState(true);
  const [requirePasswordReset, setRequirePasswordReset] = useState(false);

  // --- Modal State for Editing / Changing Existing User Credentials (Admin Only) ---
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editRole, setEditRole] = useState<Role>('STUDENT');
  const [editBoard, setEditBoard] = useState<Board>('CBSE');
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editStatus, setEditStatus] = useState<'APPROVED' | 'PENDING' | 'SUSPENDED'>('APPROVED');
  const [editSchoolName, setEditSchoolName] = useState('');
  const [editRollNumber, setEditRollNumber] = useState('');
  const [editPassTier, setEditPassTier] = useState('');
  const [editLinkedStudent, setEditLinkedStudent] = useState('');
  const [editSchoolOrSubject, setEditSchoolOrSubject] = useState('');

  // --- Modal State for Credentials Sheet View ---
  const [showCredentialsSheetModal, setShowCredentialsSheetModal] = useState(false);
  const [sheetSearch, setSheetSearch] = useState('');
  const [sheetRoleFilter, setSheetRoleFilter] = useState<'ALL' | 'STUDENT' | 'PARENT' | 'TUTOR' | 'ADMIN'>('ALL');

  const isAdmin = currentRole === 'ADMIN';

  const showNotification = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(null), 3500);
  };

  const generateRandomPassword = (board: string) => {
    return `${board}2026!#${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const handleCopyCredentials = (user: User | { name: string; username?: string; email: string; tempPassword?: string; role: Role; board: Board }) => {
    const credText = `EduTen Portal Credentials\nName: ${user.name}\nUsername: ${user.username || user.email}\nPassword: ${user.tempPassword || 'Password@2026'}\nRole: ${user.role}\nBoard: ${user.board}\nSign In URL: ${typeof window !== 'undefined' ? window.location.origin : ''}/login`;
    navigator.clipboard.writeText(credText);
    if ('id' in user) {
      setCopiedId(user.id);
    }
    showNotification(`Credentials copied for ${user.name}!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGrantAccess = (userId: string, userName: string) => {
    grantUserAccess(userId);
    showNotification(`✅ Login access & active credentials GRANTED to ${userName}!`);
  };

  const handleRevokeAccess = (userId: string, userName: string) => {
    revokeUserAccess(userId);
    showNotification(`🚫 Login credentials SUSPENDED for ${userName}.`);
  };

  // Open + Add Modal with pre-selected role
  const handleOpenAddModal = (targetRole: Role) => {
    setNewRole(targetRole);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setNewBoard('CBSE');
    setNewUsername('');
    setNewPassword(generateRandomPassword('CBSE'));
    setNewSchoolName('Delhi Public School, R.K. Puram');
    setNewRollNumber(`CBSE-2026-X-${Math.floor(1000 + Math.random() * 9000)}`);
    setNewSection('A');
    setNewPassTier('SUPER');
    setNewTargetGoal('95%+ Distinction');
    setNewLinkedParentName('');
    setNewLinkedStudent(directoryUsers.find((u) => u.role === 'STUDENT')?.name || 'Aarav Sharma');
    setNewRelationship('Father');
    setNewQualifications('M.Sc. Physics (IIT Delhi), 8+ Yrs Exp');
    setNewHourlyRate(650);
    setNewDesignation('Senior Board Mentor');
    setNewTutorSubjects(['Physics', 'Chemistry']);
    setIsPreVerified(true);
    setNewAccessStatus('APPROVED');
    setShowAddModal(true);
  };

  // Quick fill demo data inside Add modal
  const handleFillSampleData = () => {
    if (newRole === 'STUDENT') {
      setNewName('Ishaan Roy');
      setNewEmail('ishaan.roy@eduten.org');
      setNewPhone('+91 98450 11234');
      setNewSchoolName('National Public School, Indiranagar');
      setNewRollNumber(`${newBoard}-2026-X-7741`);
      setNewUsername(`ishaan_${newBoard.toLowerCase()}10`);
      setNewLinkedParentName('Anupam Roy (Father)');
    } else if (newRole === 'PARENT') {
      setNewName('Vikram Sengupta');
      setNewEmail('vikram.sengupta@parent.org');
      setNewPhone('+91 98300 44521');
      setNewLinkedStudent('Rohan Mukherjee');
      setNewRelationship('Father');
      setNewUsername('vikram_sengupta_parent');
    } else if (newRole === 'TUTOR') {
      setNewName('Dr. Shweta Iyer');
      setNewEmail('shweta.iyer@eduten.org');
      setNewPhone('+91 98200 99876');
      setNewQualifications('Ph.D. Organic Chemistry (IISc Bangalore)');
      setNewHourlyRate(750);
      setNewTutorSubjects(['Chemistry', 'Science']);
      setNewUsername('dr_shweta_chemistry');
    }
    showNotification('Sample values loaded into form!');
  };

  // Open Edit / Change Credentials Modal for a user
  const handleOpenEditModal = (user: User) => {
    setEditingUserId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPhone(user.phone || '+91 98765 43210');
    setEditRole(user.role);
    setEditBoard(user.board);
    setEditUsername(user.username || user.email.split('@')[0]);
    setEditPassword(user.tempPassword || 'Password@2026');
    setEditStatus(user.credentialStatus || 'APPROVED');
    setEditRollNumber(user.rollNumber || '');
    setEditSchoolName(user.schoolName || '');
    setEditPassTier(user.subscriptionPass || `${user.board} 2026 Super Pass`);
    if (user.role === 'PARENT' && user.parentProfile) {
      setEditLinkedStudent(user.parentProfile.studentName || '');
    } else if (user.role === 'TUTOR' && user.tutorProfile) {
      setEditSchoolOrSubject(user.tutorProfile.subjectsTaught.join(', '));
    } else {
      setEditSchoolOrSubject(user.schoolName || '');
    }
    setShowEditModal(true);
  };

  // Save new user from + Add modal
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const generatedUsername =
      newUsername.trim() || `${newName.toLowerCase().replace(/[^a-z0-9]/g, '')}_${newBoard.toLowerCase()}10`;
    const finalPassword = newPassword.trim() || generateRandomPassword(newBoard);

    let finalPassName = `${newBoard} 2026 All-Access Super Pass`;
    if (newPassTier === 'BOOSTER') {
      finalPassName = `${newBoard} Board Booster Fast-Track Pass`;
    } else if (newPassTier === 'FREE') {
      finalPassName = `${newBoard} Standard Free Evaluation Tier`;
    }

    const newUser: Partial<User> = {
      name: newName.trim(),
      email: newEmail.trim(),
      phone: newPhone.trim() || '+91 98765 43210',
      role: newRole,
      board: newBoard,
      username: generatedUsername,
      tempPassword: finalPassword,
      credentialStatus: newAccessStatus,
      rollNumber: newRollNumber.trim() || `${newBoard}-2026-X-${Math.floor(1000 + Math.random() * 9000)}`,
      schoolName: newSchoolName.trim() || 'Delhi Public School',
      subscriptionPass: finalPassName,
    };

    if (newRole === 'PARENT') {
      newUser.parentProfile = {
        id: `parent-prof-${Date.now()}`,
        userId: `user-${Date.now()}`,
        linkedStudentId: 'user-student-1',
        studentName: newLinkedStudent.trim() || 'Aarav Sharma',
        studentRollNumber: 'CBSE-2026-X-1048',
        studentSchool: newSchoolName.trim() || 'Delhi Public School, R.K. Puram',
        studentBoard: newBoard,
        relationship: newRelationship,
        notifyOnTestScore: notifyTestScores,
        notifyOnAttendance: notifyAttendance,
        whatsappAlerts: notifyWhatsapp,
      };
    } else if (newRole === 'TUTOR') {
      newUser.tutorProfile = {
        id: `tutor-prof-${Date.now()}`,
        userId: `user-${Date.now()}`,
        headline: `${newDesignation} | ${newTutorSubjects.join(' & ')}`,
        bio: `${newQualifications}. Dedicated to 10th-grade board exam excellence.`,
        qualifications: newQualifications,
        hourlyRate: Number(newHourlyRate),
        rating: 5.0,
        reviewCount: 0,
        verified: isPreVerified,
        subjectsTaught: newTutorSubjects.length > 0 ? newTutorSubjects : ['Science', 'Mathematics'],
        availabilitySlots: ['Mon-Fri 4:00 PM - 8:00 PM', 'Sat-Sun 10:00 AM - 4:00 PM'],
      };
    }

    addNewUserWithCredentials(newUser);
    setShowAddModal(false);
    showNotification(`🎉 Added new ${newRole}: ${newName} with ${newAccessStatus === 'APPROVED' ? 'Active' : 'Pending'} credentials!`);
  };

  // Save changes from Edit / Change Credentials modal
  const handleSaveEditCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUserId || !editName.trim() || !editEmail.trim()) return;

    const updates: Partial<User> = {
      name: editName.trim(),
      email: editEmail.trim(),
      phone: editPhone.trim(),
      board: editBoard,
      username: editUsername.trim(),
      tempPassword: editPassword.trim(),
      credentialStatus: editStatus,
      schoolName: editSchoolName.trim() || editSchoolOrSubject.trim(),
      rollNumber: editRollNumber.trim(),
      subscriptionPass: editPassTier.trim(),
    };

    if (editRole === 'PARENT') {
      updates.parentProfile = {
        id: `parent-prof-${editingUserId}`,
        userId: editingUserId,
        linkedStudentId: 'user-student-1',
        studentName: editLinkedStudent.trim() || 'Aarav Sharma',
        studentRollNumber: editRollNumber.trim() || 'CBSE-2026-X-1048',
        studentSchool: editSchoolName.trim() || 'Delhi Public School',
        studentBoard: editBoard,
        relationship: 'Parent / Guardian',
        notifyOnTestScore: true,
        notifyOnAttendance: true,
        whatsappAlerts: true,
      };
    } else if (editRole === 'TUTOR') {
      updates.tutorProfile = {
        id: `tutor-prof-${editingUserId}`,
        userId: editingUserId,
        headline: `${editSchoolOrSubject || 'Academic'} Mentor`,
        bio: 'Verified faculty with active teaching assignments.',
        qualifications: 'M.Sc. / Ph.D. Verified',
        hourlyRate: 650,
        rating: 4.9,
        reviewCount: 15,
        verified: true,
        subjectsTaught: editSchoolOrSubject ? editSchoolOrSubject.split(',').map((s) => s.trim()) : ['Science'],
        availabilitySlots: ['Mon-Fri 4:00 PM - 8:00 PM'],
      };
    }

    updateUserCredentials(editingUserId, updates);
    setShowEditModal(false);
    showNotification(`💾 Successfully updated credentials & details for ${editName}!`);
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    if (confirm(`Are you sure you want to delete ${userName} from EduTen?`)) {
      deleteUser(userId);
      setShowEditModal(false);
      showNotification(`🗑️ Account for ${userName} removed.`);
    }
  };

  const toggleSubjectSelect = (sub: string) => {
    if (newTutorSubjects.includes(sub)) {
      setNewTutorSubjects(newTutorSubjects.filter((s) => s !== sub));
    } else {
      setNewTutorSubjects([...newTutorSubjects, sub]);
    }
  };

  // Filter lists
  const students = directoryUsers.filter((u) => u.role === 'STUDENT');
  const parents = directoryUsers.filter((u) => u.role === 'PARENT');
  const tutors = directoryUsers.filter((u) => u.role === 'TUTOR');

  const currentList =
    activeTab === 'STUDENTS' ? students : activeTab === 'PARENTS' ? parents : tutors;

  const filteredUsers = currentList.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.rollNumber && u.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.schoolName && u.schoolName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.username && u.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.parentProfile?.studentName &&
        u.parentProfile.studentName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesBoard = selectedBoard === 'ALL' || u.board === selectedBoard;
    const matchesStatus =
      selectedStatus === 'ALL' ||
      (selectedStatus === 'APPROVED' && (u.credentialStatus === 'APPROVED' || !u.credentialStatus)) ||
      (selectedStatus === 'PENDING' && u.credentialStatus === 'PENDING') ||
      (selectedStatus === 'SUSPENDED' && u.credentialStatus === 'SUSPENDED');

    return matchesSearch && matchesBoard && matchesStatus;
  });

  const filteredLeads = interestedCandidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.city && c.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.notes && c.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesBoard = selectedBoard === 'ALL' || c.board === selectedBoard;
    const matchesStatus =
      selectedStatus === 'ALL' ||
      (selectedStatus === 'APPROVED' && c.status === 'ENROLLED') ||
      (selectedStatus === 'PENDING' && c.status === 'NEW_LEAD') ||
      (selectedStatus === 'SUSPENDED' && c.status === 'CONTACTED');

    return matchesSearch && matchesBoard && matchesStatus;
  });

  const totalApproved = directoryUsers.filter(
    (u) => u.credentialStatus === 'APPROVED' || !u.credentialStatus
  ).length;
  const totalPending = directoryUsers.filter((u) => u.credentialStatus === 'PENDING').length;
  const totalSuspended = directoryUsers.filter((u) => u.credentialStatus === 'SUSPENDED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Toast Notification */}
      {actionSuccessMsg && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-400/30 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
          <span className="text-sm font-semibold">{actionSuccessMsg}</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 border border-border shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground border border-primary/30 text-xs font-bold tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>EduTen Administrative Directory & Access Control Hub</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Students, Parents & Tutors Information
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Complete multi-board records for Class 10 candidates, linked parents, and verified faculty.
              <strong className="text-amber-300 font-semibold ml-1">
                Only Master Admin can + add new members with full provisioning options and change login credentials for everyone.
              </strong>
            </p>
          </div>

          {/* Role Status & Switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
            <div className="space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Your Current Role
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    isAdmin
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-primary/20 text-primary-foreground border border-primary/40'
                  }`}
                >
                  {currentRole}
                </span>
                {isAdmin ? (
                  <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                    <Key className="w-3.5 h-3.5" /> Full Grant & Provisioning
                  </span>
                ) : (
                  <span className="text-xs text-amber-300 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Directory Viewer
                  </span>
                )}
              </div>
            </div>

            {!isAdmin && (
              <button
                onClick={() => {
                  setRole('ADMIN');
                  showNotification('Switched to Master Admin mode! You can now + Add members with full options and change credentials.');
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1.5 shrink-0"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Switch to Admin</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Metric Stats Cards */}
        {/* 5 Metric Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8 pt-8 border-t border-white/10">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Students Enrolled</span>
              <GraduationCap className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black mt-1 text-white">{students.length}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">CBSE, ICSE & State</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Linked Parents</span>
              <HeartHandshake className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black mt-1 text-white">{parents.length}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">With ward tracking</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Verified Tutors</span>
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black mt-1 text-white">{tutors.length}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Subject specialists</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Credentials Granted</span>
              <Key className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black mt-1 text-emerald-400">
              {totalApproved}{' '}
              <span className="text-xs font-normal text-amber-300">({totalPending} Pending)</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Admin-authorized</div>
          </div>

          <div
            onClick={() => setActiveTab('INTERESTED_LEADS')}
            className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 cursor-pointer hover:bg-amber-500/15 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-300 font-medium">Interested Leads</span>
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black mt-1 text-amber-300">{interestedCandidates.length}</div>
            <div className="text-[11px] text-amber-200/70 mt-0.5">Google Form Inquiries</div>
          </div>
        </div>
      </div>

      {/* Directory Controls & + ADD Options */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Tab Selector */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-muted border border-border">
            <button
              onClick={() => setActiveTab('STUDENTS')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'STUDENTS'
                  ? 'bg-card text-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-primary" />
              <span>Students Directory</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-primary/10 text-primary font-extrabold">
                {students.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('PARENTS')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'PARENTS'
                  ? 'bg-card text-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <HeartHandshake className="w-4 h-4 text-rose-500" />
              <span>Parents Directory</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500/10 text-rose-600 font-extrabold">
                {parents.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('TUTORS')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'TUTORS'
                  ? 'bg-card text-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-500" />
              <span>Tutors & Faculty</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-600 font-extrabold">
                {tutors.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('INTERESTED_LEADS')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'INTERESTED_LEADS'
                  ? 'bg-card text-amber-600 dark:text-amber-400 shadow-md ring-1 ring-amber-500/30 font-black'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-500" />
              <span>Interested Leads</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold">
                {interestedCandidates.length}
              </span>
            </button>
          </div>

          {/* Admin + ADD Buttons with Options */}
          {isAdmin && (
            <div className="flex flex-wrap items-center gap-2">
              {/* Add Student Button */}
              <button
                onClick={() => handleOpenAddModal('STUDENT')}
                className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Student</span>
              </button>

              {/* Add Parent Button */}
              <button
                onClick={() => handleOpenAddModal('PARENT')}
                className="px-3.5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Parent</span>
              </button>

              {/* Add Tutor Button */}
              <button
                onClick={() => handleOpenAddModal('TUTOR')}
                className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Tutor</span>
              </button>

              {/* View All Credentials Sheet Modal Button */}
              <button
                onClick={() => setShowCredentialsSheetModal(true)}
                className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
                title="View and copy all user login credentials in a complete spreadsheet"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>📋 Credentials Sheet</span>
              </button>

              {/* Quick Grant All Pending */}
              {totalPending > 0 && (
                <button
                  onClick={() => {
                    directoryUsers.forEach((u) => {
                      if (u.credentialStatus === 'PENDING') {
                        grantUserAccess(u.id);
                      }
                    });
                    showNotification(`⚡ All ${totalPending} pending accounts granted active credentials!`);
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Grant All Pending ({totalPending})</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-2xl bg-card border border-border shadow-sm">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={`Search ${activeTab.toLowerCase()} by name, username, email, roll number, or school...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {/* Board Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl bg-muted/50 border border-border font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="ALL">All Boards (CBSE, ICSE, STATE)</option>
              <option value="CBSE">CBSE Board Only</option>
              <option value="ICSE">ICSE Board Only</option>
              <option value="STATE">State Board Only</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl bg-muted/50 border border-border font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="ALL">All Credential Statuses</option>
              <option value="APPROVED">🟢 Active (Credentials Granted)</option>
              <option value="PENDING">🟡 Pending Admin Grant</option>
              <option value="SUSPENDED">🔴 Suspended by Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Directory User Cards List OR Interested Leads List */}
      {activeTab === 'INTERESTED_LEADS' ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25">
            <div className="flex items-center gap-2 text-xs text-amber-900 dark:text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                <strong>{filteredLeads.length} Prospective Candidate Inquiries</strong> received via the official Google Registration Form. Master Admin can review academic goals, chat on WhatsApp, or instantly enroll candidates.
              </span>
            </div>
            <Link
              href="/vlog#registration-form"
              className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shrink-0 transition-all flex items-center justify-center gap-1 shadow-sm"
            >
              <span>+ Open Registration Form</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {filteredLeads.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded-3xl space-y-3">
              <FileSpreadsheet className="w-12 h-12 text-muted-foreground mx-auto opacity-40" />
              <h3 className="text-base font-bold text-foreground">No candidate inquiries match your filter criteria</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Try adjusting your search query, board filter, or status dropdown above.
              </p>
            </div>
          ) : (
            filteredLeads.map((cand) => {
              const isNew = cand.status === 'NEW_LEAD';
              const isContacted = cand.status === 'CONTACTED';
              const isEnrolled = cand.status === 'ENROLLED';

              const roleLabel =
                cand.role === 'STUDENT'
                  ? '🎓 10th Student'
                  : cand.role === 'PARENT'
                  ? '👨‍👩‍👧 Parent / Guardian'
                  : cand.role === 'EDUCATOR'
                  ? '👨‍🏫 Educator / Tutor'
                  : '🏫 School Partner';

              return (
                <div
                  key={cand.id}
                  className={`group rounded-3xl bg-card border transition-all duration-300 p-5 sm:p-6 shadow-sm hover:shadow-md space-y-4 ${
                    isEnrolled
                      ? 'border-emerald-500/40 bg-emerald-500/5'
                      : isContacted
                      ? 'border-blue-500/40 bg-blue-500/5'
                      : 'border-amber-500/40 bg-amber-500/5'
                  }`}
                >
                  {/* Top Row */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-xl border-2 border-amber-500/20 shadow">
                        {cand.name.charAt(0)}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base sm:text-lg font-extrabold text-foreground">
                            {cand.name}
                          </h3>

                          {/* Role Tag */}
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-muted border border-border">
                            {roleLabel}
                          </span>

                          {/* Board Tag */}
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide border ${
                              cand.board === 'ICSE'
                                ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
                                : cand.board === 'STATE'
                                ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30'
                                : 'bg-primary/10 text-primary border-primary/30'
                            }`}
                          >
                            {cand.board} Board
                          </span>

                          {/* Status Badge */}
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 border ${
                              isEnrolled
                                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                                : isContacted
                                ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30'
                                : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30 animate-pulse'
                            }`}
                          >
                            {isEnrolled ? '✅ Enrolled as Active Member' : isContacted ? '🟢 Contacted by Admissions' : '🟡 New Lead (Pending Review)'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-0.5">
                          <a
                            href={`mailto:${cand.email}`}
                            className="flex items-center gap-1 hover:text-primary transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{cand.email}</span>
                          </a>

                          <a
                            href={`tel:${cand.phone}`}
                            className="flex items-center gap-1 hover:text-primary transition-colors font-medium text-foreground"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{cand.phone}</span>
                          </a>

                          {cand.city && (
                            <span className="flex items-center gap-1">
                              <School className="w-3.5 h-3.5" />
                              <span>{cand.city}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Quick Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* WhatsApp Contact */}
                      <a
                        href={`https://wa.me/${cand.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${cand.name}, thank you for registering with EduTen for ${cand.board} 10th Board preparation! Our Admissions Team is here to share your complimentary study materials and diagnostic test access.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>

                      {/* 1-Click Approve & Convert to User Account */}
                      {!isEnrolled ? (
                        <button
                          onClick={() => {
                            enrollCandidateAsUser(cand.id);
                            showNotification(`🎉 ${cand.name} enrolled as active ${cand.board} user with generated credentials!`);
                          }}
                          className="px-3.5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                        >
                          <Zap className="w-3.5 h-3.5 text-amber-300" />
                          <span>Approve & Enroll</span>
                        </button>
                      ) : (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Member Provisioned</span>
                        </span>
                      )}

                      {/* Status Toggle Button */}
                      {!isEnrolled && (
                        <button
                          onClick={() => {
                            const nextStatus = isNew ? 'CONTACTED' : 'NEW_LEAD';
                            updateCandidateStatus(cand.id, nextStatus);
                            showNotification(`Lead status updated to ${nextStatus === 'CONTACTED' ? 'Contacted' : 'New Lead'}`);
                          }}
                          className="px-2.5 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-medium border border-border transition-all"
                        >
                          {isNew ? 'Mark Contacted' : 'Mark New Lead'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Selected Interests Pills */}
                  <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-2">
                    <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Interested Services & Inquiries:</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {cand.interests.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded-xl bg-card border border-border text-[11px] font-semibold text-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {cand.notes && (
                      <div className="text-xs text-foreground/90 pt-1 italic bg-card p-2.5 rounded-xl border border-border/80">
                        &quot;{cand.notes}&quot;
                      </div>
                    )}
                  </div>

                  {/* Bottom Token & Date Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60 text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Key className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-[11px]">
                        Tracking Token: <strong className="text-foreground font-mono bg-muted px-2 py-0.5 rounded">{cand.token}</strong>
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(cand.token);
                          setCopiedId(cand.id);
                          showNotification('Tracking token copied to clipboard!');
                          setTimeout(() => setCopiedId(null), 2000);
                        }}
                        className="text-primary hover:underline font-bold text-[11px] ml-1 flex items-center gap-1"
                      >
                        {copiedId === cand.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === cand.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="text-[11px] text-muted-foreground">
                      Submitted on {new Date(cand.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date(cand.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* Regular User Cards list for Students, Parents, Tutors */
        <div className="space-y-4">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded-3xl space-y-3">
              <Users className="w-12 h-12 text-muted-foreground mx-auto opacity-40" />
              <h3 className="text-base font-bold text-foreground">No accounts match your filter criteria</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Try adjusting your search query, board filter, or status dropdown above.
              </p>
            </div>
          ) : (
            filteredUsers.map((user) => {
              const isApproved = user.credentialStatus === 'APPROVED' || !user.credentialStatus;
              const isPending = user.credentialStatus === 'PENDING';
              const isSuspended = user.credentialStatus === 'SUSPENDED';

              return (
                <div
                  key={user.id}
                  className="group rounded-3xl bg-card border border-border hover:border-primary/40 transition-all duration-300 p-5 sm:p-6 shadow-sm hover:shadow-md space-y-4"
                >
                {/* Main Row */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Avatar & Basic Info */}
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="relative">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-border shadow"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg border-2 border-border">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <span
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                          isApproved
                            ? 'bg-emerald-500'
                            : isPending
                            ? 'bg-amber-500 animate-pulse'
                            : 'bg-red-500'
                        }`}
                        title={
                          isApproved
                            ? 'Credentials Granted'
                            : isPending
                            ? 'Pending Admin Grant'
                            : 'Suspended'
                        }
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-lg font-extrabold text-foreground">
                          {user.name}
                        </h3>

                        {/* Board Badge */}
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide border ${
                            user.board === 'ICSE'
                              ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
                              : user.board === 'STATE'
                              ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30'
                              : 'bg-primary/10 text-primary border-primary/30'
                          }`}
                        >
                          {user.board} Board
                        </span>

                        {/* Credential Status Badge */}
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 border ${
                            isApproved
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                              : isPending
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 animate-pulse'
                              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                          }`}
                        >
                          {isApproved && <CheckCircle2 className="w-3 h-3" />}
                          {isPending && <Clock className="w-3 h-3" />}
                          {isSuspended && <AlertTriangle className="w-3 h-3" />}
                          <span>
                            {isApproved
                              ? 'Credentials Granted & Active'
                              : isPending
                              ? 'Pending Admin Authorization'
                              : 'Login Suspended'}
                          </span>
                        </span>
                      </div>

                      {/* Contact & Subtitle Info */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          {user.email}
                        </span>
                        {user.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            {user.phone}
                          </span>
                        )}
                        {user.rollNumber && (
                          <span className="font-mono text-[11px] bg-muted px-2 py-0.5 rounded text-foreground font-semibold">
                            Roll: {user.rollNumber}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions, Edit Credentials & Admin Access Grant Control */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Change Credentials Button (Admin Only) */}
                    {isAdmin && (
                      <button
                        onClick={() => handleOpenEditModal(user)}
                        className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
                        title="Change Login Username, Password and Details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Change Credentials</span>
                      </button>
                    )}

                    {/* Copy Credentials Button */}
                    <button
                      onClick={() => handleCopyCredentials(user)}
                      className="px-3 py-1.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold border border-border flex items-center gap-1.5 transition-all"
                      title="Copy Login Username and Password"
                    >
                      {copiedId === user.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    {/* Admin Quick Grant / Suspend Controls */}
                    {isAdmin && (
                      <>
                        {!isApproved ? (
                          <button
                            onClick={() => handleGrantAccess(user.id, user.name)}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
                          >
                            <Key className="w-3.5 h-3.5" />
                            <span>Grant Access</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRevokeAccess(user.id, user.name)}
                            className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold border border-rose-500/20 flex items-center gap-1.5 transition-all"
                          >
                            <Lock className="w-3.5 h-3.5" />
                            <span>Suspend</span>
                          </button>
                        )}
                      </>
                    )}

                    {!isAdmin && isPending && (
                      <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl">
                        Awaiting Admin Approval
                      </span>
                    )}
                  </div>
                </div>

                {/* Role Specific Details Box */}
                {user.role === 'STUDENT' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-muted/40 border border-border text-xs">
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
                        School / Institution
                      </span>
                      <span className="font-semibold text-foreground">
                        {user.schoolName || 'Delhi Public School, R.K. Puram'}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
                        Active Subscription Pass
                      </span>
                      <span className="font-semibold text-primary">
                        {user.subscriptionPass || `${user.board} 2026 Super Pass`}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
                        Performance Metrics
                      </span>
                      <span className="font-semibold text-foreground">
                        {user.studyHoursWeekly}h / wk • {user.points} XP Points • {user.streakCount}d Streak
                      </span>
                    </div>
                  </div>
                )}

                {user.role === 'PARENT' && user.parentProfile && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-rose-500/5 border border-rose-500/15 text-xs">
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
                        Linked Ward / Student
                      </span>
                      <span className="font-bold text-foreground flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-primary" />
                        {user.parentProfile.studentName} ({user.parentProfile.studentBoard} 10)
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
                        Relationship & Ward Roll
                      </span>
                      <span className="font-semibold text-foreground">
                        {user.parentProfile.relationship} • {user.parentProfile.studentRollNumber}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
                        Alert Preferences
                      </span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        WhatsApp Score Reports: Active
                      </span>
                    </div>
                  </div>
                )}

                {user.role === 'TUTOR' && user.tutorProfile && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 text-xs">
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
                        Qualifications & Degrees
                      </span>
                      <span className="font-semibold text-foreground">
                        {user.tutorProfile.qualifications}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
                        Subjects Taught & Rate
                      </span>
                      <span className="font-semibold text-primary">
                        {user.tutorProfile.subjectsTaught.join(', ')} • ₹{user.tutorProfile.hourlyRate}/hr
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
                        Mentorship Track Record
                      </span>
                      <span className="font-semibold text-foreground flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        {user.tutorProfile.rating} / 5.0 ({user.tutorProfile.reviewCount} Reviews)
                      </span>
                    </div>
                  </div>
                )}

                {/* Secure Credential Preview Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Key className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[11px]">
                      Username: <strong className="text-foreground font-mono bg-muted px-2 py-0.5 rounded">{user.username || user.email.split('@')[0]}</strong>
                    </span>
                    <span className="text-border">•</span>
                    <span className="text-[11px]">
                      Password: <strong className="text-foreground font-mono bg-muted px-2 py-0.5 rounded">{user.tempPassword || 'Granted@2026'}</strong>
                    </span>
                  </div>

                  <div className="text-[11px] text-muted-foreground">
                    Enrolled on {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      )}

      {/* --- MODAL 1: ADMIN + ADD MEMBER (STUDENT / PARENT / TUTOR) WITH EXTENSIVE PROVISIONING OPTIONS --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-foreground">
                    + Add New Member
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Provision Class 10 Candidate, Parent Guardian, or Faculty with Custom Access Options
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleFillSampleData}
                  className="px-2.5 py-1.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-[11px] font-semibold border border-border flex items-center gap-1 transition-all"
                  title="Auto-fill form with sample values"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Fill Sample</span>
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-5">
              {/* 1. Account Role Option Selector */}
              <div>
                <label className="block text-xs font-extrabold text-foreground uppercase tracking-wider mb-2">
                  1. Select Member Role
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    key="STUDENT"
                    type="button"
                    onClick={() => {
                      setNewRole('STUDENT');
                      setNewPassword(generateRandomPassword(newBoard));
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-2.5 ${
                      newRole === 'STUDENT'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-500/30'
                        : 'bg-muted/40 border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <GraduationCap className="w-5 h-5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold leading-tight">Student</div>
                      <div className="text-[10px] opacity-80">10th Candidate</div>
                    </div>
                  </button>

                  <button
                    key="PARENT"
                    type="button"
                    onClick={() => {
                      setNewRole('PARENT');
                      setNewPassword(generateRandomPassword(newBoard));
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-2.5 ${
                      newRole === 'PARENT'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-500/30'
                        : 'bg-muted/40 border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <HeartHandshake className="w-5 h-5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold leading-tight">Parent</div>
                      <div className="text-[10px] opacity-80">Linked Guardian</div>
                    </div>
                  </button>

                  <button
                    key="TUTOR"
                    type="button"
                    onClick={() => {
                      setNewRole('TUTOR');
                      setNewPassword(generateRandomPassword(newBoard));
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-2.5 ${
                      newRole === 'TUTOR'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-500/30'
                        : 'bg-muted/40 border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Users className="w-5 h-5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold leading-tight">Faculty / Tutor</div>
                      <div className="text-[10px] opacity-80">Subject Mentor</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* 2. Primary Identity & Contact */}
              <div>
                <label className="block text-xs font-extrabold text-foreground uppercase tracking-wider mb-2">
                  2. Personal & Contact Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-foreground mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder={newRole === 'STUDENT' ? 'e.g. Diya Sen' : newRole === 'PARENT' ? 'e.g. Anand Sen' : 'e.g. Dr. Alok Nath'}
                      value={newName}
                      onChange={(e) => {
                        setNewName(e.target.value);
                        if (!newUsername) {
                          setNewUsername(`${e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '')}_${newBoard.toLowerCase()}10`);
                        }
                      }}
                      className="w-full px-3.5 py-2 rounded-xl bg-muted/50 border border-border text-xs focus:ring-2 focus:ring-primary/40"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-foreground mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="user@eduten.org"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-muted/50 border border-border text-xs focus:ring-2 focus:ring-primary/40"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-foreground mb-1">Mobile / WhatsApp Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-muted/50 border border-border text-xs focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Board Curriculum & Academic Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-foreground uppercase tracking-wider mb-1.5">
                    Target Board Curriculum
                  </label>
                  <select
                    value={newBoard}
                    onChange={(e) => {
                      const b = e.target.value as Board;
                      setNewBoard(b);
                      setNewPassword(generateRandomPassword(b));
                    }}
                    className="w-full px-3.5 py-2 rounded-xl bg-muted/50 border border-border text-xs font-medium focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="CBSE">CBSE Board (Central Board)</option>
                    <option value="ICSE">ICSE Board (CISCE Council)</option>
                    <option value="STATE">State Board (SCERT Syllabus)</option>
                  </select>
                </div>

                {newRole === 'STUDENT' && (
                  <div>
                    <label className="block text-xs font-extrabold text-foreground uppercase tracking-wider mb-1.5">
                      Target 10th Score Goal
                    </label>
                    <select
                      value={newTargetGoal}
                      onChange={(e) => setNewTargetGoal(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-muted/50 border border-border text-xs font-medium focus:ring-2 focus:ring-primary/40"
                    >
                      <option value="95%+ Distinction">🌟 95%+ Board Distinction (Topper Track)</option>
                      <option value="90%+ First Class">🎯 90%+ First Class with Distinction</option>
                      <option value="85%+ Strong Foundation">📚 85%+ Strong Core Concept Focus</option>
                    </select>
                  </div>
                )}

                {newRole === 'PARENT' && (
                  <div>
                    <label className="block text-xs font-extrabold text-foreground uppercase tracking-wider mb-1.5">
                      Relationship to Student
                    </label>
                    <select
                      value={newRelationship}
                      onChange={(e) => setNewRelationship(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-muted/50 border border-border text-xs font-medium focus:ring-2 focus:ring-primary/40"
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Guardian">Guardian</option>
                      <option value="Elder Sibling">Elder Sibling</option>
                    </select>
                  </div>
                )}

                {newRole === 'TUTOR' && (
                  <div>
                    <label className="block text-xs font-extrabold text-foreground uppercase tracking-wider mb-1.5">
                      Faculty Designation
                    </label>
                    <select
                      value={newDesignation}
                      onChange={(e) => setNewDesignation(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-muted/50 border border-border text-xs font-medium focus:ring-2 focus:ring-primary/40"
                    >
                      <option value="Senior Board Mentor">Senior Board Mentor</option>
                      <option value="Ex-IIT/NIT Researcher">Ex-IIT/NIT Researcher</option>
                      <option value="Board Paper Evaluator">Certified Board Paper Evaluator</option>
                      <option value="Olympiad Coach">Olympiad & NTSE Coach</option>
                    </select>
                  </div>
                )}
              </div>

              {/* 4. Role-Specific Extended Options */}
              {/* STUDENT OPTIONS */}
              {newRole === 'STUDENT' && (
                <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 space-y-3">
                  <div className="text-xs font-extrabold text-blue-700 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" /> Student Academic & Pass Options
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-foreground mb-1">School Name</label>
                      <input
                        type="text"
                        placeholder="e.g. DPS R.K. Puram"
                        value={newSchoolName}
                        onChange={(e) => setNewSchoolName(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-foreground mb-1">Roll / Admission ID</label>
                      <input
                        type="text"
                        placeholder="e.g. CBSE-2026-X-1048"
                        value={newRollNumber}
                        onChange={(e) => setNewRollNumber(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-foreground mb-1">Section</label>
                      <select
                        value={newSection}
                        onChange={(e) => setNewSection(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-medium"
                      >
                        <option value="A">Section A</option>
                        <option value="B">Section B</option>
                        <option value="C">Section C</option>
                        <option value="D">Section D</option>
                      </select>
                    </div>
                  </div>

                  {/* Subscription Pass Options */}
                  <div>
                    <label className="block text-[11px] font-semibold text-foreground mb-1.5">
                      Assign Board Subscription Pass Option
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setNewPassTier('SUPER')}
                        className={`p-2 rounded-xl text-left border transition-all text-xs ${
                          newPassTier === 'SUPER'
                            ? 'bg-blue-600 text-white border-blue-600 font-bold shadow'
                            : 'bg-card border-border text-muted-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-1 font-bold">
                          <Crown className="w-3.5 h-3.5 text-amber-400" /> Super Pass
                        </div>
                        <div className="text-[10px] opacity-80 mt-0.5">Free live classes (all timings)</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setNewPassTier('BOOSTER')}
                        className={`p-2 rounded-xl text-left border transition-all text-xs ${
                          newPassTier === 'BOOSTER'
                            ? 'bg-blue-600 text-white border-blue-600 font-bold shadow'
                            : 'bg-card border-border text-muted-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-1 font-bold">
                          <Zap className="w-3.5 h-3.5 text-amber-400" /> Booster Pass
                        </div>
                        <div className="text-[10px] opacity-80 mt-0.5">Gemini AI + Full Mocks</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setNewPassTier('FREE')}
                        className={`p-2 rounded-xl text-left border transition-all text-xs ${
                          newPassTier === 'FREE'
                            ? 'bg-blue-600 text-white border-blue-600 font-bold shadow'
                            : 'bg-card border-border text-muted-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-1 font-bold">
                          🆓 Free Tier
                        </div>
                        <div className="text-[10px] opacity-80 mt-0.5">Core Syllabus & Notes</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PARENT OPTIONS */}
              {newRole === 'PARENT' && (
                <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
                  <div className="text-xs font-extrabold text-rose-700 dark:text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4" /> Parent Ward Linkage & Alert Options
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-foreground mb-1">
                        Linked Student (Select or Enter Ward)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Aarav Sharma"
                        value={newLinkedStudent}
                        onChange={(e) => setNewLinkedStudent(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-foreground mb-1">
                        Ward School / Institution
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Delhi Public School"
                        value={newSchoolName}
                        onChange={(e) => setNewSchoolName(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border text-xs"
                      />
                    </div>
                  </div>

                  {/* Notification Checkboxes */}
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-[11px] font-semibold text-foreground">
                      Parent Notification Channel Options:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-card border border-border">
                        <input
                          type="checkbox"
                          checked={notifyWhatsapp}
                          onChange={(e) => setNotifyWhatsapp(e.target.checked)}
                          className="rounded text-primary focus:ring-primary"
                        />
                        <span className="text-[11px]">WhatsApp Score Reports</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-card border border-border">
                        <input
                          type="checkbox"
                          checked={notifyAttendance}
                          onChange={(e) => setNotifyAttendance(e.target.checked)}
                          className="rounded text-primary focus:ring-primary"
                        />
                        <span className="text-[11px]">Live Class Attendance</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-card border border-border">
                        <input
                          type="checkbox"
                          checked={notifyTestScores}
                          onChange={(e) => setNotifyTestScores(e.target.checked)}
                          className="rounded text-primary focus:ring-primary"
                        />
                        <span className="text-[11px]">CCE Weakness Heatmap</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TUTOR OPTIONS */}
              {newRole === 'TUTOR' && (
                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
                  <div className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-4 h-4" /> Faculty Teaching & Subject Assignment Options
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-foreground mb-1">
                        Academic Qualifications & Degrees
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. M.Sc. Physics (IIT Delhi), Ph.D."
                        value={newQualifications}
                        onChange={(e) => setNewQualifications(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-foreground mb-1">
                        Hourly Remuneration Rate (₹)
                      </label>
                      <input
                        type="number"
                        min="300"
                        max="2500"
                        step="50"
                        value={newHourlyRate}
                        onChange={(e) => setNewHourlyRate(Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                      />
                    </div>
                  </div>

                  {/* Subject Multi-Select Options */}
                  <div>
                    <label className="block text-[11px] font-semibold text-foreground mb-1.5">
                      Assigned Subjects (Click to toggle):
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Social Studies', 'English'].map((sub) => {
                        const isSelected = newTutorSubjects.includes(sub);
                        return (
                          <button
                            key={sub}
                            type="button"
                            onClick={() => toggleSubjectSelect(sub)}
                            className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                              isSelected
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                : 'bg-card border-border text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            {isSelected && '✓ '}
                            {sub}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Login Credentials & Access Authorization Options */}
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-purple-700 dark:text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4" /> 5. Login Credentials & Access Authorization Options
                  </span>
                  <button
                    type="button"
                    onClick={() => setNewPassword(generateRandomPassword(newBoard))}
                    className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Auto-Generate
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-foreground mb-1">
                      Assigned Username / Portal ID *
                    </label>
                    <input
                      type="text"
                      required
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="e.g. diya_cbse10"
                      className="w-full px-3 py-2 rounded-xl bg-card border border-border font-mono text-xs focus:ring-2 focus:ring-purple-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-foreground mb-1">
                      Initial Password / Access Key *
                    </label>
                    <input
                      type="text"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-card border border-border font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 focus:ring-2 focus:ring-purple-500/40"
                    />
                  </div>
                </div>

                {/* Provisioning Status Option */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-foreground">Initial Status:</span>
                    <button
                      type="button"
                      onClick={() => setNewAccessStatus('APPROVED')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        newAccessStatus === 'APPROVED'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      🟢 Immediate Active Grant
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewAccessStatus('PENDING')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        newAccessStatus === 'PENDING'
                          ? 'bg-amber-600 text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      🟡 Pending Verification
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Cancel, Create */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold shadow-md shadow-primary/25 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create & Provision Member Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: ADMIN EDIT / CHANGE CREDENTIALS FOR EVERYONE --- */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-foreground">Change Login Credentials</h2>
                  <p className="text-xs text-muted-foreground">Master Admin Account Editor for {editName}</p>
                </div>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditCredentials} className="space-y-4">
              {/* Credentials Change Box */}
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-purple-700 dark:text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5" /> Login Credentials & Password
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditPassword(generateRandomPassword(editBoard))}
                    className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Generate Strong Password
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-foreground mb-1">
                      Username / Login ID
                    </label>
                    <input
                      type="text"
                      required
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-card border border-border font-mono text-xs focus:ring-2 focus:ring-purple-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-foreground mb-1">
                      Password / Access Key
                    </label>
                    <input
                      type="text"
                      required
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-card border border-border font-mono text-xs focus:ring-2 focus:ring-purple-500/40 font-bold text-emerald-600 dark:text-emerald-400"
                    />
                  </div>
                </div>

                {/* Credential Status Switcher */}
                <div>
                  <label className="block text-[11px] font-semibold text-foreground mb-1">
                    Login Access Status
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setEditStatus('APPROVED')}
                      className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all ${
                        editStatus === 'APPROVED'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                          : 'bg-muted/40 border-border text-muted-foreground'
                      }`}
                    >
                      🟢 Active
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditStatus('PENDING')}
                      className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all ${
                        editStatus === 'PENDING'
                          ? 'bg-amber-500 text-white border-amber-500 shadow'
                          : 'bg-muted/40 border-border text-muted-foreground'
                      }`}
                    >
                      🟡 Pending
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditStatus('SUSPENDED')}
                      className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all ${
                        editStatus === 'SUSPENDED'
                          ? 'bg-rose-600 text-white border-rose-600 shadow'
                          : 'bg-muted/40 border-border text-muted-foreground'
                      }`}
                    >
                      🔴 Suspended
                    </button>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-muted/50 border border-border text-xs focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-muted/50 border border-border text-xs focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              {/* Phone & Board */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-muted/50 border border-border text-xs focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Board</label>
                  <select
                    value={editBoard}
                    onChange={(e) => setEditBoard(e.target.value as Board)}
                    className="w-full px-3.5 py-2 rounded-xl bg-muted/50 border border-border text-xs focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="CBSE">CBSE Board</option>
                    <option value="ICSE">ICSE Board</option>
                    <option value="STATE">State Board</option>
                  </select>
                </div>
              </div>

              {/* Role specific editing fields */}
              {editRole === 'STUDENT' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">School Name</label>
                    <input
                      type="text"
                      value={editSchoolName}
                      onChange={(e) => setEditSchoolName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-muted/50 border border-border text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Roll Number</label>
                    <input
                      type="text"
                      value={editRollNumber}
                      onChange={(e) => setEditRollNumber(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-muted/50 border border-border text-xs"
                    />
                  </div>
                </div>
              )}

              {editRole === 'PARENT' && (
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Linked Student Name</label>
                  <input
                    type="text"
                    value={editLinkedStudent}
                    onChange={(e) => setEditLinkedStudent(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-muted/50 border border-border text-xs"
                  />
                </div>
              )}

              {editRole === 'TUTOR' && (
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Subjects Taught</label>
                  <input
                    type="text"
                    value={editSchoolOrSubject}
                    onChange={(e) => setEditSchoolOrSubject(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-muted/50 border border-border text-xs"
                  />
                </div>
              )}

              {/* Action Buttons: Delete, Cancel, Save */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                {editingUserId && (
                  <button
                    type="button"
                    onClick={() => handleDeleteUser(editingUserId, editName)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-500/10 flex items-center gap-1.5 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete User</span>
                  </button>
                )}

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/25 flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save & Update Credentials</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 3: MASTER CREDENTIALS SPREADSHEET VIEW & CSV EXPORT --- */}
      {showCredentialsSheetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-6xl bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-6 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-foreground flex items-center gap-2">
                    <span>EduTen All Login Credentials Sheet</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                      {directoryUsers.length} Accounts
                    </span>
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Complete master record of active credentials for Students, Parents, Tutors, and Administrators.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const csvRows = [
                      ['Role', 'Full Name', 'Board', 'Username', 'Email', 'Password', 'Status', 'Pass Tier'].join(','),
                      ...directoryUsers.map((u) =>
                        [
                          u.role,
                          `"${u.name}"`,
                          u.board,
                          u.username || u.email.split('@')[0],
                          u.email,
                          `"${u.tempPassword || 'Password@2026'}"`,
                          u.credentialStatus || 'APPROVED',
                          `"${u.subscriptionPass || 'Super Pass'}"`,
                        ].join(',')
                      ),
                    ].join('\n');
                    navigator.clipboard.writeText(csvRows);
                    showNotification('📋 Complete Credentials CSV copied to clipboard!');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-bold border border-border flex items-center gap-1.5 transition-all"
                >
                  <Copy className="w-3.5 h-3.5 text-amber-500" />
                  <span>Copy Full Sheet CSV</span>
                </button>

                <button
                  onClick={() => setShowCredentialsSheetModal(false)}
                  className="p-2 rounded-xl hover:bg-muted text-muted-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, username, email, or roll..."
                  value={sheetSearch}
                  onChange={(e) => setSheetSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-muted/50 border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-muted/60 border border-border text-xs w-full sm:w-auto">
                {(['ALL', 'STUDENT', 'PARENT', 'TUTOR', 'ADMIN'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setSheetRoleFilter(r)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                      sheetRoleFilter === r
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {r === 'ALL' ? 'All Roles' : r.charAt(0) + r.slice(1).toLowerCase() + 's'}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Spreadsheet Table */}
            <div className="flex-1 overflow-auto rounded-2xl border border-border shadow-inner bg-card">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-muted/70 text-muted-foreground uppercase text-[10px] font-extrabold sticky top-0 border-b border-border z-10">
                  <tr>
                    <th className="py-3 px-3.5">Role</th>
                    <th className="py-3 px-3.5">Full Name</th>
                    <th className="py-3 px-3.5">Board</th>
                    <th className="py-3 px-3.5">Username / Login ID</th>
                    <th className="py-3 px-3.5">Email Address</th>
                    <th className="py-3 px-3.5">Password</th>
                    <th className="py-3 px-3.5">Status</th>
                    <th className="py-3 px-3.5">Pass / Access Plan</th>
                    <th className="py-3 px-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 font-medium text-foreground">
                  {directoryUsers
                    .filter((u) => {
                      const matchesRole = sheetRoleFilter === 'ALL' || u.role === sheetRoleFilter;
                      const matchesSearch =
                        u.name.toLowerCase().includes(sheetSearch.toLowerCase()) ||
                        u.email.toLowerCase().includes(sheetSearch.toLowerCase()) ||
                        (u.username && u.username.toLowerCase().includes(sheetSearch.toLowerCase())) ||
                        (u.rollNumber && u.rollNumber.toLowerCase().includes(sheetSearch.toLowerCase()));
                      return matchesRole && matchesSearch;
                    })
                    .map((u) => {
                      const isApproved = u.credentialStatus === 'APPROVED' || !u.credentialStatus;
                      const isPending = u.credentialStatus === 'PENDING';
                      const isSuspended = u.credentialStatus === 'SUSPENDED';

                      const roleBadgeClass =
                        u.role === 'STUDENT'
                          ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
                          : u.role === 'PARENT'
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                          : u.role === 'TUTOR'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                          : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30';

                      return (
                        <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-3.5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${roleBadgeClass}`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3 px-3.5 font-bold">{u.name}</td>
                          <td className="py-3 px-3.5">
                            <span className="px-2 py-0.5 rounded bg-muted text-[10px] font-extrabold uppercase">
                              {u.board}
                            </span>
                          </td>
                          <td className="py-3 px-3.5 font-mono text-[11px] text-primary font-bold">
                            {u.username || u.email.split('@')[0]}
                          </td>
                          <td className="py-3 px-3.5 text-muted-foreground">{u.email}</td>
                          <td className="py-3 px-3.5 font-mono text-[11px] bg-muted/40 font-bold">
                            {u.tempPassword || 'Password@2026'}
                          </td>
                          <td className="py-3 px-3.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                isApproved
                                  ? 'bg-emerald-500/10 text-emerald-600'
                                  : isPending
                                  ? 'bg-amber-500/10 text-amber-600 animate-pulse'
                                  : 'bg-rose-500/10 text-rose-600'
                              }`}
                            >
                              {isApproved ? 'Active' : isPending ? 'Pending' : 'Suspended'}
                            </span>
                          </td>
                          <td className="py-3 px-3.5 text-[11px] text-muted-foreground truncate max-w-[150px]">
                            {u.subscriptionPass || 'Super Pass'}
                          </td>
                          <td className="py-3 px-3.5 text-right">
                            <button
                              type="button"
                              onClick={() => handleCopyCredentials(u)}
                              className="px-2.5 py-1 rounded-lg bg-primary text-white text-[11px] font-bold hover:bg-primary/90 transition-all inline-flex items-center gap-1 shadow-sm"
                              title="Copy login details for this user"
                            >
                              {copiedId === u.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedId === u.id ? 'Copied' : 'Copy'}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            {/* Footer Summary */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground pt-2 border-t border-border shrink-0">
              <div>
                Showing <strong>{directoryUsers.length} total members</strong>. To change credentials, use the Edit button on any card in the main directory.
              </div>
              <button
                type="button"
                onClick={() => setShowCredentialsSheetModal(false)}
                className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary/90 transition-all"
              >
                Close Sheet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
