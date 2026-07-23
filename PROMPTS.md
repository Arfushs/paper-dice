# Image Prompts

Prompts for all **14 class** and **51 subclass** images. Each heading is the exact filename the
app looks for — see `public/images/README.md`.

**Art direction:** dark fantasy anime character illustration. One figure, centred, filling the
frame, face always hidden, background nearly empty. These are pictures of a **class**, not
pictures of a place.

---

## The two rules that override everything

**1. The character fills the frame. The background is nearly empty.**

Class art is **full body, centred, top to bottom**. Subclass art is **waist-up, centred**. The
background is fog, a colour wash, or a faint silhouette — never a described place. If you catch
yourself writing a second sentence about the environment, delete it.

**2. No faces.**

Every character's face is hidden: a **closed visor**, a **deep hood with the face in complete
darkness**, a **mask**, or **heavy shadow**. No exceptions, no "features just visible", no
expressions, no ages.

Hidden faces also solve consistency — sixty-five obscured faces read as one deliberate art
direction, where sixty-five different faces never will. Silhouette, armour, weapon and pose
carry the character, and that is what a player is actually choosing between.

Two more, smaller:

- **The head is always in frame**, never cropped off by the frame edge.
- **Never a flat back view.** Three-quarter from behind is fine.

---

## Why the earlier attempts failed

Six tries to land this. The root cause was the same every time: **the prompts described scenes
rather than character art.** A prompt full of ruined arches, green hills, rain and glowing skies
produces a landscape painting that happens to contain a person — no amount of "the figure
dominates" beats it, because the words spent on scenery outnumber the words spent on the
character.

Keep this table. Every one of these phrases has been tried and every one broke the image:

| Phrase | What it produced |
|---|---|
| "clean confident ink linework" | comic book — heavy black contours, flat cel fills |
| "no black outlines" | still a visible pen contour; too weak to matter |
| "muted earth palette", "worn, lived-in" | gritty mud-and-rust realism |
| "fifties, grey at the temples, weathered" | a grizzled old man in every frame |
| "storybook", "the figure is small" | a children's picture book, tiny child in a meadow |
| a fully described landscape | a landscape painting with a small person in it |
| any visible face | drift back toward realism, and no two images alike |

---

## The Style Block

**Prepend this to every subject line below.** It is the constant; the subject line is the variable.

```
Dark fantasy anime character illustration, full body, centred, the character fills the entire
frame from top to bottom. Muted palette, strong cold rim light, deep shadow. Background almost
empty — flat fog and faint silhouettes, very low detail, no landscape, no scenery. Clean
painted cel shading, bold graphic shapes. Not photoreal, not 3D, not cute.
```

**325 characters.** For subclass art, swap `full body` for `waist-up`.

Every subject line below is short enough that the combined prompt stays well inside a
1024-character limit.

### Palette accents

The style block says *muted palette*; each subject line then names its own accent. One accent
per image — if two colours are competing, the image is wrong.

| Class | Accent |
|---|---|
| Knight · Barbarian · Rogue · Ranger | lantern gold |
| Paladin · Cleric | warm white-gold |
| Wizard · Bard | pale gold |
| Sorcerer | ember orange, or the subclass element |
| Warlock | cold violet |
| Necromancer · Shaman | pale green |
| Alchemist | acid green |

---

## Tool notes

### Gemini

Handles this style well and accepts a named film or studio style, which lands closer on the
first try. It has no negative-prompt field, so the exclusions live inside the prompt itself —
that's what `Not photoreal, not 3D, not cute` and `no landscape, no scenery` are doing. Keep
those clauses even though they read oddly.

Gemini weights the **opening** of a prompt most heavily, so the style block goes first and the
subject second — the order used throughout this file.

### Adobe Firefly

Firefly rejects prompts naming studios or living artists, so use the style block exactly as
written above; it describes the look without naming anyone.

| Setting | Class art | Subclass art |
|---|---|---|
| **Content type** | Art | Art |
| **Aspect ratio** | Landscape (4:3) | Square (1:1) |
| **Effects** | Anime · Digital art | same |

