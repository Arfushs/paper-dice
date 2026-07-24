import { readFileSync, writeFileSync } from "fs";

// Replace poetic subclass taglines with plain "what it does / who picks it"
// descriptions, and replace every "You say" example with a plain functional
// line. Keyed by the CURRENT English string; the cost field is left untouched.
//
// M[oldEnglish] = { en: newEnglish, tr: newTurkish }
const M = {
  // ══════════════════════ KNIGHT ══════════════════════
  // class examples
  "I kick the table into his knees and step in after it.":
    { en: "Knock a piece of furniture into an enemy and follow up.", tr: "Bir eşyayı düşmana devirip peşinden saldır." },
  "I hook his shield away and put him on the floor.":
    { en: "Pull an enemy's shield aside and knock them down.", tr: "Düşmanın kalkanını çekip onu yere düşür." },
  "I hold this doorway. Nothing gets past me this round.":
    { en: "Block a doorway so nothing gets past you this round.", tr: "Bir kapıyı tut, bu tur kimse geçemesin." },
  "I cut the rope — the chandelier comes down on the whole pack.":
    { en: "Use the environment — drop a chandelier on a group of enemies.", tr: "Ortamı kullan — bir avizeyi düşman grubunun üstüne indir." },
  "I throw the spear hard enough to pin him to the far wall.":
    { en: "Throw your weapon hard enough to pin an enemy to a wall.", tr: "Silahını, bir düşmanı duvara sabitleyecek kadar sert fırlat." },
  // Weapon Master
  "Every weapon is one you have already used.":
    { en: "A pure fighter who is deadly with any weapon they pick up. Choose this if you like flexible, weapon-focused combat with no magic.", tr: "Eline aldığı her silahla ölümcül olan saf bir dövüşçü. Büyüsüz, silah odaklı ve esnek dövüşü sevenler seçsin." },
  "I flip the dagger and put it through the lock.":
    { en: "Throw a small weapon accurately at a target like a lock.", tr: "Küçük bir silahı, kilit gibi bir hedefe isabetle fırlat." },
  "I grab whatever's on the weapon rack and fight with both.":
    { en: "Grab two weapons and fight with both at once.", tr: "İki silah kap ve ikisiyle birden dövüş." },
  "The throw goes through his drawing hand, across the room.":
    { en: "Make a precise thrown hit to disarm an enemy across the room.", tr: "Odanın öbür ucundaki düşmanı silahsız bırakmak için isabetli bir fırlatma yap." },
  // Warden
  "The line holds because you are standing on it.":
    { en: "The protector. You hold a doorway or line so enemies can't reach your weaker friends. Pick this if you want to keep the party safe.", tr: "Koruyucu. Bir kapıyı ya da hattı tutarsın, düşmanlar zayıf arkadaşlarına ulaşamaz. Grubu güvende tutmak istiyorsan seç." },
  "I brace the door with my own body. It holds.":
    { en: "Hold a door or gap shut with your own body.", tr: "Bir kapıyı ya da geçidi kendi bedeninle kapalı tut." },
  "I drag her out of the blast and take it instead.":
    { en: "Pull an ally out of danger and take the hit yourself.", tr: "Bir müttefiki tehlikeden çek ve darbeyi kendin al." },
  "Nobody comes down this corridor. Not this round, not the next.":
    { en: "Block a corridor completely for a couple of rounds.", tr: "Bir koridoru birkaç tur boyunca tamamen kapat." },
  // Duelist
  "One on one, you have never lost.":
    { en: "The one-on-one specialist. Deadliest against a single strong enemy. Pick this if you like reading opponents and precise fencing.", tr: "Teke tek uzmanı. Tek bir güçlü düşmana karşı en ölümcül. Rakibi okumayı ve keskin eskrimi sevenler seçsin." },
  "I've watched him swing twice. I know what the third one is.":
    { en: "Read an enemy's pattern and predict their next attack.", tr: "Bir düşmanın hareketlerini oku ve sonraki saldırısını tahmin et." },
  "I take the sword out of his hand mid-parry.":
    { en: "Disarm an enemy mid-fight.", tr: "Dövüşün ortasında bir düşmanı silahsız bırak." },
  "I turn the duel into a conversation, and win that instead.":
    { en: "Stall or talk your way through a one-on-one fight.", tr: "Teke tek dövüşü konuşarak oyala ya da çöz." },
  // Enchanter Knight
  "You never learned to cast. You learned to make the steel do it.":
    { en: "A knight who carves magic into their weapon and armour. Pick this if you want a fighter who also does some magic — prepared ahead of the fight.", tr: "Büyüyü silahına ve zırhına kazıyan bir şövalye. Dövüş öncesi hazırlanan, hem dövüşen hem az büyü yapan bir sınıf isteyenler seçsin." },
  "The runes catch. The blade is burning now, and it stays burning.":
    { en: "Set a stored rune off so your blade burns for the fight.", tr: "Depolanmış bir rünü ateşle, kılıcın dövüş boyunca yansın." },
  "I inscribed this shield last night. Whatever hits it next, hits nothing.":
    { en: "Prepare your shield to fully block the next hit.", tr: "Kalkanını bir sonraki darbeyi tamamen engelleyecek şekilde hazırla." },
  "The armour remembers a blow I took last week. It gives it back.":
    { en: "Release a stored effect from your armour back at an enemy.", tr: "Zırhında depolanmış bir etkiyi bir düşmana geri gönder." },
  // Banneret
  "You are not the best soldier here. You are the reason the rest of them hold.":
    { en: "The commander. You help allies act and keep them fighting. Pick this if you want to boost the team more than swing a sword.", tr: "Komutan. Müttefiklerin oynamasına ve savaşmaya devam etmesine yardım edersin. Kılıç sallamaktan çok takımı güçlendirmek istiyorsan seç." },
  "Second rank. Step up. Now.":
    { en: "Let an ally take an extra move or attack out of turn.", tr: "Bir müttefikin sırası dışında ekstra hareket ya da saldırı yapmasını sağla." },
  "Nobody in this line breaks while my banner is up.":
    { en: "Keep your allies from being Frightened or breaking rank.", tr: "Müttefiklerinin Korkmasını ya da safı bozmasını engelle." },
  "Fifty militia who have never held a spear hold for one more round.":
    { en: "Rally a group of weak allies to hold one more round.", tr: "Bir grup zayıf müttefiki bir tur daha dayanmaları için topla." },

  // ══════════════════════ BARBARIAN ══════════════════════
  "I pick him up and throw him at the other one.":
    { en: "Pick an enemy up and throw them into another.", tr: "Bir düşmanı kaldırıp bir başkasının üstüne fırlat." },
  "I put my shoulder through the door. Not the lock — the door.":
    { en: "Smash straight through a door or barrier.", tr: "Bir kapıyı ya da engeli olduğu gibi parçala." },
  "I grab the front rank and drag all of them backwards with me.":
    { en: "Grab several enemies and drag them back a zone.", tr: "Birkaç düşmanı kavrayıp bir bölge geri sürükle." },
  "I take the hit on purpose so she can get past.":
    { en: "Take a hit on purpose so an ally can slip past.", tr: "Bir müttefik geçebilsin diye darbeyi bilerek al." },
  "I catch the falling stone and hold the ceiling while they run.":
    { en: "Hold up something heavy so the others can escape.", tr: "Ağır bir şeyi tut ki diğerleri kaçabilsin." },
  // Berserker
  "The anger was already there. The fight is just permission.":
    { en: "Pure aggression. Rage often and fight recklessly. Pick this if you want to hit hard and scare enemies, and don't mind the risk.", tr: "Saf saldırganlık. Sık öfkelen, pervasızca dövüş. Sert vurmak ve düşmanları korkutmak isteyen, riski dert etmeyenler seçsin." },
  "I scream. The room decides to be somewhere else.":
    { en: "Roar to Frighten the enemies around you.", tr: "Kükreyerek etrafındaki düşmanları Korkut." },
  "Three zones. Through everything in between.":
    { en: "Charge across the battlefield through anything in the way.", tr: "Yoldaki her şeyi yararak savaş alanı boyunca hücum et." },
  "I'm still standing. I shouldn't be. I am.":
    { en: "Keep fighting past the point you should have dropped.", tr: "Düşmen gereken noktayı geçip dövüşmeye devam et." },
  // Totem
  "Something old walks with you, and it has opinions.":
    { en: "A nature-bound barbarian who borrows beast traits. Pick this if you want toughness plus tracking and wild-world skills.", tr: "Canavar özellikleri ödünç alan, doğaya bağlı bir barbar. Dayanıklılığın yanında iz sürme ve yaban becerileri isteyenler seçsin." },
  "I smell the lie on him.":
    { en: "Use animal senses to catch a lie or a scent.", tr: "Bir yalanı ya da kokuyu yakalamak için hayvan duyularını kullan." },
  "I run the horse into the ground, then keep going on foot.":
    { en: "Outlast almost anything through sheer endurance.", tr: "Salt dayanıklılıkla neredeyse her şeyden daha uzun dayan." },
  "I sleep in the blizzard. It doesn't concern me.":
    { en: "Shrug off harsh weather and cold with ease.", tr: "Sert havayı ve soğuğu kolayca umursama." },
  // Giantblood
  "Your grandmother was very large and nobody discusses it.":
    { en: "An oversized bruiser with huge reach and strength. Pick this if you want to throw heavy things and hit from farther away.", tr: "Devasa erişim ve güce sahip iri kıyım bir dövüşçü. Ağır şeyler fırlatmak ve daha uzaktan vurmak isteyenler seçsin." },
  "I pick up the cart. That's the club now.":
    { en: "Pick up something huge and use it as a weapon.", tr: "Devasa bir şeyi alıp silah olarak kullan." },
  "He's a zone away. That's still in reach.":
    { en: "Hit an enemy a whole zone away with your reach.", tr: "Erişiminle bir bölge uzaktaki düşmana vur." },
  "I catch the horse.":
    { en: "Catch or stop something far too big to grab.", tr: "Kavranamayacak kadar büyük bir şeyi yakala ya da durdur." },
  // Bloodrager
  "The rage doesn't stay inside. It never did.":
    { en: "A barbarian whose fury becomes shockwaves and force. Pick this if you want a rager who also has ranged, magic-like hits.", tr: "Öfkesi şok dalgalarına ve kuvvete dönüşen bir barbar. Menzilli, büyü benzeri vuruşları da olan bir öfkeci isteyenler seçsin." },
  "I hit the ground and the ground answers.":
    { en: "Slam the ground to send a shockwave outward.", tr: "Yere vur, dışa doğru bir şok dalgası gönder." },
  "The shout arrives before I do.":
    { en: "Hit an enemy at range with a wave of force.", tr: "Bir kuvvet dalgasıyla uzaktaki düşmana vur." },
  "Everything in front of me goes backwards. All of it.":
    { en: "Push everything in front of you back a zone.", tr: "Önündeki her şeyi bir bölge geri it." },

  // ══════════════════════ PALADIN ══════════════════════
  "I pour light into her wounds until she opens her eyes.":
    { en: "Heal a badly hurt ally with holy light.", tr: "Ağır yaralı bir müttefiki kutsal ışıkla iyileştir." },
  "I say his name and he cannot look away from me.":
    { en: "Force an enemy to focus on you and no one else.", tr: "Bir düşmanı yalnızca sana odaklanmaya zorla." },
  "Nothing unholy crosses this threshold while I stand in it.":
    { en: "Block a spot so unholy things can't pass.", tr: "Bir noktayı tut, kutsal olmayan şeyler geçemesin." },
  "My oath burns through the whole line of them.":
    { en: "Deal big holy damage to a line of enemies.", tr: "Bir sıra düşmana büyük kutsal hasar ver." },
  "The lie is spoken aloud, and everyone in this hall hears it as a lie.":
    { en: "Force a lie to be heard as a lie by everyone present.", tr: "Bir yalanı, oradaki herkesin yalan olarak duymasını sağla." },
  // Oath of Light
  "You are not the light. You are what it is pointed through.":
    { en: "A healing, protective paladin who reveals hidden things. Pick this if you want to support and shield the party.", tr: "İyileştiren, koruyan ve gizlileri açığa çıkaran bir paladin. Grubu desteklemek ve kalkanlamak isteyenler seçsin." },
  "Daylight. In here. Now.":
    { en: "Fill an area with bright daylight.", tr: "Bir alanı parlak gün ışığıyla doldur." },
  "The curse comes off her. It has to go somewhere else.":
    { en: "Lift a curse from an ally.", tr: "Bir müttefikten bir laneti kaldır." },
  "I can't see it. It can't hide from this.":
    { en: "Reveal an invisible or hidden enemy with light.", tr: "Görünmez ya da gizli bir düşmanı ışıkla açığa çıkar." },
  // Oath of Vengeance
  "Someone did something, and you have not finished about it.":
    { en: "A hunter paladin who locks onto one enemy and hits it reliably. Pick this to take down a single tough target.", tr: "Tek bir düşmana kilitlenip ona güvenilir şekilde vuran avcı paladin. Tek bir güçlü hedefi düşürmek için seç." },
  "I know which direction he's in. I always do.":
    { en: "Always know where your marked enemy is.", tr: "İşaretli düşmanının nerede olduğunu her zaman bil." },
  "He's faster than me. He isn't going to stay ahead.":
    { en: "Chase down an enemy faster than you.", tr: "Senden hızlı bir düşmanı kovala ve yakala." },
  "The armor doesn't matter. I'm not looking for a gap.":
    { en: "Hit your marked enemy no matter how armoured they are.", tr: "İşaretli düşmanına, ne kadar zırhlı olursa olsun vur." },
  // Oath of Atonement
  "You did something. This is how you carry it.":
    { en: "A selfless paladin who takes others' pain and damage. Pick this to soak harm meant for your friends.", tr: "Başkalarının acısını ve hasarını üstlenen özverili bir paladin. Arkadaşlarına yönelen zararı emmek için seç." },
  "I draw the poison out of her and into me.":
    { en: "Take an ally's poison or affliction into yourself.", tr: "Bir müttefikin zehrini ya da illetini kendine al." },
  "I stand in the fire so she doesn't have to.":
    { en: "Stand in danger so an ally doesn't have to.", tr: "Bir müttefik durmak zorunda kalmasın diye tehlikede dur." },
  "Whatever he did — I'll carry it. Let him go.":
    { en: "Take on someone else's burden or punishment.", tr: "Başkasının yükünü ya da cezasını üstlen." },
  // Oath of the Silent
  "No banner, no shining armour, no announcement. Judgement all the same.":
    { en: "A quiet investigator paladin who finds the guilty and forces the truth. Pick this for mysteries and interrogation.", tr: "Suçluyu bulan ve gerçeği söyleten sessiz, dedektif paladin. Gizemler ve sorgu için seç." },
  "Three days in this town. I know which one of them it is.":
    { en: "Investigate and identify the guilty one.", tr: "Araştırıp suçlu olanı belirle." },
  "He knows what he did. Now everyone in the room does too.":
    { en: "Expose an enemy's crime to everyone present.", tr: "Bir düşmanın suçunu oradaki herkese açığa çıkar." },
  "My oath was sworn to nobody at all. It still holds.":
    { en: "Keep your power without any temple or witness.", tr: "Hiçbir tapınak ya da tanık olmadan gücünü koru." },

  // ══════════════════════ MONK ══════════════════════
  "I run up the wall and come down behind him.":
    { en: "Move somewhere no one expects, like behind an enemy.", tr: "Kimsenin beklemediği bir yere, örneğin düşmanın arkasına git." },
  "I catch the arrow.":
    { en: "Catch or deflect an incoming projectile.", tr: "Gelen bir mermiyi yakala ya da savuştur." },
  "I strike a nerve. His arm stops working.":
    { en: "Hit a nerve to disable an enemy's limb.", tr: "Bir sinire vurup düşmanın bir uzvunu etkisiz bırak." },
  "I move through the whole line, hitting each of them once.":
    { en: "Move through a line of enemies, hitting each once.", tr: "Bir sıra düşmanın içinden geçerek her birine bir kez vur." },
  "I stand perfectly still and nothing they do lands.":
    { en: "Go untouchable for a moment — nothing hits you.", tr: "Bir anlığına dokunulmaz ol — hiçbir şey sana isabet etmez." },
  // Open Hand
  "Bodies are machines and you have read the manual.":
    { en: "A striker who disables enemies by hitting the right spots. Pick this to stun, throw, and shut enemies down.", tr: "Doğru noktalara vurarak düşmanları etkisiz kılan bir vurucu. Sersemletmek, fırlatmak ve düşmanları durdurmak için seç." },
  "The one on the left is hurt. I can see it in how he stands.":
    { en: "Read an enemy's health and find their weak point.", tr: "Bir düşmanın canını oku ve zayıf noktasını bul." },
  "He's twice my size. He goes over my hip anyway.":
    { en: "Throw an enemy much bigger than you.", tr: "Kendinden çok daha iri bir düşmanı fırlat." },
  "I strike under the ribs. His heart skips three beats.":
    { en: "Land a strike that briefly stuns an enemy.", tr: "Bir düşmanı kısa süre sersemleten bir darbe indir." },
  // Shadow
  "Stillness, then absence.":
    { en: "A stealth monk who moves through darkness. Pick this for sneaking, ambush, and hit-and-vanish fighting.", tr: "Karanlıkta hareket eden gizlilik keşişi. Sızma, pusu ve vur-kaybol dövüşü için seç." },
  "Every light in this room goes out at once.":
    { en: "Put out all the lights in a room at once.", tr: "Bir odadaki tüm ışıkları bir anda söndür." },
  "The blow comes from a direction that has nobody in it.":
    { en: "Teleport through shadow and strike from nowhere.", tr: "Gölgeden ışınlan ve boşluktan vur." },
  "I walk past the watchman. In the open. He doesn't register it.":
    { en: "Slip past a guard even in the open.", tr: "Açıkta bile bir nöbetçinin yanından süzül." },
  // Four Elements
  "The body is one of the four. It happens to be the one you're in.":
    { en: "A monk who channels the elements through their strikes. Pick this if you want martial arts plus elemental range and control.", tr: "Elementleri vuruşlarıyla kanalize eden bir keşiş. Dövüş sanatının yanında elementsel menzil ve kontrol isteyenler seçsin." },
  "The punch arrives as wind, from across the room.":
    { en: "Strike an enemy at range with wind.", tr: "Uzaktaki bir düşmana rüzgârla vur." },
  "Six steps across the water. That's all I need.":
    { en: "Briefly walk on water or thin air.", tr: "Kısa süre suyun ya da havanın üstünde yürü." },
  "Stone comes up out of the floor between us.":
    { en: "Raise a wall of stone from the ground.", tr: "Yerden bir taş duvar yükselt." },
  // Mender
  "The same knowledge that stops a heart can start one.":
    { en: "A healing monk who mends bodies by touch. Pick this if you want a front-line fighter who also patches the party up.", tr: "Dokunarak bedenleri onaran bir keşiş. Grubu ayakta tutan ama ön safta da dövüşen biri isteyenler seçsin." },
  "Breathe. There. That's the poison out.":
    { en: "Draw poison or affliction out of an ally by touch.", tr: "Dokunarak bir müttefikten zehri ya da illeti çek." },
  "I set the bone and she's back up this round.":
    { en: "Heal a downed ally back to their feet.", tr: "Düşmüş bir müttefiki ayağa kaldıracak kadar iyileştir." },
  "Everyone I can reach. All at once. Then I'm finished.":
    { en: "Heal everyone next to you at once, then you're spent.", tr: "Yanındaki herkesi bir anda iyileştir, sonra tükenirsin." },

  // ══════════════════════ ROGUE ══════════════════════
  "I'm not where he swung. I'm behind him.":
    { en: "Dodge an attack and end up behind the enemy.", tr: "Bir saldırıdan kaç ve düşmanın arkasında bit." },
  "That's his purse, this is his key, and he's noticed neither.":
    { en: "Pickpocket someone without being noticed.", tr: "Birini fark ettirmeden yankesicilik yap." },
  "I put out the torches and let the dark do the rest.":
    { en: "Kill the lights to control a fight.", tr: "Işıkları söndürüp dövüşü kontrol et." },
  "The wine was poisoned four hours ago. This is just when it starts.":
    { en: "Set a poison to trigger at a time you chose earlier.", tr: "Önceden seçtiğin bir anda tetiklenecek bir zehir hazırla." },
  "I was never in this building. Check the records — I never was.":
    { en: "Leave no trace that you were ever there.", tr: "Orada bulunduğuna dair hiçbir iz bırakma." },
  // Assassin
  "The fight is a formality. The work happened earlier.":
    { en: "A killer who sets up a devastating first strike. Pick this for burst damage, poison, and disguise.", tr: "Yıkıcı bir ilk vuruş kuran bir katil. Patlama hasarı, zehir ve kılık değiştirme için seç." },
  "I've watched him for an hour. Now I'm him.":
    { en: "Study someone for a while, then impersonate them.", tr: "Birini bir süre incele, sonra onu taklit et." },
  "The poison starts working at midnight. I chose midnight.":
    { en: "Time a poison to hit exactly when you want.", tr: "Bir zehri, tam istediğin anda etki edecek şekilde ayarla." },
  "He'll be standing there in four minutes. I know because I know him.":
    { en: "Predict where a target will be and be ready.", tr: "Bir hedefin nerede olacağını tahmin et ve hazır ol." },
  // Infiltrator
  "Doors are a suggestion and you have not agreed to it.":
    { en: "A break-in specialist. Locks, wards, and guards don't stop you. Pick this for heists and getting anywhere.", tr: "Girme uzmanı. Kilitler, korumalar ve nöbetçiler seni durduramaz. Soygunlar ve her yere girmek için seç." },
  "No footprints, no scent, no one was here.":
    { en: "Move without leaving tracks or scent.", tr: "İz ya da koku bırakmadan hareket et." },
  "We leave the way we came, at walking pace.":
    { en: "Get out calmly, without setting off alarms.", tr: "Alarm çalmadan, sakince çık." },
  "The ward stays running. I just stop matching its definition.":
    { en: "Slip past a magic ward without disabling it.", tr: "Bir büyü korumasını devre dışı bırakmadan geç." },
  // Trickster
  "The truth is whatever survives the next five minutes.":
    { en: "A con artist who lies, disguises, and misdirects. Pick this for social play and getting out of trouble by talking.", tr: "Yalan söyleyen, kılık değiştiren ve şaşırtan bir dolandırıcı. Sosyal oyun ve konuşarak beladan kurtulmak için seç." },
  "I heard him speak once. That's enough.":
    { en: "Mimic a voice you've heard.", tr: "Duyduğun bir sesi taklit et." },
  "The writ is genuine. It'll survive exactly one reading.":
    { en: "Forge a document good enough for one check.", tr: "Bir kontrole dayanacak kadar iyi bir belge sahtele." },
  "By morning each of them is certain the other sold them out.":
    { en: "Turn two enemies against each other.", tr: "İki düşmanı birbirine düşür." },

  // ══════════════════════ RANGER ══════════════════════
  "Four of them. One is limping. They came through last night.":
    { en: "Read tracks to learn who passed and when.", tr: "İzleri okuyarak kimin ne zaman geçtiğini öğren." },
  "I shoot the rope holding the gate.":
    { en: "Make a precise shot at an object, not a person.", tr: "Bir insana değil, bir nesneye isabetli atış yap." },
  "One arrow, everyone in that doorway.":
    { en: "Hit every enemy bunched in one zone with arrows.", tr: "Bir bölgede toplanmış her düşmana oklarla vur." },
  "We take this pass. I know a way that doesn't involve the pass.":
    { en: "Find a safer route through the wilderness.", tr: "Yabanda daha güvenli bir rota bul." },
  "I've been setting up this clearing since dawn. Roll initiative.":
    { en: "Prepare an ambush spot before a fight starts.", tr: "Dövüş başlamadan önce bir pusu noktası hazırla." },
  // Sharpshooter
  "The shot exists. You just have to wait for it.":
    { en: "A long-range archer who ignores cover. Pick this for reliable, high-damage ranged attacks from far away.", tr: "Siper tanımayan uzun menzilli bir okçu. Uzaktan güvenilir, yüksek hasarlı menzilli saldırılar için seç." },
  "The chain has one weak link. That one.":
    { en: "Hit one exact weak point from range.", tr: "Uzaktan tek bir zayıf noktaya isabet et." },
  "It's further than anyone thinks is possible. I take it anyway.":
    { en: "Make a shot no one thought was in range.", tr: "Kimsenin menzilde sanmadığı bir atışı yap." },
  "Through the keyhole. Yes, really.":
    { en: "Shoot through a tiny opening.", tr: "Küçücük bir açıklıktan geçir." },
  // Beast Bond
  "There are two of you and only one draws a sheet.":
    { en: "A ranger with an animal companion that fights alongside you. Pick this if you want a loyal pet that acts on its own.", tr: "Yanında dövüşen bir hayvan yoldaşı olan korucu. Kendi başına oynayan sadık bir dost isteyenler seçsin." },
  "I send her in. I can't fit. She can.":
    { en: "Send your companion where you can't go.", tr: "Yoldaşını gidemediğin yere gönder." },
  "We flank him. Neither of us needed to say anything.":
    { en: "Flank an enemy together with your companion.", tr: "Yoldaşınla birlikte bir düşmanı kuşat." },
  "I see what she sees. She's a mile out.":
    { en: "See through your companion's eyes at a distance.", tr: "Uzaktan yoldaşının gözünden gör." },
  // Trailblazer
  "You have already been here, and you left things.":
    { en: "A trap-setter who controls terrain and survival. Pick this if you like preparing the ground before a fight.", tr: "Araziyi ve hayatta kalmayı kontrol eden bir tuzakçı. Dövüşten önce zemini hazırlamayı sevenler seçsin." },
  "There's a storm in two days. Plan around it.":
    { en: "Predict weather and plan travel around it.", tr: "Havayı tahmin et ve yolculuğu ona göre planla." },
  "The snare takes something twice my weight.":
    { en: "Set a trap strong enough to catch something big.", tr: "Büyük bir şeyi yakalayacak kadar güçlü bir tuzak kur." },
  "The bog is passable. For exactly four of us.":
    { en: "Guide the party safely through dangerous terrain.", tr: "Grubu tehlikeli araziden güvenle geçir." },

  // ══════════════════════ BARD ══════════════════════
  "I tell him the story of his own father and watch him decide not to swing.":
    { en: "Talk an enemy out of attacking.", tr: "Bir düşmanı saldırmaktan vazgeçir." },
  "There's a second set of footsteps in this room. Everyone hears them.":
    { en: "Create a convincing sound illusion everyone hears.", tr: "Herkesin duyduğu inandırıcı bir ses illüzyonu yarat." },
  "The whole tavern is singing, and nobody is watching the back door.":
    { en: "Distract a whole room so allies can act.", tr: "Bütün bir odayı oyala ki müttefikler iş görebilsin." },
  "I sing the fear out of them. All of them.":
    { en: "Remove fear from all your allies at once.", tr: "Tüm müttefiklerinin korkusunu bir anda gider." },
  "By tomorrow this town remembers a very different version of tonight.":
    { en: "Change what a whole town believes happened.", tr: "Bütün bir kasabanın ne olduğuna dair inancını değiştir." },
  // Wordsmith
  "You have never needed to raise your voice.":
    { en: "A social master of courts, rumours, and reputation. Pick this to win through talking, negotiation, and influence.", tr: "Sarayların, söylentilerin ve itibarın sosyal ustası. Konuşarak, müzakereyle ve nüfuzla kazanmak için seç." },
  "Give me a minute in the room. I'll know what they want.":
    { en: "Read a room and learn what people want.", tr: "Bir odayı oku ve insanların ne istediğini öğren." },
  "This is an execution. I'm making it a trial.":
    { en: "Talk your way out of a hopeless situation.", tr: "Umutsuz bir durumdan konuşarak çık." },
  "The story reaches the next town before we do.":
    { en: "Spread a rumour that arrives ahead of you.", tr: "Senden önce varan bir söylenti yay." },
  // Warsinger
  "War has a rhythm and you are keeping it.":
    { en: "A battle bard who buffs allies and coordinates attacks. Pick this to make the whole team fight better in combat.", tr: "Müttefikleri güçlendiren ve saldırıları eşgüdümleyen bir savaş ozanı. Bütün takımın dövüşte daha iyi savaşmasını sağlamak için seç." },
  "One horn call. My party knows exactly what it means.":
    { en: "Signal your party to act in sync.", tr: "Grubunu uyum içinde oynamaları için işaret et." },
  "Six frightened farmers. They hold one more round.":
    { en: "Steady weak allies to hold one more round.", tr: "Zayıf müttefikleri bir tur daha dayanmaları için sağlamlaştır." },
  "Everyone strikes on the beat. Now.":
    { en: "Let every ally attack at once, on your cue.", tr: "İşaretinle her müttefikin bir anda saldırmasını sağla." },
  // Taleweaver
  "The difference between a lie and a story is how well it's told.":
    { en: "An illusionist bard who bends what people see and remember. Pick this for tricks, disguise, and battlefield deception.", tr: "İnsanların gördüğünü ve hatırladığını büken bir illüzyon ozanı. Numaralar, kılık değiştirme ve savaş alanı aldatması için seç." },
  "There's an army on that ridge. There isn't.":
    { en: "Create the illusion of a whole army.", tr: "Bütün bir ordunun illüzyonunu yarat." },
  "For tonight, I'm someone else entirely.":
    { en: "Disguise yourself as someone else for a scene.", tr: "Bir sahne boyunca kendini başka biri olarak göster." },
  "This room remembers a conversation that never happened.":
    { en: "Plant a false memory of something that didn't happen.", tr: "Yaşanmamış bir şeyin sahte anısını yerleştir." },

  // ══════════════════════ WIZARD ══════════════════════
  "A spark, a gust, the page turns itself.":
    { en: "A tiny free effect — a spark, a breeze, a small trick.", tr: "Küçük bedava bir etki — bir kıvılcım, bir esinti, ufak bir numara." },
  "The lock remembers being open.":
    { en: "Magically open a lock.", tr: "Bir kilidi büyüyle aç." },
  "Fire. In the doorway. All of them.":
    { en: "Hit everyone in a doorway or zone with fire.", tr: "Bir kapıdaki ya da bölgedeki herkese ateşle vur." },
  "I unmake the bridge behind us.":
    { en: "Destroy a structure like a bridge.", tr: "Köprü gibi bir yapıyı yok et." },
  "That spell is not going to happen.":
    { en: "Cancel an enemy's spell as it's cast.", tr: "Bir düşmanın büyüsünü yapılırken iptal et." },
  "Give me ten minutes and this circle will hold anything.":
    { en: "Spend ten minutes to make a strong ward (a Ritual, no Energy).", tr: "On dakika harcayıp güçlü bir koruma yap (Ayin, Enerji harcamaz)." },
  // Illusionist
  "Reality is a consensus and you hold a minority opinion.":
    { en: "A wizard who makes fakes that people believe. Pick this for deception, invisibility, and mind tricks.", tr: "İnsanların inandığı sahtelikler yapan bir büyücü. Aldatma, görünmezlik ve zihin oyunları için seç." },
  "There's a wall here. There isn't. But there is.":
    { en: "Create a fake wall that looks and feels real.", tr: "Gerçek görünen ve hissedilen sahte bir duvar yarat." },
  "I'm not visible until I do something about it.":
    { en: "Turn invisible until you attack.", tr: "Saldırana kadar görünmez ol." },
  "He believes he is burning. So he burns.":
    { en: "Make an enemy believe an illusion so hard it hurts them.", tr: "Bir düşmanı bir illüzyona öyle inandır ki ona zarar versin." },
  // Wardmaster
  "Magic is mostly a question of what you don't let in.":
    { en: "A defensive wizard of barriers and banishment. Pick this to protect the party and shut down enemy magic.", tr: "Bariyerlerin ve sürgünün savunmacı büyücüsü. Grubu korumak ve düşman büyüsünü durdurmak için seç." },
  "Nothing crosses this circle.":
    { en: "Put up a barrier nothing can cross.", tr: "Hiçbir şeyin geçemeyeceği bir bariyer kur." },
  "Whatever bound this — I'm unbinding it.":
    { en: "Undo a magical binding or seal.", tr: "Bir büyü bağını ya da mührü çöz." },
  "Back where you came from.":
    { en: "Banish a summoned creature away.", tr: "Çağrılmış bir yaratığı sürgün et." },
  // Diviner
  "You have read ahead.":
    { en: "A wizard who sees the future and knows secrets. Pick this to scout, learn hidden things, and rewrite one roll.", tr: "Geleceği gören ve sırları bilen bir büyücü. Keşif yapmak, gizlileri öğrenmek ve bir atışı yeniden yazmak için seç." },
  "Move. Three seconds before it mattered.":
    { en: "Warn an ally of danger seconds before it happens.", tr: "Bir müttefiki tehlikeden saniyeler önce uyar." },
  "I'm watching a room I'm not in.":
    { en: "Spy on a place you're not in.", tr: "İçinde olmadığın bir yeri gözetle." },
  "I know his true name. I've known it since Tuesday.":
    { en: "Learn a secret like a true name in advance.", tr: "Gerçek isim gibi bir sırrı önceden öğren." },
  // Transmuter
  "Nothing is what it is. It is only what it currently is.":
    { en: "A wizard who changes what things are made of. Pick this to reshape objects and terrain on the fly.", tr: "Şeylerin neyden yapıldığını değiştiren bir büyücü. Nesneleri ve araziyi anında yeniden biçimlendirmek için seç." },
  "The floor under him is water now.":
    { en: "Turn solid ground into water under an enemy.", tr: "Bir düşmanın altındaki katı zemini suya çevir." },
  "That door is paper. It was oak a moment ago.":
    { en: "Turn a solid barrier into something flimsy.", tr: "Sağlam bir engeli çürük bir şeye çevir." },
  "The falling stone weighs twice what it did.":
    { en: "Change an object's weight to your advantage.", tr: "Bir nesnenin ağırlığını lehine değiştir." },

  // ══════════════════════ SORCERER ══════════════════════
  "Sparks off my hand. Just enough to be a problem.":
    { en: "A small free zap of magic.", tr: "Küçük bedava bir büyü çarpması." },
  "He's on fire and he doesn't know why yet.":
    { en: "Hit one enemy with your element.", tr: "Bir düşmana elementinle vur." },
  "Both of them. Same instant.":
    { en: "Hit two targets at once (using Twin).", tr: "İki hedefe birden vur (İkiz ile)." },
  "I don't say anything, I don't move, and it happens anyway.":
    { en: "Cast with no words or gestures (using Silent).", tr: "Söz ya da jest olmadan büyü yap (Sessiz ile)." },
  "The whole corridor. From here.":
    { en: "Hit everyone in a whole corridor from a distance.", tr: "Uzaktan bütün bir koridordaki herkese vur." },
  // Pyromancer
  "Fire has never once hurt you and you stopped mentioning it.":
    { en: "A fire sorcerer immune to their own flames. Pick this for raw fire damage and walking through infernos.", tr: "Kendi alevlerine bağışık bir ateş sihirbazı. Ham ateş hasarı ve alevlerin içinden yürümek için seç." },
  "I walk through the burning house at a normal pace.":
    { en: "Walk through fire unharmed.", tr: "Ateşin içinden zarar görmeden yürü." },
  "The heat gets there before the flame does.":
    { en: "Burn an enemy from a distance.", tr: "Uzaktaki bir düşmanı yak." },
  "Fire that doesn't consume what it burns.":
    { en: "Control your fire so it burns only what you choose.", tr: "Ateşini yalnızca seçtiğini yakacak şekilde kontrol et." },
  // Cryomancer
  "You are cold to the touch and it is not a metaphor.":
    { en: "An ice sorcerer who slows and freezes enemies. Pick this for crowd control and locking enemies down.", tr: "Düşmanları yavaşlatan ve donduran bir buz sihirbazı. Kalabalık kontrolü ve düşmanları kilitlemek için seç." },
  "I freeze the wound shut.":
    { en: "Freeze a wound closed to stop bleeding.", tr: "Kanamayı durdurmak için yarayı dondurarak kapat." },
  "A bridge. Across running water. Give me a second.":
    { en: "Freeze water into a bridge or wall.", tr: "Suyu bir köprü ya da duvar hâline dondur." },
  "Nobody in this room moves quickly. Including me.":
    { en: "Slow everyone in the area, yourself included.", tr: "Alandaki herkesi yavaşlat, kendin dâhil." },
  // Stormblood
  "The pressure drops when you get angry.":
    { en: "A lightning sorcerer whose bolts jump between enemies. Pick this to hit multiple targets with electricity.", tr: "Şimşekleri düşmanlar arasında sıçrayan bir sihirbaz. Elektrikle birden çok hedefe vurmak için seç." },
  "I ride the gust up two floors.":
    { en: "Ride the wind up to a higher spot.", tr: "Rüzgârı bir üst kata bin." },
  "The bolt finds the man in armor, not the man beside him.":
    { en: "Aim lightning at exactly the enemy you want.", tr: "Şimşeği tam istediğin düşmana yönelt." },
  "Thunder. It empties their lungs.":
    { en: "Hit a group with a blast of thunder.", tr: "Bir grubu bir gök gürültüsü patlamasıyla vur." },
  // Dragonblood
  "The scales showed up around your fourteenth birthday.":
    { en: "A sorcerer with draconic scales, wings, and breath. Pick this for a tough caster with a wide breath attack.", tr: "Ejderha pulları, kanatları ve nefesi olan bir sihirbaz. Geniş bir nefes saldırısı olan dayanıklı bir büyücü için seç." },
  "Wings. For as long as I need them.":
    { en: "Grow wings and fly for a while.", tr: "Kanatlar çıkar ve bir süre uç." },
  "I look at the mob. The mob stops.":
    { en: "Freeze a crowd in place with a draconic stare.", tr: "Ejderha bakışıyla bir kalabalığı yerinde dondur." },
  "I speak in a voice the ground can hear.":
    { en: "Speak with a voice that shakes the ground.", tr: "Yeri sarsan bir sesle konuş." },
  // Elderblood
  "Your bloodline predates the words currently used for magic.":
    { en: "A sorcerer of raw, ancient magic beyond the elements. Pick this if you want the most flexible, unpredictable caster.", tr: "Elementlerin ötesinde ham, kadim büyünün sihirbazı. En esnek ve öngörülemez büyücüyü isteyenler seçsin." },
  "It isn't any school you'd recognise.":
    { en: "Cast magic that fits no known category.", tr: "Bilinen hiçbir kategoriye uymayan büyü yap." },
  "A word from before there were words.":
    { en: "Use ancient, primal power.", tr: "Kadim, ilksel bir gücü kullan." },
  "I decline to accept that this is a fire spell.":
    { en: "Cast an effect outside your normal Domain without penalty.", tr: "Normal Alanının dışında bir etkiyi cezasız yap." },

  // ══════════════════════ WARLOCK ══════════════════════
  "Something whispers his name and he flinches.":
    { en: "Unnerve an enemy with a whisper.", tr: "Bir fısıltıyla bir düşmanın sinirini boz." },
  "I show him what's standing behind me. He runs.":
    { en: "Frighten an enemy into fleeing.", tr: "Bir düşmanı kaçacak kadar korkut." },
  "I ask it what's past the door. It tells me. It enjoys telling me.":
    { en: "Ask your patron for information.", tr: "Patronundan bilgi iste." },
  "The shadows in this room are mine now.":
    { en: "Take control of the shadows in an area.", tr: "Bir alandaki gölgelerin kontrolünü ele geçir." },
  "Everything in that hallway starts to rot.":
    { en: "Rot everything in a corridor.", tr: "Bir koridordaki her şeyi çürüt." },
  // The Fiend
  "A contract, signed, with a fixed term you did not read carefully.":
    { en: "A warlock of hellfire and curses who can burn HP for power. Pick this for aggressive magic and binding deals.", tr: "Güç için Can yakabilen, cehennem ateşi ve lanet warlock'u. Saldırgan büyü ve bağlayıcı anlaşmalar için seç." },
  "It's a genuinely good deal. That's the problem with it.":
    { en: "Offer a tempting deal that hides a catch.", tr: "İçinde bir tuzak saklayan cazip bir anlaşma sun." },
  "The fire burns the guilty hotter. It knows the difference.":
    { en: "Burn the guilty worse than the innocent.", tr: "Suçluyu masumdan daha çok yak." },
  "The curse lifts the moment he admits what he did.":
    { en: "Set a curse that lifts only on confession.", tr: "Yalnızca itirafla kalkan bir lanet koy." },
  // The Void
  "There is a space between the stars and something in it noticed you.":
    { en: "A warlock of the mind who reads and breaks enemies. Pick this for telepathy, fear, and psychic attacks.", tr: "Düşmanları okuyup kıran, zihnin warlock'u. Telepati, korku ve psişik saldırılar için seç." },
  "I've known him ten seconds. I know what he's afraid of.":
    { en: "Read what an enemy fears.", tr: "Bir düşmanın neyden korktuğunu oku." },
  "The scream happens inside his head only.":
    { en: "Attack an enemy's mind, unheard by others.", tr: "Bir düşmanın zihnine, başkaları duymadan saldır." },
  "I show her one true thing. She doesn't recover.":
    { en: "Break an enemy's mind with a terrible truth.", tr: "Korkunç bir gerçekle bir düşmanın aklını boz." },
  // The Hunger
  "It is not evil. It is just always eating, and now so are you.":
    { en: "A warlock of decay who grows stronger as things die. Pick this for a durable caster who feeds on the battlefield.", tr: "Şeyler öldükçe güçlenen, çürüme warlock'u. Savaş alanından beslenen dayanıklı bir büyücü için seç." },
  "That wound won't close while I'm in the room.":
    { en: "Stop an enemy's wounds from healing.", tr: "Bir düşmanın yaralarının iyileşmesini engelle." },
  "The gate starts to rot. Wood first.":
    { en: "Rot a barrier away to open a path.", tr: "Bir engeli çürüterek yol aç." },
  "I take the memory out of him and keep it.":
    { en: "Take a memory from someone and keep it.", tr: "Birinden bir anı al ve sakla." },

  // ══════════════════════ NECROMANCER ══════════════════════
  "The corpse answers. Briefly, and it is not glad to.":
    { en: "Question a corpse for a short answer.", tr: "Kısa bir cevap için bir cesedi sorgula." },
  "He gets up. He works for me now, for about a day.":
    { en: "Raise a corpse to serve you for about a day.", tr: "Bir cesedi yaklaşık bir günlüğüne sana hizmet etmesi için kaldır." },
  "Everything living in that room feels its strength going elsewhere.":
    { en: "Drain the strength from everyone living in a zone.", tr: "Bir bölgedeki tüm canlıların gücünü çek." },
  "I take the wound off her and put it on him.":
    { en: "Move a wound from an ally onto an enemy.", tr: "Bir yarayı bir müttefikten bir düşmana taşı." },
  "The dead in this graveyard stand up. All of them.":
    { en: "Raise every corpse in a graveyard at once.", tr: "Bir mezarlıktaki her cesedi bir anda kaldır." },
  // Bonewright
  "The frame is the honest part. Everything else was decoration.":
    { en: "A necromancer with a permanent skeleton servant. Pick this if you want a reliable pet that fights every turn.", tr: "Kalıcı bir iskelet hizmetkârı olan bir ölüm büyücüsü. Her tur dövüşen güvenilir bir dost isteyenler seçsin." },
  "I hold the bone. I know how it died.":
    { en: "Learn how something died from its bones.", tr: "Kemiklerinden bir şeyin nasıl öldüğünü öğren." },
  "Armor. Grown out of my own ribs.":
    { en: "Grow bone armour from your own body.", tr: "Kendi bedeninden kemik zırh büyüt." },
  "A wall. Interlocking. It used to be several people.":
    { en: "Build a wall of interlocking bone.", tr: "Birbirine geçmiş kemikten bir duvar yap." },
  // Bloodletter
  "Life is a fluid, and fluids can be moved.":
    { en: "A necromancer who moves blood and life between bodies. Pick this to heal by draining, and pay for magic with HP.", tr: "Kanı ve hayatı bedenler arasında taşıyan bir ölüm büyücüsü. Çekerek iyileştirmek ve büyüyü Canla ödemek için seç." },
  "His blood. Her wound. It's a simple transfer.":
    { en: "Heal an ally using an enemy's blood.", tr: "Bir müttefiki bir düşmanın kanıyla iyileştir." },
  "I've tasted his blood. Now it boils.":
    { en: "Boil the blood of someone you've tasted.", tr: "Kanını tattığın birinin kanını kaynat." },
  "I know the rhythm of that heart. I can stop it from here.":
    { en: "Stop an enemy's heart from a distance.", tr: "Uzaktan bir düşmanın kalbini durdur." },
  // Cursebearer
  "You don't have to be there when it happens.":
    { en: "A necromancer of long-lasting curses. Pick this to set curses that trigger later on conditions you choose.", tr: "Uzun süreli lanetlerin ölüm büyücüsü. Sonradan, seçtiğin koşullarda tetiklenen lanetler koymak için seç." },
  "His name can't be spoken now without pain.":
    { en: "Curse a name so speaking it causes pain.", tr: "Bir ismi, söylenmesi acı verecek şekilde lanetle." },
  "The hex triggers if he lies to me. Only then.":
    { en: "Set a curse that only triggers on a condition.", tr: "Yalnızca bir koşulda tetiklenen bir lanet koy." },
  "Bad luck. For him, and for his children.":
    { en: "Lay a lasting curse of bad luck.", tr: "Kalıcı bir kötü şans laneti koy." },
  // Spiritbinder
  "The body is the part that ends.":
    { en: "A necromancer who talks to and binds spirits. Pick this for ghosts, secrets from the dead, and soul magic.", tr: "Ruhlarla konuşan ve onları bağlayan bir ölüm büyücüsü. Hayaletler, ölülerden sırlar ve ruh büyüsü için seç." },
  "What did you see, the night you died?":
    { en: "Ask a ghost what it witnessed.", tr: "Bir hayalete neye tanık olduğunu sor." },
  "You're going on now. It isn't a request.":
    { en: "Force a lingering spirit to move on.", tr: "Oyalanan bir ruhu geçip gitmeye zorla." },
  "The spirit goes into the blade. It agreed. Mostly.":
    { en: "Bind a spirit into an object or weapon.", tr: "Bir ruhu bir nesneye ya da silaha bağla." },

  // ══════════════════════ CLERIC ══════════════════════
  "Be still. You're not bleeding any more.":
    { en: "Heal an ally and stop their bleeding.", tr: "Bir müttefiki iyileştir ve kanamasını durdur." },
  "Every one of them. On their feet. Right now.":
    { en: "Heal your whole group at once.", tr: "Bütün grubunu bir anda iyileştir." },
  "This ground is holy as of this moment.":
    { en: "Make an area holy ground.", tr: "Bir alanı kutsal toprak yap." },
  "That is not going to touch her.":
    { en: "Cancel an attack aimed at an ally.", tr: "Bir müttefike yönelen saldırıyı iptal et." },
  "I need him back and I do not care what it costs.":
    { en: "Ask your god for a miracle (the Story God decides the cost).", tr: "Tanrından bir mucize iste (bedeline Hikâye Tanrısı karar verir)." },
  // Healer
  "The war will end. People still have to live afterwards.":
    { en: "A pure healer who mends, cures, and even revives. Pick this to keep the party alive above all else.", tr: "İyileştiren, tedavi eden ve hatta dirilten saf bir şifacı. Her şeyden önce grubu hayatta tutmak için seç." },
  "Bone set. Four seconds.":
    { en: "Heal a wound quickly and reliably.", tr: "Bir yarayı hızlı ve güvenilir şekilde iyileştir." },
  "The plague stops at this ward. The whole village.":
    { en: "Ward a whole area against disease.", tr: "Bütün bir alanı hastalığa karşı koru." },
  "She's been dead under an hour. That's still negotiable.":
    { en: "Revive someone recently dead.", tr: "Kısa süre önce ölen birini dirilt." },
  // War Priest
  "Your god has a position on this and it is not neutral.":
    { en: "A fighting cleric who attacks with faith. Pick this if you want a healer who is also strong in melee combat.", tr: "İnançla saldıran dövüşçü bir rahip. Yakın dövüşte de güçlü bir şifacı isteyenler seçsin." },
  "This line does not break. I've said so.":
    { en: "Steady a line of allies so it holds.", tr: "Bir sıra müttefiki dayansın diye sağlamlaştır." },
  "The blade hurts that kind of thing specifically.":
    { en: "Bless a weapon to hurt one kind of enemy badly.", tr: "Bir silahı, bir tür düşmana çok acı verecek şekilde kutsa." },
  "Shield wall. Hold.":
    { en: "Form and hold a shield wall with allies.", tr: "Müttefiklerle bir kalkan duvarı oluştur ve tut." },
  // Dark Preacher
  "Some gods are answered. Yours is negotiated with.":
    { en: "A cleric of a dark god who trades pain for power. Pick this for fear, secrets, and sacrifice-based magic.", tr: "Güç için acı takas eden karanlık bir tanrının rahibi. Korku, sırlar ve kurban temelli büyü için seç." },
  "The blessing works. It costs her something.":
    { en: "Grant a blessing that has a price.", tr: "Bir bedeli olan bir kutsama ver." },
  "He intended to keep that. He doesn't now.":
    { en: "Pull a secret out of someone unwilling.", tr: "İstemeyen birinden bir sır çek." },
  "They don't remember joining. They still come every week.":
    { en: "Sway a group into loyalty they don't question.", tr: "Bir grubu, sorgulamadıkları bir sadakate yönelt." },

  // ══════════════════════ SHAMAN ══════════════════════
  "I ask the crows what came through here.":
    { en: "Ask nearby animals what they've seen.", tr: "Yakındaki hayvanlara ne gördüklerini sor." },
  "The roots take his ankles.":
    { en: "Trap an enemy with roots from the ground.", tr: "Yerden çıkan köklerle bir düşmanı tuzağa düşür." },
  "Fog. All of it. Nobody sees anyone.":
    { en: "Fill the area with fog so no one can see.", tr: "Alanı sisle doldur, kimse kimseyi görmesin." },
  "Give me ten minutes and it will be raining.":
    { en: "Change the weather over time.", tr: "Zaman içinde havayı değiştir." },
  "The whole treeline moves.":
    { en: "Command the forest itself to move.", tr: "Ormanın kendisine hareket etmesini emret." },
  // Wild Heart
  "You were raised by something and it wasn't people.":
    { en: "A shaman close to beasts and the hunt. Pick this to command animals and shapeshift into stronger forms.", tr: "Canavarlara ve ava yakın bir şaman. Hayvanlara komut vermek ve daha güçlü biçimlere dönüşmek için seç." },
  "As a wolf, I'm a wolf. Anyone watching agrees.":
    { en: "Fully take a beast form, convincing to anyone.", tr: "Herkesi ikna edecek şekilde tam bir canavar biçimi al." },
  "I know this valley through the things that live in it.":
    { en: "Know an area through the animals in it.", tr: "Bir bölgeyi, içinde yaşayan hayvanlar aracılığıyla bil." },
  "The pack hunts with us. For tonight.":
    { en: "Call a pack of beasts to fight with you.", tr: "Seninle dövüşmek için bir canavar sürüsü çağır." },
  // Storm
  "You are on good terms with the weather and it shows.":
    { en: "A shaman of wind and lightning. Pick this for weather control and ranged storm attacks.", tr: "Rüzgârın ve şimşeğin şamanı. Hava kontrolü ve menzilli fırtına saldırıları için seç." },
  "Lightning. On that one specifically.":
    { en: "Call lightning down on one target.", tr: "Tek bir hedefin üstüne şimşek çağır." },
  "Wind at our backs. Three days of it.":
    { en: "Give the party a lasting wind for travel.", tr: "Gruba yolculuk için kalıcı bir rüzgâr ver." },
  "The squall grounds the ship. It stays grounded.":
    { en: "Whip up a storm to stop a ship or force.", tr: "Bir gemiyi ya da gücü durdurmak için fırtına kopar." },
  // Deep Root
  "Stone is slow, not stupid.":
    { en: "A shaman of stone, roots, and growth. Pick this to reshape terrain and control the battlefield.", tr: "Taşın, köklerin ve büyümenin şamanı. Araziyi yeniden biçimlendirmek ve savaş alanını kontrol etmek için seç." },
  "The path closes behind us.":
    { en: "Close a path behind you with growth.", tr: "Arkandaki yolu bitki büyümesiyle kapat." },
  "Everything that's crossed this ground in a month — I know it.":
    { en: "Learn everything that crossed this ground recently.", tr: "Son zamanlarda bu topraktan geçen her şeyi öğren." },
  "A season of growth. This afternoon.":
    { en: "Grow a season's worth of plants in an afternoon.", tr: "Bir öğleden sonrada bir mevsimlik bitki büyüt." },

  // ══════════════════════ ALCHEMIST ══════════════════════
  "Give me a minute with the body and I'll tell you what killed it.":
    { en: "Examine a body or substance to learn what it is.", tr: "Bir cesedi ya da maddeyi inceleyip ne olduğunu öğren." },
  "Acid. Straight through the hinges.":
    { en: "Use acid to eat through a barrier.", tr: "Bir engeli asitle eritip geç." },
  "Drink this. You won't feel the arrow for about an hour.":
    { en: "Make a potion that numbs pain for a while.", tr: "Bir süre acıyı uyuşturan bir iksir yap." },
  "It's not a bomb. It's a lot of smoke and a very loud noise.":
    { en: "Throw a smoke-and-noise bomb to disorient.", tr: "Şaşırtmak için bir duman-ve-ses bombası at." },
  "Everyone takes one. Break it on the ground if things go wrong.":
    { en: "Hand out doses so allies can use your magic too.", tr: "Müttefikler de büyünü kullanabilsin diye dozlar dağıt." },
  // Bombardier
  "The trick is the shape of the container, not the contents.":
    { en: "An alchemist who throws area bombs. Pick this for explosions, acid, and breaking through walls.", tr: "Alan bombaları atan bir simyacı. Patlamalar, asit ve duvarları yıkmak için seç." },
  "Smoke. It only blinds the ones who weren't expecting it.":
    { en: "Blind unprepared enemies with smoke.", tr: "Hazırlıksız düşmanları dumanla kör et." },
  "Anything with a hinge, I can open.":
    { en: "Blast open any door or container.", tr: "Herhangi bir kapıyı ya da kutuyu patlatarak aç." },
  "The wall comes down. On a schedule I set.":
    { en: "Bring down a wall with a timed charge.", tr: "Zamanlanmış bir patlayıcıyla bir duvar yık." },
  // Elixirist
  "The body is a system, and systems accept input.":
    { en: "An alchemist of potions and poisons that change the body. Pick this for buffs, antidotes, and transformation.", tr: "Bedeni değiştiren iksir ve zehirlerin simyacısı. Güçlendirmeler, panzehirler ve dönüşüm için seç." },
  "Drink it. You'll be stronger than you should be, briefly.":
    { en: "Brew a potion that boosts a stat for a scene.", tr: "Bir sahne boyunca bir statı yükselten bir iksir yap." },
  "An antidote. I've only ever heard the poison described.":
    { en: "Make an antidote for a poison you've never seen.", tr: "Hiç görmediğin bir zehir için panzehir yap." },
  "Tonight I'm his height and his build.":
    { en: "Drink a potion to change your appearance.", tr: "Görünüşünü değiştirmek için bir iksir iç." },
  // Golemwright
  "You got tired of relying on people.":
    { en: "An alchemist with a mechanical construct that fights for them. Pick this if you want a durable machine ally.", tr: "Onun için dövüşen mekanik bir makinesi olan simyacı. Dayanıklı bir makine müttefik isteyenler seçsin." },
  "I send it in. There's no guilt involved.":
    { en: "Send your construct into danger you'd rather avoid.", tr: "Makineni, kaçınmak istediğin bir tehlikeye gönder." },
  "It held the door for three days while we were gone.":
    { en: "Leave your construct to guard a spot on its own.", tr: "Makineni bir yeri tek başına koruması için bırak." },
  "I fit it with an arm for taking hits meant for me.":
    { en: "Upgrade your construct to take hits for you.", tr: "Makineni, senin yerine darbe alacak şekilde geliştir." },
};

const src = readFileSync("data/classes.ts", "utf8");
let replaced = 0;
const hit = new Set();

// Replace `en: "OLD"(, tr: "...")?` with the new en+tr when OLD is in the map.
const out = src.replace(
  /en: "((?:[^"\\]|\\.)*)"(, tr: "(?:[^"\\]|\\.)*")?/g,
  (full, en) => {
    const v = M[en];
    if (!v) return full;
    hit.add(en);
    replaced++;
    return `en: "${v.en.replace(/"/g, '\\"')}", tr: "${v.tr.replace(/"/g, '\\"')}"`;
  },
);

writeFileSync("data/classes.ts", out);
console.log("replaced:", replaced, "of", Object.keys(M).length, "map entries");
const missing = Object.keys(M).filter((k) => !hit.has(k));
if (missing.length) console.log("NOT FOUND in file:", missing);
