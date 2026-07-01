import Image from "next/image";
import Markdown from "@/components/ui/Markdown";
import Text from "@/components/ui/Text";

import { content } from "@/lib/content/content";
import * as sty from "./home-page.css";


export function HomePage() {
  const { subtitle, body, footer } = content.home;
  return (
    <main id="main-content" className={sty.main}>
      <div className={sty.header}>
        <div className={sty.headerBox}>
          <div className={sty.heroWrap}>
            <Image
              src="/TannerORourke1024x1024.png"
              alt="Tanner O'Rourke"
              width={400}
              height={400}
              loading="eager"
              className={sty.hero}
            />
          </div>
          <div className={sty.textCol}>
            <div className={sty.headline}>
              <Text as="h1" variant="bodyLg" tone="onFeature" className={sty.greeting}>
                Hi, I&apos;m&nbsp;<span><span>Tanner</span>!</span>
              </Text>
            </div>
            <Markdown
              value={subtitle}
              textProps={{ as: "h2", variant: "body", tone: 'onFeature', className: sty.subheadline }}
            />
          </div>
        </div>
      </div>

      <div className={sty.content}>
        <div className={sty.contentBox}>
          <Markdown
            value={body} block
            textProps={{ as: "p", variant: "bodyLg", className: sty.body }}
          />
          <Markdown
            value={footer}
            textProps={{ as: "p", variant: "bodySm", className: sty.footer }}
          />
        </div>
      </div>
    </main>
  );
}
