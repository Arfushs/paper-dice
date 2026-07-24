"use client";

import { useState } from "react";
import type { Subclass } from "@/data/types";
import Art from "./Art";
import { useLocale } from "./LocaleProvider";

export default function SubclassBrowser({
  subclasses,
  classId,
}: {
  subclasses: Subclass[];
  classId: string;
}) {
  const { tk, tl } = useLocale();
  const [activeId, setActiveId] = useState(subclasses[0]?.id);
  const active = subclasses.find((s) => s.id === activeId) ?? subclasses[0];

  if (!active) return null;

  return (
    <div className="sub-layout">
      <div className="sub-list" role="tablist" aria-label="Subclasses">
        {subclasses.map((s) => (
          <button
            key={s.id}
            role="tab"
            type="button"
            className="sub-tab"
            aria-selected={s.id === active.id}
            onClick={() => setActiveId(s.id)}
          >
            <span className="sub-tab__dot" />
            {tl(s.name)}
          </button>
        ))}
      </div>

      <div className="sub-panel" role="tabpanel">
        <div className="sub-panel__head">
          <div className="sub-panel__art">
            <Art base={`/images/subclasses/${active.slug}`} iconId={classId} alt="" iconSize={40} />
          </div>
          <div className="sub-panel__intro">
            <h3 className="sub-panel__name">{tl(active.name)}</h3>
            <p className="sub-panel__tagline">{tl(active.tagline)}</p>
          </div>
        </div>

        <div className="sub-panel__body">
          <div>
            <div className="field__label">{tk("class.domainDiscount")}</div>
            <p className="field__value">{tl(active.domain)}</p>
          </div>

          <div className="breaker">
            <div className="field__label">{tk("class.ruleBreaker")}</div>
            <div className="breaker__name">{tl(active.ruleBreaker.name)}</div>
            <p className="breaker__text">{tl(active.ruleBreaker.text)}</p>
          </div>

          <div>
            <div className="field__label">{tk("class.youSay")}</div>
            <div className="says" style={{ marginTop: 8 }}>
              {active.examples.map((ex, i) => (
                <div className="say" key={i}>
                  <span className="say__text">&ldquo;{tl(ex.text)}&rdquo;</span>
                  <span className="say__cost">{ex.cost}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
