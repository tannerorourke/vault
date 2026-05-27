import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectContent } from "@/lib/content/projects";
import { PageProps } from "@/lib/types/routes"

import ProjectPage from "@/components/pages/project";


// Reject any [project] slug not in generateStaticParams at the routing layer,
// before the page function runs. Eliminates the layout-shell-then-notFound
// flash on bad slugs (e.g. bot scans of /wp-admin).
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { project } = await params;

  const content = await getProjectContent(project)
  if (!content) return notFound()

  const { title, cardSubtitle: description } = content

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
