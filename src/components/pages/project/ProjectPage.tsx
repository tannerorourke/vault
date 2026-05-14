import Link from "next/link";
import type { ProjectContent } from "@/lib/types/project-content";
import TagChip from "@/components/ui/TagChip";
import { Markdown } from "@/components/ui/Markdown";
import { renderSection } from "./sections";
import * as sty from "./ProjectPage.css";
import { iconRegistry } from "@/content/icons/registry";
import { ArrowLeft } from "@/content/icons/arrow-left";
import { blurFade } from "@/lib/styles/blur-fade.css";
import { ContentNavLink } from "@/lib/types/nav";

export type ProjectPageProps = {
  content: ProjectContent;
};

export function ProjectPage({ content }: ProjectPageProps) {
  const tocSections = content.sections.filter((s) => s.title);

  return (
    <main className={sty.root} aria-label={content.title}>
      <Link href="/" className={sty.backBtn}>
        <ArrowLeft className={sty.backIcon} />
        All projects
      </Link>

      <header className={`${sty.header} ${blurFade({ direction: 'all', rounded: 'sm' })}`}>
        {content.eyebrow && (
          <div className={sty.eyebrow}>{content.eyebrow}</div>
        )}
        <h1 className={sty.title}>{content.title}</h1>
        {content.subtitle && (
          <p className={sty.subtitle}>
            <Markdown value={content.subtitle} inline />
          </p>
        )}

        {content.tags && content.tags.length > 0 && (
          <div className={sty.tagsRow}>
            {content.tags.map((t, i) => (
              <TagChip key={i} label={t.label} color={t.color} />
            ))}
          </div>
        )}

        {content.links && content.links.length > 0 && (
          <div className={sty.links}>
            {content.links.map((l: ContentNavLink, i) => {
              const Icon = l.icon ? iconRegistry[l.icon] : null;
              return (
                <a
                  key={i}
                  className={sty.linkBtn}
                  href={l.href}
                  target={l.target ? l.target : "_blank"}
                  rel="noopener noreferrer"
                  download={l.download ? l.download : undefined}
                >
                  {Icon && <Icon className={sty.linkBtnIcon} />}
                  {l.text && l.text}
                </a>
              );
            })}
          </div>
        )}
      </header>

      {content.heroImage && (
        <img
          className={`${sty.heroImage} ${blurFade({ direction: 'all', rounded: 'sm' })}`}
          src={content.heroImage.src}
          alt={content.heroImage.alt ?? ""}
        />
      )}

      <div className={sty.layout}>
        {tocSections.length > 0 ? (
          <nav className={`${sty.toc} ${blurFade({ direction: 'all', rounded: 'sm' })}`} aria-label="Sections">
            {tocSections.map((s) => (
              <a
                key={s.id}
                href={`#section-${s.id}`}
                className={sty.tocLink}
              >
                {s.title}
              </a>
            ))}
          </nav>
        ) : (
          <div />
        )}

        <div className={`${sty.sections} ${blurFade({ direction: 'all', rounded: 'sm' })}`}>
          {content.sections.map((s) => renderSection(s))}
        </div>
      </div>
    </main>
  );
}
