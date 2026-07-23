import { requireSupabase } from "./supabase";
import type { Character } from "@/data/character";
import type { RollResult } from "./dice";

// ── row shapes ──────────────────────────────────────────────────────────────

export interface Room {
  id: string;
  code: string;
  title: string;
  scene_id: string | null;
  /** An uploaded picture, shown in place of a preset scene when set. */
  scene_image_url: string | null;
  scene_note: string | null;
  turn_index: number | null;
  turn_order: string[];
  created_at: string;
  updated_at: string;
}

export type Role = "sg" | "player";

export interface Participant {
  id: string;
  room_id: string;
  client_id: string;
  name: string;
  role: Role;
  avatar_url: string | null;
  character: Character | null;
  hp_current: number | null;
  energy_current: number | null;
  conditions: string[];
  initiative: number | null;
  joined_at: string;
  updated_at: string;
}

export interface Roll {
  id: string;
  room_id: string;
  actor_name: string;
  actor_role: Role;
  payload: RollResult;
  hidden: boolean;
  created_at: string;
}

// ── browser identity ────────────────────────────────────────────────────────

const CLIENT_KEY = "pd-client-id";

/**
 * A stable per-browser id. There is no login, so this is what lets someone
 * reclaim their seat after a refresh and lets the UI know which card is theirs.
 */
