"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadCharacters, deleteCharacter, type Character } from "@/data/character";
import CharacterCard from "@/components/CharacterCard";
import { useLocale } from "@/components/LocaleProvider";

export default function RosterClient() {
  const { tk } = useLocale();
  const [chars, setChars] = useState<Character[] | null>(null);

  // localStorage is client-only; read after mount.
  useEffect(() => {
    setChars(loadCharacters());
  }, []);

  function remove(id: string) {
    if (!window.confirm(tk("chars.deleteConfirm"))) return;
    deleteCharacter(id);
    setChars(loadCharacters());
  }

  if (chars === null) {
    return <p style={{ padding: "40px 0", color: "var(--ink-dim)" }}>{tk("common.loading")}</p>;
  }

  return (
    <>
      <div className="roster-head">
        <div>
          <p className="eyebrow">{tk("chars.party")}</p>
          <h1 className="display" style={{ fontSize: "2.5rem", margin: "12px 0 0" }}>
            {tk("chars.title")}
          </h1>
        </div>
        <Link href="/characters/new" className="btn btn--primary">
          {tk("chars.new")}
        </Link>
      </div>

      {chars.length === 0 ? (
        <div className="roster-empty">
          <p className="lede">{tk("chars.emptyTitle")}</p>
          <p style={{ color: "var(--ink-faint)", marginTop: 6 }}>{tk("chars.emptyBody")}</p>
          <Link href="/characters/new" className="btn btn--primary" style={{ marginTop: 22 }}>
            {tk("chars.createFirst")}
          </Link>
        </div>
      ) : (
        <div className="roster-grid">
          {chars.map((c) => (
            <div className="roster-item" key={c.id}>
              <CharacterCard character={c} />
              <div className="roster-item__actions">
                <Link href={`/characters/new?id=${c.id}`} className="mini-btn">
                  {tk("chars.edit")}
                </Link>
                <button
                  type="button"
                  className="mini-btn mini-btn--danger"
                  onClick={() => remove(c.id)}
                >
                  {tk("chars.delete")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
