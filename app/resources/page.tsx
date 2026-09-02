'use client';

import React, { useState } from 'react';
import { SAMPLE_RESOURCES, SUBJECTS } from '@/lib/mock-data';
import { ResourceType } from '@/lib/types';
import {
  FolderDown,
  FileText,
  BookOpen,
  Sparkles,
  Download,
  CheckCircle2,
  Filter,
  Search,
} from 'lucide-react';

export default function ResourcesPage() {
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const filteredResources = SAMPLE_RESOURCES.filter((res) => {
    const matchesType = selectedType === 'ALL' || res.resourceType === selectedType;
    const matchesSubject = selectedSubject === 'ALL' || res.subjectId === selectedSubject;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subjectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSubject && matchesSearch;
  });

  const handleDownload = (id: string, title: string) => {
    setDownloadedId(id);
    // Simulate instant download trigger
    setTimeout(() => {
      setDownloadedId(null);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> High-Score Revision Vault
          </div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
            10th-Grade Study Notes, Formula Sheets & PYQs
          </h1>
          <p className="text-sm text-muted-foreground">
            Download verified revision handbooks, 10-year solved CBSE & ICSE board papers, and formula cards.
          </p>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Search */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, formulas, PYQs..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Resource Type Filter */}
        <div className="md:col-span-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="ALL">All Resource Types</option>
            <option value="FORMULA_SHEET">⚡ Formula Cheatcards</option>
            <option value="NOTES">📖 Chapter Revision Notes</option>
            <option value="PYQ">📑 Past Year Solved Papers (PYQs)</option>
            <option value="WORKSHEET">✍️ Practice Worksheets</option>
          </select>
        </div>

        {/* Subject Filter */}
        <div className="md:col-span-3">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="ALL">All Subjects</option>
            {SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => {
          const isDownloaded = downloadedId === res.id;

          return (
            <div
              key={res.id}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                    {res.subjectName}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground uppercase">
                    {res.resourceType.replace('_', ' ')}
                  </span>
                </div>

                <h2 className="font-bold text-sm text-foreground leading-snug">{res.title}</h2>

                <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                  <span>📄 {res.fileFormat}</span>
                  <span>•</span>
                  <span>{res.fileSize}</span>
                  <span>•</span>
                  <span>📥 {res.downloads.toLocaleString()} Downloads</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  {res.board} Class 10
                </span>

                <button
                  onClick={() => handleDownload(res.id, res.title)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isDownloaded
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm'
                  }`}
                >
                  {isDownloaded ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Downloaded!
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" /> Download PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
