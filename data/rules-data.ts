import type { L } from "./types";

export type AbilityId = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

export interface Ability {
  id: AbilityId;
  name: L; // full word
  blurb: L; // what it governs (short)
}

export const ABILITIES: Ability[] = [
  { id: "STR", name: { en: "Strength", tr: "Güç" }, blurb: { en: "Melee power, lifting, forcing", tr: "Yakın dövüş gücü, kaldırma, zorlama" } },
  { id: "DEX", name: { en: "Dexterity", tr: "Çeviklik" }, blurb: { en: "Aim, reflexes, stealth, Defense", tr: "Nişan, refleks, gizlilik, Savunma" } },
  { id: "CON", name: { en: "Constitution", tr: "Bünye" }, blurb: { en: "Health, stamina, resisting poison", tr: "Sağlık, dayanıklılık, zehre direnç" } },
  { id: "INT", name: { en: "Intelligence", tr: "Zekâ" }, blurb: { en: "Knowledge, deduction, arcane study", tr: "Bilgi, çıkarım, büyü çalışması" } },
  { id: "WIS", name: { en: "Wisdom", tr: "Sağduyu" }, blurb: { en: "Awareness, intuition, willpower, faith", tr: "Farkındalık, sezgi, irade, inanç" } },
  { id: "CHA", name: { en: "Charisma", tr: "Karizma" }, blurb: { en: "Presence, persuasion, force of self", tr: "Mevcudiyet, ikna, benlik gücü" } },
];

export const ABILITY_IDS: AbilityId[] = ABILITIES.map((a) => a.id);

export interface Skill {
  id: string;
  name: L;
  ability: AbilityId;
}

export const SKILLS: Skill[] = [
  { id: "athletics", name: { en: "Athletics", tr: "Atletizm" }, ability: "STR" },
  { id: "force", name: { en: "Force", tr: "Kuvvet" }, ability: "STR" },
  { id: "acrobatics", name: { en: "Acrobatics", tr: "Akrobasi" }, ability: "DEX" },
  { id: "stealth", name: { en: "Stealth", tr: "Gizlilik" }, ability: "DEX" },
  { id: "sleight", name: { en: "Sleight of Hand", tr: "El Çabukluğu" }, ability: "DEX" },
  { id: "endurance", name: { en: "Endurance", tr: "Dayanıklılık" }, ability: "CON" },
  { id: "lore", name: { en: "Lore", tr: "Bilgelik" }, ability: "INT" },
  { id: "investigation", name: { en: "Investigation", tr: "Araştırma" }, ability: "INT" },
  { id: "craft", name: { en: "Craft", tr: "Zanaat" }, ability: "INT" },
  { id: "perception", name: { en: "Perception", tr: "Algı" }, ability: "WIS" },
  { id: "insight", name: { en: "Insight", tr: "Sezgi" }, ability: "WIS" },
  { id: "survival", name: { en: "Survival", tr: "Hayatta Kalma" }, ability: "WIS" },
  { id: "medicine", name: { en: "Medicine", tr: "Tıp" }, ability: "WIS" },
  { id: "persuasion", name: { en: "Persuasion", tr: "İkna" }, ability: "CHA" },
  { id: "deception", name: { en: "Deception", tr: "Aldatma" }, ability: "CHA" },
  { id: "intimidation", name: { en: "Intimidation", tr: "Gözdağı" }, ability: "CHA" },
  { id: "performance", name: { en: "Performance", tr: "Gösteri" }, ability: "CHA" },
];

export const SKILL_BY_ID = new Map(SKILLS.map((s) => [s.id, s]));

export type ArmorId = "none" | "light" | "medium" | "heavy";

export interface Armor {
  id: ArmorId;
  name: L;
  /** DEX-based Defense bonus. Heavy ignores DEX and sets a flat base instead. */
  defenseBonus: number;
  /** Heavy armor: Defense = flatBase + shield, DEX does not apply. */
  flatBase?: number;
  note?: L;
}

export const ARMORS: Armor[] = [
  { id: "none", name: { en: "No armor", tr: "Zırhsız" }, defenseBonus: 0 },
  { id: "light", name: { en: "Light (leather)", tr: "Hafif (deri)" }, defenseBonus: 1 },
  { id: "medium", name: { en: "Medium (chain)", tr: "Orta (zincir)" }, defenseBonus: 2, note: { en: "Disadvantage on Stealth", tr: "Gizlilikte dezavantaj" } },
  { id: "heavy", name: { en: "Heavy (plate)", tr: "Ağır (levha)" }, defenseBonus: 0, flatBase: 14, note: { en: "DEX does not apply; disadvantage on Stealth", tr: "DEX işlemez; Gizlilikte dezavantaj" } },
];

export const ARMOR_BY_ID = new Map(ARMORS.map((a) => [a.id, a]));

