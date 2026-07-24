"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CLASS_BY_ID } from "@/data/classes";
import { ABILITIES, WEAPON_BY_ID, type AbilityId } from "@/data/rules-data";
import { loadCharacters, primaryFor, type Character } from "@/data/character";
import {
  DIFFICULTIES,
  rollCheck,
  rollExpr,
  type RollMode,
  type RollResult,
} from "@/lib/dice";
import { useLocale } from "./LocaleProvider";

const QUICK_DICE = ["d4", "d6", "d8", "d10", "d12", "d20", "d100"];

export default function DiceTray() {
  const { tk, tl } = useLocale();
  const [chars, setChars] = useState<Character[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mode, setMode] = useState<RollMode>("normal");
  const [trained, setTrained] = useState(false);
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [expr, setExpr] = useState("");
  const [freeMod, setFreeMod] = useState(0);
  const [log, setLog] = useState<RollResult[]>([]);

  useEffect(() => {
    setChars(loadCharacters());
  }, []);

  const active = useMemo(
    () => chars.find((c) => c.id === activeId) ?? null,
    [chars, activeId],
  );
  const cls = active ? CLASS_BY_ID.get(active.classId) : null;

  function push(r: RollResult | null) {
    if (r) setLog((l) => [r, ...l].slice(0, 40));
  }

  function abilityCheck(id: AbilityId) {
    const value = active ? active.abilities[id] : 0;
    push(
      rollCheck({
        label: active ? `${active.name || "—"} · ${id} check` : `${id} check`,
        ability: value,
        training: trained ? 2 : 0,
        mode,
        difficulty,
      }),
    );
  }

  function freeformCheck() {
    push(
      rollCheck({
        label: "d20 check",
        ability: freeMod,
        training: trained ? 2 : 0,
        mode,
        difficulty,
      }),
    );
  }

  function attack(id: AbilityId) {
    const value = active ? active.abilities[id] : 0;
    push(
      rollCheck({
        label: `Attack (${id})`,
        ability: value,
        training: trained ? 2 : 0,
        mode,
        difficulty, // difficulty doubles as target Defense here
      }),
    );
  }

  function rollWeaponDamage() {
    if (!active) return;
    const weapon = WEAPON_BY_ID.get(active.weaponId);
    if (!weapon || weapon.die === "—") return;
    const attackStat = active.abilities.STR >= active.abilities.DEX ? "STR" : "DEX";
    const bonus = active.abilities[attackStat];
    push(rollExpr(`${weapon.die}+${bonus}`, `Damage (${weapon.die} + ${attackStat})`));
  }

  function rollCustom(value?: string) {
    const v = value ?? expr;
    push(rollExpr(v));
    if (!value) setExpr("");
  }

  const weapon = active ? WEAPON_BY_ID.get(active.weaponId) : null;
  const hasWeaponDie = weapon != null && weapon.die !== "—";
  const suggestedAttackStat =
    active && active.abilities.DEX > active.abilities.STR ? "DEX" : "STR";

  return (
    <>
      <p className="eyebrow">{tk("dice.eyebrow")}</p>
      <h1 className="display" style={{ fontSize: "2.5rem", margin: "12px 0 6px" }}>
        {tk("dice.title")}
      </h1>
      <p className="lede" style={{ maxWidth: "58ch", marginBottom: 8 }}>
        {tk("dice.lede")}
      </p>
      <div className="tray">
      <div className="tray__panel">
        {/* Who's rolling */}
        <section className="tray-block">
          <div className="tray-block__head">
            <h2>{tk("dice.whoRolling")}</h2>
          </div>
          {chars.length === 0 ? (
            <p className="field__note" style={{ margin: 0 }}>
              {tk("dice.whoRolling")}.{" "}
              <Link href="/characters/new" className="inline-link">
                {tk("chars.createFirst")} →
              </Link>
            </p>
          ) : (
            <div className="tray-chars">
              <button
                type="button"
                className={`pick${activeId === null ? " pick--on" : ""}`}
                onClick={() => setActiveId(null)}
              >
                <span>{tk("dice.freeform")}</span>
              </button>
              {chars.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`pick${activeId === c.id ? " pick--on" : ""}`}
                  onClick={() => setActiveId(c.id)}
                >
                  <span>{c.name || tk("chars.emptyTitle")}</span>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Shared roll modifiers */}
        <section className="tray-block">
          <div className="tray-controls">
            <div className="tray-ctrl">
              <span className="field__label">{tk("dice.rollMode")}</span>
              <div className="seg">
                {(["disadvantage", "normal", "advantage"] as RollMode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`seg__opt${mode === m ? " seg__opt--on" : ""}`}
                    onClick={() => setMode(m)}
                  >
                    {m === "normal"
                      ? tk("dice.normal")
                      : m === "advantage"
                        ? tk("dice.advantage")
                        : tk("dice.disadvantage")}
                  </button>
                ))}
              </div>
            </div>

            <label className="field--check" style={{ alignSelf: "flex-end", paddingBottom: 4 }}>
              <input type="checkbox" checked={trained} onChange={(e) => setTrained(e.target.checked)} />
              <span>{tk("dice.trained")}</span>
            </label>

            <div className="tray-ctrl">
              <span className="field__label">{tk("dice.difficulty")}</span>
              <div className="seg seg--wrap">
                <button
                  type="button"
                  className={`seg__opt${difficulty === null ? " seg__opt--on" : ""}`}
                  onClick={() => setDifficulty(null)}
                >
                  {tk("creator.none")}
                </button>
                {DIFFICULTIES.map((dv) => (
                  <button
                    key={dv.value}
                    type="button"
                    className={`seg__opt${difficulty === dv.value ? " seg__opt--on" : ""}`}
                    onClick={() => setDifficulty(dv.value)}
                    title={dv.label}
                  >
                    {dv.value}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ability checks */}
        <section className="tray-block">
          <div className="tray-block__head">
            <h2>{tk("dice.abilityCheck")}</h2>
            <span className="tray-block__hint">d20 + {tk("creator.abilities").toLowerCase()}{trained ? " + 2" : ""}</span>
          </div>
          <div className="tray-abilities">
            {ABILITIES.map((a) => (
              <button
                key={a.id}
                type="button"
                className="roll-btn"
                onClick={() => abilityCheck(a.id)}
              >
                <span className="roll-btn__id">{a.id}</span>
                {active && <span className="roll-btn__val">{active.abilities[a.id]}</span>}
              </button>
            ))}
          </div>
          {!active && (
            <div className="tray-freemod">
              <span className="field__label">{tk("dice.flatMod")}</span>
              <div className="stepper">
                <button type="button" onClick={() => setFreeMod((m) => m - 1)}>
                  −
                </button>
                <span className="stepper__val">{freeMod >= 0 ? `+${freeMod}` : freeMod}</span>
                <button type="button" onClick={() => setFreeMod((m) => m + 1)}>
                  +
                </button>
              </div>
              <button type="button" className="btn" onClick={freeformCheck}>
                {tk("dice.rollD20")}
              </button>
            </div>
          )}
        </section>

        {/* Attack & damage */}
        {active && (
          <section className="tray-block">
            <div className="tray-block__head">
              <h2>{tk("dice.attackDamage")}</h2>
              {weapon && (
                <span className="tray-block__hint">
                  {tl(weapon.name)}
                  {hasWeaponDie ? ` · ${weapon.die}` : ` · ${tk("creator.focus").toLowerCase()}`}
                </span>
              )}
            </div>
            <div className="tray-attack">
              <button type="button" className="btn" onClick={() => attack("STR")}>
                STR {active.abilities.STR}
              </button>
              <button type="button" className="btn" onClick={() => attack("DEX")}>
                DEX {active.abilities.DEX}
              </button>
              {hasWeaponDie && (
                <button type="button" className="btn btn--primary" onClick={rollWeaponDamage}>
                  {weapon!.die} + {suggestedAttackStat}
                </button>
              )}
            </div>
          </section>
        )}

        {/* Custom dice */}
        <section className="tray-block">
          <div className="tray-block__head">
            <h2>{tk("dice.custom")}</h2>
          </div>
          <div className="tray-custom">
            <input
              className="text-input"
              placeholder="2d6+3"
              value={expr}
              onChange={(e) => setExpr(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && rollCustom()}
            />
            <button type="button" className="btn" onClick={() => rollCustom()}>
              {tk("dice.roll")}
            </button>
          </div>
          <div className="tray-quick">
            {QUICK_DICE.map((qd) => (
              <button key={qd} type="button" className="quick-die" onClick={() => rollCustom(qd)}>
                {qd}
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Log */}
      <aside className="tray__log">
        <div className="tray__log-head">
          <h2>{tk("dice.rolls")}</h2>
          {log.length > 0 && (
            <button type="button" className="mini-btn" onClick={() => setLog([])}>
              {tk("dice.clear")}
            </button>
          )}
        </div>
        {log.length === 0 ? (
          <p className="field__note">{tk("dice.noRolls")}</p>
        ) : (
          <ul className="log-list">
            {log.map((r, i) => (
              <LogRow key={r.at + "-" + i} r={r} />
            ))}
          </ul>
        )}
      </aside>
      </div>
    </>
  );
}

function LogRow({ r }: { r: RollResult }) {
  const { tk } = useLocale();
  if (r.kind === "check") {
    const critClass =
      r.crit === "success" ? " log-row--crit" : r.crit === "fail" ? " log-row--fumble" : "";
    return (
      <li className={`log-row${critClass}`}>
        <div className="log-row__top">
          <span className="log-row__label">{r.label}</span>
          <span className="log-row__total">{r.total}</span>
        </div>
        <div className="log-row__detail">
          <span className="log-dice">
            {r.d20Rolls.length > 1 ? (
              <>
                {r.d20Rolls.map((v, i) => (
                  <em key={i} className={v === r.d20 ? "kept" : "dropped"}>
                    {v}
                  </em>
                ))}
                <span className="log-mode">
                  {r.mode === "advantage" ? "adv" : "dis"}
                </span>
              </>
            ) : (
              <em className="kept">{r.d20}</em>
            )}
            <span className="log-plus">
              {r.ability >= 0 ? `+${r.ability}` : r.ability}
              {r.training ? ` +${r.training}` : ""}
            </span>
          </span>
          {r.crit && (
            <span className={`log-badge log-badge--${r.crit === "success" ? "crit" : "fumble"}`}>
              {r.crit === "success" ? "NAT 20" : "NAT 1"}
            </span>
          )}
          {r.outcome && (
            <span className={`log-badge log-badge--${r.outcome}`}>
              {r.outcome === "success" ? tk("dice.success") : tk("dice.fail")}
              {r.difficulty != null ? ` vs ${r.difficulty}` : ""}
            </span>
          )}
        </div>
      </li>
    );
  }

  // expression
  return (
    <li className="log-row">
      <div className="log-row__top">
        <span className="log-row__label">{r.label}</span>
        <span className="log-row__total">{r.total}</span>
      </div>
      <div className="log-row__detail">
        <span className="log-dice">
          {r.groups.map((g, gi) => (
            <span key={gi} className="log-group">
              {g.values.map((v, vi) => (
                <em key={vi} className="kept">
                  {Math.abs(v)}
                </em>
              ))}
              <span className="log-group__tag">d{g.sides}</span>
            </span>
          ))}
          {r.flat !== 0 && (
            <span className="log-plus">
              {r.flat > 0 ? `+${r.flat}` : r.flat}
            </span>
          )}
        </span>
      </div>
    </li>
  );
}
