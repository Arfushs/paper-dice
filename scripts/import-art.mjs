#!/usr/bin/env node
/**
 * Imports generated artwork into public/images, renaming it to the filenames the
 * app expects.
 *
 * Firefly and Gemini name downloads after the prompt, and since the style block
 * comes first every file is called the same thing — the name carries no
 * information. So this matches on **download order** instead: generate and
 * download in the order the classes are listed, then run this.
 *
 *   node scripts/import-art.mjs            # dry run — shows what it would do
 *   node scripts/import-art.mjs --apply    # actually move and rename
 *   node scripts/import-art.mjs --list     # what's still missing
 *
 *   --from <dir>   source folder (default: your Downloads)
 *   --subclasses   fill subclass slots instead of class slots
 */

import {
  readdirSync,
  readFileSync,
  statSync,
  renameSync,
  copyFileSync,
  existsSync,
  mkdirSync,
} from "fs";
import { join, extname, basename } from "path";
import { homedir } from "os";
import { fileURLToPath } from "url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const IMAGES = join(ROOT, "public", "images");
const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const val = (f, d) => {
  const i = args.indexOf(f);
  return i >= 0 && args[i + 1] ? args[i + 1] : d;
};

const APPLY = has("--apply");
const SUBS = has("--subclasses");
const FROM = val("--from", join(homedir(), "Downloads"));

// ── canonical names, read straight from the class data so they can never drift ──
function canonicalNames() {
  const src = readFileSync(join(ROOT, "data", "classes.ts"), "utf8");
  const classes = [...src.matchAll(/^    id: "([^"]+)"/gm)].map((m) => m[1]);
  const subclasses = [...src.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
  return { classes, subclasses };
}

const { classes, subclasses } = canonicalNames();
const targetDir = join(IMAGES, SUBS ? "subclasses" : "classes");
const names = SUBS ? subclasses : classes;

function alreadyThere(name) {
  return [...EXTS].some((e) => existsSync(join(targetDir, name + e)));
}

const missing = names.filter((n) => !alreadyThere(n));

// ── --list ──────────────────────────────────────────────────────────────────
if (has("--list")) {
  const done = names.length - missing.length;
  console.log(`\n${SUBS ? "Subclass" : "Class"} art — ${done}/${names.length} present\n`);
  for (const n of names) {
    console.log(`  ${alreadyThere(n) ? "✓" : "·"}  ${n}`);
  }
  console.log(`\n${missing.length} still missing.`);
  if (!SUBS) console.log(`Run with --subclasses to see the other 51.\n`);
  process.exit(0);
}

// ── gather source files, oldest first ───────────────────────────────────────
if (!existsSync(FROM)) {
  console.error(`Source folder not found: ${FROM}`);
  console.error(`Pass one with --from "C:\\path\\to\\folder"`);
  process.exit(1);
}

const incoming = readdirSync(FROM)
  .filter((f) => EXTS.has(extname(f).toLowerCase()))
  .map((f) => ({ file: f, path: join(FROM, f), time: statSync(join(FROM, f)).mtimeMs }))
  .sort((a, b) => a.time - b.time);

if (incoming.length === 0) {
  console.log(`No images found in ${FROM}`);
  process.exit(0);
}

if (missing.length === 0) {
  console.log(`All ${names.length} ${SUBS ? "subclass" : "class"} images are already in place.`);
  process.exit(0);
}

const pairs = incoming.slice(0, missing.length).map((src, i) => ({ src, target: missing[i] }));

// ── report ──────────────────────────────────────────────────────────────────
console.log(`\nSource: ${FROM}`);
console.log(`Target: ${targetDir}`);
console.log(`Found ${incoming.length} image(s), ${missing.length} slot(s) open.\n`);
console.log(`  ${"downloaded (oldest first)".padEnd(46)} →  becomes`);
console.log(`  ${"-".repeat(46)}    ${"-".repeat(30)}`);

for (const { src, target } of pairs) {
  const short = src.file.length > 44 ? src.file.slice(0, 41) + "..." : src.file;
  console.log(`  ${short.padEnd(46)} →  ${target}${extname(src.file).toLowerCase()}`);
}

if (incoming.length > missing.length) {
  console.log(`\n  ${incoming.length - missing.length} extra file(s) ignored — no slots left.`);
}

if (!APPLY) {
  console.log(`\nDry run. Check the mapping above, then re-run with --apply.`);
  console.log(`If the order is wrong, move the offending files out of the folder and go again.\n`);
  process.exit(0);
}

// ── apply ───────────────────────────────────────────────────────────────────
mkdirSync(targetDir, { recursive: true });

let moved = 0;
for (const { src, target } of pairs) {
  const dest = join(targetDir, target + extname(src.file).toLowerCase());
  try {
    renameSync(src.path, dest); // same volume — instant
  } catch {
    copyFileSync(src.path, dest); // across volumes
  }
  moved++;
}

console.log(`\nMoved ${moved} file(s) into ${targetDir}.`);
const left = names.filter((n) => !alreadyThere(n)).length;
console.log(left ? `${left} slot(s) still open.\n` : `That set is complete.\n`);
