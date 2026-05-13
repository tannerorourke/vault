import ProjectsGrid from "@/components/pages/home";
import { getAllProjects } from "@/lib/utils/project-content";

export default async function Index() {
  return <ProjectsGrid projects={getAllProjects()} />;
}
