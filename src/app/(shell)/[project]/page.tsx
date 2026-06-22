import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectContent } from "@/lib/content/content";
import { PageProps } from "@/lib/types/routes"

import ProjectPage from "@/components/pages/Project";


// -- [FIX] flash on bad slugs (e.g. bot scans of /wp-admin) --
// Reject any [project] slug not in generateStaticParams at the routing layer, before the page function runs
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { project } = await params;

  const content = await getProjectContent(project)
  if (!content) return notFound()

  const { title, indexSubtitle: description } = content

  return {
    title,
    description,
    alternates: { canonical: `/${project}` },
    openGraph: { title, description, url: `/${project}` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((project) => ({ project }));
}

export default async function Project({ params }: PageProps) {
  const { project } = await params;

  const content = getProjectContent(project)
  if (!content) return notFound()

  return <ProjectPage content={content} />;
}
