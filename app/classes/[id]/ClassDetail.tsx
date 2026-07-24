"use client";

import Link from "next/link";
import { CLASS_BY_ID } from "@/data/classes";
import { GROUPS } from "@/data/types";
import ClassIcon from "@/components/ClassIcon";
import Art from "@/components/Art";
import SubclassBrowser from "@/components/SubclassBrowser";
import { useLocale } from "@/components/LocaleProvider";

export default function ClassDetail({ id }: { id: string }) {
  const { tk, tl } = useLocale();
  const cls = CLASS_BY_ID.get(id);
  if (!cls) return null;

  const group = GROUPS.find((g) => g.id === cls.group);

  return (
    <div className="shell">
      <Link href="/classes" className="backlink">
        {tk("class.back")}
      </Link>

      <div className="detail-head">
        <div>
          <p className="eyebrow">
            {String(cls.num).padStart(2, "0")} · {group ? tl(group.name) : ""}
          </p>

          <div className="detail-title">
            <span className="icon-frame">
              <ClassIcon id={cls.id} size={34} />
            </span>
            <h1>{tl(cls.name)}</h1>
          </div>

          <p className="epigraph">{tl(cls.hook)}</p>

          <div className="stats">
            <div className="stat">
              <div className="stat__label">{tk("class.hpBase")}</div>
              <div className="stat__value stat__value--accent">{cls.hpBase}</div>
            </div>
            <div className="stat" style={{ gridColumn: "span 2" }}>
              <div className="stat__label">{tk("class.priority")}</div>
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
              <div className="stat__label">{tk("class.subCount")}</div>
              <div className="stat__value">{cls.subclasses.length}</div>
            </div>
          </div>
        </div>

        <div className="detail-art">
          <Art base={`/images/classes/${cls.id}`} iconId={cls.id} alt="" iconSize={64} />
        </div>
      </div>

      <div className="section-label">
        <h2>{tk("class.playsLike")}</h2>
        <span className="section-label__line" />
      </div>
      <p className="lede" style={{ maxWidth: "72ch" }}>
        {tl(cls.playsLike)}
      </p>

      <div className="section-label">
        <h2>{tk("class.domain")}</h2>
        <span className="section-label__line" />
      </div>
      <p className="epigraph" style={{ maxWidth: "70ch" }}>
        {tl(cls.domain)}
      </p>
      <p className="section-note" style={{ marginTop: 10 }}>
        {tk("class.kit")} — {tl(cls.kit)}
      </p>

      <div className="section-label">
        <h2>{tk("class.signature")}</h2>
        <span className="section-label__line" />
      </div>
      <div className="sig">
        <div className="sig__label">{tk("class.sigFromLv1")}</div>
        <div className="sig__name">{tl(cls.signature.name)}</div>
        <p className="sig__text">{tl(cls.signature.text)}</p>
      </div>
      {cls.signatureExtra && (
        <div className="sig">
          <div className="sig__label">{tk("class.and")}</div>
          <div className="sig__name">{tl(cls.signatureExtra.name)}</div>
          <p className="sig__text">{tl(cls.signatureExtra.text)}</p>
        </div>
      )}

      <div className="section-label">
        <h2>{tk("class.youSay")}</h2>
        <span className="section-label__line" />
      </div>
      <p className="section-note">{tk("class.youSayNote")}</p>
      <div className="says">
        {cls.examples.map((ex, i) => (
          <div className="say" key={i}>
            <span className="say__text">&ldquo;{tl(ex.text)}&rdquo;</span>
            <span className="say__cost">{ex.cost}</span>
          </div>
        ))}
      </div>

      <div className="section-label">
        <h2>{tk("class.subclasses")}</h2>
        <span className="section-label__line" />
      </div>
      <p className="section-note">{tk("class.chosenAt3")}</p>
      <SubclassBrowser subclasses={cls.subclasses} classId={cls.id} />
    </div>
  );
}
