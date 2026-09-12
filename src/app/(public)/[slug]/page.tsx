import { notFound } from "next/navigation";
import { BiositePage } from "@/components/biosite/BiositePage";
import { getBiositeBySlug } from "@/lib/get-biosite";

export default async function PublicBiositePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getBiositeBySlug(slug);

  if (!data) {
    notFound();
  }

  return <BiositePage data={data} />;
}
