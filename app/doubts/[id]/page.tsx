'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { CURRENT_STUDENT, CURRENT_TUTOR } from '@/lib/mock-data';
import { MathRenderer } from '@/components/math-renderer';
import {
  ArrowLeft,
  ThumbsUp,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  Send,
  Sparkles,
  HelpCircle,
  Eye,
} from 'lucide-react';

export default function DoubtDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { doubts, upvoteDoubt, upvoteReply, addDoubtReply, currentRole } = useAppStore();

  const [replyText, setReplyText] = useState<string>('');

  const doubt = doubts.find((d) => d.id === id);

  if (!doubt) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold">Doubt Not Found</h1>
        <Link href="/doubts" className="text-primary font-semibold hover:underline">
          &larr; Back to Doubt Forum
        </Link>
      </div>
    );
  }

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const author = currentRole === 'TUTOR' ? CURRENT_TUTOR : CURRENT_STUDENT;

    addDoubtReply(doubt.id, {
      doubtId: doubt.id,
      authorId: author.id,
      authorName: author.name,
      authorRole: currentRole,
      authorAvatar: author.avatar,
      content: replyText,
      isAccepted: currentRole === 'TUTOR',
      isTutorVerified: currentRole === 'TUTOR',
    });

    setReplyText('');
  };

  const insertFormula = (formula: string) => {
    setReplyText((prev) => prev + ' ' + formula + ' ');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/doubts"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Doubt Forum
        </Link>
      </div>

      {/* Main Question Card */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
              {doubt.subjectName}
            </span>
            {doubt.chapterTitle && (
              <span className="text-xs text-muted-foreground font-medium">
                • {doubt.chapterTitle}
              </span>
            )}
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
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

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-extrabold text-foreground leading-snug">
          <MathRenderer math={doubt.title} />
        </h1>

        {/* Question Details */}
        <div className="p-4 rounded-2xl bg-muted/30 border border-border/80 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
          <MathRenderer math={doubt.content} />
        </div>

        {/* Optional Image */}
        {doubt.imageUrl && (
          <div className="rounded-2xl border border-border overflow-hidden">
            <img src={doubt.imageUrl} alt="Problem diagram" className="max-h-96 w-auto object-contain" />
          </div>
        )}

        {/* Author & Upvote */}
        <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <img
              src={doubt.studentAvatar}
              alt={doubt.studentName}
              className="w-8 h-8 rounded-full object-cover border border-border"
            />
            <div>
              <div className="font-bold text-foreground">{doubt.studentName}</div>
              <div className="text-[11px] text-muted-foreground">{doubt.studentBoard} Board Student</div>
            </div>
          </div>

          <button
            onClick={() => upvoteDoubt(doubt.id)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-border hover:bg-muted font-bold text-foreground transition-colors"
          >
            <ThumbsUp className="w-4 h-4 text-primary" />
            <span>{doubt.upvotes} Helpful</span>
          </button>
        </div>
      </div>

      {/* Answers Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Step-by-Step Solutions & Replies ({doubt.replies.length})
        </h2>

        {doubt.replies.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-border bg-card space-y-2">
            <p className="text-xs text-muted-foreground">
              No replies yet. Be the first to provide a step-by-step mathematical proof!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {doubt.replies.map((reply) => (
              <div
                key={reply.id}
                className={`p-6 rounded-2xl border bg-card shadow-sm space-y-4 transition-all ${
                  reply.isTutorVerified
                    ? 'border-emerald-500/50 shadow-md shadow-emerald-500/5 bg-emerald-500/[0.02]'
                    : 'border-border'
                }`}
              >
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={reply.authorAvatar}
                      alt={reply.authorName}
                      className="w-9 h-9 rounded-full object-cover border border-border"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-sm text-foreground">
                        <span>{reply.authorName}</span>
                        {reply.authorRole === 'TUTOR' && (
                          <span className="px-2 py-0.2 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
                            Tutor
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {new Date(reply.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {reply.isTutorVerified && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1 border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Solution
                    </span>
                  )}
                </div>

                {/* Reply content rendered with KaTeX */}
                <div className="text-xs sm:text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  <MathRenderer math={reply.content} />
                </div>

                {/* Upvote Reply */}
                <div className="pt-3 border-t border-border flex items-center justify-end">
                  <button
                    onClick={() => upvoteReply(doubt.id, reply.id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-border hover:bg-muted text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-primary" />
                    <span>{reply.upvotes} Upvotes</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Post a Reply Form */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-foreground">
            Post Your Solution or Clarification
          </h3>
          <span className="text-[11px] text-muted-foreground">
            Posting as: <strong className="text-foreground">{currentRole}</strong>
          </span>
        </div>

        {/* Formula shortcut helpers */}
        <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-muted/40 border border-border text-xs">
          <button
            type="button"
            onClick={() => insertFormula('$\\frac{a}{b}$')}
            className="px-2 py-1 rounded bg-card hover:bg-muted border border-border font-mono text-[11px]"
          >
            \frac{'{a}'}{'{b}'}
          </button>
          <button
            type="button"
            onClick={() => insertFormula('$\\sqrt{x}$')}
            className="px-2 py-1 rounded bg-card hover:bg-muted border border-border font-mono text-[11px]"
          >
            \sqrt{'{x}'}
          </button>
          <button
            type="button"
            onClick={() => insertFormula('$\\theta$')}
            className="px-2 py-1 rounded bg-card hover:bg-muted border border-border font-mono text-[11px]"
          >
            \theta
          </button>
          <button
            type="button"
            onClick={() => insertFormula('$\\rightarrow$')}
            className="px-2 py-1 rounded bg-card hover:bg-muted border border-border font-mono text-[11px]"
          >
            \rightarrow
          </button>
        </div>

        <form onSubmit={handlePostReply} className="space-y-3">
          <textarea
            rows={4}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your step-by-step mathematical explanation..."
            className="w-full p-4 rounded-xl border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed font-mono"
            required
          />

          {replyText && (
            <div className="p-3 rounded-xl bg-muted/30 border border-primary/20 space-y-1">
              <div className="text-[11px] font-bold text-primary flex items-center gap-1">
                <Eye className="w-3 h-3" /> Live Math Preview:
              </div>
              <div className="text-xs text-foreground">
                <MathRenderer math={replyText} />
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <Send className="w-4 h-4" /> Submit Solution
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
