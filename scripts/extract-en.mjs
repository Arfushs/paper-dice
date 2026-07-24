import { readFileSync, writeFileSync } from "fs";

const src = readFileSync("data/classes.ts", "utf8");
const re = /en:\s*"((?:[^"\\]|\\.)*)"/g;
const all = new Set();
let m;
while ((m = re.exec(src))) all.add(m[1]);

console.log("unique en strings:", all.size);
writeFileSync("scripts/_enstrings.json", JSON.stringify([...all], null, 2));
