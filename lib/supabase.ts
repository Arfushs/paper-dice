import { createClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client.
 *
 * Only the browser-safe key belongs here — it ships to the client by design.
 * The secret (formerly service_role) key must never appear in this repo.
 *
 * Supabase renamed its keys: `sb_publishable_…` replaces the older `anon` JWT.
 * Either works with createClient, so accept both env names.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publicKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True once .env.local is filled in; lets the UI explain itself before setup. */
export const isSupabaseConfigured = Boolean(url && publicKey);

export const supabase = isSupabaseConfigured
  ? createClient(url!, publicKey!, {
      realtime: { params: { eventsPerSecond: 20 } },
    })
  : null;

/** Narrowing helper so callers don't have to null-check everywhere. */
export function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local",
    );
  }
  return supabase;
}