export function getClientId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(CLIENT_KEY);
  if (!id) {
    id = `p_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
    window.localStorage.setItem(CLIENT_KEY, id);
  }
  return id;
}

// Ambiguous glyphs (0/O, 1/I/L) left out so codes can be read aloud.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function makeRoomCode(length = 5): string {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return out;
}

export function normalizeCode(raw: string): string {
  return raw.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

// ── rooms ───────────────────────────────────────────────────────────────────

export async function createRoom(
  title: string,
  sgName: string,
  avatarUrl?: string | null,
): Promise<Room> {
  const sb = requireSupabase();

  // Codes are short, so a collision is possible; retry a few times.
  for (let attempt = 0; attempt < 6; attempt++) {
    const code = makeRoomCode();
    const { data, error } = await sb
      .from("rooms")
      .insert({ code, title: title.trim() || "A new table" })
      .select()
      .single();

    if (!error && data) {
      const room = data as Room;
      await sb.from("participants").insert({
        room_id: room.id,
        client_id: getClientId(),
        name: sgName.trim() || "Story God",
        role: "sg",
        avatar_url: avatarUrl ?? null,
      });
      return room;
    }
    // 23505 = unique violation on `code`; anything else is a real failure.
    if (error && error.code !== "23505") throw error;
  }
  throw new Error("Could not allocate a free room code. Try again.");
}

export async function findRoom(code: string): Promise<Room | null> {
  const sb = requireSupabase();
  const { data, error } = await sb
    .from("rooms")
    .select()
    .eq("code", normalizeCode(code))
    .maybeSingle();
  if (error) throw error;
  return (data as Room) ?? null;
}

/**
 * Set the backdrop. A preset scene and an uploaded picture are mutually
 * exclusive — showing one clears the other.
 */
export async function setScene(
  roomId: string,
  scene: { sceneId?: string | null; imageUrl?: string | null; note?: string | null },
): Promise<void> {
  const sb = requireSupabase();
  const patch: Record<string, string | null> = {};
  if ("sceneId" in scene) {
    patch.scene_id = scene.sceneId ?? null;
    if (scene.sceneId) patch.scene_image_url = null;
  }
  if ("imageUrl" in scene) {
    patch.scene_image_url = scene.imageUrl ?? null;
    if (scene.imageUrl) patch.scene_id = null;
  }
  if ("note" in scene) patch.scene_note = scene.note ?? null;

  const { error } = await sb.from("rooms").update(patch).eq("id", roomId);
  if (error) throw error;
}

export async function setTurn(
  roomId: string,
  turnOrder: string[],
  turnIndex: number | null,
): Promise<void> {
  const sb = requireSupabase();
  const { error } = await sb
    .from("rooms")
    .update({ turn_order: turnOrder, turn_index: turnIndex })
    .eq("id", roomId);
  if (error) throw error;
}

// ── participants ────────────────────────────────────────────────────────────

export async function listParticipants(roomId: string): Promise<Participant[]> {
  const sb = requireSupabase();
  const { data, error } = await sb
    .from("participants")
    .select()
    .eq("room_id", roomId)
    .order("joined_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Participant[];
}

/**
 * Take a seat. Re-joining from the same browser updates the existing row rather
 * than creating a duplicate, so a refresh keeps your place at the table.
 */
export async function joinRoom(
  roomId: string,
  name: string,
  character: Character | null,
  hp: number | null,
  energy: number | null,
): Promise<Participant> {
  const sb = requireSupabase();
  const { data, error } = await sb
    .from("participants")
    .upsert(
      {
        room_id: roomId,
        client_id: getClientId(),
        name: name.trim() || "Someone",
        role: "player" as Role,
        character,
        hp_current: hp,
        energy_current: energy,
      },
      { onConflict: "room_id,client_id" },
    )
    .select()
    .single();
  if (error) throw error;
  return data as Participant;
}

export async function updateParticipant(
  id: string,
  patch: Partial<
    Pick<
      Participant,
      | "hp_current"
      | "energy_current"
      | "conditions"
      | "initiative"
      | "name"
      | "avatar_url"
      | "character"
    >
  >,
): Promise<void> {
  const sb = requireSupabase();
  const { error } = await sb.from("participants").update(patch).eq("id", id);
  if (error) throw error;
}

// ── remembering where you were sitting ──────────────────────────────────────

const LAST_TABLE_KEY = "pd-last-table";

/** Your seat survives navigating away; only Leave gives it up. */
export function rememberTable(code: string): void {
  try {
    window.localStorage.setItem(LAST_TABLE_KEY, code);
  } catch {
    /* private mode */
  }
}

export function forgetTable(): void {
  try {
    window.localStorage.removeItem(LAST_TABLE_KEY);
  } catch {
    /* private mode */
  }
}

export function recallTable(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(LAST_TABLE_KEY);
  } catch {
    return null;
  }
}

export async function leaveRoom(participantId: string): Promise<void> {
  const sb = requireSupabase();
  await sb.from("participants").delete().eq("id", participantId);
}

/**
 * End the session for everyone. Participants and rolls cascade away with the
 * room, and every connected client gets the DELETE event and shows itself out.
 */
export async function deleteRoom(roomId: string): Promise<void> {
  const sb = requireSupabase();
  const { error } = await sb.from("rooms").delete().eq("id", roomId);
  if (error) throw error;
}

// ── rolls ───────────────────────────────────────────────────────────────────

export async function listRolls(roomId: string, limit = 50): Promise<Roll[]> {
  const sb = requireSupabase();
  const { data, error } = await sb
    .from("rolls")
    .select()
    .eq("room_id", roomId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as Roll[];
}

export async function postRoll(input: {
  roomId: string;
  actorName: string;
  actorRole: Role;
  payload: RollResult;
  hidden?: boolean;
}): Promise<void> {
  const sb = requireSupabase();
  const { error } = await sb.from("rolls").insert({
    room_id: input.roomId,
    actor_name: input.actorName,
    actor_role: input.actorRole,
    payload: input.payload,
    hidden: input.hidden ?? false,
  });
  if (error) throw error;
}

export async function revealRoll(rollId: string): Promise<void> {
  const sb = requireSupabase();
  await sb.from("rolls").update({ hidden: false }).eq("id", rollId);
}

// ── realtime ────────────────────────────────────────────────────────────────

export interface RoomHandlers {
  onRoom?: (room: Room) => void;
  onRoomClosed?: () => void;
  onParticipants?: () => void;
  onRoll?: (roll: Roll) => void;
}

/**
 * Subscribe to everything happening in a room. Participant changes just signal
 * "refetch" — the list is small and that keeps ordering and upserts simple.
 */
export function subscribeRoom(roomId: string, handlers: RoomHandlers): () => void {
  const sb = requireSupabase();

  const channel = sb
    .channel(`room:${roomId}`)
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "rooms", filter: `id=eq.${roomId}` },
      (payload) => handlers.onRoom?.(payload.new as Room),
    )
    .on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "rooms" },
      (payload) => {
        // DELETE payloads carry only the primary key, and filters don't apply.
        if ((payload.old as { id?: string })?.id === roomId) handlers.onRoomClosed?.();
      },
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "participants", filter: `room_id=eq.${roomId}` },
      () => handlers.onParticipants?.(),
    )
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "rolls", filter: `room_id=eq.${roomId}` },
      (payload) => handlers.onRoll?.(payload.new as Roll),
    )
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "rolls", filter: `room_id=eq.${roomId}` },
      (payload) => handlers.onRoll?.(payload.new as Roll),
    )
    .subscribe();

  return () => {
    sb.removeChannel(channel);
  };
}
