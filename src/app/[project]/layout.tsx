import { PROJECTS } from "@/content/projects";
import { ILayoutProps } from "@/lib/types/routes";
import { AnimatePresence, motion } from "motion/react";
import { notFound } from "next/navigation";

export default async function ProjectLayout({ children, params }: ILayoutProps) {
  const { project } = await params;

  const p = PROJECTS.find(p => p.pid === project)
  if (!p) {
    console.log("/[project]/layout ::: bad id in link")
    return notFound()
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        // key={key}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18 }}
      >
        <div>Project Page for {p.pid}</div>
        {children}
      </motion.div>
      
    </AnimatePresence>
  );
}