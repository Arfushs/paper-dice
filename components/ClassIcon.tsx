import type { ReactNode } from "react";

/**
 * Hand-drawn class glyphs. Stroke-only, 32×32, inheriting `currentColor` so they
 * pick up whatever the surrounding text colour is in either theme.
 */
const GLYPHS: Record<string, ReactNode> = {
  // Sword, point down
  knight: (
    <>
      <circle cx="16" cy="3.2" r="1.7" />
      <path d="M16 4.9 V8" />
      <path d="M8.5 8 H23.5" />
      <path d="M12.8 8 V21.5 L16 28 L19.2 21.5 V8" />
      <path d="M16 11 V25" opacity="0.45" />
    </>
  ),

  // Double-bitted axe
  barbarian: (
    <>
      <path d="M16 4 V29" />
      <path d="M16 7.5 C22 7 26.5 11 25.5 17.5 L16 14 Z" />
      <path d="M16 7.5 C10 7 5.5 11 6.5 17.5 L16 14 Z" />
      <path d="M16 24.5 V27.5" opacity="0.45" />
    </>
  ),

  // Shield with a cross
  paladin: (
    <>
      <path d="M16 3 L27 7 V15 C27 22 21.5 27 16 29 C10.5 27 5 22 5 15 V7 Z" />
      <path d="M16 10 V22.5" />
      <path d="M10.5 15.5 H21.5" />
    </>
  ),

  // Enso — a broken ring around a still point
  monk: (
    <>
      <path d="M21.6 6.6 A11 11 0 1 0 10.4 6.6" />
      <circle cx="16" cy="16" r="2.4" fill="currentColor" stroke="none" />
    </>
  ),

  // Dagger and crescent
  rogue: (
    <>
      <path d="M25.5 6.5 L11 21" />
      <path d="M8.2 18.2 L13.8 23.8" />
      <path d="M10.6 23.4 L7 27" />
      <circle cx="5.8" cy="28.2" r="1.5" />
      <path d="M25.5 27 A6.2 6.2 0 1 1 20 20.5 A4.7 4.7 0 1 0 25.5 27 Z" />
    </>
  ),

  // Bow, nocked
  ranger: (
    <>
      <path d="M11 4 C20 9 20 23 11 28" />
      <path d="M11 4 V28" />
      <path d="M5.5 16 H25.5" />
      <path d="M25.5 16 L21.5 13 M25.5 16 L21.5 19" />
      <path d="M5.5 16 L8.8 13.6 M5.5 16 L8.8 18.4" />
    </>
  ),

  // Lute
  bard: (
    <>
      <path d="M13 29 C8 29 5.5 25.5 5.5 22 C5.5 18 8.5 15.5 12 15.5 C15 15.5 17.5 17.5 17.5 20.5 C17.5 25.5 17 29 13 29 Z" />
      <circle cx="11.5" cy="21.5" r="2.2" />
      <path d="M16.5 17.5 L25.5 6.5" />
      <path d="M25.5 6.5 L28.5 3.5" />
      <path d="M24 4.6 L27.3 7.4" />
    </>
  ),

  // Open book beneath a star
  wizard: (
    <>
      <path d="M16 6.5 L17.3 11.2 L22 12.5 L17.3 13.8 L16 18.5 L14.7 13.8 L10 12.5 L14.7 11.2 Z" />
      <path d="M4 22.5 C8 19.5 12 19.5 16 22.5 C20 19.5 24 19.5 28 22.5" />
      <path d="M4 22.5 V26.5 C8 23.5 12 23.5 16 26.5 C20 23.5 24 23.5 28 26.5 V22.5" />
      <path d="M16 22.5 V26.5" />
    </>
  ),

  // Flame
  sorcerer: (
    <>
      <path d="M16 2.5 C19.5 8.5 24 11.5 24 18 A8 8 0 0 1 8 18 C8 11.5 12.5 8.5 16 2.5 Z" />
      <path d="M16 14.5 C17.8 17.5 19 19.2 19 21.2 A3 3 0 0 1 13 21.2 C13 19.2 14.2 17.5 16 14.5 Z" />
    </>
  ),

  // Watching eye
  warlock: (
    <>
      <path d="M3.5 17.5 C9 10 23 10 28.5 17.5 C23 25 9 25 3.5 17.5 Z" />
      <circle cx="16" cy="17.5" r="3.4" fill="currentColor" stroke="none" />
      <path d="M16 7 V3.5" />
      <path d="M8 9 L5.5 6" />
      <path d="M24 9 L26.5 6" />
    </>
  ),

  // Skull
  necromancer: (
    <>
      <path d="M16 3.5 C9.5 3.5 6 8.5 6 13.8 C6 17.8 8 19.4 8.6 22 H23.4 C24 19.4 26 17.8 26 13.8 C26 8.5 22.5 3.5 16 3.5 Z" />
      <path d="M11.5 22 V25.8 H20.5 V22" />
      <circle cx="12" cy="13.8" r="2.7" fill="currentColor" stroke="none" />
      <circle cx="20" cy="13.8" r="2.7" fill="currentColor" stroke="none" />
      <path d="M16 17 L14.4 20 H17.6 Z" />
    </>
  ),

  // Sun
  cleric: (
    <>
      <circle cx="16" cy="16" r="5.6" />
      <path d="M16 3 V7.2 M16 24.8 V29 M3 16 H7.2 M24.8 16 H29" />
      <path d="M6.8 6.8 L9.8 9.8 M22.2 22.2 L25.2 25.2 M25.2 6.8 L22.2 9.8 M9.8 22.2 L6.8 25.2" />
    </>
  ),

  // Antlers
  shaman: (
    <>
      <path d="M14.5 28.5 C12.5 21 10 18 5.5 15" />
      <path d="M12.3 22.5 L6.8 21.2" />
      <path d="M11 19 L7.5 15.2" />
      <path d="M17.5 28.5 C19.5 21 22 18 26.5 15" />
      <path d="M19.7 22.5 L25.2 21.2" />
      <path d="M21 19 L24.5 15.2" />
      <circle cx="16" cy="27" r="2.2" />
    </>
  ),

  // Flask
  alchemist: (
    <>
      <path d="M13 3.5 V11 L6.2 24.8 C5.2 27.2 6.8 29 9.3 29 H22.7 C25.2 29 26.8 27.2 25.8 24.8 L19 11 V3.5" />
      <path d="M11.3 3.5 H20.7" />
      <path d="M8.6 21 H23.4" />
      <circle cx="13" cy="24.5" r="1.3" />
      <circle cx="18.3" cy="25.8" r="1" />
    </>
  ),
};

// A rune for anything unmapped.
const FALLBACK: ReactNode = (
  <>
    <path d="M16 3 L27 9.5 V22.5 L16 29 L5 22.5 V9.5 Z" />
    <path d="M16 11 V21 M12 14 L20 18 M20 14 L12 18" />
  </>
);

export function ClassIcon({
  id,
  size = 32,
  className,
}: {
  id: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {GLYPHS[id] ?? FALLBACK}
    </svg>
  );
}

export default ClassIcon;
