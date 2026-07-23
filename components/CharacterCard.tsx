"use client";

import { CLASS_BY_ID } from "@/data/classes";
import {
  ABILITIES,
  SKILL_BY_ID,
  ARMOR_BY_ID,
  WEAPON_BY_ID,
} from "@/data/rules-data";
import { derive, type Character } from "@/data/character";
import Art from "./Art";

/**
 * The character sheet as a card. Used in the creator preview and the roster —
 * this is what a lobby will eventually deal onto the table.
 */
export default function CharacterCard({
  character,
  compact = false,
}: {
  character: Character;
  compact?: boolean;
}) {
  const cls = CLASS_BY_ID.get(character.classId);
  if (!cls) return null;

  const sub = cls.subclasses.find((s) => s.id === character.subclassId);
  const d = derive(character, cls);

  // Subclass art if a subclass is set, otherwise the class art.
  const artBase = sub
    ? `/images/subclasses/${sub.slug}`
    : `/images/classes/${cls.id}`;

  const armor = ARMOR_BY_ID.get(character.armorId);
  const weapon = WEAPON_BY_ID.get(character.weaponId);

  return (
    <article className={`pc-card${compact ? " pc-card--compact" : ""}`}>
      <div className="pc-card__art">
        <Art base={artBase} iconId={cls.id} alt="" iconSize={compact ? 34 : 46} />
        <div className="pc-card__level">Lv {character.level}</div>
      </div>

      <div className="pc-card__head">
        <h3 className="pc-card__name">{character.name || "Unnamed"}</h3>
        <p className="pc-card__class">
          {cls.name.en}
          {sub && <span className="pc-card__sub"> · {sub.name.en}</span>}
        </p>
      </div>

      <div className="pc-card__vitals">
        <Vital label="HP" value={d.hp} accent />
        <Vital label="Energy" value={d.energy} accent />
        <Vital label="Defense" value={d.defense} />
        <Vital label="Init" value={`+${d.initiative}`} />
      </div>

      <div className="pc-card__abilities">
        {ABILITIES.map((a) => (
          <div className="pc-abil" key={a.id}>
            <span className="pc-abil__id">{a.id}</span>
            <span
              className={`pc-abil__val${
                a.id === character.primary ? " pc-abil__val--primary" : ""
              }`}
            >
              {character.abilities[a.id]}
            </span>
          </div>
        ))}
      </div>

      {!compact && (
        <>
          <Row label="Domain" value={sub ? sub.domain.en : cls.domain.en} muted />

          <div className="pc-card__gear">
            <Row
              label={weapon?.category === "focus" ? "Focus" : "Weapon"}
              value={
                weapon && weapon.die !== "—"
                  ? `${weapon.name.en} (${weapon.die})`
                  : (weapon?.name.en ?? character.weaponId)
              }
            />
            <Row
              label="Armor"
              value={`${armor?.name.en ?? character.armorId}${
                character.shield ? " + shield" : ""
              }`}
            />
          </div>

          {character.skills.length > 0 && (
            <div className="pc-card__tags">
              {character.skills.map((id) => (
                <span className="pc-tag" key={id}>
                  {SKILL_BY_ID.get(id)?.name.en ?? id}
                </span>
              ))}
            </div>
          )}

          {character.inventory.filter(Boolean).length > 0 && (
            <div className="pc-card__inv">
              <div className="pc-card__inv-label">Inventory</div>
              <ul>
                {character.inventory.filter(Boolean).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </article>
  );
}

function Vital({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number | string;
  accent?: boolean;
}) {
  return (
    <div className="pc-vital">
      <span className="pc-vital__label">{label}</span>
      <span className={`pc-vital__value${accent ? " pc-vital__value--accent" : ""}`}>
        {value}
      </span>
    </div>
  );
}

function Row({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="pc-row">
      <span className="pc-row__label">{label}</span>
      <span className={`pc-row__value${muted ? " pc-row__value--muted" : ""}`}>{value}</span>
    </div>
  );
}
