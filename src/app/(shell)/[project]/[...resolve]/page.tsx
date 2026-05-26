import { notFound, redirect } from "next/navigation";
import { getProjectContent } from "@/lib/content/projects";
import { PageProps } from "@/lib/types/routes"

/**
 * Resolve any "/[project-id]/**" URL to /[project-id]
 */
export default async function ResolveToProjectId({ params }: PageProps) {
  const { project } = await params;
  if (!getProjectContent(project)) notFound();
  redirect(`/${project}`)
}
