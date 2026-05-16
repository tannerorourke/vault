import { notFound, redirect } from "next/navigation";
import { PageProps } from "@/lib/types/routes"
import { getProjectContent } from "@/lib/content/projects";

/**
 * Resolve any "/[project-id]/**" URL to /[project-id]
 */
export default async function ResolveToProjectId({ params }: PageProps) {
  const { project } = await params;

  const content = await getProjectContent(project)
  if (!content) notFound()
  redirect(`/${project}`)
}
