import { notFound, redirect } from "next/navigation";
import { PROJECTS } from "@/content/projects";

/**
 * Resolve url "/work/matching-project-id/**" URL
 * to /work/matching-project-id
 */
export default function ResolveToProjectId({ params }: { params: { project: string }}) {
  if (!PROJECTS.some((p) => p.id === params.project))
    notFound()
  redirect(`/work/${params.project}`)
}