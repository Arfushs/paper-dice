import RosterClient from "./RosterClient";

export const metadata = { title: "Characters — Paper & Dice" };

export default function CharactersPage() {
  return (
    <div className="shell" style={{ paddingTop: 44, paddingBottom: 40 }}>
      <RosterClient />
    </div>
  );
}
