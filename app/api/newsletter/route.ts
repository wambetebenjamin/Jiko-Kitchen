import { NextResponse } from 'next/server';
import { save } from '@/lib/store';
export async function POST(request: Request) { const body = await request.json(); if (!body.email?.includes('@')) return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 }); const subscriber = await save('newsletter', body); return NextResponse.json({ ok: true, subscriberId: subscriber.id }, { status: 201 }); }
