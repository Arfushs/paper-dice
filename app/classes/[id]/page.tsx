import Link from "next/link";
import { notFound } from "next/navigation";
import { CLASSES, CLASS_BY_ID } from "@/data/classes";
import { GROUPS } from "@/data/types";
import ClassIcon from "@/components/ClassIcon";
import Art from "@/components/Art";
import SubclassBrowser from "@/components/SubclassBrowser";

export function generateStaticParams() {
  return CLASSES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cls = CLASS_BY_ID.get(id);
  return { title: cls ? `${cls.name.en} — Paper & Dice` : "Paper & Dice" };
}

export default async function ClassPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cls = CLASS_BY_ID.get(id);
  if (!cls) notFound();

  const group = GROUPS.find((g) => g.id === cls.group);

  return (
    <div className="shell">
      <Link href="/classes" className="backlink">
        ← All classes
      </Link>

      <div className="detail-head">
        <div>
          <p className="eyebrow">
            {String(cls.num).padStart(2, "0")} · {group?.name.en}
          </p>

          <div className="detail-title">
            <span className="icon-frame">
              <ClassIcon id={cls.id} size={34} />
            </span>
            <h1>{cls.name.en}</h1>
          </div>

          <p className="epigraph">{cls.hook.en}</p>

          <div className="stats">
            <div className="stat">
              <div className="stat__label">HP Base</div>
              <div className="stat__value stat__value--accent">{cls.hpBase}</div>
            </div>
            <div className="stat" style={{ gridColumn: "span 2" }}>
              <div className="stat__label">Ability priority</div>
              <div className="stat__value prio">
                {cls.priority.map((p, i) => (
                  <span key={p} style={{ display: "contents" }}>
                    {i > 0 && <span className="prio__arrow">▸</span>}
                    <span>{p}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="stat">
              <div className="stat__label">Subclasses</div>
              <div className="stat__value">{cls.subclasses.length}</div>
            </div>
          </div>
        </div>

        <div className="detail-art">
          <Art base={`/images/classes/${cls.id}`} iconId={cls.id} alt="" iconSize={64} />
        </div>
      </div>

      <div className="section-label">
        <h2>Plays like</h2>
        <span className="section-label__line" />
      </div>
      <p className="lede" style={{ maxWidth: "72ch" }}>
        {cls.playsLike.en}
      </p>

      <div className="section-label">
        <h2>Domain</h2>
        <span className="section-label__line" />
      </div>
      <p className="epigraph" style={{ maxWidth: "70ch" }}>
        {cls.domain.en}
      </p>
      <p className="section-note" style={{ marginTop: 10 }}>
        Kit — {cls.kit.en}
      </p>

      <div className="section-label">
        <h2>Signature</h2>
        <span className="section-label__line" />
      </div>
      <div className="sig">
        <div className="sig__label">Yours from level 1</div>
        <div className="sig__name">{cls.signature.name.en}</div>
        <p className="sig__text">{cls.signature.text.en}</p>
      </div>
      {cls.signatureExtra && (
        <div className="sig">
          <div className="sig__label">And</div>
          <div className="sig__name">{cls.signatureExtra.name.en}</div>
          <p className="sig__text">{cls.signatureExtra.text.en}</p>
        </div>
      )}

      <div className="section-label">
        <h2>You say</h2>
        <span className="section-label__line" />
      </div>
      <p className="section-note">
        Examples, not a menu. There is no spell list — you describe it, the Story God
        prices it.
      </p>
      <div className="says">
        {cls.examples.map((ex, i) => (
          <div className="say" key={i}>
            <span className="say__text">&ldquo;{ex.text.en}&rdquo;</span>
            <span className="say__cost">{ex.cost}</span>
          </div>
        ))}
      </div>

      <div className="section-label">
        <h2>Subclasses</h2>
        <span className="section-label__line" />
      </div>
      <p className="section-note">Chosen at level 3.</p>
      <SubclassBrowser subclasses={cls.subclasses} classId={cls.id} />
    </div>
  );
}
