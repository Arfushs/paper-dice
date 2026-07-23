"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase";
import {
  deleteRoom,
  findRoom,
  forgetTable,
  getClientId,
  joinRoom,
  leaveRoom,
  listParticipants,
  listRolls,
  postRoll,
  rememberTable,
  revealRoll,
  setScene,
  subscribeRoom,
  updateParticipant,
  type Participant,
  type Roll,
  type Room,
} from "@/lib/session";
import { DIFFICULTIES, rollCheck, rollExpr, type RollMode } from "@/lib/dice";
import { loadCharacters, saveCharacter, derive, type Character } from "@/data/character";
import { CLASS_BY_ID } from "@/data/classes";
import { ABILITIES, WEAPON_BY_ID, type AbilityId } from "@/data/rules-data";
import { SCENES, SCENE_BY_ID } from "@/data/scenes";
import type { SgImage } from "@/lib/images";
import Art from "@/components/Art";
import ClassIcon from "@/components/ClassIcon";
import Seat from "@/components/Seat";
import CharacterDrawer from "@/components/CharacterDrawer";
import ImageLibrary from "@/components/ImageLibrary";

const QUICK_DICE = ["d4", "d6", "d8", "d10", "d12", "d20"];

export default function RoomClient({ code }: { code: string }) {
  const router = useRouter();
  const [clientId, setClientId] = useState("");
  const [room, setRoom] = useState<Room | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [rolls, setRolls] = useState<Roll[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "missing" | "closed" | "error">(
    "loading",
  );
  const [error, setError] = useState<string | null>(null);

  // roll controls
  const [mode, setMode] = useState<RollMode>("normal");
  const [trained, setTrained] = useState(false);
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [secret, setSecret] = useState(false);
  const [expr, setExpr] = useState("");
  const [freeMod, setFreeMod] = useState(0);
  const [rollFor, setRollFor] = useState<string | null>(null);

  // scene + panels
  const [sceneTab, setSceneTab] = useState<"presets" | "images" | null>(null);
  const [sceneNote, setSceneNote] = useState("");
  const [openSeat, setOpenSeat] = useState<string | null>(null);

  // inline join
  const [chars, setChars] = useState<Character[]>([]);
  const [joinCharId, setJoinCharId] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);

  const me = useMemo(
    () => (clientId ? (participants.find((p) => p.client_id === clientId) ?? null) : null),
    [participants, clientId],
  );
  const isSG = me?.role === "sg";

  const refreshParticipants = useCallback(async (roomId: string) => {
    try {
      setParticipants(await listParticipants(roomId));
    } catch {
      /* transient; the next event will refresh */
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setStatus("error");
      setError("Supabase isn't configured.");
      return;
    }
    setClientId(getClientId());
    setChars(loadCharacters());

    let unsubscribe: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      try {
        const r = await findRoom(code);
        if (cancelled) return;
        if (!r) {
          setStatus("missing");
          return;
        }
        setRoom(r);
        setSceneNote(r.scene_note ?? "");
        const [ps, rs] = await Promise.all([listParticipants(r.id), listRolls(r.id)]);
        if (cancelled) return;
        setParticipants(ps);
        setRolls(rs);
        setStatus("ready");

        unsubscribe = subscribeRoom(r.id, {
          onRoom: (next) => setRoom(next),
          onRoomClosed: () => {
            forgetTable();
            setStatus("closed");
          },
          onParticipants: () => refreshParticipants(r.id),
          onRoll: (roll) =>
            setRolls((prev) => {
              const i = prev.findIndex((x) => x.id === roll.id);
              if (i >= 0) {
                const copy = [...prev];
                copy[i] = roll;
                return copy;
              }
              return [roll, ...prev].slice(0, 60);
            }),
        });
      } catch (e) {
        if (cancelled) return;
        setStatus("error");
        setError(e instanceof Error ? e.message : "Could not open the table.");
      }
    })();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [code, refreshParticipants]);

  useEffect(() => {
    if (me) rememberTable(code);
  }, [me, code]);

  const myCharacter = me?.character ?? null;

  const subjectParticipant = rollFor
    ? (participants.find((p) => p.id === rollFor) ?? null)
    : null;
  const subject = subjectParticipant?.character ?? null;
  const subjectWeapon = subject ? WEAPON_BY_ID.get(subject.weaponId) : null;

  // ── rolling ──
  async function send(payload: ReturnType<typeof rollCheck> | ReturnType<typeof rollExpr>) {
    if (!room || !me || !payload) return;
    try {
      await postRoll({
        roomId: room.id,
        actorName: subjectParticipant ? (subject?.name ?? subjectParticipant.name) : me.name,
        actorRole: me.role,
        payload,
        hidden: !!isSG && secret,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Roll failed to send.");
    }
  }

  function abilityCheck(id: AbilityId) {
    if (!subject) return;
    send(
      rollCheck({
        label: `${id} check`,
        ability: subject.abilities[id],
        training: trained ? 2 : 0,
        mode,
        difficulty,
      }),
    );
  }

  function flatCheck() {
    send(
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
    if (!subject) return;
    send(
      rollCheck({
        label: `Attack (${id})`,
        ability: subject.abilities[id],
        training: trained ? 2 : 0,
        mode,
        difficulty,
      }),
    );
  }

  function damage() {
    if (!subject || !subjectWeapon || subjectWeapon.die === "—") return;
    const stat = subject.abilities.STR >= subject.abilities.DEX ? "STR" : "DEX";
    send(
      rollExpr(
        `${subjectWeapon.die}+${subject.abilities[stat]}`,
        `Damage (${subjectWeapon.die} + ${stat})`,
      ),
    );
  }

  function custom(value?: string) {
    const v = value ?? expr;
    const r = rollExpr(v);
    if (r) send(r);
    if (!value) setExpr("");
  }

  // ── table actions ──
  async function adjust(p: Participant, patch: { hp_current?: number; energy_current?: number }) {
    setParticipants((prev) => prev.map((x) => (x.id === p.id ? { ...x, ...patch } : x)));
    try {
      await updateParticipant(p.id, patch);
    } catch {
      if (room) refreshParticipants(room.id);
    }
  }

  async function changeCharacter(p: Participant, next: Character, hpDelta: number) {
    const cls = CLASS_BY_ID.get(next.classId);
    const d = cls ? derive(next, cls) : null;
    const hp = Math.max(0, Math.min(d?.hp ?? 0, (p.hp_current ?? d?.hp ?? 0) + hpDelta));
    const energy = Math.min(d?.energy ?? 0, p.energy_current ?? d?.energy ?? 0);

    setParticipants((prev) =>
      prev.map((x) =>
        x.id === p.id ? { ...x, character: next, hp_current: hp, energy_current: energy } : x,
      ),
    );
    // Only your own sheet is the one saved in this browser.
    if (p.client_id === clientId) saveCharacter(next);
    try {
      await updateParticipant(p.id, { character: next, hp_current: hp, energy_current: energy });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save that change.");
    }
  }

  async function showScene(patch: Parameters<typeof setScene>[1]) {
    if (!room) return;
    try {
      await setScene(room.id, { ...patch, note: sceneNote.trim() || null });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not change the scene.");
    }
  }

  async function handleJoin() {
    if (!room) return;
    const character = chars.find((c) => c.id === joinCharId);
    if (!character) return;
    setJoining(true);
    try {
      const cls = CLASS_BY_ID.get(character.classId);
      const d = cls ? derive(character, cls) : null;
      await joinRoom(room.id, character.name, character, d?.hp ?? null, d?.energy ?? null);
      await refreshParticipants(room.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not join.");
    } finally {
      setJoining(false);
    }
  }

  async function handleLeave() {
    if (!window.confirm("Leave the table? Your seat will be given up.")) return;
    if (me) await leaveRoom(me.id);
    forgetTable();
    router.push("/table");
  }

  async function handleTerminate() {
    if (!room) return;
    if (
      !window.confirm(
        "Break up the table? The session ends for everyone and the dice log is lost. This cannot be undone.",
      )
    )
      return;
    try {
      await deleteRoom(room.id);
      forgetTable();
      router.push("/table");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not close the table.");
    }
  }

  // ── render ──
  if (status === "loading") return <p className="table-status">Opening the table…</p>;

  if (status === "closed") {
    return (
      <div className="table-status">
        <h2>The table has broken up</h2>
        <p>The Story God ended the session.</p>
        <Link href="/table" className="btn" style={{ marginTop: 18 }}>
          Back to tables
        </Link>
      </div>
    );
  }

  if (status === "missing") {
    return (
      <div className="table-status">
        <h2>No table with the code {code}</h2>
        <p>It may have been closed, or the code mistyped.</p>
        <Link href="/table" className="btn" style={{ marginTop: 18 }}>
          Back to tables
        </Link>
      </div>
    );
  }

  if (status === "error" || !room) {
    return (
      <div className="table-status">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  const scene = room.scene_id ? SCENE_BY_ID.get(room.scene_id) : null;
  const sceneImage = room.scene_image_url;
  const players = participants.filter((p) => p.role === "player");
  const sg = participants.find((p) => p.role === "sg");

  if (!me) {
    return (
      <div className="table-status">
        <h2>{room.title}</h2>
        <p style={{ marginBottom: 20 }}>Table {room.code} — pick a character to take a seat.</p>
        {chars.length === 0 ? (
          <p>
            You have no characters yet.{" "}
            <Link href="/characters/new" className="inline-link">
              Make one →
            </Link>
          </p>
        ) : (
          <>
            <div className="entry-chars" style={{ justifyContent: "center", marginBottom: 20 }}>
              {chars.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`pick${joinCharId === c.id ? " pick--on" : ""}`}
                  onClick={() => setJoinCharId(c.id)}
                >
                  <ClassIcon id={c.classId} size={20} />
                  <span>{c.name || "Unnamed"}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn btn--primary"
              onClick={handleJoin}
              disabled={!joinCharId || joining}
            >
              {joining ? "Joining…" : "Take a seat"}
            </button>
          </>
        )}
      </div>
    );
  }

  const openParticipant = openSeat
    ? (participants.find((p) => p.id === openSeat) ?? null)
    : null;

  return (
    <div className="room">
      <header className="room__bar">
        <div>
          <h1 className="room__title">{room.title}</h1>
          <p className="room__meta">
            <span className="room__code" title="Table code">
              {room.code}
            </span>
            <span className="dot">·</span>
            {isSG ? "You are the Story God" : `Playing as ${me.name}`}
            <span className="dot">·</span>
            {participants.length} at the table
          </p>
        </div>
        {isSG ? (
          <button
            type="button"
            className="mini-btn mini-btn--danger"
            onClick={handleTerminate}
            style={{ flex: "none" }}
          >
            Break up the table
          </button>
        ) : (
          <button type="button" className="mini-btn" onClick={handleLeave} style={{ flex: "none" }}>
            Leave
          </button>
        )}
      </header>

      {error && <p className="entry-error">{error}</p>}

      <div className="room__grid">
        {/* ── Party, left ── */}
        <section className="party-col">
          <div className="section-label" style={{ margin: "0 0 12px" }}>
            <h2>Party</h2>
            <span className="section-label__line" />
          </div>
          {players.length === 0 ? (
            <p className="field__note">
              Nobody yet. Share the code <strong>{room.code}</strong>.
            </p>
          ) : (
            <div className="party-col__list">
              {players.map((p) => (
                <Seat
                  key={p.id}
                  p={p}
                  isYou={p.client_id === clientId}
                  onOpen={() => {
                    if (isSG || p.client_id === clientId) setOpenSeat(p.id);
                  }}
                />
              ))}
            </div>
          )}

          {myCharacter && me && (
            <button type="button" className="own-btn" onClick={() => setOpenSeat(me.id)}>
              <ClassIcon id={myCharacter.classId} size={18} />
              <span>Your sheet</span>
              <em>health · level · gear</em>
            </button>
          )}
        </section>

        {/* ── Stage, centre ── */}
        <section className="stage">
          {sg && (
            <div className="stage__god">
              <div className="god-slot">
                <span className="god-badge__face">
                  <Art base={sg.avatar_url ?? ""} iconId="storygod" alt="" iconSize={30} />
                </span>
                <div className="godpop godpop--room" role="tooltip">
                  <div className="godpop__art">
                    <Art base={sg.avatar_url ?? ""} iconId="storygod" alt="" iconSize={56} />
                  </div>
                  <div className="godpop__body">
                    <h4>{sg.name}</h4>
                    <p>Narrates, sets difficulties, and rolls every die.</p>
                  </div>
                </div>
              </div>
              <div className="stage__god-text">
                <strong>{sg.name}</strong>
                <em>Story God</em>
              </div>
            </div>
          )}

          <div className={`stage__screen${sceneImage ? " stage__screen--photo" : ""}`}>
            {sceneImage ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element -- user upload */}
                <img className="stage__blur" src={sceneImage} alt="" aria-hidden />
                {/* eslint-disable-next-line @next/next/no-img-element -- user upload */}
                <img className="stage__photo" src={sceneImage} alt="" />
              </>
            ) : scene ? (
              <div
                className="stage__preset"
                style={{
                  background: `linear-gradient(160deg, ${scene.gradient[0]}, ${scene.gradient[1]})`,
                }}
              >
                <span className="stage__glyph">{scene.glyph}</span>
                <h2 className="stage__name">{scene.name.en}</h2>
              </div>
            ) : (
              <div className="stage__preset stage__preset--empty">
                <h2 className="stage__name stage__name--empty">No scene set</h2>
              </div>
            )}

            {(room.scene_note || (!sceneImage && scene)) && (
              <p className="stage__note">{room.scene_note || scene?.blurb.en}</p>
            )}

            {isSG && !sceneTab && (
              <div className="stage__tools">
                <button
                  type="button"
                  className="stage-btn"
                  onClick={() => setSceneTab("presets")}
                >
                  Scenes
                </button>
                <button
                  type="button"
                  className="stage-btn"
                  onClick={() => setSceneTab("images")}
                >
                  Pictures
                </button>
              </div>
            )}

            {/* The picker sits on top of the screen rather than pushing it down,
                so the Story God never loses sight of what's being shown. */}
            {isSG && sceneTab && (
              <div className="stage-overlay">
                <div className="stage-overlay__head">
                  <div className="seg">
                    <button
                      type="button"
                      className={`seg__opt${sceneTab === "presets" ? " seg__opt--on" : ""}`}
                      onClick={() => setSceneTab("presets")}
                    >
                      Scenes
                    </button>
                    <button
                      type="button"
                      className={`seg__opt${sceneTab === "images" ? " seg__opt--on" : ""}`}
                      onClick={() => setSceneTab("images")}
                    >
                      Pictures
                    </button>
                  </div>
                  <button
                    type="button"
                    className="stage-btn"
                    onClick={() => setSceneTab(null)}
                  >
                    Done
                  </button>
                </div>

                <input
                  className="text-input"
                  placeholder="Say something about it (optional)"
                  value={sceneNote}
                  maxLength={120}
                  onChange={(e) => setSceneNote(e.target.value)}
                />

                <div className="stage-overlay__body">
                  {sceneTab === "presets" ? (
                    <div className="scene-grid">
                      {SCENES.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          className={`scene-chip${room.scene_id === s.id ? " scene-chip--on" : ""}`}
                          style={{
                            background: `linear-gradient(160deg, ${s.gradient[0]}, ${s.gradient[1]})`,
                          }}
                          onClick={() => showScene({ sceneId: s.id })}
                        >
                          <span className="scene-chip__glyph">{s.glyph}</span>
                          <span className="scene-chip__name">{s.name.en}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <ImageLibrary
                      activeUrl={sceneImage}
                      onPick={(img: SgImage) => showScene({ imageUrl: img.url })}
                      compact
                    />
                  )}
                </div>

                <button
                  type="button"
                  className="stage-btn"
                  onClick={() => showScene({ sceneId: null, imageUrl: null })}
                >
                  Clear the scene
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── Dice ── */}
        <aside className="room__dice">
          <div className="section-label" style={{ margin: "0 0 14px" }}>
            <h2>{isSG ? "Dice" : "Rolls"}</h2>
            <span className="section-label__line" />
          </div>

          {!isSG && (
            <p className="field__note" style={{ marginTop: 0 }}>
              The Story God rolls for the table. Everything lands here.
            </p>
          )}

          {isSG && (
            <>
              <div className="room-ctrls">
                <div className="seg">
                  {(["disadvantage", "normal", "advantage"] as RollMode[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`seg__opt${mode === m ? " seg__opt--on" : ""}`}
                      onClick={() => setMode(m)}
                    >
                      {m === "normal" ? "Norm" : m === "advantage" ? "Adv" : "Dis"}
                    </button>
                  ))}
                </div>
                <label className="field--check" style={{ paddingBottom: 0 }}>
                  <input
                    type="checkbox"
                    checked={trained}
                    onChange={(e) => setTrained(e.target.checked)}
                  />
                  <span>+2</span>
                </label>
                <div className="seg seg--wrap">
                  <button
                    type="button"
                    className={`seg__opt${difficulty === null ? " seg__opt--on" : ""}`}
                    onClick={() => setDifficulty(null)}
                  >
                    —
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
                <label className="field--check secret-toggle" style={{ paddingBottom: 0 }}>
                  <input
                    type="checkbox"
                    checked={secret}
                    onChange={(e) => setSecret(e.target.checked)}
                  />
                  <span>Secret</span>
                </label>
              </div>

              <p className="dice-group__label">Roll for</p>
              <div className="rollfor">
                <button
                  type="button"
                  className={`rollfor__opt${rollFor === null ? " rollfor__opt--on" : ""}`}
                  onClick={() => setRollFor(null)}
                >
                  Nobody
                </button>
                {players.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`rollfor__opt${rollFor === p.id ? " rollfor__opt--on" : ""}`}
                    onClick={() => setRollFor(p.id)}
                  >
                    {p.character?.name || p.name}
                  </button>
                ))}
              </div>

              {subject ? (
                <>
                  <p className="dice-group__label">Ability check</p>
                  <div className="tray-abilities">
                    {ABILITIES.map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        className="roll-btn"
                        onClick={() => abilityCheck(a.id)}
                      >
                        <span className="roll-btn__id">{a.id}</span>
                        <span className="roll-btn__val">{subject.abilities[a.id]}</span>
                      </button>
                    ))}
                  </div>

                  <p className="dice-group__label">Attack &amp; damage</p>
                  <div className="tray-attack">
                    <button type="button" className="btn" onClick={() => attack("STR")}>
                      Atk STR
                    </button>
                    <button type="button" className="btn" onClick={() => attack("DEX")}>
                      Atk DEX
                    </button>
                    {subjectWeapon && subjectWeapon.die !== "—" && (
                      <button type="button" className="btn btn--primary" onClick={damage}>
                        Dmg {subjectWeapon.die}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <p className="field__note">
                  Rolling for nobody in particular — use the flat d20 for monsters and the world.
                </p>
              )}

              <p className="dice-group__label">Flat roll</p>
              <div className="flat-roll">
                <div className="stepper">
                  <button type="button" onClick={() => setFreeMod((m) => m - 1)}>
                    −
                  </button>
                  <span className="stepper__val">{freeMod >= 0 ? `+${freeMod}` : freeMod}</span>
                  <button type="button" onClick={() => setFreeMod((m) => m + 1)}>
                    +
                  </button>
                </div>
                <button type="button" className="btn" onClick={flatCheck}>
                  Roll d20
                </button>
              </div>

              <p className="dice-group__label">Custom</p>
              <div className="tray-custom">
                <input
                  className="text-input"
                  placeholder="2d6+3"
                  value={expr}
                  onChange={(e) => setExpr(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && custom()}
                />
                <button type="button" className="btn" onClick={() => custom()}>
                  Roll
                </button>
              </div>
              <div className="tray-quick">
                {QUICK_DICE.map((qd) => (
                  <button key={qd} type="button" className="quick-die" onClick={() => custom(qd)}>
                    {qd}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="room-log">
            {rolls.length === 0 ? (
              <p className="field__note">No rolls yet.</p>
            ) : (
              <ul className="log-list">
                {rolls.map((r) => (
                  <RoomRoll key={r.id} r={r} isSG={!!isSG} onReveal={() => revealRoll(r.id)} />
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>

      {openParticipant?.character && (
        <CharacterDrawer
          character={openParticipant.character}
          hp={
            openParticipant.hp_current ??
            derive(openParticipant.character, CLASS_BY_ID.get(openParticipant.character.classId)!)
              .hp
          }
          energy={
            openParticipant.energy_current ??
            derive(openParticipant.character, CLASS_BY_ID.get(openParticipant.character.classId)!)
              .energy
          }
          open
          canEdit={!!isSG || openParticipant.client_id === clientId}
          onClose={() => setOpenSeat(null)}
          onChange={(next, delta) => changeCharacter(openParticipant, next, delta)}
          onAdjust={(patch) => adjust(openParticipant, patch)}
        />
      )}
    </div>
  );
}

function RoomRoll({ r, isSG, onReveal }: { r: Roll; isSG: boolean; onReveal: () => void }) {
  const p = r.payload;

  if (r.hidden && !isSG) {
    return (
      <li className="log-row log-row--hidden">
        <div className="log-row__top">
          <span className="log-row__label">{r.actor_name} rolled in secret</span>
          <span className="log-row__total">?</span>
        </div>
      </li>
    );
  }

  const critClass =
    p.kind === "check" && p.crit === "success"
      ? " log-row--crit"
      : p.kind === "check" && p.crit === "fail"
        ? " log-row--fumble"
        : "";

  return (
    <li className={`log-row${critClass}${r.hidden ? " log-row--secret" : ""}`}>
      <div className="log-row__top">
        <span className="log-row__label">
          <strong className="log-actor">{r.actor_name}</strong> {p.label}
        </span>
        <span className="log-row__total">{p.total}</span>
      </div>
      <div className="log-row__detail">
        {p.kind === "check" ? (
          <span className="log-dice">
            {p.d20Rolls.length > 1 ? (
              <>
                {p.d20Rolls.map((v, i) => (
                  <em key={i} className={v === p.d20 ? "kept" : "dropped"}>
                    {v}
                  </em>
                ))}
                <span className="log-mode">{p.mode === "advantage" ? "adv" : "dis"}</span>
              </>
            ) : (
              <em className="kept">{p.d20}</em>
            )}
            <span className="log-plus">
              {p.ability >= 0 ? `+${p.ability}` : p.ability}
              {p.training ? ` +${p.training}` : ""}
            </span>
          </span>
        ) : (
          <span className="log-dice">
            {p.groups.map((g, gi) => (
              <span key={gi} className="log-group">
                {g.values.map((v, vi) => (
                  <em key={vi} className="kept">
                    {Math.abs(v)}
                  </em>
                ))}
                <span className="log-group__tag">d{g.sides}</span>
              </span>
            ))}
            {p.flat !== 0 && <span className="log-plus">{p.flat > 0 ? `+${p.flat}` : p.flat}</span>}
          </span>
        )}

        {p.kind === "check" && p.crit && (
          <span className={`log-badge log-badge--${p.crit === "success" ? "crit" : "fumble"}`}>
            {p.crit === "success" ? "NAT 20" : "NAT 1"}
          </span>
        )}
        {p.kind === "check" && p.outcome && (
          <span className={`log-badge log-badge--${p.outcome}`}>
            {p.outcome === "success" ? "Success" : "Fail"}
            {p.difficulty != null ? ` vs ${p.difficulty}` : ""}
          </span>
        )}
        {r.hidden && isSG && (
          <button type="button" className="reveal-btn" onClick={onReveal}>
            Reveal
          </button>
        )}
      </div>
    </li>
  );
}
