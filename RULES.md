# PAPER & DICE — Core Rules

> A simplified tabletop RPG for playing with friends over the web.
> One Story God narrates and adjudicates. Everyone else plays a character.

*Working title. Rename freely.*

---

## 1. The Table

**The Story God (SG)** describes the world, plays every creature in it, sets difficulties, and decides what happens. The SG has no character sheet, no HP, and no stats — only authority. The SG may roll openly or in secret.

**Players** each control one character defined by a **Character Paper** (sheet). They declare what their character tries to do; the SG decides whether it needs a roll.

**Golden Rule:** if the rules and the story disagree, the story wins. The SG may overrule any rule below.

---

## 2. The One Roll

Everything in this game resolves the same way.

```
d20 + Ability + Training vs Difficulty
```

- **Ability** — one of the six scores, value 1–5. The score *is* the modifier. No lookup table.
- **Training** — `+2` if the character is trained in a relevant skill, `+0` otherwise.
- **Difficulty** — set by the SG.

| Difficulty | Target | Feels like |
|---|---|---|
| Easy | 8 | You'd probably manage this on a bad day |
| Moderate | 12 | A real attempt, could go either way |
| Hard | 16 | Requires talent or preparation |
| Extreme | 20 | Heroes only |

**Meet or beat the number to succeed.**

### Critical Results
- **Natural 20** — critical success. In combat, double the weapon/spell **dice** (not the modifier). Outside combat, you succeed *and* gain something extra.
- **Natural 1** — critical failure. You fail *and* the SG introduces a complication.

### Advantage & Disadvantage
Roll **2d20** and keep the higher (advantage) or lower (disadvantage). They never stack — one of each cancels out, and two of the same is still just one.

Grant advantage for good ideas, good positioning, and good preparation. This is the SG's main lever and should be used often.

### Contests
When two creatures oppose each other directly (arm wrestling, a chase, stealth vs. watchfulness), both roll and the higher total wins. Ties go to the defender.

---

## 3. Abilities

| Ability | Governs |
|---|---|
| **STR** — Strength | Melee power, lifting, forcing, grappling |
| **DEX** — Dexterity | Aim, reflexes, stealth, balance, Defense |
| **CON** — Constitution | Health, stamina, resisting poison and exhaustion |
| **INT** — Intelligence | Knowledge, deduction, craft, arcane study |
| **WIS** — Wisdom | Awareness, intuition, willpower, faith, nature |
| **CHA** — Charisma | Presence, persuasion, deceit, force of personality |

Scores run **1 to 5** in normal play. Nothing mortal exceeds 6.

---

## 4. Making a Character

1. **Pick a Class** — see `CLASSES.md`. This sets your Hit Point Base, Primary Ability, and signature mechanic.
2. **Assign Abilities** — every ability starts at **1**. Distribute **8 points** among them. No ability may exceed **4** at level 1.
3. **Choose 3 Trained Skills** — from the list in §5.
4. **Take Starting Gear** — your class's kit, plus one personal item that means something to you.
5. **Answer three questions** — Where are you from? Who do you owe? What do you want? The SG will use all three against you.

Characters begin at **level 1**. Subclass is chosen at **level 3**, not at creation.

### Derived Values

| Value | Formula |
|---|---|
| **Hit Points** | `Class HP Base + (CON × 3) + ((Level − 1) × 4)` |
| **Energy** | `(Primary Ability × 3) + ((Level − 1) × 2)` |
| **Defense** | `10 + DEX + Armor + Shield` |
| **Initiative** | `d20 + DEX` |

> **Heavy armor exception:** DEX does not add to Defense. Use `14 + Shield` instead.

**Energy** fuels every class ability and spell — there are no spell slots, no per-day counters, no separate resource pools. One number, spent and recovered.

---

## 5. Skills & Training

Being **trained** in a skill grants `+2` on rolls where it applies. Skills are tags, not separate stats — the SG decides which one fits.

| Ability | Skills |
|---|---|
| STR | Athletics, Force |
| DEX | Acrobatics, Stealth, Sleight of Hand |
| CON | Endurance |
| INT | Lore, Investigation, Craft |
| WIS | Perception, Insight, Survival, Medicine |
| CHA | Persuasion, Deception, Intimidation, Performance |

You start with **3** trained skills and gain one more at levels **4** and **8**.

---

## 6. Combat

### Positioning — Zones, not grids
There is no battle map. Every combat is divided into abstract **zones**:

