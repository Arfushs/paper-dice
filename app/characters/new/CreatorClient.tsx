"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CLASSES, CLASS_BY_ID } from "@/data/classes";
import {
  ABILITIES,
  SKILLS,
  ARMORS,
  WEAPONS,
  abilityCap,
  pointsBudget,
  skillBudget,
  primaryOptions,
  SUBCLASS_LEVEL,
  MIN_LEVEL,
  MAX_LEVEL,
  type AbilityId,
  type ArmorId,
} from "@/data/rules-data";
import {
  draftCharacter,
  getCharacter,
  saveCharacter,
  primaryFor,
  type Character,
} from "@/data/character";
import ClassIcon from "@/components/ClassIcon";
import CharacterCard from "@/components/CharacterCard";

export default function CreatorClient() {
  const router = useRouter();
  const [editId, setEditId] = useState<string | null>(null);
  const [char, setChar] = useState<Character>(() => draftCharacter(CLASSES[0]));

  // localStorage and the query string are client-only, so load an existing
  // character (edit mode) after mount rather than during render. This also keeps
  // us clear of useSearchParams and its Suspense requirement.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) return;
    const existing = getCharacter(id);
    if (existing) {
      setEditId(id);
      setChar(existing);
    }
  }, []);

  const cls = CLASS_BY_ID.get(char.classId)!;
  const patch = (p: Partial<Character>) => setChar((c) => ({ ...c, ...p }));

  // ── budgets ──
  const spent = ABILITIES.reduce((sum, a) => sum + (char.abilities[a.id] - 1), 0);
  const remaining = pointsBudget(char.level) - spent;
  const cap = abilityCap(char.level);
  const skillsLeft = skillBudget(char.level) - char.skills.length;

  const primarySlot = primaryOptions(cls.priority[0]);
  const canSave = char.name.trim().length > 0 && remaining === 0;

  // ── mutations ──
  function pickClass(id: string) {
    const next = CLASS_BY_ID.get(id)!;
    patch({
      classId: id,
      primary: primaryFor(next),
      subclassId: null, // subclasses belong to a class
    });
  }

  function setLevel(level: number) {
    const lv = Math.max(MIN_LEVEL, Math.min(MAX_LEVEL, level));
    // Clamp abilities to the new cap and drop the subclass if we fell below 3.
    const newCap = abilityCap(lv);
    const abilities = { ...char.abilities };
    for (const a of ABILITIES) abilities[a.id] = Math.min(abilities[a.id], newCap);
    patch({
      level: lv,
      abilities,
      subclassId: lv < SUBCLASS_LEVEL ? null : char.subclassId,
    });
  }

  function bumpAbility(id: AbilityId, delta: number) {
    const current = char.abilities[id];
    const next = current + delta;
    if (next < 1 || next > cap) return;
    if (delta > 0 && remaining <= 0) return;
    patch({ abilities: { ...char.abilities, [id]: next } });
  }

  function toggleSkill(id: string) {
    const has = char.skills.includes(id);
    if (!has && skillsLeft <= 0) return;
    patch({
      skills: has ? char.skills.filter((s) => s !== id) : [...char.skills, id],
    });
  }

  function save() {
    if (!canSave) return;
    saveCharacter(char);
    router.push("/characters");
  }

  const subOptions = char.level >= SUBCLASS_LEVEL ? cls.subclasses : [];

  return (
    <div className="creator">
      <div className="creator__form">
        <Link href="/characters" className="backlink" style={{ padding: "0 0 20px" }}>
          ← All characters
        </Link>

        {/* ── Class ── */}
        <Section n={1} title="Class">
          <div className="pick-grid">
            {CLASSES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`pick${c.id === char.classId ? " pick--on" : ""}`}
                onClick={() => pickClass(c.id)}
              >
                <ClassIcon id={c.id} size={22} />
                <span>{c.name.en}</span>
              </button>
            ))}
          </div>

          <div className="field-row">
            <label className="field">
              <span className="field__label">Level</span>
              <div className="stepper">
                <button type="button" onClick={() => setLevel(char.level - 1)} aria-label="Lower level">
                  −
                </button>
                <span className="stepper__val">{char.level}</span>
                <button type="button" onClick={() => setLevel(char.level + 1)} aria-label="Raise level">
                  +
                </button>
              </div>
            </label>

            {primarySlot.length > 1 && (
              <label className="field">
                <span className="field__label">Primary ability</span>
                <div className="seg">
                  {primarySlot.map((a) => (
                    <button
                      key={a}
                      type="button"
                      className={`seg__opt${char.primary === a ? " seg__opt--on" : ""}`}
                      onClick={() => patch({ primary: a })}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </label>
            )}
          </div>

          <div className="field" style={{ marginTop: 14 }}>
            <span className="field__label">
              Subclass{" "}
              {char.level < SUBCLASS_LEVEL && (
                <em className="field__hint">— chosen at level {SUBCLASS_LEVEL}</em>
              )}
            </span>
            {subOptions.length > 0 ? (
              <div className="seg seg--wrap">
                <button
                  type="button"
                  className={`seg__opt${!char.subclassId ? " seg__opt--on" : ""}`}
                  onClick={() => patch({ subclassId: null })}
                >
                  None
                </button>
                {subOptions.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`seg__opt${char.subclassId === s.id ? " seg__opt--on" : ""}`}
                    onClick={() => patch({ subclassId: s.id })}
                  >
                    {s.name.en}
                  </button>
                ))}
              </div>
            ) : (
              <p className="field__note">Raise to level {SUBCLASS_LEVEL} to choose one.</p>
            )}
          </div>
        </Section>

        {/* ── Identity ── */}
        <Section n={2} title="Identity">
          <label className="field">
            <span className="field__label">Name</span>
            <input
              className="text-input"
              value={char.name}
              maxLength={40}
              placeholder="Who are they?"
              onChange={(e) => patch({ name: e.target.value })}
            />
          </label>
        </Section>

        {/* ── Abilities ── */}
        <Section
          n={3}
          title="Abilities"
          aside={
            <span className={`budget${remaining === 0 ? " budget--done" : ""}`}>
              {remaining} point{remaining === 1 ? "" : "s"} left
            </span>
          }
        >
          <p className="field__note" style={{ marginTop: -4 }}>
            Every ability starts at 1. Spend {pointsBudget(char.level)} points, none above {cap}.
          </p>
          <div className="abil-grid">
            {ABILITIES.map((a) => {
              const val = char.abilities[a.id];
              return (
                <div className="abil-row" key={a.id}>
                  <div className="abil-row__meta">
                    <span className="abil-row__id">
                      {a.id}
                      {a.id === char.primary && <em className="abil-row__pri">primary</em>}
                    </span>
                    <span className="abil-row__name">{a.blurb.en}</span>
                  </div>
                  <div className="stepper">
                    <button
                      type="button"
                      onClick={() => bumpAbility(a.id, -1)}
                      disabled={val <= 1}
                      aria-label={`Lower ${a.id}`}
                    >
                      −
                    </button>
                    <span className="stepper__val">{val}</span>
                    <button
                      type="button"
                      onClick={() => bumpAbility(a.id, +1)}
                      disabled={val >= cap || remaining <= 0}
                      aria-label={`Raise ${a.id}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ── Skills ── */}
        <Section
          n={4}
          title="Trained Skills"
          aside={
            <span className={`budget${skillsLeft === 0 ? " budget--done" : ""}`}>
              {skillsLeft} left
            </span>
          }
        >
          <div className="skill-cols">
            {ABILITIES.map((a) => {
              const group = SKILLS.filter((s) => s.ability === a.id);
              return (
                <div className="skill-group" key={a.id}>
                  <div className="skill-group__head">{a.id}</div>
                  {group.map((s) => {
                    const on = char.skills.includes(s.id);
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
        </Section>

        {/* ── Gear ── */}
        <Section n={5} title="Gear">
          <div className="field-row">
            <label className="field">
              <span className="field__label">Weapon</span>
              <select
                className="text-input"
                value={char.weaponId}
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

            <label className="field">
              <span className="field__label">Armor</span>
              <select
                className="text-input"
                value={char.armorId}
                onChange={(e) => patch({ armorId: e.target.value as ArmorId })}
              >
                {ARMORS.map((ar) => (
                  <option key={ar.id} value={ar.id}>
                    {ar.name.en}
                  </option>
                ))}
              </select>
            </label>

            <label className="field field--check">
              <input
                type="checkbox"
                checked={char.shield}
                onChange={(e) => patch({ shield: e.target.checked })}
              />
              <span>Shield (+1)</span>
            </label>
          </div>

          <label className="field" style={{ marginTop: 14 }}>
            <span className="field__label">
              Inventory <em className="field__hint">— one item per line</em>
            </span>
            <textarea
              className="text-input text-area"
              rows={4}
              value={char.inventory.join("\n")}
              placeholder={cls.kit.en}
              onChange={(e) => patch({ inventory: e.target.value.split("\n") })}
            />
          </label>
        </Section>

        {/* ── Background ── */}
        <Section n={6} title="Background">
          <p className="field__note" style={{ marginTop: -4 }}>
            The Story God will use all three against you.
          </p>
          {(
            [
              ["from", "Where are you from?"],
              ["owe", "Who do you owe?"],
              ["want", "What do you want?"],
            ] as const
          ).map(([key, label]) => (
            <label className="field" key={key}>
              <span className="field__label">{label}</span>
              <input
                className="text-input"
                value={char.background[key]}
                onChange={(e) =>
                  patch({ background: { ...char.background, [key]: e.target.value } })
                }
              />
            </label>
          ))}
        </Section>
      </div>

      {/* ── live preview ── */}
      <aside className="creator__preview">
        <div className="creator__preview-inner">
          <CharacterCard character={char} />
          <button type="button" className="btn btn--primary creator__save" disabled={!canSave} onClick={save}>
            {editId ? "Save changes" : "Create character"}
          </button>
          {!canSave && (
            <p className="creator__hint">
              {char.name.trim().length === 0
                ? "Give them a name to finish."
                : `Spend the last ${remaining} ability point${remaining === 1 ? "" : "s"}.`}
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

function Section({
  n,
  title,
  aside,
  children,
}: {
  n: number;
  title: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="creator-section">
      <div className="creator-section__head">
        <span className="creator-section__n">{String(n).padStart(2, "0")}</span>
        <h2>{title}</h2>
        <span className="creator-section__line" />
        {aside}
      </div>
      {children}
    </section>
  );
}
