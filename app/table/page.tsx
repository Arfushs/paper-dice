import TableEntry from "./TableEntry";

export const metadata = { title: "Tables — Paper & Dice" };

export default function TablePage() {
  return (
    <div className="shell" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <p className="eyebrow">Play together</p>
      <h1 className="display" style={{ fontSize: "2.5rem", margin: "12px 0 10px" }}>
        Tables
      </h1>
      <p className="lede" style={{ maxWidth: "58ch", marginBottom: 30 }}>
        One Story God narrates and rolls. Everyone else brings a Character Paper. The dice,
        the scene, and everyone&rsquo;s health stay in sync.
      </p>
      <TableEntry />
    </div>
  );
}