**Engaged** → **Near** → **Far** → **Distant**

- **Engaged** — toe to toe. Melee weapons only work here.
- **Near** — same room, one move away. Thrown weapons, most spells.
- **Far** — across the hall. Bows, crossbows, long-range spells.
- **Distant** — sniping range or off the field entirely.

A **Move** shifts you one zone. Leaving *Engaged* lets the enemy take a free attack unless you Disengage.

### The Turn
Roll initiative once at the start (`d20 + DEX`), act in descending order. On your turn you get:

- **1 Action** — attack, cast, use an ability, help an ally, or do something clever
- **1 Move** — shift one zone, stand up, or take cover
- **Free interactions** — draw a weapon, shout a sentence, drop an item

### Attacking

```
Attack:  d20 + STR (melee) or DEX (ranged/finesse) + Training  vs  Defense
Damage:  weapon die + the same ability
```

| Weapon | Die | Notes |
|---|---|---|
| Light (dagger, club) | d4 | Can be thrown to Near; can dual-wield |
| Simple (sword, spear, axe) | d6 | — |
| Martial (longsword, warhammer) | d8 | Requires STR 2+ |
| Heavy (greataxe, maul) | d10 | Two-handed, requires STR 3+ |
| Bow | d6 | Reaches Far |
| Crossbow | d8 | Reaches Far, costs your Move to reload |
| Unarmed | d4 | — |

| Armor | Defense | Notes |
|---|---|---|
| None | +0 | — |
| Light (leather) | +1 | — |
| Medium (chain) | +2 | Disadvantage on Stealth |
| Heavy (plate) | Defense = 14 | DEX does not apply; disadvantage on Stealth |
| Shield | +1 | Stacks with any armor; occupies a hand |

### Common Actions
- **Attack** — as above.
- **Exert** — spend Energy to create an Effect within your Domain (§10). This covers every spell, every stunt, and every class ability.
- **Help** — grant an ally advantage on their next roll.
- **Disengage** — leave Engaged without provoking a free attack.
- **Defend** — until your next turn, attacks against you have disadvantage.
- **Improvise** — anything else. The SG picks an ability and a difficulty.

---

## 7. Damage, Dying, and Healing

At **0 HP** you are **Downed** — prone, unable to act.

On each of your turns while Downed, roll a bare **d20**:
- **10+** → one success
- **9 or less** → one failure
- **Natural 20** → you stand up immediately with 1 HP
- **Natural 1** → counts as two failures

**3 successes** and you stabilize. **3 failures** and you die.
Any healing while Downed brings you back up and clears the tally.

An ally may spend an Action to stabilize you with a **Medicine check vs. 12**.

Damage taken while at 0 HP counts as a failure. A critical hit at 0 HP counts as two.

---

## 8. Rest

| Rest | Time | Recovers |
|---|---|---|
| **Short Rest** | ~1 hour | HP equal to `CON × 2`, and **half** your Energy (round up) |
| **Long Rest** | ~8 hours | **All** HP and Energy; resets once-per-day abilities |

You may take **two Short Rests** between Long Rests.

*Pact Bearers are the exception: they recover their **full** Energy on a Short Rest.*

---

## 9. Advancement

Levels **1 to 10**. There is no XP. The SG awards a level when the story reaches a milestone — usually every 2–3 sessions.

| Level | What you gain |
|---|---|
| **Every level** | `+4` HP and `+2` Energy, automatically |
| **3** | **Subclass** — a narrower Domain and a Rule Breaker |
| **4** and **8** | `+1` ability point and `+1` trained skill |
| **5** | If you fight with weapons, the Attack action now gives you **two attacks** |
| **3, 5, 7, 9** | Your **Effect cap** rises (§10) — you can attempt bigger things |
| **10** | **Ascendant.** Once per Long Rest, one Effect ignores its Energy cost entirely. |

That is the whole progression. Your character does not grow by collecting a longer list of buttons — it grows because the pool you spend from gets deeper and the ceiling you spend up to gets higher. What you *do* with it was always up to you.

Ability cap is **5** from level 4, and **6** from level 8.

---

## 10. Domains & Effects

**There is no spell list.** There is no maneuver list either.

Instead, every character has a **Domain** — the slice of the world their power reaches into. Inside it, they invent. The Story God prices what they invent.

This is the same rule for a wizard's fireball and a knight's improbable chandelier stunt. Only the Domain differs.

