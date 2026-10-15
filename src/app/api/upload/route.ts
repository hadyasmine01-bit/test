import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { uploadImageToSupabase, isSupabaseConfigured } from "@/lib/supabase";

export const runtime = "nodejs";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let fileBuffer: Buffer | null = null;
    let fileName = `moment_${Date.now()}`;
    let mimeType = "image/jpeg";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json(
          { success: false, error: "Aucun fichier image trouvé dans la requête." },
          { status: 400 }
        );
      }

      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { success: false, error: "Le fichier doit être une image (PNG, JPG, WebP)." },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      fileBuffer = Buffer.from(bytes);
      mimeType = file.type || "image/jpeg";
      const extension = file.name ? path.extname(file.name) : ".jpg";
      fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}${extension || ".jpg"}`;
    } else if (contentType.includes("application/json")) {
      const body = await req.json();
      const { dataUrl, customName } = body || {};

      if (!dataUrl || typeof dataUrl !== "string") {
        return NextResponse.json(
          { success: false, error: "Image dataUrl manquante." },
          { status: 400 }
        );
      }

      const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return NextResponse.json(
          { success: false, error: "Format dataUrl invalide." },
          { status: 400 }
        );
      }

      mimeType = matches[1];
      const base64Data = matches[2];
      fileBuffer = Buffer.from(base64Data, "base64");
      const ext = mimeType.includes("png") ? ".png" : mimeType.includes("webp") ? ".webp" : ".jpg";
      fileName = `${customName ? customName.replace(/[^a-zA-Z0-9_-]/g, "") : `photo_${Date.now()}`}${ext}`;
    } else {
      return NextResponse.json(
        { success: false, error: "Type de contenu non supporté." },
        { status: 400 }
      );
    }

    if (!fileBuffer || fileBuffer.length === 0) {
      return NextResponse.json(
        { success: false, error: "Fichier image vide." },
        { status: 400 }
      );
    }

    // 1. Try Supabase Cloud Storage first if configured
    if (isSupabaseConfigured) {
      const cloudUrl = await uploadImageToSupabase(fileBuffer, fileName, mimeType);
      if (cloudUrl) {
        return NextResponse.json({
          success: true,
          url: cloudUrl,
          storage: "supabase",
          size: fileBuffer.length,
        });
      }
    }

    // 2. Fallback to Local Public Disk Storage
    ensureUploadsDir();
    const safeFileName = `${Date.now()}_${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = path.join(UPLOADS_DIR, safeFileName);
    fs.writeFileSync(filePath, fileBuffer);

    const localUrl = `/uploads/${safeFileName}`;

    return NextResponse.json({
      success: true,
      url: localUrl,
      storage: "local",
      size: fileBuffer.length,
    });
  } catch (error) {
    console.error("Error in /api/upload:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors du téléversement de l'image." },
      { status: 500 }
    );
  }
}
