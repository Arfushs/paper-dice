"use client";

import { useLocale } from "@/components/LocaleProvider";

const DIFFICULTIES = {
  en: [
    ["Easy", "8", "You'd probably manage this on a bad day"],
    ["Moderate", "12", "A real attempt, could go either way"],
    ["Hard", "16", "Requires talent or preparation"],
    ["Extreme", "20", "Heroes only"],
  ],
  tr: [
    ["Kolay", "8", "Kötü bir günde bile büyük ihtimalle başarırsın"],
    ["Orta", "12", "Gerçek bir deneme, iki türlü de gidebilir"],
    ["Zor", "16", "Yetenek ya da hazırlık gerektirir"],
    ["Aşırı", "20", "Sadece kahramanlar"],
  ],
};

const PRICING = {
  en: [
    ["Deals more than one die of damage", "+1 per extra d6"],
    ["Hits everyone in a zone, or several targets", "+1"],
    ["Reaches Far or Distant", "+1"],
    ["Imposes a Condition", "+1"],
    ["Lasts the whole scene", "+1"],
    ["Lasts beyond the scene — hours, days", "+2"],
    ["Does something no mortal can do — fly, walk through stone", "+2"],
  ],
  tr: [
    ["Bir zardan fazla hasar verir", "her ekstra d6 için +1"],
    ["Bir bölgedeki herkese ya da birkaç hedefe vurur", "+1"],
    ["Uzak ya da En Uzak'a erişir", "+1"],
    ["Bir Durum yükler", "+1"],
    ["Bütün sahne boyunca sürer", "+1"],
    ["Sahnenin ötesine sürer — saatler, günler", "+2"],
    ["Hiçbir ölümlünün yapamayacağı bir şey — uçmak, taştan geçmek", "+2"],
  ],
};

const DOMAIN_COST = {
  en: [
    ["Inside your Subclass Domain", "−1 Energy (minimum 1)"],
    ["Inside your Class Domain", "normal price"],
    ["Outside your Class Domain", "double, and roll at disadvantage"],
    ["Outside anything plausible", "the Story God says no"],
  ],
  tr: [
    ["Alt Sınıf Alanının içinde", "−1 Enerji (en az 1)"],
    ["Sınıf Alanının içinde", "normal fiyat"],
    ["Sınıf Alanının dışında", "iki katı ve dezavantajlı at"],
    ["Makul olan her şeyin dışında", "Hikâye Tanrısı hayır der"],
  ],
};

const CAPS = [
  ["1–2", "2"],
  ["3–4", "3"],
  ["5–6", "4"],
  ["7–8", "5"],
  ["9–10", "6"],
];

const ZONES = {
  en: [
    ["Engaged", "Melee only"],
    ["Near", "Thrown, most spells"],
    ["Far", "Bows, long spells"],
    ["Distant", "Sniping, or off the field"],
  ],
  tr: [
    ["Temas", "Sadece yakın dövüş"],
    ["Yakın", "Fırlatma, çoğu büyü"],
    ["Uzak", "Yaylar, uzun büyüler"],
    ["En Uzak", "Keskin nişan ya da sahadan uzak"],
  ],
};

export default function RulesContent() {
  const { locale } = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}

