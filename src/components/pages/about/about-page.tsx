import Image from "next/image";
import Text from "@/components/ui/Text";
import TextLink from "@/components/ui/TextLink";
import Markdown from "@/components/ui/Markdown";
import { IconName } from "@/components/icons/registry";

import { PARAGRAPHS, CONTACT_TEXT, CONTACT_ROW_LABEL, FOOTER } from "@/content/about";
import { ABOUT_LINKS, REPO_LINK } from "@/content/nav-links";
import * as sty from "./about-page.css";


export function ProfilePage() {
  return (
    <main id="main-content" tabIndex={-1} className={sty.aboutRoot}>
      <section className={sty.intro}>

        <aside className={sty.photoCol} aria-label="At a glance">
          <figure className={sty.photoFigure}>
            <Image src="/me_4-5.png" alt="Tanner O'Rourke, headshot" className={sty.photo} />
          </figure>
        </aside>

        <div className={sty.proseCol}>
          <Markdown 
            textProps={{ as: 'h1', variant: 'bodyLg', className: sty.par }} 
            value={PARAGRAPHS[0]}
          />
          {PARAGRAPHS.slice(1).map((p, i) => (
            <Markdown
              key={i}
              textProps={{ as: 'p', variant: 'bodyLg', className: sty.par }}
              value={p}
            />
          ))}
        </div>

      </section>

      <section className={sty.contactSection} aria-label="Contact">

        <div className={sty.contactRow}>
            <Markdown 
              textProps={{ as: "h2", variant: "bodyLg", className: sty.contactStatement }}
              value={CONTACT_TEXT}
            />
        </div>
        
        <div className={sty.contactRowGrid}>
          <Text as="h2" variant="caption" tone="secondary" className={sty.contactGridLabel}>
            {CONTACT_ROW_LABEL}
          </Text>
          
          <ul className={sty.contactGridList}>
            {ABOUT_LINKS.map((l, ix) => (
              <li key={l.href ?? l.text ?? ix}>
                <TextLink
                  intent="interactive"
                  label={l.text ?? l.alt ?? ""}
                  underline="hover"
                  leftIcon={{ name: l.iconName as IconName, hold: true, tone: "muted" }}
                  textProps={{ variant: "body", className: sty.contactLink }}
                  nextProps={{
                    href: l.href ?? "#",
                    target: l.target,
                    rel: l.target === "_blank" ? "noopener noreferrer" : undefined,
                    download: l.download,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className={sty.contactRow}>
          <Markdown 
            textProps={{ as: 'h3', variant: 'caption', className: [sty.par, sty.footPad].join(" ") }} 
            value={FOOTER} 
          />
          <TextLink
            intent="interactive"
            label={'View Source'}
            rightIcon={{ name: "arrow-up-right", hold: true }}
            textProps={{ variant: "caption" }}
            nextProps={{
              href: REPO_LINK.href || "#",
              target: REPO_LINK.target,
              rel: REPO_LINK.target === "_blank" ? "noopener noreferrer" : undefined,
              className: sty.footLink
            }}
          />
        </div>

      </section>
      
    </main>
  );
}
