# Jiko Kitchen

A warm, mobile-first ordering experience for a Nairobi East African restaurant. Built from the provided Canva reference’s editorial, service-led rhythm and reimagined for Jiko Kitchen’s food-first brand.

## Included

- Full Next.js 14 App Router + TypeScript implementation
- Cinematic Pexels cooking loop with an Unsplash poster and royalty-free food/interior photography
- Responsive menu filtering, 3D food cards, cart drawer, delivery/pickup totals, and checkout
- Prefilled WhatsApp order and reservation handoffs to **+254 112 272 061**
- Reservation, catering, newsletter, menu, and order API routes
- Vercel KV persistence when `KV_REST_API_URL` and `KV_REST_API_TOKEN` are configured, with a local in-memory fallback
- Restaurant JSON-LD, Open Graph metadata, sitemap, robots, web manifest, and homescreen-ready app icon

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm start
```

Deploy to Vercel and add the Vercel KV / Upstash Redis credentials to enable persisted submissions. The order and reservation API routes return a prefilled click-to-chat WhatsApp URL so the full booking/order summary reaches the restaurant without requiring a third-party WhatsApp API subscription.

## Notes

All photography is loaded from Unsplash and the hero video is loaded from Pexels. Replace external URLs with your licensed brand photography when it becomes available.
