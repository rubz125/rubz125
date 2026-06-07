import { notFound } from "next/navigation";
import ServicePageClient from "./ServicePageClient";
import { serviceData } from "./data";

export function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({ slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!serviceData[slug]) notFound();
  return <ServicePageClient slug={slug} />;
}