Firefly 5 caps the prompt at **1024 characters**. If you somehow go over, cut from the *end* of
the subject line — the background clause — never from the style block.

**Exclude field:**

```
photoreal, photograph, 3d render, cgi, plastic, glossy, specular highlights, airbrushed,
landscape, scenery, detailed background, visible face, facial features, portrait close-up,
wrinkled old face, child, chibi, cute, text, letters, watermark, signature, logo, border,
frame, gore
```

Note what is **not** excluded any more: `anime`, `cel shading` and `outlines`. Earlier drafts
banned all three, which directly contradicted the style block. This look wants clean cel
shading and graphic shapes — what it doesn't want is photoreal rendering and a detailed
landscape.

**For every caster** — Wizard, Sorcerer, Warlock, Necromancer, Shaman, Alchemist, Bard — add:

```
plate armour, chainmail, pauldrons, gauntlets, helmet, breastplate, shield, sword, knight
```

Casters wear cloth. If steel shows up on a Sorcerer, regenerate rather than accepting it — one
armoured caster drags the rest toward armour when you reuse it as a style reference.

### Style Reference — two anchors, not one

Style reference carries **subject matter**, not just palette. Anchor a Sorcerer to an armoured
Knight and you get an armoured Sorcerer, whatever the prompt says.

| Anchor | Generate first | Use as the reference for |
|---|---|---|
| **Steel** | `knight.jpg` | Knight · Barbarian · Paladin · Monk · Rogue · Ranger · Cleric |
| **Magic** | `sorcerer.jpg` | Wizard · Sorcerer · Warlock · Necromancer · Shaman · Alchemist · Bard |

Strength 60–75%. Cleric sits on the steel side deliberately — an armoured priest is the intent.

### If a prompt is refused

Content filters are touchy about gore. Swap the word and try again:

| Instead of | Use |
|---|---|
| blood | dark red liquid, dark stains |
| corpse, body | shrouded figure, covered form |
| skull, bone | carved ivory, pale relic |
| wound | injury, torn cloth |

---

# CLASSES

*Landscape 4:3. Full body, centred, filling the frame top to bottom. Background nearly empty. Face always hidden.*

### `knight.jpg`
A knight in heavy layered plate armour, helmet fully closed, face completely hidden in darkness behind the visor. Both hands resting on a longsword planted point-down, large shield on the back, heavy tattered cloak. Muted steel blue and rust palette. Background almost empty — flat fog and a faint silhouette of ruins.

### `barbarian.jpg`
A huge warrior in layered furs and riveted iron plates, a horned bone half-mask covering the whole face. A double-bitted greataxe held across the shoulders, trophies, braided cords, heavy iron torcs. Muted rust and bone palette, cold rim light. Background almost empty — flat pale fog and blowing snow.

### `paladin.jpg`
A knight in ornate plate with a sunburst on the breastplate, great helm fully closed and the face hidden in darkness. Both gauntlets on the haft of a heavy warhammer stood head-down, warm gold light bleeding from the seams of the hammer head. Prayer strips at the pauldrons, a sealed scroll chained to the belt. Muted steel with white-gold light. Background almost empty — flat gloom.

### `monk.jpg`
A figure in layered travelling robes and a wide conical straw hat pulled low, the whole face lost in shadow beneath the brim. Forearms and knuckles bound in cloth wraps, a rope belt hung with prayer beads and an iron bowl, a plain staff held loose. Muted ochre and grey palette. Background almost empty — flat fog and drifting dust.

### `rogue.jpg`
A figure in dark reinforced leather, deep hood with the face in complete darkness. Buckled chest harness, rows of throwing knives, a ring of skeleton keys at the hip, coiled rope. Crouched low, one blade reversed along the forearm. Muted charcoal with lantern gold. Background almost empty — flat fog and faint rooftop silhouettes.

### `ranger.jpg`
A cloaked hunter in layered oiled leather and a fur mantle, hood raised with the face in complete darkness. A longbow held low, a quiver across the back, pelts lashed to the pack, snares and cord at the belt. Muted moss green with lantern gold. Background almost empty — flat mist and faint pine silhouettes.

