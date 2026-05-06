import ProjectsGrid from "@/components/pages/home";
import { getAllProjects } from "@/lib/utils/project-content";
import * as sty from "./page.css";

export default async function Index() {
  const projects = await getAllProjects();
  return (
    <>
    <ProjectsGrid projects={projects} />
    {/** Other notebook works */}
    </>
  )
}
