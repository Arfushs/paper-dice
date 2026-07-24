import type { L, Locale } from "@/data/types";

export type { Locale };

/**
 * UI chrome strings — everything that isn't data content. Data (classes,
 * scenes, …) carries its own `{en, tr}` pairs; this covers the app's own
 * buttons, labels, and headings.
 *
 * Any key whose `tr` is missing falls back to English, so the app is never
 * half-broken while translation is in progress.
 */
export const UI = {
  // nav
  "nav.classes": { en: "Classes", tr: "Sınıflar" },
  "nav.characters": { en: "Characters", tr: "Karakterler" },
  "nav.dice": { en: "Dice", tr: "Zar" },
  "nav.tables": { en: "Tables", tr: "Masalar" },
  "nav.rules": { en: "Rules", tr: "Kurallar" },
  "footer.tagline": {
    en: "14 classes · 51 subclasses · no spell list",
    tr: "14 sınıf · 51 alt sınıf · büyü listesi yok",
  },

  // home
  "home.eyebrow": { en: "A tabletop RPG for the web", tr: "Web için bir masaüstü RPG" },
  "home.sub": {
    en: "Fourteen classes. Fifty-one subclasses. One Story God who rolls the dice, sets the difficulty, and decides what it costs.",
    tr: "On dört sınıf. Elli bir alt sınıf. Zarları atan, zorluğu belirleyen ve bedelini söyleyen tek bir Hikâye Tanrısı.",
  },
  "home.create": { en: "Create a character", tr: "Karakter yarat" },
  "home.browse": { en: "Browse the classes", tr: "Sınıflara göz at" },
  "home.read": { en: "Read the rules", tr: "Kuralları oku" },
  "home.roster": { en: "The Roster", tr: "Kadro" },
  "home.rosterNote": {
    en: "Every class comes down to four things: how much damage you can take, where your ability points go, what kinds of Effects you can invent, and the one signature trick only you have.",
    tr: "Her sınıf dört şeye dayanır: ne kadar hasar alabildiğin, yetenek puanlarının nereye gittiği, ne tür Etkiler uydurabildiğin ve yalnızca sende olan o imza numara.",
  },
  "home.pillar1.t": { en: "One roll for everything", tr: "Her şey için tek zar" },
  "home.pillar1.b": {
    en: "d20 + your ability + training, against a number the Story God says out loud. Picking a lock, swinging a sword, talking a guard down — same roll every time.",
    tr: "d20 + yeteneğin + eğitim, Hikâye Tanrısı'nın yüksek sesle söylediği bir sayıya karşı. Kilit açmak, kılıç sallamak, bir nöbetçiyi ikna etmek — hep aynı zar.",
  },
  "home.pillar2.t": { en: "No spell list", tr: "Büyü listesi yok" },
  "home.pillar2.b": {
    en: "You describe what you want to do, and the Story God sets its Energy cost from one simple table. A wizard's fireball and a knight swinging from a chandelier follow the exact same rule.",
    tr: "Ne yapmak istediğini anlatırsın, Hikâye Tanrısı da tek bir basit tablodan Enerji bedelini belirler. Bir büyücünün ateş topu da, bir şövalyenin avizeye tutunup savrulması da tıpatıp aynı kurala tabidir.",
  },
  "home.pillar3.t": { en: "No battle map", tr: "Savaş haritası yok" },
  "home.pillar3.b": {
    en: "Combat happens in four zones — Engaged, Near, Far, Distant. No grid, no counting squares, no measuring.",
    tr: "Savaş dört bölgede geçer — Temas, Yakın, Uzak, En Uzak. Izgara yok, kare saymak yok, ölçmek yok.",
  },
  "home.pillar4.t": { en: "One resource", tr: "Tek kaynak" },
  "home.pillar4.b": {
    en: "Energy. No spell slots, no per-day counters, no separate pools. A single number, spent and recovered.",
    tr: "Enerji. Büyü yuvası yok, günlük sayaç yok, ayrı havuz yok. Harcanan ve geri kazanılan tek bir sayı.",
  },

  // classes page
  "classes.eyebrow": { en: "Fourteen ways in", tr: "On dört giriş yolu" },
  "classes.title": { en: "Classes", tr: "Sınıflar" },
  "classes.lede": {
    en: "Pick one at level 1. Its Domain sets what kinds of Effects you can invent. At level 3 you pick a subclass: it narrows that Domain, makes those Effects cheaper, and gives you one special rule that only you get to break.",
    tr: "1. seviyede bir sınıf seç. Sınıfın Alanı, ne tür Etkiler uydurabileceğini belirler. 3. seviyede bir alt sınıf seçersin: bu, Alanı daraltır, o Etkileri ucuzlatır ve sana yalnızca senin kırabildiğin özel bir kural verir.",
  },

  // class detail
  "class.back": { en: "← All classes", tr: "← Tüm sınıflar" },
  "class.playsLike": { en: "Plays like", tr: "Nasıl oynanır" },
  "class.domain": { en: "Domain", tr: "Alan" },
  "class.kit": { en: "Kit", tr: "Teçhizat" },
  "class.signature": { en: "Signature", tr: "İmza" },
  "class.sigFromLv1": { en: "Yours from level 1", tr: "1. seviyeden itibaren senin" },
  "class.and": { en: "And", tr: "Ve" },
  "class.youSay": { en: "You say", tr: "Sen dersin" },
  "class.youSayNote": {
    en: "Examples, not a menu. There is no spell list — you describe it, the Story God prices it.",
    tr: "Örnekler, menü değil. Büyü listesi yok — sen anlatırsın, Hikâye Tanrısı fiyatlandırır.",
  },
  "class.subclasses": { en: "Subclasses", tr: "Alt sınıflar" },
  "class.chosenAt3": { en: "Chosen at level 3.", tr: "3. seviyede seçilir." },
  "class.hpBase": { en: "HP Base", tr: "Temel CP" },
  "class.priority": { en: "Ability priority", tr: "Yetenek önceliği" },
  "class.subCount": { en: "Subclasses", tr: "Alt sınıflar" },
  "class.domainDiscount": {
    en: "Domain — Effects here cost −1 Energy",
    tr: "Alan — buradaki Etkiler −1 Enerji",
  },
  "class.ruleBreaker": { en: "Rule Breaker", tr: "Kural Kırıcı" },

  // group names
  "group.front": { en: "Front Line", tr: "Ön Saf" },
  "group.skirmisher": { en: "Skirmishers", tr: "Çeviciler" },
  "group.magic": { en: "The Four Magics", tr: "Dört Büyü" },
  "group.faith": { en: "Faith & Nature", tr: "İnanç ve Doğa" },
  "group.craft": { en: "Craft", tr: "Zanaat" },

  // characters
  "chars.party": { en: "Your party", tr: "Grubun" },
  "chars.title": { en: "Characters", tr: "Karakterler" },
  "chars.new": { en: "+ New character", tr: "+ Yeni karakter" },
  "chars.emptyTitle": { en: "No characters yet.", tr: "Henüz karakter yok." },
  "chars.emptyBody": {
    en: "Build a Character Paper — class, abilities, gear — and it will appear here, saved in this browser.",
    tr: "Bir Karakter Kâğıdı oluştur — sınıf, yetenekler, teçhizat — ve burada, bu tarayıcıda kayıtlı olarak görünecek.",
  },
  "chars.createFirst": { en: "Create your first", tr: "İlkini yarat" },
  "chars.edit": { en: "Edit", tr: "Düzenle" },
  "chars.delete": { en: "Delete", tr: "Sil" },
  "chars.deleteConfirm": {
    en: "Delete this character? This cannot be undone.",
    tr: "Bu karakter silinsin mi? Geri alınamaz.",
  },

  // creator
  "creator.back": { en: "← All characters", tr: "← Tüm karakterler" },
  "creator.class": { en: "Class", tr: "Sınıf" },
  "creator.level": { en: "Level", tr: "Seviye" },
  "creator.primary": { en: "Primary ability", tr: "Ana yetenek" },
  "creator.subclass": { en: "Subclass", tr: "Alt sınıf" },
  "creator.subAt": { en: "— chosen at level", tr: "— seçim seviyesi" },
  "creator.subUnlock": {
    en: "Raise to level 3 to choose one.",
    tr: "Seçmek için 3. seviyeye çık.",
  },
  "creator.none": { en: "None", tr: "Yok" },
  "creator.identity": { en: "Identity", tr: "Kimlik" },
  "creator.name": { en: "Name", tr: "İsim" },
  "creator.namePlaceholder": { en: "Who are they?", tr: "Bu kim?" },
  "creator.abilities": { en: "Abilities", tr: "Yetenekler" },
  "creator.pointsLeft": { en: "point", tr: "puan" },
  "creator.pointsLeftPlural": { en: "points", tr: "puan" },
  "creator.left": { en: "left", tr: "kaldı" },
  "creator.abilityNote": {
    en: "Every ability starts at 1. Spend {points} points, none above {cap}.",
    tr: "Her yetenek 1'den başlar. {points} puan harca, hiçbiri {cap} üstünde olmasın.",
  },
  "creator.primaryTag": { en: "primary", tr: "ana" },
  "creator.skills": { en: "Trained Skills", tr: "Eğitimli Beceriler" },
  "creator.gear": { en: "Gear", tr: "Teçhizat" },
  "creator.weapon": { en: "Weapon", tr: "Silah" },
  "creator.focus": { en: "Focus", tr: "Odak" },
  "creator.shieldShort": { en: "shield", tr: "kalkan" },
  "creator.weaponsGroup": { en: "Weapons", tr: "Silahlar" },
  "creator.fociGroup": { en: "Foci", tr: "Odaklar" },
  "creator.armor": { en: "Armor", tr: "Zırh" },
  "creator.shield": { en: "Shield (+1)", tr: "Kalkan (+1)" },
  "creator.inventory": { en: "Inventory", tr: "Envanter" },
  "creator.inventoryHint": { en: "— one item per line", tr: "— satır başına bir eşya" },
  "creator.background": { en: "Background", tr: "Geçmiş" },
  "creator.backgroundNote": {
    en: "The Story God will use all three against you.",
    tr: "Hikâye Tanrısı üçünü de sana karşı kullanacak.",
  },
  "creator.qFrom": { en: "Where are you from?", tr: "Nerelisin?" },
  "creator.qOwe": { en: "Who do you owe?", tr: "Kime borçlusun?" },
  "creator.qWant": { en: "What do you want?", tr: "Ne istiyorsun?" },
  "creator.save": { en: "Create character", tr: "Karakteri yarat" },
  "creator.saveEdit": { en: "Save changes", tr: "Değişiklikleri kaydet" },
  "creator.needName": { en: "Give them a name to finish.", tr: "Bitirmek için bir isim ver." },
  "creator.spendPoints": {
    en: "Spend the last {n} ability point{s}.",
    tr: "Son {n} yetenek puanını harca.",
  },

  // derived stat labels
  "stat.hp": { en: "HP", tr: "Can" },
  "stat.energy": { en: "Energy", tr: "Enerji" },
  "stat.defense": { en: "Defense", tr: "Savunma" },
  "stat.init": { en: "Init", tr: "İnisiyatif" },
  "stat.cap": { en: "Cap", tr: "Tavan" },

  // dice
  "dice.eyebrow": { en: "Roll it and see", tr: "At bakalım" },
  "dice.title": { en: "Dice", tr: "Zar" },
  "dice.rolls": { en: "Rolls", tr: "Atışlar" },
  "dice.whoRolling": { en: "Who's rolling", tr: "Kim atıyor" },
  "dice.freeform": { en: "Freeform", tr: "Serbest" },
  "dice.roll": { en: "Roll", tr: "At" },
  "dice.rollMode": { en: "Roll", tr: "Atış" },
  "dice.normal": { en: "Normal", tr: "Normal" },
  "dice.advantage": { en: "Advantage", tr: "Avantaj" },
  "dice.disadvantage": { en: "Disadvantage", tr: "Dezavantaj" },
  "dice.trained": { en: "Trained (+2)", tr: "Eğitimli (+2)" },
  "dice.difficulty": { en: "Difficulty / Defense", tr: "Zorluk / Savunma" },
  "dice.abilityCheck": { en: "Ability check", tr: "Yetenek kontrolü" },
  "dice.attackDamage": { en: "Attack & damage", tr: "Saldırı ve hasar" },
  "dice.flatMod": { en: "Flat modifier", tr: "Sabit ekleme" },
  "dice.flatRoll": { en: "Flat roll", tr: "Sabit atış" },
  "dice.rollD20": { en: "Roll d20", tr: "d20 at" },
  "dice.custom": { en: "Custom", tr: "Özel" },
  "dice.rollFor": { en: "Roll for", tr: "Kimin için" },
  "dice.nobody": { en: "Nobody", tr: "Kimse" },
  "dice.noRolls": { en: "No rolls yet.", tr: "Henüz atış yok." },
  "dice.clear": { en: "Clear", tr: "Temizle" },
  "dice.success": { en: "Success", tr: "Başarı" },
  "dice.fail": { en: "Fail", tr: "Başarısız" },
  "dice.lede": {
    en: "The one roll: d20 + ability + training against a difficulty the Story God names. Pick a character and their scores fill in automatically.",
    tr: "Tek atış: d20 + yetenek + eğitim, Hikâye Tanrısı'nın belirlediği bir zorluğa karşı. Bir karakter seç, puanları otomatik dolar.",
  },

  // tables entry
  "tables.eyebrow": { en: "Play together", tr: "Birlikte oyna" },
  "tables.title": { en: "Tables", tr: "Masalar" },
  "tables.lede": {
    en: "One Story God narrates and rolls. Everyone else brings a Character Paper. The dice, the scene, and everyone's health stay in sync.",
    tr: "Bir Hikâye Tanrısı anlatır ve zar atar. Herkes bir Karakter Kâğıdı getirir. Zarlar, sahne ve herkesin canı eşzamanlı kalır.",
  },
  "tables.notConnected": { en: "Not connected yet", tr: "Henüz bağlı değil" },
  "tables.runIt": { en: "Run it", tr: "Yönet" },
  "tables.storyGod": { en: "Story God", tr: "Hikâye Tanrısı" },
  "tables.sgBlurb": {
    en: "Open a table, give the code to your friends, and narrate. You roll all the dice and decide what everything costs. You don't play a character — you run the game.",
    tr: "Bir masa aç, kodu arkadaşlarına ver ve anlat. Bütün zarları sen atar, her şeyin bedeline sen karar verirsin. Karakter oynamazsın — oyunu sen yönetirsin.",
  },
  "tables.yourName": { en: "Your name", tr: "Adın" },
  "tables.running": { en: "What are you running?", tr: "Neyi yönetiyorsun?" },
  "tables.newTable": { en: "A new table", tr: "Yeni bir masa" },
  "tables.portrait": { en: "Portrait", tr: "Portre" },
  "tables.backdrops": { en: "Backdrops", tr: "Arka planlar" },
  "tables.backdropsNote": {
    en: "Upload them now — a burning hall, a map, a face — and show any of them in any order once the table is open.",
    tr: "Şimdi yükle — yanan bir salon, bir harita, bir yüz — ve masa açılınca istediğini istediğin sırada göster.",
  },
  "tables.addPictures": { en: "Add pictures", tr: "Resim ekle" },
  "tables.openTable": { en: "Open a table", tr: "Masa aç" },
  "tables.opening": { en: "Opening…", tr: "Açılıyor…" },
  "tables.play": { en: "Play", tr: "Oyna" },
  "tables.takeSeat": { en: "Take a seat", tr: "Yerini al" },
  "tables.playerBlurb": {
    en: "Bring a character and join with the code the Story God gives you. You level up and manage your gear at the table; the Story God handles the dice.",
    tr: "Bir karakter getir ve Hikâye Tanrısı'nın verdiği kodla katıl. Seviye atlar ve teçhizatını masada yönetirsin; zarları Hikâye Tanrısı halleder.",
  },
  "tables.code": { en: "Table code", tr: "Masa kodu" },
  "tables.bring": { en: "Bring", tr: "Getir" },
  "tables.noChars": { en: "No characters yet.", tr: "Henüz karakter yok." },
  "tables.makeOne": { en: "Make one →", tr: "Bir tane yap →" },
  "tables.joinTable": { en: "Join the table", tr: "Masaya katıl" },
  "tables.joining": { en: "Joining…", tr: "Katılıyor…" },
  "tables.yourOwn": { en: "Your own", tr: "Kendin" },
  "tables.resume": { en: "You still have a seat at this table", tr: "Bu masada hâlâ bir yerin var" },
  "tables.return": { en: "Return →", tr: "Dön →" },
  "tables.choosePortrait": { en: "Choose a portrait", tr: "Bir portre seç" },
  "tables.yourBackdrops": { en: "Your backdrops", tr: "Arka planların" },

  // room
  "room.youAreSG": { en: "You are the Story God", tr: "Sen Hikâye Tanrısı'sın" },
  "room.playingAs": { en: "Playing as", tr: "Oynadığın" },
  "room.atTable": { en: "at the table", tr: "masada" },
  "room.leave": { en: "Leave", tr: "Ayrıl" },
  "room.terminate": { en: "Break up the table", tr: "Masayı dağıt" },
  "room.leaveConfirm": {
    en: "Leave the table? Your seat will be given up.",
    tr: "Masadan ayrılınsın mı? Yerini bırakacaksın.",
  },
  "room.terminateConfirm": {
    en: "Break up the table? The session ends for everyone and the dice log is lost. This cannot be undone.",
    tr: "Masa dağıtılsın mı? Oturum herkes için biter ve zar kaydı kaybolur. Geri alınamaz.",
  },
  "room.party": { en: "The Table", tr: "Masa" },
  "room.yourSheet": { en: "Your character", tr: "Karakterin" },
  "room.yourSheetSub": { en: "health, level, abilities, gear", tr: "can, seviye, yetenekler, teçhizat" },
  "room.sgRolls": {
    en: "The Story God rolls for the table. Everything lands here.",
    tr: "Zarları Hikâye Tanrısı atar. Her şey buraya düşer.",
  },
  "room.rollNobody": {
    en: "Rolling for nobody in particular — use the flat d20 for monsters and the world.",
    tr: "Belirli biri için değil — canavarlar ve dünya için sabit d20 kullan.",
  },
  "room.secret": { en: "Secret", tr: "Gizli" },
  "room.reveal": { en: "Reveal", tr: "Göster" },
  "room.rolledSecret": { en: "rolled in secret", tr: "gizlice attı" },
  "room.nobodyJoined": {
    en: "Nobody has joined yet. Share the code",
    tr: "Henüz kimse katılmadı. Kodu paylaş",
  },
  "room.scenes": { en: "Scenes", tr: "Sahneler" },
  "room.pictures": { en: "Pictures", tr: "Resimler" },
  "room.done": { en: "Done", tr: "Bitti" },
  "room.dice": { en: "Dice", tr: "Zar" },
  "room.rolls": { en: "Rolls", tr: "Atışlar" },
  "room.abilityCheck": { en: "Ability check", tr: "Yetenek kontrolü" },
  "room.attackDamage": { en: "Attack & damage", tr: "Saldırı ve hasar" },
  "room.flatRoll": { en: "Flat roll", tr: "Sabit atış" },
  "room.custom": { en: "Custom", tr: "Özel" },
  "room.noScene": { en: "No scene set", tr: "Sahne belirlenmedi" },
  "room.sceneNotePlaceholder": {
    en: "Say something about it (optional)",
    tr: "Hakkında bir şey söyle (isteğe bağlı)",
  },
  "room.clearScene": { en: "Clear scene", tr: "Sahneyi temizle" },
  "room.pickSeat": { en: "pick a character to take a seat.", tr: "yerini almak için bir karakter seç." },
  "room.tableBrokeUp": { en: "The table has broken up", tr: "Masa dağıldı" },
  "room.sgEnded": { en: "The Story God ended the session.", tr: "Hikâye Tanrısı oturumu bitirdi." },
  "room.opening": { en: "Opening the table…", tr: "Masa açılıyor…" },
  "room.backToTables": { en: "Back to tables", tr: "Masalara dön" },
  "room.noTableCode": { en: "No table with the code", tr: "Şu koda sahip masa yok:" },
  "room.wentWrong": { en: "Something went wrong", tr: "Bir şeyler ters gitti" },

  // drawer
  "drawer.health": { en: "Health", tr: "Can" },
  "drawer.hitPoints": { en: "Hit Points", tr: "Can Puanı" },
  "drawer.energy": { en: "Energy", tr: "Enerji" },
  "drawer.full": { en: "Full", tr: "Dolu" },
  "drawer.rest": { en: "Rest", tr: "Dinlenme" },
  "drawer.shortRest": { en: "Short rest", tr: "Kısa dinlenme" },
  "drawer.longRest": { en: "Long rest", tr: "Uzun dinlenme" },
  "drawer.restNote": {
    en: "A Short Rest restores {con} HP and half your Energy. A Long Rest restores everything.",
    tr: "Kısa Dinlenme {con} CP ve Enerjinin yarısını geri verir. Uzun Dinlenme her şeyi geri verir.",
  },
  "drawer.downed": {
    en: "Roll a bare d20 on each of your turns — 10 or more is a success, 9 or less a failure. Three successes and you stabilise; three failures and you die.",
    tr: "Her turunda çıplak bir d20 at — 10 ve üzeri başarı, 9 ve altı başarısızlık. Üç başarıda dengelenirsin; üç başarısızlıkta ölürsün.",
  },
  "drawer.downedTag": { en: "Downed.", tr: "Düştü." },
  "drawer.close": { en: "Close", tr: "Kapat" },
  "drawer.levelNote": {
    en: "No XP — the Story God says when. Every level adds 4 HP and 2 Energy; levels 4 and 8 add an ability point and a skill.",
    tr: "TP yok — ne zaman olacağını Hikâye Tanrısı söyler. Her seviye 4 CP ve 2 Enerji ekler; 4. ve 8. seviyeler bir yetenek puanı ve bir beceri ekler.",
  },
  "drawer.keepPlaying": { en: "Keep playing.", tr: "Oynamaya devam." },
  "drawer.allSpent": { en: "All spent. Cap is {cap} at this level.", tr: "Hepsi harcandı. Bu seviyede tavan {cap}." },
  "drawer.spendNote": { en: "{n} point{s} to spend. Nothing above {cap}.", tr: "Harcanacak {n} puan. {cap} üstünde hiçbir şey yok." },
  "drawer.trainedSkills": { en: "Trained skills", tr: "Eğitimli beceriler" },
  "drawer.allChosen": { en: "all chosen", tr: "hepsi seçildi" },
  "drawer.weaponOrFocus": { en: "Weapon or focus", tr: "Silah ya da odak" },

  // seat popup
  "seat.you": { en: "you", tr: "sen" },
  "seat.downed": { en: "Downed", tr: "Düştü" },
  "seat.sgNarrates": {
    en: "Narrates, sets difficulties, rolls the dice.",
    tr: "Anlatır, zorlukları belirler, zarları atar.",
  },

  // misc
  "common.level": { en: "Level", tr: "Seviye" },
  "common.loading": { en: "Loading…", tr: "Yükleniyor…" },
} satisfies Record<string, L>;

export type UIKey = keyof typeof UI;

/** Translate a UI key, with optional {placeholder} interpolation. */
export function tk(key: UIKey, locale: Locale, vars?: Record<string, string | number>): string {
  const entry = UI[key];
  let s = (locale === "tr" ? entry.tr : undefined) ?? entry.en;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
  }
  return s;
}

/** Translate a data `{en, tr}` pair. */
export function tl(value: L | undefined, locale: Locale): string {
  if (!value) return "";
  return (locale === "tr" ? value.tr : undefined) ?? value.en;
}
