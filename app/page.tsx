import Link from "next/link";
import { CLASSES } from "@/data/classes";
import ClassIcon from "@/components/ClassIcon";

const PILLARS = [
  {
    title: "One roll for everything",
    body: "d20 + your ability + training, against a number the Story God says out loud. Picking a lock, swinging a sword, talking a guard down — same roll every time.",
  },
  {
    title: "No spell list",
    body: "You describe what you want. The Story God prices it in Energy from a single table. A wizard's fireball and a knight's chandelier stunt go through the same door.",
  },
  {
    title: "No battle map",
    body: "Combat happens in four zones — Engaged, Near, Far, Distant. No grid, no counting squares, no measuring.",
  },
  {
    title: "One resource",
    body: "Energy. No spell slots, no per-day counters, no separate pools. A single number, spent and recovered.",
  },
];

export default function Home() {
  return (
    <div className="shell">
      <section className="hero">
        <p className="eyebrow">A tabletop RPG for the web</p>
        <h1 className="hero__title">
          Paper
          <em>&amp;</em>
          Dice
        </h1>
        <p className="hero__sub">
          Fourteen classes. Fifty-one subclasses. One Story God who rolls the dice,
          sets the difficulty, and decides what it costs.
        </p>
        <div className="hero__actions">
          <Link href="/characters/new" className="btn btn--primary">
            Create a character
          </Link>
          <Link href="/classes" className="btn">
            Browse the classes
          </Link>
          <Link href="/rules" className="btn">
            Read the rules
          </Link>
        </div>
      </section>

      <div className="rule">
        <span className="rule__mark">◆</span>
      </div>

      <section className="pillars">
        {PILLARS.map((p) => (
          <div className="pillar" key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </div>
        ))}
      </section>

      <div className="section-label">
        <h2>The Roster</h2>
        <span className="section-label__line" />
      </div>
      <p className="section-note">
        Every class is four things: how much punishment you take, where your points go,
        what you may invent about, and the one trick that is yours alone.
      </p>

      <div className="roster-strip">
        {CLASSES.map((c) => (
          <Link href={`/classes/${c.id}`} key={c.id} className="roster-chip" title={c.name.en}>
            <ClassIcon id={c.id} size={26} />
            <span>{c.name.en}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
