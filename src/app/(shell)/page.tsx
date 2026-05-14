import ProjectsGrid from "@/components/pages/home";
import { getAllProjects } from "@/content/projects";

export default async function Index() {
  return <ProjectsGrid projects={getAllProjects()} />;
}
