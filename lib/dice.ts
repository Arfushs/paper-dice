/**
 * The dice engine — pure functions, no UI. This is the mechanical heart of the
 * game (RULES.md §2) and will be reused verbatim once rolls become shared in a
 * live session: the Story God rolls, everyone sees the same breakdown.
 */

export type RollMode = "normal" | "advantage" | "disadvantage";

export const DIFFICULTIES: { label: string; value: number }[] = [
  { label: "Easy", value: 8 },
  { label: "Moderate", value: 12 },
  { label: "Hard", value: 16 },
  { label: "Extreme", value: 20 },
];

function d(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

/** Roll the d20, honouring advantage (keep higher) or disadvantage (keep lower). */
export function rollD20(mode: RollMode): { kept: number; rolls: number[] } {
  if (mode === "normal") {
    const r = d(20);
    return { kept: r, rolls: [r] };
  }
  const a = d(20);
  const b = d(20);
  const kept = mode === "advantage" ? Math.max(a, b) : Math.min(a, b);
  return { kept, rolls: [a, b] };
}

export interface CheckResult {
  kind: "check";
  label: string;
  mode: RollMode;
  d20Rolls: number[]; // one, or two if adv/dis
  d20: number; // the kept die
  ability: number; // ability score contributed
  training: number; // +2 or 0
  total: number;
  crit: "success" | "fail" | null; // natural 20 / natural 1
  difficulty: number | null;
  outcome: "success" | "fail" | null;
  at: number;
}

export function rollCheck(input: {
  label: string;
  ability: number;
  training: number; // 0 or 2
  mode: RollMode;
  difficulty: number | null;
}): CheckResult {
  const { kept, rolls } = rollD20(input.mode);
  const total = kept + input.ability + input.training;

  const crit = kept === 20 ? "success" : kept === 1 ? "fail" : null;

  let outcome: "success" | "fail" | null = null;
  if (input.difficulty != null) {
    // A natural 20 always succeeds; a natural 1 always fails (RULES.md §2).
    if (crit === "success") outcome = "success";
    else if (crit === "fail") outcome = "fail";
    else outcome = total >= input.difficulty ? "success" : "fail";
  }

  return {
    kind: "check",
    label: input.label,
    mode: input.mode,
    d20Rolls: rolls,
    d20: kept,
    ability: input.ability,
    training: input.training,
    total,
    crit,
    difficulty: input.difficulty,
    outcome,
    at: Date.now(),
  };
}

// ── free-form dice expressions: "2d6", "d20+3", "1d8 + 2d4 + 1" ──────────────

export interface ExprGroup {
  sides: number;
  values: number[];
}

export interface ExprResult {
  kind: "expr";
  label: string;
  expr: string;
  groups: ExprGroup[];
  flat: number;
  total: number;
  at: number;
}

/** Roll a dice expression. Returns null if nothing parseable was found. */
export function rollExpr(raw: string, label?: string): ExprResult | null {
  const expr = raw.trim().toLowerCase().replace(/\s+/g, "");
  if (!expr) return null;

  // Split into signed terms: 2d6, -1d4, +3 …
  const termRe = /([+-]?)(\d*)d(\d+)|([+-]?)(\d+)/g;
  const groups: ExprGroup[] = [];
  let flat = 0;
  let matched = false;

  for (const m of expr.matchAll(termRe)) {
    matched = true;
    if (m[3]) {
      // a dice term
      const sign = m[1] === "-" ? -1 : 1;
      const count = Math.min(m[2] === "" ? 1 : parseInt(m[2], 10), 100);
      const sides = parseInt(m[3], 10);
      if (sides < 1) continue;
      const values = Array.from({ length: count }, () => d(sides) * sign);
      groups.push({ sides, values });
    } else if (m[5]) {
      // a flat modifier
      const sign = m[4] === "-" ? -1 : 1;
      flat += sign * parseInt(m[5], 10);
    }
  }

  if (!matched) return null;

  const diceSum = groups.reduce((s, g) => s + g.values.reduce((a, b) => a + b, 0), 0);

  return {
    kind: "expr",
    label: label ?? raw.trim(),
    expr,
    groups,
    flat,
    total: diceSum + flat,
    at: Date.now(),
  };
}

export type RollResult = CheckResult | ExprResult;
