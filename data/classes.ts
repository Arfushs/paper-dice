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
      en: "You are not the strongest person in the room. You are the one who has done this before.",
    },
    playsLike: {
      en: "The dependable one. You have an answer to almost every fight and you never run out of it. Where the Barbarian breaks a problem and the Rogue avoids it, you take it apart on purpose. The easiest class to play well and the hardest to play badly — and the class whose subclasses change the most about how you actually play, from pure swordwork to inscribed magic to commanding a line.",
    },
    hpBase: 12,
    priority: ["STR / DEX", "CON", "WIS"],
    domain: { en: "Steel, the body, and the shape of a battlefield." },
    kit: { en: "Any weapon, medium armor, a shield, a soldier's pack." },
    signature: {
      name: { en: "Maneuver" },
      text: {
        en: "Once per turn, when you hit, add something for free: shove them into the next zone, disarm them, knock them Prone, or pin them where they stand. No Energy. No roll.",
      },
    },
    examples: [
      { text: { en: "I kick the table into his knees and step in after it." }, cost: "1" },
      { text: { en: "I hook his shield away and put him on the floor." }, cost: "1" },
      { text: { en: "I hold this doorway. Nothing gets past me this round." }, cost: "2" },
      { text: { en: "I cut the rope — the chandelier comes down on the whole pack." }, cost: "2" },
      { text: { en: "I throw the spear hard enough to pin him to the far wall." }, cost: "3" },
    ],
    subclasses: [
      {
        id: "weapon-master",
        slug: "knight-weapon-master",
        name: { en: "Weapon Master" },
        tagline: { en: "Every weapon is one you have already used." },
        domain: { en: "Anything with an edge, a point, or a weight. Held, thrown, or picked up off the floor." },
        ruleBreaker: {
          name: { en: "Perfect Grip" },
          text: { en: "Your Maneuver fires on a miss as well as a hit." },
        },
        examples: [
          { text: { en: "I flip the dagger and put it through the lock." }, cost: "1" },
          { text: { en: "I grab whatever's on the weapon rack and fight with both." }, cost: "1" },
          { text: { en: "The throw goes through his drawing hand, across the room." }, cost: "2" },
        ],
      },
      {
        id: "warden",
        slug: "knight-warden",
        name: { en: "Warden" },
        tagline: { en: "The line holds because you are standing on it." },
        domain: { en: "Shields, chokepoints, cover, and ground you refuse to give." },
        ruleBreaker: {
          name: { en: "Bulwark" },
          text: { en: "Enemies cannot leave your zone unless they beat you in a STR or DEX contest." },
        },
        examples: [
          { text: { en: "I brace the door with my own body. It holds." }, cost: "1" },
          { text: { en: "I drag her out of the blast and take it instead." }, cost: "1" },
          { text: { en: "Nobody comes down this corridor. Not this round, not the next." }, cost: "2" },
        ],
      },
      {
        id: "duelist",
        slug: "knight-duelist",
        name: { en: "Duelist" },
        tagline: { en: "One on one, you have never lost." },
        domain: { en: "Timing, footwork, feints, and the space between two blades." },
        ruleBreaker: {
          name: { en: "First Blood" },
          text: { en: "When exactly one enemy is present, you act first in initiative. Always." },
        },
        examples: [
          { text: { en: "I've watched him swing twice. I know what the third one is." }, cost: "1" },
          { text: { en: "I take the sword out of his hand mid-parry." }, cost: "1" },
          { text: { en: "I turn the duel into a conversation, and win that instead." }, cost: "2" },
        ],
      },
      {
        id: "enchanter",
        slug: "knight-enchanter",
        name: { en: "Enchanter Knight" },
        tagline: { en: "You never learned to cast. You learned to make the steel do it." },
        domain: { en: "Runes, wards, and the metal they are cut into — armour and blade as the spellbook." },
        ruleBreaker: {
          name: { en: "Inscribed" },
          text: {
            en: "You may store one Effect in your weapon or armour. Pay its Energy at rest, when you cut the rune; release it later as a free action, on any turn you like. One stored Effect at a time.",
          },
        },
        examples: [
          { text: { en: "The runes catch. The blade is burning now, and it stays burning." }, cost: "1" },
          { text: { en: "I inscribed this shield last night. Whatever hits it next, hits nothing." }, cost: "2" },
          { text: { en: "The armour remembers a blow I took last week. It gives it back." }, cost: "2" },
        ],
      },
      {
        id: "banneret",
        slug: "knight-banneret",
        name: { en: "Banneret" },
        tagline: { en: "You are not the best soldier here. You are the reason the rest of them hold." },
        domain: { en: "Command, formation, morale, and the will of people who have agreed to follow orders." },
        ruleBreaker: {
          name: { en: "On My Word" },
          text: {
            en: "Once per round, an ally who can hear you may immediately take a Move or an Action out of turn. It costs you nothing.",
          },
        },
        examples: [
          { text: { en: "Second rank. Step up. Now." }, cost: "1" },
          { text: { en: "Nobody in this line breaks while my banner is up." }, cost: "2" },
          { text: { en: "Fifty militia who have never held a spear hold for one more round." }, cost: "3" },
        ],
      },
    ],
  },

  {
    id: "barbarian",
    num: 2,
    group: "front",
    name: { en: "Barbarian", tr: "Barbar" },
    hook: { en: "There is a point past which pain stops being information." },
    playsLike: {
      en: "A battery that discharges. You are enormous, you get bigger when you're angry, and you have very few answers that aren't violence. When the plan works you're a sledgehammer; when the plan fails you're the reason anyone survives.",
    },
    hpBase: 14,
    priority: ["STR", "CON", "WIS"],
    domain: { en: "Raw force, fury, and endurance past reason." },
    kit: { en: "A heavy weapon, hide armor, and a trophy from something you killed." },
    signature: {
      name: { en: "Rage" },
      text: {
        en: "Free action, 2 Energy. Until the scene ends or you go a full turn without attacking: halve all incoming physical damage, add +CON to your damage, and roll INT and CHA at disadvantage.",
      },
    },
    examples: [
      { text: { en: "I pick him up and throw him at the other one." }, cost: "1" },
      { text: { en: "I put my shoulder through the door. Not the lock — the door." }, cost: "1" },
      { text: { en: "I grab the front rank and drag all of them backwards with me." }, cost: "2" },
      { text: { en: "I take the hit on purpose so she can get past." }, cost: "2" },
      { text: { en: "I catch the falling stone and hold the ceiling while they run." }, cost: "3" },
    ],
    subclasses: [
      {
        id: "berserker",
        slug: "barbarian-berserker",
        name: { en: "Berserker" },
        tagline: { en: "The anger was already there. The fight is just permission." },
        domain: { en: "Bloodlust, terror, and momentum that does not stop." },
        ruleBreaker: {
          name: { en: "No Cost" },
          text: { en: "Your first Rage each scene is free." },
        },
        examples: [
          { text: { en: "I scream. The room decides to be somewhere else." }, cost: "1" },
          { text: { en: "Three zones. Through everything in between." }, cost: "2" },
          { text: { en: "I'm still standing. I shouldn't be. I am." }, cost: "2" },
        ],
      },
      {
        id: "totem",
        slug: "barbarian-totem",
        name: { en: "Totem" },
        tagline: { en: "Something old walks with you, and it has opinions." },
        domain: { en: "Beast spirits, the endurance of the wild, borrowed shapes and instincts." },
        ruleBreaker: {
          name: { en: "Borrowed Hide" },
          text: {
            en: "Each Rage, pick one: bear (resist all damage, not just physical), wolf (allies have advantage on anything you attack), eagle (move two zones a turn).",
          },
        },
        examples: [
          { text: { en: "I smell the lie on him." }, cost: "0" },
          { text: { en: "I run the horse into the ground, then keep going on foot." }, cost: "1" },
          { text: { en: "I sleep in the blizzard. It doesn't concern me." }, cost: "1" },
        ],
      },
      {
        id: "giantblood",
        slug: "barbarian-giantblood",
        name: { en: "Giantblood" },
        tagline: { en: "Your grandmother was very large and nobody discusses it." },
        domain: { en: "Size, reach, weight, and throwing things that should not be thrown." },
        ruleBreaker: {
          name: { en: "Oversized" },
          text: { en: "You swing Heavy weapons one-handed, and you can throw them to Near." },
        },
        examples: [
          { text: { en: "I pick up the cart. That's the club now." }, cost: "1" },
          { text: { en: "He's a zone away. That's still in reach." }, cost: "1" },
          { text: { en: "I catch the horse." }, cost: "2" },
        ],
      },
      {
        id: "bloodrager",
        slug: "barbarian-bloodrager",
        name: { en: "Bloodrager" },
        tagline: { en: "The rage doesn't stay inside. It never did." },
        domain: { en: "Fury made physical — force, shockwaves, and the air getting out of the way." },
        ruleBreaker: {
          name: { en: "It Comes Out" },
          text: {
            en: "While you are Raging, your Effects cost no Action. The rage is producing them, not you — you are just where they happen.",
          },
        },
        examples: [
          { text: { en: "I hit the ground and the ground answers." }, cost: "1" },
          { text: { en: "The shout arrives before I do." }, cost: "2" },
          { text: { en: "Everything in front of me goes backwards. All of it." }, cost: "2" },
        ],
      },
    ],
  },

  {
    id: "paladin",
    num: 3,
    group: "front",
    name: { en: "Paladin", tr: "Paladin" },
    hook: { en: "You swore something. It is listening." },
    playsLike: {
      en: "A weapon with a conscience attached, and the conscience has teeth. You hit hard in bursts and you keep people standing. The oath is the real class feature: it gives the Story God a lever on you, and that is a feature — a Paladin with nothing to lose is just a Knight in nicer armor.",
    },
    hpBase: 12,
    priority: ["STR / CHA", "CON", "WIS"],
    domain: { en: "Your oath, and the light or weight it carries." },
    kit: {
      en: "A warhammer or another martial weapon, heavy armor, a shield, a holy symbol you did not choose for yourself.",
    },
    signature: {
      name: { en: "Smite" },
      text: { en: "When you hit, spend any amount of Energy: +1d8 oath damage per Energy, up to your cap." },
    },
    signatureExtra: {
      name: { en: "The Oath" },
      text: {
        en: "Write three tenets at level 1. Break one knowingly and you lose your Signature and your Rule Breaker until you atone. The Story God decides what atonement costs, and it should cost.",
      },
    },
    examples: [
      { text: { en: "I pour light into her wounds until she opens her eyes." }, cost: "1" },
      { text: { en: "I say his name and he cannot look away from me." }, cost: "1" },
      { text: { en: "Nothing unholy crosses this threshold while I stand in it." }, cost: "2" },
      { text: { en: "My oath burns through the whole line of them." }, cost: "3" },
      { text: { en: "The lie is spoken aloud, and everyone in this hall hears it as a lie." }, cost: "3" },
    ],
    subclasses: [
      {
        id: "oath-of-light",
        slug: "paladin-oath-of-light",
        name: { en: "Oath of Light" },
        tagline: { en: "You are not the light. You are what it is pointed through." },
        domain: { en: "Radiance, healing, warding, and revealing what hides." },
        ruleBreaker: {
          name: { en: "Unshakable" },
          text: { en: "You and every ally in your zone are immune to Frightened." },
        },
        examples: [
          { text: { en: "Daylight. In here. Now." }, cost: "2" },
          { text: { en: "The curse comes off her. It has to go somewhere else." }, cost: "2" },
          { text: { en: "I can't see it. It can't hide from this." }, cost: "2" },
        ],
      },
      {
        id: "oath-of-vengeance",
        slug: "paladin-oath-of-vengeance",
        name: { en: "Oath of Vengeance" },
        tagline: { en: "Someone did something, and you have not finished about it." },
        domain: { en: "Pursuit, retribution, and one marked enemy." },
        ruleBreaker: {
          name: { en: "The Mark" },
          text: { en: "Name one enemy per scene. Any attack roll of 10 or higher hits it, whatever its Defense." },
        },
        examples: [
          { text: { en: "I know which direction he's in. I always do." }, cost: "0" },
          { text: { en: "He's faster than me. He isn't going to stay ahead." }, cost: "1" },
          { text: { en: "The armor doesn't matter. I'm not looking for a gap." }, cost: "2" },
        ],
      },
      {
        id: "oath-of-atonement",
        slug: "paladin-oath-of-atonement",
        name: { en: "Oath of Atonement" },
        tagline: { en: "You did something. This is how you carry it." },
        domain: { en: "Penance, endurance, and suffering taken on behalf of others." },
        ruleBreaker: {
          name: { en: "Take the Blow" },
          text: { en: "You may accept any damage aimed at an ally in your zone. It is halved." },
        },
        examples: [
          { text: { en: "I draw the poison out of her and into me." }, cost: "1" },
          { text: { en: "I stand in the fire so she doesn't have to." }, cost: "2" },
          { text: { en: "Whatever he did — I'll carry it. Let him go." }, cost: "3" },
        ],
      },
      {
        id: "oath-of-the-silent",
        slug: "paladin-oath-of-the-silent",
        name: { en: "Oath of the Silent" },
        tagline: { en: "No banner, no shining armour, no announcement. Judgement all the same." },
        domain: { en: "Investigation, judgement, oaths sworn where nobody heard, and the guilty." },
        ruleBreaker: {
          name: { en: "The Confession" },
          text: {
            en: "Ask one creature one question about something it has done. It cannot lie to you. It may refuse to answer — and you will know that it refused.",
          },
        },
        examples: [
          { text: { en: "Three days in this town. I know which one of them it is." }, cost: "1" },
          { text: { en: "He knows what he did. Now everyone in the room does too." }, cost: "2" },
          { text: { en: "My oath was sworn to nobody at all. It still holds." }, cost: "2" },
        ],
      },
    ],
  },

  {
    id: "monk",
    num: 4,
    group: "front",
    name: { en: "Monk", tr: "Keşiş" },
    hook: { en: "Everyone else brought a weapon. You didn't need to." },
    playsLike: {
      en: "Fast, slippery, precise. You go wherever you want on the battlefield and hit several times when you get there. Fragile if you stand still, so don't. The most mobile class in the game by a wide margin.",
    },
    hpBase: 10,
    priority: ["DEX", "WIS", "CON"],
    domain: { en: "The body as a weapon: breath, momentum, and stillness." },
    kit: { en: "Simple robes, a staff or a pair of light weapons, a bowl." },
    signature: {
      name: { en: "Flow" },
      text: {
        en: "Your unarmed die is d6 (d8 at level 5, d10 at level 9), and the Attack action gives you one extra unarmed attack for free. While unarmored, your Defense is 10 + DEX + WIS.",
      },
    },
    examples: [
      { text: { en: "I run up the wall and come down behind him." }, cost: "1" },
      { text: { en: "I catch the arrow." }, cost: "1" },
      { text: { en: "I strike a nerve. His arm stops working." }, cost: "2" },
      { text: { en: "I move through the whole line, hitting each of them once." }, cost: "2" },
      { text: { en: "I stand perfectly still and nothing they do lands." }, cost: "3" },
    ],
    subclasses: [
      {
        id: "open-hand",
        slug: "monk-open-hand",
        name: { en: "Open Hand" },
        tagline: { en: "Bodies are machines and you have read the manual." },
        domain: { en: "Pressure points, joints, throws, and shutting a body down." },
        ruleBreaker: {
          name: { en: "Read the Body" },
          text: { en: "After you hit a creature, you know its current HP and one weakness." },
        },
        examples: [
          { text: { en: "The one on the left is hurt. I can see it in how he stands." }, cost: "0" },
          { text: { en: "He's twice my size. He goes over my hip anyway." }, cost: "1" },
          { text: { en: "I strike under the ribs. His heart skips three beats." }, cost: "2" },
        ],
      },
      {
        id: "shadow",
        slug: "monk-shadow",
        name: { en: "Shadow" },
        tagline: { en: "Stillness, then absence." },
        domain: { en: "Darkness, silence, and being somewhere you were not." },
        ruleBreaker: {
          name: { en: "Step Through Dark" },
          text: { en: "1 Energy: step from any shadow to any other within Far." },
        },
        examples: [
          { text: { en: "Every light in this room goes out at once." }, cost: "1" },
          { text: { en: "The blow comes from a direction that has nobody in it." }, cost: "1" },
          { text: { en: "I walk past the watchman. In the open. He doesn't register it." }, cost: "2" },
        ],
      },
      {
        id: "four-elements",
        slug: "monk-four-elements",
        name: { en: "Four Elements" },
        tagline: { en: "The body is one of the four. It happens to be the one you're in." },
        domain: { en: "Fire, water, air, and stone, channelled through the body." },
        ruleBreaker: {
          name: { en: "Elemental Fist" },
          text: { en: "Your unarmed attacks deal any elemental damage type you like and reach Near." },
        },
        examples: [
          { text: { en: "The punch arrives as wind, from across the room." }, cost: "1" },
          { text: { en: "Six steps across the water. That's all I need." }, cost: "1" },
          { text: { en: "Stone comes up out of the floor between us." }, cost: "2" },
        ],
      },
      {
        id: "mender",
        slug: "monk-mender",
        name: { en: "Mender" },
        tagline: { en: "The same knowledge that stops a heart can start one." },
        domain: { en: "Breath, circulation, nerves, poison, and putting a body back the way it was." },
        ruleBreaker: {
          name: { en: "Hands On" },
          text: {
            en: "Your healing Effects cost no Action and need no roll — but you must be Engaged and touching them. You cannot heal at range at all.",
          },
        },
        examples: [
          { text: { en: "Breathe. There. That's the poison out." }, cost: "1" },
          { text: { en: "I set the bone and she's back up this round." }, cost: "1" },
          { text: { en: "Everyone I can reach. All at once. Then I'm finished." }, cost: "3" },
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
    hook: { en: "There is a way in. There is always a way in." },
    playsLike: {
      en: "The highest single hit in the game if you set it up, and almost nothing if you don't. Outside combat you're the one who solves the problem before it becomes a fight. Rewards positioning and patience.",
    },
    hpBase: 8,
    priority: ["DEX", "CHA / INT", "CON"],
    domain: { en: "Angles, timing, locks, lies, and the soft parts." },
    kit: { en: "Two light weapons, light armor, thieves' tools, and something you have not yet returned." },
    signature: {
      name: { en: "Sneak Attack" },
      text: {
        en: "Once per turn, when you hit with advantage, or when the target is Engaged with one of your allies: add 2d6. Rises to 4d6 at level 5 and 6d6 at level 9.",
      },
    },
    examples: [
      { text: { en: "I'm not where he swung. I'm behind him." }, cost: "1" },
      { text: { en: "That's his purse, this is his key, and he's noticed neither." }, cost: "1" },
      { text: { en: "I put out the torches and let the dark do the rest." }, cost: "2" },
      { text: { en: "The wine was poisoned four hours ago. This is just when it starts." }, cost: "2" },
      { text: { en: "I was never in this building. Check the records — I never was." }, cost: "3" },
    ],
    subclasses: [
      {
        id: "assassin",
        slug: "rogue-assassin",
        name: { en: "Assassin" },
        tagline: { en: "The fight is a formality. The work happened earlier." },
        domain: { en: "Ambush, poison, disguise, and the killing stroke." },
        ruleBreaker: {
          name: { en: "Killer's Opening" },
          text: {
            en: "Your first attack against a creature that has not yet acted in combat is automatically a critical hit. Once per scene.",
          },
        },
        examples: [
          { text: { en: "I've watched him for an hour. Now I'm him." }, cost: "2" },
          { text: { en: "The poison starts working at midnight. I chose midnight." }, cost: "2" },
          { text: { en: "He'll be standing there in four minutes. I know because I know him." }, cost: "1" },
        ],
      },
      {
        id: "infiltrator",
        slug: "rogue-infiltrator",
        name: { en: "Infiltrator" },
        tagline: { en: "Doors are a suggestion and you have not agreed to it." },
        domain: { en: "Locks, wards, guards, walls, and everything meant to keep you out." },
        ruleBreaker: {
          name: { en: "No Such Door" },
          text: { en: "Ten uninterrupted minutes and you are inside. No roll." },
        },
        examples: [
          { text: { en: "No footprints, no scent, no one was here." }, cost: "1" },
          { text: { en: "We leave the way we came, at walking pace." }, cost: "1" },
          { text: { en: "The ward stays running. I just stop matching its definition." }, cost: "2" },
        ],
      },
      {
        id: "trickster",
        slug: "rogue-trickster",
        name: { en: "Trickster" },
        tagline: { en: "The truth is whatever survives the next five minutes." },
        domain: { en: "Misdirection, confidence games, and borrowed identities." },
        ruleBreaker: {
          name: { en: "It Was Always Yours" },
          text: {
            en: "Once per scene, declare that you lifted something plausible from someone you have been near. It's true.",
          },
        },
        examples: [
          { text: { en: "I heard him speak once. That's enough." }, cost: "1" },
          { text: { en: "The writ is genuine. It'll survive exactly one reading." }, cost: "2" },
          { text: { en: "By morning each of them is certain the other sold them out." }, cost: "3" },
        ],
      },
    ],
  },

  {
    id: "ranger",
    num: 6,
    group: "skirmisher",
    name: { en: "Ranger", tr: "Korucu" },
    hook: { en: "You saw it three hours before it saw you." },
    playsLike: {
      en: "Control and consistency. You pick the target and suddenly it's everyone's target. Away from the fight you keep the party alive, fed, and un-lost — the class that makes travel and wilderness actually play instead of being narrated past.",
    },
    hpBase: 10,
    priority: ["DEX", "WIS", "CON"],
    domain: { en: "Wilds, tracks, prey, and the distance between you and it." },
    kit: { en: "A bow or crossbow, a melee weapon, light armor, a traveller's kit, a map you drew yourself." },
    signature: {
      name: { en: "Mark" },
      text: {
        en: "Free action, 1 Energy. Mark one creature you can see. You deal +1d6 to it, and every ally has advantage tracking it. Lasts the scene. When it dies, Mark the next one free.",
      },
    },
    examples: [
      { text: { en: "Four of them. One is limping. They came through last night." }, cost: "1" },
      { text: { en: "I shoot the rope holding the gate." }, cost: "1" },
      { text: { en: "One arrow, everyone in that doorway." }, cost: "2" },
      { text: { en: "We take this pass. I know a way that doesn't involve the pass." }, cost: "2" },
      { text: { en: "I've been setting up this clearing since dawn. Roll initiative." }, cost: "3" },
    ],
    subclasses: [
      {
        id: "sharpshooter",
        slug: "ranger-sharpshooter",
        name: { en: "Sharpshooter" },
        tagline: { en: "The shot exists. You just have to wait for it." },
        domain: { en: "Distance, wind, patience, and the perfect angle." },
        ruleBreaker: {
          name: { en: "No Cover" },
          text: { en: "Cover and concealment never penalise your ranged attacks." },
        },
        examples: [
          { text: { en: "The chain has one weak link. That one." }, cost: "1" },
          { text: { en: "It's further than anyone thinks is possible. I take it anyway." }, cost: "1" },
          { text: { en: "Through the keyhole. Yes, really." }, cost: "2" },
        ],
      },
      {
        id: "beast-bond",
        slug: "ranger-beast-bond",
        name: { en: "Beast Bond" },
        tagline: { en: "There are two of you and only one draws a sheet." },
        domain: { en: "One animal, and the bond between you." },
        ruleBreaker: {
          name: { en: "Two Bodies" },
          text: {
            en: "Your companion acts on your initiative and takes its own Action free. Level × 5 HP, attacks at your bonus for d6.",
          },
        },
        examples: [
          { text: { en: "I send her in. I can't fit. She can." }, cost: "0" },
          { text: { en: "We flank him. Neither of us needed to say anything." }, cost: "0" },
          { text: { en: "I see what she sees. She's a mile out." }, cost: "1" },
        ],
      },
      {
        id: "trailblazer",
        slug: "ranger-trailblazer",
        name: { en: "Trailblazer" },
        tagline: { en: "You have already been here, and you left things." },
        domain: { en: "Terrain, traps, ambush ground, and survival." },
        ruleBreaker: {
          name: { en: "Prepared Ground" },
          text: { en: "Ten minutes in a place and you have set traps. Declare what they do when combat starts." },
        },
        examples: [
          { text: { en: "There's a storm in two days. Plan around it." }, cost: "0" },
          { text: { en: "The snare takes something twice my weight." }, cost: "1" },
          { text: { en: "The bog is passable. For exactly four of us." }, cost: "2" },
        ],
      },
    ],
  },

  {
    id: "bard",
    num: 7,
    group: "skirmisher",
    name: { en: "Bard", tr: "Ozan" },
    hook: { en: "Nobody in the room has noticed yet that you are the one deciding what happens." },
    playsLike: {
      en: "The amplifier. You rarely have the biggest number, but you hand out the die that turns someone else's failure into a success, and you talk the party out of half the fights they'd otherwise lose. The most social class, and unusually good at making everyone else feel powerful.",
    },
    hpBase: 8,
    priority: ["CHA", "DEX", "CON"],
    domain: { en: "Story, song, and what people believe about themselves." },
    kit: { en: "An instrument, light armor, a light weapon, and a debt someone owes you." },
    signature: {
      name: { en: "Inspiration" },
      text: {
        en: "Free action, 1 Energy. Hand an ally a d6. They may add it to any roll before the scene ends. d8 at level 5, d10 at level 9. One per ally at a time.",
      },
    },
    examples: [
      { text: { en: "I tell him the story of his own father and watch him decide not to swing." }, cost: "1" },
      { text: { en: "There's a second set of footsteps in this room. Everyone hears them." }, cost: "1" },
      { text: { en: "The whole tavern is singing, and nobody is watching the back door." }, cost: "2" },
      { text: { en: "I sing the fear out of them. All of them." }, cost: "2" },
      { text: { en: "By tomorrow this town remembers a very different version of tonight." }, cost: "3" },
    ],
    subclasses: [
      {
        id: "wordsmith",
        slug: "bard-wordsmith",
        name: { en: "Wordsmith" },
        tagline: { en: "You have never needed to raise your voice." },
        domain: { en: "Persuasion, courts, rumour, negotiation, reputation." },
        ruleBreaker: {
          name: { en: "Word Ahead" },
          text: { en: "When you arrive somewhere new, you decide what they have already heard about you." },
        },
        examples: [
          { text: { en: "Give me a minute in the room. I'll know what they want." }, cost: "1" },
          { text: { en: "This is an execution. I'm making it a trial." }, cost: "2" },
          { text: { en: "The story reaches the next town before we do." }, cost: "2" },
        ],
      },
      {
        id: "warsinger",
        slug: "bard-warsinger",
        name: { en: "Warsinger" },
        tagline: { en: "War has a rhythm and you are keeping it." },
        domain: { en: "Rhythm, courage, coordination, and organised violence." },
        ruleBreaker: {
          name: { en: "Marching Song" },
          text: { en: "Spending your Inspiration also grants that ally a free Move." },
        },
        examples: [
          { text: { en: "One horn call. My party knows exactly what it means." }, cost: "0" },
          { text: { en: "Six frightened farmers. They hold one more round." }, cost: "2" },
          { text: { en: "Everyone strikes on the beat. Now." }, cost: "3" },
        ],
      },
      {
        id: "taleweaver",
        slug: "bard-taleweaver",
        name: { en: "Taleweaver" },
        tagline: { en: "The difference between a lie and a story is how well it's told." },
        domain: { en: "Illusion, glamour, false memory, and things that seem." },
        ruleBreaker: {
          name: { en: "It Looked Real" },
          text: {
            en: "1 Energy: an illusion fills a zone and engages every sense. It fails only when something touches it.",
          },
        },
        examples: [
          { text: { en: "There's an army on that ridge. There isn't." }, cost: "2" },
          { text: { en: "For tonight, I'm someone else entirely." }, cost: "2" },
          { text: { en: "This room remembers a conversation that never happened." }, cost: "3" },
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
    hook: { en: "It took eleven years. You have notes." },
    playsLike: {
      en: "Preparation rewarded. Choose well at the start of the day and you're the most efficient caster at the table; get caught outside your preparation and you're a person in a robe. The most versatile class across a whole session, and the most punishing of laziness.",
    },
    hpBase: 6,
    priority: ["INT", "CON", "DEX"],
    domain: { en: "Studied magic. Anything you have written down." },
    kit: { en: "A grimoire, robes, a focus, ink and vellum, and one experiment that went badly." },
    signature: {
      name: { en: "Grimoire" },
      text: {
        en: "On each Long Rest, prepare three Focuses — narrow themes from your Domain (fire · doors · memory · weight · water). Effects inside a prepared Focus cost −1 Energy.",
      },
    },
    signatureExtra: {
      name: { en: "Ritual" },
      text: { en: "You may cast any Effect as a Ritual: ten minutes, no Energy at all — but never during combat." },
    },
    examples: [
      { text: { en: "A spark, a gust, the page turns itself." }, cost: "0" },
      { text: { en: "The lock remembers being open." }, cost: "1" },
      { text: { en: "Fire. In the doorway. All of them." }, cost: "2" },
      { text: { en: "I unmake the bridge behind us." }, cost: "2" },
      { text: { en: "That spell is not going to happen." }, cost: "= its cost" },
      { text: { en: "Give me ten minutes and this circle will hold anything." }, cost: "0 · Ritual" },
    ],
    subclasses: [
      {
        id: "illusionist",
        slug: "wizard-illusionist",
        name: { en: "Illusionist" },
        tagline: { en: "Reality is a consensus and you hold a minority opinion." },
        domain: { en: "Light, sound, seeming, and belief." },
        ruleBreaker: {
          name: { en: "Doubt" },
          text: { en: "Anyone trying to disbelieve your illusions rolls at disadvantage." },
        },
        examples: [
          { text: { en: "There's a wall here. There isn't. But there is." }, cost: "1" },
          { text: { en: "I'm not visible until I do something about it." }, cost: "2" },
          { text: { en: "He believes he is burning. So he burns." }, cost: "3" },
        ],
      },
      {
        id: "wardmaster",
        slug: "wizard-wardmaster",
        name: { en: "Wardmaster" },
        tagline: { en: "Magic is mostly a question of what you don't let in." },
        domain: { en: "Barriers, binding, banishment, and protection." },
        ruleBreaker: {
          name: { en: "Standing Ward" },
          text: { en: "A ward is always up. The first Level × 4 damage you take each scene is absorbed." },
        },
        examples: [
          { text: { en: "Nothing crosses this circle." }, cost: "2" },
          { text: { en: "Whatever bound this — I'm unbinding it." }, cost: "2" },
          { text: { en: "Back where you came from." }, cost: "4" },
        ],
      },
      {
        id: "diviner",
        slug: "wizard-diviner",
        name: { en: "Diviner" },
        tagline: { en: "You have read ahead." },
        domain: { en: "Knowledge, scrying, portents, and the shape of what is coming." },
        ruleBreaker: {
          name: { en: "Foreseen" },
          text: {
            en: "At the start of each session, roll a d20 and write it down. Once, you may replace any roll at the table — yours, an ally's, or the Story God's — with that number.",
          },
        },
        examples: [
          { text: { en: "Move. Three seconds before it mattered." }, cost: "1" },
          { text: { en: "I'm watching a room I'm not in." }, cost: "2" },
          { text: { en: "I know his true name. I've known it since Tuesday." }, cost: "3" },
        ],
      },
      {
        id: "transmuter",
        slug: "wizard-transmuter",
        name: { en: "Transmuter" },
        tagline: { en: "Nothing is what it is. It is only what it currently is." },
        domain: { en: "Matter, form, weight, state, and change." },
        ruleBreaker: {
          name: { en: "Nothing Is Fixed" },
          text: { en: "Once per scene, permanently change one property of an object you can touch. Free." },
        },
        examples: [
          { text: { en: "The floor under him is water now." }, cost: "1" },
          { text: { en: "That door is paper. It was oak a moment ago." }, cost: "1" },
          { text: { en: "The falling stone weighs twice what it did." }, cost: "2" },
        ],
      },
    ],
  },

  {
    id: "sorcerer",
    num: 9,
    group: "magic",
    name: { en: "Sorcerer", tr: "Sihirbaz" },
    hook: { en: "You did not learn this. It was already in you and it has been waiting." },
    playsLike: {
      en: "Raw and flexible. Your Bend lets you reshape any Effect on the fly, so you improvise better than anyone. No book to lose, no patron to answer to — just a bloodline that occasionally has ideas of its own. The most elemental class, and the one where the subclass matters most.",
    },
    hpBase: 6,
    priority: ["CON", "DEX", "CHA"],
    domain: { en: "Magic that lives in your blood. It never needed a book." },
    kit: { en: "Whatever you were wearing when it first happened, and the mark it left." },
    signature: {
      name: { en: "Bend" },
      text: {
        en: "When you produce an Effect, spend 1 extra Energy to apply one of these: Twin (a second target) · Reach (one zone further) · Silent (no words, no gestures) · Quick (costs no Action) · Brutal (maximise one damage die).",
      },
    },
    signatureExtra: {
      name: { en: "Wild Surge" },
      text: {
        en: "You may cast without paying. Roll d20: on 10+ it's free. On 9 or less you pay double and the Story God adds a complication.",
      },
    },
    examples: [
      { text: { en: "Sparks off my hand. Just enough to be a problem." }, cost: "0" },
      { text: { en: "He's on fire and he doesn't know why yet." }, cost: "1" },
      { text: { en: "Both of them. Same instant." }, cost: "2 · Twin" },
      { text: { en: "I don't say anything, I don't move, and it happens anyway." }, cost: "2 · Silent" },
      { text: { en: "The whole corridor. From here." }, cost: "3" },
    ],
    subclasses: [
      {
        id: "pyromancer",
        slug: "sorcerer-pyromancer",
        name: { en: "Pyromancer" },
        tagline: { en: "Fire has never once hurt you and you stopped mentioning it." },
        domain: { en: "Fire, heat, ash, and light." },
        ruleBreaker: {
          name: { en: "Unburnt" },
          text: { en: "Fire never harms you, and yours never harms your allies unless you want it to." },
        },
        examples: [
          { text: { en: "I walk through the burning house at a normal pace." }, cost: "0" },
          { text: { en: "The heat gets there before the flame does." }, cost: "1" },
          { text: { en: "Fire that doesn't consume what it burns." }, cost: "2" },
        ],
      },
      {
        id: "cryomancer",
        slug: "sorcerer-cryomancer",
        name: { en: "Cryomancer" },
        tagline: { en: "You are cold to the touch and it is not a metaphor." },
        domain: { en: "Ice, cold, stillness, and slowing." },
        ruleBreaker: {
          name: { en: "Chill" },
          text: { en: "Any creature damaged by your cold is Slowed until the end of its next turn. No save." },
        },
        examples: [
          { text: { en: "I freeze the wound shut." }, cost: "1" },
          { text: { en: "A bridge. Across running water. Give me a second." }, cost: "2" },
          { text: { en: "Nobody in this room moves quickly. Including me." }, cost: "3" },
        ],
      },
      {
        id: "stormblood",
        slug: "sorcerer-stormblood",
        name: { en: "Stormblood" },
        tagline: { en: "The pressure drops when you get angry." },
        domain: { en: "Lightning, thunder, wind, and pressure." },
        ruleBreaker: {
          name: { en: "Arc" },
          text: { en: "Your lightning Effects jump to a second target at no additional cost. Always." },
        },
        examples: [
          { text: { en: "I ride the gust up two floors." }, cost: "1" },
          { text: { en: "The bolt finds the man in armor, not the man beside him." }, cost: "1" },
          { text: { en: "Thunder. It empties their lungs." }, cost: "2" },
        ],
      },
      {
        id: "dragonblood",
        slug: "sorcerer-dragonblood",
        name: { en: "Dragonblood" },
        tagline: { en: "The scales showed up around your fourteenth birthday." },
        domain: { en: "Draconic power: breath, scale, wing, and the weight of an old thing's stare." },
        ruleBreaker: {
          name: { en: "Breath" },
          text: { en: "2 Energy: 3d6 of your element across an entire zone. No Bend required, no cost increase." },
        },
        examples: [
          { text: { en: "Wings. For as long as I need them." }, cost: "1" },
          { text: { en: "I look at the mob. The mob stops." }, cost: "2" },
          { text: { en: "I speak in a voice the ground can hear." }, cost: "2" },
        ],
      },
      {
        id: "elderblood",
        slug: "sorcerer-elderblood",
        name: { en: "Elderblood" },
        tagline: { en: "Your bloodline predates the words currently used for magic." },
        domain: { en: "Primordial magic: the raw stuff, from before anyone divided it into elements." },
        ruleBreaker: {
          name: { en: "Before Names" },
          text: {
            en: "Once per scene, produce an Effect outside your Class Domain at normal cost and with no disadvantage. It was all one thing, once.",
          },
        },
        examples: [
          { text: { en: "It isn't any school you'd recognise." }, cost: "1" },
          { text: { en: "A word from before there were words." }, cost: "2" },
          { text: { en: "I decline to accept that this is a fire spell." }, cost: "2" },
        ],
      },
    ],
  },

  {
    id: "warlock",
    num: 10,
    group: "magic",
    name: { en: "Warlock", tr: "Warlock" },
    hook: { en: "You didn't earn this and you didn't inherit it. You agreed to terms." },
    playsLike: {
      en: "Burst and consequence. Your Energy comes back on a Short Rest, so where other casters ration, you spend everything and then rest. The trade is that something out there has a claim on you, and the Story God gets to use it. The darkest class in the game, and the one that generates the most story on its own.",
    },
    hpBase: 8,
    priority: ["WIS", "CON", "CHA"],
    domain: { en: "Borrowed power. Whatever your Patron is willing to lend, and it is not always the same amount." },
    kit: { en: "A focus your Patron chose for you, light armor, and the terms of the agreement, if you were given a copy." },
    signature: {
      name: { en: "The Bargain" },
      text: { en: "You recover your full Energy on a Short Rest, not half." },
    },
    signatureExtra: {
      name: { en: "The Debt" },
      text: {
        en: "Once per session the Story God may call it in: an instruction, a demand, a price. You may refuse — and lose your Signature and Rule Breaker until you make amends. Your Patron does not explain and does not negotiate.",
      },
    },
    examples: [
      { text: { en: "Something whispers his name and he flinches." }, cost: "0" },
      { text: { en: "I show him what's standing behind me. He runs." }, cost: "1" },
      { text: { en: "I ask it what's past the door. It tells me. It enjoys telling me." }, cost: "1" },
      { text: { en: "The shadows in this room are mine now." }, cost: "2" },
      { text: { en: "Everything in that hallway starts to rot." }, cost: "3" },
    ],
    subclasses: [
      {
        id: "the-fiend",
        slug: "warlock-the-fiend",
        name: { en: "The Fiend" },
        tagline: { en: "A contract, signed, with a fixed term you did not read carefully." },
        domain: { en: "Hellfire, contracts, temptation, and curses that stick." },
        ruleBreaker: {
          name: { en: "Blood Price" },
          text: { en: "Pay any Energy cost with HP instead, at 2 HP per Energy. Your Patron finds this funny." },
        },
        examples: [
          { text: { en: "It's a genuinely good deal. That's the problem with it." }, cost: "1" },
          { text: { en: "The fire burns the guilty hotter. It knows the difference." }, cost: "2" },
          { text: { en: "The curse lifts the moment he admits what he did." }, cost: "2" },
        ],
      },
      {
        id: "the-void",
        slug: "warlock-the-void",
        name: { en: "The Void" },
        tagline: { en: "There is a space between the stars and something in it noticed you." },
        domain: { en: "Madness, distance, the mind, and things never meant to be perceived." },
        ruleBreaker: {
          name: { en: "Telepathy" },
          text: { en: "You speak mind to mind with anything that has a mind, at any distance you can perceive it." },
        },
        examples: [
          { text: { en: "I've known him ten seconds. I know what he's afraid of." }, cost: "1" },
          { text: { en: "The scream happens inside his head only." }, cost: "2" },
          { text: { en: "I show her one true thing. She doesn't recover." }, cost: "3" },
        ],
      },
      {
        id: "the-hunger",
        slug: "warlock-the-hunger",
        name: { en: "The Hunger" },
        tagline: { en: "It is not evil. It is just always eating, and now so are you." },
        domain: { en: "Consumption, decay, plague, and the slow taking of things." },
        ruleBreaker: {
          name: { en: "Feed" },
          text: { en: "When a creature dies within Near of you, gain 2 Energy and heal d6." },
        },
        examples: [
          { text: { en: "That wound won't close while I'm in the room." }, cost: "1" },
          { text: { en: "The gate starts to rot. Wood first." }, cost: "2" },
          { text: { en: "I take the memory out of him and keep it." }, cost: "2" },
        ],
      },
    ],
  },

  {
    id: "necromancer",
    num: 11,
    group: "magic",
    name: { en: "Necromancer", tr: "Nekromant" },
    hook: { en: "Death is not a wall. It is a door with a specific and knowable mechanism." },
    playsLike: {
      en: "A resource engine. Every corpse on the field is fuel, so the longer a fight runs the stronger you get. You're a caster who wants the body count. Socially you're a liability in most towns, which is part of the fun.",
    },
    hpBase: 8,
    priority: ["INT", "CON", "CHA"],
    domain: { en: "Death, the dead, and everything that leaks out of them." },
    kit: { en: "Dark robes, a focus of bone or iron, a surgeon's tools, and a list of names." },
    signature: {
      name: { en: "Harvest" },
      text: {
        en: "When any creature dies within Near of you, gain 2 Energy. No limit, no cooldown, and it does not care whose side they were on.",
      },
    },
    examples: [
      { text: { en: "The corpse answers. Briefly, and it is not glad to." }, cost: "1" },
      { text: { en: "He gets up. He works for me now, for about a day." }, cost: "2" },
      { text: { en: "Everything living in that room feels its strength going elsewhere." }, cost: "2" },
      { text: { en: "I take the wound off her and put it on him." }, cost: "2" },
      { text: { en: "The dead in this graveyard stand up. All of them." }, cost: "4" },
    ],
    subclasses: [
      {
        id: "bonewright",
        slug: "necromancer-bonewright",
        name: { en: "Bonewright" },
        tagline: { en: "The frame is the honest part. Everything else was decoration." },
        domain: { en: "Bone, marrow, structure, and the architecture of a body." },
        ruleBreaker: {
          name: { en: "Ossuary" },
          text: {
            en: "You always have a servant: a skeleton with Level × 3 HP that acts on your turn. If it breaks, build another over any rest, out of whatever is lying around.",
          },
        },
        examples: [
          { text: { en: "I hold the bone. I know how it died." }, cost: "1" },
          { text: { en: "Armor. Grown out of my own ribs." }, cost: "2" },
          { text: { en: "A wall. Interlocking. It used to be several people." }, cost: "2" },
        ],
      },
      {
        id: "bloodletter",
        slug: "necromancer-bloodletter",
        name: { en: "Bloodletter" },
        tagline: { en: "Life is a fluid, and fluids can be moved." },
        domain: { en: "Blood, vitality, wounds, and trading one body's health for another's." },
        ruleBreaker: {
          name: { en: "The Exchange" },
          text: {
            en: "Pay any Energy cost with HP at 2 HP per Energy — your own, or that of any willing or Downed creature you're touching.",
          },
        },
        examples: [
          { text: { en: "His blood. Her wound. It's a simple transfer." }, cost: "2" },
          { text: { en: "I've tasted his blood. Now it boils." }, cost: "3" },
          { text: { en: "I know the rhythm of that heart. I can stop it from here." }, cost: "4" },
        ],
      },
      {
        id: "cursebearer",
        slug: "necromancer-cursebearer",
        name: { en: "Cursebearer" },
        tagline: { en: "You don't have to be there when it happens." },
        domain: { en: "Curses, hexes, slow rot, and consequences that arrive late." },
        ruleBreaker: {
          name: { en: "It Keeps" },
          text: {
            en: "Your curses have no duration. They last until their condition is met, and you set the condition when you cast them.",
          },
        },
        examples: [
          { text: { en: "His name can't be spoken now without pain." }, cost: "2" },
          { text: { en: "The hex triggers if he lies to me. Only then." }, cost: "2" },
          { text: { en: "Bad luck. For him, and for his children." }, cost: "3" },
        ],
      },
      {
        id: "spiritbinder",
        slug: "necromancer-spiritbinder",
        name: { en: "Spiritbinder" },
        tagline: { en: "The body is the part that ends." },
        domain: { en: "Souls, ghosts, memory, and what remains when nothing physical does." },
        ruleBreaker: {
          name: { en: "The Dead Speak Freely" },
          text: {
            en: "You see and speak with the dead at all times, at no cost. They see you too, and some of them have been waiting.",
          },
        },
        examples: [
          { text: { en: "What did you see, the night you died?" }, cost: "0" },
          { text: { en: "You're going on now. It isn't a request." }, cost: "2" },
          { text: { en: "The spirit goes into the blade. It agreed. Mostly." }, cost: "3" },
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
    hook: { en: "You are not asking. You are relaying." },
    playsLike: {
      en: "The safety net with teeth. You keep people alive, you cancel the thing that was about to ruin the encounter, and once a session you get to ask the universe for a favour it cannot refuse. Steady rather than flashy — until the Miracle, which is the single most open-ended ability in the game.",
    },
    hpBase: 10,
    priority: ["WIS", "CON", "STR / CHA"],
    domain: { en: "Your god's portfolio, and the faith of the people around you." },
    kit: { en: "A holy symbol, medium armor, a shield or a staff, and a text you have read too many times." },
    signature: {
      name: { en: "Miracle" },
      text: {
        en: "Once per session, ask your god for something outside the rules entirely. The Story God decides what happens and what it costs — but never says no outright. A Miracle always does something. It may not be what you asked for.",
      },
    },
    examples: [
      { text: { en: "Be still. You're not bleeding any more." }, cost: "1" },
      { text: { en: "Every one of them. On their feet. Right now." }, cost: "2" },
      { text: { en: "This ground is holy as of this moment." }, cost: "2" },
      { text: { en: "That is not going to touch her." }, cost: "3" },
      { text: { en: "I need him back and I do not care what it costs." }, cost: "Miracle" },
    ],
    subclasses: [
      {
        id: "healer",
        slug: "cleric-healer",
        name: { en: "Healer" },
        tagline: { en: "The war will end. People still have to live afterwards." },
        domain: { en: "Life, mending, disease, exhaustion, and keeping people going." },
        ruleBreaker: {
          name: { en: "Hands That Do Not Fail" },
          text: { en: "Your healing Effects never require a roll and never cost more than 2 Energy, whatever their scale." },
        },
        examples: [
          { text: { en: "Bone set. Four seconds." }, cost: "1" },
          { text: { en: "The plague stops at this ward. The whole village." }, cost: "2" },
          { text: { en: "She's been dead under an hour. That's still negotiable." }, cost: "4" },
        ],
      },
      {
        id: "war-priest",
        slug: "cleric-war-priest",
        name: { en: "War Priest" },
        tagline: { en: "Your god has a position on this and it is not neutral." },
        domain: { en: "Battle, courage, righteous force, and the sanctity of a good cause." },
        ruleBreaker: {
          name: { en: "Armed Faith" },
          text: { en: "Use WIS for weapon attacks and damage. Your weapon is a holy symbol." },
        },
        examples: [
          { text: { en: "This line does not break. I've said so." }, cost: "2" },
          { text: { en: "The blade hurts that kind of thing specifically." }, cost: "2" },
          { text: { en: "Shield wall. Hold." }, cost: "2" },
        ],
      },
      {
        id: "dark-preacher",
        slug: "cleric-dark-preacher",
        name: { en: "Dark Preacher" },
        tagline: { en: "Some gods are answered. Yours is negotiated with." },
        domain: { en: "Fear, sacrifice, secrets, and the god whose name is not written down." },
        ruleBreaker: {
          name: { en: "Tithe" },
          text: {
            en: "Take HP from a willing or Downed creature to pay Energy, at 2 HP per Energy. Your god considers this normal.",
          },
        },
        examples: [
          { text: { en: "The blessing works. It costs her something." }, cost: "2" },
          { text: { en: "He intended to keep that. He doesn't now." }, cost: "3" },
          { text: { en: "They don't remember joining. They still come every week." }, cost: "3" },
        ],
      },
    ],
  },

  {
    id: "shaman",
    num: 13,
    group: "faith",
    name: { en: "Shaman", tr: "Şaman" },
    hook: { en: "The world is not scenery. It is a crowd, and you are the only one being polite." },
    playsLike: {
      en: "The most flexible non-combat class in the game and a strong controller in a fight. You change shape, you change ground, you change weather. Where the Wizard prepares and the Sorcerer improvises, you negotiate — with animals, plants, spirits, and the terrain itself.",
    },
    hpBase: 10,
    priority: ["WIS", "CON", "DEX"],
    domain: { en: "The living world: beasts, weather, growth, and the spirits in all of it." },
    kit: { en: "A totem or staff, hide armor, herbs, and something that used to be alive." },
    signature: {
      name: { en: "Wild Shape" },
      text: {
        en: "2 Energy: become a beast for a scene. You keep your HP, Energy, and mind; you gain the beast's body and movement plus a d6 natural attack. Wolf (speed, scent) · Bird (flight, sight) · Bear (+CON HP, d8 attack) · Serpent (water, squeezing into things).",
      },
    },
    examples: [
      { text: { en: "I ask the crows what came through here." }, cost: "0" },
      { text: { en: "The roots take his ankles." }, cost: "1" },
      { text: { en: "Fog. All of it. Nobody sees anyone." }, cost: "2" },
      { text: { en: "Give me ten minutes and it will be raining." }, cost: "2" },
      { text: { en: "The whole treeline moves." }, cost: "4" },
    ],
    subclasses: [
      {
        id: "wild-heart",
        slug: "shaman-wild-heart",
        name: { en: "Wild Heart" },
        tagline: { en: "You were raised by something and it wasn't people." },
        domain: { en: "Beasts, packs, the hunt, and instinct." },
        ruleBreaker: {
          name: { en: "Beast Speech" },
          text: { en: "Animals will always help you, as long as it costs them little. No roll, no cost." },
        },
        examples: [
          { text: { en: "As a wolf, I'm a wolf. Anyone watching agrees." }, cost: "0" },
          { text: { en: "I know this valley through the things that live in it." }, cost: "1" },
          { text: { en: "The pack hunts with us. For tonight." }, cost: "3" },
        ],
      },
      {
        id: "storm",
        slug: "shaman-storm",
        name: { en: "Storm" },
        tagline: { en: "You are on good terms with the weather and it shows." },
        domain: { en: "Wind, lightning, rain, sea, and pressure." },
        ruleBreaker: {
          name: { en: "Rides the Air" },
          text: { en: "You move one extra zone in any direction, including straight up." },
        },
        examples: [
          { text: { en: "Lightning. On that one specifically." }, cost: "2" },
          { text: { en: "Wind at our backs. Three days of it." }, cost: "2" },
          { text: { en: "The squall grounds the ship. It stays grounded." }, cost: "3" },
        ],
      },
      {
        id: "deep-root",
        slug: "shaman-deep-root",
        name: { en: "Deep Root" },
        tagline: { en: "Stone is slow, not stupid." },
        domain: { en: "Forests, stone, growth, patience, and poison." },
        ruleBreaker: {
          name: { en: "The Ground Answers" },
          text: {
            en: "1 Energy: reshape the terrain of a zone. Roots, walls, mud, cover, a hole where there wasn't one.",
          },
        },
        examples: [
          { text: { en: "The path closes behind us." }, cost: "1" },
          { text: { en: "Everything that's crossed this ground in a month — I know it." }, cost: "1" },
          { text: { en: "A season of growth. This afternoon." }, cost: "3" },
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
    hook: { en: "Magic is chemistry that hasn't been written down properly yet." },
    playsLike: {
      en: "A planner. You bank your power at rest and spend it as physical objects, which means you can hand your abilities to other people. The only class that can arm the whole party. Weak at improvising, extremely strong at preparing.",
    },
    hpBase: 8,
    priority: ["INT", "DEX", "CON"],
    domain: { en: "Substances, reactions, mechanisms, and what they do to a body." },
    kit: { en: "A portable lab, light armor, a light weapon, and a notebook of failures." },
    signature: {
      name: { en: "Brew" },
      text: {
        en: "On each Short or Long Rest, prepare INT + Level doses. A dose is one Effect, priced normally — but paid for at rest, not in the moment. Anyone can use a dose. Hand them out. Doses spoil at your next rest, so hoarding does not work.",
      },
    },
    examples: [
      { text: { en: "Give me a minute with the body and I'll tell you what killed it." }, cost: "0" },
      { text: { en: "Acid. Straight through the hinges." }, cost: "1 dose" },
      { text: { en: "Drink this. You won't feel the arrow for about an hour." }, cost: "1 dose" },
      { text: { en: "It's not a bomb. It's a lot of smoke and a very loud noise." }, cost: "2 doses" },
      { text: { en: "Everyone takes one. Break it on the ground if things go wrong." }, cost: "doses" },
    ],
    subclasses: [
      {
        id: "bombardier",
        slug: "alchemist-bombardier",
        name: { en: "Bombardier" },
        tagline: { en: "The trick is the shape of the container, not the contents." },
        domain: { en: "Explosives, acid, smoke, shrapnel, and pressure." },
        ruleBreaker: {
          name: { en: "Wide Blast" },
          text: { en: "Your thrown doses hit an entire zone, and you choose who they skip." },
        },
        examples: [
          { text: { en: "Smoke. It only blinds the ones who weren't expecting it." }, cost: "1 dose" },
          { text: { en: "Anything with a hinge, I can open." }, cost: "2 doses" },
          { text: { en: "The wall comes down. On a schedule I set." }, cost: "3 doses" },
        ],
      },
      {
        id: "elixirist",
        slug: "alchemist-elixirist",
        name: { en: "Elixirist" },
        tagline: { en: "The body is a system, and systems accept input." },
        domain: { en: "Potions, poisons, transformation, and the limits of a body." },
        ruleBreaker: {
          name: { en: "On Tap" },
          text: { en: "Drinking a dose is a free action, and doses you drink yourself last the whole scene." },
        },
        examples: [
          { text: { en: "Drink it. You'll be stronger than you should be, briefly." }, cost: "2 doses" },
          { text: { en: "An antidote. I've only ever heard the poison described." }, cost: "2 doses" },
          { text: { en: "Tonight I'm his height and his build." }, cost: "2 doses" },
        ],
      },
      {
        id: "golemwright",
        slug: "alchemist-golemwright",
        name: { en: "Golemwright" },
        tagline: { en: "You got tired of relying on people." },
        domain: { en: "Constructs, clockwork, animation, and machines that keep working." },
        ruleBreaker: {
          name: { en: "The Machine" },
          text: {
            en: "You have a construct with Level × 6 HP. It acts on your turn and hits for d8. Rebuild it over a Long Rest if destroyed.",
          },
        },
        examples: [
          { text: { en: "I send it in. There's no guilt involved." }, cost: "0" },
          { text: { en: "It held the door for three days while we were gone." }, cost: "1 dose" },
          { text: { en: "I fit it with an arm for taking hits meant for me." }, cost: "2 doses" },
        ],
      },
    ],
  },
];

export const CLASS_BY_ID = new Map(CLASSES.map((c) => [c.id, c]));
