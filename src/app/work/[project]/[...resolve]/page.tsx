import { notFound, redirect } from "next/navigation";
import { PROJECTS } from "@/content/projects";
import { IPageProps } from "src/lib/types/routes"

/**
 * Resolve url "/work/matching-project-id/**" URL
 * to /work/matching-project-id
 */
export default async function ResolveToProjectId({ params }: IPageProps) {
  const { project } = await params;

  if (!PROJECTS.some((p) => p.pid === project))
    notFound()
  redirect(`/work/${project}`)
}