// The API uses Vercel KV automatically when its credentials are configured.
// Local development intentionally falls back to a short-lived in-memory store.
type RecordValue = Record<string, unknown> & { id: string; createdAt: string };
const globalStore = globalThis as typeof globalThis & { jikoStore?: Record<string, RecordValue[]> };
const store = (globalStore.jikoStore ||= { orders: [], reservations: [], catering: [], newsletter: [] });

export async function save(kind: keyof typeof store, value: Record<string, unknown>) {
  const record: RecordValue = { ...value, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const { kv } = await import('@vercel/kv');
      await kv.lpush(`jiko:${kind}`, record);
      return record;
    } catch (error) {
      console.warn('Vercel KV unavailable; using local fallback.', error);
    }
  }
  store[kind].push(record);
  return record;
}
