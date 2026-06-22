import { notFound, redirect } from "next/navigation";
import { getProjectContent } from "@/lib/content/content";
import { PageProps } from "@/lib/types/routes"

// Resolve "/[project-id]/**" to "/[project-id]"
export default async function ResolveToProjectId({ params }: PageProps) {
  const { project } = await params;
  if (!getProjectContent(project)) notFound();
  redirect(`/${project}`)
}