// ── English ─────────────────────────────────────────────────────────────────
function En() {
  return (
    <div className="shell">
      <section style={{ padding: "56px 0 0" }}>
        <p className="eyebrow">The whole system</p>
        <h1 className="display" style={{ fontSize: "2.5rem", margin: "12px 0 16px" }}>
          Core Rules
        </h1>
        <p className="lede" style={{ maxWidth: "64ch" }}>
          One roll, one resource, four zones, no spell list. Everything else is the Story
          God&rsquo;s judgement — and the golden rule is that if the rules and the story
          disagree, the story wins.
        </p>
      </section>

      <div className="prose">
        <h2>The One Roll</h2>
        <p>Everything in this game resolves the same way.</p>
        <code className="formula">d20 + Ability + Training vs. Difficulty</code>
        <p>
          <strong>Ability</strong> is one of the six scores, 1&ndash;5. The score <em>is</em>{" "}
          the modifier — there is no lookup table. <strong>Training</strong> adds{" "}
          <span className="num">+2</span> when a skill you are trained in applies. Meet or beat
          the number to succeed.
        </p>

        <Table head={["Difficulty", "Target", "Feels like"]} rows={DIFFICULTIES.en} numCol={1} />

        <h3>Criticals</h3>
        <p>
          <strong>Natural 20</strong> — double the weapon or spell <em>dice</em>, not the
          modifier. Outside combat you succeed and gain something extra. <strong>Natural 1</strong>{" "}
          — you fail, and the Story God introduces a complication.
        </p>

        <h3>Advantage &amp; disadvantage</h3>
        <p>
          Roll <strong>2d20</strong>, keep the higher or the lower. They never stack, and one of
          each cancels out. Hand out advantage freely for clever plans — it is the cheapest
          reward in the game.
        </p>

        <h2>Your Character</h2>
        <p>
          Every ability starts at <span className="num">1</span>. Distribute{" "}
          <span className="num">8</span> points. Nothing may exceed <span className="num">4</span>{" "}
          at level 1. Then pick three trained skills, take your class kit, and answer three
          questions: where are you from, who do you owe, and what do you want. The Story God will
          use all three against you.
        </p>

        <Table
          head={["Value", "Formula"]}
          rows={[
            ["Hit Points", "Class HP Base + (CON × 3) + ((Level − 1) × 4)"],
            ["Energy", "(Primary × 3) + ((Level − 1) × 2)"],
            ["Defense", "10 + DEX + Armor + Shield"],
            ["Initiative", "d20 + DEX"],
          ]}
          numCol={1}
        />

        <h2>Zones, Not Grids</h2>
        <p>
          There is no battle map. Every fight is divided into four abstract bands. A{" "}
          <strong>Move</strong> shifts you one zone; leaving <em>Engaged</em> lets the enemy take
          a free swing unless you Disengage.
        </p>
      </div>

      <Zones rows={ZONES.en} />

      <div className="prose">
        <h2>Domains &amp; Effects</h2>
        <p>
          <strong>There is no spell list.</strong> There is no maneuver list either. Every
          character has a <strong>Domain</strong> — the slice of the world their power reaches
          into. Inside it, they invent. The Story God prices what they invent. This is the same
          rule for a wizard&rsquo;s fireball and a knight&rsquo;s improbable chandelier stunt.
        </p>

        <h3>Where the effect falls</h3>
        <Table rows={DOMAIN_COST.en} numCol={1} />

        <h3>What it costs</h3>
        <p>
          Base cost is <span className="num">1 Energy</span>. Then add:
        </p>
        <Table head={["The effect…", "Energy"]} rows={PRICING.en} numCol={1} />

        <h3>The cap</h3>
        <p>
          You may never spend more than this on a single Effect, however much Energy you have.
          This is what keeps power in check — a level-2 character <em>may</em> describe levelling
          the village, it just prices at 5 and they can spend 2. No argument needed; the table
          answers.
        </p>
        <Table head={["Levels", "Max Energy per Effect"]} rows={CAPS} numCol={1} />

        <h3>Then you roll</h3>
        <p>
          Paying gets you the attempt, not the result. Against a body:{" "}
          <span className="num">d20 + Primary + Training</span> vs. Defense. Against a will: the
          target rolls against your Save DC of{" "}
          <span className="num">10 + Primary + Training</span>. A failed Effect still spends the
          Energy — but a <strong>natural 20 refunds it completely</strong>.
        </p>

        <h2>Advancement</h2>
        <p>
          Levels 1 to 10, no XP. The Story God awards a level when the story reaches a milestone.
          Your character does not grow by collecting a longer list of buttons — it grows because
          the pool you spend from gets deeper and the ceiling you spend up to gets higher.
        </p>
        <Table
          head={["Level", "What you gain"]}
          rows={[
            ["Every level", "+4 HP and +2 Energy"],
            ["3", "Subclass — a narrower Domain and a Rule Breaker"],
            ["4 and 8", "+1 ability point and +1 trained skill"],
            ["5", "If you fight with weapons, the Attack action gives you two attacks"],
            ["3, 5, 7, 9", "Your Effect cap rises"],
            ["10", "Ascendant — once per Long Rest, one Effect ignores its cost entirely"],
          ]}
        />

        <h2>The Never List</h2>
        <p>
          No amount of Energy buys these. They need a Cleric&rsquo;s Miracle, or the Story
          God&rsquo;s explicit blessing: killing outright without a roll; controlling another
          player&rsquo;s character; undoing something that has already happened; creating gold,
          Energy, or permanent life from nothing; knowing something the Story God has decided is
          unknowable.
        </p>
      </div>
    </div>
  );
}

