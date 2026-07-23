"use client";

import { useEffect, useRef, useState } from "react";
import { deleteImage, listImages, uploadImage, type SgImage } from "@/lib/images";

/**
 * The Story God's picture shelf. Upload ahead of the session, then show them in
 * whatever order the story takes. Also used to pick a portrait.
 */
export default function ImageLibrary({
  onPick,
  activeUrl,
  pickLabel = "Show",
  compact = false,
}: {
  onPick?: (img: SgImage) => void;
  activeUrl?: string | null;
  pickLabel?: string;
  compact?: boolean;
}) {
  const [images, setImages] = useState<SgImage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listImages()
      .then(setImages)
      .catch((e) => setError(e instanceof Error ? e.message : "Could not load your pictures."));
  }, []);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      for (const file of Array.from(files).slice(0, 12)) {
        const img = await uploadImage(file);
        setImages((prev) => [...prev, img]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function remove(img: SgImage) {
    if (!window.confirm("Delete this picture?")) return;
    setImages((prev) => prev.filter((i) => i.id !== img.id));
    try {
      await deleteImage(img);
    } catch {
      setImages(await listImages());
    }
  }

  return (
    <div className={`imglib${compact ? " imglib--compact" : ""}`}>
      <div className="imglib__bar">
        <button
          type="button"
          className="btn"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
        >
          {busy ? "Uploading…" : "+ Add pictures"}
        </button>
        <span className="imglib__hint">4:3 works best · JPG or PNG</span>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && <p className="entry-error" style={{ marginBottom: 12 }}>{error}</p>}

      {images.length === 0 ? (
        <p className="field__note">
          Nothing uploaded yet. Add a few backdrops and you can show them mid-session.
        </p>
      ) : (
        <div className="imglib__grid">
          {images.map((img) => (
            <figure
              key={img.id}
              className={`imgcard${activeUrl === img.url ? " imgcard--on" : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- user upload, arbitrary host */}
              <img src={img.url} alt={img.label ?? ""} loading="lazy" />
              <figcaption>{img.label}</figcaption>
              <div className="imgcard__actions">
                {onPick && (
                  <button type="button" className="mini-btn" onClick={() => onPick(img)}>
                    {activeUrl === img.url ? "Showing" : pickLabel}
                  </button>
                )}
                <button
                  type="button"
                  className="mini-btn mini-btn--danger"
                  onClick={() => remove(img)}
                >
                  Delete
                </button>
              </div>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
