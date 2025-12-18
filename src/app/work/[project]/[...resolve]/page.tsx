import { notFound, redirect } from "next/navigation";
import { IPageProps } from "src/lib/types/routes"
import { findProject } from "@/lib/utils/findProject";

/**
 * Resolve url "/work/matching-project-id/**" URL
 * to /work/matching-project-id
 */
export default async function ResolveToProjectId({ params }: IPageProps) {
  const { project } = await params;

  if (!findProject(project)) notFound()
  redirect(`/work/${project}`)
}