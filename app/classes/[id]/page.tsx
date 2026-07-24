import { notFound } from "next/navigation";
import { CLASSES, CLASS_BY_ID } from "@/data/classes";
import ClassDetail from "./ClassDetail";

export function generateStaticParams() {
  return CLASSES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cls = CLASS_BY_ID.get(id);
  return { title: cls ? `${cls.name.en} — Paper & Dice` : "Paper & Dice" };
}

export default async function ClassPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!CLASS_BY_ID.get(id)) notFound();
  return <ClassDetail id={id} />;
}
