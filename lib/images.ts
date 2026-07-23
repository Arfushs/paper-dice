import { requireSupabase } from "./supabase";
import { getClientId } from "./session";

const BUCKET = "scene-images";

export interface SgImage {
  id: string;
  client_id: string;
  path: string;
  url: string;
  label: string | null;
  sort: number;
  created_at: string;
}

/**
 * Resize and re-encode in the browser before upload. Scene art is shown at
 * roughly 900px wide, so anything larger is bandwidth nobody sees — and phone
 * photos are routinely 4-8 MB.
 */
async function prepare(file: File, maxWidth = 1280): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process that image.");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.82),
  );
  if (!blob) throw new Error("Could not encode that image.");
  return blob;
}

export async function uploadImage(file: File, label?: string): Promise<SgImage> {
  const sb = requireSupabase();
  const clientId = getClientId();

  if (!file.type.startsWith("image/")) {
    throw new Error("That file isn't an image.");
  }

  const blob = await prepare(file);
  const path = `${clientId}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.jpg`;

  const { error: upErr } = await sb.storage
    .from(BUCKET)
    .upload(path, blob, { contentType: "image/jpeg", upsert: false });
  if (upErr) throw upErr;

  const { data: pub } = sb.storage.from(BUCKET).getPublicUrl(path);

  const { data, error } = await sb
    .from("sg_images")
    .insert({
      client_id: clientId,
      path,
      url: pub.publicUrl,
      label: label?.trim() || file.name.replace(/\.[^.]+$/, "").slice(0, 40),
      sort: Date.now() % 100000,
    })
    .select()
    .single();
  if (error) throw error;
  return data as SgImage;
}

export async function listImages(): Promise<SgImage[]> {
  const sb = requireSupabase();
  const { data, error } = await sb
    .from("sg_images")
    .select()
    .eq("client_id", getClientId())
    .order("sort", { ascending: true });
  if (error) throw error;
  return (data ?? []) as SgImage[];
}

export async function deleteImage(img: SgImage): Promise<void> {
  const sb = requireSupabase();
  await sb.storage.from(BUCKET).remove([img.path]);
  await sb.from("sg_images").delete().eq("id", img.id);
}

export async function renameImage(id: string, label: string): Promise<void> {
  const sb = requireSupabase();
  await sb.from("sg_images").update({ label: label.slice(0, 40) }).eq("id", id);
}

/** Move an image up or down in the show order. */
export async function reorderImages(images: SgImage[]): Promise<void> {
  const sb = requireSupabase();
  await Promise.all(
    images.map((img, i) => sb.from("sg_images").update({ sort: i }).eq("id", img.id)),
  );
}
