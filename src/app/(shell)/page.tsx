import ProjectsGrid from "@/components/pages/home";
import { getAllProjects } from "@/lib/utils/project-content";
import * as sty from "./page.css";

export default async function Index() {
  const projects = await getAllProjects();
  return (
    <>
    <div className={sty.heroContainer}>
      <img src="/home/rainier2-2.jpg" alt="Hero Image" className={sty.heroImage} />
    </div>
    <ProjectsGrid projects={projects} />
    </>
  )
}
