import TableEntry from "./TableEntry";

export const metadata = { title: "Tables — Paper & Dice" };

export default function TablePage() {
  return (
    <div className="shell" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <TableEntry />
    </div>
  );
}
