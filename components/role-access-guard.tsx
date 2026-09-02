'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { Role } from '@/lib/types';
import { ShieldAlert, ShieldCheck, Lock, ArrowRight, UserCheck, Loader2 } from 'lucide-react';

interface RoleAccessGuardProps {
  allowedRoles: Role[];
  children: React.ReactNode;
  pageTitle?: string;
}

export function RoleAccessGuard({
  allowedRoles,
  children,
  pageTitle = 'Protected Area',
}: RoleAccessGuardProps) {
  const { currentRole, isLoggedIn } = useAppStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // During SSR / client hydration tick, render placeholder to prevent flash of Access Restricted
  if (!isMounted) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-8 text-center">
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-semibold">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span>Verifying security credentials & role permissions...</span>
        </div>
      </div>
    );
  }

  // ADMIN always has full master access to all portals!
  const hasAccess = isLoggedIn && (currentRole === 'ADMIN' || allowedRoles.includes(currentRole));

  if (!hasAccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6 animate-in fade-in">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto border border-rose-500/20 shadow-lg">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 font-bold text-xs uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" /> Access Restricted
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            {pageTitle} — Authorization Required
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Your current account role (<span className="font-bold text-foreground">{currentRole}</span>) does not have permission to view this section.
            Only accounts with <span className="font-bold text-foreground">{allowedRoles.join(' or ')}</span> privileges (or <span className="font-bold text-primary">ADMIN Master Access</span>) can enter.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-muted/40 border border-border max-w-md mx-auto space-y-3 text-xs">
          <div className="font-bold text-foreground">Sign In with Permitted Role:</div>
          <div className="grid grid-cols-2 gap-2">
            {allowedRoles.map((role) => (
              <Link
                key={role}
                href={`/login/${role.toLowerCase()}`}
                className="p-2.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all text-center text-xs"
              >
                Sign In as {role} &rarr;
              </Link>
            ))}
            <Link
              href="/login/admin"
              className="p-2.5 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-300 font-bold hover:bg-purple-500/20 transition-all text-center text-xs col-span-2"
            >
              Root Admin Master Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* If an Admin is browsing another role's dashboard, show an Admin Master Access Banner */}
      {currentRole === 'ADMIN' && !allowedRoles.includes('ADMIN') && (
        <div className="bg-purple-950 text-purple-200 text-xs py-2 px-4 border-b border-purple-800 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <ShieldCheck className="w-4 h-4 text-purple-400" /> ADMIN MASTER OVERRIDE ACTIVE: Viewing {allowedRoles.join('/')} space with Superuser privileges.
            </span>
            <Link href="/dashboard/admin" className="font-bold text-white hover:underline text-[11px]">
              Return to Admin Console &rarr;
            </Link>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
