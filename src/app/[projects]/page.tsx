import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Look up project by slug
  const title = "FireFusion";
  const description = "Spatiotemporal wildfire ignition risk modeling system.";

  return {
    title,
    description,
    alternates: { canonical: `/work/${params.slug}` },
    openGraph: {
      title,
      description,
      url: `/work/${params.slug}`,
      images: [{ url: `/og/${params.slug}.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/og/${params.slug}.png`],
    },
  };
}