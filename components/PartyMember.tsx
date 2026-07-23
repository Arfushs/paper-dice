"use client";

import { CLASS_BY_ID } from "@/data/classes";
import { ABILITIES, WEAPON_BY_ID } from "@/data/rules-data";
import { derive } from "@/data/character";
import type { Participant } from "@/lib/session";
import Art from "./Art";
import ClassIcon from "./ClassIcon";

/**
 * A player's card as it sits on the table: who they are, what they can do, and
 * how much of them is left. HP and Energy are live — the Story God can adjust
 * anyone's, players can adjust their own.
 */
export default function PartyMember({
  p,
  canEdit,
  isYou,
  onAdjust,
}: {
  p: Participant;
  canEdit: boolean;
  isYou: boolean;
  onAdjust: (patch: { hp_current?: number; energy_current?: number }) => void;
}) {
  const character = p.character;
  const cls = character ? CLASS_BY_ID.get(character.classId) : null;

  // The Story God has no sheet — a portrait, a name, and authority.
  if (!character || !cls) {
    return (
      <article className={`party party--sg${isYou ? " party--you" : ""}`}>
        <div className="party-sg__portrait">
          {!p.avatar_url ? (
            <span className="party-sg__mark">✦</span>
          ) : p.avatar_url.startsWith("/images/storygods/") ? (
            // A preset portrait — stored without an extension so Art can probe.
            <Art base={p.avatar_url} iconId="storygod" alt="" iconSize={22} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- user upload, arbitrary host
            <img src={p.avatar_url} alt="" />
          )}
        </div>
        <div>
          <h3 className="party__name">
            {p.name}
            {isYou && <span className="party__you">you</span>}
          </h3>
          <p className="party__class">Story God</p>
        </div>
      </article>
    );
  }

  const sub = cls.subclasses.find((s) => s.id === character.subclassId);
  const d = derive(character, cls);
  const hp = p.hp_current ?? d.hp;
  const energy = p.energy_current ?? d.energy;
  const hpPct = Math.max(0, Math.min(100, (hp / d.hp) * 100));
  const enPct = Math.max(0, Math.min(100, (energy / d.energy) * 100));
  const weapon = WEAPON_BY_ID.get(character.weaponId);
  const downed = hp <= 0;

  const artBase = sub
    ? `/images/subclasses/${sub.slug}`
    : `/images/classes/${cls.id}`;

  return (
    <article
      className={`party${isYou ? " party--you" : ""}${downed ? " party--downed" : ""}`}
    >
      <div className="party__art">
        <Art base={artBase} iconId={cls.id} alt="" iconSize={44} />
        <span className="party__lv">Lv {character.level}</span>
        {downed && <span className="party__downed-tag">Downed</span>}
      </div>

      <div className="party__body">
        <div className="party__head">
          <h3 className="party__name">
            {character.name || p.name}
            {isYou && <span className="party__you">you</span>}
          </h3>
        </div>
        <p className="party__class">
          <ClassIcon id={cls.id} size={13} />
          {cls.name.en}
          {sub && ` · ${sub.name.en}`}
        </p>

        {/* Bars */}
        <Bar
          label="HP"
          current={hp}
          max={d.hp}
          pct={hpPct}
          tone="hp"
          canEdit={canEdit}
          onStep={(delta) => onAdjust({ hp_current: hp + delta })}
        />
        <Bar
          label="Energy"
          current={energy}
          max={d.energy}
          pct={enPct}
          tone="energy"
          canEdit={canEdit}
          onStep={(delta) => onAdjust({ energy_current: Math.max(0, Math.min(d.energy, energy + delta)) })}
        />

        <div className="party__stats">
          {ABILITIES.map((a) => (
            <span key={a.id} className="party__stat">
              <em>{a.id}</em>
              {character.abilities[a.id]}
            </span>
          ))}
        </div>

        <div className="party__foot">
          <span>DEF {d.defense}</span>
          <span className="dot">·</span>
          <span>INIT +{d.initiative}</span>
          {weapon && (
            <>
              <span className="dot">·</span>
              <span>{weapon.die !== "—" ? `${weapon.name.en} ${weapon.die}` : weapon.name.en}</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

function Bar({
  label,
  current,
  max,
  pct,
  tone,
  canEdit,
  onStep,
}: {
  label: string;
  current: number;
  max: number;
  pct: number;
  tone: "hp" | "energy";
  canEdit: boolean;
  onStep: (delta: number) => void;
}) {
  return (
    <div className="bar-row">
      <div className="bar-row__top">
        <span className="bar-row__label">{label}</span>
        <span className="bar-row__num">
          {current} <em>/ {max}</em>
        </span>
        {canEdit && (
          <span className="bar-row__ctrl">
            <button type="button" onClick={() => onStep(-1)} aria-label={`Lower ${label}`}>
              −
            </button>
            <button type="button" onClick={() => onStep(+1)} aria-label={`Raise ${label}`}>
              +
            </button>
          </span>
        )}
      </div>
      <div className="bar">
        <span className={`bar__fill bar__fill--${tone}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
