'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  Pencil,
  Eraser,
  Square,
  Circle,
  Slash,
  Triangle,
  RotateCcw,
  Trash2,
  Download,
  Grid,
  Type,
  Palette,
  Sparkles,
} from 'lucide-react';

type Tool = 'pen' | 'highlighter' | 'eraser' | 'line' | 'rect' | 'circle' | 'triangle' | 'text';

interface WhiteboardProps {
  className?: string;
  onSaveSnapshot?: (dataUrl: string) => void;
}

export function Whiteboard({ className = '', onSaveSnapshot }: WhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tool, setTool] = useState<Tool>('pen');
  const [color, setColor] = useState<string>('#4f46e5'); // Indigo default
  const [lineWidth, setLineWidth] = useState<number>(3);
  const [gridMode, setGridMode] = useState<'none' | 'grid' | 'dots'>('grid');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [history, setHistory] = useState<ImageData[]>([]);
  const [mathText, setMathText] = useState<string>('sin²θ + cos²θ = 1');

  const colors = [
    { label: 'Indigo', value: '#4f46e5' },
    { label: 'Emerald', value: '#10b981' },
    { label: 'Amber', value: '#f59e0b' },
    { label: 'Rose', value: '#ef4444' },
    { label: 'Sky', value: '#0284c7' },
    { label: 'Dark', value: '#1e293b' },
    { label: 'White', value: '#ffffff' },
  ];

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions based on container
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      drawBackground(ctx, rect.width, rect.height);
      saveState();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [gridMode]);

  const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    if (gridMode === 'grid') {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 0.75;
      const step = 25;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    } else if (gridMode === 'dots') {
      ctx.fillStyle = '#cbd5e1';
      const step = 25;
      for (let x = step; x < width; x += step) {
        for (let y = step; y < height; y += step) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-15), imageData]);
  };

  const undo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHist = [...history];
    newHist.pop(); // Remove current
    const previousState = newHist[newHist.length - 1];
    if (previousState) {
      ctx.putImageData(previousState, 0, 0);
      setHistory(newHist);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    drawBackground(ctx, rect.width, rect.height);
    saveState();
  };

  const downloadSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    if (onSaveSnapshot) {
      onSaveSnapshot(dataUrl);
    }
    const link = document.createElement('a');
    link.download = `eduten-whiteboard-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e);
    setIsDrawing(true);
    setStartPos(coords);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (tool === 'text') {
      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = color;
      ctx.fillText(mathText, coords.x, coords.y);
      saveState();
      setIsDrawing(false);
      return;
    }

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPos = getCanvasCoords(e);

    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = tool === 'eraser' ? lineWidth * 4 : tool === 'highlighter' ? lineWidth * 3 : lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = tool === 'highlighter' ? 0.35 : 1.0;

    if (tool === 'pen' || tool === 'highlighter' || tool === 'eraser') {
      ctx.lineTo(currentPos.x, currentPos.y);
      ctx.stroke();
    }
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPos = getCanvasCoords(e);
    ctx.globalAlpha = 1.0;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    if (tool === 'line') {
      ctx.beginPath();
      ctx.moveTo(startPos.x, startPos.y);
      ctx.lineTo(currentPos.x, currentPos.y);
      ctx.stroke();
    } else if (tool === 'rect') {
      const width = currentPos.x - startPos.x;
      const height = currentPos.y - startPos.y;
      ctx.strokeRect(startPos.x, startPos.y, width, height);
    } else if (tool === 'circle') {
      const radius = Math.hypot(currentPos.x - startPos.x, currentPos.y - startPos.y);
      ctx.beginPath();
      ctx.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (tool === 'triangle') {
      ctx.beginPath();
      ctx.moveTo(startPos.x, currentPos.y);
      ctx.lineTo(currentPos.x, currentPos.y);
      ctx.lineTo(startPos.x, startPos.y);
      ctx.closePath();
      ctx.stroke();
    }

    setIsDrawing(false);
    saveState();
  };

  // Pre-fill STEM templates
  const loadTemplate = (type: 'cartesian' | 'rayOptics' | 'triangle') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#334155';
    ctx.font = '12px sans-serif';

    if (type === 'cartesian') {
      // X and Y Axes
      ctx.beginPath();
      ctx.moveTo(w / 2, 20);
      ctx.lineTo(w / 2, h - 20);
      ctx.moveTo(20, h / 2);
      ctx.lineTo(w - 20, h / 2);
      ctx.stroke();
      ctx.fillText('+Y', w / 2 + 8, 30);
      ctx.fillText('-Y', w / 2 + 8, h - 25);
      ctx.fillText('+X', w - 30, h / 2 - 8);
      ctx.fillText('-X', 25, h / 2 - 8);
      ctx.fillText('Origin (0,0)', w / 2 + 8, h / 2 + 18);
    } else if (type === 'rayOptics') {
      // Principal Axis & Concave Mirror
      ctx.beginPath();
      ctx.moveTo(50, h / 2);
      ctx.lineTo(w - 50, h / 2);
      ctx.stroke();
      // Curved mirror
      ctx.beginPath();
      ctx.arc(w - 120, h / 2, 100, Math.PI * 0.7, Math.PI * 1.3);
      ctx.stroke();
      ctx.fillText('Principal Axis', 60, h / 2 - 10);
      ctx.fillText('Pole (P)', w - 110, h / 2 + 20);
      ctx.fillText('Focus (F)', w - 210, h / 2 + 20);
      ctx.fillText('Center of Curvature (C)', w - 310, h / 2 + 20);
      // Mark points
      ctx.beginPath();
      ctx.arc(w - 210, h / 2, 3, 0, Math.PI * 2);
      ctx.arc(w - 310, h / 2, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'triangle') {
      // Geometric Right-angled triangle
      ctx.beginPath();
      ctx.moveTo(100, h - 80);
      ctx.lineTo(350, h - 80);
      ctx.lineTo(100, 100);
      ctx.closePath();
      ctx.stroke();
      ctx.strokeRect(100, h - 105, 25, 25);
      ctx.fillText('A', 85, 100);
      ctx.fillText('B', 85, h - 75);
      ctx.fillText('C', 360, h - 75);
      ctx.fillText('Hypotenuse (AC)', 230, (h - 80 + 100) / 2);
      ctx.fillText('Base (BC)', 200, h - 60);
      ctx.fillText('Perpendicular (AB)', 20, (h - 80 + 100) / 2);
    }
    saveState();
  };

  return (
    <div className={`flex flex-col rounded-2xl border border-border bg-card shadow-lg overflow-hidden ${className}`}>
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 border-b border-border bg-muted/40">
        {/* Drawing Tools */}
        <div className="flex items-center gap-1 bg-background p-1 rounded-xl border border-border">
          <button
            onClick={() => setTool('pen')}
            className={`p-2 rounded-lg transition-colors ${
              tool === 'pen' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            title="Pen Tool"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool('highlighter')}
            className={`p-2 rounded-lg transition-colors ${
              tool === 'highlighter' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            title="Highlighter"
          >
            <Palette className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`p-2 rounded-lg transition-colors ${
              tool === 'eraser' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            title="Eraser"
          >
            <Eraser className="w-4 h-4" />
          </button>

          <div className="h-5 w-[1px] bg-border mx-1" />

          {/* Geometric Shapes */}
          <button
            onClick={() => setTool('line')}
            className={`p-2 rounded-lg transition-colors ${
              tool === 'line' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            title="Straight Line / Ray"
          >
            <Slash className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool('rect')}
            className={`p-2 rounded-lg transition-colors ${
              tool === 'rect' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            title="Rectangle / Resistor"
          >
            <Square className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool('circle')}
            className={`p-2 rounded-lg transition-colors ${
              tool === 'circle' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            title="Circle / Lens"
          >
            <Circle className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool('triangle')}
            className={`p-2 rounded-lg transition-colors ${
              tool === 'triangle' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            title="Right Triangle / Prism"
          >
            <Triangle className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool('text')}
            className={`p-2 rounded-lg transition-colors ${
              tool === 'text' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            title="Insert Formula / Text"
          >
            <Type className="w-4 h-4" />
          </button>
        </div>

        {/* Color Palette */}
        <div className="flex items-center gap-1.5 bg-background p-1 rounded-xl border border-border">
          {colors.map((c) => (
            <button
              key={c.value}
              onClick={() => setColor(c.value)}
              className={`w-6 h-6 rounded-full border border-border/80 transition-transform ${
                color === c.value ? 'scale-125 ring-2 ring-primary ring-offset-1' : 'hover:scale-110'
              }`}
              style={{ backgroundColor: c.value }}
              title={c.label}
            />
          ))}
        </div>

        {/* Stroke Width */}
        <div className="flex items-center gap-1 bg-background px-2 py-1 rounded-xl border border-border">
          <span className="text-[11px] text-muted-foreground font-medium mr-1">Stroke:</span>
          {[2, 4, 8].map((w) => (
            <button
              key={w}
              onClick={() => setLineWidth(w)}
              className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-semibold ${
                lineWidth === w ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {w}
            </button>
          ))}
        </div>

        {/* STEM Templates & Canvas Controls */}
        <div className="flex items-center gap-1">
          {/* Grid Selector */}
          <button
            onClick={() => setGridMode(gridMode === 'grid' ? 'dots' : gridMode === 'dots' ? 'none' : 'grid')}
            className="p-2 rounded-lg border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title={`Toggle Grid (Current: ${gridMode})`}
          >
            <Grid className="w-4 h-4" />
          </button>

          <button
            onClick={undo}
            disabled={history.length <= 1}
            className="p-2 rounded-lg border border-border bg-background hover:bg-muted disabled:opacity-40 text-muted-foreground hover:text-foreground transition-colors"
            title="Undo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={clearCanvas}
            className="p-2 rounded-lg border border-border bg-background hover:bg-rose-500/10 text-muted-foreground hover:text-rose-600 transition-colors"
            title="Clear Board"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={downloadSnapshot}
            className="p-2 rounded-lg border border-border bg-background hover:bg-primary/10 text-primary transition-colors flex items-center gap-1 text-xs font-semibold"
            title="Download PNG Snapshot"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </div>

      {/* Math Formula / Quick STEM Template Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 bg-muted/20 border-b border-border text-xs">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground flex items-center gap-1 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> STEM Templates:
          </span>
          <button
            onClick={() => loadTemplate('rayOptics')}
            className="px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-medium"
          >
            Concave Mirror Optics
          </button>
          <button
            onClick={() => loadTemplate('cartesian')}
            className="px-2 py-0.5 rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-medium"
          >
            XY Coordinate Grid
          </button>
          <button
            onClick={() => loadTemplate('triangle')}
            className="px-2 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium"
          >
            Right Triangle (Trig)
          </button>
        </div>

        {tool === 'text' && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Text:</span>
            <input
              type="text"
              value={mathText}
              onChange={(e) => setMathText(e.target.value)}
              placeholder="e.g., a² + b² = c²"
              className="px-2 py-0.5 rounded border border-border bg-background text-foreground text-xs w-48"
            />
          </div>
        )}
      </div>

      {/* Canvas Area */}
      <div className="relative flex-1 min-h-[460px] bg-white cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="absolute inset-0 w-full h-full touch-none"
        />
      </div>
    </div>
  );
}