### `bard.jpg`
A figure in a heavily embroidered coat and a wide feathered hat pulled low, the whole face lost in shadow beneath the brim. A lute of dark inlaid wood held across the body, hands mid-chord, the struck strings throwing a ripple of pale gold light. Silver chains, ribbons tied along the instrument's neck. Muted plum with pale gold. Background almost empty — flat warm haze.

### `wizard.jpg`
A scholar in heavy layered vestments, deep hood with the face in complete darkness. One hand raised into a slowly turning ring of burning arcane sigils that lights the figure from below, torn pages orbiting it. An iron-bound grimoire in the other arm, ink pots and brass scroll cases at the belt. Cloth only, no armour, no metal. Muted indigo with pale gold light. Background almost empty — flat dark.

### `sorcerer.jpg`
A tall composed figure in fine layered silk robes with a high collar, long trailing sleeves and an ornate embroidered sash, head lowered and turned away with the face lost in shadow. Raw magic erupts from both raised hands and fills the frame around them, glowing lines running up the forearms, sleeves lifted by it. Fine silk and embroidery — no armour, no metal, no weapon. Muted deep indigo with ember orange light. Background almost empty — flat dark, the magic the only light.

### `warlock.jpg`
A figure in dark ornate robes with one asymmetric black-iron shoulder plate and the rest heavy layered cloth, wearing a smooth featureless white mask with no eyeholes. Holding a pact focus that bleeds cold violet light between the fingers, a slow ring of burning sigils turning in the air. Wax-sealed ribbons at the belt. Muted black with cold violet. Background almost empty — flat dark and a second wrong shadow.

### `necromancer.jpg`
A gaunt figure in dark surgical robes over a harness of carved ivory plates, deep hood with the face in complete darkness. One hand raised as pale green soul-light spirals up above the palm, half-formed spectral shapes turning inside it. An open case of iron instruments at the belt. Bone and cloth only, no forged armour. Muted black with pale green light. Background almost empty — flat dark.

### `cleric.jpg`
An armoured priest in mail and a segmented breastplate under heavy vestments, a veiled helm concealing the face completely. Holding up a large gold holy symbol pouring hard divine light downward, motes drifting up. A censer trailing smoke, chained books at the belt, a mace at the hip. Muted stone grey with warm white-gold light. Background almost empty — flat gloom.

### `shaman.jpg`
A figure in layered hides and woven grasses wearing a great antlered wooden mask covering the whole face. Raising a totem staff as translucent luminous spirit-shapes of wolves and birds coil around them, pale green witch-light in the charms. Herb bundles and fetishes on every strap. No metal, no armour. Muted bark brown with pale green light. Background almost empty — flat fog.

### `alchemist.jpg`
A figure in a heavy leather work apron, brass-and-glass goggles and a cloth respirator covering the entire face. Holding up a flask mid-reaction throwing hard chemical light and luminous vapour. A bandolier of stoppered vials glowing across the chest, tool rolls and tongs at the belt. Leather and canvas only, no armour. Muted brown with acid green light. Background almost empty — flat dark and drifting smoke.

---

# SUBCLASSES

*Square 1:1. Waist-up, centred, filling the frame. Background nearly empty. Face always hidden.*

## Knight

### `knight-weapon-master.jpg`
Waist-up. A knight mid-turn, visor fully closed and the face in darkness, one hand swinging an axe while the other reaches back over the shoulder for a spear from a rack of mismatched weapons strapped across the back. Muted steel and rust. Background almost empty — flat fog.

### `knight-warden.jpg`
Waist-up. A knight braced hard behind a tall tower shield angled across the frame, arrows embedded across its face, the closed visor above the rim with the face in darkness. Shoulder driven into the shield. Muted steel blue. Background almost empty — flat fog.

### `knight-duelist.jpg`
Waist-up. A lean knight in light fencing plate, slim helm with a fine steel grille and the face dark behind it. No shield, blade extended in a low guard, absolutely still. Muted steel and rust. Background almost empty — flat fog.

