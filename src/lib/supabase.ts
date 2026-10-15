import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Check environment variables
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseKey &&
    supabaseUrl.startsWith("http") &&
    !supabaseUrl.includes("your-project-id")
);

let cachedClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!cachedClient) {
    cachedClient = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });
  }
  return cachedClient;
}

/**
 * Upload an image buffer or blob to Supabase Storage (bucket: 'moments')
 * Returns the public CDN URL or null if failed / not configured.
 */
export async function uploadImageToSupabase(
  fileBuffer: Buffer | Uint8Array,
  fileName: string,
  contentType: string
): Promise<string | null> {
  const client = getSupabase();
  if (!client) return null;

  try {
    const bucket = "moments";
    const path = `uploads/${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    const { error: uploadError } = await client.storage
      .from(bucket)
      .upload(path, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase Storage upload error:", uploadError.message);
      return null;
    }

    const { data } = client.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  } catch (err) {
    console.error("Error in uploadImageToSupabase:", err);
    return null;
  }
}
