import type { CharClass } from "./types";
import {
  ABILITY_IDS,
  ARMOR_BY_ID,
  WEAPON_BY_ID,
  type AbilityId,
  type ArmorId,
} from "./rules-data";

export interface Character {
  id: string;
  name: string;
  classId: string;
  subclassId: string | null; // chosen at level 3
  primary: AbilityId; // resolved from the class's first priority slot
  level: number;
  abilities: Record<AbilityId, number>;
  skills: string[]; // trained skill ids
  weaponId: string; // WEAPONS id
  armorId: ArmorId;
  shield: boolean;
  inventory: string[]; // free-form item lines
  background: { from: string; owe: string; want: string };
  createdAt: number;
  updatedAt: number;
}

export interface DerivedStats {
  hp: number;
  energy: number;
  defense: number;
  initiative: number; // the DEX bonus; the roll is d20 + this
  effectCap: number; // max Energy per Effect at this level
}

export function blankAbilities(): Record<AbilityId, number> {
  return ABILITY_IDS.reduce(
    (acc, id) => ((acc[id] = 1), acc),
    {} as Record<AbilityId, number>,
  );
}

/** Max Energy that may be spent on a single Effect (RULES.md §10). */
export function effectCap(level: number): number {
  if (level >= 9) return 6;
  if (level >= 7) return 5;
  if (level >= 5) return 4;
  if (level >= 3) return 3;
  return 2;
}

export function derive(character: Character, cls: CharClass): DerivedStats {
  const { abilities, level, primary, armorId, shield } = character;
  const armor = ARMOR_BY_ID.get(armorId);
  const shieldBonus = shield ? 1 : 0;

  const defense =
    armor?.flatBase != null
      ? armor.flatBase + shieldBonus // heavy: flat, DEX ignored
      : 10 + abilities.DEX + (armor?.defenseBonus ?? 0) + shieldBonus;

  return {
    hp: cls.hpBase + abilities.CON * 3 + (level - 1) * 4,
    energy: abilities[primary] * 3 + (level - 1) * 2,
    defense,
    initiative: abilities.DEX,
    effectCap: effectCap(level),
  };
}

// ── localStorage store ───────────────────────────────────────────────────────

const KEY = "pd-characters";

function readAll(): Character[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function writeAll(list: Character[]): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* quota or private mode — nothing we can do but not crash */
  }
}

export function loadCharacters(): Character[] {
  return readAll().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getCharacter(id: string): Character | undefined {
  return readAll().find((c) => c.id === id);
}

export function saveCharacter(character: Character): void {
  const list = readAll();
  const i = list.findIndex((c) => c.id === character.id);
  const stamped = { ...character, updatedAt: Date.now() };
  if (i >= 0) list[i] = stamped;
  else list.push(stamped);
  writeAll(list);
}

export function deleteCharacter(id: string): void {
  writeAll(readAll().filter((c) => c.id !== id));
}

export function newId(): string {
  return `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

/** A fresh, valid character to seed the creator. */
export function draftCharacter(cls: CharClass): Character {
  const now = Date.now();
  return {
    id: newId(),
    name: "",
    classId: cls.id,
    subclassId: null,
    primary: primaryFor(cls),
    level: 1,
    abilities: blankAbilities(),
    skills: [],
    weaponId: "simple",
    armorId: "light",
    shield: false,
    inventory: [],
    background: { from: "", owe: "", want: "" },
    createdAt: now,
    updatedAt: now,
  };
}

/** The default primary ability for a class — the first option of its top slot. */
export function primaryFor(cls: CharClass): AbilityId {
  const first = cls.priority[0]
    .split("/")
    .map((s) => s.trim())
    .find((s) => (ABILITY_IDS as string[]).includes(s));
  return (first as AbilityId) ?? "STR";
}

export function weaponName(id: string): string {
  return WEAPON_BY_ID.get(id)?.name.en ?? id;
}
