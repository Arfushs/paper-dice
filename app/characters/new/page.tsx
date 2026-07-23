import CreatorClient from "./CreatorClient";

export const metadata = { title: "New Character — Paper & Dice" };

export default function NewCharacterPage() {
  return (
    <div className="shell">
      <CreatorClient />
    </div>
  );
}
