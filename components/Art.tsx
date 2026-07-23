"use client";

import { useCallback, useState } from "react";
import ClassIcon from "./ClassIcon";

/** Generators hand back whatever format they feel like; try each in turn. */
const EXTENSIONS = [".jpg", ".png", ".webp", ".jpeg"] as const;

/**
 * Shows artwork from /public/images if a file is there under any of the usual
 * extensions, and falls back to the class glyph on a hatched plate if none is.
 * Lets art be added a file at a time without the layout ever breaking.
 */
export default function Art({
  base,
  iconId,
  alt,
  iconSize = 46,
}: {
  /** Path without an extension, e.g. "/images/classes/knight" */
  base: string;
  iconId: string;
  alt: string;
  iconSize?: number;
}) {
  const [attempt, setAttempt] = useState(0);
  const exhausted = attempt >= EXTENSIONS.length;

  const next = useCallback(() => setAttempt((a) => a + 1), []);

  // The markup is server-rendered, so a 404 can resolve before React attaches
  // onError — the event would be missed and we'd show a broken image. Re-check
  // the element's own state the moment we get a handle on it.
  const check = useCallback(
    (node: HTMLImageElement | null) => {
      if (node && node.complete && node.naturalWidth === 0) next();
    },
    [next],
  );

  if (exhausted) {
    return (
      <div className="art-placeholder">
        <ClassIcon id={iconId} size={iconSize} />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- files are optional; next/image throws on 404
    <img
      key={attempt}
      ref={check}
      src={base + EXTENSIONS[attempt]}
      alt={alt}
      loading="lazy"
      onError={next}
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth === 0) next();
      }}
    />
  );
}
