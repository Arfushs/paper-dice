import type { L } from "./types";

/**
 * Preset portraits for the Story God. They aren't characters in the world —
 * they're the face the narrator wears at the table, so each one is an archetype
 * rather than a person.
 *
 * Art lives in public/images/storygods/<id>.jpg. Missing files fall back to a
 * rune, so the picker works before any art exists.
 */
export interface StoryGodPortrait {
  id: string;
  name: L;
  blurb: L;
}

export const STORY_GODS: StoryGodPortrait[] = [
  {
    id: "chronicler",
    name: { en: "The Chronicler", tr: "Vakanüvis" },
    blurb: { en: "Writing it down as it happens. Nothing is forgotten.", tr: "Olurken yazıyor. Hiçbir şey unutulmaz." },
  },
  {
    id: "watcher",
    name: { en: "The Watcher", tr: "Gözleyen" },
    blurb: { en: "Has been here the whole time. Says very little.", tr: "Baştan beri buradaydı. Pek az konuşur." },
  },
  {
    id: "weaver",
    name: { en: "The Weaver", tr: "Dokuyan" },
    blurb: { en: "Holds every thread, and decides which ones cross.", tr: "Her ipliği tutar ve hangilerinin kesişeceğine karar verir." },
  },
  {
    id: "raven",
    name: { en: "The Raven", tr: "Karga" },
    blurb: { en: "Arrives before the bad news does.", tr: "Kötü haberden önce gelir." },
  },
  {
    id: "cartographer",
    name: { en: "The Cartographer", tr: "Haritacı" },
    blurb: { en: "Knows what's past the edge of the map. Won't say yet.", tr: "Haritanın kenarının ötesinde ne olduğunu bilir. Henüz söylemez." },
  },
  {
    id: "arbiter",
    name: { en: "The Arbiter", tr: "Hakem" },
    blurb: { en: "Weighs it, calls it, moves on.", tr: "Tartar, karar verir, devam eder." },
  },
];

export const STORY_GOD_BY_ID = new Map(STORY_GODS.map((s) => [s.id, s]));

/** Public path for a preset portrait, extension-less for the Art fallback. */
export function storyGodArtBase(id: string): string {
  return `/images/storygods/${id}`;
}
