'use client';

import React, { useState } from 'react';
import { MathRenderer } from './math-renderer';
import { AiDoubtMessage, AiDoubtResponse } from '@/lib/types';
import {
  Bot,
  Sparkles,
  Camera,
  Upload,
  Send,
  HelpCircle,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  Lightbulb,
  MessageSquare,
  ArrowRight,
  FileText,
  X,
} from 'lucide-react';

interface AiDoubtSolverCardProps {
  initialSubject?: string;
  initialQuery?: string;
  className?: string;
}

export function AiDoubtSolverCard({
  initialSubject = 'Mathematics',
  initialQuery = '',
  className = '',
}: AiDoubtSolverCardProps) {
  const [query, setQuery] = useState<string>(initialQuery);
  const [subject, setSubject] = useState<string>(initialSubject);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<AiDoubtMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'text' | 'camera' | 'upload'>('text');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const insertFormula = (code: string) => {
    setQuery((prev) => prev + ' ' + code + ' ');
  };

  const handleSolve = async (promptText?: string) => {
    const textToSend = promptText || query;
    if (!textToSend.trim() && !imagePreview) return;

    const userMsg: AiDoubtMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      imageUrl: imagePreview || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setQuery('');

    try {
      const res = await fetch('/api/ai/solve-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          imageDataUrl: imagePreview || undefined,
          subject,
        }),
      });

      const data = await res.json();
      if (data?.success && data?.data) {
        const aiMsg: AiDoubtMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          text: 'Here is the step-by-step CBSE Board solution:',
          structured: data.data,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setImagePreview(null);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSolve(prompt);
  };

  return (
    <div className={`rounded-3xl border border-border bg-card shadow-lg overflow-hidden flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-900 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold">Google Gemini AI Board Doubt Solver</h2>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-extrabold border border-purple-400/30">
                NCERT Class 10 Aligned
              </span>
            </div>
            <p className="text-xs text-indigo-200">
              Instant step-by-step mathematical working, reaction mechanisms, and common pitfall warnings.
            </p>
          </div>
        </div>

        {/* Subject dropdown */}
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="bg-black/30 text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="Mathematics">Mathematics (Standard & Basic)</option>
          <option value="Science: Physics">Science: Physics</option>
          <option value="Science: Chemistry">Science: Chemistry</option>
          <option value="Science: Biology">Science: Biology</option>
          <option value="Social Science">Social Science</option>
          <option value="English">English</option>
        </select>
      </div>

      {/* Messages / Solutions Display */}
      <div className="flex-1 p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[580px] bg-muted/20">
        {messages.length === 0 ? (
          <div className="p-8 text-center space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-foreground">
              Ask Any 10th-Grade Math, Science, or SST Doubt
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Type your problem below or snap a photo of your textbook. Gemini AI will break it down using official CBSE step-marking rubrics.
            </p>

            {/* Suggested Starter Doubts */}
            <div className="space-y-2 pt-2 text-left">
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Try asking:
              </div>
              <button
                onClick={() =>
                  handleQuickPrompt(
                    'Solve 2x^2 - 5x + 3 = 0 using the quadratic formula and state the discriminant value.'
                  )
                }
                className="w-full p-2.5 rounded-xl bg-card hover:bg-muted border border-border text-xs text-foreground text-left transition-colors flex items-center justify-between"
              >
                <span>Find roots of $2x^2 - 5x + 3 = 0$ using quadratic formula</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0 ml-2" />
              </button>
              <button
                onClick={() =>
                  handleQuickPrompt(
                    'A concave mirror has a focal length of 15cm. Find image position and magnification when object is at 25cm.'
                  )
                }
                className="w-full p-2.5 rounded-xl bg-card hover:bg-muted border border-border text-xs text-foreground text-left transition-colors flex items-center justify-between"
              >
                <span>Concave mirror numerical (<MathRenderer math="f = -15\text{cm}, u = -25\text{cm}" />)</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0 ml-2" />
              </button>
              <button
                onClick={() =>
                  handleQuickPrompt(
                    'Balance the chemical equation: Fe + H2O -> Fe3O4 + H2 and state the reaction type.'
                  )
                }
                className="w-full p-2.5 rounded-xl bg-card hover:bg-muted border border-border text-xs text-foreground text-left transition-colors flex items-center justify-between"
              >
                <span>Balance <MathRenderer math="\text{Fe} + \text{H}_2\text{O} \rightarrow \text{Fe}_3\text{O}_4 + \text{H}_2" /></span>
                <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0 ml-2" />
              </button>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`space-y-3 ${msg.role === 'user' ? 'flex flex-col items-end' : ''}`}
            >
              {msg.role === 'user' ? (
                <div className="max-w-xl p-4 rounded-2xl bg-primary text-primary-foreground text-xs shadow-sm space-y-2">
                  <div className="font-medium whitespace-pre-wrap">
                    <MathRenderer math={msg.text} />
                  </div>
                  {msg.imageUrl && (
                    <img
                      src={msg.imageUrl}
                      alt="Uploaded Doubt"
                      className="max-h-48 rounded-xl object-contain border border-white/20 bg-black/20"
                    />
                  )}
                  <div className="text-[10px] text-white/70 text-right">{msg.timestamp}</div>
                </div>
              ) : (
                <div className="w-full space-y-4">
                  {msg.structured ? (
                    <div className="rounded-3xl border border-indigo-200 dark:border-indigo-900 bg-card p-6 shadow-md space-y-5">
                      {/* Section 1: Concept & NCERT Tag */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border">
                        <div className="space-y-0.5">
                          <div className="text-[10px] font-bold text-primary uppercase tracking-wider">
                            1. Concept Involved
                          </div>
                          <h3 className="font-bold text-sm text-foreground">
                            <MathRenderer math={msg.structured.concept} />
                          </h3>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          {msg.structured.ncertReference}
                        </span>
                      </div>

                      {/* Section 2: Step-by-Step Mathematical/Chemical Working */}
                      <div className="space-y-2">
                        <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> 2. Step-by-Step Board Solution (with Marking Steps)
                        </div>
                        <div className="p-4 rounded-2xl bg-muted/40 border border-border text-xs text-foreground leading-relaxed font-mono whitespace-pre-wrap">
                          <MathRenderer math={msg.structured.stepsWorking} />
                        </div>
                      </div>

                      {/* Section 3: Common Board Exam Pitfalls */}
                      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5">
                        <div className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" /> 3. Common Board Exam Pitfalls & Mark Deductions:
                        </div>
                        <div className="text-amber-900 dark:text-amber-200/90 whitespace-pre-wrap leading-relaxed">
                          <MathRenderer math={msg.structured.commonPitfalls} />
                        </div>
                      </div>

                      {/* Section 4: Related CBSE Past-Year Question */}
                      <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-xs space-y-1">
                        <div className="font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> 4. Related CBSE Past-Year Question (PYQ):
                        </div>
                        <div className="text-foreground font-medium">
                          <MathRenderer math={msg.structured.relatedPyq} />
                        </div>
                      </div>

                      {/* Quick Follow-up Buttons */}
                      <div className="pt-2 border-t border-border flex flex-wrap items-center gap-2">
                        <span className="text-[11px] text-muted-foreground font-medium">Ask Follow-up:</span>
                        <button
                          onClick={() => handleQuickPrompt('Can you explain Step 2 in simpler terms?')}
                          className="px-2.5 py-1 rounded-lg bg-muted hover:bg-muted/80 text-[11px] font-semibold text-foreground transition-colors"
                        >
                          Explain Step 2 more simply
                        </button>
                        <button
                          onClick={() => handleQuickPrompt('Give me another similar board practice question.')}
                          className="px-2.5 py-1 rounded-lg bg-muted hover:bg-muted/80 text-[11px] font-semibold text-foreground transition-colors"
                        >
                          Give me another practice question
                        </button>
                        <button
                          onClick={() => handleQuickPrompt('What is the alternative method to solve this?')}
                          className="px-2.5 py-1 rounded-lg bg-muted hover:bg-muted/80 text-[11px] font-semibold text-foreground transition-colors"
                        >
                          Alternative method
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-card border border-border text-xs text-foreground">
                      <MathRenderer math={msg.text} />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="p-6 rounded-3xl border border-primary/30 bg-primary/5 text-xs flex items-center gap-3 animate-pulse">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="font-semibold text-primary">
              Gemini AI is analyzing your textbook problem and generating step-by-step CBSE marking rubrics...
            </span>
          </div>
        )}
      </div>

      {/* Input / Photo Attachment Toolbar */}
      <div className="p-4 sm:p-6 border-t border-border bg-card space-y-3">
        {/* Math Formula Helper Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] text-muted-foreground font-medium mr-1">Formula Stamps:</span>
          <button
            type="button"
            onClick={() => insertFormula('$\\frac{a}{b}$')}
            className="px-2 py-0.5 rounded bg-muted hover:bg-muted/80 border text-[11px] font-mono"
          >
            \frac{'{a}'}{'{b}'}
          </button>
          <button
            type="button"
            onClick={() => insertFormula('$\\sqrt{x}$')}
            className="px-2 py-0.5 rounded bg-muted hover:bg-muted/80 border text-[11px] font-mono"
          >
            \sqrt{'{x}'}
          </button>
          <button
            type="button"
            onClick={() => insertFormula('$x^2$')}
            className="px-2 py-0.5 rounded bg-muted hover:bg-muted/80 border text-[11px] font-mono"
          >
            x^2
          </button>
          <button
            type="button"
            onClick={() => insertFormula('$\\rightarrow$')}
            className="px-2 py-0.5 rounded bg-muted hover:bg-muted/80 border text-[11px] font-mono"
          >
            \rightarrow
          </button>
          <button
            type="button"
            onClick={() => insertFormula('$\\theta$')}
            className="px-2 py-0.5 rounded bg-muted hover:bg-muted/80 border text-[11px] font-mono"
          >
            \theta
          </button>
        </div>

        {/* Image Attachment Preview */}
        {imagePreview && (
          <div className="relative inline-block border border-border rounded-xl p-1 bg-muted/40">
            <img src={imagePreview} alt="Attached Problem" className="h-20 w-auto rounded-lg object-contain" />
            <button
              onClick={() => setImagePreview(null)}
              className="absolute -top-2 -right-2 p-1 rounded-full bg-rose-500 text-white shadow"
              title="Remove Image"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Input Bar */}
        <div className="flex items-center gap-2">
          {/* Photo upload */}
          <label className="p-2.5 rounded-xl border border-border hover:bg-muted cursor-pointer text-muted-foreground hover:text-foreground transition-colors" title="Upload Textbook Photo">
            <Camera className="w-4 h-4" />
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
            placeholder="Type your question or paste math formula (e.g. Find roots of 2x² - 7x + 3 = 0)..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary font-medium"
          />

          <button
            onClick={() => handleSolve()}
            disabled={isLoading || (!query.trim() && !imagePreview)}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs flex items-center gap-1.5 shadow-md shadow-primary/20 disabled:opacity-40 transition-all"
          >
            <Sparkles className="w-4 h-4" /> Solve with AI
          </button>
        </div>
      </div>
    </div>
  );
}
