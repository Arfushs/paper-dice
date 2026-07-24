import { readFileSync, writeFileSync } from "fs";

// English → Turkish for every string in data/classes.ts. Game terms kept
// consistent: Effect=Etki, Energy=Enerji, Zone=Bölge, Near=Yakın, Far=Uzak,
// Rule Breaker=Kural Kırıcı, Domain=Alan, Signature=İmza, Story God=Hikâye
// Tanrısı, Downed=Düşmüş, Prone=Yatık, Rest=Dinlenme.
const T = {
  "You are not the strongest person in the room. You are the one who has done this before.":
    "Odadaki en güçlü kişi sen değilsin. Sen bunu daha önce yapmış olansın.",
  "The dependable one. You have an answer to almost every fight and you never run out of it. Where the Barbarian breaks a problem and the Rogue avoids it, you take it apart on purpose. The easiest class to play well and the hardest to play badly — and the class whose subclasses change the most about how you actually play, from pure swordwork to inscribed magic to commanding a line.":
    "Güvenilir olan. Neredeyse her dövüşe bir cevabın var ve asla tükenmiyor. Barbar bir sorunu kırarken, Hırsız ondan kaçarken, sen onu bilerek parçalara ayırırsın. İyi oynaması en kolay, kötü oynaması en zor sınıf — ve alt sınıfları oynayış tarzını en çok değiştiren sınıf: saf kılıç ustalığından kazınmış büyüye, bir hattı komuta etmeye kadar.",
  "Steel, the body, and the shape of a battlefield.":
    "Çelik, beden ve bir savaş alanının şekli.",
  "Any weapon, medium armor, a shield, a soldier's pack.":
    "Herhangi bir silah, orta zırh, bir kalkan, bir asker çantası.",
  Maneuver: "Manevra",
  "Once per turn, when you hit, add something for free: shove them into the next zone, disarm them, knock them Prone, or pin them where they stand. No Energy. No roll.":
    "Turda bir kez, vurduğunda bedava bir şey ekle: onu sonraki bölgeye it, silahını düşür, Yatık düşür ya da olduğu yere sabitle. Enerji yok. Atış yok.",
  "I kick the table into his knees and step in after it.":
    "Masayı dizlerine tekmeliyorum ve arkasından giriyorum.",
  "I hook his shield away and put him on the floor.":
    "Kalkanını çengelleyip yere seriyorum.",
  "I hold this doorway. Nothing gets past me this round.":
    "Bu kapıyı tutuyorum. Bu tur benden hiçbir şey geçmez.",
  "I cut the rope — the chandelier comes down on the whole pack.":
    "Halatı kesiyorum — avize tüm sürünün üstüne iniyor.",
  "I throw the spear hard enough to pin him to the far wall.":
    "Mızrağı onu karşı duvara çivileyecek kadar sert fırlatıyorum.",
  "Weapon Master": "Silah Ustası",
  "Every weapon is one you have already used.":
    "Her silah daha önce kullandığın bir silahtır.",
  "Anything with an edge, a point, or a weight. Held, thrown, or picked up off the floor.":
    "Keskin, sivri ya da ağır olan her şey. Tutulmuş, fırlatılmış ya da yerden alınmış.",
  "Perfect Grip": "Kusursuz Kavrayış",
  "Your Maneuver fires on a miss as well as a hit.":
    "Manevran ıskalamada da tıpkı isabet gibi tetiklenir.",
  "I flip the dagger and put it through the lock.":
    "Hançeri çeviriyorum ve kilidin içinden geçiriyorum.",
  "I grab whatever's on the weapon rack and fight with both.":
    "Silah rafındaki neyse kapıyorum ve ikisiyle birden dövüşüyorum.",
  "The throw goes through his drawing hand, across the room.":
    "Fırlatış, silah çeken elini delip odanın öbür ucuna geçiyor.",
  Warden: "Muhafız",
  "The line holds because you are standing on it.":
    "Hat tutuyor çünkü üstünde sen duruyorsun.",
  "Shields, chokepoints, cover, and ground you refuse to give.":
    "Kalkanlar, dar geçitler, siper ve vermeyi reddettiğin topraklar.",
  Bulwark: "Sur",
  "Enemies cannot leave your zone unless they beat you in a STR or DEX contest.":
    "Düşmanlar, seni bir STR ya da DEX yarışmasında yenmedikçe bölgeni terk edemez.",
  "I brace the door with my own body. It holds.":
    "Kapıyı kendi bedenimle payandalıyorum. Dayanıyor.",
  "I drag her out of the blast and take it instead.":
    "Onu patlamadan çekip çıkarıyorum ve darbeyi ben alıyorum.",
  "Nobody comes down this corridor. Not this round, not the next.":
    "Bu koridordan kimse geçmez. Ne bu tur, ne sonraki.",
  Duelist: "Düellocu",
  "One on one, you have never lost.": "Teke tek, hiç kaybetmedin.",
  "Timing, footwork, feints, and the space between two blades.":
    "Zamanlama, ayak oyunu, feyntler ve iki kılıç arasındaki boşluk.",
  "First Blood": "İlk Kan",
  "When exactly one enemy is present, you act first in initiative. Always.":
    "Tam olarak bir düşman varsa, inisiyatifte önce sen oynarsın. Her zaman.",
  "I've watched him swing twice. I know what the third one is.":
    "Onun iki savurmasını izledim. Üçüncüsünün ne olduğunu biliyorum.",
  "I take the sword out of his hand mid-parry.":
    "Savuşturmanın ortasında kılıcı elinden alıyorum.",
  "I turn the duel into a conversation, and win that instead.":
    "Düelloyu bir sohbete çeviriyorum ve onun yerine onu kazanıyorum.",
  "Enchanter Knight": "Büyücü Şövalye",
  "You never learned to cast. You learned to make the steel do it.":
    "Büyü yapmayı hiç öğrenmedin. Çeliğe yaptırmayı öğrendin.",
  "Runes, wards, and the metal they are cut into — armour and blade as the spellbook.":
    "Rünler, korumalar ve kazındıkları metal — büyü kitabı olarak zırh ve kılıç.",
  Inscribed: "Kazınmış",
  "You may store one Effect in your weapon or armour. Pay its Energy at rest, when you cut the rune; release it later as a free action, on any turn you like. One stored Effect at a time.":
    "Silahına ya da zırhına bir Etki depolayabilirsin. Enerjisini dinlenirken, rünü kazırken öde; sonra bedava aksiyonla, istediğin turda serbest bırak. Aynı anda tek depolanmış Etki.",
  "The runes catch. The blade is burning now, and it stays burning.":
    "Rünler tutuşuyor. Kılıç artık yanıyor ve yanmaya devam ediyor.",
  "I inscribed this shield last night. Whatever hits it next, hits nothing.":
    "Bu kalkanı dün gece kazıdım. Bir sonraki neye çarparsa, hiçbir şeye çarpmış olur.",
  "The armour remembers a blow I took last week. It gives it back.":
    "Zırh geçen hafta aldığım bir darbeyi hatırlıyor. Geri veriyor.",
  Banneret: "Sancaktar",
  "You are not the best soldier here. You are the reason the rest of them hold.":
    "Buradaki en iyi asker sen değilsin. Diğerlerinin dayanma sebebi sensin.",
  "Command, formation, morale, and the will of people who have agreed to follow orders.":
    "Komuta, düzen, moral ve emirlere uymayı kabul etmiş insanların iradesi.",
  "On My Word": "Emrimle",
  "Once per round, an ally who can hear you may immediately take a Move or an Action out of turn. It costs you nothing.":
    "Turda bir kez, seni duyabilen bir müttefik sırası dışında hemen bir Hareket ya da Aksiyon alabilir. Sana hiçbir şeye mal olmaz.",
  "Second rank. Step up. Now.": "İkinci sıra. İleri. Şimdi.",
  "Nobody in this line breaks while my banner is up.":
    "Sancağım havadayken bu hatta kimse kırılmaz.",
  "Fifty militia who have never held a spear hold for one more round.":
    "Hayatında mızrak tutmamış elli milis bir tur daha dayanıyor.",
  "There is a point past which pain stops being information.":
    "Acının artık bilgi olmaktan çıktığı bir eşik vardır.",
  "A battery that discharges. You are enormous, you get bigger when you're angry, and you have very few answers that aren't violence. When the plan works you're a sledgehammer; when the plan fails you're the reason anyone survives.":
    "Boşalan bir batarya. Devasasın, kızdığında büyürsün ve şiddet olmayan pek az cevabın var. Plan işlediğinde bir balyozsun; plan başarısız olduğunda birilerinin hayatta kalma sebebisin.",
  "Raw force, fury, and endurance past reason.":
    "Ham kuvvet, öfke ve akıl sınırını aşan dayanıklılık.",
  "A heavy weapon, hide armor, and a trophy from something you killed.":
    "Ağır bir silah, post zırh ve öldürdüğün bir şeyden bir ganimet.",
  Rage: "Öfke",
  "Free action, 2 Energy. Until the scene ends or you go a full turn without attacking: halve all incoming physical damage, add +CON to your damage, and roll INT and CHA at disadvantage.":
    "Bedava aksiyon, 2 Enerji. Sahne bitene ya da tam bir tur saldırmadan geçene kadar: gelen tüm fiziksel hasarı yarıya indir, hasarına +CON ekle ve INT ile CHA'yı dezavantajlı at.",
  "I pick him up and throw him at the other one.":
    "Onu kaldırıp diğerinin üstüne fırlatıyorum.",
  "I put my shoulder through the door. Not the lock — the door.":
    "Omzumu kapının içinden geçiriyorum. Kilidin değil — kapının.",
  "I grab the front rank and drag all of them backwards with me.":
    "Ön safı kavrayıp hepsini kendimle birlikte geriye sürüklüyorum.",
  "I take the hit on purpose so she can get past.":
    "Geçebilsin diye darbeyi bilerek alıyorum.",
  "I catch the falling stone and hold the ceiling while they run.":
    "Düşen taşı yakalayıp onlar kaçarken tavanı tutuyorum.",
  Berserker: "Berserker",
  "The anger was already there. The fight is just permission.":
    "Öfke zaten oradaydı. Dövüş sadece bir izin.",
  "Bloodlust, terror, and momentum that does not stop.":
    "Kan susamışlığı, dehşet ve durmayan bir ivme.",
  "No Cost": "Bedelsiz",
  "Your first Rage each scene is free.": "Her sahnedeki ilk Öfken bedava.",
  "I scream. The room decides to be somewhere else.":
    "Bağırıyorum. Oda başka bir yerde olmaya karar veriyor.",
  "Three zones. Through everything in between.":
    "Üç bölge. Aradaki her şeyin içinden.",
  "I'm still standing. I shouldn't be. I am.":
    "Hâlâ ayaktayım. Olmamalıyım. Ayaktayım.",
  Totem: "Totem",
  "Something old walks with you, and it has opinions.":
    "Kadim bir şey seninle yürüyor ve fikirleri var.",
  "Beast spirits, the endurance of the wild, borrowed shapes and instincts.":
    "Hayvan ruhları, yabanın dayanıklılığı, ödünç alınmış şekiller ve içgüdüler.",
  "Borrowed Hide": "Ödünç Post",
  "Each Rage, pick one: bear (resist all damage, not just physical), wolf (allies have advantage on anything you attack), eagle (move two zones a turn).":
    "Her Öfkede birini seç: ayı (sadece fizikseli değil, tüm hasara direnç), kurt (müttefikler saldırdığın her şeye avantajlı), kartal (turda iki bölge hareket).",
  "I smell the lie on him.": "Üstündeki yalanı kokluyorum.",
  "I run the horse into the ground, then keep going on foot.":
    "Atı öldüresiye koşturuyorum, sonra yaya devam ediyorum.",
  "I sleep in the blizzard. It doesn't concern me.":
    "Tipide uyuyorum. Beni ilgilendirmiyor.",
  Giantblood: "Dev Kanı",
  "Your grandmother was very large and nobody discusses it.":
    "Büyükannen çok iriydi ve kimse bunu konuşmuyor.",
  "Size, reach, weight, and throwing things that should not be thrown.":
    "Boyut, erişim, ağırlık ve fırlatılmaması gereken şeyleri fırlatmak.",
  Oversized: "Aşırı Büyük",
  "You swing Heavy weapons one-handed, and you can throw them to Near.":
    "Ağır silahları tek elle savurursun ve onları Yakın'a fırlatabilirsin.",
  "I pick up the cart. That's the club now.":
    "Arabayı kaldırıyorum. Artık sopa o.",
  "He's a zone away. That's still in reach.":
    "Bir bölge uzakta. Yine de erişimimde.",
  "I catch the horse.": "Atı yakalıyorum.",
  Bloodrager: "Kan Öfkelisi",
  "The rage doesn't stay inside. It never did.":
    "Öfke içeride kalmıyor. Hiç kalmadı.",
  "Fury made physical — force, shockwaves, and the air getting out of the way.":
    "Fizikselleşmiş öfke — kuvvet, şok dalgaları ve yoldan çekilen hava.",
  "It Comes Out": "Dışarı Taşar",
  "While you are Raging, your Effects cost no Action. The rage is producing them, not you — you are just where they happen.":
    "Öfkedeyken Etkilerin Aksiyon harcamaz. Onları öfke üretiyor, sen değil — sen sadece gerçekleştikleri yersin.",
  "I hit the ground and the ground answers.":
    "Yere vuruyorum ve yer cevap veriyor.",
  "The shout arrives before I do.": "Haykırış benden önce varıyor.",
  "Everything in front of me goes backwards. All of it.":
    "Önümdeki her şey geriye gidiyor. Hepsi.",
  "You swore something. It is listening.":
    "Bir şeye yemin ettin. O dinliyor.",
  "A weapon with a conscience attached, and the conscience has teeth. You hit hard in bursts and you keep people standing. The oath is the real class feature: it gives the Story God a lever on you, and that is a feature — a Paladin with nothing to lose is just a Knight in nicer armor.":
    "Vicdan eklenmiş bir silah, ve vicdanın dişleri var. Patlamalar hâlinde sert vurur ve insanları ayakta tutarsın. Asıl sınıf özelliği yemin: Hikâye Tanrısı'na üzerinde bir koz veriyor, ve bu bir özellik — kaybedecek hiçbir şeyi olmayan bir Paladin sadece daha güzel zırhlı bir Şövalyedir.",
  "Your oath, and the light or weight it carries.":
    "Yeminin ve taşıdığı ışık ya da ağırlık.",
  "A warhammer or another martial weapon, heavy armor, a shield, a holy symbol you did not choose for yourself.":
    "Bir savaş çekici ya da başka bir savaş silahı, ağır zırh, bir kalkan, kendin seçmediğin bir kutsal sembol.",
  Smite: "Kutsal Darbe",
  "When you hit, spend any amount of Energy: +1d8 oath damage per Energy, up to your cap.":
    "Vurduğunda istediğin kadar Enerji harca: Enerji başına +1d8 yemin hasarı, tavanına kadar.",
  "The Oath": "Yemin",
  "Write three tenets at level 1. Break one knowingly and you lose your Signature and your Rule Breaker until you atone. The Story God decides what atonement costs, and it should cost.":
    "1. seviyede üç ilke yaz. Birini bilerek çiğnersen, kefaret ödeyene kadar İmzanı ve Kural Kırıcını kaybedersin. Kefaretin bedelini Hikâye Tanrısı belirler, ve bir bedeli olmalı.",
  "I pour light into her wounds until she opens her eyes.":
    "Gözlerini açana kadar yaralarına ışık döküyorum.",
  "I say his name and he cannot look away from me.":
    "Adını söylüyorum ve gözünü benden alamıyor.",
  "Nothing unholy crosses this threshold while I stand in it.":
    "Ben bu eşikte dururken kutsal olmayan hiçbir şey geçemez.",
  "My oath burns through the whole line of them.":
    "Yeminim hepsinin hattını baştan sona yakıyor.",
  "The lie is spoken aloud, and everyone in this hall hears it as a lie.":
    "Yalan yüksek sesle söyleniyor ve bu salondaki herkes onu yalan olarak duyuyor.",
  "Oath of Light": "Işık Yemini",
  "You are not the light. You are what it is pointed through.":
    "Işık sen değilsin. Işığın içinden geçirildiği şeysin.",
  "Radiance, healing, warding, and revealing what hides.":
    "Parıltı, iyileştirme, koruma ve gizleneni açığa çıkarma.",
  Unshakable: "Sarsılmaz",
  "You and every ally in your zone are immune to Frightened.":
    "Sen ve bölgendeki her müttefik Korkmuş durumuna karşı bağışıksınız.",
  "Daylight. In here. Now.": "Gün ışığı. Burada. Şimdi.",
  "The curse comes off her. It has to go somewhere else.":
    "Lanet ondan çıkıyor. Başka bir yere gitmek zorunda.",
  "I can't see it. It can't hide from this.":
    "Onu göremiyorum. O da bundan saklanamıyor.",
  "Oath of Vengeance": "İntikam Yemini",
  "Someone did something, and you have not finished about it.":
    "Biri bir şey yaptı ve sen o konuyu henüz bitirmedin.",
  "Pursuit, retribution, and one marked enemy.":
    "Takip, kısas ve tek bir işaretli düşman.",
  "The Mark": "İşaret",
  "Name one enemy per scene. Any attack roll of 10 or higher hits it, whatever its Defense.":
    "Sahne başına bir düşman belirle. 10 ve üzeri her saldırı atışı, Savunması ne olursa olsun ona isabet eder.",
  "I know which direction he's in. I always do.":
    "Hangi yönde olduğunu biliyorum. Hep bilirim.",
  "He's faster than me. He isn't going to stay ahead.":
    "Benden hızlı. Ama önde kalamayacak.",
  "The armor doesn't matter. I'm not looking for a gap.":
    "Zırhın önemi yok. Boşluk aramıyorum.",
  "Oath of Atonement": "Kefaret Yemini",
  "You did something. This is how you carry it.":
    "Bir şey yaptın. Bunu böyle taşıyorsun.",
  "Penance, endurance, and suffering taken on behalf of others.":
    "Tövbe, dayanıklılık ve başkaları adına çekilen ıstırap.",
  "Take the Blow": "Darbeyi Al",
  "You may accept any damage aimed at an ally in your zone. It is halved.":
    "Bölgendeki bir müttefike yönelen herhangi bir hasarı kabul edebilirsin. Yarıya iner.",
  "I draw the poison out of her and into me.":
    "Zehri ondan çekip kendime alıyorum.",
  "I stand in the fire so she doesn't have to.":
    "O durmak zorunda kalmasın diye ateşin içinde duruyorum.",
  "Whatever he did — I'll carry it. Let him go.":
    "Ne yaptıysa — ben taşırım. Bırak gitsin.",
  "Oath of the Silent": "Sessizlik Yemini",
  "No banner, no shining armour, no announcement. Judgement all the same.":
    "Sancak yok, parlak zırh yok, duyuru yok. Yine de yargı var.",
  "Investigation, judgement, oaths sworn where nobody heard, and the guilty.":
    "Soruşturma, yargı, kimsenin duymadığı yerde edilen yeminler ve suçlular.",
  "The Confession": "İtiraf",
  "Ask one creature one question about something it has done. It cannot lie to you. It may refuse to answer — and you will know that it refused.":
    "Bir yaratığa yaptığı bir şey hakkında tek bir soru sor. Sana yalan söyleyemez. Cevap vermeyi reddedebilir — ve reddettiğini bilirsin.",
  "Three days in this town. I know which one of them it is.":
    "Bu kasabada üç gün. Hangisi olduğunu biliyorum.",
  "He knows what he did. Now everyone in the room does too.":
    "Ne yaptığını biliyor. Artık odadaki herkes de biliyor.",
  "My oath was sworn to nobody at all. It still holds.":
    "Yeminimi hiç kimseye etmedim. Yine de geçerli.",
  "Everyone else brought a weapon. You didn't need to.":
    "Herkes bir silah getirdi. Senin gerek yoktu.",
  "Fast, slippery, precise. You go wherever you want on the battlefield and hit several times when you get there. Fragile if you stand still, so don't. The most mobile class in the game by a wide margin.":
    "Hızlı, kaygan, hassas. Savaş alanında istediğin yere gidersin ve vardığında birkaç kez vurursun. Durursan kırılgansın, o yüzden durma. Oyundaki farkla en hareketli sınıf.",
  "The body as a weapon: breath, momentum, and stillness.":
    "Silah olarak beden: nefes, ivme ve durgunluk.",
  "Simple robes, a staff or a pair of light weapons, a bowl.":
    "Sade cübbeler, bir asa ya da bir çift hafif silah, bir kâse.",
  Flow: "Akış",
  "Your unarmed die is d6 (d8 at level 5, d10 at level 9), and the Attack action gives you one extra unarmed attack for free. While unarmored, your Defense is 10 + DEX + WIS.":
    "Silahsız zarın d6 (5. seviyede d8, 9. seviyede d10), ve Saldırı aksiyonu sana bedava bir ekstra silahsız saldırı verir. Zırhsızken Savunman 10 + DEX + WIS.",
  "I run up the wall and come down behind him.":
    "Duvara koşup arkasından iniyorum.",
  "I catch the arrow.": "Oku yakalıyorum.",
  "I strike a nerve. His arm stops working.":
    "Bir sinire vuruyorum. Kolu çalışmayı bırakıyor.",
  "I move through the whole line, hitting each of them once.":
    "Tüm hattın içinden geçiyorum, her birine birer kez vuruyorum.",
  "I stand perfectly still and nothing they do lands.":
    "Mükemmel bir şekilde kımıldamadan duruyorum ve yaptıkları hiçbir şey isabet etmiyor.",
  "Open Hand": "Açık El",
  "Bodies are machines and you have read the manual.":
    "Bedenler makinedir ve sen kılavuzu okudun.",
  "Pressure points, joints, throws, and shutting a body down.":
    "Baskı noktaları, eklemler, fırlatmalar ve bir bedeni durdurmak.",
  "Read the Body": "Bedeni Oku",
  "After you hit a creature, you know its current HP and one weakness.":
    "Bir yaratığa vurduktan sonra o anki Canını ve bir zayıflığını bilirsin.",
  "The one on the left is hurt. I can see it in how he stands.":
    "Soldaki yaralı. Duruşundan anlıyorum.",
  "He's twice my size. He goes over my hip anyway.":
    "Benim iki katım. Yine de kalçamın üstünden aşıyor.",
  "I strike under the ribs. His heart skips three beats.":
    "Kaburgaların altına vuruyorum. Kalbi üç atış atlıyor.",
  Shadow: "Gölge",
  "Stillness, then absence.": "Önce durgunluk, sonra yokluk.",
  "Darkness, silence, and being somewhere you were not.":
    "Karanlık, sessizlik ve olmadığın bir yerde olmak.",
  "Step Through Dark": "Karanlıktan Geç",
  "1 Energy: step from any shadow to any other within Far.":
    "1 Enerji: herhangi bir gölgeden Uzak menzilindeki başka bir gölgeye adım at.",
  "Every light in this room goes out at once.":
    "Bu odadaki her ışık bir anda sönüyor.",
  "The blow comes from a direction that has nobody in it.":
    "Darbe, içinde kimse olmayan bir yönden geliyor.",
  "I walk past the watchman. In the open. He doesn't register it.":
    "Nöbetçinin yanından geçiyorum. Açıkta. Fark etmiyor.",
  "Four Elements": "Dört Element",
  "The body is one of the four. It happens to be the one you're in.":
    "Beden dörtten biridir. Tesadüfen içinde olduğun.",
  "Fire, water, air, and stone, channelled through the body.":
    "Ateş, su, hava ve taş, bedenden kanalize edilmiş.",
  "Elemental Fist": "Element Yumruğu",
  "Your unarmed attacks deal any elemental damage type you like and reach Near.":
    "Silahsız saldırıların istediğin element hasar türünü verir ve Yakın'a erişir.",
  "The punch arrives as wind, from across the room.":
    "Yumruk odanın öbür ucundan rüzgâr olarak varıyor.",
  "Six steps across the water. That's all I need.":
    "Suyun üstünde altı adım. İhtiyacım olan tek şey bu.",
  "Stone comes up out of the floor between us.":
    "Aramızda yerden taş yükseliyor.",
  Mender: "Onaran",
  "The same knowledge that stops a heart can start one.":
    "Bir kalbi durduran bilgi, bir kalbi çalıştırabilir de.",
  "Breath, circulation, nerves, poison, and putting a body back the way it was.":
    "Nefes, dolaşım, sinirler, zehir ve bir bedeni eski hâline döndürmek.",
  "Hands On": "Eller Üzerinde",
  "Your healing Effects cost no Action and need no roll — but you must be Engaged and touching them. You cannot heal at range at all.":
    "İyileştirme Etkilerin Aksiyon harcamaz ve atış gerektirmez — ama Temas hâlinde ve onlara dokunuyor olmalısın. Menzilden hiç iyileştiremezsin.",
  "Breathe. There. That's the poison out.":
    "Nefes al. İşte. Zehir çıktı.",
  "I set the bone and she's back up this round.":
    "Kemiği yerine koyuyorum ve bu tur ayağa kalkıyor.",
  "Everyone I can reach. All at once. Then I'm finished.":
    "Ulaşabildiğim herkes. Hepsi bir anda. Sonra bittim.",
  "There is a way in. There is always a way in.":
    "İçeri girmenin bir yolu var. Her zaman bir yolu vardır.",
  "The highest single hit in the game if you set it up, and almost nothing if you don't. Outside combat you're the one who solves the problem before it becomes a fight. Rewards positioning and patience.":
    "Kurarsan oyundaki en yüksek tek vuruş, kurmazsan neredeyse hiçbir şey. Savaş dışında sorunu dövüşe dönüşmeden çözen kişisin. Konumlanmayı ve sabrı ödüllendirir.",
  "Angles, timing, locks, lies, and the soft parts.":
    "Açılar, zamanlama, kilitler, yalanlar ve yumuşak yerler.",
  "Two light weapons, light armor, thieves' tools, and something you have not yet returned.":
    "İki hafif silah, hafif zırh, hırsız aletleri ve henüz geri vermediğin bir şey.",
  "Sneak Attack": "Sinsi Saldırı",
  "Once per turn, when you hit with advantage, or when the target is Engaged with one of your allies: add 2d6. Rises to 4d6 at level 5 and 6d6 at level 9.":
    "Turda bir kez, avantajlıyken vurduğunda ya da hedef müttefiklerinden biriyle Temas hâlindeyken: +2d6 ekle. 5. seviyede 4d6'ya, 9. seviyede 6d6'ya çıkar.",
  "I'm not where he swung. I'm behind him.":
    "Savurduğu yerde değilim. Arkasındayım.",
  "That's his purse, this is his key, and he's noticed neither.":
    "O onun kesesi, bu onun anahtarı ve ikisini de fark etmedi.",
  "I put out the torches and let the dark do the rest.":
    "Meşaleleri söndürüp gerisini karanlığa bırakıyorum.",
  "The wine was poisoned four hours ago. This is just when it starts.":
    "Şarap dört saat önce zehirlendi. Bu sadece etkisinin başladığı an.",
  "I was never in this building. Check the records — I never was.":
    "Bu binada hiç bulunmadım. Kayıtlara bak — hiç bulunmadım.",
  Assassin: "Suikastçı",
  "The fight is a formality. The work happened earlier.":
    "Dövüş bir formalite. İş daha önce halloldu.",
  "Ambush, poison, disguise, and the killing stroke.":
    "Pusu, zehir, kılık değiştirme ve öldürücü darbe.",
  "Killer's Opening": "Katilin Açılışı",
  "Your first attack against a creature that has not yet acted in combat is automatically a critical hit. Once per scene.":
    "Savaşta henüz oynamamış bir yaratığa ilk saldırın otomatik olarak kritik isabettir. Sahne başına bir kez.",
  "I've watched him for an hour. Now I'm him.":
    "Onu bir saat izledim. Artık ben oyum.",
  "The poison starts working at midnight. I chose midnight.":
    "Zehir gece yarısı etki etmeye başlar. Gece yarısını ben seçtim.",
  "He'll be standing there in four minutes. I know because I know him.":
    "Dört dakika içinde orada duruyor olacak. Biliyorum çünkü onu tanıyorum.",
  Infiltrator: "Sızıcı",
  "Doors are a suggestion and you have not agreed to it.":
    "Kapılar bir öneridir ve sen buna razı olmadın.",
  "Locks, wards, guards, walls, and everything meant to keep you out.":
    "Kilitler, korumalar, nöbetçiler, duvarlar ve seni dışarıda tutmak için olan her şey.",
  "No Such Door": "Öyle Bir Kapı Yok",
  "Ten uninterrupted minutes and you are inside. No roll.":
    "On kesintisiz dakika ve içeridesin. Atış yok.",
  "No footprints, no scent, no one was here.":
    "Ayak izi yok, koku yok, kimse buradaydı değil.",
  "We leave the way we came, at walking pace.":
    "Geldiğimiz gibi, yürüyüş temposuyla ayrılıyoruz.",
  "The ward stays running. I just stop matching its definition.":
    "Koruma çalışmaya devam ediyor. Ben sadece tanımına uymayı bırakıyorum.",
  Trickster: "Düzenbaz",
  "The truth is whatever survives the next five minutes.":
    "Gerçek, sonraki beş dakikadan sağ çıkan şeydir.",
  "Misdirection, confidence games, and borrowed identities.":
    "Yanıltma, güven oyunları ve ödünç alınmış kimlikler.",
  "It Was Always Yours": "Hep Senindi",
  "Once per scene, declare that you lifted something plausible from someone you have been near. It's true.":
    "Sahne başına bir kez, yakınında bulunduğun birinden makul bir şey aşırdığını ilan et. Doğrudur.",
  "I heard him speak once. That's enough.":
    "Onu bir kez konuşurken duydum. Bu yeterli.",
  "The writ is genuine. It'll survive exactly one reading.":
    "Belge gerçek. Tam olarak bir okumaya dayanır.",
  "By morning each of them is certain the other sold them out.":
    "Sabaha kadar her biri diğerinin kendini sattığına emin oluyor.",
  "You saw it three hours before it saw you.":
    "Onu, o seni görmeden üç saat önce gördün.",
  "Control and consistency. You pick the target and suddenly it's everyone's target. Away from the fight you keep the party alive, fed, and un-lost — the class that makes travel and wilderness actually play instead of being narrated past.":
    "Kontrol ve tutarlılık. Hedefi sen seçersin ve birden herkesin hedefi olur. Dövüş dışında grubu hayatta, tok ve kaybolmamış tutarsın — yolculuğu ve yabanı geçilip anlatılmak yerine gerçekten oynatan sınıf.",
  "Wilds, tracks, prey, and the distance between you and it.":
    "Yaban, izler, av ve seninle onun arasındaki mesafe.",
  "A bow or crossbow, a melee weapon, light armor, a traveller's kit, a map you drew yourself.":
    "Bir yay ya da arbalet, bir yakın dövüş silahı, hafif zırh, bir yolcu çantası, kendi çizdiğin bir harita.",
  Mark: "İşaretle",
  "Free action, 1 Energy. Mark one creature you can see. You deal +1d6 to it, and every ally has advantage tracking it. Lasts the scene. When it dies, Mark the next one free.":
    "Bedava aksiyon, 1 Enerji. Gördüğün bir yaratığı işaretle. Ona +1d6 verirsin ve her müttefik onu izlemede avantajlı olur. Sahne boyunca sürer. Öldüğünde, bir sonrakini bedava İşaretle.",
  "Four of them. One is limping. They came through last night.":
    "Dördü. Biri topallıyor. Dün gece buradan geçmişler.",
  "I shoot the rope holding the gate.":
    "Kapıyı tutan halatı vuruyorum.",
  "One arrow, everyone in that doorway.":
    "Tek ok, o kapıdaki herkes.",
  "We take this pass. I know a way that doesn't involve the pass.":
    "Bu geçidi kullanıyoruz. Geçidi içermeyen bir yol biliyorum.",
  "I've been setting up this clearing since dawn. Roll initiative.":
    "Bu açıklığı şafaktan beri hazırlıyorum. İnisiyatif at.",
  Sharpshooter: "Keskin Nişancı",
  "The shot exists. You just have to wait for it.":
    "Atış mevcut. Sadece onu beklemen gerekiyor.",
  "Distance, wind, patience, and the perfect angle.":
    "Mesafe, rüzgâr, sabır ve mükemmel açı.",
  "No Cover": "Siper Yok",
  "Cover and concealment never penalise your ranged attacks.":
    "Siper ve gizlenme, menzilli saldırılarını asla cezalandırmaz.",
  "The chain has one weak link. That one.":
    "Zincirin tek bir zayıf halkası var. O.",
  "It's further than anyone thinks is possible. I take it anyway.":
    "Herkesin mümkün sandığından daha uzak. Yine de atışı yapıyorum.",
  "Through the keyhole. Yes, really.":
    "Anahtar deliğinden. Evet, gerçekten.",
  "Beast Bond": "Canavar Bağı",
  "There are two of you and only one draws a sheet.":
    "İkinizsiniz ve sadece biriniz bir karakter kâğıdı doldurur.",
  "One animal, and the bond between you.":
    "Bir hayvan ve aranızdaki bağ.",
  "Two Bodies": "İki Beden",
  "Your companion acts on your initiative and takes its own Action free. Level × 5 HP, attacks at your bonus for d6.":
    "Yoldaşın senin inisiyatifinde oynar ve kendi Aksiyonunu bedava alır. Seviye × 5 Can, senin bonusunla d6 saldırır.",
  "I send her in. I can't fit. She can.":
    "Onu içeri gönderiyorum. Ben sığmıyorum. O sığıyor.",
  "We flank him. Neither of us needed to say anything.":
    "Onu kuşatıyoruz. İkimizin de bir şey söylemesi gerekmedi.",
  "I see what she sees. She's a mile out.":
    "Onun gördüğünü görüyorum. Bir mil uzakta.",
  Trailblazer: "İz Açan",
  "You have already been here, and you left things.":
    "Buraya zaten geldin ve bazı şeyler bıraktın.",
  "Terrain, traps, ambush ground, and survival.":
    "Arazi, tuzaklar, pusu zemini ve hayatta kalma.",
  "Prepared Ground": "Hazırlanmış Zemin",
  "Ten minutes in a place and you have set traps. Declare what they do when combat starts.":
    "Bir yerde on dakika ve tuzakları kurmuşsundur. Savaş başladığında ne yaptıklarını ilan et.",
  "There's a storm in two days. Plan around it.":
    "İki gün içinde fırtına var. Ona göre plan yap.",
  "The snare takes something twice my weight.":
    "Tuzak, benim iki katım ağırlığında bir şeyi yakalar.",
  "The bog is passable. For exactly four of us.":
    "Bataklık geçilebilir. Tam olarak dördümüz için.",
  "Nobody in the room has noticed yet that you are the one deciding what happens.":
    "Odada henüz kimse ne olacağına karar verenin sen olduğunu fark etmedi.",
  "The amplifier. You rarely have the biggest number, but you hand out the die that turns someone else's failure into a success, and you talk the party out of half the fights they'd otherwise lose. The most social class, and unusually good at making everyone else feel powerful.":
    "Yükseltici. Nadiren en büyük sayı sende olur, ama başkasının başarısızlığını başarıya çeviren zarı verirsin ve grubu, aksi hâlde kaybedecekleri dövüşlerin yarısından konuşarak çıkarırsın. En sosyal sınıf ve herkese kendini güçlü hissettirmekte alışılmadık derecede iyi.",
  "Story, song, and what people believe about themselves.":
    "Hikâye, şarkı ve insanların kendileri hakkında inandıkları.",
  "An instrument, light armor, a light weapon, and a debt someone owes you.":
    "Bir çalgı, hafif zırh, bir hafif silah ve birinin sana olan borcu.",
  Inspiration: "İlham",
  "Free action, 1 Energy. Hand an ally a d6. They may add it to any roll before the scene ends. d8 at level 5, d10 at level 9. One per ally at a time.":
    "Bedava aksiyon, 1 Enerji. Bir müttefike bir d6 ver. Sahne bitmeden herhangi bir atışa ekleyebilirler. 5. seviyede d8, 9. seviyede d10. Aynı anda müttefik başına bir tane.",
  "I tell him the story of his own father and watch him decide not to swing.":
    "Ona kendi babasının hikâyesini anlatıyorum ve savurmamaya karar verişini izliyorum.",
  "There's a second set of footsteps in this room. Everyone hears them.":
    "Bu odada ikinci bir ayak sesi var. Herkes duyuyor.",
  "The whole tavern is singing, and nobody is watching the back door.":
    "Bütün taverna şarkı söylüyor ve kimse arka kapıyı izlemiyor.",
  "I sing the fear out of them. All of them.":
    "Korkuyu şarkıyla içlerinden söküyorum. Hepsinin.",
  "By tomorrow this town remembers a very different version of tonight.":
    "Yarına kadar bu kasaba bu gecenin çok farklı bir versiyonunu hatırlıyor.",
  Wordsmith: "Söz Ustası",
  "You have never needed to raise your voice.":
    "Sesini yükseltmeye hiç ihtiyacın olmadı.",
  "Persuasion, courts, rumour, negotiation, reputation.":
    "İkna, saraylar, söylenti, müzakere, itibar.",
  "Word Ahead": "Önden Söz",
  "When you arrive somewhere new, you decide what they have already heard about you.":
    "Yeni bir yere vardığında, hakkında önceden ne duyduklarına sen karar verirsin.",
  "Give me a minute in the room. I'll know what they want.":
    "Bana odada bir dakika ver. Ne istediklerini öğreneceğim.",
  "This is an execution. I'm making it a trial.":
    "Bu bir infaz. Onu bir duruşmaya çeviriyorum.",
  "The story reaches the next town before we do.":
    "Hikâye bir sonraki kasabaya bizden önce ulaşıyor.",
  Warsinger: "Savaş Ozanı",
  "War has a rhythm and you are keeping it.":
    "Savaşın bir ritmi var ve onu sen tutuyorsun.",
  "Rhythm, courage, coordination, and organised violence.":
    "Ritim, cesaret, koordinasyon ve örgütlü şiddet.",
  "Marching Song": "Yürüyüş Şarkısı",
  "Spending your Inspiration also grants that ally a free Move.":
    "İlhamını harcamak o müttefike bedava bir Hareket de kazandırır.",
  "One horn call. My party knows exactly what it means.":
    "Tek bir boru sesi. Grubum tam olarak ne anlama geldiğini biliyor.",
  "Six frightened farmers. They hold one more round.":
    "Altı korkmuş çiftçi. Bir tur daha dayanıyorlar.",
  "Everyone strikes on the beat. Now.":
    "Herkes vuruşta vuruyor. Şimdi.",
  Taleweaver: "Masal Dokuyucu",
  "The difference between a lie and a story is how well it's told.":
    "Bir yalanla bir hikâye arasındaki fark, ne kadar iyi anlatıldığıdır.",
  "Illusion, glamour, false memory, and things that seem.":
    "İllüzyon, göz boyama, sahte hafıza ve gibi görünen şeyler.",
  "It Looked Real": "Gerçek Gibiydi",
  "1 Energy: an illusion fills a zone and engages every sense. It fails only when something touches it.":
    "1 Enerji: bir illüzyon bir bölgeyi doldurur ve her duyuyu meşgul eder. Yalnızca bir şey ona dokunduğunda bozulur.",
  "There's an army on that ridge. There isn't.":
    "Şu sırtta bir ordu var. Yok.",
  "For tonight, I'm someone else entirely.":
    "Bu gecelik, tamamen başka biriyim.",
  "This room remembers a conversation that never happened.":
    "Bu oda hiç yaşanmamış bir konuşmayı hatırlıyor.",
  "It took eleven years. You have notes.":
    "On bir yıl sürdü. Notların var.",
  "Preparation rewarded. Choose well at the start of the day and you're the most efficient caster at the table; get caught outside your preparation and you're a person in a robe. The most versatile class across a whole session, and the most punishing of laziness.":
    "Hazırlığın ödülü. Günün başında iyi seç ve masadaki en verimli büyücü ol; hazırlığının dışında yakalan ve cübbeli bir insan ol. Bütün bir oturum boyunca en çok yönlü sınıf ve tembelliği en çok cezalandıran.",
  "Studied magic. Anything you have written down.":
    "Çalışılmış büyü. Yazıya döktüğün her şey.",
  "A grimoire, robes, a focus, ink and vellum, and one experiment that went badly.":
    "Bir büyü kitabı, cübbeler, bir odak, mürekkep ve parşömen ve kötü giden bir deney.",
  Grimoire: "Büyü Kitabı",
  "On each Long Rest, prepare three Focuses — narrow themes from your Domain (fire · doors · memory · weight · water). Effects inside a prepared Focus cost −1 Energy.":
    "Her Uzun Dinlenmede üç Odak hazırla — Alanından dar temalar (ateş · kapılar · hafıza · ağırlık · su). Hazırlanmış bir Odağın içindeki Etkiler −1 Enerji.",
  Ritual: "Ayin",
  "You may cast any Effect as a Ritual: ten minutes, no Energy at all — but never during combat.":
    "Herhangi bir Etkiyi Ayin olarak yapabilirsin: on dakika, hiç Enerji yok — ama asla savaş sırasında değil.",
  "A spark, a gust, the page turns itself.":
    "Bir kıvılcım, bir esinti, sayfa kendi kendine dönüyor.",
  "The lock remembers being open.":
    "Kilit açık olmayı hatırlıyor.",
  "Fire. In the doorway. All of them.":
    "Ateş. Kapı ağzında. Hepsi.",
  "I unmake the bridge behind us.":
    "Arkamızdaki köprüyü yok ediyorum.",
  "That spell is not going to happen.":
    "O büyü gerçekleşmeyecek.",
  "Give me ten minutes and this circle will hold anything.":
    "Bana on dakika ver, bu çember her şeyi tutar.",
  Illusionist: "İllüzyonist",
  "Reality is a consensus and you hold a minority opinion.":
    "Gerçeklik bir uzlaşıdır ve sen azınlık görüşündesin.",
  "Light, sound, seeming, and belief.":
    "Işık, ses, görünüş ve inanç.",
  Doubt: "Şüphe",
  "Anyone trying to disbelieve your illusions rolls at disadvantage.":
    "İllüzyonlarına inanmamaya çalışan herkes dezavantajlı atar.",
  "There's a wall here. There isn't. But there is.":
    "Burada bir duvar var. Yok. Ama var.",
  "I'm not visible until I do something about it.":
    "Bir şey yapana kadar görünmez değilim.",
  "He believes he is burning. So he burns.":
    "Yandığına inanıyor. Bu yüzden yanıyor.",
  Wardmaster: "Koruma Ustası",
  "Magic is mostly a question of what you don't let in.":
    "Büyü çoğunlukla neyi içeri almadığın meselesidir.",
  "Barriers, binding, banishment, and protection.":
    "Bariyerler, bağlama, sürgün ve koruma.",
  "Standing Ward": "Sürekli Koruma",
  "A ward is always up. The first Level × 4 damage you take each scene is absorbed.":
    "Bir koruma her zaman aktiftir. Her sahnede aldığın ilk Seviye × 4 hasar emilir.",
  "Nothing crosses this circle.":
    "Bu çemberi hiçbir şey geçemez.",
  "Whatever bound this — I'm unbinding it.":
    "Bunu ne bağladıysa — çözüyorum.",
  "Back where you came from.":
    "Geldiğin yere geri.",
  Diviner: "Kâhin",
  "You have read ahead.": "İlerisini okudun.",
  "Knowledge, scrying, portents, and the shape of what is coming.":
    "Bilgi, uzağı görme, alâmetler ve gelmekte olanın şekli.",
  Foreseen: "Öngörülmüş",
  "At the start of each session, roll a d20 and write it down. Once, you may replace any roll at the table — yours, an ally's, or the Story God's — with that number.":
    "Her oturumun başında bir d20 at ve yaz. Bir kez, masadaki herhangi bir atışı — kendininki, bir müttefikinki ya da Hikâye Tanrısı'nınki — o sayıyla değiştirebilirsin.",
  "Move. Three seconds before it mattered.":
    "Kımılda. Önem kazanmasından üç saniye önce.",
  "I'm watching a room I'm not in.":
    "İçinde olmadığım bir odayı izliyorum.",
  "I know his true name. I've known it since Tuesday.":
    "Gerçek adını biliyorum. Salıdan beri biliyorum.",
  Transmuter: "Dönüştürücü",
  "Nothing is what it is. It is only what it currently is.":
    "Hiçbir şey olduğu şey değildir. Yalnızca şu an olduğu şeydir.",
  "Matter, form, weight, state, and change.":
    "Madde, biçim, ağırlık, hâl ve değişim.",
  "Nothing Is Fixed": "Hiçbir Şey Sabit Değil",
  "Once per scene, permanently change one property of an object you can touch. Free.":
    "Sahne başına bir kez, dokunabildiğin bir nesnenin bir özelliğini kalıcı olarak değiştir. Bedava.",
  "The floor under him is water now.":
    "Altındaki zemin artık su.",
  "That door is paper. It was oak a moment ago.":
    "O kapı kâğıt. Az önce meşeydi.",
  "The falling stone weighs twice what it did.":
    "Düşen taş eskisinin iki katı ağırlığında.",
  "You did not learn this. It was already in you and it has been waiting.":
    "Bunu öğrenmedin. Zaten içindeydi ve bekliyordu.",
  "Raw and flexible. Your Bend lets you reshape any Effect on the fly, so you improvise better than anyone. No book to lose, no patron to answer to — just a bloodline that occasionally has ideas of its own. The most elemental class, and the one where the subclass matters most.":
    "Ham ve esnek. Bükme'n herhangi bir Etkiyi anında yeniden şekillendirmene izin verir, bu yüzden herkesten daha iyi doğaçlama yaparsın. Kaybedecek kitap yok, hesap verecek patron yok — sadece ara sıra kendi fikirleri olan bir soy. En elementsel sınıf ve alt sınıfın en çok önem taşıdığı sınıf.",
  "Magic that lives in your blood. It never needed a book.":
    "Kanında yaşayan büyü. Hiç kitaba ihtiyaç duymadı.",
  "Whatever you were wearing when it first happened, and the mark it left.":
    "İlk olduğunda üstünde ne varsa ve bıraktığı iz.",
  Bend: "Bükme",
  "When you produce an Effect, spend 1 extra Energy to apply one of these: Twin (a second target) · Reach (one zone further) · Silent (no words, no gestures) · Quick (costs no Action) · Brutal (maximise one damage die).":
    "Bir Etki ürettiğinde, şunlardan birini uygulamak için 1 ekstra Enerji harca: İkiz (ikinci bir hedef) · Erişim (bir bölge daha) · Sessiz (söz yok, jest yok) · Hızlı (Aksiyon harcamaz) · Vahşi (bir hasar zarını maksimuma çıkar).",
  "Wild Surge": "Vahşi Taşkın",
  "You may cast without paying. Roll d20: on 10+ it's free. On 9 or less you pay double and the Story God adds a complication.":
    "Ödemeden büyü yapabilirsin. d20 at: 10+ ise bedava. 9 ve altında iki katını ödersin ve Hikâye Tanrısı bir komplikasyon ekler.",
  "Sparks off my hand. Just enough to be a problem.":
    "Elimden kıvılcımlar. Sorun olacak kadar.",
  "He's on fire and he doesn't know why yet.":
    "Yanıyor ve henüz nedenini bilmiyor.",
  "Both of them. Same instant.":
    "İkisi de. Aynı an.",
  "I don't say anything, I don't move, and it happens anyway.":
    "Bir şey söylemiyorum, kımıldamıyorum ve yine de oluyor.",
  "The whole corridor. From here.":
    "Bütün koridor. Buradan.",
  Pyromancer: "Ateş Büyücüsü",
  "Fire has never once hurt you and you stopped mentioning it.":
    "Ateş sana bir kez bile zarar vermedi ve bundan bahsetmeyi bıraktın.",
  "Fire, heat, ash, and light.":
    "Ateş, ısı, kül ve ışık.",
  Unburnt: "Yanmayan",
  "Fire never harms you, and yours never harms your allies unless you want it to.":
    "Ateş sana asla zarar vermez ve seninki, sen istemedikçe müttefiklerine asla zarar vermez.",
  "I walk through the burning house at a normal pace.":
    "Yanan evin içinden normal bir tempoyla yürüyorum.",
  "The heat gets there before the flame does.":
    "Isı, aleve varmadan önce oraya varıyor.",
  "Fire that doesn't consume what it burns.":
    "Yaktığını tüketmeyen ateş.",
  Cryomancer: "Buz Büyücüsü",
  "You are cold to the touch and it is not a metaphor.":
    "Dokunuşta soğuksun ve bu bir mecaz değil.",
  "Ice, cold, stillness, and slowing.":
    "Buz, soğuk, durgunluk ve yavaşlatma.",
  Chill: "Ürperti",
  "Any creature damaged by your cold is Slowed until the end of its next turn. No save.":
    "Soğuğundan hasar alan her yaratık, bir sonraki turunun sonuna kadar Yavaşlatılmış olur. Kurtarış yok.",
  "I freeze the wound shut.":
    "Yarayı dondurarak kapatıyorum.",
  "A bridge. Across running water. Give me a second.":
    "Bir köprü. Akan suyun üstünden. Bana bir saniye ver.",
  "Nobody in this room moves quickly. Including me.":
    "Bu odada kimse hızlı hareket edemez. Ben dâhil.",
  Stormblood: "Fırtına Kanı",
  "The pressure drops when you get angry.":
    "Kızdığında basınç düşüyor.",
  "Lightning, thunder, wind, and pressure.":
    "Şimşek, gök gürültüsü, rüzgâr ve basınç.",
  Arc: "Sıçrama",
  "Your lightning Effects jump to a second target at no additional cost. Always.":
    "Şimşek Etkilerin ek maliyet olmadan ikinci bir hedefe sıçrar. Her zaman.",
  "I ride the gust up two floors.":
    "Rüzgârı iki kat yukarı biniyorum.",
  "The bolt finds the man in armor, not the man beside him.":
    "Şimşek yanındaki adamı değil, zırhlı adamı buluyor.",
  "Thunder. It empties their lungs.":
    "Gök gürültüsü. Ciğerlerini boşaltıyor.",
  Dragonblood: "Ejderha Kanı",
  "The scales showed up around your fourteenth birthday.":
    "Pullar on dördüncü doğum günün civarında ortaya çıktı.",
  "Draconic power: breath, scale, wing, and the weight of an old thing's stare.":
    "Ejderha gücü: nefes, pul, kanat ve kadim bir şeyin bakışının ağırlığı.",
  Breath: "Nefes",
  "2 Energy: 3d6 of your element across an entire zone. No Bend required, no cost increase.":
    "2 Enerji: bütün bir bölgeye elementinden 3d6. Bükme gerekmez, maliyet artışı yok.",
  "Wings. For as long as I need them.":
    "Kanatlar. İhtiyacım olduğu sürece.",
  "I look at the mob. The mob stops.":
    "Güruha bakıyorum. Güruh duruyor.",
  "I speak in a voice the ground can hear.":
    "Yerin duyabileceği bir sesle konuşuyorum.",
  Elderblood: "Kadim Kan",
  "Your bloodline predates the words currently used for magic.":
    "Soyun, büyü için şu an kullanılan sözcüklerden daha eski.",
  "Primordial magic: the raw stuff, from before anyone divided it into elements.":
    "İlksel büyü: ham hâli, kimse onu elementlere bölmeden öncesinden.",
  "Before Names": "İsimlerden Önce",
  "Once per scene, produce an Effect outside your Class Domain at normal cost and with no disadvantage. It was all one thing, once.":
    "Sahne başına bir kez, Sınıf Alanının dışında bir Etkiyi normal maliyetle ve dezavantajsız üret. Bir zamanlar hepsi tek bir şeydi.",
  "It isn't any school you'd recognise.":
    "Tanıyacağın hiçbir ekol değil.",
  "A word from before there were words.":
    "Sözcükler var olmadan önceki bir söz.",
  "I decline to accept that this is a fire spell.":
    "Bunun bir ateş büyüsü olduğunu kabul etmeyi reddediyorum.",
  "You didn't earn this and you didn't inherit it. You agreed to terms.":
    "Bunu ne hak ettin ne de miras aldın. Şartları kabul ettin.",
  "Burst and consequence. Your Energy comes back on a Short Rest, so where other casters ration, you spend everything and then rest. The trade is that something out there has a claim on you, and the Story God gets to use it. The darkest class in the game, and the one that generates the most story on its own.":
    "Patlama ve sonuç. Enerjin Kısa Dinlenmede geri gelir, o yüzden diğer büyücüler idare ederken sen her şeyi harcar sonra dinlenirsin. Karşılığında dışarıda bir şeyin senin üzerinde hakkı vardır ve Hikâye Tanrısı onu kullanır. Oyundaki en karanlık sınıf ve kendi başına en çok hikâye üreten.",
  "Borrowed power. Whatever your Patron is willing to lend, and it is not always the same amount.":
    "Ödünç güç. Patronun ne ödünç vermeye razıysa, ve bu her zaman aynı miktar değildir.",
  "A focus your Patron chose for you, light armor, and the terms of the agreement, if you were given a copy.":
    "Patronunun senin için seçtiği bir odak, hafif zırh ve anlaşmanın şartları, sana bir kopya verildiyse.",
  "The Bargain": "Pazarlık",
  "You recover your full Energy on a Short Rest, not half.":
    "Kısa Dinlenmede yarısını değil, tüm Enerjini geri kazanırsın.",
  "The Debt": "Borç",
  "Once per session the Story God may call it in: an instruction, a demand, a price. You may refuse — and lose your Signature and Rule Breaker until you make amends. Your Patron does not explain and does not negotiate.":
    "Oturum başına bir kez Hikâye Tanrısı onu çağırabilir: bir talimat, bir talep, bir bedel. Reddedebilirsin — ve telafi edene kadar İmzanı ve Kural Kırıcını kaybedersin. Patronun açıklama yapmaz ve pazarlık etmez.",
  "Something whispers his name and he flinches.":
    "Bir şey adını fısıldıyor ve o irkiliyor.",
  "I show him what's standing behind me. He runs.":
    "Ona arkamda ne durduğunu gösteriyorum. Kaçıyor.",
  "I ask it what's past the door. It tells me. It enjoys telling me.":
    "Ona kapının ötesinde ne olduğunu soruyorum. Söylüyor. Söylemekten hoşlanıyor.",
  "The shadows in this room are mine now.":
    "Bu odadaki gölgeler artık benim.",
  "Everything in that hallway starts to rot.":
    "O koridordaki her şey çürümeye başlıyor.",
  "The Fiend": "İblis",
  "A contract, signed, with a fixed term you did not read carefully.":
    "İmzalanmış, dikkatlice okumadığın sabit süreli bir sözleşme.",
  "Hellfire, contracts, temptation, and curses that stick.":
    "Cehennem ateşi, sözleşmeler, ayartma ve yapışan lanetler.",
  "Blood Price": "Kan Bedeli",
  "Pay any Energy cost with HP instead, at 2 HP per Energy. Your Patron finds this funny.":
    "Herhangi bir Enerji maliyetini yerine Canla öde, Enerji başına 2 Can. Patronun bunu komik buluyor.",
  "It's a genuinely good deal. That's the problem with it.":
    "Gerçekten iyi bir anlaşma. Sorun da bu zaten.",
  "The fire burns the guilty hotter. It knows the difference.":
    "Ateş suçluları daha kızgın yakar. Aradaki farkı biliyor.",
  "The curse lifts the moment he admits what he did.":
    "Lanet, ne yaptığını itiraf ettiği an kalkıyor.",
  "The Void": "Boşluk",
  "There is a space between the stars and something in it noticed you.":
    "Yıldızlar arasında bir boşluk var ve içindeki bir şey seni fark etti.",
  "Madness, distance, the mind, and things never meant to be perceived.":
    "Delilik, mesafe, zihin ve asla algılanmaması gereken şeyler.",
  Telepathy: "Telepati",
  "You speak mind to mind with anything that has a mind, at any distance you can perceive it.":
    "Zihni olan her şeyle, onu algılayabildiğin herhangi bir mesafede zihinden zihne konuşursun.",
  "I've known him ten seconds. I know what he's afraid of.":
    "Onu on saniyedir tanıyorum. Neyden korktuğunu biliyorum.",
  "The scream happens inside his head only.":
    "Çığlık yalnızca kafasının içinde oluyor.",
  "I show her one true thing. She doesn't recover.":
    "Ona tek bir gerçek şey gösteriyorum. Kendine gelemiyor.",
  "The Hunger": "Açlık",
  "It is not evil. It is just always eating, and now so are you.":
    "Kötü değil. Sadece hep yiyor, ve artık sen de yiyorsun.",
  "Consumption, decay, plague, and the slow taking of things.":
    "Tüketim, çürüme, veba ve şeylerin yavaşça alınması.",
  Feed: "Beslen",
  "When a creature dies within Near of you, gain 2 Energy and heal d6.":
    "Yakınında bir yaratık öldüğünde 2 Enerji kazan ve d6 iyileş.",
  "That wound won't close while I'm in the room.":
    "Ben odadayken o yara kapanmaz.",
  "The gate starts to rot. Wood first.":
    "Kapı çürümeye başlıyor. Önce ahşap.",
  "I take the memory out of him and keep it.":
    "Anıyı ondan alıp saklıyorum.",
  "Death is not a wall. It is a door with a specific and knowable mechanism.":
    "Ölüm bir duvar değil. Belirli ve bilinebilir bir mekanizması olan bir kapı.",
  "A resource engine. Every corpse on the field is fuel, so the longer a fight runs the stronger you get. You're a caster who wants the body count. Socially you're a liability in most towns, which is part of the fun.":
    "Bir kaynak motoru. Sahadaki her ceset yakıttır, o yüzden dövüş uzadıkça güçlenirsin. Ceset sayısını isteyen bir büyücüsün. Sosyal olarak çoğu kasabada bir yüksün, ve eğlencenin bir kısmı da bu.",
  "Death, the dead, and everything that leaks out of them.":
    "Ölüm, ölüler ve onlardan sızan her şey.",
  "Dark robes, a focus of bone or iron, a surgeon's tools, and a list of names.":
    "Koyu cübbeler, kemik ya da demir bir odak, bir cerrah aletleri ve bir isim listesi.",
  Harvest: "Hasat",
  "When any creature dies within Near of you, gain 2 Energy. No limit, no cooldown, and it does not care whose side they were on.":
    "Yakınında herhangi bir yaratık öldüğünde 2 Enerji kazan. Limit yok, bekleme yok, ve kimin tarafında olduklarını umursamaz.",
  "The corpse answers. Briefly, and it is not glad to.":
    "Ceset cevap veriyor. Kısaca ve memnun değil.",
  "He gets up. He works for me now, for about a day.":
    "Ayağa kalkıyor. Artık benim için çalışıyor, aşağı yukarı bir günlüğüne.",
  "Everything living in that room feels its strength going elsewhere.":
    "O odadaki her canlı gücünün başka bir yere gittiğini hissediyor.",
  "I take the wound off her and put it on him.":
    "Yarayı ondan alıp ona koyuyorum.",
  "The dead in this graveyard stand up. All of them.":
    "Bu mezarlıktaki ölüler ayağa kalkıyor. Hepsi.",
  Bonewright: "Kemik Ustası",
  "The frame is the honest part. Everything else was decoration.":
    "İskelet dürüst olan kısımdır. Geri kalan her şey süstü.",
  "Bone, marrow, structure, and the architecture of a body.":
    "Kemik, ilik, yapı ve bir bedenin mimarisi.",
  Ossuary: "Kemiklik",
  "You always have a servant: a skeleton with Level × 3 HP that acts on your turn. If it breaks, build another over any rest, out of whatever is lying around.":
    "Her zaman bir hizmetkârın vardır: senin turunda oynayan Seviye × 3 Canlı bir iskelet. Kırılırsa, herhangi bir dinlenmede etraftaki neyse ondan bir yenisini yap.",
  "I hold the bone. I know how it died.":
    "Kemiği tutuyorum. Nasıl öldüğünü biliyorum.",
  "Armor. Grown out of my own ribs.":
    "Zırh. Kendi kaburgalarımdan büyümüş.",
  "A wall. Interlocking. It used to be several people.":
    "Bir duvar. Birbirine geçmiş. Eskiden birkaç insandı.",
  Bloodletter: "Kan Alıcı",
  "Life is a fluid, and fluids can be moved.":
    "Hayat bir sıvıdır ve sıvılar taşınabilir.",
  "Blood, vitality, wounds, and trading one body's health for another's.":
    "Kan, canlılık, yaralar ve bir bedenin sağlığını bir başkasınınkiyle takas etmek.",
  "The Exchange": "Takas",
  "Pay any Energy cost with HP at 2 HP per Energy — your own, or that of any willing or Downed creature you're touching.":
    "Herhangi bir Enerji maliyetini Enerji başına 2 Canla öde — kendininki ya da dokunduğun istekli veya Düşmüş herhangi bir yaratığınki.",
  "His blood. Her wound. It's a simple transfer.":
    "Onun kanı. Onun yarası. Basit bir aktarım.",
  "I've tasted his blood. Now it boils.":
    "Kanını tattım. Şimdi kaynıyor.",
  "I know the rhythm of that heart. I can stop it from here.":
    "O kalbin ritmini biliyorum. Onu buradan durdurabilirim.",
  Cursebearer: "Lanet Taşıyıcı",
  "You don't have to be there when it happens.":
    "Olduğunda orada olman gerekmiyor.",
  "Curses, hexes, slow rot, and consequences that arrive late.":
    "Lanetler, büyüler, yavaş çürüme ve geç gelen sonuçlar.",
  "It Keeps": "Bekler",
  "Your curses have no duration. They last until their condition is met, and you set the condition when you cast them.":
    "Lanetlerinin süresi yoktur. Koşulları yerine gelene kadar sürerler ve koşulu onları yaparken sen belirlersin.",
  "His name can't be spoken now without pain.":
    "Adı artık acı çekilmeden söylenemez.",
  "The hex triggers if he lies to me. Only then.":
    "Büyü, bana yalan söylerse tetiklenir. Yalnızca o zaman.",
  "Bad luck. For him, and for his children.":
    "Kötü şans. Onun ve çocukları için.",
  Spiritbinder: "Ruh Bağlayıcı",
  "The body is the part that ends.":
    "Beden, sona eren kısımdır.",
  "Souls, ghosts, memory, and what remains when nothing physical does.":
    "Ruhlar, hayaletler, hafıza ve fiziksel hiçbir şey kalmadığında kalan şey.",
  "The Dead Speak Freely": "Ölüler Serbestçe Konuşur",
  "You see and speak with the dead at all times, at no cost. They see you too, and some of them have been waiting.":
    "Ölüleri her zaman, hiçbir maliyet olmadan görür ve onlarla konuşursun. Onlar da seni görür ve bazıları bekliyordu.",
  "What did you see, the night you died?":
    "Öldüğün gece ne gördün?",
  "You're going on now. It isn't a request.":
    "Artık gidiyorsun. Bu bir rica değil.",
  "The spirit goes into the blade. It agreed. Mostly.":
    "Ruh kılıcın içine giriyor. Razı oldu. Aşağı yukarı.",
  "You are not asking. You are relaying.":
    "Rica etmiyorsun. Aktarıyorsun.",
  "The safety net with teeth. You keep people alive, you cancel the thing that was about to ruin the encounter, and once a session you get to ask the universe for a favour it cannot refuse. Steady rather than flashy — until the Miracle, which is the single most open-ended ability in the game.":
    "Dişli emniyet ağı. İnsanları hayatta tutarsın, karşılaşmayı mahvetmek üzere olan şeyi iptal edersin ve oturumda bir kez evrenden reddedemeyeceği bir lütuf isteyebilirsin. Gösterişten çok istikrarlı — Mucize'ye kadar, ki o oyundaki tek en uçları açık yetenektir.",
  "Your god's portfolio, and the faith of the people around you.":
    "Tanrının portföyü ve çevrendeki insanların inancı.",
  "A holy symbol, medium armor, a shield or a staff, and a text you have read too many times.":
    "Bir kutsal sembol, orta zırh, bir kalkan ya da bir asa ve çok fazla okuduğun bir metin.",
  Miracle: "Mucize",
  "Once per session, ask your god for something outside the rules entirely. The Story God decides what happens and what it costs — but never says no outright. A Miracle always does something. It may not be what you asked for.":
    "Oturum başına bir kez, tanrından tamamen kuralların dışında bir şey iste. Ne olacağına ve bedeline Hikâye Tanrısı karar verir — ama asla doğrudan hayır demez. Bir Mucize her zaman bir şey yapar. İstediğin şey olmayabilir.",
  "Be still. You're not bleeding any more.":
    "Kımıldama. Artık kanamıyorsun.",
  "Every one of them. On their feet. Right now.":
    "Her biri. Ayakta. Hemen şimdi.",
  "This ground is holy as of this moment.":
    "Bu toprak şu andan itibaren kutsal.",
  "That is not going to touch her.":
    "O ona dokunmayacak.",
  "I need him back and I do not care what it costs.":
    "Onu geri istiyorum ve neye mal olduğu umurumda değil.",
  Healer: "Şifacı",
  "The war will end. People still have to live afterwards.":
    "Savaş bitecek. İnsanların sonrasında da yaşaması gerekiyor.",
  "Life, mending, disease, exhaustion, and keeping people going.":
    "Hayat, onarım, hastalık, bitkinlik ve insanları ayakta tutmak.",
  "Hands That Do Not Fail": "Yanılmayan Eller",
  "Your healing Effects never require a roll and never cost more than 2 Energy, whatever their scale.":
    "İyileştirme Etkilerin, ölçeği ne olursa olsun asla atış gerektirmez ve asla 2 Enerjiden fazlaya mal olmaz.",
  "Bone set. Four seconds.":
    "Kemik yerine oturdu. Dört saniye.",
  "The plague stops at this ward. The whole village.":
    "Veba bu korumada duruyor. Bütün köy.",
  "She's been dead under an hour. That's still negotiable.":
    "Öleli bir saatten az oldu. Bu hâlâ pazarlığa açık.",
  "War Priest": "Savaş Rahibi",
  "Your god has a position on this and it is not neutral.":
    "Tanrının bu konuda bir duruşu var ve tarafsız değil.",
  "Battle, courage, righteous force, and the sanctity of a good cause.":
    "Savaş, cesaret, haklı kuvvet ve iyi bir davanın kutsallığı.",
  "Armed Faith": "Silahlı İnanç",
  "Use WIS for weapon attacks and damage. Your weapon is a holy symbol.":
    "Silah saldırıları ve hasar için WIS kullan. Silahın bir kutsal semboldür.",
  "This line does not break. I've said so.":
    "Bu hat kırılmaz. Öyle dedim.",
  "The blade hurts that kind of thing specifically.":
    "Bu kılıç özellikle o tür şeye acı verir.",
  "Shield wall. Hold.":
    "Kalkan duvarı. Tutun.",
  "Dark Preacher": "Karanlık Vaiz",
  "Some gods are answered. Yours is negotiated with.":
    "Bazı tanrılara dua edilir. Seninkiyle pazarlık edilir.",
  "Fear, sacrifice, secrets, and the god whose name is not written down.":
    "Korku, kurban, sırlar ve adı yazıya dökülmeyen tanrı.",
  Tithe: "Öşür",
  "Take HP from a willing or Downed creature to pay Energy, at 2 HP per Energy. Your god considers this normal.":
    "Enerji ödemek için istekli ya da Düşmüş bir yaratıktan Can al, Enerji başına 2 Can. Tanrın bunu normal sayar.",
  "The blessing works. It costs her something.":
    "Kutsama işe yarıyor. Ona bir bedeli var.",
  "He intended to keep that. He doesn't now.":
    "Onu saklamayı planlıyordu. Artık saklamıyor.",
  "They don't remember joining. They still come every week.":
    "Katıldıklarını hatırlamıyorlar. Yine de her hafta geliyorlar.",
  "The world is not scenery. It is a crowd, and you are the only one being polite.":
    "Dünya bir dekor değil. Bir kalabalık, ve nazik olan tek kişi sensin.",
  "The most flexible non-combat class in the game and a strong controller in a fight. You change shape, you change ground, you change weather. Where the Wizard prepares and the Sorcerer improvises, you negotiate — with animals, plants, spirits, and the terrain itself.":
    "Oyundaki en esnek dövüş-dışı sınıf ve bir dövüşte güçlü bir kontrolcü. Şekil değiştirirsin, zemini değiştirirsin, havayı değiştirirsin. Büyücü hazırlanırken ve Sihirbaz doğaçlarken, sen müzakere edersin — hayvanlarla, bitkilerle, ruhlarla ve arazinin kendisiyle.",
  "The living world: beasts, weather, growth, and the spirits in all of it.":
    "Yaşayan dünya: canavarlar, hava, büyüme ve hepsindeki ruhlar.",
  "A totem or staff, hide armor, herbs, and something that used to be alive.":
    "Bir totem ya da asa, post zırh, otlar ve eskiden canlı olan bir şey.",
  "Wild Shape": "Vahşi Şekil",
  "2 Energy: become a beast for a scene. You keep your HP, Energy, and mind; you gain the beast's body and movement plus a d6 natural attack. Wolf (speed, scent) · Bird (flight, sight) · Bear (+CON HP, d8 attack) · Serpent (water, squeezing into things).":
    "2 Enerji: bir sahne boyunca bir canavara dönüş. Canını, Enerjini ve zihnini korursun; canavarın bedenini ve hareketini artı bir d6 doğal saldırı kazanırsın. Kurt (hız, koku) · Kuş (uçuş, görüş) · Ayı (+CON Can, d8 saldırı) · Yılan (su, dar yerlere sıkışma).",
  "I ask the crows what came through here.":
    "Kargalara buradan neyin geçtiğini soruyorum.",
  "The roots take his ankles.":
    "Kökler ayak bileklerini yakalıyor.",
  "Fog. All of it. Nobody sees anyone.":
    "Sis. Hepsi. Kimse kimseyi görmüyor.",
  "Give me ten minutes and it will be raining.":
    "Bana on dakika ver, yağmur yağıyor olacak.",
  "The whole treeline moves.":
    "Bütün ağaç hattı hareket ediyor.",
  "Wild Heart": "Vahşi Yürek",
  "You were raised by something and it wasn't people.":
    "Bir şey tarafından büyütüldün ve o şey insan değildi.",
  "Beasts, packs, the hunt, and instinct.":
    "Canavarlar, sürüler, av ve içgüdü.",
  "Beast Speech": "Canavar Dili",
  "Animals will always help you, as long as it costs them little. No roll, no cost.":
    "Hayvanlar, onlara az mal olduğu sürece sana her zaman yardım eder. Atış yok, maliyet yok.",
  "As a wolf, I'm a wolf. Anyone watching agrees.":
    "Kurt olarak, ben bir kurdum. İzleyen herkes hemfikir.",
  "I know this valley through the things that live in it.":
    "Bu vadiyi, içinde yaşayan şeyler aracılığıyla tanıyorum.",
  "The pack hunts with us. For tonight.":
    "Sürü bizimle avlanıyor. Bu gecelik.",
  Storm: "Fırtına",
  "You are on good terms with the weather and it shows.":
    "Havayla aran iyi ve bu belli oluyor.",
  "Wind, lightning, rain, sea, and pressure.":
    "Rüzgâr, şimşek, yağmur, deniz ve basınç.",
  "Rides the Air": "Havaya Biner",
  "You move one extra zone in any direction, including straight up.":
    "Dosdoğru yukarı dâhil, herhangi bir yöne bir ekstra bölge hareket edersin.",
  "Lightning. On that one specifically.":
    "Şimşek. Özellikle onun üstüne.",
  "Wind at our backs. Three days of it.":
    "Arkamızda rüzgâr. Üç günlük.",
  "The squall grounds the ship. It stays grounded.":
    "Bora gemiyi karaya oturtuyor. Karaya oturmuş kalıyor.",
  "Deep Root": "Derin Kök",
  "Stone is slow, not stupid.":
    "Taş yavaştır, aptal değil.",
  "Forests, stone, growth, patience, and poison.":
    "Ormanlar, taş, büyüme, sabır ve zehir.",
  "The Ground Answers": "Yer Cevap Verir",
  "1 Energy: reshape the terrain of a zone. Roots, walls, mud, cover, a hole where there wasn't one.":
    "1 Enerji: bir bölgenin arazisini yeniden şekillendir. Kökler, duvarlar, çamur, siper, olmayan yerde bir çukur.",
  "The path closes behind us.":
    "Yol arkamızda kapanıyor.",
  "Everything that's crossed this ground in a month — I know it.":
    "Bir ayda bu topraktan geçen her şeyi — biliyorum.",
  "A season of growth. This afternoon.":
    "Bir mevsimlik büyüme. Bu öğleden sonra.",
  "Magic is chemistry that hasn't been written down properly yet.":
    "Büyü, henüz düzgünce yazıya dökülmemiş kimyadır.",
  "A planner. You bank your power at rest and spend it as physical objects, which means you can hand your abilities to other people. The only class that can arm the whole party. Weak at improvising, extremely strong at preparing.":
    "Bir planlamacı. Gücünü dinlenirken biriktirir ve fiziksel nesneler olarak harcarsın, bu da yeteneklerini başkalarına verebileceğin anlamına gelir. Bütün grubu donatabilen tek sınıf. Doğaçlamada zayıf, hazırlıkta son derece güçlü.",
  "Substances, reactions, mechanisms, and what they do to a body.":
    "Maddeler, tepkimeler, mekanizmalar ve bir bedene ne yaptıkları.",
  "A portable lab, light armor, a light weapon, and a notebook of failures.":
    "Taşınabilir bir laboratuvar, hafif zırh, bir hafif silah ve bir başarısızlıklar defteri.",
  Brew: "Karışım",
  "On each Short or Long Rest, prepare INT + Level doses. A dose is one Effect, priced normally — but paid for at rest, not in the moment. Anyone can use a dose. Hand them out. Doses spoil at your next rest, so hoarding does not work.":
    "Her Kısa ya da Uzun Dinlenmede INT + Seviye doz hazırla. Bir doz bir Etkidir, normal fiyatlandırılır — ama o anda değil, dinlenirken ödenir. Bir dozu herkes kullanabilir. Onları dağıt. Dozlar bir sonraki dinlenmende bozulur, o yüzden biriktirmek işe yaramaz.",
  "Give me a minute with the body and I'll tell you what killed it.":
    "Bana cesetle bir dakika ver, onu neyin öldürdüğünü söyleyeyim.",
  "Acid. Straight through the hinges.":
    "Asit. Doğrudan menteşelerin içinden.",
  "Drink this. You won't feel the arrow for about an hour.":
    "Bunu iç. Yaklaşık bir saat oku hissetmezsin.",
  "It's not a bomb. It's a lot of smoke and a very loud noise.":
    "Bir bomba değil. Bir sürü duman ve çok yüksek bir ses.",
  "Everyone takes one. Break it on the ground if things go wrong.":
    "Herkes birer tane alsın. İşler kötü giderse yere çarpıp kır.",
  Bombardier: "Bombacı",
  "The trick is the shape of the container, not the contents.":
    "Marifet, içindekiler değil, kabın şeklidir.",
  "Explosives, acid, smoke, shrapnel, and pressure.":
    "Patlayıcılar, asit, duman, şarapnel ve basınç.",
  "Wide Blast": "Geniş Patlama",
  "Your thrown doses hit an entire zone, and you choose who they skip.":
    "Fırlattığın dozlar bütün bir bölgeye isabet eder ve kimi atlayacaklarını sen seçersin.",
  "Smoke. It only blinds the ones who weren't expecting it.":
    "Duman. Yalnızca beklemeyenleri kör eder.",
  "Anything with a hinge, I can open.":
    "Menteşesi olan her şeyi açabilirim.",
  "The wall comes down. On a schedule I set.":
    "Duvar iniyor. Benim belirlediğim bir programa göre.",
  Elixirist: "İksirci",
  "The body is a system, and systems accept input.":
    "Beden bir sistemdir ve sistemler girdi kabul eder.",
  "Potions, poisons, transformation, and the limits of a body.":
    "İksirler, zehirler, dönüşüm ve bir bedenin sınırları.",
  "On Tap": "Hazırda",
  "Drinking a dose is a free action, and doses you drink yourself last the whole scene.":
    "Bir doz içmek bedava aksiyondur ve kendi içtiğin dozlar bütün sahne boyunca sürer.",
  "Drink it. You'll be stronger than you should be, briefly.":
    "İç. Kısa süreliğine olman gerekenden güçlü olacaksın.",
  "An antidote. I've only ever heard the poison described.":
    "Bir panzehir. Zehri sadece tarif edilirken duydum.",
  "Tonight I'm his height and his build.":
    "Bu gece onun boyunda ve yapısındayım.",
  Golemwright: "Golem Ustası",
  "You got tired of relying on people.":
    "İnsanlara güvenmekten yoruldun.",
  "Constructs, clockwork, animation, and machines that keep working.":
    "Makineler, saat mekanizması, canlandırma ve çalışmaya devam eden aygıtlar.",
  "The Machine": "Makine",
  "You have a construct with Level × 6 HP. It acts on your turn and hits for d8. Rebuild it over a Long Rest if destroyed.":
    "Seviye × 6 Canlı bir makinen var. Senin turunda oynar ve d8 vurur. Yok edilirse Uzun Dinlenmede yeniden kur.",
  "I send it in. There's no guilt involved.":
    "Onu içeri gönderiyorum. İşin içinde suçluluk yok.",
  "It held the door for three days while we were gone.":
    "Biz yokken kapıyı üç gün tuttu.",
  "I fit it with an arm for taking hits meant for me.":
    "Ona, bana yönelen darbeleri almak için bir kol taktım.",
};

const src = readFileSync("data/classes.ts", "utf8");
let injected = 0;
let missed = 0;
const missing = [];

// Insert `tr: "..."` right after `en: "STRING"` unless a tr already follows.
const out = src.replace(/en: "((?:[^"\\]|\\.)*)"(?!\s*,\s*tr:)/g, (full, str) => {
  const tr = T[str];
  if (!tr) {
    missed++;
    missing.push(str);
    return full;
  }
  injected++;
  const esc = tr.replace(/"/g, '\\"');
  return `en: "${str}", tr: "${esc}"`;
});

writeFileSync("data/classes.ts", out);
console.log("injected:", injected, "already-had-tr-or-missing:", missed);
if (missing.length) {
  console.log("first few missing:", missing.slice(0, 8));
}
