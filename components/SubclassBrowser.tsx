"use client";

import { useState } from "react";
import type { Subclass } from "@/data/types";
import Art from "./Art";

export default function SubclassBrowser({
  subclasses,
  classId,
}: {
  subclasses: Subclass[];
  classId: string;
}) {
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
            {s.name.en}
          </button>
        ))}
      </div>

      <div className="sub-panel" role="tabpanel">
        <div className="sub-panel__head">
          <div className="sub-panel__art">
            <Art
              base={`/images/subclasses/${active.slug}`}
              iconId={classId}
              alt=""
              iconSize={40}
            />
          </div>
          <div className="sub-panel__intro">
            <h3 className="sub-panel__name">{active.name.en}</h3>
            <p className="sub-panel__tagline">{active.tagline.en}</p>
          </div>
        </div>

        <div className="sub-panel__body">
          <div>
            <div className="field__label">Domain — Effects here cost −1 Energy</div>
            <p className="field__value">{active.domain.en}</p>
          </div>

          <div className="breaker">
            <div className="field__label">Rule Breaker</div>
            <div className="breaker__name">{active.ruleBreaker.name.en}</div>
            <p className="breaker__text">{active.ruleBreaker.text.en}</p>
          </div>

          <div>
            <div className="field__label">You say</div>
            <div className="says" style={{ marginTop: 8 }}>
              {active.examples.map((ex, i) => (
                <div className="say" key={i}>
                  <span className="say__text">&ldquo;{ex.text.en}&rdquo;</span>
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
