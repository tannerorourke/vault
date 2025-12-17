import { PROJECTS } from "@/content/projects";
import { AnimatePresence } from "motion/react";
import { notFound } from "next/navigation";


export default function ProjectLayout({
  children, 
  params
}: Readonly<{
  children: React.ReactNode;
  params: { project: string }
}>) {
  const projectConfig = PROJECTS.find(p => p.id === params.project)
  if (!projectConfig) {
    console.log("bad id in link")
    return notFound()
  }

  return (
    <AnimatePresence>
      <div>Project Page for {projectConfig.id}</div>
      {children}
    </AnimatePresence>
  );
}