### `knight-enchanter.jpg`
Waist-up. A knight holding a sword point-up in front of a fully closed visor, the face hidden in darkness behind it, runes cut the length of the blade burning low ember gold and lighting the helm from beneath. Etched wards up the vambrace. Muted steel with ember gold. Background almost empty — flat dark.

### `knight-banneret.jpg`
Waist-up. An armoured commander, closed helm with the face in darkness, one gauntlet raised in a halt signal, a torn war banner on a spear shaft at the shoulder, mud to the elbows. Muted steel and lantern gold. Background almost empty — flat rain haze and faint shield-wall silhouettes.

## Barbarian

### `barbarian-berserker.jpg`
Waist-up. A huge warrior in furs, a horned bone half-mask covering the face, a double-bitted axe caught at the top of its swing, breath fogging, straps flying. Muted rust and bone, cold rim light. Background almost empty — flat pale fog.

### `barbarian-totem.jpg`
Waist-up. A warrior draped in a great bearskin worn with the skull as a hood so the beast's face covers their own entirely. One hand on a totem staff hung with claws and painted charms, a faint translucent beast shape overlapping the shoulders. Muted brown and bone. Background almost empty — flat fog.

### `barbarian-giantblood.jpg`
Waist-up, low angle. An impossibly oversized warrior in layered hides and iron torcs, a horned bone half-mask covering the face, lifting a stone-headed maul one-handed. Shoulders filling the frame. Muted rust and stone. Background almost empty — flat fog.

### `barbarian-bloodrager.jpg`
Waist-up, low angle. A warrior crouched with the head lowered and the face lost in shadow, one fist just landed and a shockwave ring cracking outward. Veins lit from beneath the skin along the arm and neck. Torn leather wraps. Muted rust with ember light. Background almost empty — flat dust.

## Paladin

### `paladin-oath-of-light.jpg`
Waist-up. An armoured figure, great helm fully closed and the face hidden, holding a warhammer aloft in both gauntlets with hard white-gold light pouring down out of the hammer head. Sunburst on the breastplate, prayer strips at the shoulder. Background almost empty — flat gloom.

### `paladin-oath-of-vengeance.jpg`
Waist-up. An armoured figure walking forward out of shadow, visor closed and the face dark, hammer low in one hand, a torn banner over the shoulder bearing one name struck through. Faint gold seams in blackened plate. Background almost empty — flat dark.

### `paladin-oath-of-atonement.jpg`
Waist-up, three-quarter from behind. A kneeling armoured figure, helm still on and fully closed with the face hidden, the head bowed, heavy chains looped wrist to wrist across the back plate, a warhammer laid flat in front of them. Faint gold in the seams, nearly out. Background almost empty — flat gloom.

### `paladin-oath-of-the-silent.jpg`
Waist-up. A figure in a plain hooded travelling cloak with no crest and no colours, the hood deep and the face in complete darkness. A warhammer half-hidden beneath the fabric, a folded page of names in the free hand. Muted grey. Background almost empty — flat lamp haze.

## Monk

### `monk-open-hand.jpg`
Waist-up. A figure in travelling robes and a wide straw hat pulled low with the face lost beneath the brim, caught mid-motion in an open-handed guard, forearms bound in cloth wraps. No weapon anywhere. Muted ochre. Background almost empty — flat dust haze.

### `monk-shadow.jpg`
Waist-up. A figure in robes and a low straw hat with the face in complete darkness, the upper body solid while the lower half dissolves into shadow. Cloth wraps on the forearms. Muted charcoal. Background almost empty — flat dark.

### `monk-four-elements.jpg`
Waist-up. A figure in robes and a low straw hat with the face hidden beneath the brim, one palm open and a turning sphere of flame, water, wind and stone suspended above it lighting the hat from below. Muted ochre with warm light. Background almost empty — flat dark.

### `monk-mender.jpg`
Waist-up. A figure in robes and a low straw hat with the face lost beneath the brim, kneeling with both cloth-wrapped hands pressed flat to a fallen ally's chest, warm light spreading beneath the skin. A rolled cloth of needles beside them. Background almost empty — flat gloom.

