import { notFound, redirect } from "next/navigation";
import { IPageProps } from "src/lib/types/routes"
import { findProject } from "@/lib/utils/findProject";

/**
 * Resolve any "/[project-id]/**" URL to /[project-id]
 */
export default async function ResolveToProjectId({ params }: IPageProps) {
  const { project } = await params;

  if (!findProject(project)) notFound()
  redirect(`/${project}`)
}
