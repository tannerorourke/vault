import { PROJECTS } from "@/lib/content/projects";

import HomePage from "@/components/pages/home";


export default async function Index() {
  return <HomePage projects={PROJECTS} />;
}
