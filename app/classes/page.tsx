import Link from "next/link";
import { CLASSES } from "@/data/classes";
import { GROUPS } from "@/data/types";
import Art from "@/components/Art";

export const metadata = {
  title: "Classes — Paper & Dice",
};

export default function ClassesPage() {
  return (
    <div className="shell">
      <section style={{ padding: "56px 0 8px" }}>
        <p className="eyebrow">Fourteen ways in</p>
        <h1 className="display" style={{ fontSize: "2.5rem", margin: "12px 0 16px" }}>
          Classes
        </h1>
        <p className="lede" style={{ maxWidth: "62ch" }}>
          Pick one at level 1. Its Domain decides what you can invent Effects about.
          At level 3 you choose a subclass — that narrows the Domain, makes it cheaper,
          and hands you one rule you are allowed to break.
        </p>
      </section>

      {GROUPS.map((group) => {
        const members = CLASSES.filter((c) => c.group === group.id);
        if (members.length === 0) return null;

        return (
          <section key={group.id}>
            <div className="group-head">
              <h2>{group.name.en}</h2>
              <span className="group-head__line" />
              <span className="group-head__blurb">{group.blurb.en}</span>
            </div>

            <div className="class-grid">
              {members.map((c) => (
                <Link href={`/classes/${c.id}`} key={c.id} className="class-card">
                  <div className="class-card__art">
                    <Art
                      base={`/images/classes/${c.id}`}
                      iconId={c.id}
                      alt=""
                      iconSize={52}
                    />
                    <span className="class-card__num">
                      {String(c.num).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="class-card__body">
                    <h3 className="class-card__name">{c.name.en}</h3>
                    <p className="class-card__hook">{c.hook.en}</p>
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
