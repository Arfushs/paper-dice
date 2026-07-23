"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase";
import {
  createRoom,
  findRoom,
  joinRoom,
  normalizeCode,
  recallTable,
  rememberTable,
} from "@/lib/session";
import { loadCharacters, derive, type Character } from "@/data/character";
import { CLASS_BY_ID } from "@/data/classes";
import { STORY_GODS, storyGodArtBase } from "@/data/storygods";
import type { SgImage } from "@/lib/images";
import Art from "@/components/Art";
import ClassIcon from "@/components/ClassIcon";
import ImageLibrary from "@/components/ImageLibrary";

export default function TableEntry() {
  const router = useRouter();
  const [chars, setChars] = useState<Character[]>([]);
  const [busy, setBusy] = useState<"create" | "join" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastTable, setLastTable] = useState<string | null>(null);

  // Story God side
  const [title, setTitle] = useState("");
  const [sgName, setSgName] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  /** Which job the picture modal is doing: choosing a face, or stocking backdrops. */
  const [modal, setModal] = useState<"portrait" | "backdrops" | null>(null);

  // Player side
  const [code, setCode] = useState("");
  const [charId, setCharId] = useState<string | null>(null);

  useEffect(() => {
    const list = loadCharacters();
    setChars(list);
    if (list[0]) setCharId(list[0].id);
    setLastTable(recallTable());
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <div className="setup-note">
        <h2>Not connected yet</h2>
        <p>
          Live tables need Supabase. Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> to <code>.env.local</code> and
          restart the dev server.
        </p>
      </div>
    );
  }

  async function handleCreate() {
    setError(null);
    setBusy("create");
    try {
      const room = await createRoom(title, sgName, avatar);
      rememberTable(room.code);
      router.push(`/table/${room.code}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not open the table.");
      setBusy(null);
    }
  }

  async function handleJoin() {
    setError(null);
    const clean = normalizeCode(code);
    if (clean.length < 4) {
      setError("That code looks too short.");
      return;
    }
    const character = chars.find((c) => c.id === charId) ?? null;
    if (!character) {
      setError("Pick a character to bring.");
      return;
    }

    setBusy("join");
    try {
      const room = await findRoom(clean);
      if (!room) {
        setError(`No table with the code ${clean}.`);
        setBusy(null);
        return;
      }
      const cls = CLASS_BY_ID.get(character.classId);
      const d = cls ? derive(character, cls) : null;
      await joinRoom(room.id, character.name, character, d?.hp ?? null, d?.energy ?? null);
      rememberTable(room.code);
      router.push(`/table/${room.code}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not join that table.");
      setBusy(null);
    }
  }

  return (
    <>
      {lastTable && (
        <Link href={`/table/${lastTable}`} className="resume-bar">
          <span className="resume-bar__code">{lastTable}</span>
          <span>You still have a seat at this table</span>
          <em>Return →</em>
        </Link>
      )}

      {error && <p className="entry-error">{error}</p>}

      <div className="entry">
        {/* Story God */}
        <section className="entry-card">
          <p className="eyebrow">Run it</p>
          <h2 className="entry-card__title">Story God</h2>
          <p className="entry-card__blurb">
            Open a table, hand the code to your friends, and narrate. You roll every die and
            decide what things cost. No character sheet — only authority.
          </p>

          <label className="field">
            <span className="field__label">Your name</span>
            <input
              className="text-input"
              value={sgName}
              maxLength={30}
              placeholder="Story God"
              onChange={(e) => setSgName(e.target.value)}
            />
          </label>

          <label className="field" style={{ marginTop: 12 }}>
            <span className="field__label">What are you running?</span>
            <input
              className="text-input"
              value={title}
              maxLength={60}
              placeholder="A new table"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <div className="field" style={{ marginTop: 16 }}>
            <span className="field__label">Portrait</span>
            <div className="godpick">
              {STORY_GODS.map((g) => {
                const src = storyGodArtBase(g.id);
                const on = avatar === src;
                return (
                  <div className="godpick__slot" key={g.id}>
                    <button
                      type="button"
                      className={`godpick__opt${on ? " godpick__opt--on" : ""}`}
                      onClick={() => setAvatar(on ? null : src)}
                    >
                      <span className="godpick__face">
                        <Art base={src} iconId="storygod" alt="" iconSize={26} />
                      </span>
                      <span className="godpick__name">{g.name.en}</span>
                    </button>

                    <div className="godpop" role="tooltip">
                      <div className="godpop__art">
                        <Art base={src} iconId="storygod" alt="" iconSize={56} />
                      </div>
                      <div className="godpop__body">
                        <h4>{g.name.en}</h4>
                        <p>{g.blurb.en}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="godpick__slot">
                <button
                  type="button"
                  className={`godpick__opt${
                    avatar && !avatar.startsWith("/images/storygods/") ? " godpick__opt--on" : ""
                  }`}
                  onClick={() => setModal("portrait")}
                >
                  <span className="godpick__face">
                    {avatar && !avatar.startsWith("/images/storygods/") ? (
                      // eslint-disable-next-line @next/next/no-img-element -- user upload
                      <img src={avatar} alt="" />
                    ) : (
                      <span className="godpick__plus">+</span>
                    )}
                  </span>
                  <span className="godpick__name">Your own</span>
                </button>

                <div className="godpop" role="tooltip">
                  <div className="godpop__art">
                    {avatar && !avatar.startsWith("/images/storygods/") ? (
                      // eslint-disable-next-line @next/next/no-img-element -- user upload
                      <img src={avatar} alt="" />
                    ) : (
                      <span className="godpop__plus">+</span>
                    )}
                  </div>
                  <div className="godpop__body">
                    <h4>Your own</h4>
                    <p>Use one of the pictures you&rsquo;ve uploaded.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="field" style={{ marginTop: 16 }}>
            <span className="field__label">Backdrops</span>
            <p className="field__note" style={{ margin: "4px 0 8px" }}>
              Upload them now — a burning hall, a map, a face — and show any of them in any
              order once the table is open.
            </p>
            <button type="button" className="btn" onClick={() => setModal("backdrops")}>
              Add pictures
            </button>
          </div>

          <button
            type="button"
            className="btn btn--primary entry-card__go"
            onClick={handleCreate}
            disabled={busy !== null}
          >
            {busy === "create" ? "Opening…" : "Open a table"}
          </button>
        </section>

        {/* Player */}
        <section className="entry-card">
          <p className="eyebrow">Play</p>
          <h2 className="entry-card__title">Take a seat</h2>
          <p className="entry-card__blurb">
            Bring a character and join with the code the Story God gives you. You level up and
            manage your gear at the table; the Story God handles the dice.
          </p>

          <label className="field">
            <span className="field__label">Table code</span>
            <input
              className="text-input code-input"
              value={code}
              maxLength={8}
              placeholder="ABCDE"
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
            />
          </label>

          <div className="field" style={{ marginTop: 14 }}>
            <span className="field__label">Bring</span>
            {chars.length === 0 ? (
              <p className="field__note" style={{ margin: "6px 0 0" }}>
                No characters yet.{" "}
                <Link href="/characters/new" className="inline-link">
                  Make one →
                </Link>
              </p>
            ) : (
              <div className="entry-chars">
                {chars.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`pick${charId === c.id ? " pick--on" : ""}`}
                    onClick={() => setCharId(c.id)}
                  >
                    <ClassIcon id={c.classId} size={20} />
                    <span>{c.name || "Unnamed"}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="btn btn--primary entry-card__go"
            onClick={handleJoin}
            disabled={busy !== null || chars.length === 0}
          >
            {busy === "join" ? "Joining…" : "Join the table"}
          </button>
        </section>
      </div>

      {modal && (
        <>
          <div className="drawer__scrim" onClick={() => setModal(null)} />
          <div className="portrait-modal">
            <header className="drawer__head">
              <div>
                <h2 className="drawer__title">
                  {modal === "portrait" ? "Choose a portrait" : "Your backdrops"}
                </h2>
                <p className="drawer__sub">
                  {modal === "portrait"
                    ? "Any picture you've uploaded can be your face at the table."
                    : "Show these mid-session, in any order. 4:3 fits best."}
                </p>
              </div>
              <button
                type="button"
                className="mini-btn"
                onClick={() => setModal(null)}
                style={{ flex: "none" }}
              >
                Close
              </button>
            </header>
            <div className="drawer__body">
              <ImageLibrary
                activeUrl={modal === "portrait" ? avatar : null}
                pickLabel="Use as portrait"
                onPick={
                  modal === "portrait"
                    ? (img: SgImage) => {
                        setAvatar(img.url);
                        setModal(null);
                      }
                    : undefined
                }
                compact
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
