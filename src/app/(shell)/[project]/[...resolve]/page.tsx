import { notFound, redirect } from "next/navigation";
import { IPageProps } from "src/lib/types/routes"
import { getProjectContent } from "@/lib/utils/project-content";

/**
 * Resolve any "/[project-id]/**" URL to /[project-id]
 */
export default async function ResolveToProjectId({ params }: IPageProps) {
  const { project } = await params;

  const content = await getProjectContent(project)
  if (!content) notFound()
  redirect(`/${project}`)
}
