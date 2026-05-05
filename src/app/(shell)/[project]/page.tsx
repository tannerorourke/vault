import ProjectPage from "@/components/pages/project";
import { PROJECTS } from "@/content/projects";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { IPageProps } from "src/lib/types/routes"

export async function generateMetadata({ params }: IPageProps): Promise<Metadata> {
  const { project } = await params;

  const p = PROJECTS.find(p => p.pid === project)
  if (!p)
    return notFound()

  const { title, summaryShort: description } = p

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

export default async function Project({ params }: IPageProps) {
  const { project } = await params;

  const p = PROJECTS.find(p => p.pid === project)
  if (!p)
    return notFound()

  return <ProjectPage />;
}
