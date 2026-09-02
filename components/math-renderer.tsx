'use client';

import React, { useEffect, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  math?: string;
  children?: string;
  block?: boolean;
  className?: string;
}

export function MathRenderer({ math, children, block = false, className = '' }: MathRendererProps) {
  const content = math || children || '';
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    try {
      // If content has inline $...$ or block $$...$$ delimiters, parse mixed content
      if (content.includes('$')) {
        // Replace $$block$$ first
        let parsed = content.replace(/\$\$([\s\S]+?)\$\$/g, (_, formula) => {
          try {
            return katex.renderToString(formula.trim(), {
              displayMode: true,
              throwOnError: false,
            });
          } catch {
            return formula;
          }
        });

        // Replace $inline$
        parsed = parsed.replace(/\$(.+?)\$/g, (_, formula) => {
          try {
            return katex.renderToString(formula.trim(), {
              displayMode: false,
              throwOnError: false,
            });
          } catch {
            return formula;
          }
        });

        setHtml(parsed);
      } else {
        // Direct LaTeX string
        const rendered = katex.renderToString(content, {
          displayMode: block,
          throwOnError: false,
        });
        setHtml(rendered);
      }
    } catch {
      setHtml(content);
    }
  }, [content, block]);

  if (!html) {
    return <span className={className}>{content}</span>;
  }

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function FormulaCard({
  title,
  latex,
  description,
  chapter,
}: {
  title: string;
  latex: string;
  description?: string;
  chapter?: string;
}) {
  return (
    <div className="p-4 rounded-xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h4 className="font-semibold text-sm text-foreground">{title}</h4>
        {chapter && (
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
            {chapter}
          </span>
        )}
      </div>
      <div className="my-3 p-3 rounded-lg bg-muted/50 overflow-x-auto text-center font-mono">
        <MathRenderer math={latex} block={true} />
      </div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </div>
  );
}
