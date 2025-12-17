import HomePage from "@/components/pages/home";
import { PROJECTS } from "@/content/projects"

export default function Index() {
  return <>
    <HomePage 
      projects={PROJECTS}
      initialFilterId=""
    />
  </>
}
