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
      // images: [{ url: `/og/${project}.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      // images: [`/og/${project}.png`],
    },
  };
}

export default async function Project({ params }: IPageProps) {
  const { project } = await params;

  const p = PROJECTS.find(p => p.pid === project)
  if (!p)
    return notFound()

  return (
    <div>
      <ProjectPage />
    </div>
  );
}