// ── Türkçe ──────────────────────────────────────────────────────────────────
function Tr() {
  return (
    <div className="shell">
      <section style={{ padding: "56px 0 0" }}>
        <p className="eyebrow">Bütün sistem</p>
        <h1 className="display" style={{ fontSize: "2.5rem", margin: "12px 0 16px" }}>
          Çekirdek Kurallar
        </h1>
        <p className="lede" style={{ maxWidth: "64ch" }}>
          Tek atış, tek kaynak, dört bölge, büyü listesi yok. Geri kalan her şey Hikâye
          Tanrısı&rsquo;nın takdiridir — ve altın kural şu: kurallar ile hikâye çelişirse, hikâye
          kazanır.
        </p>
      </section>

      <div className="prose">
        <h2>Tek Atış</h2>
        <p>Bu oyundaki her şey aynı şekilde çözülür.</p>
        <code className="formula">d20 + Yetenek + Eğitim vs. Zorluk</code>
        <p>
          <strong>Yetenek</strong> altı puandan biridir, 1&ndash;5. Puanın kendisi{" "}
          <em>zaten</em> modifiyedir — bir çevrim tablosu yoktur. <strong>Eğitim</strong>, eğitimli
          olduğun bir beceri geçerli olduğunda <span className="num">+2</span> ekler. Başarmak için
          sayıyı tuttur ya da geç.
        </p>

        <Table head={["Zorluk", "Hedef", "Nasıl hissettirir"]} rows={DIFFICULTIES.tr} numCol={1} />

        <h3>Kritikler</h3>
        <p>
          <strong>Doğal 20</strong> — silah ya da büyü <em>zarlarını</em> ikiye katla, modifiyeyi
          değil. Savaş dışında başarırsın ve fazladan bir şey kazanırsın.{" "}
          <strong>Doğal 1</strong> — başarısız olursun ve Hikâye Tanrısı bir komplikasyon getirir.
        </p>

        <h3>Avantaj &amp; dezavantaj</h3>
        <p>
          <strong>2d20</strong> at, yükseği ya da düşüğü tut. Asla üst üste binmezler ve her
          birinden biri diğerini iptal eder. Zekice planlar için avantajı cömertçe dağıt — oyundaki
          en ucuz ödüldür.
        </p>

        <h2>Karakterin</h2>
        <p>
          Her yetenek <span className="num">1</span>&rsquo;den başlar.{" "}
          <span className="num">8</span> puan dağıt. 1. seviyede hiçbiri{" "}
          <span className="num">4</span>&rsquo;ü aşamaz. Sonra üç eğitimli beceri seç, sınıf
          teçhizatını al ve üç soruyu yanıtla: nerelisin, kime borçlusun ve ne istiyorsun. Hikâye
          Tanrısı üçünü de sana karşı kullanacak.
        </p>

        <Table
          head={["Değer", "Formül"]}
          rows={[
            ["Can Puanı", "Sınıf Temel CP + (CON × 3) + ((Seviye − 1) × 4)"],
            ["Enerji", "(Ana × 3) + ((Seviye − 1) × 2)"],
            ["Savunma", "10 + DEX + Zırh + Kalkan"],
            ["İnisiyatif", "d20 + DEX"],
          ]}
          numCol={1}
        />

        <h2>Izgara Değil, Bölge</h2>
        <p>
          Savaş haritası yoktur. Her dövüş dört soyut kuşağa bölünür. Bir{" "}
          <strong>Hareket</strong> seni bir bölge kaydırır; <em>Temas</em>&rsquo;tan ayrılmak,
          Sıyrılmadıkça düşmana bedava bir savurma hakkı verir.
        </p>
      </div>

      <Zones rows={ZONES.tr} />

      <div className="prose">
        <h2>Alanlar &amp; Etkiler</h2>
        <p>
          <strong>Büyü listesi yoktur.</strong> Manevra listesi de yoktur. Her karakterin bir{" "}
          <strong>Alanı</strong> vardır — gücünün uzandığı dünya dilimi. Onun içinde uydururlar.
          Uydurduklarını Hikâye Tanrısı fiyatlandırır. Bu, bir büyücünün ateş topu ile bir
          şövalyenin olmayacak avize numarası için aynı kuraldır.
        </p>

        <h3>Etki nereye düşer</h3>
        <Table rows={DOMAIN_COST.tr} numCol={1} />

        <h3>Maliyeti nedir</h3>
        <p>
          Taban maliyet <span className="num">1 Enerji</span>. Sonra ekle:
        </p>
        <Table head={["Etki…", "Enerji"]} rows={PRICING.tr} numCol={1} />

        <h3>Tavan</h3>
        <p>
          Ne kadar Enerjin olursa olsun, tek bir Etkiye bundan fazlasını asla harcayamazsın. Gücü
          dengede tutan şey budur — 2. seviye bir karakter <em>köyü yerle bir etmeyi</em> tarif
          edebilir, sadece 5&rsquo;e fiyatlanır ve 2 harcayabilir. Tartışmaya gerek yok; masa cevap
          verir.
        </p>
        <Table head={["Seviyeler", "Etki başına en fazla Enerji"]} rows={CAPS} numCol={1} />

        <h3>Sonra atarsın</h3>
        <p>
          Ödemek sana denemeyi verir, sonucu değil. Bir bedene karşı:{" "}
          <span className="num">d20 + Ana + Eğitim</span> vs. Savunma. Bir iradeye karşı: hedef,
          senin <span className="num">10 + Ana + Eğitim</span> Kurtarış DC&rsquo;ne karşı atar.
          Başarısız bir Etki yine de Enerjiyi harcar — ama{" "}
          <strong>doğal 20 onu tamamen geri öder</strong>.
        </p>

        <h2>İlerleme</h2>
        <p>
          Seviye 1&rsquo;den 10&rsquo;a, TP yok. Hikâye Tanrısı, hikâye bir kilometre taşına
          ulaştığında seviye verir. Karakterin daha uzun bir düğme listesi toplayarak büyümez —
          harcadığın havuz derinleştiği ve harcayabildiğin tavan yükseldiği için büyür.
        </p>
        <Table
          head={["Seviye", "Ne kazanırsın"]}
          rows={[
            ["Her seviye", "+4 Can ve +2 Enerji"],
            ["3", "Alt sınıf — daha dar bir Alan ve bir Kural Kırıcı"],
            ["4 ve 8", "+1 yetenek puanı ve +1 eğitimli beceri"],
            ["5", "Silahla dövüşüyorsan, Saldırı aksiyonu sana iki saldırı verir"],
            ["3, 5, 7, 9", "Etki tavanın yükselir"],
            ["10", "Yüce — Uzun Dinlenme başına bir kez, bir Etki maliyetini tamamen yok sayar"],
          ]}
        />

        <h2>Asla Listesi</h2>
        <p>
          Hiçbir miktarda Enerji bunları satın almaz. Bir Rahip&rsquo;in Mucizesini ya da Hikâye
          Tanrısı&rsquo;nın açık iznini gerektirirler: atış olmadan doğrudan öldürmek; başka bir
          oyuncunun karakterini kontrol etmek; çoktan olmuş bir şeyi geri almak; yoktan altın,
          Enerji ya da kalıcı hayat yaratmak; Hikâye Tanrısı&rsquo;nın bilinemez ilan ettiği bir
          şeyi bilmek.
        </p>
      </div>
    </div>
  );
}

// ── shared bits ─────────────────────────────────────────────────────────────
function Table({
  head,
  rows,
  numCol,
}: {
  head?: string[];
  rows: string[][];
  numCol?: number;
}) {
  return (
    <table className="book">
      {head && (
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((r, ri) => (
          <tr key={ri}>
            {r.map((cell, ci) => (
              <td key={ci} className={ci === numCol ? "num" : undefined}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Zones({ rows }: { rows: string[][] }) {
  return (
    <div className="zones">
      {rows.map(([name, note], i) => (
        <span key={name} style={{ display: "contents" }}>
          {i > 0 && <span className="zone-arrow">→</span>}
          <div className="zone">
            <div className="zone__name">{name}</div>
            <div className="zone__note">{note}</div>
          </div>
        </span>
      ))}
    </div>
  );
}