## Rogue

### `rogue-assassin.jpg`
Waist-up. A figure in dark leather crouched low, deep hood with the face in complete darkness, a blade held reversed along the forearm, poison vials in a chest strap. Muted charcoal with lantern gold. Background almost empty — flat dark and a faint lit doorway below.

### `rogue-infiltrator.jpg`
Waist-up. A figure in dark leather pressed flat beside an iron-bound door, deep hood with no face visible, picks in one gloved hand, the door's ward sigils faintly lit. A ring of skeleton keys at the hip. Background almost empty — flat dark.

### `rogue-trickster.jpg`
Waist-up. A figure in a stolen officer's coat that doesn't quite fit, a wide hat pulled low with the face lost in shadow, fanning three wax-sealed papers in one gloved hand and a lifted purse in the other. Background almost empty — flat haze.

## Ranger

### `ranger-sharpshooter.jpg`
Waist-up. A hooded hunter drawn to full on a longbow, the face in complete darkness inside the hood, cheek to the string. Fletching and knuckles sharp. Muted moss green. Background almost empty — flat fog.

### `ranger-beast-bond.jpg`
Waist-up. A cloaked hooded hunter with the face in darkness kneeling beside a great wolf, one hand buried in its shoulder fur, both facing the same way. Shared harness and tracking cord. Background almost empty — flat mist.

### `ranger-trailblazer.jpg`
Waist-up. A hooded figure with the face in darkness crouched low, staking a snare cord, iron traps and a hand-drawn map laid out beside them. Pack and pelts. Muted moss green. Background almost empty — flat mist.

## Bard

### `bard-wordsmith.jpg`
Waist-up. A figure in an embroidered coat with a feathered hat pulled low and the face lost in shadow, one ringed hand raised mid-sentence. Silver chains. Muted plum with pale gold. Background almost empty — flat gloom and faint seated silhouettes.

### `bard-warsinger.jpg`
Waist-up. A figure in a battle harness over an embroidered coat, a wide hat pulled low with the face in shadow, a battered war horn raised to the mouth, a drum at the hip. Background almost empty — flat haze and a faint banner silhouette.

### `bard-taleweaver.jpg`
Waist-up. A figure with a feathered hat pulled low and the face in complete shadow, playing a lute with translucent illusory shapes rising off the strings — a ship, a beast, a crowd — lighting them in pale gold. Background almost empty — flat dark.

## Wizard

### `wizard-illusionist.jpg`
Waist-up. A robed figure, deep hood with the face in complete darkness, stepping halfway through a stone wall that is still solidly there, the edge rippling like heat haze around the shoulder. No armour. Muted indigo. Background almost empty — flat dark.

### `wizard-wardmaster.jpg`
Waist-up. A robed figure, deep hood and no face visible, one hand out flat inside a burning chalk-and-silver circle, something large and dark pressed against the barrier from outside. No armour. Muted indigo with pale gold. Background almost empty — flat dark.

### `wizard-diviner.jpg`
Waist-up. A robed figure, deep hood with the face in darkness, leaning over a scrying bowl whose water has risen into a slow luminous column holding an image of somewhere else. A twenty-sided die beside it. No armour. Background almost empty — flat dark.

### `wizard-transmuter.jpg`
Waist-up. A robed figure, deep hood and the face in darkness, one hand flat on a stone doorway half-turned to running water and half to paper, the change spreading out from beneath the palm. No armour. Background almost empty — flat dark.

## Sorcerer

> **Element-first, and noble.** The magic erupts from the hands and fills the frame around the
> figure, but the figure still fills the frame top to bottom. Big spell, big character.
>
> **No armour, no metal — but never ragged.** The Sorcerer's power is inherited: a bloodline,
> which means a *house*. Fine layered silk, high collars, long trailing sleeves, embroidered
> sashes, rings, an upright bearing. Earlier drafts said "thin scorched linen" and "barefoot"
> to keep plate armour away, and produced a beggar. Rich fabric does the same job with dignity.

