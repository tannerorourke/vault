import ProjectsGrid from "@/components/pages/home";
import * as sty from "./page.css";

export default function Index() {
  return (
    <>
    <div className={sty.heroContainer}>
      <img src="/home/rainier2-2.jpg" alt="Hero Image" className={sty.heroImage} />
    </div>
    <ProjectsGrid />
    </>
  )
}
