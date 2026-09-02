import { NextRequest, NextResponse } from 'next/server';
import { solveDoubtWithGemini } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, imageDataUrl, subject, chapter } = body;

    if (!query && !imageDataUrl) {
      return NextResponse.json(
        { error: 'Please provide either a question prompt or an image.' },
        { status: 400 }
      );
    }

    const result = await solveDoubtWithGemini(
      query || 'Solve this NCERT Class 10 problem step by step.',
      imageDataUrl,
      subject || chapter
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error in solve-doubt API:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to solve doubt with AI.' },
      { status: 500 }
    );
  }
}