### `sorcerer-pyromancer.jpg`
Waist-up. A figure in fine dark silk robes with a high collar and long sleeves turned back at the wrist, head lowered and the face lost in shadow, both open hands out with a roaring column of fire erupting from the palms and filling the frame around them. Rings on the fingers, an embroidered sash. No armour, no metal. Muted deep red with ember orange. Background almost empty — flat dark.

### `sorcerer-cryomancer.jpg`
Waist-up. A composed figure in pale layered silk robes with a high collar and a fine silver circlet, head turned away and the face in shadow, one hand extended with a wall of jagged ice erupting from the fingertips and filling the frame. Frost creeping across the embroidery. No armour, no metal. Muted pale grey with cold blue. Background almost empty — flat dark.

### `sorcerer-stormblood.jpg`
Waist-up. A figure in fine dark robes with a high collar and long sleeves, sash whipping in the air, head tilted back and the face lost in glare, both arms out with a branching cage of lightning filling the frame around them and bolts leaving the open palms. Ornate rings. No armour, no metal. Background almost empty — flat dark.

### `sorcerer-dragonblood.jpg`
Waist-up. A figure in ornate layered robes with a high collar and heavy scaled trim, head turned away and the face in shadow, one shoulder and arm covered in overlapping dark scales, a claw-tipped hand extended as a wide plume of draconic breath erupts past and fills the frame. Wings half-unfurled in the dark. The scales are skin, not plate. Background almost empty.

### `sorcerer-elderblood.jpg`
Waist-up. A hooded figure in fine dark robes with a high collar and a heavy embroidered hem, the face in complete darkness beneath the hood, bearing formal and still, one hand raised into a large mass of magic that fills the frame and refuses to resolve into any element, light bending wrongly around it. No armour, no metal. Background almost empty — flat dark.

## Warlock

### `warlock-the-fiend.jpg`
Waist-up. A masked figure in dark robes, smooth featureless white mask, holding a signed contract on scorched parchment whose clauses burn line by line and light the mask from below. Blackened iron fingertips. Muted black with hellfire orange. Background almost empty — flat dark.

### `warlock-the-void.jpg`
Waist-up. A masked figure in dark robes, the smooth featureless white mask fully lit and completely blank, a thin chain trailing away. Faint wrongly-arranged constellations behind the head. Muted black with cold violet. Background almost empty — absolute dark.

### `warlock-the-hunger.jpg`
Waist-up. A robed masked figure resting one hand on an iron gate, wood and metal rotting outward in a spreading luminous ring from the touch. The smooth blank mask tilted slightly. Wax-sealed ribbons at the belt. Background almost empty — flat dark.

## Necromancer

### `necromancer-bonewright.jpg`
Waist-up. A hooded figure in surgical robes with the face in complete darkness, one hand raised as a skeletal servant assembles itself beside them in mid-air, pale relics drifting into place along threads of green soul-light. Bone-plated harness. Background almost empty — flat dark.

### `necromancer-bloodletter.jpg`
Waist-up. A hooded figure with the face in darkness holding one hand above a silver bowl, drawing dark red liquid up in a slow luminous ribbon that follows the palm. Ritual channels lit from within. Background almost empty — flat dark.

### `necromancer-cursebearer.jpg`
Waist-up. A hooded figure in surgical robes with no face visible, pressing an iron pin into a name carved on a black wax tablet, sickly green light leaking from the cut letters and crawling up the sleeve. Background almost empty — flat dark.

### `necromancer-spiritbinder.jpg`
Waist-up. A hooded figure with the face in complete darkness holding a blade upright in both hands as a pale spirit is drawn spiralling down into the steel, chains of light winding along the fuller. Background almost empty — flat dark.

## Cleric

### `cleric-healer.jpg`
Waist-up. A veiled priest in vestments over mail, the face concealed by the veil, kneeling with both hands closing an injury with warm light between the fingers. Linen bandages and a bowl of water beside them. Background almost empty — flat gloom.

### `cleric-war-priest.jpg`
Waist-up. An armoured priest in vestments over a segmented breastplate, a veiled helm concealing the face, mid-stride with a war mace raised and hard white-gold light burning along its flanges. A holy symbol lashed to the wrist. Background almost empty — flat gloom.

