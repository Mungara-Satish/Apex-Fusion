'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Role, Board } from '@/lib/types';
import {
  GraduationCap,
  HeartHandshake,
  UserCheck,
  Shield,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ChevronDown,
  X,
} from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginAs, setBoard, currentBoard, directoryUsers } = useAppStore();

  const initialRoleParam = searchParams.get('role')?.toUpperCase();
  const validInitialRole: Role =
    initialRoleParam === 'STUDENT' ||
    initialRoleParam === 'PARENT' ||
    initialRoleParam === 'TUTOR' ||
    initialRoleParam === 'ADMIN'
      ? (initialRoleParam as Role)
      : 'STUDENT';

  const [selectedRole, setSelectedRole] = useState<Role>(validInitialRole);
  const [selectedBoard, setSelectedBoard] = useState<Board>(currentBoard || 'CBSE');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Update role if query param changes
  useEffect(() => {
    if (initialRoleParam) {
      if (
        initialRoleParam === 'STUDENT' ||
        initialRoleParam === 'PARENT' ||
        initialRoleParam === 'TUTOR' ||
        initialRoleParam === 'ADMIN'
      ) {
        setSelectedRole(initialRoleParam as Role);
      }
    }
  }, [initialRoleParam]);

  const handleRoleChange = (newRole: Role) => {
    setSelectedRole(newRole);
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedId = identifier.trim();
    const trimmedPass = password.trim();

    if (!trimmedId || !trimmedPass) {
      setErrorMsg('Please enter your username/email and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // 1. Check if user exists in directoryUsers
      const matchedUser = directoryUsers.find((u) => {
        const matchesRole = u.role === selectedRole;
        const matchesIdentifier =
          u.email.toLowerCase() === trimmedId.toLowerCase() ||
          (u.username && u.username.toLowerCase() === trimmedId.toLowerCase()) ||
          (u.rollNumber && u.rollNumber.toLowerCase() === trimmedId.toLowerCase()) ||
          (u.phone && u.phone.includes(trimmedId));
        return matchesRole && matchesIdentifier;
      });

      if (matchedUser) {
        if (matchedUser.credentialStatus === 'SUSPENDED') {
          setIsLoading(false);
          setErrorMsg('⚠️ This account has been suspended by the Administrator. Please contact support.');
          return;
        }

        loginAs(matchedUser.role, matchedUser);
        if (matchedUser.board) {
          setBoard(matchedUser.board);
        }
      } else {
        // Fallback login with typed credentials
        const fallbackBoard = selectedRole === 'STUDENT' ? selectedBoard : 'CBSE';
        setBoard(fallbackBoard);
        loginAs(selectedRole, {
          name: trimmedId.includes('@') ? trimmedId.split('@')[0] : trimmedId,
          email: trimmedId.includes('@') ? trimmedId : `${trimmedId.toLowerCase()}@eduten.org`,
          board: fallbackBoard,
        });
      }

      setIsLoading(false);

      // Redirect to appropriate dashboard
      if (selectedRole === 'STUDENT') router.push('/dashboard/student');
      else if (selectedRole === 'PARENT') router.push('/dashboard/parent');
      else if (selectedRole === 'TUTOR') router.push('/dashboard/tutor');
      else router.push('/dashboard/admin');
    }, 600);
  };

  const getRoleMetadata = (role: Role) => {
    switch (role) {
      case 'STUDENT':
        return {
          title: 'Student Portal',
          badge: 'Class 10 CBSE, ICSE & State',
          icon: GraduationCap,
          placeholder: 'e.g. aarav_sharma or student@eduten.org',
          idLabel: 'Student Username / Email / Roll Number',
        };
      case 'PARENT':
        return {
          title: 'Parent Control Portal',
          badge: 'Ward Oversight & CCE Reports',
          icon: HeartHandshake,
          placeholder: 'e.g. parent.sharma@eduten.org or mobile number',
          idLabel: 'Parent Registered Email / Phone',
        };
      case 'TUTOR':
        return {
          title: 'Faculty & Tutor Portal',
          badge: 'Verified Faculty & Live Classes',
          icon: UserCheck,
          placeholder: 'e.g. priya.raman@eduten.org or faculty ID',
          idLabel: 'Faculty Email / Staff Username',
        };
      case 'ADMIN':
        return {
          title: 'Administrator Console',
          badge: 'Master Root Access',
          icon: Shield,
          placeholder: 'e.g. admin or admin@eduten.org',
          idLabel: 'Administrator Username / Email',
        };
    }
  };

  const meta = getRoleMetadata(selectedRole);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4 sm:p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-foreground relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar with Return Link */}
      <div className="w-full max-w-md mx-auto mb-6 flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Home</span>
        </Link>

        <div className="flex items-center gap-2 font-bold text-white text-sm">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white shadow-md shadow-primary/30">
            <GraduationCap className="w-4 h-4" />
          </div>
          <span>EduTen</span>
        </div>
      </div>

      {/* Central Login Card */}
      <div className="w-full max-w-md bg-card/95 dark:bg-card/90 backdrop-blur-xl border border-border shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6 z-10 relative">
        {/* Portal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-extrabold uppercase tracking-wider border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Portal Sign In</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Sign In to EduTen
          </h1>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto">
            Choose your account role below to access your tailored dashboard.
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-semibold flex items-center gap-2.5 animate-in fade-in zoom-in-95 duration-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Account Role Dropdown Option */}
          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold text-foreground uppercase tracking-wider">
              1. Account Role *
            </label>
            <div className="relative">
              <select
                value={selectedRole}
                onChange={(e) => handleRoleChange(e.target.value as Role)}
                className="w-full px-4 py-3 rounded-2xl bg-muted/60 border-2 border-border focus:border-primary text-foreground text-xs sm:text-sm font-bold shadow-sm appearance-none cursor-pointer pr-10 focus:outline-none transition-all"
              >
                <option value="STUDENT">🎓 Student (Class 10 CBSE / ICSE / State)</option>
                <option value="PARENT">👨‍👩‍👧 Parent (Ward Oversight & CCE Reports)</option>
                <option value="TUTOR">👨‍🏫 Tutor (Faculty & Live Classrooms)</option>
                <option value="ADMIN">🛡️ Admin (Root Master Console)</option>
              </select>
              <ChevronDown className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* 2. Board Selector (If Student is selected) */}
          {selectedRole === 'STUDENT' && (
            <div className="space-y-1.5 animate-in fade-in duration-200">
              <label className="block text-xs font-extrabold text-foreground uppercase tracking-wider">
                2. Board Curriculum *
              </label>
              <div className="relative">
                <select
                  value={selectedBoard}
                  onChange={(e) => setSelectedBoard(e.target.value as Board)}
                  className="w-full px-4 py-3 rounded-2xl bg-muted/60 border border-border focus:border-primary text-foreground text-xs sm:text-sm font-semibold shadow-sm appearance-none cursor-pointer pr-10 focus:outline-none transition-all"
                >
                  <option value="CBSE">CBSE Class 10 (NCERT Aligned)</option>
                  <option value="ICSE">ICSE Class 10 (CISCE Board)</option>
                  <option value="STATE">State Board Class 10 (SCERT)</option>
                </select>
                <ChevronDown className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          )}

          {/* 3. Username / Email / Identifier */}
          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold text-foreground uppercase tracking-wider">
              {selectedRole === 'STUDENT' ? '2. Username / Email / Roll ID *' : '2. Username or Email *'}
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder={meta.placeholder}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-muted/50 border border-border focus:border-primary text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-all"
              />
            </div>
          </div>

          {/* 4. Password Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-extrabold text-foreground uppercase tracking-wider">
                Password *
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-[11px] font-semibold text-primary hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="Enter your account password"
                className="w-full pl-10 pr-10 py-3 rounded-2xl bg-muted/50 border border-border focus:border-primary text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-muted-foreground hover:text-foreground select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary h-4 w-4"
              />
              <span>Remember this session</span>
            </label>

            <span className="text-[11px] text-muted-foreground">
              Role: <strong className="text-foreground">{selectedRole}</strong>
            </span>
          </div>

          {/* Submit Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold text-sm shadow-xl shadow-primary/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 mt-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In as {selectedRole.charAt(0) + selectedRole.slice(1).toLowerCase()}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Card Footer: Need Account or Credentials? */}
        <div className="pt-4 border-t border-border/80 text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            Don&apos;t have an account or login credentials?
          </p>
          <Link
            href="/vlog#registration-form"
            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
          >
            <span>Register Interest & Request Admission</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Forgot Password Guidance Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <HelpCircle className="w-5 h-5 text-primary" />
                <span>Password Reset & Recovery</span>
              </div>
              <button
                onClick={() => setShowForgotModal(false)}
                className="p-1 rounded-lg hover:bg-muted text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Login credentials for EduTen are issued and managed by your institution or platform Master Admin.
            </p>

            <div className="p-4 rounded-2xl bg-muted/60 border border-border space-y-2 text-xs">
              <div className="font-bold text-foreground">How to recover your access:</div>
              <ul className="space-y-1.5 text-muted-foreground list-disc pl-4 text-[11px]">
                <li><strong>Students & Parents:</strong> Contact your school coordinator or administrative desk.</li>
                <li><strong>Tutors & Faculty:</strong> Reach out to the Academic Director for credential regeneration.</li>
                <li><strong>Admissions Inquiries:</strong> Track your application token on the Platform Overview page.</li>
              </ul>
            </div>

            <button
              onClick={() => setShowForgotModal(false)}
              className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all"
            >
              Got it, Return to Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginHubPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-xs">
          Loading login portal...
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}

