import { notFound, redirect } from "next/navigation";
import { IPageProps } from "@/lib/types/routes"
import { getProjectContent } from "@/content/projects";

/**
 * Resolve any "/[project-id]/**" URL to /[project-id]
 */
export default async function ResolveToProjectId({ params }: IPageProps) {
  const { project } = await params;

  const content = await getProjectContent(project)
  if (!content) notFound()
  redirect(`/${project}`)
}