### `cleric-dark-preacher.jpg`
Waist-up. A veiled figure in heavy vestments, the face fully concealed behind gauze, swinging a censer trailing black smoke across the frame. Chained books at the belt. Muted black with sickly candlelight. Background almost empty — flat dark and faint guttering candles.

## Shaman

### `shaman-wild-heart.jpg`
Waist-up. A figure in hides wearing a wolf-carved wooden mask covering the whole face, a pelt mantle across the shoulders with the translucent luminous shape of a wolf rising out of the hide alongside them. Totem staff hung with claws. Pale green light. Background almost empty — flat fog.

### `shaman-storm.jpg`
Waist-up. An antler-masked figure in soaked hides and woven grasses, a totem staff raised with lightning branching down to meet the wood, rain suspended in the air around them. Background almost empty — flat black sky.

### `shaman-deep-root.jpg`
Waist-up. An antler-masked figure in hides crouched with one hand flat on the ground, thick roots erupting around them and closing into a wall, moss and pale fungus across the break. Faint green witch-light at the fingers. Background almost empty — flat dark.

## Alchemist

### `alchemist-bombardier.jpg`
Waist-up. A figure in a heavy leather apron, brass goggles and a cloth respirator covering the entire face, drawn back to throw a glass bomb whose fuse is already sparking and lighting the apron. A bandolier of charges across the chest, scorch marks worn into everything. Background almost empty — flat smoke.

### `alchemist-elixirist.jpg`
Waist-up. A figure in a leather apron, brass goggles and a respirator covering the whole face, holding a vial up to eye level throwing acid-green light across the lenses. A bandolier of glowing vials across the chest. Background almost empty — flat dark.

### `alchemist-golemwright.jpg`
Waist-up. A figure in a leather apron with goggles and a respirator covering the face, standing beside a half-assembled clockwork construct taller than they are, its chest plate open on brass gears and a glowing core lighting them both. Background almost empty — flat dark.

---

# STORY GOD PORTRAITS

*Square 1:1 → `public/images/storygods/`. These display in a **small circle**, so
they need a different treatment from the class art: one strong central symbol,
tight crop, high contrast. Detail below ~10% of the frame will not survive.*

*Same style block. Same no-faces rule — but here it carries extra weight: the
Story God is not a person in the world, it's the shape the narrator takes.*

### `chronicler.jpg`
Square, tight crop. A deep hood bent low over an enormous open book, quill in hand mid-word, the face entirely lost in darkness beneath the hood. Warm candlelight from the page lighting the underside of the hood. Ink, ribbons, stacked pages. Background almost empty — flat dark.

### `watcher.jpg`
Square, tight crop. A smooth pale mask with far too many eyes worked into it, all open, arranged wrongly. Faint cold constellations behind the head. No mouth. Muted black with cold violet. Background almost empty — absolute dark.

### `weaver.jpg`
Square, tight crop. Two hands held apart with dozens of luminous threads running between the fingers, some taut, one just snapped and drifting. Sleeves of heavy embroidered cloth. The face is above the frame — only the hands and the threads. Pale gold light from the threads themselves.

### `raven.jpg`
Square, tight crop. A large raven in three-quarter view perched on a weathered stone marker, head turned to look straight at the viewer, one eye catching the light. Feathers rendered with real weight. Muted charcoal with a single gold glint. Background almost empty — flat fog.

### `cartographer.jpg`
Square, tight crop. A gloved hand resting flat on an unrolled map, a lantern at the edge of the frame throwing hard warm light across the paper, the far part of the map dissolving into blank unmarked white. Dividers and a weight holding a corner. The face is above the frame.

### `arbiter.jpg`
Square, tight crop. A set of iron scales held from above, one pan holding a single die, the other empty and rising. A gauntleted hand on the beam. Cold light from directly above, deep shadow beneath. Muted iron grey with one gold accent.

---

**14 class prompts · 51 subclass prompts · 6 Story God portraits.**
