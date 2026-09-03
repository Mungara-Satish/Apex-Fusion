'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { ThemeToggle } from './theme-toggle';
import {
  GraduationCap,
  BookOpen,
  HelpCircle,
  FileCheck2,
  Users,
  Video,
  Menu,
  X,
  Flame,
  LayoutDashboard,
  FolderDown,
  Sparkles,
  Bot,
  CreditCard,
  HeartHandshake,
  LogIn,
  LogOut,
  User as UserIcon,
  ChevronDown,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentRole, currentUser, isLoggedIn, logout, streakCount, currentBoard } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const activeBoard = currentBoard || currentUser?.board || 'CBSE';

  // Dynamic role-tailored navigation links
  const navLinks = React.useMemo(() => {
    if (currentRole === 'PARENT') {
      return [
        { name: 'Parent Oversight', href: '/dashboard/parent', icon: HeartHandshake, badge: 'Active' },
        { name: 'CCE Report Card', href: '/parent/report-card', icon: FileCheck2 },
        { name: 'Students & Tutors', href: '/directory', icon: Users },
        { name: 'Platform Overview', href: '/vlog', icon: Sparkles, badge: 'Details' },
        { name: 'AI Doubt Insights', href: '/ai-doubt-solver', icon: Bot, badge: 'Gemini AI', highlight: true },
        { name: 'Syllabus & Notes', href: '/subjects', icon: BookOpen },
        { name: 'Verified Mentors', href: '/tutors', icon: Users },
        { name: 'Passes', href: '/pricing', icon: CreditCard },
      ];
    }

    if (currentRole === 'TUTOR') {
      return [
        { name: 'Tutor Dashboard', href: '/dashboard/tutor', icon: Users, badge: 'Live Class' },
        { name: 'Students & Directory', href: '/directory', icon: Users },
        { name: 'Platform Overview', href: '/vlog', icon: Sparkles, badge: 'Details' },
        { name: 'AI Doubt Assistant', href: '/ai-doubt-solver', icon: Bot, badge: 'Gemini AI' },
        { name: 'Doubt Queue', href: '/doubts', icon: HelpCircle },
        { name: 'Syllabus Hub', href: '/subjects', icon: BookOpen },
        { name: 'Board Passes', href: '/pricing', icon: CreditCard },
      ];
    }

    if (currentRole === 'ADMIN') {
      return [
        { name: 'Admin Console', href: '/dashboard/admin', icon: HeartHandshake, badge: 'Root Access' },
        { name: 'Students, Parents & Tutors', href: '/directory', icon: Users, badge: 'Credentials' },
        { name: 'Platform Overview', href: '/vlog', icon: Sparkles, badge: 'Details' },
        { name: 'AI Doubt Solver', href: '/ai-doubt-solver', icon: Bot, badge: 'Gemini AI' },
        { name: 'Subjects', href: '/subjects', icon: BookOpen },
        { name: 'Tutors & Ops', href: '/tutors', icon: Users },
      ];
    }

    // Default: STUDENT
    return [
      { name: 'AI Doubt Solver', href: '/ai-doubt-solver', icon: Bot, badge: 'Gemini AI', highlight: true },
      { name: 'Subjects', href: '/subjects', icon: BookOpen },
      { name: 'Doubt Forum', href: '/doubts', icon: HelpCircle },
      { name: 'Tutors & Live', href: '/tutors', icon: Users },
      { name: 'Passes', href: '/pricing', icon: CreditCard },
    ];
  }, [currentRole, activeBoard]);

  const dashboardUrl =
    currentRole === 'STUDENT'
      ? '/dashboard/student'
      : currentRole === 'PARENT'
      ? '/dashboard/parent'
      : currentRole === 'TUTOR'
      ? '/dashboard/tutor'
      : '/dashboard/admin';

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    router.push('/login');
  };

  // Remove header on login page (AFTER all hooks have executed)
  if (pathname?.startsWith('/login')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo with Dynamic Board Name */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg sm:text-xl tracking-tight text-foreground">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-primary flex items-center justify-center text-white shadow-md shadow-primary/25">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="leading-none flex items-center gap-1.5">
                EduTen{' '}
                <span className={`text-[10px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded ${
                  activeBoard === 'ICSE'
                    ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30'
                    : activeBoard === 'STATE'
                    ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30'
                    : 'bg-primary/10 text-primary border border-primary/30'
                }`}>
                  {activeBoard} 10
                </span>
              </span>
              <span className="text-[10px] text-muted-foreground font-normal">Board Prep Platform</span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-primary/10 text-primary font-bold'
                      : link.highlight
                      ? 'text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-500/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {link.name}
                  {link.badge && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${
                      link.badge === 'Gemini AI'
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm animate-pulse'
                        : 'bg-rose-500 text-white'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Streak indicator (for student) */}
          {currentRole === 'STUDENT' && streakCount > 0 && (
            <div
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20"
              title="Current Daily Study Streak"
            >
              <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>{streakCount} Day Streak</span>
            </div>
          )}

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Profile / Dashboard dropdown */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-border hover:bg-muted/50 transition-colors"
              >
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={currentUser.name}
                  className="h-7 w-7 rounded-lg object-cover"
                />
                <span className="hidden md:inline text-xs font-semibold text-foreground max-w-[120px] truncate">
                  {currentUser.name}
                </span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card shadow-xl p-2 space-y-1 z-50 text-xs animate-in fade-in">
                  <div className="px-3 py-2 border-b border-border/50">
                    <p className="font-bold text-foreground truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{currentUser.email}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-extrabold uppercase">
                        {currentRole}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[10px] font-bold">
                        {activeBoard} Board
                      </span>
                    </div>
                  </div>

                  <Link
                    href={dashboardUrl}
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted font-medium transition-colors"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    <span>My Dashboard</span>
                  </Link>

                  <Link
                    href="/pricing"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted font-medium transition-colors"
                  >
                    <CreditCard className="h-3.5 w-3.5" />
                    <span>Manage Passes</span>
                  </Link>

                  <div className="border-t border-border/50 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-500 hover:bg-rose-500/10 font-medium transition-colors text-left"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </Link>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-border text-foreground hover:bg-muted"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-background p-4 space-y-3">
          <div className="px-2 py-1 flex items-center justify-between text-xs font-bold text-muted-foreground border-b border-border pb-2">
            <span>Role: {currentRole}</span>
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary">{activeBoard} 10</span>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded bg-rose-500 text-white text-[10px] font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
