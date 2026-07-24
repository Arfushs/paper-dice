import DiceTray from "@/components/DiceTray";

export const metadata = { title: "Dice — Paper & Dice" };

export default function PlayPage() {
  return (
    <div className="shell" style={{ paddingTop: 44, paddingBottom: 40 }}>
      <DiceTray />
    </div>
  );
}
