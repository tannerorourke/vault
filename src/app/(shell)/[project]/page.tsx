import ProjectPage from "@/components/pages/project";
import { getProjectContent } from "@/lib/utils/project-content";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { IPageProps } from "src/lib/types/routes"

export async function generateMetadata({ params }: IPageProps): Promise<Metadata> {
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

export default async function Project({ params }: IPageProps) {
  const { project } = await params;

  const content = await getProjectContent(project)
  if (!content)
    return notFound()

  return <ProjectPage content={content} />;
}
