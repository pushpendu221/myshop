import { notFound } from "next/navigation";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  console.log("SLUG:", slug);
}
