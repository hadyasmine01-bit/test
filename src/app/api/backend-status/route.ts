import { NextResponse } from "next/server";
import { isSupabaseConfigured, getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET() {
  let isConnected = false;
  if (isSupabaseConfigured) {
    try {
      const client = getSupabase();
      if (client) {
        const { error } = await client.from("rooms").select("room_id").limit(1);
        if (!error) isConnected = true;
      }
    } catch {}
  }

  return NextResponse.json({
    supabaseConfigured: isSupabaseConfigured,
    supabaseConnected: isConnected,
    mode: isConnected
      ? "cloud_supabase"
      : isSupabaseConfigured
      ? "cloud_credentials_found"
      : "local_storage",
  });
}
