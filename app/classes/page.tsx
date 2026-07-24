"use client";

import Link from "next/link";
import { CLASSES } from "@/data/classes";
import { GROUPS } from "@/data/types";
import Art from "@/components/Art";
import { useLocale } from "@/components/LocaleProvider";

export default function ClassesPage() {
  const { tk, tl } = useLocale();

  return (
    <div className="shell">
      <section style={{ padding: "56px 0 8px" }}>
        <p className="eyebrow">{tk("classes.eyebrow")}</p>
        <h1 className="display" style={{ fontSize: "2.5rem", margin: "12px 0 16px" }}>
          {tk("classes.title")}
        </h1>
        <p className="lede" style={{ maxWidth: "62ch" }}>
          {tk("classes.lede")}
        </p>
      </section>

      {GROUPS.map((group) => {
        const members = CLASSES.filter((c) => c.group === group.id);
        if (members.length === 0) return null;

        return (
          <section key={group.id}>
            <div className="group-head">
              <h2>{tl(group.name)}</h2>
              <span className="group-head__line" />
              <span className="group-head__blurb">{tl(group.blurb)}</span>
            </div>

            <div className="class-grid">
              {members.map((c) => (
                <Link href={`/classes/${c.id}`} key={c.id} className="class-card">
                  <div className="class-card__art">
                    <Art base={`/images/classes/${c.id}`} iconId={c.id} alt="" iconSize={52} />
                    <span className="class-card__num">{String(c.num).padStart(2, "0")}</span>
                  </div>

                  <div className="class-card__body">
                    <h3 className="class-card__name">{tl(c.name)}</h3>
                    <p className="class-card__hook">{tl(c.hook)}</p>
                    <div className="class-card__foot">
                      <span>
                        HP <strong>{c.hpBase}</strong>
                      </span>
                      <span className="dot">·</span>
                      <span>
                        <strong>{c.priority[0]}</strong>
                      </span>
                      <span className="dot">·</span>
                      <span>
                        {c.subclasses.length} <strong>sub</strong>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
