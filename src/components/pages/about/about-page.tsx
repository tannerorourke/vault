import { NavLink } from "@/lib/types/nav";

import Sheet from "@/components/ui/Sheet";
import Text from "@/components/ui/Text";
import TextLink from "@/components/ui/TextLink";
import Markdown from "@/components/ui/Markdown";
import Footer from "@/components/navigation/Footer";

import { PARAGRAPHS, CONTACT_TEXT, ABOUT_LINKS, AUX_LINKS } from "@/content/about-content";
import * as sty from "./about-page.css";



type ContactRowVariant = "primary" | "muted";

function ContactRow({
  label,
  links,
  variant,
}: {
  label: string;
  links: NavLink[];
  variant: ContactRowVariant;
}) {
  const tone = variant === "primary" ? "primary" : "secondary";
  const underline = variant === "primary" ? "always" : "hover";
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
              underline={underline}
              textProps={{ variant: "bodySm", tone }}
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
  );
}


export function ProfilePage() {
  return (
    <main className={sty.profileRoot}>
      <section className={sty.body}>

        <aside className={sty.photoColumn} aria-label="At a glance">
          <figure className={sty.photoFigure}>
            <img className={sty.photo} src="/me_4-5.png" alt="Tanner O\'Rourke, headshot" />
          </figure>
        </aside>

        <Sheet className={sty.bodySheet}>
          {PARAGRAPHS.map((p, i) => (
            <article key={i} className={sty.article}>
              <Text
                as="p"
                variant="bodyLg"
                className={sty.par}
              >
                <Markdown value={p} inline />
              </Text>
            </article>
          ))}
        </Sheet>
      </section>

      <Sheet className={sty.contactSheet} aria-label="Contact links">
        {CONTACT_TEXT !== "" && (
          <>
            <Text
              as="p"
              variant="bodyLg"
              className={sty.par}
            >
              <Markdown value={CONTACT_TEXT} inline />
            </Text>
            <hr className={sty.pDivider} aria-hidden="true" />
          </>
        )}
        <ContactRow label="Get in touch" links={ABOUT_LINKS} variant="primary" />
        <ContactRow label="Also at" links={AUX_LINKS} variant="muted" />
      </Sheet>

      <hr className={sty.pDivider} aria-hidden="true" />

      <Footer />

    </main>
  );
}