export interface Weapon {
  id: string;
  name: L;
  /** Damage die for a melee/ranged strike. Foci that aren't weapons use "—". */
  die: string;
  category: "weapon" | "focus";
  note?: L;
}

export const WEAPONS: Weapon[] = [
  // ── Weapons ──
  { id: "unarmed", name: { en: "Unarmed", tr: "Silahsız" }, die: "d4", category: "weapon" },
  { id: "light", name: { en: "Light (dagger, club)", tr: "Hafif (hançer, sopa)" }, die: "d4", category: "weapon", note: { en: "Thrown to Near; dual-wield", tr: "Yakına fırlatılır; çift kullanım" } },
  { id: "simple", name: { en: "Simple (sword, spear, axe)", tr: "Basit (kılıç, mızrak, balta)" }, die: "d6", category: "weapon" },
  { id: "martial", name: { en: "Martial (longsword, warhammer)", tr: "Savaş (uzun kılıç, savaş çekici)" }, die: "d8", category: "weapon", note: { en: "Requires STR 2+", tr: "STR 2+ gerektirir" } },
  { id: "heavy", name: { en: "Heavy (greataxe, maul)", tr: "Ağır (balta, gürz)" }, die: "d10", category: "weapon", note: { en: "Two-handed, STR 3+", tr: "İki elli, STR 3+" } },
  { id: "bow", name: { en: "Bow", tr: "Yay" }, die: "d6", category: "weapon", note: { en: "Reaches Far", tr: "Uzağa erişir" } },
  { id: "crossbow", name: { en: "Crossbow", tr: "Arbalet" }, die: "d8", category: "weapon", note: { en: "Reaches Far, costs Move to reload", tr: "Uzağa erişir, doldurmak Hareket alır" } },

  // ── Foci ── an implement channels Effects (d20 + Primary + Training); it is not
  // the source of the damage die, so most carry no die of their own.
  { id: "staff", name: { en: "Staff", tr: "Asa" }, die: "d6", category: "focus", note: { en: "Also a simple melee weapon", tr: "Ayrıca basit bir yakın dövüş silahı" } },
  { id: "wand", name: { en: "Wand", tr: "Değnek" }, die: "—", category: "focus", note: { en: "Arcane focus", tr: "Büyü odağı" } },
  { id: "orb", name: { en: "Orb or crystal", tr: "Küre ya da kristal" }, die: "—", category: "focus", note: { en: "Arcane focus", tr: "Büyü odağı" } },
  { id: "grimoire", name: { en: "Grimoire", tr: "Büyü Kitabı" }, die: "—", category: "focus", note: { en: "A wizard's spellbook focus", tr: "Bir büyücünün büyü kitabı odağı" } },
  { id: "holy-symbol", name: { en: "Holy symbol", tr: "Kutsal sembol" }, die: "—", category: "focus", note: { en: "Divine focus", tr: "İlahi odak" } },
  { id: "totem", name: { en: "Totem", tr: "Totem" }, die: "—", category: "focus", note: { en: "Nature focus", tr: "Doğa odağı" } },
  { id: "instrument", name: { en: "Instrument", tr: "Çalgı" }, die: "—", category: "focus", note: { en: "Bardic focus", tr: "Ozan odağı" } },
  { id: "relic", name: { en: "Bone or iron relic", tr: "Kemik ya da demir kalıntı" }, die: "—", category: "focus", note: { en: "A necromancer's focus", tr: "Bir nekromantın odağı" } },
];

export const WEAPON_BY_ID = new Map(WEAPONS.map((w) => [w.id, w]));

// ── Point budgets ──────────────────────────────────────────────────────────

/** Every ability starts at 1; this many points are distributed on top. */
export const BASE_POINTS = 8;

/** Extra ability points arrive at levels 4 and 8. */
export function pointsBudget(level: number): number {
  return BASE_POINTS + (level >= 4 ? 1 : 0) + (level >= 8 ? 1 : 0);
}

/** No ability may exceed 4 at level 1, 5 from level 4, 6 from level 8. */
export function abilityCap(level: number): number {
  if (level >= 8) return 6;
  if (level >= 4) return 5;
  return 4;
}

/** Trained skills: 3 to start, +1 at levels 4 and 8. */
export function skillBudget(level: number): number {
  return 3 + (level >= 4 ? 1 : 0) + (level >= 8 ? 1 : 0);
}

/** Subclass is chosen at level 3. */
export const SUBCLASS_LEVEL = 3;

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 10;

/**
 * Parse a priority slot like "STR / DEX" into the abilities it offers, so a
 * class whose primary is a choice can present that choice at creation.
 */
export function primaryOptions(prioritySlot: string): AbilityId[] {
  return prioritySlot
    .split("/")
    .map((s) => s.trim())
    .filter((s): s is AbilityId => (ABILITY_IDS as string[]).includes(s));
}