### Your Domain
- **Class Domain** — broad. A Wizard's is *studied magic*; a Knight's is *steel, body, and the shape of a battlefield*.
- **Subclass Domain** — narrow and personal. A Pyromancer's is *fire, heat, ash, and light*.

| Where the effect falls | Cost |
|---|---|
| Inside your **Subclass** Domain | **−1 Energy** (minimum 1) |
| Inside your **Class** Domain | normal price |
| Outside your Class Domain | **double**, and roll with **disadvantage** |
| Outside anything your character could plausibly reach | the Story God says no |

### Exert — the universal action
Spend Energy to create an **Effect** within your Domain. Describe it; the SG prices it; you roll.

**Base cost: 1 Energy.** Then add:

| The effect… | +Energy |
|---|---|
| deals more than one die of damage | **+1** per extra `d6` |
| hits everyone in a zone, or several targets | **+1** |
| reaches Far or Distant | **+1** |
| imposes a Condition (§11) | **+1** |
| lasts the whole scene | **+1** |
| lasts beyond the scene — hours, days | **+2** |
| does something no mortal can do — fly, breathe water, walk through stone | **+2** |

### The Cap
You may never spend more than this on a single Effect, no matter how much Energy you have:

| Levels | Max Energy per Effect |
|---|---|
| 1–2 | 2 |
| 3–4 | 3 |
| 5–6 | 4 |
| 7–8 | 5 |
| 9–10 | 6 |

This is what keeps power in check. A level-2 character *may* describe levelling the village — it just prices at 5 Energy and they can spend 2. No argument needed; the table answers.

### Rolling for it
Paying the cost gets you the attempt, not the result.

- **Against a creature's body** — `d20 + Primary + Training` vs. its Defense.
- **Against a creature's will** — it rolls `d20 + Ability` vs. your **Save DC**: `10 + Primary + Training`.
- **Against the world** — `d20 + Primary + Training` vs. a difficulty from §2.

**A failed Effect still spends the Energy.** A **natural 20** refunds it completely.

### Tricks
Any character may produce a **0-Energy Trick** inside their Domain: `d4` damage, or a minor convenience — a spark, a gust, a shove, a whisper carried across a room. Tricks never impose Conditions and never change the situation on their own.

### The Never List
No amount of Energy buys these. They require a Cleric's **Miracle**, or the Story God's explicit blessing:

- killing a creature outright without a roll
- controlling another player's character
- undoing something that has already happened
- creating gold, Energy, or permanent life from nothing
- knowing something the Story God has decided is unknowable

---

## 11. Conditions

| Condition | Effect |
|---|---|
| **Prone** | Your attacks have disadvantage; melee attacks against you have advantage. Standing costs your Move. |
| **Slowed** | You cannot Move, or moving costs your Action instead. |
| **Stunned** | You lose your entire turn. |
| **Frightened** | Disadvantage on all rolls while you can see the source. |
| **Poisoned** | Disadvantage on attacks and STR-based rolls. |
| **Blinded** | Your attacks have disadvantage; attacks against you have advantage. |
| **Grappled** | You cannot leave your zone. Escape with a STR or DEX contest. |
| **Burning** | Take `d6` at the start of each turn until you spend an Action to put it out. |
| **Downed** | At 0 HP. See §7. |

Unless stated otherwise, a condition ends when the affected creature succeeds on a **CON or WIS save vs. 12** at the end of its turn.

---

## 12. Inventory

Keep it light. Characters carry what makes sense, and the SG says when it stops making sense.

- **Carried** — up to `5 + STR` meaningful items. Rope, rations, and torches don't count individually; a **Kit** covers them.
- **Equipped** — one weapon set (or two hands' worth), one armor, one shield. Swapping in combat costs your Action.
- **Attunement** — you may benefit from at most **3 magic items** at once.

Currency is abstract: **Poor / Modest / Comfortable / Wealthy**. The SG says whether you can afford something. Track exact coin only if the group enjoys it.

---

## 13. What the Story God Actually Does

- **Call for rolls sparingly.** If failure isn't interesting, don't roll — just say yes.
- **Set difficulty before the roll**, and say it out loud.
- **Hand out advantage freely** for clever plans. It's the cheapest reward in the game.
- **Fail forward.** A failed roll should move the story, not stall it.
- **Roll in the open** for combat, and in secret for anything the players shouldn't know they failed.
- **You may always override a rule.** Say so when you do, and be consistent afterward.

---

*Classes and subclasses: see `CLASSES.md`.*
