import { NavLink } from "@/content/nav-links";

import Text from "@/components/ui/Text";
import TextLink from "@/components/ui/TextLink";
import Markdown from "@/components/ui/Markdown";
import Footer from "@/components/navigation/Footer";

import { IconName } from "@/components/icons/registry";

import { PARAGRAPHS, CONTACT_TEXT, ABOUT_LINKS, PHOTO_META } from "@/content/about";
import * as sty from "./about-page.css";


const ICON_FOR_ALT: Record<string, IconName> = {
  "Email me":       "envelope",
  "LinkedIn":       "linkedin",
  "GitHub":         "github",
  "Google Scholar": "grad-cap",
};


function ContactRow({ label, links }: { label: string; links: NavLink[] }) {
  return (
    <div className={sty.contactRow}>
      <Text
        as="span"
        variant="micro"
        tone="secondary"
        className={sty.contactRowLabel}
      >
        {label}
      </Text>
      <ul className={sty.contactRowList}>
        {links.map((l) => (
          <li key={l.href ?? l.text} className={sty.contactRowItem}>
            <TextLink
              label={l.text ?? l.alt ?? ""}
              underline="hover"
              textProps={{ variant: "body" }}
              leftIcon={{ icon: ICON_FOR_ALT[l.alt ?? ""], hold: true }}
              rightIcon={{ icon: "arrow-up-right" }}
              nextProps={{
                href: l.href ?? "#",
                target: l.target,
                rel: l.target === "_blank" ? "noopener noreferrer" : undefined,
                download: l.download,
              }}
              aria-label={l.alt}
              className={sty.contactLink}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}


export function ProfilePage() {
  return (
    <main className={sty.aboutRoot}>
      <section className={sty.intro}>

        <aside className={sty.photoCol} aria-label="At a glance">
          <figure className={sty.photoFigure}>
            <img className={sty.photo} src="/me_4-5.png" alt="Tanner O'Rourke, headshot" />
          </figure>
          <dl className={sty.photoMeta}>
            {PHOTO_META.map(({ key, val }) => (
              <div key={key} className={sty.photoMetaRow}>
                <Text as="dt" variant="micro" className={sty.photoMetaKey}>{key}</Text>
                <Text as="dd" variant="micro" className={sty.photoMetaVal}>{val}</Text>
              </div>
            ))}
          </dl>
        </aside>

        <div className={sty.proseCol}>
          <Text as="p" variant="bodyLg" className={sty.headline}>
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
        <Text as="p" className={sty.contactStatement}>
          <Markdown value={CONTACT_TEXT} inline />
        </Text>
        <ContactRow label="Get in touch" links={ABOUT_LINKS} />
      </section>

      <Footer />
    </main>
  );
}
