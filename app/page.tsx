"use client";

import Link from "next/link";
import { CLASSES } from "@/data/classes";
import ClassIcon from "@/components/ClassIcon";
import { useLocale } from "@/components/LocaleProvider";

export default function Home() {
  const { tk, tl } = useLocale();

  const pillars = [
    { t: tk("home.pillar1.t"), b: tk("home.pillar1.b") },
    { t: tk("home.pillar2.t"), b: tk("home.pillar2.b") },
    { t: tk("home.pillar3.t"), b: tk("home.pillar3.b") },
    { t: tk("home.pillar4.t"), b: tk("home.pillar4.b") },
  ];

  return (
    <div className="shell">
      <section className="hero">
        <p className="eyebrow">{tk("home.eyebrow")}</p>
        <h1 className="hero__title">
          Paper
          <em>&amp;</em>
          Dice
        </h1>
        <p className="hero__sub">{tk("home.sub")}</p>
        <div className="hero__actions">
          <Link href="/characters/new" className="btn btn--primary">
            {tk("home.create")}
          </Link>
          <Link href="/classes" className="btn">
            {tk("home.browse")}
          </Link>
          <Link href="/rules" className="btn">
            {tk("home.read")}
          </Link>
        </div>
      </section>

      <div className="rule">
        <span className="rule__mark">◆</span>
      </div>

      <section className="pillars">
        {pillars.map((p) => (
          <div className="pillar" key={p.t}>
            <h3>{p.t}</h3>
            <p>{p.b}</p>
          </div>
        ))}
      </section>

      <div className="section-label">
        <h2>{tk("home.roster")}</h2>
        <span className="section-label__line" />
      </div>
      <p className="section-note">{tk("home.rosterNote")}</p>

      <div className="roster-strip">
        {CLASSES.map((c) => (
          <Link href={`/classes/${c.id}`} key={c.id} className="roster-chip" title={tl(c.name)}>
            <ClassIcon id={c.id} size={26} />
            <span>{tl(c.name)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
