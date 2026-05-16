import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectContent } from "@/lib/content/projects";
import { PageProps } from "@/lib/types/routes"

import ProjectPage from "@/components/pages/project";


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { project } = await params;

  const content = await getProjectContent(project)
  if (!content)
    return notFound()

  const { title, summary: description } = content

  return {
    title,
    description,
    alternates: { canonical: `/${project}` },
    openGraph: {
      title,
      description,
      url: `/${project}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((project) => ({ project }));
}

export default async function Project({ params }: PageProps) {
  const { project } = await params;

  const content = await getProjectContent(project)
  if (!content)
    return notFound()

  return <ProjectPage content={content} />;
}
