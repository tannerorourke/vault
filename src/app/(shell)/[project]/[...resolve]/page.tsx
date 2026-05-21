import { redirect } from "next/navigation";
import { PageProps } from "@/lib/types/routes"

/**
 * Resolve any "/[project-id]/**" URL to /[project-id]
 */
export default async function ResolveToProjectId({ params }: PageProps) {
  const { project } = await params;
  redirect(`/${project}`)
}
