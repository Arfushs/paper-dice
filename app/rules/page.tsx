export const metadata = { title: "Rules — Paper & Dice" };

const DIFFICULTIES = [
  ["Easy", "8", "You'd probably manage this on a bad day"],
  ["Moderate", "12", "A real attempt, could go either way"],
  ["Hard", "16", "Requires talent or preparation"],
  ["Extreme", "20", "Heroes only"],
];

const PRICING = [
  ["Deals more than one die of damage", "+1 per extra d6"],
  ["Hits everyone in a zone, or several targets", "+1"],
  ["Reaches Far or Distant", "+1"],
  ["Imposes a Condition", "+1"],
  ["Lasts the whole scene", "+1"],
  ["Lasts beyond the scene — hours, days", "+2"],
  ["Does something no mortal can do — fly, walk through stone", "+2"],
];

const DOMAIN_COST = [
  ["Inside your Subclass Domain", "−1 Energy (minimum 1)"],
  ["Inside your Class Domain", "normal price"],
  ["Outside your Class Domain", "double, and roll at disadvantage"],
  ["Outside anything plausible", "the Story God says no"],
];

const CAPS = [
  ["1–2", "2"],
  ["3–4", "3"],
  ["5–6", "4"],
  ["7–8", "5"],
  ["9–10", "6"],
];

const ZONES = [
  ["Engaged", "Melee only"],
  ["Near", "Thrown, most spells"],
  ["Far", "Bows, long spells"],
  ["Distant", "Sniping, or off the field"],
];

