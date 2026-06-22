import Image from "next/image";
import Markdown from "@/components/ui/Markdown";
import ScrollCue from "@/components/pages/Home/ScrollCue";

import { content } from "@/lib/content/content";
import * as sty from "./home-page.css";


export function HomePage() {
  return (
    <main id="main-content" className={sty.main}>
      <div className={sty.intro}>
        <aside className={sty.photoWrap} aria-label="Headshot">
          <Image
            src="/TannerORourke1024x1024.png" alt="Tanner O'Rourke, headshot"
            width={400} height={500}
            loading="eager"
            className={sty.photo}
          />
        </aside>
        <div className={sty.introFlex}>
          <Markdown
            value={content.home.headline}
            textProps={{ as: "h1", variant: "displayLg", className: sty.headline }}
          />
          <div className={sty.cues}>
            <ScrollCue />
          </div>
        </div>
      </div>
      <div className={sty.contentCtnr}>
        <div className={sty.content}>
          <Markdown className={sty.about} value={content.home.body} />
        </div>
      </div>
    </main>
  );
}