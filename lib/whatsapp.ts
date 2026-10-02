const restaurantPhone = '254112272061';

export function whatsappUrl(message: string) {
  return `https://wa.me/${restaurantPhone}?text=${encodeURIComponent(message)}`;
}

export function orderWhatsappMessage(order: Record<string, unknown>) {
  const items = Array.isArray(order.items) ? order.items as Array<Record<string, unknown>> : [];
  const lines = items.map((item) => `• ${item.quantity}× ${item.name} — KES ${Number(item.price || 0) * Number(item.quantity || 0)}`).join('\n');
  return [
    '🍽️ *NEW JIKO KITCHEN ORDER*',
    `Customer: ${order.name || '—'}`,
    `Phone: ${order.phone || '—'}`,
    `Type: ${order.mode || 'Delivery'}`,
    `Address / pickup: ${order.address || '—'}`,
    `M-Pesa: ${order.mpesa || '—'}`,
    '',
    '*Order*', lines || '—', '',
    `Subtotal: KES ${order.subtotal || 0}`,
    `Delivery: KES ${order.deliveryFee || 0}`,
    `*Total: KES ${order.total || 0}*`,
    order.notes ? `Notes: ${order.notes}` : '',
  ].filter(Boolean).join('\n');
}

export function reservationWhatsappMessage(reservation: Record<string, unknown>) {
  return [
    '🪑 *NEW JIKO TABLE REQUEST*',
    `Guest: ${reservation.name || '—'}`,
    `Phone: ${reservation.phone || '—'}`,
    `Date: ${reservation.date || '—'}`,
    `Time: ${reservation.time || '—'}`,
    `Guests: ${reservation.guests || '—'}`,
    reservation.requests ? `Requests: ${reservation.requests}` : '',
  ].filter(Boolean).join('\n');
}
