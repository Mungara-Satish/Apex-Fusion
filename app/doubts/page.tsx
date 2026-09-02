'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { SUBJECTS } from '@/lib/mock-data';
import { MathRenderer } from '@/components/math-renderer';
import {
  HelpCircle,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Clock,
} from 'lucide-react';

export default function DoubtsPage() {
  const { doubts, upvoteDoubt } = useAppStore();
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDoubts = doubts.filter((d) => {
    const matchesSubject = selectedSubject === 'ALL' || d.subjectId === selectedSubject;
    const matchesStatus = selectedStatus === 'ALL' || d.status === selectedStatus;
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.subjectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> 24/7 Peer & Mentor Q&A
          </div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
            10th-Grade Doubt Clearance Forum
          </h1>
          <p className="text-sm text-muted-foreground">
            Get step-by-step mathematical proofs and verified solutions from IIT & Board expert mentors.
          </p>
        </div>

        <Link
          href="/doubts/new"
          className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-all flex items-center gap-2 self-start md:self-auto shadow-md shadow-primary/20"
        >
          <Plus className="w-4 h-4" /> Ask a New Doubt
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Search */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doubts by topic, keyword, or equation..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Subject Filter */}
        <div className="md:col-span-4">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary font-medium"
          >
            <option value="ALL">All Core Subjects</option>
            {SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="md:col-span-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary font-medium"
          >
            <option value="ALL">All Statuses</option>
            <option value="OPEN">🔴 Open / Unsolved</option>
            <option value="ANSWERED">🟡 Answered</option>
            <option value="RESOLVED">🟢 Resolved & Verified</option>
          </select>
        </div>
      </div>

      {/* Doubts List */}
      <div className="space-y-4">
        {filteredDoubts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-border bg-card space-y-3">
            <HelpCircle className="w-8 h-8 text-muted-foreground mx-auto" />
            <h3 className="font-bold text-foreground text-base">No doubts match your search</h3>
            <p className="text-xs text-muted-foreground">Try adjusting your filters or be the first to ask a question!</p>
            <Link
              href="/doubts/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" /> Post New Question
            </Link>
          </div>
        ) : (
          filteredDoubts.map((doubt) => (
            <div
              key={doubt.id}
              className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all space-y-4 shadow-sm"
            >
              {/* Top metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                    {doubt.subjectName}
                  </span>
                  {doubt.chapterTitle && (
                    <span className="text-xs text-muted-foreground">• {doubt.chapterTitle}</span>
                  )}
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    doubt.status === 'RESOLVED'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : doubt.status === 'ANSWERED'
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {doubt.status}
                </span>
              </div>

              {/* Title with KaTeX */}
              <Link href={`/doubts/${doubt.id}`} className="block group">
                <h2 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  <MathRenderer math={doubt.title} />
                </h2>
              </Link>

              {/* Snippet */}
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {doubt.content}
              </p>

              {/* Verified Solution Snippet if available */}
              {doubt.replies.length > 0 && (
                <div className="p-3 rounded-xl bg-muted/40 border border-border/80 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Answer by {doubt.replies[0].authorName} ({doubt.replies[0].authorRole}):
                  </div>
                  <div className="text-muted-foreground line-clamp-2 pl-5 font-mono text-[11px]">
                    <MathRenderer math={doubt.replies[0].content} />
                  </div>
                </div>
              )}

              {/* Bottom bar */}
              <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <img
                    src={doubt.studentAvatar}
                    alt={doubt.studentName}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span>
                    Asked by <span className="font-semibold text-foreground">{doubt.studentName}</span> ({doubt.studentBoard})
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => upvoteDoubt(doubt.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border hover:bg-muted transition-colors font-medium"
                    title="Upvote this question"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-primary" />
                    <span>{doubt.upvotes}</span>
                  </button>

                  <Link
                    href={`/doubts/${doubt.id}`}
                    className="flex items-center gap-1.5 font-semibold text-primary hover:underline"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{doubt.replies.length} Replies</span>
                    <ArrowRight className="w-3 h-3 ml-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
