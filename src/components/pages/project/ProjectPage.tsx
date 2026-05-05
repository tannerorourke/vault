import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import type { ProjectContent, ProjectContentLink } from "@/lib/types/project-content";
import TagChip from "@/components/ui/TagChip";
import { GithubIcon } from "public/icons/github";
import { PdfIcon } from "public/icons/pdf";
import { GlobeIcon } from "public/icons/globe";
import { DemoIcon } from "public/icons/demo";
import { ArrowLeftIcon } from "public/icons/arrow-left";
import { renderSection } from "./sections";
import * as sty from "./ProjectPage.css";

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

const LINK_ICONS: Record<NonNullable<ProjectContentLink["icon"]>, SvgIcon> = {
  github: GithubIcon,
  pdf: PdfIcon,
  globe: GlobeIcon,
  demo: DemoIcon,
};

export type ProjectPageProps = {
  content: ProjectContent;
};

export function ProjectPage({ content }: ProjectPageProps) {
  const tocSections = content.sections.filter((s) => s.title);

  return (
    <main className={sty.root} aria-label={content.title}>
      <Link href="/" className={sty.backBtn}>
        <ArrowLeftIcon className={sty.backIcon} />
        All projects
      </Link>

      <header className={sty.header}>
        {content.eyebrow && (
          <div className={sty.eyebrow}>{content.eyebrow}</div>
        )}
        <h1 className={sty.title}>{content.title}</h1>
        {content.subtitle && (
          <p className={sty.subtitle}>{content.subtitle}</p>
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
            {content.links.map((l, i) => {
              const Icon = l.icon ? LINK_ICONS[l.icon] : null;
              return (
                <a
                  key={i}
                  className={sty.linkBtn}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={l.download}
                >
                  {Icon && <Icon className={sty.linkBtnIcon} />}
                  {l.label}
                </a>
              );
            })}
          </div>
        )}
      </header>

      {content.heroImage && (
        <img
          className={sty.heroImage}
          src={content.heroImage.src}
          alt={content.heroImage.alt ?? ""}
        />
      )}

      <div className={sty.layout}>
        {tocSections.length > 0 ? (
          <nav className={sty.toc} aria-label="Sections">
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

        <div className={sty.sections}>
          {content.sections.map((s) => renderSection(s))}
        </div>
      </div>
    </main>
  );
}
