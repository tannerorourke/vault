import { FOOTER, NavLink, REPO_LINK } from "@/content/nav-links";

import Text from "@/components/ui/Text";
import TextLink from "@/components/ui/TextLink";
import Markdown from "@/components/ui/Markdown";
import { IconName } from "@/components/icons/registry";

import { PARAGRAPHS, CONTACT_TEXT, ABOUT_LINKS, CONTACT_ROW_LABEL } from "@/content/about";
import * as sty from "./about-page.css";


export function ProfilePage() {
  return (
    <main className={sty.aboutRoot}>
      <section className={sty.intro}>

        <aside className={sty.photoCol} aria-label="At a glance">
          <figure className={sty.photoFigure}>
            <img className={sty.photo} src="/me_4-5.png" alt="Tanner O'Rourke, headshot" />
          </figure>
        </aside>

        <div className={sty.proseCol}>
          <Text as="h1" variant="bodyLg" className={`${sty.par}`}>
            <Markdown value={PARAGRAPHS[0]} inline />
          </Text>
          {PARAGRAPHS.slice(1).map((p, i) => (
            <Text as="p" key={i} variant="bodyLg" className={sty.par}>
              <Markdown value={p} inline />
            </Text>
          ))}
        </div>
      </section>

      <section className={sty.contact} aria-label="Contact">
        <div className={sty.contactRow}>
          <Text as="h2" className={sty.contactStatement}>
            <Markdown value={CONTACT_TEXT} inline />
          </Text>
        </div>
        
        <div className={sty.contactRowGrid}>
          <Text as="h3" variant="caption" tone="secondary" className={sty.contactGridLabel}>
            {CONTACT_ROW_LABEL}
          </Text>
          <ul className={sty.contactGridList}>
            {ABOUT_LINKS.map((l, ix) => (
              <li key={l.href ?? l.text ?? ix} className={sty.contactGridItem}>
                <TextLink
                  intent="interactive"
                  label={l.text ?? l.alt ?? ""}
                  underline="hover"
                  textProps={{ variant: "body" }}
                  leftIcon={{ name: l.iconName as IconName, hold: true, tone: "muted" }}
                  nextProps={{
                    href: l.href ?? "#",
                    target: l.target,
                    rel: l.target === "_blank" ? "noopener noreferrer" : undefined,
                    download: l.download,
                  }}
                  aria-label={l.alt}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className={sty.contactRow}>
          <Text as="h3" variant="caption" tone="secondary" className={sty.par}>
            <Markdown value={FOOTER} inline />
          </Text>
          <TextLink
            intent="interactive"
            label={'View Source'}
            rightIcon={{ name: "arrow-up-right", hold: true }}
            textProps={{ variant: "caption" }}
            nextProps={{
              href: REPO_LINK.href || "#",
              target: REPO_LINK.target,
              rel: REPO_LINK.target === "_blank" ? "noopener noreferrer" : undefined,
              className: sty.footerLink
            }}
            aria-label={REPO_LINK.alt}
          />
        </div>

      </section>

      {/* <Footer /> */}
    </main>
  );
}
