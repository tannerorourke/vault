import { ILayoutProps } from "@/lib/types/routes";
import { findProject } from "@/lib/utils/findProject";
import { AnimatePresence, motion } from "motion/react";
import { notFound } from "next/navigation";

export default async function ProjectLayout({ children, params }: ILayoutProps) {
  const { project } = await params;

  if (!findProject(project)) 
    notFound()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        // key={key}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18 }}
      >
        {children}
      </motion.div>
      
    </AnimatePresence>
  );
}