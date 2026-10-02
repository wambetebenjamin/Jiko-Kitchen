import { NextResponse } from 'next/server';
import { save } from '@/lib/store';
export async function POST(request: Request) { const body = await request.json(); if (!body.name || !body.phone) return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 }); const enquiry = await save('catering', body); return NextResponse.json({ ok: true, enquiryId: enquiry.id }, { status: 201 }); }
