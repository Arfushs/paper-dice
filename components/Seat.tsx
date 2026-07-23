"use client";

import { CLASS_BY_ID } from "@/data/classes";
import { ABILITIES, WEAPON_BY_ID } from "@/data/rules-data";
import { derive } from "@/data/character";
import type { Participant } from "@/lib/session";
import Art from "./Art";
import ClassIcon from "./ClassIcon";

/**
 * A player's card in the party column: portrait, name, level, live HP and
 * Energy, and the six stats at a glance. Clicking it opens the full sheet in
 * the drawer — the card itself is read-only.
 */
export default function Seat({
  p,
  isYou,
  onOpen,
}: {
  p: Participant;
  isYou: boolean;
  onOpen: () => void;
}) {
  const character = p.character;
  const cls = character ? CLASS_BY_ID.get(character.classId) : null;
  if (!character || !cls) return null;

  const sub = cls.subclasses.find((s) => s.id === character.subclassId);
  const d = derive(character, cls);
  const hp = p.hp_current ?? d.hp;
  const energy = p.energy_current ?? d.energy;
  const downed = hp <= 0;
  const weapon = WEAPON_BY_ID.get(character.weaponId);

  const artBase = sub ? `/images/subclasses/${sub.slug}` : `/images/classes/${cls.id}`;
  const weaponLabel = weapon
    ? weapon.die !== "—"
      ? `${weapon.name.en.split(" (")[0]} ${weapon.die}`
      : weapon.name.en
    : "";

  return (
    <button
      type="button"
      className={`pcard${isYou ? " pcard--you" : ""}${downed ? " pcard--downed" : ""}`}
      onClick={onOpen}
    >
      <span className="pcard__art">
        <Art base={artBase} iconId={cls.id} alt="" iconSize={30} />
        {downed && <em className="pcard__downed">Downed</em>}
      </span>

      <span className="pcard__body">
        <span className="pcard__top">
          <strong className="pcard__name">
            {character.name || p.name}
            {isYou && <i className="pcard__you">you</i>}
          </strong>
          <span className="pcard__lv">Lv {character.level}</span>
        </span>
        <span className="pcard__class">
          <ClassIcon id={cls.id} size={12} />
          {sub ? `${sub.name.en} ${cls.name.en}` : cls.name.en}
        </span>

        <span className="pcard__vital">
          <em>HP</em>
          <span className="bar">
            <span
              className="bar__fill bar__fill--hp"
              style={{ width: `${Math.max(0, Math.min(100, (hp / d.hp) * 100))}%` }}
            />
          </span>
          <b>
            {hp}
            <i>/{d.hp}</i>
          </b>
        </span>
        <span className="pcard__vital">
          <em>EN</em>
          <span className="bar">
            <span
              className="bar__fill bar__fill--energy"
              style={{ width: `${Math.max(0, Math.min(100, (energy / d.energy) * 100))}%` }}
            />
          </span>
          <b>
            {energy}
            <i>/{d.energy}</i>
          </b>
        </span>

        <span className="pcard__stats">
          {ABILITIES.map((a) => (
            <span key={a.id} className={a.id === character.primary ? "primary" : ""}>
              <em>{a.id}</em>
              {character.abilities[a.id]}
            </span>
          ))}
        </span>

        <span className="pcard__foot">
          DEF {d.defense} · INIT +{d.initiative}
          {weaponLabel && ` · ${weaponLabel}`}
        </span>
      </span>
    </button>
  );
}
