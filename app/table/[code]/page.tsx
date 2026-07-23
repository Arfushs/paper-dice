import RoomClient from "./RoomClient";

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return { title: `Table ${code.toUpperCase()} — Paper & Dice` };
}

export default async function RoomPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return (
    <div className="shell shell--wide" style={{ paddingTop: 28, paddingBottom: 40 }}>
      <RoomClient code={code.toUpperCase()} />
    </div>
  );
}
