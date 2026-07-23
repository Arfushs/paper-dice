"use client";

import { useState } from "react";
import { CLASS_BY_ID } from "@/data/classes";
import {
  ABILITIES,
  ARMORS,
  SKILLS,
  WEAPONS,
  abilityCap,
  pointsBudget,
  skillBudget,
  SUBCLASS_LEVEL,
  MIN_LEVEL,
  MAX_LEVEL,
  type AbilityId,
  type ArmorId,
} from "@/data/rules-data";
import { derive, type Character } from "@/data/character";

type Tab = "vitals" | "level" | "abilities" | "gear";

/**
 * Every editable thing about one character in one place — health, level,
 * ability points, gear. Opening it is the only way to change any of them, so
 * there's never a question of where a control lives.
 *
 * A player gets their own. The Story God gets everyone's.
 */
export default function CharacterDrawer({
  character,
  hp,
  energy,
  open,
  canEdit,
  onClose,
  onChange,
  onAdjust,
}: {
  character: Character;
  hp: number;
  energy: number;
  open: boolean;
  /** False when the Story God is only looking at someone else's sheet. */
  canEdit: boolean;
  onClose: () => void;
  onChange: (next: Character, hpDelta: number) => void;
  onAdjust: (patch: { hp_current?: number; energy_current?: number }) => void;
}) {
  const [tab, setTab] = useState<Tab>("vitals");
  const cls = CLASS_BY_ID.get(character.classId);

  if (!open || !cls) return null;

  const d = derive(character, cls);
  const sub = cls.subclasses.find((s) => s.id === character.subclassId);
  const cap = abilityCap(character.level);
  const spent = ABILITIES.reduce((sum, a) => sum + (character.abilities[a.id] - 1), 0);
  const pointsLeft = pointsBudget(character.level) - spent;
  const skillsLeft = skillBudget(character.level) - character.skills.length;

  function patch(next: Partial<Character>, hpDelta = 0) {
    onChange({ ...character, ...next }, hpDelta);
  }

  function setLevel(level: number) {
    const lv = Math.max(MIN_LEVEL, Math.min(MAX_LEVEL, level));
    if (lv === character.level) return;

    const newCap = abilityCap(lv);
    const abilities = { ...character.abilities };
    for (const a of ABILITIES) abilities[a.id] = Math.min(abilities[a.id], newCap);

    const next: Character = {
      ...character,
      level: lv,
      abilities,
      subclassId: lv < SUBCLASS_LEVEL ? null : character.subclassId,
      skills: character.skills.slice(0, skillBudget(lv)),
    };
    // Levelling grants its HP immediately, so gaining a level heals you by it.
    onChange(next, derive(next, cls!).hp - d.hp);
  }

  function bumpAbility(id: AbilityId, delta: number) {
    const nextVal = character.abilities[id] + delta;
    if (nextVal < 1 || nextVal > cap) return;
    if (delta > 0 && pointsLeft <= 0) return;
    const abilities = { ...character.abilities, [id]: nextVal };
    const next = { ...character, abilities };
    // CON drives HP, so spending a point there should raise it right away.
    onChange(next, derive(next, cls!).hp - d.hp);
  }

  function toggleSkill(id: string) {
    const has = character.skills.includes(id);
    if (!has && skillsLeft <= 0) return;
    patch({
      skills: has ? character.skills.filter((s) => s !== id) : [...character.skills, id],
    });
  }

  return (
    <>
      <div className="drawer__scrim" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-label="Your character">
        <header className="drawer__head">
          <div>
            <h2 className="drawer__title">{character.name || "Your character"}</h2>
            <p className="drawer__sub">
              {cls.name.en}
              {sub && ` · ${sub.name.en}`} · Level {character.level}
            </p>
          </div>
          <button type="button" className="mini-btn" onClick={onClose} style={{ flex: "none" }}>
            Close
          </button>
        </header>

        <div className="drawer__derived">
          <span>
            HP <strong>{d.hp}</strong>
          </span>
          <span>
            Energy <strong>{d.energy}</strong>
          </span>
          <span>
            Defense <strong>{d.defense}</strong>
          </span>
          <span>
            Cap <strong>{d.effectCap}</strong>
          </span>
        </div>

        <nav className="drawer__tabs">
          {(
            [
              ["vitals", "Health"],
              ["level", "Level"],
              ["abilities", `Abilities${pointsLeft > 0 ? ` · ${pointsLeft}` : ""}`],
              ["gear", "Gear"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={`drawer__tab${tab === id ? " drawer__tab--on" : ""}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="drawer__body">
          {tab === "vitals" && (
            <>
              <VitalRow
                label="Hit Points"
                current={hp}
                max={d.hp}
                tone="hp"
                canEdit={canEdit}
                onStep={(delta) =>
                  onAdjust({ hp_current: Math.max(0, Math.min(d.hp, hp + delta)) })
                }
                onFull={() => onAdjust({ hp_current: d.hp })}
              />
              <VitalRow
                label="Energy"
                current={energy}
                max={d.energy}
                tone="energy"
                canEdit={canEdit}
                onStep={(delta) =>
                  onAdjust({ energy_current: Math.max(0, Math.min(d.energy, energy + delta)) })
                }
                onFull={() => onAdjust({ energy_current: d.energy })}
              />

              {hp <= 0 && (
                <p className="drawer__downed">
                  <strong>Downed.</strong> Roll a bare d20 on each of your turns — 10 or more is
                  a success, 9 or less a failure. Three successes and you stabilise; three
                  failures and you die.
                </p>
              )}

              <div className="drawer__section">
                <span className="field__label">Rest</span>
                <p className="field__note" style={{ marginTop: 6 }}>
                  A Short Rest restores {character.abilities.CON * 2} HP and half your Energy.
                  A Long Rest restores everything.
                </p>
                {canEdit && (
                  <div className="drawer__rests">
                    <button
                      type="button"
                      className="btn"
                      onClick={() =>
                        onAdjust({
                          hp_current: Math.min(d.hp, hp + character.abilities.CON * 2),
                          energy_current: Math.min(d.energy, energy + Math.ceil(d.energy / 2)),
                        })
                      }
                    >
                      Short rest
                    </button>
                    <button
                      type="button"
                      className="btn btn--primary"
                      onClick={() => onAdjust({ hp_current: d.hp, energy_current: d.energy })}
                    >
                      Long rest
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {tab === "level" && (
            <>
              <div className="drawer__row">
                <span className="field__label">Level</span>
                <div className="stepper">
                  <button
                    type="button"
                    onClick={() => setLevel(character.level - 1)}
                    disabled={character.level <= MIN_LEVEL}
                  >
                    −
                  </button>
                  <span className="stepper__val">{character.level}</span>
                  <button
                    type="button"
                    onClick={() => setLevel(character.level + 1)}
                    disabled={character.level >= MAX_LEVEL}
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="field__note">
                No XP — the Story God says when. Every level adds 4 HP and 2 Energy; levels 4
                and 8 add an ability point and a skill.
              </p>

              <div className="drawer__section">
                <span className="field__label">
                  Subclass
                  {character.level < SUBCLASS_LEVEL && (
                    <em className="field__hint"> — unlocks at level {SUBCLASS_LEVEL}</em>
                  )}
                </span>
                {character.level >= SUBCLASS_LEVEL ? (
                  <div className="seg seg--wrap" style={{ marginTop: 8 }}>
                    <button
                      type="button"
                      className={`seg__opt${!character.subclassId ? " seg__opt--on" : ""}`}
                      onClick={() => patch({ subclassId: null })}
                    >
                      None
                    </button>
                    {cls.subclasses.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        className={`seg__opt${character.subclassId === s.id ? " seg__opt--on" : ""}`}
                        onClick={() => patch({ subclassId: s.id })}
                      >
                        {s.name.en}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="field__note">Keep playing.</p>
                )}
              </div>

              {sub && (
                <div className="drawer__breaker">
                  <span className="field__label">Rule Breaker</span>
                  <strong>{sub.ruleBreaker.name.en}</strong>
                  <p>{sub.ruleBreaker.text.en}</p>
                  <span className="field__label" style={{ marginTop: 12, display: "block" }}>
                    Domain — Effects here cost −1 Energy
                  </span>
                  <p>{sub.domain.en}</p>
                </div>
              )}
            </>
          )}

          {tab === "abilities" && (
            <>
              <p className="field__note" style={{ marginTop: 0 }}>
                {pointsLeft > 0
                  ? `${pointsLeft} point${pointsLeft === 1 ? "" : "s"} to spend. Nothing above ${cap}.`
                  : `All spent. Cap is ${cap} at this level.`}
              </p>
              <div className="drawer__abilities">
                {ABILITIES.map((a) => (
                  <div className="abil-row" key={a.id}>
                    <div className="abil-row__meta">
                      <span className="abil-row__id">
                        {a.id}
                        {a.id === character.primary && <em className="abil-row__pri">primary</em>}
                      </span>
                      <span className="abil-row__name">{a.blurb.en}</span>
                    </div>
                    <div className="stepper">
                      <button
                        type="button"
                        onClick={() => bumpAbility(a.id, -1)}
                        disabled={character.abilities[a.id] <= 1}
                      >
                        −
                      </button>
                      <span className="stepper__val">{character.abilities[a.id]}</span>
                      <button
                        type="button"
                        onClick={() => bumpAbility(a.id, +1)}
                        disabled={character.abilities[a.id] >= cap || pointsLeft <= 0}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="drawer__section">
                <span className="field__label">
                  Trained skills{" "}
                  <em className="field__hint">
                    — {skillsLeft > 0 ? `${skillsLeft} left` : "all chosen"}
                  </em>
                </span>
                <div className="drawer__skills">
                  {ABILITIES.map((a) => {
                    const group = SKILLS.filter((s) => s.ability === a.id);
                    return (
                      <div className="skill-group" key={a.id}>
                        <div className="skill-group__head">{a.id}</div>
                        {group.map((s) => {
                          const on = character.skills.includes(s.id);
                          return (
                            <button
                              key={s.id}
                              type="button"
                              className={`chip${on ? " chip--on" : ""}`}
                              onClick={() => toggleSkill(s.id)}
                              disabled={!on && skillsLeft <= 0}
                            >
                              {s.name.en}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {tab === "gear" && (
            <>
              <label className="field">
                <span className="field__label">Weapon or focus</span>
                <select
                  className="text-input"
                  value={character.weaponId}
                  onChange={(e) => patch({ weaponId: e.target.value })}
                >
                  <optgroup label="Weapons">
                    {WEAPONS.filter((w) => w.category === "weapon").map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name.en} · {w.die}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Foci">
                    {WEAPONS.filter((w) => w.category === "focus").map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name.en}
                        {w.die !== "—" ? ` · ${w.die}` : ""}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </label>

              <label className="field" style={{ marginTop: 14 }}>
                <span className="field__label">Armor</span>
                <select
                  className="text-input"
                  value={character.armorId}
                  onChange={(e) => patch({ armorId: e.target.value as ArmorId })}
                >
                  {ARMORS.map((ar) => (
                    <option key={ar.id} value={ar.id}>
                      {ar.name.en}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field--check" style={{ marginTop: 14 }}>
                <input
                  type="checkbox"
                  checked={character.shield}
                  onChange={(e) => patch({ shield: e.target.checked })}
                />
                <span>Shield (+1 Defense)</span>
              </label>

              <label className="field" style={{ marginTop: 16 }}>
                <span className="field__label">
                  Inventory <em className="field__hint">— one item per line</em>
                </span>
                <textarea
                  className="text-input text-area"
                  rows={6}
                  value={character.inventory.join("\n")}
                  onChange={(e) => patch({ inventory: e.target.value.split("\n") })}
                />
              </label>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

function VitalRow({
  label,
  current,
  max,
  tone,
  canEdit,
  onStep,
  onFull,
}: {
  label: string;
  current: number;
  max: number;
  tone: "hp" | "energy";
  canEdit: boolean;
  onStep: (delta: number) => void;
  onFull: () => void;
}) {
  const pct = Math.max(0, Math.min(100, (current / max) * 100));
  return (
    <div className="vital-block">
      <div className="vital-block__top">
        <span className="field__label">{label}</span>
        <span className="vital-block__num">
          {current} <em>/ {max}</em>
        </span>
      </div>
      <div className="bar bar--tall">
        <span className={`bar__fill bar__fill--${tone}`} style={{ width: `${pct}%` }} />
      </div>
      {canEdit && (
        <div className="vital-block__ctrls">
          {[-5, -1, +1, +5].map((delta) => (
            <button key={delta} type="button" className="vital-btn" onClick={() => onStep(delta)}>
              {delta > 0 ? `+${delta}` : delta}
            </button>
          ))}
          <button type="button" className="vital-btn vital-btn--full" onClick={onFull}>
            Full
          </button>
        </div>
      )}
    </div>
  );
}
