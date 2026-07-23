import type { L } from "./types";

/**
 * The Story God's backdrop library. Each scene is a mood the table can be put
 * into with one click — "where are you right now".
 *
 * Art is optional: drop `<id>.jpg` into public/images/scenes/ and it takes over
 * from the gradient. Until then the gradient plus the glyph carries the mood.
 */
export interface Scene {
  id: string;
  name: L;
  blurb: L;
  /** Two-stop gradient used until real art exists. */
  gradient: [string, string];
  glyph: string;
}

export const SCENES: Scene[] = [
  {
    id: "tavern",
    name: { en: "The Tavern", tr: "Taverna" },
    blurb: { en: "Warmth, noise, and someone watching from the corner." },
    gradient: ["#3a2416", "#0d0806"],
    glyph: "🍺",
  },
  {
    id: "road",
    name: { en: "The Road", tr: "Yol" },
    blurb: { en: "Open country, long hours, weather coming in." },
    gradient: ["#2b3325", "#0a0c08"],
    glyph: "🌾",
  },
  {
    id: "forest",
    name: { en: "Deep Forest", tr: "Derin Orman" },
    blurb: { en: "Old trees, no path, and the light going." },
    gradient: ["#16281c", "#050806"],
    glyph: "🌲",
  },
  {
    id: "swamp",
    name: { en: "The Marsh", tr: "Bataklık" },
    blurb: { en: "Standing water, insects, and something moving out there." },
    gradient: ["#1e2a1e", "#080a07"],
    glyph: "🪷",
  },
  {
    id: "mountain",
    name: { en: "High Pass", tr: "Yüksek Geçit" },
    blurb: { en: "Thin air, hard stone, a long way down." },
    gradient: ["#2a2f38", "#08090c"],
    glyph: "⛰️",
  },
  {
    id: "snow",
    name: { en: "The Cold", tr: "Ayaz" },
    blurb: { en: "Snow sideways, and nothing to burn." },
    gradient: ["#39434d", "#0c0f12"],
    glyph: "❄️",
  },
  {
    id: "dungeon",
    name: { en: "Beneath", tr: "Zindan" },
    blurb: { en: "Worked stone, still air, and doors that were locked from this side." },
    gradient: ["#241f26", "#070609"],
    glyph: "🗝️",
  },
  {
    id: "cave",
    name: { en: "The Cave", tr: "Mağara" },
    blurb: { en: "Wet rock, one light, and echoes that arrive late." },
    gradient: ["#1c1c22", "#050506"],
    glyph: "🕳️",
  },
  {
    id: "crypt",
    name: { en: "The Crypt", tr: "Mezar Odası" },
    blurb: { en: "Names on the walls. Some of the slabs are open." },
    gradient: ["#20242a", "#060708" ],
    glyph: "💀",
  },
  {
    id: "ruins",
    name: { en: "Old Ruins", tr: "Harabeler" },
    blurb: { en: "Someone built this well, a very long time ago." },
    gradient: ["#2c2b23", "#080807"],
    glyph: "🏛️",
  },
  {
    id: "city",
    name: { en: "The City", tr: "Şehir" },
    blurb: { en: "Lantern light, wet cobbles, too many witnesses." },
    gradient: ["#2a2620", "#08070a"],
    glyph: "🏘️",
  },
  {
    id: "court",
    name: { en: "The Court", tr: "Saray" },
    blurb: { en: "Everyone here is smiling and none of it is friendly." },
    gradient: ["#33261a", "#0b0806"],
    glyph: "👑",
  },
  {
    id: "temple",
    name: { en: "The Temple", tr: "Tapınak" },
    blurb: { en: "Cold light through high windows, and a silence with weight." },
    gradient: ["#2e2a1f", "#090806"],
    glyph: "🕯️",
  },
  {
    id: "sea",
    name: { en: "The Sea", tr: "Deniz" },
    blurb: { en: "A deck underfoot and no land in any direction." },
    gradient: ["#1b2833", "#05080b"],
    glyph: "⚓",
  },
  {
    id: "battle",
    name: { en: "The Battle", tr: "Savaş" },
    blurb: { en: "It has already started. Roll initiative." },
    gradient: ["#3a1e1a", "#0b0605"],
    glyph: "⚔️",
  },
  {
    id: "camp",
    name: { en: "Camp", tr: "Kamp" },
    blurb: { en: "A fire, a watch order, and a few hours of quiet." },
    gradient: ["#33251a", "#0a0706"],
    glyph: "🔥",
  },
];

export const SCENE_BY_ID = new Map(SCENES.map((s) => [s.id, s]));
