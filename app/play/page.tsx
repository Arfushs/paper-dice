import DiceTray from "@/components/DiceTray";

export const metadata = { title: "Dice — Paper & Dice" };

export default function PlayPage() {
  return (
    <div className="shell" style={{ paddingTop: 44, paddingBottom: 40 }}>
      <p className="eyebrow">Roll it and see</p>
      <h1 className="display" style={{ fontSize: "2.5rem", margin: "12px 0 6px" }}>
        Dice
      </h1>
      <p className="lede" style={{ maxWidth: "58ch", marginBottom: 8 }}>
        The one roll: <strong>d20 + ability + training</strong> against a difficulty the Story
        God names. Pick a character and their scores fill in automatically.
      </p>
      <DiceTray />
    </div>
  );
}
