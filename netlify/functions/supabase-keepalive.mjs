// Supabase pauses free-plan projects after 7 days without database activity,
// and with no logins the live tables can easily sit idle that long. Netlify
// runs this once a day on the production deploy and makes one tiny real query
// so the project stays awake.
//
// It reuses the two browser-safe NEXT_PUBLIC_SUPABASE_* variables already set
// in Netlify's environment settings — nothing new to configure. Logs show up
// under Netlify → Logs → Functions → supabase-keepalive.

export default async () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("supabase-keepalive: NEXT_PUBLIC_SUPABASE_* variables are missing");
    return new Response("Supabase is not configured", { status: 500 });
  }

  // `rooms` is readable by anon (see supabase/schema.sql); an empty table is fine,
  // the query still runs against Postgres.
  const res = await fetch(`${url}/rest/v1/rooms?select=id&limit=1`, {
    headers: { apikey: key },
  });

  console.log(`supabase-keepalive: HTTP ${res.status}`);
  return new Response(null, { status: res.ok ? 200 : 502 });
};

export const config = {
  schedule: "@daily",
};
