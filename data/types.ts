/**
 * Every player-facing string is a localisable pair. English is authored first and
 * is always present; `tr` is filled in as the translation pass progresses and
 * falls back to English until it is.
 */
export type Locale = "en" | "tr";

export type L = { en: string; tr?: string };

export function t(value: L, locale: Locale): string {
  return (locale === "tr" ? value.tr : undefined) ?? value.en;
}

/** A "You say …" line and what the Story God charges for it. */
export interface Example {
  text: L;
  /** Free-form because it is not always a number: "2", "1 dose", "= its cost", "Miracle". */
  cost: string;
}

export interface Named {
  name: L;
  text: L;
}

export interface Subclass {
  id: string;
  /** `<classId>-<subclassId>` — also the image filename stem. */
  slug: string;
  name: L;
  tagline: L;
  domain: L;
  ruleBreaker: Named;
  examples: Example[];
}

export type ClassGroup = "front" | "skirmisher" | "magic" | "faith" | "craft";

export interface CharClass {
  id: string;
  num: number;
  group: ClassGroup;
  name: L;
  /** The one-line epigraph. */
  hook: L;
  playsLike: L;
  hpBase: number;
  /** Ability priority, in order. e.g. ["STR / DEX", "CON", "WIS"] */
  priority: string[];
  domain: L;
  kit: L;
  signature: Named;
  /** A second clause some classes carry: the Oath, the Debt, Wild Surge. */
  signatureExtra?: Named;
  examples: Example[];
  subclasses: Subclass[];
}

export const GROUPS: { id: ClassGroup; name: L; blurb: L }[] = [
  {
    id: "front",
    name: { en: "Front Line", tr: "Ön Saf" },
    blurb: {
      en: "They stand where the damage is going to land.",
      tr: "Hasarın geleceği yerde duranlar.",
    },
  },
  {
    id: "skirmisher",
    name: { en: "Skirmishers", tr: "Çevikler" },
    blurb: {
      en: "They pick the moment, and the moment is rarely a fair fight.",
      tr: "Anı onlar seçer, ve o an nadiren adil bir dövüştür.",
    },
  },
  {
    id: "magic",
    name: { en: "The Four Magics", tr: "Dört Büyü" },
    blurb: {
      en: "The same power through four incompatible doors.",
      tr: "Aynı güce açılan dört uyumsuz kapı.",
    },
  },
  {
    id: "faith",
    name: { en: "Faith & Nature", tr: "İnanç ve Doğa" },
    blurb: {
      en: "They ask something older than they are, and it answers.",
      tr: "Kendilerinden eski bir şeye sorarlar, ve o cevap verir.",
    },
  },
  {
    id: "craft",
    name: { en: "Craft", tr: "Zanaat" },
    blurb: {
      en: "Power you can put in a bottle and hand to someone else.",
      tr: "Şişeye koyup başkasına verebileceğin güç.",
    },
  },
];
