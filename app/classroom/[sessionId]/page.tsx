'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAppStore, ClassroomMessage } from '@/lib/store';
import { CURRENT_STUDENT, CURRENT_TUTOR, SAMPLE_BOOKINGS } from '@/lib/mock-data';
import { Whiteboard } from '@/components/whiteboard';
import { MathRenderer } from '@/components/math-renderer';
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Hand,
  MessageSquare,
  BookOpen,
  Send,
  Sparkles,
  ArrowLeft,
  Clock,
  Share2,
  Users,
  Smile,
  ShieldCheck,
  Maximize2,
  Volume2,
} from 'lucide-react';

export default function ClassroomPage() {
  const params = useParams();
  const sessionId = (params?.sessionId as string) || 'session-live-101';
  const {
    currentRole,
    classroomMessages,
    addClassroomMessage,
    isHandRaised,
    toggleHandRaised,
    isMicMuted,
    isCamMuted,
    toggleMic,
    toggleCam,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'chat' | 'notes' | 'participants'>('chat');
  const [chatInput, setChatInput] = useState<string>('');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(3600); // 60 mins

  // Live timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const messages = classroomMessages[sessionId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    addClassroomMessage(sessionId, {
      senderId: currentRole === 'STUDENT' ? CURRENT_STUDENT.id : CURRENT_TUTOR.id,
      senderName: currentRole === 'STUDENT' ? CURRENT_STUDENT.name : CURRENT_TUTOR.name,
      senderRole: currentRole,
      text: chatInput,
      isMathFormula: chatInput.includes('$') || chatInput.includes('\\'),
    });

    setChatInput('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6.5rem)] bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Exit Classroom"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="font-bold text-slate-100 text-sm">
              Live Class: Ray Optics & Mirror Formula
            </span>
            <span className="px-2 py-0.5 rounded bg-primary/20 text-indigo-300 font-semibold text-[10px]">
              Class 10 Physics
            </span>
          </div>
        </div>

        {/* Center: Live Timer */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 font-mono text-xs text-amber-300">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatTimer(secondsRemaining)} remaining</span>
        </div>

        {/* Right: Mentor Info & Exit */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <img
              src={CURRENT_TUTOR.avatar}
              alt={CURRENT_TUTOR.name}
              className="w-6 h-6 rounded-full object-cover border border-amber-400"
            />
            <span className="text-slate-300 font-medium">{CURRENT_TUTOR.name} (Tutor)</span>
          </div>
          <Link
            href="/dashboard"
            className="px-3 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white font-semibold transition-colors"
          >
            Leave Session
          </Link>
        </div>
      </div>

      {/* Main Classroom Body */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* Left Column (8 or 9 cols): Video Feeds & Interactive Whiteboard */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col p-3 gap-3 overflow-y-auto bg-slate-900/50">
          {/* Top Row: Dual Video Feeds */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
            {/* Tutor Video Box */}
            <div className="relative col-span-1 sm:col-span-2 aspect-video rounded-xl bg-slate-800 border border-slate-700 overflow-hidden shadow-md flex items-center justify-center">
              <img
                src={CURRENT_TUTOR.avatar}
                alt={CURRENT_TUTOR.name}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white">
                <span className="font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> {CURRENT_TUTOR.name} (Speaker)
                </span>
                <span className="flex items-center gap-1 text-emerald-400 font-mono">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" /> Active
                </span>
              </div>
            </div>

            {/* Student Video Box */}
            <div className="relative col-span-1 sm:col-span-2 aspect-video rounded-xl bg-slate-800 border border-slate-700 overflow-hidden shadow-md flex items-center justify-center">
              {isCamMuted ? (
                <div className="flex flex-col items-center gap-1 text-slate-400">
                  <VideoOff className="w-6 h-6 text-slate-500" />
                  <span className="text-[11px]">{CURRENT_STUDENT.name} (Camera Off)</span>
                </div>
              ) : (
                <img
                  src={CURRENT_STUDENT.avatar}
                  alt={CURRENT_STUDENT.name}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white">
                <span className="font-semibold">{CURRENT_STUDENT.name} (You)</span>
                {isMicMuted && <MicOff className="w-3.5 h-3.5 text-rose-400" />}
              </div>
            </div>
          </div>

          {/* Whiteboard Workspace */}
          <div className="flex-1 flex flex-col min-h-[460px]">
            <Whiteboard className="flex-1" />
          </div>

          {/* Bottom Live Controls Bar */}
          <div className="flex items-center justify-center gap-3 p-2 rounded-2xl bg-slate-800/90 border border-slate-700 backdrop-blur shrink-0">
            <button
              onClick={toggleMic}
              className={`p-3 rounded-xl transition-all ${
                isMicMuted ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-slate-700 hover:bg-slate-600 text-white'
              }`}
              title={isMicMuted ? 'Unmute Microphone' : 'Mute Microphone'}
            >
              {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleCam}
              className={`p-3 rounded-xl transition-all ${
                isCamMuted ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-slate-700 hover:bg-slate-600 text-white'
              }`}
              title={isCamMuted ? 'Turn Camera On' : 'Turn Camera Off'}
            >
              {isCamMuted ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleHandRaised}
              className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-1.5 ${
                isHandRaised
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/30 animate-pulse'
                  : 'bg-slate-700 hover:bg-slate-600 text-white'
              }`}
            >
              <Hand className="w-4 h-4" />
              <span>{isHandRaised ? 'Hand Raised!' : 'Raise Hand'}</span>
            </button>
          </div>
        </div>

        {/* Right Column (4 or 3 cols): Sidebar Tabs (Chat / Notes / Formulas) */}
        <div className="lg:col-span-4 xl:col-span-3 flex flex-col border-l border-slate-800 bg-slate-950 overflow-hidden">
          {/* Tab Selector */}
          <div className="flex items-center border-b border-slate-800 bg-slate-900 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'chat'
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> Live Chat
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-3 text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'notes'
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Formula Sheet
            </button>
          </div>

          {/* Tab Content: Live Chat */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              {/* Messages Scroll Area */}
              <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                {messages.map((msg) => (
                  <div key={msg.id} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span
                        className={`font-semibold ${
                          msg.senderRole === 'TUTOR' ? 'text-amber-400' : 'text-indigo-400'
                        }`}
                      >
                        {msg.senderName} ({msg.senderRole})
                      </span>
                      <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                      <MathRenderer math={msg.text} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-900/60 space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>KaTeX enabled! Try typing $1/f = 1/v + 1/u$</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask doubt or type formula..."
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-primary hover:bg-primary/90 text-white transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tab Content: Shared Formulas & Notes */}
          {activeTab === 'notes' && (
            <div className="flex-1 p-4 space-y-4 overflow-y-auto text-xs">
              <div className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> Ray Optics Formula Cheatcard
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-semibold text-amber-300">Mirror Formula:</div>
                <div className="text-center font-mono py-1">
                  <MathRenderer math="\frac{1}{f} = \frac{1}{v} + \\frac{1}{u}" block={true} />
                </div>
                <div className="text-[10px] text-slate-400">
                  $f &lt; 0$ for Concave, $f &gt; 0$ for Convex.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-semibold text-indigo-300">Magnification:</div>
                <div className="text-center font-mono py-1">
                  <MathRenderer math="m = -\\frac{v}{u} = \\frac{h'}{h}" block={true} />
                </div>
                <div className="text-[10px] text-slate-400">
                  $m &lt; 0$ implies Real & Inverted image.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-semibold text-emerald-300">Snell’s Law of Refraction:</div>
                <div className="text-center font-mono py-1">
                  <MathRenderer math="n_1 \\sin i = n_2 \\sin r \\implies n_{21} = \\frac{\\sin i}{\\sin r}" block={true} />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-semibold text-purple-300">Lens Formula & Power:</div>
                <div className="text-center font-mono py-1">
                  <MathRenderer math="\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}, \\quad P = \\frac{1}{f \\text{ (m)}}" block={true} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
