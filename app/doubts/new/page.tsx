'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { SUBJECTS, CURRENT_STUDENT } from '@/lib/mock-data';
import { MathRenderer } from '@/components/math-renderer';
import {
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Image as ImageIcon,
  Send,
  Eye,
  CheckCircle2,
} from 'lucide-react';

export default function NewDoubtPage() {
  const router = useRouter();
  const { addDoubt, currentBoard, chapters } = useAppStore();

  const [subjectId, setSubjectId] = useState<string>(SUBJECTS[0].id);
  const [chapterId, setChapterId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');

  const activeChapters = chapters.filter((c) => c.subjectId === subjectId);
  const selectedSubject = SUBJECTS.find((s) => s.id === subjectId);
  const selectedChapter = chapters.find((c) => c.id === chapterId);

  // LaTeX shortcut buttons helper
  const insertFormula = (latexTemplate: string) => {
    setContent((prev) => prev + ' ' + latexTemplate + ' ');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addDoubt({
      studentId: CURRENT_STUDENT.id,
      studentName: CURRENT_STUDENT.name,
      studentAvatar: CURRENT_STUDENT.avatar,
      studentBoard: currentBoard,
      subjectId: subjectId,
      subjectName: selectedSubject?.name || 'Mathematics',
      chapterId: chapterId || undefined,
      chapterTitle: selectedChapter?.title || undefined,
      title: title,
      content: content,
      imageUrl: imageUrl || undefined,
      status: 'OPEN',
    });

    router.push('/doubts');
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

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
          Ask a 10th-Grade Doubt
        </h1>
        <p className="text-sm text-muted-foreground">
          Include the textbook question, your attempt, and any mathematical formulas. Mentors reply within 15 minutes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm space-y-6">
          {/* Subject & Chapter Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground">Subject *</label>
              <select
                value={subjectId}
                onChange={(e) => {
                  setSubjectId(e.target.value);
                  setChapterId('');
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground">Chapter (Optional)</label>
              <select
                value={chapterId}
                onChange={(e) => setChapterId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select Chapter</option>
                {activeChapters.map((c) => (
                  <option key={c.id} value={c.id}>
                    Ch {c.chapterNumber}: {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Question Title */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground">
              Question Title / Summary * (Supports LaTeX e.g. $\sin^2\theta + \cos^2\theta = 1$)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., How to calculate the focal length of a concave mirror when u = -20cm and v = -30cm?"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary font-medium"
              required
            />
          </div>

          {/* LaTeX Math Formula Helper Toolbar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground">
                Detailed Problem & Attempt *
              </label>
              <span className="text-[11px] text-primary flex items-center gap-1 font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> Formula Insertion Shortcuts:
              </span>
            </div>

            {/* Quick LaTeX Buttons */}
            <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-muted/40 border border-border text-xs">
              <button
                type="button"
                onClick={() => insertFormula('$\\frac{a}{b}$')}
                className="px-2 py-1 rounded bg-card hover:bg-muted border border-border font-mono text-[11px]"
              >
                Fraction \frac{'{a}'}{'{b}'}
              </button>
              <button
                type="button"
                onClick={() => insertFormula('$\\sqrt{x}$')}
                className="px-2 py-1 rounded bg-card hover:bg-muted border border-border font-mono text-[11px]"
              >
                Root \sqrt{'{x}'}
              </button>
              <button
                type="button"
                onClick={() => insertFormula('$x^2$')}
                className="px-2 py-1 rounded bg-card hover:bg-muted border border-border font-mono text-[11px]"
              >
                Exponent x^2
              </button>
              <button
                type="button"
                onClick={() => insertFormula('$\\theta$')}
                className="px-2 py-1 rounded bg-card hover:bg-muted border border-border font-mono text-[11px]"
              >
                Angle \theta
              </button>
              <button
                type="button"
                onClick={() => insertFormula('$\\pm$')}
                className="px-2 py-1 rounded bg-card hover:bg-muted border border-border font-mono text-[11px]"
              >
                \pm
              </button>
              <button
                type="button"
                onClick={() => insertFormula('$\\rightarrow$')}
                className="px-2 py-1 rounded bg-card hover:bg-muted border border-border font-mono text-[11px]"
              >
                Arrow \rightarrow
              </button>
              <button
                type="button"
                onClick={() => insertFormula('$\\text{H}_2\\text{O}$')}
                className="px-2 py-1 rounded bg-card hover:bg-muted border border-border font-mono text-[11px]"
              >
                Chemical Subscript H_2O
              </button>
            </div>

            <textarea
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your step-by-step attempt and where you are getting stuck..."
              className="w-full p-4 rounded-xl border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed font-mono"
              required
            />
          </div>

          {/* Live KaTeX Render Preview Box */}
          {(title || content) && (
            <div className="p-4 rounded-xl bg-muted/30 border border-primary/20 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                <Eye className="w-3.5 h-3.5" /> Live Math Formula Preview:
              </div>
              {title && (
                <div className="font-bold text-sm text-foreground">
                  <MathRenderer math={title} />
                </div>
              )}
              {content && (
                <div className="text-xs text-muted-foreground whitespace-pre-wrap">
                  <MathRenderer math={content} />
                </div>
              )}
            </div>
          )}

          {/* Optional Image Attachment */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-muted-foreground" />
              Textbook Problem Photo URL (Optional)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/textbook-diagram.jpg"
              className="w-full px-4 py-2 rounded-xl border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/doubts"
            className="px-4 py-2.5 rounded-xl border border-border hover:bg-muted text-xs font-semibold transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs flex items-center gap-2 shadow-md shadow-primary/25 transition-all"
          >
            <Send className="w-4 h-4" /> Post Doubt to Mentors
          </button>
        </div>
      </form>
    </div>
  );
}
