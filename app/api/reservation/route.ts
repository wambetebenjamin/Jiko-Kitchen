import { NextResponse } from 'next/server';
import { save } from '@/lib/store';
import { reservationWhatsappMessage, whatsappUrl } from '@/lib/whatsapp';

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.name || !body.phone || !body.date || !body.time) {
    return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 400 });
  }
  const reservation = await save('reservations', body);
  // This link is a dependable no-credentials fallback. It can be replaced by a
  // WhatsApp Business API call in the deployed environment without changing UI.
  return NextResponse.json({ ok: true, reservationId: reservation.id, whatsapp: whatsappUrl(reservationWhatsappMessage(body)), message: 'Reservation request received.' }, { status: 201 });
}
