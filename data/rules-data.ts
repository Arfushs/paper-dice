import type { L } from "./types";

export type AbilityId = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

export interface Ability {
  id: AbilityId;
  name: L; // full word
  blurb: L; // what it governs (short)
}

export const ABILITIES: Ability[] = [
  { id: "STR", name: { en: "Strength", tr: "Güç" }, blurb: { en: "Melee power, lifting, forcing" } },
  { id: "DEX", name: { en: "Dexterity", tr: "Çeviklik" }, blurb: { en: "Aim, reflexes, stealth, Defense" } },
  { id: "CON", name: { en: "Constitution", tr: "Bünye" }, blurb: { en: "Health, stamina, resisting poison" } },
  { id: "INT", name: { en: "Intelligence", tr: "Zekâ" }, blurb: { en: "Knowledge, deduction, arcane study" } },
  { id: "WIS", name: { en: "Wisdom", tr: "Sağduyu" }, blurb: { en: "Awareness, intuition, willpower, faith" } },
  { id: "CHA", name: { en: "Charisma", tr: "Karizma" }, blurb: { en: "Presence, persuasion, force of self" } },
];

export const ABILITY_IDS: AbilityId[] = ABILITIES.map((a) => a.id);

export interface Skill {
  id: string;
  name: L;
  ability: AbilityId;
}

export const SKILLS: Skill[] = [
  { id: "athletics", name: { en: "Athletics" }, ability: "STR" },
  { id: "force", name: { en: "Force" }, ability: "STR" },
  { id: "acrobatics", name: { en: "Acrobatics" }, ability: "DEX" },
  { id: "stealth", name: { en: "Stealth" }, ability: "DEX" },
  { id: "sleight", name: { en: "Sleight of Hand" }, ability: "DEX" },
  { id: "endurance", name: { en: "Endurance" }, ability: "CON" },
  { id: "lore", name: { en: "Lore" }, ability: "INT" },
  { id: "investigation", name: { en: "Investigation" }, ability: "INT" },
  { id: "craft", name: { en: "Craft" }, ability: "INT" },
  { id: "perception", name: { en: "Perception" }, ability: "WIS" },
  { id: "insight", name: { en: "Insight" }, ability: "WIS" },
  { id: "survival", name: { en: "Survival" }, ability: "WIS" },
  { id: "medicine", name: { en: "Medicine" }, ability: "WIS" },
  { id: "persuasion", name: { en: "Persuasion" }, ability: "CHA" },
  { id: "deception", name: { en: "Deception" }, ability: "CHA" },
  { id: "intimidation", name: { en: "Intimidation" }, ability: "CHA" },
  { id: "performance", name: { en: "Performance" }, ability: "CHA" },
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
  { id: "none", name: { en: "No armor" }, defenseBonus: 0 },
  { id: "light", name: { en: "Light (leather)" }, defenseBonus: 1 },
  { id: "medium", name: { en: "Medium (chain)" }, defenseBonus: 2, note: { en: "Disadvantage on Stealth" } },
  { id: "heavy", name: { en: "Heavy (plate)" }, defenseBonus: 0, flatBase: 14, note: { en: "DEX does not apply; disadvantage on Stealth" } },
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
  { id: "unarmed", name: { en: "Unarmed" }, die: "d4", category: "weapon" },
  { id: "light", name: { en: "Light (dagger, club)" }, die: "d4", category: "weapon", note: { en: "Thrown to Near; dual-wield" } },
  { id: "simple", name: { en: "Simple (sword, spear, axe)" }, die: "d6", category: "weapon" },
  { id: "martial", name: { en: "Martial (longsword, warhammer)" }, die: "d8", category: "weapon", note: { en: "Requires STR 2+" } },
  { id: "heavy", name: { en: "Heavy (greataxe, maul)" }, die: "d10", category: "weapon", note: { en: "Two-handed, STR 3+" } },
  { id: "bow", name: { en: "Bow" }, die: "d6", category: "weapon", note: { en: "Reaches Far" } },
  { id: "crossbow", name: { en: "Crossbow" }, die: "d8", category: "weapon", note: { en: "Reaches Far, costs Move to reload" } },

  // ── Foci ── an implement channels Effects (d20 + Primary + Training); it is not
  // the source of the damage die, so most carry no die of their own.
  { id: "staff", name: { en: "Staff" }, die: "d6", category: "focus", note: { en: "Also a simple melee weapon" } },
  { id: "wand", name: { en: "Wand" }, die: "—", category: "focus", note: { en: "Arcane focus" } },
  { id: "orb", name: { en: "Orb or crystal" }, die: "—", category: "focus", note: { en: "Arcane focus" } },
  { id: "grimoire", name: { en: "Grimoire" }, die: "—", category: "focus", note: { en: "A wizard's spellbook focus" } },
  { id: "holy-symbol", name: { en: "Holy symbol" }, die: "—", category: "focus", note: { en: "Divine focus" } },
  { id: "totem", name: { en: "Totem" }, die: "—", category: "focus", note: { en: "Nature focus" } },
  { id: "instrument", name: { en: "Instrument" }, die: "—", category: "focus", note: { en: "Bardic focus" } },
  { id: "relic", name: { en: "Bone or iron relic" }, die: "—", category: "focus", note: { en: "A necromancer's focus" } },
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