export default function RulesPage() {
  return (
    <div className="shell">
      <section style={{ padding: "56px 0 0" }}>
        <p className="eyebrow">The whole system</p>
        <h1 className="display" style={{ fontSize: "2.5rem", margin: "12px 0 16px" }}>
          Core Rules
        </h1>
        <p className="lede" style={{ maxWidth: "64ch" }}>
          One roll, one resource, four zones, no spell list. Everything else is the
          Story God&rsquo;s judgement — and the golden rule is that if the rules and the
          story disagree, the story wins.
        </p>
      </section>

      <div className="prose">
        <h2>The One Roll</h2>
        <p>Everything in this game resolves the same way.</p>
        <code className="formula">d20 + Ability + Training vs. Difficulty</code>
        <p>
          <strong>Ability</strong> is one of the six scores, 1&ndash;5. The score{" "}
          <em>is</em> the modifier — there is no lookup table.{" "}
          <strong>Training</strong> adds <span className="num">+2</span> when a skill you
          are trained in applies. Meet or beat the number to succeed.
        </p>

        <table className="book">
          <thead>
            <tr>
              <th>Difficulty</th>
              <th>Target</th>
              <th>Feels like</th>
            </tr>
          </thead>
          <tbody>
            {DIFFICULTIES.map(([name, target, feel]) => (
              <tr key={name}>
                <td>{name}</td>
                <td className="num">{target}</td>
                <td>{feel}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Criticals</h3>
        <p>
          <strong>Natural 20</strong> — double the weapon or spell <em>dice</em>, not the
          modifier. Outside combat you succeed and gain something extra.{" "}
          <strong>Natural 1</strong> — you fail, and the Story God introduces a
          complication.
        </p>

        <h3>Advantage &amp; disadvantage</h3>
        <p>
          Roll <strong>2d20</strong>, keep the higher or the lower. They never stack, and
          one of each cancels out. Hand out advantage freely for clever plans — it is the
          cheapest reward in the game.
        </p>

        <h2>Your Character</h2>
        <p>
          Every ability starts at <span className="num">1</span>. Distribute{" "}
          <span className="num">8</span> points. Nothing may exceed{" "}
          <span className="num">4</span> at level 1. Then pick three trained skills, take
          your class kit, and answer three questions: where are you from, who do you owe,
          and what do you want. The Story God will use all three against you.
        </p>

        <table className="book">
          <thead>
            <tr>
              <th>Value</th>
              <th>Formula</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hit Points</td>
              <td className="num">Class HP Base + (CON × 3) + ((Level − 1) × 4)</td>
            </tr>
            <tr>
              <td>Energy</td>
              <td className="num">(Primary × 3) + ((Level − 1) × 2)</td>
            </tr>
            <tr>
              <td>Defense</td>
              <td className="num">10 + DEX + Armor + Shield</td>
            </tr>
            <tr>
              <td>Initiative</td>
              <td className="num">d20 + DEX</td>
            </tr>
          </tbody>
        </table>

        <h2>Zones, Not Grids</h2>
        <p>
          There is no battle map. Every fight is divided into four abstract bands. A{" "}
          <strong>Move</strong> shifts you one zone; leaving <em>Engaged</em> lets the
          enemy take a free swing unless you Disengage.
        </p>
      </div>

      <div className="zones">
        {ZONES.map(([name, note], i) => (
          <span key={name} style={{ display: "contents" }}>
            {i > 0 && <span className="zone-arrow">→</span>}
            <div className="zone">
              <div className="zone__name">{name}</div>
              <div className="zone__note">{note}</div>
            </div>
          </span>
        ))}
      </div>

      <div className="prose">
        <h2>Domains &amp; Effects</h2>
        <p>
          <strong>There is no spell list.</strong> There is no maneuver list either.
          Every character has a <strong>Domain</strong> — the slice of the world their
          power reaches into. Inside it, they invent. The Story God prices what they
          invent. This is the same rule for a wizard&rsquo;s fireball and a
          knight&rsquo;s improbable chandelier stunt.
        </p>

        <h3>Where the effect falls</h3>
        <table className="book">
          <tbody>
            {DOMAIN_COST.map(([where, cost]) => (
              <tr key={where}>
                <td>{where}</td>
                <td className="num">{cost}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>What it costs</h3>
        <p>
          Base cost is <span className="num">1 Energy</span>. Then add:
        </p>
        <table className="book">
          <thead>
            <tr>
              <th>The effect…</th>
              <th>Energy</th>
            </tr>
          </thead>
          <tbody>
            {PRICING.map(([what, cost]) => (
              <tr key={what}>
                <td>{what}</td>
                <td className="num">{cost}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>The cap</h3>
        <p>
          You may never spend more than this on a single Effect, however much Energy you
          have. This is what keeps power in check — a level-2 character{" "}
          <em>may</em> describe levelling the village, it just prices at 5 and they can
          spend 2. No argument needed; the table answers.
        </p>
        <table className="book">
          <thead>
            <tr>
              <th>Levels</th>
              <th>Max Energy per Effect</th>
            </tr>
          </thead>
          <tbody>
            {CAPS.map(([lv, cap]) => (
              <tr key={lv}>
                <td>{lv}</td>
                <td className="num">{cap}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Then you roll</h3>
        <p>
          Paying gets you the attempt, not the result. Against a body:{" "}
          <span className="num">d20 + Primary + Training</span> vs. Defense. Against a
          will: the target rolls against your Save DC of{" "}
          <span className="num">10 + Primary + Training</span>. A failed Effect still
          spends the Energy — but a <strong>natural 20 refunds it completely</strong>.
        </p>

        <h2>Advancement</h2>
        <p>
          Levels 1 to 10, no XP. The Story God awards a level when the story reaches a
          milestone. Your character does not grow by collecting a longer list of buttons —
          it grows because the pool you spend from gets deeper and the ceiling you spend
          up to gets higher.
        </p>
        <table className="book">
          <thead>
            <tr>
              <th>Level</th>
              <th>What you gain</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Every level</td>
              <td>
                <span className="num">+4</span> HP and <span className="num">+2</span>{" "}
                Energy
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Subclass — a narrower Domain and a Rule Breaker</td>
            </tr>
            <tr>
              <td>4 and 8</td>
              <td>+1 ability point and +1 trained skill</td>
            </tr>
            <tr>
              <td>5</td>
              <td>If you fight with weapons, the Attack action gives you two attacks</td>
            </tr>
            <tr>
              <td>3, 5, 7, 9</td>
              <td>Your Effect cap rises</td>
            </tr>
            <tr>
              <td>10</td>
              <td>
                <strong>Ascendant</strong> — once per Long Rest, one Effect ignores its
                cost entirely
              </td>
            </tr>
          </tbody>
        </table>

        <h2>The Never List</h2>
        <p>
          No amount of Energy buys these. They need a Cleric&rsquo;s Miracle, or the Story
          God&rsquo;s explicit blessing: killing outright without a roll; controlling
          another player&rsquo;s character; undoing something that has already happened;
          creating gold, Energy, or permanent life from nothing; knowing something the
          Story God has decided is unknowable.
        </p>
      </div>
    </div>
  );
}
