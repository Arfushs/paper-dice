"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadCharacters, deleteCharacter, type Character } from "@/data/character";
import CharacterCard from "@/components/CharacterCard";

export default function RosterClient() {
  const [chars, setChars] = useState<Character[] | null>(null);

  // localStorage is client-only; read after mount.
  useEffect(() => {
    setChars(loadCharacters());
  }, []);

  function remove(id: string, name: string) {
    if (!window.confirm(`Delete ${name || "this character"}? This cannot be undone.`)) return;
    deleteCharacter(id);
    setChars(loadCharacters());
  }

  if (chars === null) {
    return <p style={{ padding: "40px 0", color: "var(--ink-dim)" }}>Loading…</p>;
  }

  return (
    <>
      <div className="roster-head">
        <div>
          <p className="eyebrow">Your party</p>
          <h1 className="display" style={{ fontSize: "2.5rem", margin: "12px 0 0" }}>
            Characters
          </h1>
        </div>
        <Link href="/characters/new" className="btn btn--primary">
          + New character
        </Link>
      </div>

      {chars.length === 0 ? (
        <div className="roster-empty">
          <p className="lede">No characters yet.</p>
          <p style={{ color: "var(--ink-faint)", marginTop: 6 }}>
            Build a Character Paper — class, abilities, gear — and it will appear here, saved in
            this browser.
          </p>
          <Link href="/characters/new" className="btn btn--primary" style={{ marginTop: 22 }}>
            Create your first
          </Link>
        </div>
      ) : (
        <div className="roster-grid">
          {chars.map((c) => (
            <div className="roster-item" key={c.id}>
              <CharacterCard character={c} />
              <div className="roster-item__actions">
                <Link href={`/characters/new?id=${c.id}`} className="mini-btn">
                  Edit
                </Link>
                <button
                  type="button"
                  className="mini-btn mini-btn--danger"
                  onClick={() => remove(c.id, c.name)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
