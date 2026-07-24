import type { CharClass } from "./types";

/**
 * Source of truth for class content. Mirrors CLASSES.md.
 * English is authored; `tr` fields are filled in during the translation pass.
 */
export const CLASSES: CharClass[] = [
  // ────────────────────────────────────────────────────────── FRONT LINE
  {
    id: "knight",
    num: 1,
    group: "front",
    name: { en: "Knight", tr: "Şövalye" },
    hook: {
      en: "You are not the strongest person in the room. You are the one who has done this before.", tr: "Odadaki en güçlü kişi sen değilsin. Sen bunu daha önce yapmış olansın.",
    },
    playsLike: {
      en: "The dependable one. You have an answer to almost every fight and you never run out of it. Where the Barbarian breaks a problem and the Rogue avoids it, you take it apart on purpose. The easiest class to play well and the hardest to play badly — and the class whose subclasses change the most about how you actually play, from pure swordwork to inscribed magic to commanding a line.", tr: "Güvenilir olan. Neredeyse her dövüşe bir cevabın var ve asla tükenmiyor. Barbar bir sorunu kırarken, Hırsız ondan kaçarken, sen onu bilerek parçalara ayırırsın. İyi oynaması en kolay, kötü oynaması en zor sınıf — ve alt sınıfları oynayış tarzını en çok değiştiren sınıf: saf kılıç ustalığından kazınmış büyüye, bir hattı komuta etmeye kadar.",
    },
    hpBase: 12,
    priority: ["STR / DEX", "CON", "WIS"],
    domain: { en: "Steel, the body, and the shape of a battlefield.", tr: "Çelik, beden ve bir savaş alanının şekli." },
    kit: { en: "Any weapon, medium armor, a shield, a soldier's pack.", tr: "Herhangi bir silah, orta zırh, bir kalkan, bir asker çantası." },
    signature: {
      name: { en: "Maneuver", tr: "Manevra" },
      text: {
        en: "Once per turn, when you hit, add something for free: shove them into the next zone, disarm them, knock them Prone, or pin them where they stand. No Energy. No roll.", tr: "Turda bir kez, vurduğunda bedava bir şey ekle: onu sonraki bölgeye it, silahını düşür, Yatık düşür ya da olduğu yere sabitle. Enerji yok. Atış yok.",
      },
    },
    examples: [
      { text: { en: "Knock a piece of furniture into an enemy and follow up.", tr: "Bir eşyayı düşmana devirip peşinden saldır." }, cost: "1" },
      { text: { en: "Pull an enemy's shield aside and knock them down.", tr: "Düşmanın kalkanını çekip onu yere düşür." }, cost: "1" },
      { text: { en: "Block a doorway so nothing gets past you this round.", tr: "Bir kapıyı tut, bu tur kimse geçemesin." }, cost: "2" },
      { text: { en: "Use the environment — drop a chandelier on a group of enemies.", tr: "Ortamı kullan — bir avizeyi düşman grubunun üstüne indir." }, cost: "2" },
      { text: { en: "Throw your weapon hard enough to pin an enemy to a wall.", tr: "Silahını, bir düşmanı duvara sabitleyecek kadar sert fırlat." }, cost: "3" },
    ],
    subclasses: [
      {
        id: "weapon-master",
        slug: "knight-weapon-master",
        name: { en: "Weapon Master", tr: "Silah Ustası" },
        tagline: { en: "A pure fighter who is deadly with any weapon they pick up. Choose this if you like flexible, weapon-focused combat with no magic.", tr: "Eline aldığı her silahla ölümcül olan saf bir dövüşçü. Büyüsüz, silah odaklı ve esnek dövüşü sevenler seçsin." },
        domain: { en: "Anything with an edge, a point, or a weight. Held, thrown, or picked up off the floor.", tr: "Keskin, sivri ya da ağır olan her şey. Tutulmuş, fırlatılmış ya da yerden alınmış." },
        ruleBreaker: {
          name: { en: "Perfect Grip", tr: "Kusursuz Kavrayış" },
          text: { en: "Your Maneuver fires on a miss as well as a hit.", tr: "Manevran ıskalamada da tıpkı isabet gibi tetiklenir." },
        },
        examples: [
          { text: { en: "Throw a small weapon accurately at a target like a lock.", tr: "Küçük bir silahı, kilit gibi bir hedefe isabetle fırlat." }, cost: "1" },
          { text: { en: "Grab two weapons and fight with both at once.", tr: "İki silah kap ve ikisiyle birden dövüş." }, cost: "1" },
          { text: { en: "Make a precise thrown hit to disarm an enemy across the room.", tr: "Odanın öbür ucundaki düşmanı silahsız bırakmak için isabetli bir fırlatma yap." }, cost: "2" },
        ],
      },
      {
        id: "warden",
        slug: "knight-warden",
        name: { en: "Warden", tr: "Muhafız" },
        tagline: { en: "The protector. You hold a doorway or line so enemies can't reach your weaker friends. Pick this if you want to keep the party safe.", tr: "Koruyucu. Bir kapıyı ya da hattı tutarsın, düşmanlar zayıf arkadaşlarına ulaşamaz. Grubu güvende tutmak istiyorsan seç." },
        domain: { en: "Shields, chokepoints, cover, and ground you refuse to give.", tr: "Kalkanlar, dar geçitler, siper ve vermeyi reddettiğin topraklar." },
        ruleBreaker: {
          name: { en: "Bulwark", tr: "Sur" },
          text: { en: "Enemies cannot leave your zone unless they beat you in a STR or DEX contest.", tr: "Düşmanlar, seni bir STR ya da DEX yarışmasında yenmedikçe bölgeni terk edemez." },
        },
        examples: [
          { text: { en: "Hold a door or gap shut with your own body.", tr: "Bir kapıyı ya da geçidi kendi bedeninle kapalı tut." }, cost: "1" },
          { text: { en: "Pull an ally out of danger and take the hit yourself.", tr: "Bir müttefiki tehlikeden çek ve darbeyi kendin al." }, cost: "1" },
          { text: { en: "Block a corridor completely for a couple of rounds.", tr: "Bir koridoru birkaç tur boyunca tamamen kapat." }, cost: "2" },
        ],
      },
      {
        id: "duelist",
        slug: "knight-duelist",
        name: { en: "Duelist", tr: "Düellocu" },
        tagline: { en: "The one-on-one specialist. Deadliest against a single strong enemy. Pick this if you like reading opponents and precise fencing.", tr: "Teke tek uzmanı. Tek bir güçlü düşmana karşı en ölümcül. Rakibi okumayı ve keskin eskrimi sevenler seçsin." },
        domain: { en: "Timing, footwork, feints, and the space between two blades.", tr: "Zamanlama, ayak oyunu, feyntler ve iki kılıç arasındaki boşluk." },
        ruleBreaker: {
          name: { en: "First Blood", tr: "İlk Kan" },
          text: { en: "When exactly one enemy is present, you act first in initiative. Always.", tr: "Tam olarak bir düşman varsa, inisiyatifte önce sen oynarsın. Her zaman." },
        },
        examples: [
          { text: { en: "Read an enemy's pattern and predict their next attack.", tr: "Bir düşmanın hareketlerini oku ve sonraki saldırısını tahmin et." }, cost: "1" },
          { text: { en: "Disarm an enemy mid-fight.", tr: "Dövüşün ortasında bir düşmanı silahsız bırak." }, cost: "1" },
          { text: { en: "Stall or talk your way through a one-on-one fight.", tr: "Teke tek dövüşü konuşarak oyala ya da çöz." }, cost: "2" },
        ],
      },
      {
        id: "enchanter",
        slug: "knight-enchanter",
        name: { en: "Enchanter Knight", tr: "Büyücü Şövalye" },
        tagline: { en: "A knight who carves magic into their weapon and armour. Pick this if you want a fighter who also does some magic — prepared ahead of the fight.", tr: "Büyüyü silahına ve zırhına kazıyan bir şövalye. Dövüş öncesi hazırlanan, hem dövüşen hem az büyü yapan bir sınıf isteyenler seçsin." },
        domain: { en: "Runes, wards, and the metal they are cut into — armour and blade as the spellbook.", tr: "Rünler, korumalar ve kazındıkları metal — büyü kitabı olarak zırh ve kılıç." },
        ruleBreaker: {
          name: { en: "Inscribed", tr: "Kazınmış" },
          text: {
            en: "You may store one Effect in your weapon or armour. Pay its Energy at rest, when you cut the rune; release it later as a free action, on any turn you like. One stored Effect at a time.", tr: "Silahına ya da zırhına bir Etki depolayabilirsin. Enerjisini dinlenirken, rünü kazırken öde; sonra bedava aksiyonla, istediğin turda serbest bırak. Aynı anda tek depolanmış Etki.",
          },
        },
        examples: [
          { text: { en: "Set a stored rune off so your blade burns for the fight.", tr: "Depolanmış bir rünü ateşle, kılıcın dövüş boyunca yansın." }, cost: "1" },
          { text: { en: "Prepare your shield to fully block the next hit.", tr: "Kalkanını bir sonraki darbeyi tamamen engelleyecek şekilde hazırla." }, cost: "2" },
          { text: { en: "Release a stored effect from your armour back at an enemy.", tr: "Zırhında depolanmış bir etkiyi bir düşmana geri gönder." }, cost: "2" },
        ],
      },
      {
        id: "banneret",
        slug: "knight-banneret",
        name: { en: "Banneret", tr: "Sancaktar" },
        tagline: { en: "The commander. You help allies act and keep them fighting. Pick this if you want to boost the team more than swing a sword.", tr: "Komutan. Müttefiklerin oynamasına ve savaşmaya devam etmesine yardım edersin. Kılıç sallamaktan çok takımı güçlendirmek istiyorsan seç." },
        domain: { en: "Command, formation, morale, and the will of people who have agreed to follow orders.", tr: "Komuta, düzen, moral ve emirlere uymayı kabul etmiş insanların iradesi." },
        ruleBreaker: {
          name: { en: "On My Word", tr: "Emrimle" },
          text: {
            en: "Once per round, an ally who can hear you may immediately take a Move or an Action out of turn. It costs you nothing.", tr: "Turda bir kez, seni duyabilen bir müttefik sırası dışında hemen bir Hareket ya da Aksiyon alabilir. Sana hiçbir şeye mal olmaz.",
          },
        },
        examples: [
          { text: { en: "Let an ally take an extra move or attack out of turn.", tr: "Bir müttefikin sırası dışında ekstra hareket ya da saldırı yapmasını sağla." }, cost: "1" },
          { text: { en: "Keep your allies from being Frightened or breaking rank.", tr: "Müttefiklerinin Korkmasını ya da safı bozmasını engelle." }, cost: "2" },
          { text: { en: "Rally a group of weak allies to hold one more round.", tr: "Bir grup zayıf müttefiki bir tur daha dayanmaları için topla." }, cost: "3" },
        ],
      },
    ],
  },

  {
    id: "barbarian",
    num: 2,
    group: "front",
    name: { en: "Barbarian", tr: "Barbar" },
    hook: { en: "There is a point past which pain stops being information.", tr: "Acının artık bilgi olmaktan çıktığı bir eşik vardır." },
    playsLike: {
      en: "A battery that discharges. You are enormous, you get bigger when you're angry, and you have very few answers that aren't violence. When the plan works you're a sledgehammer; when the plan fails you're the reason anyone survives.", tr: "Boşalan bir batarya. Devasasın, kızdığında büyürsün ve şiddet olmayan pek az cevabın var. Plan işlediğinde bir balyozsun; plan başarısız olduğunda birilerinin hayatta kalma sebebisin.",
    },
    hpBase: 14,
    priority: ["STR", "CON", "WIS"],
    domain: { en: "Raw force, fury, and endurance past reason.", tr: "Ham kuvvet, öfke ve akıl sınırını aşan dayanıklılık." },
    kit: { en: "A heavy weapon, hide armor, and a trophy from something you killed.", tr: "Ağır bir silah, post zırh ve öldürdüğün bir şeyden bir ganimet." },
    signature: {
      name: { en: "Rage", tr: "Öfke" },
      text: {
        en: "Free action, 2 Energy. Until the scene ends or you go a full turn without attacking: halve all incoming physical damage, add +CON to your damage, and roll INT and CHA at disadvantage.", tr: "Bedava aksiyon, 2 Enerji. Sahne bitene ya da tam bir tur saldırmadan geçene kadar: gelen tüm fiziksel hasarı yarıya indir, hasarına +CON ekle ve INT ile CHA'yı dezavantajlı at.",
      },
    },
    examples: [
      { text: { en: "Pick an enemy up and throw them into another.", tr: "Bir düşmanı kaldırıp bir başkasının üstüne fırlat." }, cost: "1" },
      { text: { en: "Smash straight through a door or barrier.", tr: "Bir kapıyı ya da engeli olduğu gibi parçala." }, cost: "1" },
      { text: { en: "Grab several enemies and drag them back a zone.", tr: "Birkaç düşmanı kavrayıp bir bölge geri sürükle." }, cost: "2" },
      { text: { en: "Take a hit on purpose so an ally can slip past.", tr: "Bir müttefik geçebilsin diye darbeyi bilerek al." }, cost: "2" },
      { text: { en: "Hold up something heavy so the others can escape.", tr: "Ağır bir şeyi tut ki diğerleri kaçabilsin." }, cost: "3" },
    ],
    subclasses: [
      {
        id: "berserker",
        slug: "barbarian-berserker",
        name: { en: "Berserker", tr: "Berserker" },
        tagline: { en: "Pure aggression. Rage often and fight recklessly. Pick this if you want to hit hard and scare enemies, and don't mind the risk.", tr: "Saf saldırganlık. Sık öfkelen, pervasızca dövüş. Sert vurmak ve düşmanları korkutmak isteyen, riski dert etmeyenler seçsin." },
        domain: { en: "Bloodlust, terror, and momentum that does not stop.", tr: "Kan susamışlığı, dehşet ve durmayan bir ivme." },
        ruleBreaker: {
          name: { en: "No Cost", tr: "Bedelsiz" },
          text: { en: "Your first Rage each scene is free.", tr: "Her sahnedeki ilk Öfken bedava." },
        },
        examples: [
          { text: { en: "Roar to Frighten the enemies around you.", tr: "Kükreyerek etrafındaki düşmanları Korkut." }, cost: "1" },
          { text: { en: "Charge across the battlefield through anything in the way.", tr: "Yoldaki her şeyi yararak savaş alanı boyunca hücum et." }, cost: "2" },
          { text: { en: "Keep fighting past the point you should have dropped.", tr: "Düşmen gereken noktayı geçip dövüşmeye devam et." }, cost: "2" },
        ],
      },
      {
        id: "totem",
        slug: "barbarian-totem",
        name: { en: "Totem", tr: "Totem" },
        tagline: { en: "A nature-bound barbarian who borrows beast traits. Pick this if you want toughness plus tracking and wild-world skills.", tr: "Canavar özellikleri ödünç alan, doğaya bağlı bir barbar. Dayanıklılığın yanında iz sürme ve yaban becerileri isteyenler seçsin." },
        domain: { en: "Beast spirits, the endurance of the wild, borrowed shapes and instincts.", tr: "Hayvan ruhları, yabanın dayanıklılığı, ödünç alınmış şekiller ve içgüdüler." },
        ruleBreaker: {
          name: { en: "Borrowed Hide", tr: "Ödünç Post" },
          text: {
            en: "Each Rage, pick one: bear (resist all damage, not just physical), wolf (allies have advantage on anything you attack), eagle (move two zones a turn).", tr: "Her Öfkede birini seç: ayı (sadece fizikseli değil, tüm hasara direnç), kurt (müttefikler saldırdığın her şeye avantajlı), kartal (turda iki bölge hareket).",
          },
        },
        examples: [
          { text: { en: "Use animal senses to catch a lie or a scent.", tr: "Bir yalanı ya da kokuyu yakalamak için hayvan duyularını kullan." }, cost: "0" },
          { text: { en: "Outlast almost anything through sheer endurance.", tr: "Salt dayanıklılıkla neredeyse her şeyden daha uzun dayan." }, cost: "1" },
          { text: { en: "Shrug off harsh weather and cold with ease.", tr: "Sert havayı ve soğuğu kolayca umursama." }, cost: "1" },
        ],
      },
      {
        id: "giantblood",
        slug: "barbarian-giantblood",
        name: { en: "Giantblood", tr: "Dev Kanı" },
        tagline: { en: "An oversized bruiser with huge reach and strength. Pick this if you want to throw heavy things and hit from farther away.", tr: "Devasa erişim ve güce sahip iri kıyım bir dövüşçü. Ağır şeyler fırlatmak ve daha uzaktan vurmak isteyenler seçsin." },
        domain: { en: "Size, reach, weight, and throwing things that should not be thrown.", tr: "Boyut, erişim, ağırlık ve fırlatılmaması gereken şeyleri fırlatmak." },
        ruleBreaker: {
          name: { en: "Oversized", tr: "Aşırı Büyük" },
          text: { en: "You swing Heavy weapons one-handed, and you can throw them to Near.", tr: "Ağır silahları tek elle savurursun ve onları Yakın'a fırlatabilirsin." },
        },
        examples: [
          { text: { en: "Pick up something huge and use it as a weapon.", tr: "Devasa bir şeyi alıp silah olarak kullan." }, cost: "1" },
          { text: { en: "Hit an enemy a whole zone away with your reach.", tr: "Erişiminle bir bölge uzaktaki düşmana vur." }, cost: "1" },
          { text: { en: "Catch or stop something far too big to grab.", tr: "Kavranamayacak kadar büyük bir şeyi yakala ya da durdur." }, cost: "2" },
        ],
      },
      {
        id: "bloodrager",
        slug: "barbarian-bloodrager",
        name: { en: "Bloodrager", tr: "Kan Öfkelisi" },
        tagline: { en: "A barbarian whose fury becomes shockwaves and force. Pick this if you want a rager who also has ranged, magic-like hits.", tr: "Öfkesi şok dalgalarına ve kuvvete dönüşen bir barbar. Menzilli, büyü benzeri vuruşları da olan bir öfkeci isteyenler seçsin." },
        domain: { en: "Fury made physical — force, shockwaves, and the air getting out of the way.", tr: "Fizikselleşmiş öfke — kuvvet, şok dalgaları ve yoldan çekilen hava." },
        ruleBreaker: {
          name: { en: "It Comes Out", tr: "Dışarı Taşar" },
          text: {
            en: "While you are Raging, your Effects cost no Action. The rage is producing them, not you — you are just where they happen.", tr: "Öfkedeyken Etkilerin Aksiyon harcamaz. Onları öfke üretiyor, sen değil — sen sadece gerçekleştikleri yersin.",
          },
        },
        examples: [
          { text: { en: "Slam the ground to send a shockwave outward.", tr: "Yere vur, dışa doğru bir şok dalgası gönder." }, cost: "1" },
          { text: { en: "Hit an enemy at range with a wave of force.", tr: "Bir kuvvet dalgasıyla uzaktaki düşmana vur." }, cost: "2" },
          { text: { en: "Push everything in front of you back a zone.", tr: "Önündeki her şeyi bir bölge geri it." }, cost: "2" },
        ],
      },
    ],
  },

  {
    id: "paladin",
    num: 3,
    group: "front",
    name: { en: "Paladin", tr: "Paladin" },
    hook: { en: "You swore something. It is listening.", tr: "Bir şeye yemin ettin. O dinliyor." },
    playsLike: {
      en: "A weapon with a conscience attached, and the conscience has teeth. You hit hard in bursts and you keep people standing. The oath is the real class feature: it gives the Story God a lever on you, and that is a feature — a Paladin with nothing to lose is just a Knight in nicer armor.", tr: "Vicdan eklenmiş bir silah, ve vicdanın dişleri var. Patlamalar hâlinde sert vurur ve insanları ayakta tutarsın. Asıl sınıf özelliği yemin: Hikâye Tanrısı'na üzerinde bir koz veriyor, ve bu bir özellik — kaybedecek hiçbir şeyi olmayan bir Paladin sadece daha güzel zırhlı bir Şövalyedir.",
    },
    hpBase: 12,
    priority: ["STR / CHA", "CON", "WIS"],
    domain: { en: "Your oath, and the light or weight it carries.", tr: "Yeminin ve taşıdığı ışık ya da ağırlık." },
    kit: {
      en: "A warhammer or another martial weapon, heavy armor, a shield, a holy symbol you did not choose for yourself.", tr: "Bir savaş çekici ya da başka bir savaş silahı, ağır zırh, bir kalkan, kendin seçmediğin bir kutsal sembol.",
    },
    signature: {
      name: { en: "Smite", tr: "Kutsal Darbe" },
      text: { en: "When you hit, spend any amount of Energy: +1d8 oath damage per Energy, up to your cap.", tr: "Vurduğunda istediğin kadar Enerji harca: Enerji başına +1d8 yemin hasarı, tavanına kadar." },
    },
    signatureExtra: {
      name: { en: "The Oath", tr: "Yemin" },
      text: {
        en: "Write three tenets at level 1. Break one knowingly and you lose your Signature and your Rule Breaker until you atone. The Story God decides what atonement costs, and it should cost.", tr: "1. seviyede üç ilke yaz. Birini bilerek çiğnersen, kefaret ödeyene kadar İmzanı ve Kural Kırıcını kaybedersin. Kefaretin bedelini Hikâye Tanrısı belirler, ve bir bedeli olmalı.",
      },
    },
    examples: [
      { text: { en: "Heal a badly hurt ally with holy light.", tr: "Ağır yaralı bir müttefiki kutsal ışıkla iyileştir." }, cost: "1" },
      { text: { en: "Force an enemy to focus on you and no one else.", tr: "Bir düşmanı yalnızca sana odaklanmaya zorla." }, cost: "1" },
      { text: { en: "Block a spot so unholy things can't pass.", tr: "Bir noktayı tut, kutsal olmayan şeyler geçemesin." }, cost: "2" },
      { text: { en: "Deal big holy damage to a line of enemies.", tr: "Bir sıra düşmana büyük kutsal hasar ver." }, cost: "3" },
      { text: { en: "Force a lie to be heard as a lie by everyone present.", tr: "Bir yalanı, oradaki herkesin yalan olarak duymasını sağla." }, cost: "3" },
    ],
    subclasses: [
      {
        id: "oath-of-light",
        slug: "paladin-oath-of-light",
        name: { en: "Oath of Light", tr: "Işık Yemini" },
        tagline: { en: "A healing, protective paladin who reveals hidden things. Pick this if you want to support and shield the party.", tr: "İyileştiren, koruyan ve gizlileri açığa çıkaran bir paladin. Grubu desteklemek ve kalkanlamak isteyenler seçsin." },
        domain: { en: "Radiance, healing, warding, and revealing what hides.", tr: "Parıltı, iyileştirme, koruma ve gizleneni açığa çıkarma." },
        ruleBreaker: {
          name: { en: "Unshakable", tr: "Sarsılmaz" },
          text: { en: "You and every ally in your zone are immune to Frightened.", tr: "Sen ve bölgendeki her müttefik Korkmuş durumuna karşı bağışıksınız." },
        },
        examples: [
          { text: { en: "Fill an area with bright daylight.", tr: "Bir alanı parlak gün ışığıyla doldur." }, cost: "2" },
          { text: { en: "Lift a curse from an ally.", tr: "Bir müttefikten bir laneti kaldır." }, cost: "2" },
          { text: { en: "Reveal an invisible or hidden enemy with light.", tr: "Görünmez ya da gizli bir düşmanı ışıkla açığa çıkar." }, cost: "2" },
        ],
      },
      {
        id: "oath-of-vengeance",
        slug: "paladin-oath-of-vengeance",
        name: { en: "Oath of Vengeance", tr: "İntikam Yemini" },
        tagline: { en: "A hunter paladin who locks onto one enemy and hits it reliably. Pick this to take down a single tough target.", tr: "Tek bir düşmana kilitlenip ona güvenilir şekilde vuran avcı paladin. Tek bir güçlü hedefi düşürmek için seç." },
        domain: { en: "Pursuit, retribution, and one marked enemy.", tr: "Takip, kısas ve tek bir işaretli düşman." },
        ruleBreaker: {
          name: { en: "The Mark", tr: "İşaret" },
          text: { en: "Name one enemy per scene. Any attack roll of 10 or higher hits it, whatever its Defense.", tr: "Sahne başına bir düşman belirle. 10 ve üzeri her saldırı atışı, Savunması ne olursa olsun ona isabet eder." },
        },
        examples: [
          { text: { en: "Always know where your marked enemy is.", tr: "İşaretli düşmanının nerede olduğunu her zaman bil." }, cost: "0" },
          { text: { en: "Chase down an enemy faster than you.", tr: "Senden hızlı bir düşmanı kovala ve yakala." }, cost: "1" },
          { text: { en: "Hit your marked enemy no matter how armoured they are.", tr: "İşaretli düşmanına, ne kadar zırhlı olursa olsun vur." }, cost: "2" },
        ],
      },
      {
        id: "oath-of-atonement",
        slug: "paladin-oath-of-atonement",
        name: { en: "Oath of Atonement", tr: "Kefaret Yemini" },
        tagline: { en: "A selfless paladin who takes others' pain and damage. Pick this to soak harm meant for your friends.", tr: "Başkalarının acısını ve hasarını üstlenen özverili bir paladin. Arkadaşlarına yönelen zararı emmek için seç." },
        domain: { en: "Penance, endurance, and suffering taken on behalf of others.", tr: "Tövbe, dayanıklılık ve başkaları adına çekilen ıstırap." },
        ruleBreaker: {
          name: { en: "Take the Blow", tr: "Darbeyi Al" },
          text: { en: "You may accept any damage aimed at an ally in your zone. It is halved.", tr: "Bölgendeki bir müttefike yönelen herhangi bir hasarı kabul edebilirsin. Yarıya iner." },
        },
        examples: [
          { text: { en: "Take an ally's poison or affliction into yourself.", tr: "Bir müttefikin zehrini ya da illetini kendine al." }, cost: "1" },
          { text: { en: "Stand in danger so an ally doesn't have to.", tr: "Bir müttefik durmak zorunda kalmasın diye tehlikede dur." }, cost: "2" },
          { text: { en: "Take on someone else's burden or punishment.", tr: "Başkasının yükünü ya da cezasını üstlen." }, cost: "3" },
        ],
      },
      {
        id: "oath-of-the-silent",
        slug: "paladin-oath-of-the-silent",
        name: { en: "Oath of the Silent", tr: "Sessizlik Yemini" },
        tagline: { en: "A quiet investigator paladin who finds the guilty and forces the truth. Pick this for mysteries and interrogation.", tr: "Suçluyu bulan ve gerçeği söyleten sessiz, dedektif paladin. Gizemler ve sorgu için seç." },
        domain: { en: "Investigation, judgement, oaths sworn where nobody heard, and the guilty.", tr: "Soruşturma, yargı, kimsenin duymadığı yerde edilen yeminler ve suçlular." },
        ruleBreaker: {
          name: { en: "The Confession", tr: "İtiraf" },
          text: {
            en: "Ask one creature one question about something it has done. It cannot lie to you. It may refuse to answer — and you will know that it refused.", tr: "Bir yaratığa yaptığı bir şey hakkında tek bir soru sor. Sana yalan söyleyemez. Cevap vermeyi reddedebilir — ve reddettiğini bilirsin.",
          },
        },
        examples: [
          { text: { en: "Investigate and identify the guilty one.", tr: "Araştırıp suçlu olanı belirle." }, cost: "1" },
          { text: { en: "Expose an enemy's crime to everyone present.", tr: "Bir düşmanın suçunu oradaki herkese açığa çıkar." }, cost: "2" },
          { text: { en: "Keep your power without any temple or witness.", tr: "Hiçbir tapınak ya da tanık olmadan gücünü koru." }, cost: "2" },
        ],
      },
    ],
  },

  {
    id: "monk",
    num: 4,
    group: "front",
    name: { en: "Monk", tr: "Keşiş" },
    hook: { en: "Everyone else brought a weapon. You didn't need to.", tr: "Herkes bir silah getirdi. Senin gerek yoktu." },
    playsLike: {
      en: "Fast, slippery, precise. You go wherever you want on the battlefield and hit several times when you get there. Fragile if you stand still, so don't. The most mobile class in the game by a wide margin.", tr: "Hızlı, kaygan, hassas. Savaş alanında istediğin yere gidersin ve vardığında birkaç kez vurursun. Durursan kırılgansın, o yüzden durma. Oyundaki farkla en hareketli sınıf.",
    },
    hpBase: 10,
    priority: ["DEX", "WIS", "CON"],
    domain: { en: "The body as a weapon: breath, momentum, and stillness.", tr: "Silah olarak beden: nefes, ivme ve durgunluk." },
    kit: { en: "Simple robes, a staff or a pair of light weapons, a bowl.", tr: "Sade cübbeler, bir asa ya da bir çift hafif silah, bir kâse." },
    signature: {
      name: { en: "Flow", tr: "Akış" },
      text: {
        en: "Your unarmed die is d6 (d8 at level 5, d10 at level 9), and the Attack action gives you one extra unarmed attack for free. While unarmored, your Defense is 10 + DEX + WIS.", tr: "Silahsız zarın d6 (5. seviyede d8, 9. seviyede d10), ve Saldırı aksiyonu sana bedava bir ekstra silahsız saldırı verir. Zırhsızken Savunman 10 + DEX + WIS.",
      },
    },
    examples: [
      { text: { en: "Move somewhere no one expects, like behind an enemy.", tr: "Kimsenin beklemediği bir yere, örneğin düşmanın arkasına git." }, cost: "1" },
      { text: { en: "Catch or deflect an incoming projectile.", tr: "Gelen bir mermiyi yakala ya da savuştur." }, cost: "1" },
      { text: { en: "Hit a nerve to disable an enemy's limb.", tr: "Bir sinire vurup düşmanın bir uzvunu etkisiz bırak." }, cost: "2" },
      { text: { en: "Move through a line of enemies, hitting each once.", tr: "Bir sıra düşmanın içinden geçerek her birine bir kez vur." }, cost: "2" },
      { text: { en: "Go untouchable for a moment — nothing hits you.", tr: "Bir anlığına dokunulmaz ol — hiçbir şey sana isabet etmez." }, cost: "3" },
    ],
    subclasses: [
      {
        id: "open-hand",
        slug: "monk-open-hand",
        name: { en: "Open Hand", tr: "Açık El" },
        tagline: { en: "A striker who disables enemies by hitting the right spots. Pick this to stun, throw, and shut enemies down.", tr: "Doğru noktalara vurarak düşmanları etkisiz kılan bir vurucu. Sersemletmek, fırlatmak ve düşmanları durdurmak için seç." },
        domain: { en: "Pressure points, joints, throws, and shutting a body down.", tr: "Baskı noktaları, eklemler, fırlatmalar ve bir bedeni durdurmak." },
        ruleBreaker: {
          name: { en: "Read the Body", tr: "Bedeni Oku" },
          text: { en: "After you hit a creature, you know its current HP and one weakness.", tr: "Bir yaratığa vurduktan sonra o anki Canını ve bir zayıflığını bilirsin." },
        },
        examples: [
          { text: { en: "Read an enemy's health and find their weak point.", tr: "Bir düşmanın canını oku ve zayıf noktasını bul." }, cost: "0" },
          { text: { en: "Throw an enemy much bigger than you.", tr: "Kendinden çok daha iri bir düşmanı fırlat." }, cost: "1" },
          { text: { en: "Land a strike that briefly stuns an enemy.", tr: "Bir düşmanı kısa süre sersemleten bir darbe indir." }, cost: "2" },
        ],
      },
      {
        id: "shadow",
        slug: "monk-shadow",
        name: { en: "Shadow", tr: "Gölge" },
        tagline: { en: "A stealth monk who moves through darkness. Pick this for sneaking, ambush, and hit-and-vanish fighting.", tr: "Karanlıkta hareket eden gizlilik keşişi. Sızma, pusu ve vur-kaybol dövüşü için seç." },
        domain: { en: "Darkness, silence, and being somewhere you were not.", tr: "Karanlık, sessizlik ve olmadığın bir yerde olmak." },
        ruleBreaker: {
          name: { en: "Step Through Dark", tr: "Karanlıktan Geç" },
          text: { en: "1 Energy: step from any shadow to any other within Far.", tr: "1 Enerji: herhangi bir gölgeden Uzak menzilindeki başka bir gölgeye adım at." },
        },
        examples: [
          { text: { en: "Put out all the lights in a room at once.", tr: "Bir odadaki tüm ışıkları bir anda söndür." }, cost: "1" },
          { text: { en: "Teleport through shadow and strike from nowhere.", tr: "Gölgeden ışınlan ve boşluktan vur." }, cost: "1" },
          { text: { en: "Slip past a guard even in the open.", tr: "Açıkta bile bir nöbetçinin yanından süzül." }, cost: "2" },
        ],
      },
      {
        id: "four-elements",
        slug: "monk-four-elements",
        name: { en: "Four Elements", tr: "Dört Element" },
        tagline: { en: "A monk who channels the elements through their strikes. Pick this if you want martial arts plus elemental range and control.", tr: "Elementleri vuruşlarıyla kanalize eden bir keşiş. Dövüş sanatının yanında elementsel menzil ve kontrol isteyenler seçsin." },
        domain: { en: "Fire, water, air, and stone, channelled through the body.", tr: "Ateş, su, hava ve taş, bedenden kanalize edilmiş." },
        ruleBreaker: {
          name: { en: "Elemental Fist", tr: "Element Yumruğu" },
          text: { en: "Your unarmed attacks deal any elemental damage type you like and reach Near.", tr: "Silahsız saldırıların istediğin element hasar türünü verir ve Yakın'a erişir." },
        },
        examples: [
          { text: { en: "Strike an enemy at range with wind.", tr: "Uzaktaki bir düşmana rüzgârla vur." }, cost: "1" },
          { text: { en: "Briefly walk on water or thin air.", tr: "Kısa süre suyun ya da havanın üstünde yürü." }, cost: "1" },
          { text: { en: "Raise a wall of stone from the ground.", tr: "Yerden bir taş duvar yükselt." }, cost: "2" },
        ],
      },
      {
        id: "mender",
        slug: "monk-mender",
        name: { en: "Mender", tr: "Onaran" },
        tagline: { en: "A healing monk who mends bodies by touch. Pick this if you want a front-line fighter who also patches the party up.", tr: "Dokunarak bedenleri onaran bir keşiş. Grubu ayakta tutan ama ön safta da dövüşen biri isteyenler seçsin." },
        domain: { en: "Breath, circulation, nerves, poison, and putting a body back the way it was.", tr: "Nefes, dolaşım, sinirler, zehir ve bir bedeni eski hâline döndürmek." },
        ruleBreaker: {
          name: { en: "Hands On", tr: "Eller Üzerinde" },
          text: {
            en: "Your healing Effects cost no Action and need no roll — but you must be Engaged and touching them. You cannot heal at range at all.", tr: "İyileştirme Etkilerin Aksiyon harcamaz ve atış gerektirmez — ama Temas hâlinde ve onlara dokunuyor olmalısın. Menzilden hiç iyileştiremezsin.",
          },
        },
        examples: [
          { text: { en: "Draw poison or affliction out of an ally by touch.", tr: "Dokunarak bir müttefikten zehri ya da illeti çek." }, cost: "1" },
          { text: { en: "Heal a downed ally back to their feet.", tr: "Düşmüş bir müttefiki ayağa kaldıracak kadar iyileştir." }, cost: "1" },
          { text: { en: "Heal everyone next to you at once, then you're spent.", tr: "Yanındaki herkesi bir anda iyileştir, sonra tükenirsin." }, cost: "3" },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────── SKIRMISHERS
  {
    id: "rogue",
    num: 5,
    group: "skirmisher",
    name: { en: "Rogue", tr: "Hırsız" },
    hook: { en: "There is a way in. There is always a way in.", tr: "İçeri girmenin bir yolu var. Her zaman bir yolu vardır." },
    playsLike: {
      en: "The highest single hit in the game if you set it up, and almost nothing if you don't. Outside combat you're the one who solves the problem before it becomes a fight. Rewards positioning and patience.", tr: "Kurarsan oyundaki en yüksek tek vuruş, kurmazsan neredeyse hiçbir şey. Savaş dışında sorunu dövüşe dönüşmeden çözen kişisin. Konumlanmayı ve sabrı ödüllendirir.",
    },
    hpBase: 8,
    priority: ["DEX", "CHA / INT", "CON"],
    domain: { en: "Angles, timing, locks, lies, and the soft parts.", tr: "Açılar, zamanlama, kilitler, yalanlar ve yumuşak yerler." },
    kit: { en: "Two light weapons, light armor, thieves' tools, and something you have not yet returned.", tr: "İki hafif silah, hafif zırh, hırsız aletleri ve henüz geri vermediğin bir şey." },
    signature: {
      name: { en: "Sneak Attack", tr: "Sinsi Saldırı" },
      text: {
        en: "Once per turn, when you hit with advantage, or when the target is Engaged with one of your allies: add 2d6. Rises to 4d6 at level 5 and 6d6 at level 9.", tr: "Turda bir kez, avantajlıyken vurduğunda ya da hedef müttefiklerinden biriyle Temas hâlindeyken: +2d6 ekle. 5. seviyede 4d6'ya, 9. seviyede 6d6'ya çıkar.",
      },
    },
    examples: [
      { text: { en: "Dodge an attack and end up behind the enemy.", tr: "Bir saldırıdan kaç ve düşmanın arkasında bit." }, cost: "1" },
      { text: { en: "Pickpocket someone without being noticed.", tr: "Birini fark ettirmeden yankesicilik yap." }, cost: "1" },
      { text: { en: "Kill the lights to control a fight.", tr: "Işıkları söndürüp dövüşü kontrol et." }, cost: "2" },
      { text: { en: "Set a poison to trigger at a time you chose earlier.", tr: "Önceden seçtiğin bir anda tetiklenecek bir zehir hazırla." }, cost: "2" },
      { text: { en: "Leave no trace that you were ever there.", tr: "Orada bulunduğuna dair hiçbir iz bırakma." }, cost: "3" },
    ],
    subclasses: [
      {
        id: "assassin",
        slug: "rogue-assassin",
        name: { en: "Assassin", tr: "Suikastçı" },
        tagline: { en: "A killer who sets up a devastating first strike. Pick this for burst damage, poison, and disguise.", tr: "Yıkıcı bir ilk vuruş kuran bir katil. Patlama hasarı, zehir ve kılık değiştirme için seç." },
        domain: { en: "Ambush, poison, disguise, and the killing stroke.", tr: "Pusu, zehir, kılık değiştirme ve öldürücü darbe." },
        ruleBreaker: {
          name: { en: "Killer's Opening", tr: "Katilin Açılışı" },
          text: {
            en: "Your first attack against a creature that has not yet acted in combat is automatically a critical hit. Once per scene.", tr: "Savaşta henüz oynamamış bir yaratığa ilk saldırın otomatik olarak kritik isabettir. Sahne başına bir kez.",
          },
        },
        examples: [
          { text: { en: "Study someone for a while, then impersonate them.", tr: "Birini bir süre incele, sonra onu taklit et." }, cost: "2" },
          { text: { en: "Time a poison to hit exactly when you want.", tr: "Bir zehri, tam istediğin anda etki edecek şekilde ayarla." }, cost: "2" },
          { text: { en: "Predict where a target will be and be ready.", tr: "Bir hedefin nerede olacağını tahmin et ve hazır ol." }, cost: "1" },
        ],
      },
      {
        id: "infiltrator",
        slug: "rogue-infiltrator",
        name: { en: "Infiltrator", tr: "Sızıcı" },
        tagline: { en: "A break-in specialist. Locks, wards, and guards don't stop you. Pick this for heists and getting anywhere.", tr: "Girme uzmanı. Kilitler, korumalar ve nöbetçiler seni durduramaz. Soygunlar ve her yere girmek için seç." },
        domain: { en: "Locks, wards, guards, walls, and everything meant to keep you out.", tr: "Kilitler, korumalar, nöbetçiler, duvarlar ve seni dışarıda tutmak için olan her şey." },
        ruleBreaker: {
          name: { en: "No Such Door", tr: "Öyle Bir Kapı Yok" },
          text: { en: "Ten uninterrupted minutes and you are inside. No roll.", tr: "On kesintisiz dakika ve içeridesin. Atış yok." },
        },
        examples: [
          { text: { en: "Move without leaving tracks or scent.", tr: "İz ya da koku bırakmadan hareket et." }, cost: "1" },
          { text: { en: "Get out calmly, without setting off alarms.", tr: "Alarm çalmadan, sakince çık." }, cost: "1" },
          { text: { en: "Slip past a magic ward without disabling it.", tr: "Bir büyü korumasını devre dışı bırakmadan geç." }, cost: "2" },
        ],
      },
      {
        id: "trickster",
        slug: "rogue-trickster",
        name: { en: "Trickster", tr: "Düzenbaz" },
        tagline: { en: "A con artist who lies, disguises, and misdirects. Pick this for social play and getting out of trouble by talking.", tr: "Yalan söyleyen, kılık değiştiren ve şaşırtan bir dolandırıcı. Sosyal oyun ve konuşarak beladan kurtulmak için seç." },
        domain: { en: "Misdirection, confidence games, and borrowed identities.", tr: "Yanıltma, güven oyunları ve ödünç alınmış kimlikler." },
        ruleBreaker: {
          name: { en: "It Was Always Yours", tr: "Hep Senindi" },
          text: {
            en: "Once per scene, declare that you lifted something plausible from someone you have been near. It's true.", tr: "Sahne başına bir kez, yakınında bulunduğun birinden makul bir şey aşırdığını ilan et. Doğrudur.",
          },
        },
        examples: [
          { text: { en: "Mimic a voice you've heard.", tr: "Duyduğun bir sesi taklit et." }, cost: "1" },
          { text: { en: "Forge a document good enough for one check.", tr: "Bir kontrole dayanacak kadar iyi bir belge sahtele." }, cost: "2" },
          { text: { en: "Turn two enemies against each other.", tr: "İki düşmanı birbirine düşür." }, cost: "3" },
        ],
      },
    ],
  },

  {
    id: "ranger",
    num: 6,
    group: "skirmisher",
    name: { en: "Ranger", tr: "Korucu" },
    hook: { en: "You saw it three hours before it saw you.", tr: "Onu, o seni görmeden üç saat önce gördün." },
    playsLike: {
      en: "Control and consistency. You pick the target and suddenly it's everyone's target. Away from the fight you keep the party alive, fed, and un-lost — the class that makes travel and wilderness actually play instead of being narrated past.", tr: "Kontrol ve tutarlılık. Hedefi sen seçersin ve birden herkesin hedefi olur. Dövüş dışında grubu hayatta, tok ve kaybolmamış tutarsın — yolculuğu ve yabanı geçilip anlatılmak yerine gerçekten oynatan sınıf.",
    },
    hpBase: 10,
    priority: ["DEX", "WIS", "CON"],
    domain: { en: "Wilds, tracks, prey, and the distance between you and it.", tr: "Yaban, izler, av ve seninle onun arasındaki mesafe." },
    kit: { en: "A bow or crossbow, a melee weapon, light armor, a traveller's kit, a map you drew yourself.", tr: "Bir yay ya da arbalet, bir yakın dövüş silahı, hafif zırh, bir yolcu çantası, kendi çizdiğin bir harita." },
    signature: {
      name: { en: "Mark", tr: "İşaretle" },
      text: {
        en: "Free action, 1 Energy. Mark one creature you can see. You deal +1d6 to it, and every ally has advantage tracking it. Lasts the scene. When it dies, Mark the next one free.", tr: "Bedava aksiyon, 1 Enerji. Gördüğün bir yaratığı işaretle. Ona +1d6 verirsin ve her müttefik onu izlemede avantajlı olur. Sahne boyunca sürer. Öldüğünde, bir sonrakini bedava İşaretle.",
      },
    },
    examples: [
      { text: { en: "Read tracks to learn who passed and when.", tr: "İzleri okuyarak kimin ne zaman geçtiğini öğren." }, cost: "1" },
      { text: { en: "Make a precise shot at an object, not a person.", tr: "Bir insana değil, bir nesneye isabetli atış yap." }, cost: "1" },
      { text: { en: "Hit every enemy bunched in one zone with arrows.", tr: "Bir bölgede toplanmış her düşmana oklarla vur." }, cost: "2" },
      { text: { en: "Find a safer route through the wilderness.", tr: "Yabanda daha güvenli bir rota bul." }, cost: "2" },
      { text: { en: "Prepare an ambush spot before a fight starts.", tr: "Dövüş başlamadan önce bir pusu noktası hazırla." }, cost: "3" },
    ],
    subclasses: [
      {
        id: "sharpshooter",
        slug: "ranger-sharpshooter",
        name: { en: "Sharpshooter", tr: "Keskin Nişancı" },
        tagline: { en: "A long-range archer who ignores cover. Pick this for reliable, high-damage ranged attacks from far away.", tr: "Siper tanımayan uzun menzilli bir okçu. Uzaktan güvenilir, yüksek hasarlı menzilli saldırılar için seç." },
        domain: { en: "Distance, wind, patience, and the perfect angle.", tr: "Mesafe, rüzgâr, sabır ve mükemmel açı." },
        ruleBreaker: {
          name: { en: "No Cover", tr: "Siper Yok" },
          text: { en: "Cover and concealment never penalise your ranged attacks.", tr: "Siper ve gizlenme, menzilli saldırılarını asla cezalandırmaz." },
        },
        examples: [
          { text: { en: "Hit one exact weak point from range.", tr: "Uzaktan tek bir zayıf noktaya isabet et." }, cost: "1" },
          { text: { en: "Make a shot no one thought was in range.", tr: "Kimsenin menzilde sanmadığı bir atışı yap." }, cost: "1" },
          { text: { en: "Shoot through a tiny opening.", tr: "Küçücük bir açıklıktan geçir." }, cost: "2" },
        ],
      },
      {
        id: "beast-bond",
        slug: "ranger-beast-bond",
        name: { en: "Beast Bond", tr: "Canavar Bağı" },
        tagline: { en: "A ranger with an animal companion that fights alongside you. Pick this if you want a loyal pet that acts on its own.", tr: "Yanında dövüşen bir hayvan yoldaşı olan korucu. Kendi başına oynayan sadık bir dost isteyenler seçsin." },
        domain: { en: "One animal, and the bond between you.", tr: "Bir hayvan ve aranızdaki bağ." },
        ruleBreaker: {
          name: { en: "Two Bodies", tr: "İki Beden" },
          text: {
            en: "Your companion acts on your initiative and takes its own Action free. Level × 5 HP, attacks at your bonus for d6.", tr: "Yoldaşın senin inisiyatifinde oynar ve kendi Aksiyonunu bedava alır. Seviye × 5 Can, senin bonusunla d6 saldırır.",
          },
        },
        examples: [
          { text: { en: "Send your companion where you can't go.", tr: "Yoldaşını gidemediğin yere gönder." }, cost: "0" },
          { text: { en: "Flank an enemy together with your companion.", tr: "Yoldaşınla birlikte bir düşmanı kuşat." }, cost: "0" },
          { text: { en: "See through your companion's eyes at a distance.", tr: "Uzaktan yoldaşının gözünden gör." }, cost: "1" },
        ],
      },
      {
        id: "trailblazer",
        slug: "ranger-trailblazer",
        name: { en: "Trailblazer", tr: "İz Açan" },
        tagline: { en: "A trap-setter who controls terrain and survival. Pick this if you like preparing the ground before a fight.", tr: "Araziyi ve hayatta kalmayı kontrol eden bir tuzakçı. Dövüşten önce zemini hazırlamayı sevenler seçsin." },
        domain: { en: "Terrain, traps, ambush ground, and survival.", tr: "Arazi, tuzaklar, pusu zemini ve hayatta kalma." },
        ruleBreaker: {
          name: { en: "Prepared Ground", tr: "Hazırlanmış Zemin" },
          text: { en: "Ten minutes in a place and you have set traps. Declare what they do when combat starts.", tr: "Bir yerde on dakika ve tuzakları kurmuşsundur. Savaş başladığında ne yaptıklarını ilan et." },
        },
        examples: [
          { text: { en: "Predict weather and plan travel around it.", tr: "Havayı tahmin et ve yolculuğu ona göre planla." }, cost: "0" },
          { text: { en: "Set a trap strong enough to catch something big.", tr: "Büyük bir şeyi yakalayacak kadar güçlü bir tuzak kur." }, cost: "1" },
          { text: { en: "Guide the party safely through dangerous terrain.", tr: "Grubu tehlikeli araziden güvenle geçir." }, cost: "2" },
        ],
      },
    ],
  },

  {
    id: "bard",
    num: 7,
    group: "skirmisher",
    name: { en: "Bard", tr: "Ozan" },
    hook: { en: "Nobody in the room has noticed yet that you are the one deciding what happens.", tr: "Odada henüz kimse ne olacağına karar verenin sen olduğunu fark etmedi." },
    playsLike: {
      en: "The amplifier. You rarely have the biggest number, but you hand out the die that turns someone else's failure into a success, and you talk the party out of half the fights they'd otherwise lose. The most social class, and unusually good at making everyone else feel powerful.", tr: "Yükseltici. Nadiren en büyük sayı sende olur, ama başkasının başarısızlığını başarıya çeviren zarı verirsin ve grubu, aksi hâlde kaybedecekleri dövüşlerin yarısından konuşarak çıkarırsın. En sosyal sınıf ve herkese kendini güçlü hissettirmekte alışılmadık derecede iyi.",
    },
    hpBase: 8,
    priority: ["CHA", "DEX", "CON"],
    domain: { en: "Story, song, and what people believe about themselves.", tr: "Hikâye, şarkı ve insanların kendileri hakkında inandıkları." },
    kit: { en: "An instrument, light armor, a light weapon, and a debt someone owes you.", tr: "Bir çalgı, hafif zırh, bir hafif silah ve birinin sana olan borcu." },
    signature: {
      name: { en: "Inspiration", tr: "İlham" },
      text: {
        en: "Free action, 1 Energy. Hand an ally a d6. They may add it to any roll before the scene ends. d8 at level 5, d10 at level 9. One per ally at a time.", tr: "Bedava aksiyon, 1 Enerji. Bir müttefike bir d6 ver. Sahne bitmeden herhangi bir atışa ekleyebilirler. 5. seviyede d8, 9. seviyede d10. Aynı anda müttefik başına bir tane.",
      },
    },
    examples: [
      { text: { en: "Talk an enemy out of attacking.", tr: "Bir düşmanı saldırmaktan vazgeçir." }, cost: "1" },
      { text: { en: "Create a convincing sound illusion everyone hears.", tr: "Herkesin duyduğu inandırıcı bir ses illüzyonu yarat." }, cost: "1" },
      { text: { en: "Distract a whole room so allies can act.", tr: "Bütün bir odayı oyala ki müttefikler iş görebilsin." }, cost: "2" },
      { text: { en: "Remove fear from all your allies at once.", tr: "Tüm müttefiklerinin korkusunu bir anda gider." }, cost: "2" },
      { text: { en: "Change what a whole town believes happened.", tr: "Bütün bir kasabanın ne olduğuna dair inancını değiştir." }, cost: "3" },
    ],
    subclasses: [
      {
        id: "wordsmith",
        slug: "bard-wordsmith",
        name: { en: "Wordsmith", tr: "Söz Ustası" },
        tagline: { en: "A social master of courts, rumours, and reputation. Pick this to win through talking, negotiation, and influence.", tr: "Sarayların, söylentilerin ve itibarın sosyal ustası. Konuşarak, müzakereyle ve nüfuzla kazanmak için seç." },
        domain: { en: "Persuasion, courts, rumour, negotiation, reputation.", tr: "İkna, saraylar, söylenti, müzakere, itibar." },
        ruleBreaker: {
          name: { en: "Word Ahead", tr: "Önden Söz" },
          text: { en: "When you arrive somewhere new, you decide what they have already heard about you.", tr: "Yeni bir yere vardığında, hakkında önceden ne duyduklarına sen karar verirsin." },
        },
        examples: [
          { text: { en: "Read a room and learn what people want.", tr: "Bir odayı oku ve insanların ne istediğini öğren." }, cost: "1" },
          { text: { en: "Talk your way out of a hopeless situation.", tr: "Umutsuz bir durumdan konuşarak çık." }, cost: "2" },
          { text: { en: "Spread a rumour that arrives ahead of you.", tr: "Senden önce varan bir söylenti yay." }, cost: "2" },
        ],
      },
      {
        id: "warsinger",
        slug: "bard-warsinger",
        name: { en: "Warsinger", tr: "Savaş Ozanı" },
        tagline: { en: "A battle bard who buffs allies and coordinates attacks. Pick this to make the whole team fight better in combat.", tr: "Müttefikleri güçlendiren ve saldırıları eşgüdümleyen bir savaş ozanı. Bütün takımın dövüşte daha iyi savaşmasını sağlamak için seç." },
        domain: { en: "Rhythm, courage, coordination, and organised violence.", tr: "Ritim, cesaret, koordinasyon ve örgütlü şiddet." },
        ruleBreaker: {
          name: { en: "Marching Song", tr: "Yürüyüş Şarkısı" },
          text: { en: "Spending your Inspiration also grants that ally a free Move.", tr: "İlhamını harcamak o müttefike bedava bir Hareket de kazandırır." },
        },
        examples: [
          { text: { en: "Signal your party to act in sync.", tr: "Grubunu uyum içinde oynamaları için işaret et." }, cost: "0" },
          { text: { en: "Steady weak allies to hold one more round.", tr: "Zayıf müttefikleri bir tur daha dayanmaları için sağlamlaştır." }, cost: "2" },
          { text: { en: "Let every ally attack at once, on your cue.", tr: "İşaretinle her müttefikin bir anda saldırmasını sağla." }, cost: "3" },
        ],
      },
      {
        id: "taleweaver",
        slug: "bard-taleweaver",
        name: { en: "Taleweaver", tr: "Masal Dokuyucu" },
        tagline: { en: "An illusionist bard who bends what people see and remember. Pick this for tricks, disguise, and battlefield deception.", tr: "İnsanların gördüğünü ve hatırladığını büken bir illüzyon ozanı. Numaralar, kılık değiştirme ve savaş alanı aldatması için seç." },
        domain: { en: "Illusion, glamour, false memory, and things that seem.", tr: "İllüzyon, göz boyama, sahte hafıza ve gibi görünen şeyler." },
        ruleBreaker: {
          name: { en: "It Looked Real", tr: "Gerçek Gibiydi" },
          text: {
            en: "1 Energy: an illusion fills a zone and engages every sense. It fails only when something touches it.", tr: "1 Enerji: bir illüzyon bir bölgeyi doldurur ve her duyuyu meşgul eder. Yalnızca bir şey ona dokunduğunda bozulur.",
          },
        },
        examples: [
          { text: { en: "Create the illusion of a whole army.", tr: "Bütün bir ordunun illüzyonunu yarat." }, cost: "2" },
          { text: { en: "Disguise yourself as someone else for a scene.", tr: "Bir sahne boyunca kendini başka biri olarak göster." }, cost: "2" },
          { text: { en: "Plant a false memory of something that didn't happen.", tr: "Yaşanmamış bir şeyin sahte anısını yerleştir." }, cost: "3" },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────── THE FOUR MAGICS
  {
    id: "wizard",
    num: 8,
    group: "magic",
    name: { en: "Wizard", tr: "Büyücü" },
    hook: { en: "It took eleven years. You have notes.", tr: "On bir yıl sürdü. Notların var." },
    playsLike: {
      en: "Preparation rewarded. Choose well at the start of the day and you're the most efficient caster at the table; get caught outside your preparation and you're a person in a robe. The most versatile class across a whole session, and the most punishing of laziness.", tr: "Hazırlığın ödülü. Günün başında iyi seç ve masadaki en verimli büyücü ol; hazırlığının dışında yakalan ve cübbeli bir insan ol. Bütün bir oturum boyunca en çok yönlü sınıf ve tembelliği en çok cezalandıran.",
    },
    hpBase: 6,
    priority: ["INT", "CON", "DEX"],
    domain: { en: "Studied magic. Anything you have written down.", tr: "Çalışılmış büyü. Yazıya döktüğün her şey." },
    kit: { en: "A grimoire, robes, a focus, ink and vellum, and one experiment that went badly.", tr: "Bir büyü kitabı, cübbeler, bir odak, mürekkep ve parşömen ve kötü giden bir deney." },
    signature: {
      name: { en: "Grimoire", tr: "Büyü Kitabı" },
      text: {
        en: "On each Long Rest, prepare three Focuses — narrow themes from your Domain (fire · doors · memory · weight · water). Effects inside a prepared Focus cost −1 Energy.", tr: "Her Uzun Dinlenmede üç Odak hazırla — Alanından dar temalar (ateş · kapılar · hafıza · ağırlık · su). Hazırlanmış bir Odağın içindeki Etkiler −1 Enerji.",
      },
    },
    signatureExtra: {
      name: { en: "Ritual", tr: "Ayin" },
      text: { en: "You may cast any Effect as a Ritual: ten minutes, no Energy at all — but never during combat.", tr: "Herhangi bir Etkiyi Ayin olarak yapabilirsin: on dakika, hiç Enerji yok — ama asla savaş sırasında değil." },
    },
    examples: [
      { text: { en: "A tiny free effect — a spark, a breeze, a small trick.", tr: "Küçük bedava bir etki — bir kıvılcım, bir esinti, ufak bir numara." }, cost: "0" },
      { text: { en: "Magically open a lock.", tr: "Bir kilidi büyüyle aç." }, cost: "1" },
      { text: { en: "Hit everyone in a doorway or zone with fire.", tr: "Bir kapıdaki ya da bölgedeki herkese ateşle vur." }, cost: "2" },
      { text: { en: "Destroy a structure like a bridge.", tr: "Köprü gibi bir yapıyı yok et." }, cost: "2" },
      { text: { en: "Cancel an enemy's spell as it's cast.", tr: "Bir düşmanın büyüsünü yapılırken iptal et." }, cost: "= its cost" },
      { text: { en: "Spend ten minutes to make a strong ward (a Ritual, no Energy).", tr: "On dakika harcayıp güçlü bir koruma yap (Ayin, Enerji harcamaz)." }, cost: "0 · Ritual" },
    ],
    subclasses: [
      {
        id: "illusionist",
        slug: "wizard-illusionist",
        name: { en: "Illusionist", tr: "İllüzyonist" },
        tagline: { en: "A wizard who makes fakes that people believe. Pick this for deception, invisibility, and mind tricks.", tr: "İnsanların inandığı sahtelikler yapan bir büyücü. Aldatma, görünmezlik ve zihin oyunları için seç." },
        domain: { en: "Light, sound, seeming, and belief.", tr: "Işık, ses, görünüş ve inanç." },
        ruleBreaker: {
          name: { en: "Doubt", tr: "Şüphe" },
          text: { en: "Anyone trying to disbelieve your illusions rolls at disadvantage.", tr: "İllüzyonlarına inanmamaya çalışan herkes dezavantajlı atar." },
        },
        examples: [
          { text: { en: "Create a fake wall that looks and feels real.", tr: "Gerçek görünen ve hissedilen sahte bir duvar yarat." }, cost: "1" },
          { text: { en: "Turn invisible until you attack.", tr: "Saldırana kadar görünmez ol." }, cost: "2" },
          { text: { en: "Make an enemy believe an illusion so hard it hurts them.", tr: "Bir düşmanı bir illüzyona öyle inandır ki ona zarar versin." }, cost: "3" },
        ],
      },
      {
        id: "wardmaster",
        slug: "wizard-wardmaster",
        name: { en: "Wardmaster", tr: "Koruma Ustası" },
        tagline: { en: "A defensive wizard of barriers and banishment. Pick this to protect the party and shut down enemy magic.", tr: "Bariyerlerin ve sürgünün savunmacı büyücüsü. Grubu korumak ve düşman büyüsünü durdurmak için seç." },
        domain: { en: "Barriers, binding, banishment, and protection.", tr: "Bariyerler, bağlama, sürgün ve koruma." },
        ruleBreaker: {
          name: { en: "Standing Ward", tr: "Sürekli Koruma" },
          text: { en: "A ward is always up. The first Level × 4 damage you take each scene is absorbed.", tr: "Bir koruma her zaman aktiftir. Her sahnede aldığın ilk Seviye × 4 hasar emilir." },
        },
        examples: [
          { text: { en: "Put up a barrier nothing can cross.", tr: "Hiçbir şeyin geçemeyeceği bir bariyer kur." }, cost: "2" },
          { text: { en: "Undo a magical binding or seal.", tr: "Bir büyü bağını ya da mührü çöz." }, cost: "2" },
          { text: { en: "Banish a summoned creature away.", tr: "Çağrılmış bir yaratığı sürgün et." }, cost: "4" },
        ],
      },
      {
        id: "diviner",
        slug: "wizard-diviner",
        name: { en: "Diviner", tr: "Kâhin" },
        tagline: { en: "A wizard who sees the future and knows secrets. Pick this to scout, learn hidden things, and rewrite one roll.", tr: "Geleceği gören ve sırları bilen bir büyücü. Keşif yapmak, gizlileri öğrenmek ve bir atışı yeniden yazmak için seç." },
        domain: { en: "Knowledge, scrying, portents, and the shape of what is coming.", tr: "Bilgi, uzağı görme, alâmetler ve gelmekte olanın şekli." },
        ruleBreaker: {
          name: { en: "Foreseen", tr: "Öngörülmüş" },
          text: {
            en: "At the start of each session, roll a d20 and write it down. Once, you may replace any roll at the table — yours, an ally's, or the Story God's — with that number.", tr: "Her oturumun başında bir d20 at ve yaz. Bir kez, masadaki herhangi bir atışı — kendininki, bir müttefikinki ya da Hikâye Tanrısı'nınki — o sayıyla değiştirebilirsin.",
          },
        },
        examples: [
          { text: { en: "Warn an ally of danger seconds before it happens.", tr: "Bir müttefiki tehlikeden saniyeler önce uyar." }, cost: "1" },
          { text: { en: "Spy on a place you're not in.", tr: "İçinde olmadığın bir yeri gözetle." }, cost: "2" },
          { text: { en: "Learn a secret like a true name in advance.", tr: "Gerçek isim gibi bir sırrı önceden öğren." }, cost: "3" },
        ],
      },
      {
        id: "transmuter",
        slug: "wizard-transmuter",
        name: { en: "Transmuter", tr: "Dönüştürücü" },
        tagline: { en: "A wizard who changes what things are made of. Pick this to reshape objects and terrain on the fly.", tr: "Şeylerin neyden yapıldığını değiştiren bir büyücü. Nesneleri ve araziyi anında yeniden biçimlendirmek için seç." },
        domain: { en: "Matter, form, weight, state, and change.", tr: "Madde, biçim, ağırlık, hâl ve değişim." },
        ruleBreaker: {
          name: { en: "Nothing Is Fixed", tr: "Hiçbir Şey Sabit Değil" },
          text: { en: "Once per scene, permanently change one property of an object you can touch. Free.", tr: "Sahne başına bir kez, dokunabildiğin bir nesnenin bir özelliğini kalıcı olarak değiştir. Bedava." },
        },
        examples: [
          { text: { en: "Turn solid ground into water under an enemy.", tr: "Bir düşmanın altındaki katı zemini suya çevir." }, cost: "1" },
          { text: { en: "Turn a solid barrier into something flimsy.", tr: "Sağlam bir engeli çürük bir şeye çevir." }, cost: "1" },
          { text: { en: "Change an object's weight to your advantage.", tr: "Bir nesnenin ağırlığını lehine değiştir." }, cost: "2" },
        ],
      },
    ],
  },

  {
    id: "sorcerer",
    num: 9,
    group: "magic",
    name: { en: "Sorcerer", tr: "Sihirbaz" },
    hook: { en: "You did not learn this. It was already in you and it has been waiting.", tr: "Bunu öğrenmedin. Zaten içindeydi ve bekliyordu." },
    playsLike: {
      en: "Raw and flexible. Your Bend lets you reshape any Effect on the fly, so you improvise better than anyone. No book to lose, no patron to answer to — just a bloodline that occasionally has ideas of its own. The most elemental class, and the one where the subclass matters most.", tr: "Ham ve esnek. Bükme'n herhangi bir Etkiyi anında yeniden şekillendirmene izin verir, bu yüzden herkesten daha iyi doğaçlama yaparsın. Kaybedecek kitap yok, hesap verecek patron yok — sadece ara sıra kendi fikirleri olan bir soy. En elementsel sınıf ve alt sınıfın en çok önem taşıdığı sınıf.",
    },
    hpBase: 6,
    priority: ["CON", "DEX", "CHA"],
    domain: { en: "Magic that lives in your blood. It never needed a book.", tr: "Kanında yaşayan büyü. Hiç kitaba ihtiyaç duymadı." },
    kit: { en: "Whatever you were wearing when it first happened, and the mark it left.", tr: "İlk olduğunda üstünde ne varsa ve bıraktığı iz." },
    signature: {
      name: { en: "Bend", tr: "Bükme" },
      text: {
        en: "When you produce an Effect, spend 1 extra Energy to apply one of these: Twin (a second target) · Reach (one zone further) · Silent (no words, no gestures) · Quick (costs no Action) · Brutal (maximise one damage die).", tr: "Bir Etki ürettiğinde, şunlardan birini uygulamak için 1 ekstra Enerji harca: İkiz (ikinci bir hedef) · Erişim (bir bölge daha) · Sessiz (söz yok, jest yok) · Hızlı (Aksiyon harcamaz) · Vahşi (bir hasar zarını maksimuma çıkar).",
      },
    },
    signatureExtra: {
      name: { en: "Wild Surge", tr: "Vahşi Taşkın" },
      text: {
        en: "You may cast without paying. Roll d20: on 10+ it's free. On 9 or less you pay double and the Story God adds a complication.", tr: "Ödemeden büyü yapabilirsin. d20 at: 10+ ise bedava. 9 ve altında iki katını ödersin ve Hikâye Tanrısı bir komplikasyon ekler.",
      },
    },
    examples: [
      { text: { en: "A small free zap of magic.", tr: "Küçük bedava bir büyü çarpması." }, cost: "0" },
      { text: { en: "Hit one enemy with your element.", tr: "Bir düşmana elementinle vur." }, cost: "1" },
      { text: { en: "Hit two targets at once (using Twin).", tr: "İki hedefe birden vur (İkiz ile)." }, cost: "2 · Twin" },
      { text: { en: "Cast with no words or gestures (using Silent).", tr: "Söz ya da jest olmadan büyü yap (Sessiz ile)." }, cost: "2 · Silent" },
      { text: { en: "Hit everyone in a whole corridor from a distance.", tr: "Uzaktan bütün bir koridordaki herkese vur." }, cost: "3" },
    ],
    subclasses: [
      {
        id: "pyromancer",
        slug: "sorcerer-pyromancer",
        name: { en: "Pyromancer", tr: "Ateş Büyücüsü" },
        tagline: { en: "A fire sorcerer immune to their own flames. Pick this for raw fire damage and walking through infernos.", tr: "Kendi alevlerine bağışık bir ateş sihirbazı. Ham ateş hasarı ve alevlerin içinden yürümek için seç." },
        domain: { en: "Fire, heat, ash, and light.", tr: "Ateş, ısı, kül ve ışık." },
        ruleBreaker: {
          name: { en: "Unburnt", tr: "Yanmayan" },
          text: { en: "Fire never harms you, and yours never harms your allies unless you want it to.", tr: "Ateş sana asla zarar vermez ve seninki, sen istemedikçe müttefiklerine asla zarar vermez." },
        },
        examples: [
          { text: { en: "Walk through fire unharmed.", tr: "Ateşin içinden zarar görmeden yürü." }, cost: "0" },
          { text: { en: "Burn an enemy from a distance.", tr: "Uzaktaki bir düşmanı yak." }, cost: "1" },
          { text: { en: "Control your fire so it burns only what you choose.", tr: "Ateşini yalnızca seçtiğini yakacak şekilde kontrol et." }, cost: "2" },
        ],
      },
      {
        id: "cryomancer",
        slug: "sorcerer-cryomancer",
        name: { en: "Cryomancer", tr: "Buz Büyücüsü" },
        tagline: { en: "An ice sorcerer who slows and freezes enemies. Pick this for crowd control and locking enemies down.", tr: "Düşmanları yavaşlatan ve donduran bir buz sihirbazı. Kalabalık kontrolü ve düşmanları kilitlemek için seç." },
        domain: { en: "Ice, cold, stillness, and slowing.", tr: "Buz, soğuk, durgunluk ve yavaşlatma." },
        ruleBreaker: {
          name: { en: "Chill", tr: "Ürperti" },
          text: { en: "Any creature damaged by your cold is Slowed until the end of its next turn. No save.", tr: "Soğuğundan hasar alan her yaratık, bir sonraki turunun sonuna kadar Yavaşlatılmış olur. Kurtarış yok." },
        },
        examples: [
          { text: { en: "Freeze a wound closed to stop bleeding.", tr: "Kanamayı durdurmak için yarayı dondurarak kapat." }, cost: "1" },
          { text: { en: "Freeze water into a bridge or wall.", tr: "Suyu bir köprü ya da duvar hâline dondur." }, cost: "2" },
          { text: { en: "Slow everyone in the area, yourself included.", tr: "Alandaki herkesi yavaşlat, kendin dâhil." }, cost: "3" },
        ],
      },
      {
        id: "stormblood",
        slug: "sorcerer-stormblood",
        name: { en: "Stormblood", tr: "Fırtına Kanı" },
        tagline: { en: "A lightning sorcerer whose bolts jump between enemies. Pick this to hit multiple targets with electricity.", tr: "Şimşekleri düşmanlar arasında sıçrayan bir sihirbaz. Elektrikle birden çok hedefe vurmak için seç." },
        domain: { en: "Lightning, thunder, wind, and pressure.", tr: "Şimşek, gök gürültüsü, rüzgâr ve basınç." },
        ruleBreaker: {
          name: { en: "Arc", tr: "Sıçrama" },
          text: { en: "Your lightning Effects jump to a second target at no additional cost. Always.", tr: "Şimşek Etkilerin ek maliyet olmadan ikinci bir hedefe sıçrar. Her zaman." },
        },
        examples: [
          { text: { en: "Ride the wind up to a higher spot.", tr: "Rüzgârı bir üst kata bin." }, cost: "1" },
          { text: { en: "Aim lightning at exactly the enemy you want.", tr: "Şimşeği tam istediğin düşmana yönelt." }, cost: "1" },
          { text: { en: "Hit a group with a blast of thunder.", tr: "Bir grubu bir gök gürültüsü patlamasıyla vur." }, cost: "2" },
        ],
      },
      {
        id: "dragonblood",
        slug: "sorcerer-dragonblood",
        name: { en: "Dragonblood", tr: "Ejderha Kanı" },
        tagline: { en: "A sorcerer with draconic scales, wings, and breath. Pick this for a tough caster with a wide breath attack.", tr: "Ejderha pulları, kanatları ve nefesi olan bir sihirbaz. Geniş bir nefes saldırısı olan dayanıklı bir büyücü için seç." },
        domain: { en: "Draconic power: breath, scale, wing, and the weight of an old thing's stare.", tr: "Ejderha gücü: nefes, pul, kanat ve kadim bir şeyin bakışının ağırlığı." },
        ruleBreaker: {
          name: { en: "Breath", tr: "Nefes" },
          text: { en: "2 Energy: 3d6 of your element across an entire zone. No Bend required, no cost increase.", tr: "2 Enerji: bütün bir bölgeye elementinden 3d6. Bükme gerekmez, maliyet artışı yok." },
        },
        examples: [
          { text: { en: "Grow wings and fly for a while.", tr: "Kanatlar çıkar ve bir süre uç." }, cost: "1" },
          { text: { en: "Freeze a crowd in place with a draconic stare.", tr: "Ejderha bakışıyla bir kalabalığı yerinde dondur." }, cost: "2" },
          { text: { en: "Speak with a voice that shakes the ground.", tr: "Yeri sarsan bir sesle konuş." }, cost: "2" },
        ],
      },
      {
        id: "elderblood",
        slug: "sorcerer-elderblood",
        name: { en: "Elderblood", tr: "Kadim Kan" },
        tagline: { en: "A sorcerer of raw, ancient magic beyond the elements. Pick this if you want the most flexible, unpredictable caster.", tr: "Elementlerin ötesinde ham, kadim büyünün sihirbazı. En esnek ve öngörülemez büyücüyü isteyenler seçsin." },
        domain: { en: "Primordial magic: the raw stuff, from before anyone divided it into elements.", tr: "İlksel büyü: ham hâli, kimse onu elementlere bölmeden öncesinden." },
        ruleBreaker: {
          name: { en: "Before Names", tr: "İsimlerden Önce" },
          text: {
            en: "Once per scene, produce an Effect outside your Class Domain at normal cost and with no disadvantage. It was all one thing, once.", tr: "Sahne başına bir kez, Sınıf Alanının dışında bir Etkiyi normal maliyetle ve dezavantajsız üret. Bir zamanlar hepsi tek bir şeydi.",
          },
        },
        examples: [
          { text: { en: "Cast magic that fits no known category.", tr: "Bilinen hiçbir kategoriye uymayan büyü yap." }, cost: "1" },
          { text: { en: "Use ancient, primal power.", tr: "Kadim, ilksel bir gücü kullan." }, cost: "2" },
          { text: { en: "Cast an effect outside your normal Domain without penalty.", tr: "Normal Alanının dışında bir etkiyi cezasız yap." }, cost: "2" },
        ],
      },
    ],
  },

  {
    id: "warlock",
    num: 10,
    group: "magic",
    name: { en: "Warlock", tr: "Pakt Büyücüsü" },
    hook: { en: "You didn't earn this and you didn't inherit it. You agreed to terms.", tr: "Bunu ne hak ettin ne de miras aldın. Şartları kabul ettin." },
    playsLike: {
      en: "Burst and consequence. Your Energy comes back on a Short Rest, so where other casters ration, you spend everything and then rest. The trade is that something out there has a claim on you, and the Story God gets to use it. The darkest class in the game, and the one that generates the most story on its own.", tr: "Patlama ve sonuç. Enerjin Kısa Dinlenmede geri gelir, o yüzden diğer büyücüler idare ederken sen her şeyi harcar sonra dinlenirsin. Karşılığında dışarıda bir şeyin senin üzerinde hakkı vardır ve Hikâye Tanrısı onu kullanır. Oyundaki en karanlık sınıf ve kendi başına en çok hikâye üreten.",
    },
    hpBase: 8,
    priority: ["WIS", "CON", "CHA"],
    domain: { en: "Borrowed power. Whatever your Patron is willing to lend, and it is not always the same amount.", tr: "Ödünç güç. Patronun ne ödünç vermeye razıysa, ve bu her zaman aynı miktar değildir." },
    kit: { en: "A focus your Patron chose for you, light armor, and the terms of the agreement, if you were given a copy.", tr: "Patronunun senin için seçtiği bir odak, hafif zırh ve anlaşmanın şartları, sana bir kopya verildiyse." },
    signature: {
      name: { en: "The Bargain", tr: "Pazarlık" },
      text: { en: "You recover your full Energy on a Short Rest, not half.", tr: "Kısa Dinlenmede yarısını değil, tüm Enerjini geri kazanırsın." },
    },
    signatureExtra: {
      name: { en: "The Debt", tr: "Borç" },
      text: {
        en: "Once per session the Story God may call it in: an instruction, a demand, a price. You may refuse — and lose your Signature and Rule Breaker until you make amends. Your Patron does not explain and does not negotiate.", tr: "Oturum başına bir kez Hikâye Tanrısı onu çağırabilir: bir talimat, bir talep, bir bedel. Reddedebilirsin — ve telafi edene kadar İmzanı ve Kural Kırıcını kaybedersin. Patronun açıklama yapmaz ve pazarlık etmez.",
      },
    },
    examples: [
      { text: { en: "Unnerve an enemy with a whisper.", tr: "Bir fısıltıyla bir düşmanın sinirini boz." }, cost: "0" },
      { text: { en: "Frighten an enemy into fleeing.", tr: "Bir düşmanı kaçacak kadar korkut." }, cost: "1" },
      { text: { en: "Ask your patron for information.", tr: "Patronundan bilgi iste." }, cost: "1" },
      { text: { en: "Take control of the shadows in an area.", tr: "Bir alandaki gölgelerin kontrolünü ele geçir." }, cost: "2" },
      { text: { en: "Rot everything in a corridor.", tr: "Bir koridordaki her şeyi çürüt." }, cost: "3" },
    ],
    subclasses: [
      {
        id: "the-fiend",
        slug: "warlock-the-fiend",
        name: { en: "The Fiend", tr: "İblis" },
        tagline: { en: "A warlock of hellfire and curses who can burn HP for power. Pick this for aggressive magic and binding deals.", tr: "Güç için Can yakabilen, cehennem ateşi ve lanet warlock'u. Saldırgan büyü ve bağlayıcı anlaşmalar için seç." },
        domain: { en: "Hellfire, contracts, temptation, and curses that stick.", tr: "Cehennem ateşi, sözleşmeler, ayartma ve yapışan lanetler." },
        ruleBreaker: {
          name: { en: "Blood Price", tr: "Kan Bedeli" },
          text: { en: "Pay any Energy cost with HP instead, at 2 HP per Energy. Your Patron finds this funny.", tr: "Herhangi bir Enerji maliyetini yerine Canla öde, Enerji başına 2 Can. Patronun bunu komik buluyor." },
        },
        examples: [
          { text: { en: "Offer a tempting deal that hides a catch.", tr: "İçinde bir tuzak saklayan cazip bir anlaşma sun." }, cost: "1" },
          { text: { en: "Burn the guilty worse than the innocent.", tr: "Suçluyu masumdan daha çok yak." }, cost: "2" },
          { text: { en: "Set a curse that lifts only on confession.", tr: "Yalnızca itirafla kalkan bir lanet koy." }, cost: "2" },
        ],
      },
      {
        id: "the-void",
        slug: "warlock-the-void",
        name: { en: "The Void", tr: "Boşluk" },
        tagline: { en: "A warlock of the mind who reads and breaks enemies. Pick this for telepathy, fear, and psychic attacks.", tr: "Düşmanları okuyup kıran, zihnin warlock'u. Telepati, korku ve psişik saldırılar için seç." },
        domain: { en: "Madness, distance, the mind, and things never meant to be perceived.", tr: "Delilik, mesafe, zihin ve asla algılanmaması gereken şeyler." },
        ruleBreaker: {
          name: { en: "Telepathy", tr: "Telepati" },
          text: { en: "You speak mind to mind with anything that has a mind, at any distance you can perceive it.", tr: "Zihni olan her şeyle, onu algılayabildiğin herhangi bir mesafede zihinden zihne konuşursun." },
        },
        examples: [
          { text: { en: "Read what an enemy fears.", tr: "Bir düşmanın neyden korktuğunu oku." }, cost: "1" },
          { text: { en: "Attack an enemy's mind, unheard by others.", tr: "Bir düşmanın zihnine, başkaları duymadan saldır." }, cost: "2" },
          { text: { en: "Break an enemy's mind with a terrible truth.", tr: "Korkunç bir gerçekle bir düşmanın aklını boz." }, cost: "3" },
        ],
      },
      {
        id: "the-hunger",
        slug: "warlock-the-hunger",
        name: { en: "The Hunger", tr: "Açlık" },
        tagline: { en: "A warlock of decay who grows stronger as things die. Pick this for a durable caster who feeds on the battlefield.", tr: "Şeyler öldükçe güçlenen, çürüme warlock'u. Savaş alanından beslenen dayanıklı bir büyücü için seç." },
        domain: { en: "Consumption, decay, plague, and the slow taking of things.", tr: "Tüketim, çürüme, veba ve şeylerin yavaşça alınması." },
        ruleBreaker: {
          name: { en: "Feed", tr: "Beslen" },
          text: { en: "When a creature dies within Near of you, gain 2 Energy and heal d6.", tr: "Yakınında bir yaratık öldüğünde 2 Enerji kazan ve d6 iyileş." },
        },
        examples: [
          { text: { en: "Stop an enemy's wounds from healing.", tr: "Bir düşmanın yaralarının iyileşmesini engelle." }, cost: "1" },
          { text: { en: "Rot a barrier away to open a path.", tr: "Bir engeli çürüterek yol aç." }, cost: "2" },
          { text: { en: "Take a memory from someone and keep it.", tr: "Birinden bir anı al ve sakla." }, cost: "2" },
        ],
      },
    ],
  },

  {
    id: "necromancer",
    num: 11,
    group: "magic",
    name: { en: "Necromancer", tr: "Ölüm Büyücüsü" },
    hook: { en: "Death is not a wall. It is a door with a specific and knowable mechanism.", tr: "Ölüm bir duvar değil. Belirli ve bilinebilir bir mekanizması olan bir kapı." },
    playsLike: {
      en: "A resource engine. Every corpse on the field is fuel, so the longer a fight runs the stronger you get. You're a caster who wants the body count. Socially you're a liability in most towns, which is part of the fun.", tr: "Bir kaynak motoru. Sahadaki her ceset yakıttır, o yüzden dövüş uzadıkça güçlenirsin. Ceset sayısını isteyen bir büyücüsün. Sosyal olarak çoğu kasabada bir yüksün, ve eğlencenin bir kısmı da bu.",
    },
    hpBase: 8,
    priority: ["INT", "CON", "CHA"],
    domain: { en: "Death, the dead, and everything that leaks out of them.", tr: "Ölüm, ölüler ve onlardan sızan her şey." },
    kit: { en: "Dark robes, a focus of bone or iron, a surgeon's tools, and a list of names.", tr: "Koyu cübbeler, kemik ya da demir bir odak, bir cerrah aletleri ve bir isim listesi." },
    signature: {
      name: { en: "Harvest", tr: "Hasat" },
      text: {
        en: "When any creature dies within Near of you, gain 2 Energy. No limit, no cooldown, and it does not care whose side they were on.", tr: "Yakınında herhangi bir yaratık öldüğünde 2 Enerji kazan. Limit yok, bekleme yok, ve kimin tarafında olduklarını umursamaz.",
      },
    },
    examples: [
      { text: { en: "Question a corpse for a short answer.", tr: "Kısa bir cevap için bir cesedi sorgula." }, cost: "1" },
      { text: { en: "Raise a corpse to serve you for about a day.", tr: "Bir cesedi yaklaşık bir günlüğüne sana hizmet etmesi için kaldır." }, cost: "2" },
      { text: { en: "Drain the strength from everyone living in a zone.", tr: "Bir bölgedeki tüm canlıların gücünü çek." }, cost: "2" },
      { text: { en: "Move a wound from an ally onto an enemy.", tr: "Bir yarayı bir müttefikten bir düşmana taşı." }, cost: "2" },
      { text: { en: "Raise every corpse in a graveyard at once.", tr: "Bir mezarlıktaki her cesedi bir anda kaldır." }, cost: "4" },
    ],
    subclasses: [
      {
        id: "bonewright",
        slug: "necromancer-bonewright",
        name: { en: "Bonewright", tr: "Kemik Ustası" },
        tagline: { en: "A necromancer with a permanent skeleton servant. Pick this if you want a reliable pet that fights every turn.", tr: "Kalıcı bir iskelet hizmetkârı olan bir ölüm büyücüsü. Her tur dövüşen güvenilir bir dost isteyenler seçsin." },
        domain: { en: "Bone, marrow, structure, and the architecture of a body.", tr: "Kemik, ilik, yapı ve bir bedenin mimarisi." },
        ruleBreaker: {
          name: { en: "Ossuary", tr: "Kemiklik" },
          text: {
            en: "You always have a servant: a skeleton with Level × 3 HP that acts on your turn. If it breaks, build another over any rest, out of whatever is lying around.", tr: "Her zaman bir hizmetkârın vardır: senin turunda oynayan Seviye × 3 Canlı bir iskelet. Kırılırsa, herhangi bir dinlenmede etraftaki neyse ondan bir yenisini yap.",
          },
        },
        examples: [
          { text: { en: "Learn how something died from its bones.", tr: "Kemiklerinden bir şeyin nasıl öldüğünü öğren." }, cost: "1" },
          { text: { en: "Grow bone armour from your own body.", tr: "Kendi bedeninden kemik zırh büyüt." }, cost: "2" },
          { text: { en: "Build a wall of interlocking bone.", tr: "Birbirine geçmiş kemikten bir duvar yap." }, cost: "2" },
        ],
      },
      {
        id: "bloodletter",
        slug: "necromancer-bloodletter",
        name: { en: "Bloodletter", tr: "Kan Alıcı" },
        tagline: { en: "A necromancer who moves blood and life between bodies. Pick this to heal by draining, and pay for magic with HP.", tr: "Kanı ve hayatı bedenler arasında taşıyan bir ölüm büyücüsü. Çekerek iyileştirmek ve büyüyü Canla ödemek için seç." },
        domain: { en: "Blood, vitality, wounds, and trading one body's health for another's.", tr: "Kan, canlılık, yaralar ve bir bedenin sağlığını bir başkasınınkiyle takas etmek." },
        ruleBreaker: {
          name: { en: "The Exchange", tr: "Takas" },
          text: {
            en: "Pay any Energy cost with HP at 2 HP per Energy — your own, or that of any willing or Downed creature you're touching.", tr: "Herhangi bir Enerji maliyetini Enerji başına 2 Canla öde — kendininki ya da dokunduğun istekli veya Düşmüş herhangi bir yaratığınki.",
          },
        },
        examples: [
          { text: { en: "Heal an ally using an enemy's blood.", tr: "Bir müttefiki bir düşmanın kanıyla iyileştir." }, cost: "2" },
          { text: { en: "Boil the blood of someone you've tasted.", tr: "Kanını tattığın birinin kanını kaynat." }, cost: "3" },
          { text: { en: "Stop an enemy's heart from a distance.", tr: "Uzaktan bir düşmanın kalbini durdur." }, cost: "4" },
        ],
      },
      {
        id: "cursebearer",
        slug: "necromancer-cursebearer",
        name: { en: "Cursebearer", tr: "Lanet Taşıyıcı" },
        tagline: { en: "A necromancer of long-lasting curses. Pick this to set curses that trigger later on conditions you choose.", tr: "Uzun süreli lanetlerin ölüm büyücüsü. Sonradan, seçtiğin koşullarda tetiklenen lanetler koymak için seç." },
        domain: { en: "Curses, hexes, slow rot, and consequences that arrive late.", tr: "Lanetler, büyüler, yavaş çürüme ve geç gelen sonuçlar." },
        ruleBreaker: {
          name: { en: "It Keeps", tr: "Bekler" },
          text: {
            en: "Your curses have no duration. They last until their condition is met, and you set the condition when you cast them.", tr: "Lanetlerinin süresi yoktur. Koşulları yerine gelene kadar sürerler ve koşulu onları yaparken sen belirlersin.",
          },
        },
        examples: [
          { text: { en: "Curse a name so speaking it causes pain.", tr: "Bir ismi, söylenmesi acı verecek şekilde lanetle." }, cost: "2" },
          { text: { en: "Set a curse that only triggers on a condition.", tr: "Yalnızca bir koşulda tetiklenen bir lanet koy." }, cost: "2" },
          { text: { en: "Lay a lasting curse of bad luck.", tr: "Kalıcı bir kötü şans laneti koy." }, cost: "3" },
        ],
      },
      {
        id: "spiritbinder",
        slug: "necromancer-spiritbinder",
        name: { en: "Spiritbinder", tr: "Ruh Bağlayıcı" },
        tagline: { en: "A necromancer who talks to and binds spirits. Pick this for ghosts, secrets from the dead, and soul magic.", tr: "Ruhlarla konuşan ve onları bağlayan bir ölüm büyücüsü. Hayaletler, ölülerden sırlar ve ruh büyüsü için seç." },
        domain: { en: "Souls, ghosts, memory, and what remains when nothing physical does.", tr: "Ruhlar, hayaletler, hafıza ve fiziksel hiçbir şey kalmadığında kalan şey." },
        ruleBreaker: {
          name: { en: "The Dead Speak Freely", tr: "Ölüler Serbestçe Konuşur" },
          text: {
            en: "You see and speak with the dead at all times, at no cost. They see you too, and some of them have been waiting.", tr: "Ölüleri her zaman, hiçbir maliyet olmadan görür ve onlarla konuşursun. Onlar da seni görür ve bazıları bekliyordu.",
          },
        },
        examples: [
          { text: { en: "Ask a ghost what it witnessed.", tr: "Bir hayalete neye tanık olduğunu sor." }, cost: "0" },
          { text: { en: "Force a lingering spirit to move on.", tr: "Oyalanan bir ruhu geçip gitmeye zorla." }, cost: "2" },
          { text: { en: "Bind a spirit into an object or weapon.", tr: "Bir ruhu bir nesneye ya da silaha bağla." }, cost: "3" },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────── FAITH & NATURE
  {
    id: "cleric",
    num: 12,
    group: "faith",
    name: { en: "Cleric", tr: "Rahip" },
    hook: { en: "You are not asking. You are relaying.", tr: "Rica etmiyorsun. Aktarıyorsun." },
    playsLike: {
      en: "The safety net with teeth. You keep people alive, you cancel the thing that was about to ruin the encounter, and once a session you get to ask the universe for a favour it cannot refuse. Steady rather than flashy — until the Miracle, which is the single most open-ended ability in the game.", tr: "Dişli emniyet ağı. İnsanları hayatta tutarsın, karşılaşmayı mahvetmek üzere olan şeyi iptal edersin ve oturumda bir kez evrenden reddedemeyeceği bir lütuf isteyebilirsin. Gösterişten çok istikrarlı — Mucize'ye kadar, ki o oyundaki tek en uçları açık yetenektir.",
    },
    hpBase: 10,
    priority: ["WIS", "CON", "STR / CHA"],
    domain: { en: "Your god's portfolio, and the faith of the people around you.", tr: "Tanrının portföyü ve çevrendeki insanların inancı." },
    kit: { en: "A holy symbol, medium armor, a shield or a staff, and a text you have read too many times.", tr: "Bir kutsal sembol, orta zırh, bir kalkan ya da bir asa ve çok fazla okuduğun bir metin." },
    signature: {
      name: { en: "Miracle", tr: "Mucize" },
      text: {
        en: "Once per session, ask your god for something outside the rules entirely. The Story God decides what happens and what it costs — but never says no outright. A Miracle always does something. It may not be what you asked for.", tr: "Oturum başına bir kez, tanrından tamamen kuralların dışında bir şey iste. Ne olacağına ve bedeline Hikâye Tanrısı karar verir — ama asla doğrudan hayır demez. Bir Mucize her zaman bir şey yapar. İstediğin şey olmayabilir.",
      },
    },
    examples: [
      { text: { en: "Heal an ally and stop their bleeding.", tr: "Bir müttefiki iyileştir ve kanamasını durdur." }, cost: "1" },
      { text: { en: "Heal your whole group at once.", tr: "Bütün grubunu bir anda iyileştir." }, cost: "2" },
      { text: { en: "Make an area holy ground.", tr: "Bir alanı kutsal toprak yap." }, cost: "2" },
      { text: { en: "Cancel an attack aimed at an ally.", tr: "Bir müttefike yönelen saldırıyı iptal et." }, cost: "3" },
      { text: { en: "Ask your god for a miracle (the Story God decides the cost).", tr: "Tanrından bir mucize iste (bedeline Hikâye Tanrısı karar verir)." }, cost: "Miracle" },
    ],
    subclasses: [
      {
        id: "healer",
        slug: "cleric-healer",
        name: { en: "Healer", tr: "Şifacı" },
        tagline: { en: "A pure healer who mends, cures, and even revives. Pick this to keep the party alive above all else.", tr: "İyileştiren, tedavi eden ve hatta dirilten saf bir şifacı. Her şeyden önce grubu hayatta tutmak için seç." },
        domain: { en: "Life, mending, disease, exhaustion, and keeping people going.", tr: "Hayat, onarım, hastalık, bitkinlik ve insanları ayakta tutmak." },
        ruleBreaker: {
          name: { en: "Hands That Do Not Fail", tr: "Yanılmayan Eller" },
          text: { en: "Your healing Effects never require a roll and never cost more than 2 Energy, whatever their scale.", tr: "İyileştirme Etkilerin, ölçeği ne olursa olsun asla atış gerektirmez ve asla 2 Enerjiden fazlaya mal olmaz." },
        },
        examples: [
          { text: { en: "Heal a wound quickly and reliably.", tr: "Bir yarayı hızlı ve güvenilir şekilde iyileştir." }, cost: "1" },
          { text: { en: "Ward a whole area against disease.", tr: "Bütün bir alanı hastalığa karşı koru." }, cost: "2" },
          { text: { en: "Revive someone recently dead.", tr: "Kısa süre önce ölen birini dirilt." }, cost: "4" },
        ],
      },
      {
        id: "war-priest",
        slug: "cleric-war-priest",
        name: { en: "War Priest", tr: "Savaş Rahibi" },
        tagline: { en: "A fighting cleric who attacks with faith. Pick this if you want a healer who is also strong in melee combat.", tr: "İnançla saldıran dövüşçü bir rahip. Yakın dövüşte de güçlü bir şifacı isteyenler seçsin." },
        domain: { en: "Battle, courage, righteous force, and the sanctity of a good cause.", tr: "Savaş, cesaret, haklı kuvvet ve iyi bir davanın kutsallığı." },
        ruleBreaker: {
          name: { en: "Armed Faith", tr: "Silahlı İnanç" },
          text: { en: "Use WIS for weapon attacks and damage. Your weapon is a holy symbol.", tr: "Silah saldırıları ve hasar için WIS kullan. Silahın bir kutsal semboldür." },
        },
        examples: [
          { text: { en: "Steady a line of allies so it holds.", tr: "Bir sıra müttefiki dayansın diye sağlamlaştır." }, cost: "2" },
          { text: { en: "Bless a weapon to hurt one kind of enemy badly.", tr: "Bir silahı, bir tür düşmana çok acı verecek şekilde kutsa." }, cost: "2" },
          { text: { en: "Form and hold a shield wall with allies.", tr: "Müttefiklerle bir kalkan duvarı oluştur ve tut." }, cost: "2" },
        ],
      },
      {
        id: "dark-preacher",
        slug: "cleric-dark-preacher",
        name: { en: "Dark Preacher", tr: "Karanlık Vaiz" },
        tagline: { en: "A cleric of a dark god who trades pain for power. Pick this for fear, secrets, and sacrifice-based magic.", tr: "Güç için acı takas eden karanlık bir tanrının rahibi. Korku, sırlar ve kurban temelli büyü için seç." },
        domain: { en: "Fear, sacrifice, secrets, and the god whose name is not written down.", tr: "Korku, kurban, sırlar ve adı yazıya dökülmeyen tanrı." },
        ruleBreaker: {
          name: { en: "Tithe", tr: "Öşür" },
          text: {
            en: "Take HP from a willing or Downed creature to pay Energy, at 2 HP per Energy. Your god considers this normal.", tr: "Enerji ödemek için istekli ya da Düşmüş bir yaratıktan Can al, Enerji başına 2 Can. Tanrın bunu normal sayar.",
          },
        },
        examples: [
          { text: { en: "Grant a blessing that has a price.", tr: "Bir bedeli olan bir kutsama ver." }, cost: "2" },
          { text: { en: "Pull a secret out of someone unwilling.", tr: "İstemeyen birinden bir sır çek." }, cost: "3" },
          { text: { en: "Sway a group into loyalty they don't question.", tr: "Bir grubu, sorgulamadıkları bir sadakate yönelt." }, cost: "3" },
        ],
      },
    ],
  },

  {
    id: "shaman",
    num: 13,
    group: "faith",
    name: { en: "Shaman", tr: "Şaman" },
    hook: { en: "The world is not scenery. It is a crowd, and you are the only one being polite.", tr: "Dünya bir dekor değil. Bir kalabalık, ve nazik olan tek kişi sensin." },
    playsLike: {
      en: "The most flexible non-combat class in the game and a strong controller in a fight. You change shape, you change ground, you change weather. Where the Wizard prepares and the Sorcerer improvises, you negotiate — with animals, plants, spirits, and the terrain itself.", tr: "Oyundaki en esnek dövüş-dışı sınıf ve bir dövüşte güçlü bir kontrolcü. Şekil değiştirirsin, zemini değiştirirsin, havayı değiştirirsin. Büyücü hazırlanırken ve Sihirbaz doğaçlarken, sen müzakere edersin — hayvanlarla, bitkilerle, ruhlarla ve arazinin kendisiyle.",
    },
    hpBase: 10,
    priority: ["WIS", "CON", "DEX"],
    domain: { en: "The living world: beasts, weather, growth, and the spirits in all of it.", tr: "Yaşayan dünya: canavarlar, hava, büyüme ve hepsindeki ruhlar." },
    kit: { en: "A totem or staff, hide armor, herbs, and something that used to be alive.", tr: "Bir totem ya da asa, post zırh, otlar ve eskiden canlı olan bir şey." },
    signature: {
      name: { en: "Wild Shape", tr: "Vahşi Şekil" },
      text: {
        en: "2 Energy: become a beast for a scene. You keep your HP, Energy, and mind; you gain the beast's body and movement plus a d6 natural attack. Wolf (speed, scent) · Bird (flight, sight) · Bear (+CON HP, d8 attack) · Serpent (water, squeezing into things).", tr: "2 Enerji: bir sahne boyunca bir canavara dönüş. Canını, Enerjini ve zihnini korursun; canavarın bedenini ve hareketini artı bir d6 doğal saldırı kazanırsın. Kurt (hız, koku) · Kuş (uçuş, görüş) · Ayı (+CON Can, d8 saldırı) · Yılan (su, dar yerlere sıkışma).",
      },
    },
    examples: [
      { text: { en: "Ask nearby animals what they've seen.", tr: "Yakındaki hayvanlara ne gördüklerini sor." }, cost: "0" },
      { text: { en: "Trap an enemy with roots from the ground.", tr: "Yerden çıkan köklerle bir düşmanı tuzağa düşür." }, cost: "1" },
      { text: { en: "Fill the area with fog so no one can see.", tr: "Alanı sisle doldur, kimse kimseyi görmesin." }, cost: "2" },
      { text: { en: "Change the weather over time.", tr: "Zaman içinde havayı değiştir." }, cost: "2" },
      { text: { en: "Command the forest itself to move.", tr: "Ormanın kendisine hareket etmesini emret." }, cost: "4" },
    ],
    subclasses: [
      {
        id: "wild-heart",
        slug: "shaman-wild-heart",
        name: { en: "Wild Heart", tr: "Vahşi Yürek" },
        tagline: { en: "A shaman close to beasts and the hunt. Pick this to command animals and shapeshift into stronger forms.", tr: "Canavarlara ve ava yakın bir şaman. Hayvanlara komut vermek ve daha güçlü biçimlere dönüşmek için seç." },
        domain: { en: "Beasts, packs, the hunt, and instinct.", tr: "Canavarlar, sürüler, av ve içgüdü." },
        ruleBreaker: {
          name: { en: "Beast Speech", tr: "Canavar Dili" },
          text: { en: "Animals will always help you, as long as it costs them little. No roll, no cost.", tr: "Hayvanlar, onlara az mal olduğu sürece sana her zaman yardım eder. Atış yok, maliyet yok." },
        },
        examples: [
          { text: { en: "Fully take a beast form, convincing to anyone.", tr: "Herkesi ikna edecek şekilde tam bir canavar biçimi al." }, cost: "0" },
          { text: { en: "Know an area through the animals in it.", tr: "Bir bölgeyi, içinde yaşayan hayvanlar aracılığıyla bil." }, cost: "1" },
          { text: { en: "Call a pack of beasts to fight with you.", tr: "Seninle dövüşmek için bir canavar sürüsü çağır." }, cost: "3" },
        ],
      },
      {
        id: "storm",
        slug: "shaman-storm",
        name: { en: "Storm", tr: "Fırtına" },
        tagline: { en: "A shaman of wind and lightning. Pick this for weather control and ranged storm attacks.", tr: "Rüzgârın ve şimşeğin şamanı. Hava kontrolü ve menzilli fırtına saldırıları için seç." },
        domain: { en: "Wind, lightning, rain, sea, and pressure.", tr: "Rüzgâr, şimşek, yağmur, deniz ve basınç." },
        ruleBreaker: {
          name: { en: "Rides the Air", tr: "Havaya Biner" },
          text: { en: "You move one extra zone in any direction, including straight up.", tr: "Dosdoğru yukarı dâhil, herhangi bir yöne bir ekstra bölge hareket edersin." },
        },
        examples: [
          { text: { en: "Call lightning down on one target.", tr: "Tek bir hedefin üstüne şimşek çağır." }, cost: "2" },
          { text: { en: "Give the party a lasting wind for travel.", tr: "Gruba yolculuk için kalıcı bir rüzgâr ver." }, cost: "2" },
          { text: { en: "Whip up a storm to stop a ship or force.", tr: "Bir gemiyi ya da gücü durdurmak için fırtına kopar." }, cost: "3" },
        ],
      },
      {
        id: "deep-root",
        slug: "shaman-deep-root",
        name: { en: "Deep Root", tr: "Derin Kök" },
        tagline: { en: "A shaman of stone, roots, and growth. Pick this to reshape terrain and control the battlefield.", tr: "Taşın, köklerin ve büyümenin şamanı. Araziyi yeniden biçimlendirmek ve savaş alanını kontrol etmek için seç." },
        domain: { en: "Forests, stone, growth, patience, and poison.", tr: "Ormanlar, taş, büyüme, sabır ve zehir." },
        ruleBreaker: {
          name: { en: "The Ground Answers", tr: "Yer Cevap Verir" },
          text: {
            en: "1 Energy: reshape the terrain of a zone. Roots, walls, mud, cover, a hole where there wasn't one.", tr: "1 Enerji: bir bölgenin arazisini yeniden şekillendir. Kökler, duvarlar, çamur, siper, olmayan yerde bir çukur.",
          },
        },
        examples: [
          { text: { en: "Close a path behind you with growth.", tr: "Arkandaki yolu bitki büyümesiyle kapat." }, cost: "1" },
          { text: { en: "Learn everything that crossed this ground recently.", tr: "Son zamanlarda bu topraktan geçen her şeyi öğren." }, cost: "1" },
          { text: { en: "Grow a season's worth of plants in an afternoon.", tr: "Bir öğleden sonrada bir mevsimlik bitki büyüt." }, cost: "3" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── CRAFT
  {
    id: "alchemist",
    num: 14,
    group: "craft",
    name: { en: "Alchemist", tr: "Simyacı" },
    hook: { en: "Magic is chemistry that hasn't been written down properly yet.", tr: "Büyü, henüz düzgünce yazıya dökülmemiş kimyadır." },
    playsLike: {
      en: "A planner. You bank your power at rest and spend it as physical objects, which means you can hand your abilities to other people. The only class that can arm the whole party. Weak at improvising, extremely strong at preparing.", tr: "Bir planlamacı. Gücünü dinlenirken biriktirir ve fiziksel nesneler olarak harcarsın, bu da yeteneklerini başkalarına verebileceğin anlamına gelir. Bütün grubu donatabilen tek sınıf. Doğaçlamada zayıf, hazırlıkta son derece güçlü.",
    },
    hpBase: 8,
    priority: ["INT", "DEX", "CON"],
    domain: { en: "Substances, reactions, mechanisms, and what they do to a body.", tr: "Maddeler, tepkimeler, mekanizmalar ve bir bedene ne yaptıkları." },
    kit: { en: "A portable lab, light armor, a light weapon, and a notebook of failures.", tr: "Taşınabilir bir laboratuvar, hafif zırh, bir hafif silah ve bir başarısızlıklar defteri." },
    signature: {
      name: { en: "Brew", tr: "Karışım" },
      text: {
        en: "On each Short or Long Rest, prepare INT + Level doses. A dose is one Effect, priced normally — but paid for at rest, not in the moment. Anyone can use a dose. Hand them out. Doses spoil at your next rest, so hoarding does not work.", tr: "Her Kısa ya da Uzun Dinlenmede INT + Seviye doz hazırla. Bir doz bir Etkidir, normal fiyatlandırılır — ama o anda değil, dinlenirken ödenir. Bir dozu herkes kullanabilir. Onları dağıt. Dozlar bir sonraki dinlenmende bozulur, o yüzden biriktirmek işe yaramaz.",
      },
    },
    examples: [
      { text: { en: "Examine a body or substance to learn what it is.", tr: "Bir cesedi ya da maddeyi inceleyip ne olduğunu öğren." }, cost: "0" },
      { text: { en: "Use acid to eat through a barrier.", tr: "Bir engeli asitle eritip geç." }, cost: "1 dose" },
      { text: { en: "Make a potion that numbs pain for a while.", tr: "Bir süre acıyı uyuşturan bir iksir yap." }, cost: "1 dose" },
      { text: { en: "Throw a smoke-and-noise bomb to disorient.", tr: "Şaşırtmak için bir duman-ve-ses bombası at." }, cost: "2 doses" },
      { text: { en: "Hand out doses so allies can use your magic too.", tr: "Müttefikler de büyünü kullanabilsin diye dozlar dağıt." }, cost: "doses" },
    ],
    subclasses: [
      {
        id: "bombardier",
        slug: "alchemist-bombardier",
        name: { en: "Bombardier", tr: "Bombacı" },
        tagline: { en: "An alchemist who throws area bombs. Pick this for explosions, acid, and breaking through walls.", tr: "Alan bombaları atan bir simyacı. Patlamalar, asit ve duvarları yıkmak için seç." },
        domain: { en: "Explosives, acid, smoke, shrapnel, and pressure.", tr: "Patlayıcılar, asit, duman, şarapnel ve basınç." },
        ruleBreaker: {
          name: { en: "Wide Blast", tr: "Geniş Patlama" },
          text: { en: "Your thrown doses hit an entire zone, and you choose who they skip.", tr: "Fırlattığın dozlar bütün bir bölgeye isabet eder ve kimi atlayacaklarını sen seçersin." },
        },
        examples: [
          { text: { en: "Blind unprepared enemies with smoke.", tr: "Hazırlıksız düşmanları dumanla kör et." }, cost: "1 dose" },
          { text: { en: "Blast open any door or container.", tr: "Herhangi bir kapıyı ya da kutuyu patlatarak aç." }, cost: "2 doses" },
          { text: { en: "Bring down a wall with a timed charge.", tr: "Zamanlanmış bir patlayıcıyla bir duvar yık." }, cost: "3 doses" },
        ],
      },
      {
        id: "elixirist",
        slug: "alchemist-elixirist",
        name: { en: "Elixirist", tr: "İksirci" },
        tagline: { en: "An alchemist of potions and poisons that change the body. Pick this for buffs, antidotes, and transformation.", tr: "Bedeni değiştiren iksir ve zehirlerin simyacısı. Güçlendirmeler, panzehirler ve dönüşüm için seç." },
        domain: { en: "Potions, poisons, transformation, and the limits of a body.", tr: "İksirler, zehirler, dönüşüm ve bir bedenin sınırları." },
        ruleBreaker: {
          name: { en: "On Tap", tr: "Hazırda" },
          text: { en: "Drinking a dose is a free action, and doses you drink yourself last the whole scene.", tr: "Bir doz içmek bedava aksiyondur ve kendi içtiğin dozlar bütün sahne boyunca sürer." },
        },
        examples: [
          { text: { en: "Brew a potion that boosts a stat for a scene.", tr: "Bir sahne boyunca bir statı yükselten bir iksir yap." }, cost: "2 doses" },
          { text: { en: "Make an antidote for a poison you've never seen.", tr: "Hiç görmediğin bir zehir için panzehir yap." }, cost: "2 doses" },
          { text: { en: "Drink a potion to change your appearance.", tr: "Görünüşünü değiştirmek için bir iksir iç." }, cost: "2 doses" },
        ],
      },
      {
        id: "golemwright",
        slug: "alchemist-golemwright",
        name: { en: "Golemwright", tr: "Golem Ustası" },
        tagline: { en: "An alchemist with a mechanical construct that fights for them. Pick this if you want a durable machine ally.", tr: "Onun için dövüşen mekanik bir makinesi olan simyacı. Dayanıklı bir makine müttefik isteyenler seçsin." },
        domain: { en: "Constructs, clockwork, animation, and machines that keep working.", tr: "Makineler, saat mekanizması, canlandırma ve çalışmaya devam eden aygıtlar." },
        ruleBreaker: {
          name: { en: "The Machine", tr: "Makine" },
          text: {
            en: "You have a construct with Level × 6 HP. It acts on your turn and hits for d8. Rebuild it over a Long Rest if destroyed.", tr: "Seviye × 6 Canlı bir makinen var. Senin turunda oynar ve d8 vurur. Yok edilirse Uzun Dinlenmede yeniden kur.",
          },
        },
        examples: [
          { text: { en: "Send your construct into danger you'd rather avoid.", tr: "Makineni, kaçınmak istediğin bir tehlikeye gönder." }, cost: "0" },
          { text: { en: "Leave your construct to guard a spot on its own.", tr: "Makineni bir yeri tek başına koruması için bırak." }, cost: "1 dose" },
          { text: { en: "Upgrade your construct to take hits for you.", tr: "Makineni, senin yerine darbe alacak şekilde geliştir." }, cost: "2 doses" },
        ],
      },
    ],
  },
];

export const CLASS_BY_ID = new Map(CLASSES.map((c) => [c.id, c]));
