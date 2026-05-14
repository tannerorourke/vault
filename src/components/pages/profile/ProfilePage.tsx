import * as sty from "./ProfilePage.css";
import Text from "@/components/ui/Text";
import { Markdown } from "@/components/ui/Markdown";
import { blurFade } from "@/lib/styles/blur-fade.css";
import {
  HOOK,
  PARAGRAPHS,
} from "@/content/profile-content";
import { NavLink } from "@/lib/types/nav";
import { ABOUT_LINKS } from "@/content/nav-links";



export function ProfilePage() {
  return (
    <main className={sty.profileRoot}>

      <section className={sty.stDisplay}>
        <Text
          as="h1"
          variant="display"
          className={`${sty.textDisplay} ${blurFade({ direction: 'all', rounded: 'sm' })}`}
        >
          <Markdown value={HOOK} inline />
        </Text>
      </section>

      <section className={sty.body}>
        <aside className={sty.photoColumn} aria-label="At a glance">
          <figure className={sty.photoFigure}>
            {/* Empty src placeholder — populate src + alt when image is added */}
            <img className={sty.photo} src="" alt="" />
          </figure>
        </aside>

        <div className={`${sty.bodyProse} ${blurFade({ direction: 'all', rounded: 'sm' })}`}>
          {PARAGRAPHS.map((p, i) => (
            <article key={i} className={sty.prose}>
              {i !== 0 && <hr className={sty.pDivider} aria-hidden="true" />}
              <Text
                as="p"
                variant="bodyLg"
                className={sty.par}
              >
                <Markdown value={p} inline />
              </Text>
            </article>
          ))}
        </div>
      </section>

      <section 
        className={`${sty.contact} ${blurFade({ direction: 'all', rounded: 'sm' })}`} 
        aria-label="Contact links"
      >
        <Text as="span" variant="bodySm" tone="primary" className={sty.contactLabel}>
          I'm open to Work! Let's get in touch
        </Text>
        <ul className={sty.contactList}>
          {ABOUT_LINKS.map((l: NavLink) => (
            <li key={l.href} className={sty.contactItem}>
              <a
                href={l.href}
                target={l.target}
                rel={l.target === "_blank" ? "noopener noreferrer" : undefined}
                download={l.download}
                aria-label={l.alt}
                className={sty.contactLink}
              >
                <l.Icon className={sty.contactIcon} duopacity={0} aria-hidden="true" />
                <Text as="span" variant="ui">{l.text}</Text>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
