import { NextResponse } from 'next/server';
import { save } from '@/lib/store';
import { orderWhatsappMessage, whatsappUrl } from '@/lib/whatsapp';

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.name || !body.phone || !Array.isArray(body.items) || !body.items.length) {
    return NextResponse.json({ error: 'Please provide customer details and items.' }, { status: 400 });
  }
  const order = await save('orders', body);
  // Returning the pre-filled click-to-chat URL lets the customer hand the exact
  // order breakdown to the restaurant even without a paid WhatsApp API account.
  return NextResponse.json({ ok: true, orderId: order.id, whatsapp: whatsappUrl(orderWhatsappMessage(body)) }, { status: 201 });
}
